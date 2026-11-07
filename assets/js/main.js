/**
 * Template Name: BizLand
 * Local behavior and enhancements for UD Bengkel Kriya Daun 9996.
 */
(function() {
  "use strict";

  // Inline the brand overrides so they are not lost if the extra stylesheet is cached or unavailable.
  const brandStyles = `
    :root { --background-color:#f5f1e6; --default-color:#2d312d; --heading-color:#1f2f22; --accent-color:#3e5f44; --surface-color:#ddd6b9; --contrast-color:#fff; }
    .index-page main > section.section { padding-block:44px; }
    .index-page .section-title { padding-bottom:32px; }
    .index-page .section-title p { font-size:clamp(24px,3vw,32px); }
    .index-page .header .logo img { width:52px; height:52px; object-fit:contain; }
    .index-page .header .branding { padding-block:6px; }
    .index-page #pricing .pricing-item { display:flex; flex-direction:column; height:100%; overflow:hidden; border:1px solid rgba(31,47,34,.08); border-radius:16px; background:#e2dcc4; box-shadow:0 8px 24px rgba(31,47,34,.08); }
    .index-page #pricing .pricing-item > h3 { margin:0; padding:16px 18px; background:rgba(62,95,68,.10); font-size:17px; text-align:center; }
    .index-page #pricing .pricing-item .pricing-icon { margin:18px auto 8px; }
    .index-page #pricing .pricing-item h4 { margin:8px 16px 16px; text-align:center; }
    .index-page #pricing .pricing-item ul { flex:1; margin:8px 0 18px; padding:0 22px; }
    .index-page #pricing .pricing-item .btn-wrap { margin-top:auto; padding:16px 18px; background:rgba(31,47,34,.04); }
    .index-page #pricing .pricing-item .btn-buy { display:block; width:100%; border-radius:999px; }
    .index-page #footer.footer { padding:12px 0 20px; color:#f7f5eb; background:#263d2d; }
    .index-page #footer.footer h3,.index-page #footer.footer h4,.index-page #footer.footer strong,.index-page #footer.footer .footer-about a { color:#fffdf5; }
    .index-page #footer.footer p,.index-page #footer.footer li,.index-page #footer.footer .credits,.index-page #footer.footer .copyright { color:rgba(255,253,245,.82); }
    .index-page #footer.footer a,.index-page #footer.footer .footer-links ul i { color:#d7cda7; }
    .index-page #footer.footer a:hover { color:#fff; }
    .index-page #footer.footer .social-links a { color:#fff; border-color:rgba(255,255,255,.35); }
    .index-page #footer.footer .social-links a:hover { color:#263d2d; border-color:#d7cda7; background:#d7cda7; }
    .index-page #footer.footer .copyright { border-color:rgba(255,255,255,.18); }
    .index-page #footer.footer .footer-top { padding-top:28px; }
    .index-page #footer.footer .footer-links { margin-bottom:18px; }
    @media(max-width:575px) { .index-page main > section.section { padding-block:34px; } .index-page .header .logo h1 { font-size:16px; } .index-page .header .logo img { width:42px; height:42px; } }
  `;
  const styleElement = document.createElement('style');
  styleElement.id = 'bengkel-kriya-brand-overrides';
  styleElement.textContent = brandStyles;
  document.head.appendChild(styleElement);

  function toggleScrolled() {
    const body = document.body;
    const header = document.querySelector('#header');
    if (!body || !header) return;
    if (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top')) return;
    body.classList.toggle('scrolled', window.scrollY > 100);
  }
  document.addEventListener('scroll', toggleScrolled, { passive: true });
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToggle() {
    if (!mobileNavToggleBtn) return;
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    mobileNavToggleBtn.setAttribute('aria-expanded', document.body.classList.contains('mobile-nav-active'));
  }
  if (mobileNavToggleBtn) mobileNavToggleBtn.addEventListener('click', mobileNavToggle);

  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active') && !link.querySelector('.toggle-dropdown')) mobileNavToggle();
    });
  });
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      const parent = this.parentNode;
      const submenu = parent && parent.nextElementSibling;
      if (parent) parent.classList.toggle('active');
      if (submenu) submenu.classList.toggle('dropdown-active');
      event.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) window.addEventListener('load', () => preloader.remove());

  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) scrollTop.classList.toggle('active', window.scrollY > 100);
  }
  if (scrollTop) scrollTop.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, { passive: true });

  function aosInit() {
    if (window.AOS) window.AOS.init({ duration:600, easing:'ease-in-out', once:true, mirror:false });
  }
  window.addEventListener('load', aosInit);

  // Product inquiry buttons open WhatsApp with a pre-filled message.
  const whatsappNumber = '628123240214';
  document.querySelectorAll('#pricing .pricing-item').forEach(card => {
    const button = card.querySelector('.btn-buy');
    const productName = card.querySelector('h3')?.textContent.trim() || 'produk kriya';
    if (!button) return;
    const message = `Halo UD Bengkel Kriya Daun 9996, saya ingin menanyakan ${productName}. Mohon info ketersediaan dan harganya. Terima kasih.`;
    button.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('#portfolio .preview-link').forEach(link => {
    const description = link.closest('.portfolio-item')?.querySelector('.portfolio-info p');
    if (description) link.setAttribute('data-description', description.textContent.trim());
    if (link.title) link.setAttribute('aria-label', `Lihat detail ${link.title}`);
  });
  if (window.GLightbox) window.GLightbox({ selector:'.glightbox', descPosition:'bottom', moreText:'Baca selengkapnya', moreLength:160, loop:true });

  document.querySelectorAll('.skills-animation').forEach(item => {
    if (!window.Waypoint) return;
    new window.Waypoint({ element:item, offset:'80%', handler:function() {
      item.querySelectorAll('.progress .progress-bar').forEach(bar => { bar.style.width = `${bar.getAttribute('aria-valuenow') || 0}%`; });
    }});
  });
  if (window.PureCounter) new window.PureCounter();

  function initSwiper() {
    if (!window.Swiper) return;
    document.querySelectorAll('.init-swiper').forEach(element => {
      const configElement = element.querySelector('.swiper-config');
      if (!configElement) return;
      try {
        const config = JSON.parse(configElement.textContent.trim());
        if (element.classList.contains('swiper-tab') && window.initSwiperWithCustomPagination) window.initSwiperWithCustomPagination(element, config);
        else new window.Swiper(element, config);
      } catch (error) { console.error('Konfigurasi slider tidak valid:', error); }
    });
  }
  window.addEventListener('load', initSwiper);

  document.querySelectorAll('.isotope-layout').forEach(element => {
    const container = element.querySelector('.isotope-container');
    if (!container || !window.imagesLoaded || !window.Isotope) return;
    const layout = element.getAttribute('data-layout') || 'masonry';
    const filter = element.getAttribute('data-default-filter') || '*';
    const sort = element.getAttribute('data-sort') || 'original-order';
    let isotope;
    window.imagesLoaded(container, () => { isotope = new window.Isotope(container, { itemSelector:'.isotope-item', layoutMode:layout, filter, sortBy:sort }); });
    element.querySelectorAll('.isotope-filters li').forEach(item => item.addEventListener('click', function() {
      element.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
      this.classList.add('filter-active');
      if (isotope) isotope.arrange({ filter:this.getAttribute('data-filter') });
      aosInit();
    }));
  });

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(item => item.addEventListener('click', () => item.parentNode?.classList.toggle('faq-active')));

  window.addEventListener('load', () => {
    if (!window.location.hash) return;
    let section;
    try { section = document.querySelector(window.location.hash); } catch (_) { return; }
    if (!section) return;
    window.setTimeout(() => {
      const margin = parseInt(getComputedStyle(section).scrollMarginTop, 10) || 0;
      window.scrollTo({ top:section.offsetTop - margin, behavior:'smooth' });
    }, 100);
  });

  const navLinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const position = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      let section;
      try { section = document.querySelector(link.hash); } catch (_) { return; }
      if (!section) return;
      link.classList.toggle('active', position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight);
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy, { passive:true });
})();
