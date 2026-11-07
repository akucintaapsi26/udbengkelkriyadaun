/**
 * Template Name: BizLand
 * Local behavior and enhancements for UD Bengkel Kriya Daun 9996.
 */
(function() {
  "use strict";

  // Load site-specific styling without modifying the upstream template stylesheet.
  const siteStyles = document.createElement('link');
  siteStyles.rel = 'stylesheet';
  siteStyles.href = 'assets/css/site-overrides.css';
  document.head.appendChild(siteStyles);

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
  if (scrollTop) {
    scrollTop.addEventListener('click', event => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, { passive: true });

  function aosInit() {
    if (window.AOS) window.AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
  }
  window.addEventListener('load', aosInit);

  // Direct product questions to WhatsApp with a ready-to-send product-specific message.
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
  if (window.GLightbox) {
    window.GLightbox({ selector: '.glightbox', descPosition: 'bottom', moreText: 'Baca selengkapnya', moreLength: 160, loop: true });
  }

  document.querySelectorAll('.skills-animation').forEach(item => {
    if (!window.Waypoint) return;
    new window.Waypoint({
      element: item,
      offset: '80%',
      handler: function() {
        item.querySelectorAll('.progress .progress-bar').forEach(bar => {
          bar.style.width = `${bar.getAttribute('aria-valuenow') || 0}%`;
        });
      }
    });
  });
  if (window.PureCounter) new window.PureCounter();

  function initSwiper() {
    if (!window.Swiper) return;
    document.querySelectorAll('.init-swiper').forEach(element => {
      const configElement = element.querySelector('.swiper-config');
      if (!configElement) return;
      try {
        const config = JSON.parse(configElement.textContent.trim());
        if (element.classList.contains('swiper-tab') && window.initSwiperWithCustomPagination) {
          window.initSwiperWithCustomPagination(element, config);
        } else {
          new window.Swiper(element, config);
        }
      } catch (error) {
        console.error('Konfigurasi slider tidak valid:', error);
      }
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
    window.imagesLoaded(container, () => {
      isotope = new window.Isotope(container, { itemSelector: '.isotope-item', layoutMode: layout, filter, sortBy: sort });
    });
    element.querySelectorAll('.isotope-filters li').forEach(item => {
      item.addEventListener('click', function() {
        element.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        if (isotope) isotope.arrange({ filter: this.getAttribute('data-filter') });
        aosInit();
      });
    });
  });

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(item => {
    item.addEventListener('click', () => item.parentNode?.classList.toggle('faq-active'));
  });

  window.addEventListener('load', () => {
    if (!window.location.hash) return;
    let section;
    try { section = document.querySelector(window.location.hash); } catch (_) { return; }
    if (!section) return;
    window.setTimeout(() => {
      const margin = parseInt(getComputedStyle(section).scrollMarginTop, 10) || 0;
      window.scrollTo({ top: section.offsetTop - margin, behavior: 'smooth' });
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
      const active = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
      link.classList.toggle('active', active);
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy, { passive: true });
})();
