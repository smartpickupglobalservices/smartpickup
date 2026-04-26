/* ═══════════════════════════════════════════════════════
   SMARTPICKUP — components.js
   Injects shared nav/footer on every page
   Include AFTER app.js
   ═══════════════════════════════════════════════════════ */

function injectTopbar() {
  const el = document.getElementById('topbar');
  if (!el) return;
  el.innerHTML = `
  <div class="tb-inner">
    <div class="tb-left">
      <div class="tb-item">📞 <a href="tel:+2347063545065">+234 706 354 5065</a></div>
      <div class="tb-item">✉️ <a href="mailto:smartpickupglobalservices@gmail.com">smartpickupglobalservices@gmail.com</a></div>
      <div class="tb-item">🕒 Mon–Sat 8am–6pm</div>
    </div>
    <div><span class="tb-badge">✅ CAC Registered · BN 3785339</span></div>
  </div>`;
}

function injectNavbar(activePage) {
  const el = document.getElementById('navbar');
  if (!el) return;
  el.innerHTML = `
  <div class="nav-inner">
    <a class="nav-brand" href="index.html">
      <div class="nav-logo"><img src="logo.png" alt="SmartPickup Logo" onerror="this.parentElement.innerHTML='🚀'"/></div>
      <div>
        <div class="nav-brand-name">SmartPickup Global</div>
        <div class="nav-brand-sub">General Services · Nigeria</div>
      </div>
    </a>
    <nav class="nav-links">
      <a href="index.html"     class="nav-link ${activePage==='home'?'active':''}">Home</a>
      <a href="services.html"  class="nav-link ${activePage==='services'?'active':''}">Services</a>
      <a href="apply-cac.html" class="nav-link ${activePage==='cac'?'active':''}">CAC</a>
      <a href="apply-nafdac.html" class="nav-link ${activePage==='nafdac'?'active':''}">NAFDAC</a>
      <a href="apply-scuml.html"  class="nav-link ${activePage==='scuml'?'active':''}">SCUML</a>
      <a href="apply-nin.html"    class="nav-link ${activePage==='nin'?'active':''}">NIN</a>
      <a href="contact.html"   class="nav-link ${activePage==='contact'?'active':''}">Contact</a>
      <a href="online-registration.html" class="nav-link">💼 Jobs</a>
      <a href="dashboard.html" class="nav-link" id="dashNavLink" style="display:none">📊 Dashboard</a>
      <a href="admin.html" class="nav-link" id="adminNavLink">🛡️ Admin</a>
    </nav>
    <div class="nav-btns">
      <a href="login.html"    class="btn btn-outline-w btn-sm" id="btnLogin">Sign In</a>
      <a href="register.html" class="btn btn-gold btn-sm"      id="btnReg">Register</a>
      <div id="userChip" style="display:none" class="user-chip">
        <div class="user-avatar" id="userInitials">U</div>
        <span id="userNameDisplay">User</span>
      </div>
      <button onclick="doLogout()" id="btnLogout" style="display:none;background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.22)" class="btn btn-sm">Sign Out</button>
    </div>
    <button class="nav-hamburger" onclick="openMob()">
      <span></span><span></span><span></span>
    </button>
  </div>`;
}

function injectMobNav() {
  const el = document.getElementById('mobNav');
  if (!el) return;
  el.className = 'mob-nav';
  el.innerHTML = `
  <button class="mob-close" onclick="closeMob()">✕</button>
  <div class="mob-links">
    <div class="mob-sec">Main</div>
    <a href="index.html">🏠 Home</a>
    <a href="services.html">📋 All Services</a>
    <div class="mob-sep"></div>
    <div class="mob-sec">Registration</div>
    <a href="apply-cac.html">🏢 CAC (BN / LTD / NGO)</a>
    <a href="apply-nafdac.html">💊 NAFDAC</a>
    <a href="apply-scuml.html">🛡️ SCUML</a>
    <a href="apply-trademark.html">™️ Trademark</a>
    <a href="apply-tin.html">🔢 TIN Registration</a>
    <a href="apply-export.html">🌍 Export Certificate</a>
    <div class="mob-sep"></div>
    <div class="mob-sec">Other Services</div>
    <a href="apply-nin.html">🪪 NIN Reprinting</a>
    <a href="apply-jamb.html">📝 JAMB Services</a>
    <a href="apply-pins.html">📋 Exam Pins</a>
    <a href="apply-airtime.html">📱 Airtime &amp; Data</a>
    <a href="apply-logistics.html">🚚 Logistics / Delivery</a>
    <div class="mob-sep"></div>
    <a href="login.html"     id="mobLoginLink">🔑 Sign In</a>
    <a href="register.html"  id="mobRegLink">✅ Register Free</a>
    <a href="dashboard.html" id="mobDashLink" style="display:none">📊 My Dashboard</a>
    <a href="#" id="mobLogoutLink" style="display:none" onclick="doLogout();return false">🚪 Sign Out</a>
    <a href="contact.html">📞 Contact</a>
    <a href="admin.html" style="opacity:.38;font-size:.8rem">🛡️ Admin</a>
  </div>
  <button id="mobCtaBtn" class="mob-cta" onclick="window.location.href='register.html'">🚀 Start Registration Now</button>`;
}

function injectFooter() {
  const el = document.getElementById('footer');
  if (!el) return;
  el.className = 'footer';
  el.innerHTML = `
  <div class="footer-main">
    <div>
      <a class="nav-brand" href="index.html" style="text-decoration:none">
        <div class="nav-logo"><img src="logo.png" alt="" onerror="this.parentElement.innerHTML='🚀'"/></div>
        <div><div class="nav-brand-name" style="color:#fff">SmartPickup Global</div><div class="nav-brand-sub">General Services</div></div>
      </a>
      <p class="footer-desc">Your trusted partner for CAC Registration, Company Incorporation, NGO/Trustees, Trademark, SCUML, NAFDAC, NIN, and Logistics across Nigeria. CAC Registered BN 3785339.</p>
      <div class="footer-socials">
        <a class="footer-soc" href="https://wa.me/2347063545065" target="_blank">💬</a>
        <a class="footer-soc" href="mailto:smartpickupglobalservices@gmail.com">✉️</a>
        <a class="footer-soc" href="tel:+2347063545065">📞</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Registration</h4>
      <ul class="footer-links">
        <li><a href="apply-cac.html">Business Name (BN)</a></li>
        <li><a href="apply-cac.html?type=ltd">Company (LTD/PLC)</a></li>
        <li><a href="apply-cac.html?type=ngo">NGO / Trustees</a></li>
        <li><a href="apply-trademark.html">Trademark</a></li>
        <li><a href="apply-scuml.html">SCUML</a></li>
        <li><a href="apply-nafdac.html">NAFDAC</a></li>
        <li><a href="apply-tin.html">TIN Registration</a></li>
        <li><a href="apply-export.html">Export Certificate</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul class="footer-links">
        <li><a href="apply-nin.html">NIN Reprinting</a></li>
        <li><a href="apply-jamb.html">JAMB Services</a></li>
        <li><a href="apply-pins.html">WAEC/NECO Pins</a></li>
        <li><a href="apply-airtime.html">Airtime &amp; Data</a></li>
        <li><a href="apply-logistics.html">Logistics</a></li>
        <li><a href="dashboard.html">My Dashboard</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <div class="footer-ci"><span class="footer-ci-icon">🏢</span><span>No. 3 Oshokoti Layout, Akure, Ondo State <strong style="color:var(--gold);font-size:.6rem"> HQ</strong></span></div>
      <div class="footer-ci"><span class="footer-ci-icon">📍</span><span>Ipe Akoko, Akoko South East, Ondo State</span></div>
      <div class="footer-ci"><span class="footer-ci-icon">📞</span><a href="tel:+2347063545065">+234 706 354 5065</a></div>
      <div class="footer-ci"><span class="footer-ci-icon">✉️</span><a href="mailto:smartpickupglobalservices@gmail.com">smartpickupglobalservices@gmail.com</a></div>
      <div class="footer-ci"><span class="footer-ci-icon">🕒</span><span>Mon–Sat 8am–6pm · Online: Daily</span></div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <div class="footer-copy">© 2025 <strong>SmartPickup Global Services</strong>. All Rights Reserved.</div>
      <div class="footer-reg">CAC Registered · BN 3785339 · Proprietor: Adejube John Olusola</div>
      <div class="footer-badge">✅ CAC Verified</div>
    </div>
  </div>`;
}

function injectOverlays() {
  // Loading overlay
  if (!document.getElementById('loadingOverlay')) {
    const d = document.createElement('div');
    d.className = 'loading-overlay'; d.id = 'loadingOverlay';
    d.innerHTML = '<div class="spinner"></div><div class="spinner-text" id="loadingMsg">Processing...</div>';
    document.body.appendChild(d);
  }
  // Toast
  if (!document.getElementById('toast')) {
    const t = document.createElement('div');
    t.className = 'toast'; t.id = 'toast';
    document.body.appendChild(t);
  }
  // WA float
  if (!document.getElementById('waFloat')) {
    const a = document.createElement('a');
    a.id = 'waFloat'; a.className = 'wa-float';
    a.href = 'https://wa.me/2347063545065?text=Hello%20SmartPickup%20Global,%20I%20need%20help.';
    a.target = '_blank'; a.innerHTML = '💬';
    document.body.appendChild(a);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';
  injectTopbar();
  injectNavbar(page);
  injectMobNav();
  injectFooter();
  injectOverlays();
});

// Auth state fires independently of DOMContentLoaded — handles both desktop and mobile nav
if (typeof auth !== 'undefined') {
  auth.onAuthStateChanged(user => {
    // Desktop nav buttons
    const btnLogin  = document.getElementById('btnLogin');
    const btnReg    = document.getElementById('btnReg');
    const btnLogout = document.getElementById('btnLogout');
    const dashLink  = document.getElementById('dashNavLink');
    const userChip  = document.getElementById('userChip');
    const userInit  = document.getElementById('userInitials');
    const userName  = document.getElementById('userNameDisplay');
    // Mobile nav links
    const ml  = document.getElementById('mobLoginLink');
    const mr  = document.getElementById('mobRegLink');
    const md  = document.getElementById('mobDashLink');
    const mlo = document.getElementById('mobLogoutLink');

    if (user) {
      if (btnLogin)  btnLogin.style.display  = 'none';
      if (btnReg)    btnReg.style.display    = 'none';
      if (btnLogout) btnLogout.style.display = 'inline-flex';
      if (dashLink)  dashLink.style.display  = 'block';
      if (userChip)  userChip.style.display  = 'flex';
      const name = user.displayName || user.email || '';
      if (userInit) userInit.textContent = name.charAt(0).toUpperCase() || 'U';
      if (userName) userName.textContent = user.displayName || user.email.split('@')[0];
      if (ml)  ml.style.display  = 'none';
      if (mr)  mr.style.display  = 'none';
      if (md)  md.style.display  = 'block';
      if (mlo) mlo.style.display = 'block';
      const cta = document.getElementById('mobCtaBtn');
      if (cta) { cta.textContent = '📊 Go to My Dashboard'; cta.onclick = () => window.location.href = 'dashboard.html'; }
    } else {
      if (btnLogin)  btnLogin.style.display  = 'inline-flex';
      if (btnReg)    btnReg.style.display    = 'inline-flex';
      if (btnLogout) btnLogout.style.display = 'none';
      if (dashLink)  dashLink.style.display  = 'none';
      if (userChip)  userChip.style.display  = 'none';
      if (ml)  ml.style.display  = 'block';
      if (mr)  mr.style.display  = 'block';
      if (md)  md.style.display  = 'none';
      if (mlo) mlo.style.display = 'none';
      const cta = document.getElementById('mobCtaBtn');
      if (cta) { cta.textContent = '🚀 Start Registration Now'; cta.onclick = () => window.location.href = 'register.html'; }
    }
  });
}
