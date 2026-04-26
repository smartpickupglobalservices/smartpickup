/* ═══════════════════════════════════════════════════════
   SMARTPICKUP GLOBAL SERVICES — app.js
   Core: Firebase Auth (persistent) + Firestore + Storage
         Paystack · WhatsApp auto-popup · Admin logic
   ═══════════════════════════════════════════════════════ */

// ── FIREBASE CONFIG ──────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBxZrSrmGsgWOkXo7c7LJ9sbzdfZWEYQas",
  authDomain:        "smartpickup-644b3.firebaseapp.com",
  projectId:         "smartpickup-644b3",
  storageBucket:     "smartpickup-644b3.firebasestorage.app",
  messagingSenderId: "213573473376",
  appId:             "1:213573473376:web:1b6b5c451db9dd87a59f05",
  measurementId:     "G-556E75XMM3"
};

// ── PAYSTACK PUBLIC KEY ───────────────────────────────────
// ⚠️  IMPORTANT: Replace with your LIVE key from dashboard.paystack.com
// ⚠️  TEST KEY causes "Invalid Merchant" on live transactions!
// Get live key at: https://dashboard.paystack.com/#/settings/developer
const PAYSTACK_KEY = "pk_live_a28926f9c82be8ca83d8a072baacc6389c4bf469";

// ── CONSTANTS ─────────────────────────────────────────────
const ADMIN_WHATSAPP = "2347063545065";
const ADMIN_EMAIL    = "smartpickupglobalservices@gmail.com";
const ADMIN_PHONE    = "+234 706 354 5065";
const ADMIN_PASS     = "Temitope@516034";

// ── INIT ─────────────────────────────────────────────────
firebase.initializeApp(firebaseConfig);
const db      = firebase.firestore();
const auth    = firebase.auth();
const storage = firebase.storage();

// ── PERSIST LOGIN (user stays logged in after browser close) ──
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

// ── HELPERS ───────────────────────────────────────────────
const val = (id) => (document.getElementById(id)?.value || '').trim();

function showToast(msg, type = 'info') {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.background = type === 'error' ? '#c0392b' : type === 'success' ? '#1a6b3a' : '#002e5b';
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3800);
}

function showLoading(msg = 'Processing...') {
  const o = document.getElementById('loadingOverlay');
  if (o) { o.classList.add('show'); const m = document.getElementById('loadingMsg'); if (m) m.textContent = msg; }
}
function hideLoading() {
  const o = document.getElementById('loadingOverlay');
  if (o) o.classList.remove('show');
}

function setAlert(id, html, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert alert-' + type;
  el.innerHTML = html;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function hideAlert(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

// ── FILE UPLOAD ────────────────────────────────────────────
async function uploadFile(file, folder) {
  if (!file) return null;
  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const ref = storage.ref(folder + '/' + Date.now() + '_' + safeName);
    await ref.put(file);
    return await ref.getDownloadURL();
  } catch(e) {
    console.warn('File upload skipped (storage rules or network):', e.message);
    return null; // Don't block form submission if upload fails
  }
}

async function uploadMultiple(fileList, folder) {
  if (!fileList || !fileList.length) return [];
  const urls = [];
  for (let i = 0; i < fileList.length; i++) {
    const url = await uploadFile(fileList[i], folder);
    if (url) urls.push(url);
  }
  return urls;
}

// ── SAVE APPLICATION ───────────────────────────────────────
async function saveApplication(service, formData, payStatus = 'Unpaid', fileUrls = {}) {
  const user = auth.currentUser;
  const phone = formData.phone || formData.applicantPhone || formData.contactPhone || 'N/A';
  const email = user ? user.email : (formData.email || '');
  const payload = {
    service,
    userId:        user ? user.uid : 'guest',
    userEmail:     email,
    userPhone:     phone,
    formData:      formData,
    fileUrls:      fileUrls,
    paymentStatus: payStatus,
    status:        'pending',
    adminNote:     '',
    createdAt:     firebase.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection('applications').add(payload);
  return ref.id;
}

// ── WHATSAPP POPUP ─────────────────────────────────────────
function openAdminWhatsApp(service, email, phone) {
  const msg = encodeURIComponent(
    `Hello Admin (SmartPickup),\n\nI just submitted a *${service}* application.\n\n📧 Email: ${email}\n📞 Phone: ${phone}\n\nPlease review and contact me. Thank you.`
  );
  setTimeout(() => window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${msg}`, '_blank'), 1200);
}

// ── PAYSTACK PAYMENT ───────────────────────────────────────
function payWithPaystack(amount, email, onSuccess) {
  if (!window.PaystackPop) {
    showToast('Paystack script not loaded. Check your internet connection.', 'error');
    console.error('PaystackPop not available');
    return;
  }

  // Paystack requires a valid email — always guarantee one
  const safeEmail = (email && typeof email === 'string' && email.includes('@'))
    ? email
    : 'customer@smartpickup.ng';

  console.log('Paystack init:', { key: PAYSTACK_KEY.slice(0,12)+'...', email: safeEmail, amount });

  try {
    const handler = PaystackPop.setup({
      key:       PAYSTACK_KEY,
      email:     safeEmail,
      amount:    amount * 100,   // kobo
      currency:  'NGN',
      ref:       'SPG_' + Date.now(),
      metadata: {
        custom_fields: [
          { display_name: 'Service', variable_name: 'service', value: 'SmartPickup NIN Reprinting' }
        ]
      },
      callback: function(res) {
        console.log('Paystack success:', res);
        showToast('✅ Payment successful! Ref: ' + res.reference, 'success');
        if (typeof onSuccess === 'function') onSuccess(res.reference);
      },
      onClose: function() {
        showToast('Payment window closed. You can pay manually via bank transfer.', 'info');
      }
    });
    handler.openIframe();
  } catch(err) {
    console.error('Paystack setup error:', err);
    showToast('Payment error: ' + err.message, 'error');
  }
}

// ── CAPTCHA ────────────────────────────────────────────────
let _captchaAns = 0;
function refreshCaptcha() {
  const ops = ['+', '-', '×'];
  const op  = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 12) + 1;
  let b = Math.floor(Math.random() * 12) + 1;
  if (op === '-' && b > a) [a, b] = [b, a];
  _captchaAns = op === '+' ? a + b : op === '-' ? a - b : a * b;
  const q = document.getElementById('captchaQ');
  if (q) q.textContent = `What is ${a} ${op} ${b} = ?`;
  const ans = document.getElementById('captchaAns');
  if (ans) ans.value = '';
}
function verifyCaptcha() {
  const ans = parseInt(document.getElementById('captchaAns')?.value || '');
  return !isNaN(ans) && ans === _captchaAns;
}

// ── MOBILE NAV ─────────────────────────────────────────────
function openMob()  { const n = document.getElementById('mobNav'); if (n) { n.classList.add('open'); document.body.style.overflow = 'hidden'; } }
function closeMob() { const n = document.getElementById('mobNav'); if (n) { n.classList.remove('open'); document.body.style.overflow = ''; } }

// ── FAQ ────────────────────────────────────────────────────
function faq(btn) {
  const a    = btn.nextElementSibling;
  const open = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
  if (!open) { btn.classList.add('open'); a.classList.add('open'); }
}

// ── MULTI-STEP ─────────────────────────────────────────────
let _currentStep = 1, _totalSteps = 1;
function initSteps(total) { _totalSteps = total; _currentStep = 1; renderSteps(); }
function nextStep() { if (_currentStep < _totalSteps) { _currentStep++; renderSteps(); } }
function prevStep() { if (_currentStep > 1) { _currentStep--; renderSteps(); } }
function renderSteps() {
  document.querySelectorAll('.form-step').forEach((s, i) => s.classList.toggle('active', i + 1 === _currentStep));
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i + 1 < _currentStep)  d.classList.add('done');
    if (i + 1 === _currentStep) d.classList.add('active');
  });
  document.querySelectorAll('.step-lbl').forEach((l, i) => l.classList.toggle('active', i + 1 === _currentStep));
  document.querySelectorAll('.step-line').forEach((l, i) => l.classList.toggle('done', i + 1 < _currentStep));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── LOGOUT ─────────────────────────────────────────────────
function doLogout() {
  auth.signOut().then(() => { showToast('Signed out.'); setTimeout(() => window.location.href = 'index.html', 900); });
}

// ── NAV AUTH STATE ─────────────────────────────────────────
auth.onAuthStateChanged(async (user) => {
  const btnLogin  = document.getElementById('btnLogin');
  const btnReg    = document.getElementById('btnReg');
  const btnLogout = document.getElementById('btnLogout');
  const userChip  = document.getElementById('userChip');
  const dashLink  = document.getElementById('dashNavLink');

  if (user) {
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      const p   = doc.exists ? doc.data() : {};
      const name = p.firstName || user.email.split('@')[0];
      if (userChip) {
        userChip.style.display = 'flex';
        const ini = document.getElementById('userInitials');
        const nm  = document.getElementById('userNameDisplay');
        if (ini) ini.textContent = name.charAt(0).toUpperCase();
        if (nm)  nm.textContent  = name;
      }
      if (btnLogin)  btnLogin.style.display  = 'none';
      if (btnReg)    btnReg.style.display    = 'none';
      if (btnLogout) btnLogout.style.display = 'inline-flex';
      if (dashLink)  dashLink.style.display  = 'block';
      window.currentUser = { uid: user.uid, email: user.email, name, ...p };
    } catch (e) { /* ignore */ }
  } else {
    if (userChip)  userChip.style.display  = 'none';
    if (btnLogin)  btnLogin.style.display  = 'inline-flex';
    if (btnReg)    btnReg.style.display    = 'inline-flex';
    if (btnLogout) btnLogout.style.display = 'none';
    if (dashLink)  dashLink.style.display  = 'none';
    window.currentUser = null;
  }
});

// ── FILE PREVIEW LABELS ────────────────────────────────────
function bindFileLabels() {
  document.querySelectorAll('input[type=file]').forEach(inp => {
    inp.addEventListener('change', () => {
      const lbl = inp.closest('.file-upload')?.querySelector('.file-preview');
      if (lbl && inp.files.length) {
        lbl.textContent = inp.files.length === 1 ? '✅ ' + inp.files[0].name : '✅ ' + inp.files.length + ' files selected';
        lbl.style.display = 'block';
      }
    });
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────────
const _revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), i * 75); _revealObs.unobserve(e.target); }
  });
}, { threshold: .1 });

// ── DOM READY ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => _revealObs.observe(el));
  if (document.getElementById('captchaQ')) refreshCaptcha();
  bindFileLabels();
});
