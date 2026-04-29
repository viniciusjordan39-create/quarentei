/* ══════════════════════════════════════════════
   QUARENTEI — Dra. Bruna Ghetti
   Landing Page JavaScript
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ── STICKY BAR ── */
  const stickyBar = document.getElementById('stickyBar');
  const whatsappFloat = document.getElementById('whatsappFloat');

  if (stickyBar || whatsappFloat) {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (stickyBar) {
        scrollY > 500 ? stickyBar.classList.add('visible') : stickyBar.classList.remove('visible');
      }
      if (whatsappFloat) {
        // WhatsApp appears slightly after sticky bar for a staggered feel
        scrollY > 700 ? whatsappFloat.classList.add('visible') : whatsappFloat.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ── FAQ ACCORDION ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach((i) => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href="#preco"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('preco');
      if (target) {
        const offset = 32;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── CHECKOUT LINK HANDLER ── */
  // Replace all checkout placeholder links at runtime.
  // Set your real link in the CHECKOUT_URL variable below.
  const CHECKOUT_URL = 'SEU_LINK_DE_CHECKOUT_AQUI';

  document.querySelectorAll('[data-checkout]').forEach((el) => {
    el.setAttribute('href', CHECKOUT_URL);
    el.addEventListener('click', (e) => {
      if (CHECKOUT_URL === 'SEU_LINK_DE_CHECKOUT_AQUI') {
        e.preventDefault();
        console.warn('QUARENTEI: defina a URL de checkout em js/main.js (CHECKOUT_URL)');
      }
    });
  });

  /* ── HEADER SCROLL EFFECT (se existir) ── */
  const header = document.getElementById('pageHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── INTERSECTION COUNTER (proof bar numbers) ── */
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el      = entry.target;
        const target  = parseInt(el.getAttribute('data-count'), 10);
        const suffix  = el.getAttribute('data-suffix') || '';
        const duration = 1600; // ms
        const start   = performance.now();

        const tick = (now) => {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out quad
          const eased    = 1 - (1 - progress) * (1 - progress);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => counterObserver.observe(el));

})();
