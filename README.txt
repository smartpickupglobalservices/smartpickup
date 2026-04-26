═══════════════════════════════════════════════════
  SMARTPICKUP GLOBAL SERVICES — Complete Website
  CAC Registered BN 3785339
  Akure, Ondo State Nigeria
═══════════════════════════════════════════════════

SETUP INSTRUCTIONS
==================

1. LOGO
   Replace logo.png with your actual logo image file.
   Name it exactly: logo.png
   It will auto-appear as favicon, navbar icon, and home screen icon.

2. PAYSTACK LIVE KEY
   Open app.js and find line:
   const PAYSTACK_KEY = "pk_test_975dde1d1e35ce542cfdc331a360891220e7b08a";
   Replace with your LIVE key from: https://dashboard.paystack.com/#/settings/developer

3. FIREBASE STORAGE
   Enable Firebase Storage in your Firebase Console.
   Go to: Build → Storage → Get Started → Production mode
   Update Storage Rules to allow authenticated writes.

4. FIRESTORE RULES (paste in Firebase Console)
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /applications/{doc} {
         allow create: if true;
         allow read, update: if request.auth != null;
       }
       match /users/{id} {
         allow read, write: if request.auth.uid == id;
       }
       match /contacts/{doc} {
         allow create: if true;
       }
     }
   }

5. FIREBASE AUTHENTICATION
   Go to: Build → Authentication → Sign-in method → Email/Password → Enable

6. ADMIN ACCESS
   URL: yoursite.com/admin.html
   Password: Temitope@516034
   KEEP THIS CONFIDENTIAL.

FILES
=====
index.html          — Homepage / landing page
login.html          — Sign in page (Firebase Auth)
register.html       — Registration page
dashboard.html      — User dashboard (auth-protected)
admin.html          — Admin panel (password protected)
services.html       — All services list
contact.html        — Contact form
apply-cac.html      — CAC: Business Name / Company / NGO Trustees
apply-nafdac.html   — NAFDAC product registration
apply-scuml.html    — SCUML AML compliance
apply-trademark.html— Trademark registration (NIPO)
apply-tin.html      — TIN registration (FIRS)
apply-nin.html      — NIN reprinting (4 plans)
apply-logistics.html— Logistics booking (4-step)
apply-jamb.html     — JAMB services
apply-pins.html     — Exam pins (WAEC/NECO)
apply-airtime.html  — Airtime & data
apply-export.html   — Export certificate
style.css           — Master stylesheet
app.js              — Firebase + Paystack + core logic
components.js       — Shared navbar/footer injection
logo.png            — Replace with your actual logo

PAYMENT ACCOUNTS
================
Opay MFB:     SmartPickup JST General Service · 7063545065
Providus Bank: Adejube John Olusola · 6501187233

CONTACT
=======
Phone/WhatsApp: +234 706 354 5065
Email: smartpickupglobalservices@gmail.com
HQ: No. 3 Oshokoti Layout, Akure, Ondo State
Branch: Ipe Akoko, Akoko South East, Ondo State
