/**
 * NextEdge Research Scheme — main.js
 * Shared JS: Mobile menu, Scroll shadow, Active nav
 */

(function () {
  'use strict';

  // ── Navbar scroll shadow ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ── Hamburger / Mobile Menu ───────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── Active Nav Link ───────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Smooth counter animation ──────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.round(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Trigger counters when visible
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  // ── Newsletter form feedback ──────────────────────────────────
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (input && input.value.includes('@')) {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#15803D';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      } else if (input) {
        input.style.borderColor = 'var(--orange)';
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });
  });

  // ── Photo Band Stepped Carousel Slider ────────────────────────
  const photoTrack = document.querySelector('.photo-band-track');
  const photoWrapper = document.querySelector('.photo-band-wrapper');

  if (photoTrack && photoWrapper) {
    const panels = photoTrack.querySelectorAll('.photo-panel');
    let currentIndex = 0;
    let autoTimer = null;
    let isPaused = false;

    function updateCarousel() {
      if (!panels.length) return;
      
      const wrapperWidth = photoWrapper.offsetWidth;
      const targetPanel = panels[currentIndex];
      
      // Calculate exact offset to center targetPanel in photoWrapper
      const panelOffsetLeft = targetPanel.offsetLeft;
      const panelWidth = targetPanel.offsetWidth;
      const centerOffsetX = panelOffsetLeft - (wrapperWidth / 2) + (panelWidth / 2);

      photoTrack.style.transform = `translateX(-${centerOffsetX}px)`;

      // Update active highlight classes
      panels.forEach((p, idx) => {
        p.classList.toggle('active-center', idx === currentIndex);
      });
    }

    function nextSlide() {
      if (isPaused) return;
      currentIndex = (currentIndex + 1) % panels.length;
      updateCarousel();
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoTimer = setInterval(nextSlide, 3200);
    }

    function stopAutoSlide() {
      if (autoTimer) clearInterval(autoTimer);
    }

    // Hover / Touch interaction handling
    photoWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    photoWrapper.addEventListener('mouseleave', () => { isPaused = false; });
    photoWrapper.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    photoWrapper.addEventListener('touchend', () => { isPaused = false; });

    // Initial center positioning and window resize handler
    window.addEventListener('resize', updateCarousel);
    // Slight timeout for layout stabilization
    setTimeout(() => {
      updateCarousel();
      startAutoSlide();
    }, 150);
  }

})();
