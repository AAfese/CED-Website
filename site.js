/* ===== Shared site chrome: nav + footer + interactions =====
   Each page includes <div id="site-nav"></div> near the top and
   <div id="site-footer"></div> at the bottom, sets <body data-page="..."> to
   the current page key, then loads this script last. */

(function () {
  const NAV = `
  <header id="nav" class="fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <nav class="flex items-center justify-between h-20">
        <a href="index.html" class="flex items-center gap-3 group">
          <img src="CED Logo.jpg" alt="Christ Embassy Duncanville logo" class="h-12 w-12 rounded-full ring-2 ring-gold/70 shadow-md transition-transform duration-500 group-hover:scale-105" />
          <span class="leading-tight">
            <span id="brandTop" class="block font-display font-700 text-[15px] sm:text-base text-white transition-colors duration-500">Christ Embassy</span>
            <span id="brandSub" class="block text-[10px] sm:text-[11px] font-600 tracking-[0.22em] uppercase text-gold transition-colors duration-500">Duncanville</span>
          </span>
        </a>

        <ul id="navLinks" class="hidden lg:flex items-center gap-7 text-[14px] font-600 text-white/90">
          <li><a href="index.html" data-nav="home" class="link-underline py-1" data-i18n="nav.home">Home</a></li>
          <li><a href="events.html" data-nav="events" class="link-underline py-1" data-i18n="nav.events">Events</a></li>
          <li><a href="new-here.html" data-nav="new-here" class="link-underline py-1" data-i18n="nav.newhere">New Here</a></li>
          <li><a href="giving.html" data-nav="giving" class="link-underline py-1" data-i18n="nav.giving">Giving</a></li>
          <li><a href="contact.html" data-nav="contact" class="link-underline py-1" data-i18n="nav.contact">Contact</a></li>
        </ul>

        <div class="flex items-center gap-2.5 sm:gap-3">
          <!-- Language toggle (ENG / ESP) — wired by i18n.js -->
          <div id="langToggle" class="flex items-center rounded-full ring-1 ring-gold/50 p-0.5 text-[11px] font-700 tracking-wide text-white/85 transition-colors duration-500">
            <button type="button" data-lang="en" aria-label="English" class="lang-btn rounded-full px-2.5 py-1 transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">ENG</button>
            <button type="button" data-lang="es" aria-label="Español" class="lang-btn rounded-full px-2.5 py-1 transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">ESP</button>
          </div>
          <a href="contact.html" class="hidden sm:inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-[14px] font-700 text-ink shadow-gold transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" data-i18n="nav.plan_visit">
            Plan a Visit
          </a>
          <button id="menuBtn" aria-label="Open menu" class="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full text-white hover:bg-white/10 transition-colors duration-300">
            <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile menu -->
    <div id="mobileMenu" class="lg:hidden hidden border-t border-white/10 bg-royal-dark/95 backdrop-blur-xl">
      <ul class="mx-auto max-w-7xl px-5 py-5 flex flex-col gap-1 text-white font-600">
        <li><a href="index.html" data-nav="home" class="mobile-link block rounded-xl px-4 py-3 hover:bg-white/10 transition-colors" data-i18n="nav.home">Home</a></li>
        <li><a href="events.html" data-nav="events" class="mobile-link block rounded-xl px-4 py-3 hover:bg-white/10 transition-colors" data-i18n="nav.events">Events</a></li>
        <li><a href="new-here.html" data-nav="new-here" class="mobile-link block rounded-xl px-4 py-3 hover:bg-white/10 transition-colors" data-i18n="nav.newhere">New Here</a></li>
        <li><a href="giving.html" data-nav="giving" class="mobile-link block rounded-xl px-4 py-3 hover:bg-white/10 transition-colors" data-i18n="nav.giving">Giving</a></li>
        <li><a href="contact.html" data-nav="contact" class="mobile-link block rounded-xl px-4 py-3 hover:bg-white/10 transition-colors" data-i18n="nav.contact">Contact</a></li>
        <li class="pt-2"><a href="contact.html" class="mobile-link block rounded-full bg-gold px-4 py-3 text-center text-ink font-700 shadow-gold" data-i18n="nav.plan_visit">Plan a Visit</a></li>
        <li class="pt-3 mt-2 border-t border-white/10 flex justify-center">
          <div id="langToggleMobile" class="inline-flex items-center rounded-full ring-1 ring-gold/50 p-0.5 text-[12px] font-700 tracking-wide text-white/85">
            <button type="button" data-lang="en" aria-label="English" class="lang-btn rounded-full px-4 py-1.5 transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">ENG</button>
            <button type="button" data-lang="es" aria-label="Español" class="lang-btn rounded-full px-4 py-1.5 transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">ESP</button>
          </div>
        </li>
      </ul>
    </div>
  </header>`;

  const FOOTER = `
  <footer id="contact" class="relative bg-ink text-white pt-20 pb-10 overflow-hidden grain">
    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-royal via-gold to-purple"></div>
    <div class="pointer-events-none absolute -bottom-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-royal/20 blur-[130px]"></div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <!-- Brand -->
        <div class="lg:col-span-4">
          <div class="flex items-center gap-3">
            <img src="CED Logo.jpg" alt="Christ Embassy Duncanville logo" class="h-14 w-14 rounded-full ring-2 ring-gold/70" />
            <div class="leading-tight">
              <span class="block font-display font-700 text-lg">Christ Embassy</span>
              <span class="block text-[11px] font-600 tracking-[0.22em] uppercase text-gold">Duncanville · LoveWorld</span>
            </div>
          </div>
          <p class="lead mt-5 max-w-sm text-white/60 text-[15px]" data-i18n="footer.tagline">
            A LoveWorld Nation church in Duncanville, Texas — serving Cedar Hill, DeSoto, Lancaster and the greater Dallas area. Wherever you are on your journey of faith, you belong here.
          </p>
          <div class="mt-6 flex items-center gap-3">
            <a href="https://www.facebook.com/share/1bfVZcbEPY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors duration-300 hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg></a>
            <a href="https://www.instagram.com/ce_duncanville?igsh=bjdnamN6Z2x0Mmgx&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors duration-300 hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a href="#" aria-label="YouTube" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors duration-300 hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z"/></svg></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-2">
          <h4 class="font-700 text-[13px] tracking-[0.2em] uppercase text-gold" data-i18n="footer.quicklinks">Quick Links</h4>
          <ul class="mt-5 space-y-3 text-[15px] text-white/65">
            <li><a href="index.html" class="transition-colors hover:text-white" data-i18n="nav.home">Home</a></li>
            <li><a href="events.html" class="transition-colors hover:text-white" data-i18n="nav.events">Events</a></li>
            <li><a href="new-here.html" class="transition-colors hover:text-white" data-i18n="nav.newhere">New Here</a></li>
            <li><a href="giving.html" class="transition-colors hover:text-white" data-i18n="nav.giving">Giving</a></li>
            <li><a href="contact.html" class="transition-colors hover:text-white" data-i18n="nav.contact">Contact</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="lg:col-span-3">
          <h4 class="font-700 text-[13px] tracking-[0.2em] uppercase text-gold" data-i18n="footer.contact_h">Contact</h4>
          <ul class="mt-5 space-y-4 text-[15px] text-white/65">
            <li class="flex items-start gap-3">
              <svg class="mt-0.5 shrink-0 text-gold" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
              <span>+1 682-395-7093</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="mt-0.5 shrink-0 text-gold" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
              <span>info@christembassyduncanville.church</span>
            </li>
          </ul>
        </div>

        <!-- Location -->
        <div class="lg:col-span-3">
          <h4 class="font-700 text-[13px] tracking-[0.2em] uppercase text-gold" data-i18n="footer.location_h">Location</h4>
          <div class="mt-5 text-[15px] text-white/65">
            <div class="flex items-start gap-3">
              <svg class="mt-0.5 shrink-0 text-gold" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>606 Oriole Blvd, Bldg Ste 204<br>Duncanville, TX 75116</span>
            </div>
            <div class="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-[13px] font-700 tracking-[0.15em] uppercase text-gold" data-i18n="footer.service_times">Service Times</p>
              <p class="mt-2 text-[14px] text-white/70" data-i18n-html="footer.services_html">Sun · 10:00 AM<br>Wed · 6:30 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/45">
        <p>© <span id="year"></span> Christ Embassy Duncanville. <span data-i18n="footer.rights">All rights reserved.</span></p>
        <p data-i18n="footer.affiliation">Affiliated with Believers' LoveWorld Incorporated.</p>
      </div>
    </div>
  </footer>`;

  // ---------- Inject chrome ----------
  const navMount = document.getElementById('site-nav');
  const footerMount = document.getElementById('site-footer');
  if (navMount) navMount.innerHTML = NAV;
  if (footerMount) footerMount.innerHTML = FOOTER;

  // ---------- Active link (per page) ----------
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll('[data-nav="' + page + '"]').forEach((a) => a.classList.add('nav-active'));
  }

  // ---------- Nav scroll state ----------
  const nav = document.getElementById('nav');
  const brandTop = document.getElementById('brandTop');
  const navLinks = document.getElementById('navLinks');
  const langToggle = document.getElementById('langToggle');
  if (nav && brandTop && navLinks) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('bg-white/90', 'backdrop-blur-xl', 'shadow-[0_8px_30px_-12px_rgba(26,58,143,0.25)]');
        brandTop.classList.remove('text-white'); brandTop.classList.add('text-royal');
        navLinks.classList.remove('text-white/90'); navLinks.classList.add('text-ink/75');
        if (langToggle) { langToggle.classList.remove('text-white/85'); langToggle.classList.add('text-ink/70'); }
      } else {
        nav.classList.remove('bg-white/90', 'backdrop-blur-xl', 'shadow-[0_8px_30px_-12px_rgba(26,58,143,0.25)]');
        brandTop.classList.add('text-white'); brandTop.classList.remove('text-royal');
        navLinks.classList.add('text-white/90'); navLinks.classList.remove('text-ink/75');
        if (langToggle) { langToggle.classList.add('text-white/85'); langToggle.classList.remove('text-ink/70'); }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    document.querySelectorAll('.mobile-link').forEach((a) => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ---------- Footer year ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
