/**
 * NexEdge Research Scheme — main.js
 * Shared JS: Mobile menu, Scroll shadow, Active nav, Counters, Scroll Reveal, Photo Carousel & Modals
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

  // ── Smooth counter & decimal/fill bar animation (Task 7) ──────
  function animateCounter(el) {
    const targetAttr = el.getAttribute('data-target');
    if (!targetAttr) return;
    const target = parseFloat(targetAttr);
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const currentVal = eased * target;

      if (el.classList.contains('stat-bar-fill')) {
        el.style.width = `${currentVal.toFixed(decimals)}%`;
      } else {
        el.textContent = decimals > 0 
          ? currentVal.toFixed(decimals) + suffix 
          : Math.round(currentVal).toLocaleString() + suffix;
      }

      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Trigger counters and fill bars when visible
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    counters.forEach(c => observer.observe(c));
  }

  // ── Scroll reveal (cards + section intros) ────────────────────
  const revealSelectors = [
    '.stat-card-6', '.pillar-card', '.program-card',
    '.program-detail-card', '.mission-card', '.community-card',
    '.stats-text-col', '.programs-heading-block', '.analytics-chart-box'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  if (revealEls.length && 'IntersectionObserver' in window) {
    revealEls.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 6) * 70}ms`;
    });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ── Newsletter form feedback (Task 6: demo-only note) ─────────
  // NOTE: demo-only — simulates success client-side; no backend/email wired up yet.
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

  // ── Photo Band Stepped Carousel Slider (Task 0, 0b & Task 8) ───
  const photoTrack = document.querySelector('.photo-band-track');
  const photoWrapper = document.querySelector('.photo-band-wrapper');

  if (photoTrack && photoWrapper) {
    const panels = photoTrack.querySelectorAll('.photo-panel');
    let currentIndex = 0;
    let autoTimer = null;
    let fastTimer = null;
    let isPaused = false;

    // Inject visual indicators for edge zones if not present
    let leftIndicator = photoWrapper.querySelector('.photo-edge-indicator.left');
    let rightIndicator = photoWrapper.querySelector('.photo-edge-indicator.right');
    if (!leftIndicator) {
      leftIndicator = document.createElement('div');
      leftIndicator.className = 'photo-edge-indicator left';
      leftIndicator.innerHTML = '<div class="photo-edge-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></div>';
      photoWrapper.appendChild(leftIndicator);
    }
    if (!rightIndicator) {
      rightIndicator = document.createElement('div');
      rightIndicator.className = 'photo-edge-indicator right';
      rightIndicator.innerHTML = '<div class="photo-edge-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>';
      photoWrapper.appendChild(rightIndicator);
    }

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
      if (!panels.length) return;
      currentIndex = (currentIndex + 1) % panels.length;
      updateCarousel();
    }

    function prevSlide() {
      if (!panels.length) return;
      currentIndex = (currentIndex - 1 + panels.length) % panels.length;
      updateCarousel();
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoTimer = setInterval(() => {
        if (!isPaused) nextSlide();
      }, 3200);
    }

    function stopAutoSlide() {
      if (autoTimer) clearInterval(autoTimer);
      if (fastTimer) clearInterval(fastTimer);
      fastTimer = null;
    }

    function startFastAdvance(direction) {
      if (fastTimer) clearInterval(fastTimer);
      if (direction === 'prev') {
        prevSlide();
        fastTimer = setInterval(prevSlide, 800);
      } else {
        nextSlide();
        fastTimer = setInterval(nextSlide, 800);
      }
    }

    function stopFastAdvance() {
      if (fastTimer) {
        clearInterval(fastTimer);
        fastTimer = null;
      }
      leftIndicator.classList.remove('active');
      rightIndicator.classList.remove('active');
    }

    function handleEdgeZonePosition(clientX) {
      const rect = photoWrapper.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const ratio = relativeX / rect.width;

      if (ratio < 0.15) {
        // Left edge zone (~15%)
        isPaused = true;
        leftIndicator.classList.add('active');
        rightIndicator.classList.remove('active');
        if (!fastTimer) startFastAdvance('prev');
      } else if (ratio > 0.85) {
        // Right edge zone (~15%)
        isPaused = true;
        rightIndicator.classList.add('active');
        leftIndicator.classList.remove('active');
        if (!fastTimer) startFastAdvance('next');
      } else {
        // Center zone
        stopFastAdvance();
        isPaused = true;
      }
    }

    // Hover / Pointer edge handling
    photoWrapper.addEventListener('mousemove', (e) => {
      handleEdgeZonePosition(e.clientX);
    });

    photoWrapper.addEventListener('mouseleave', () => {
      stopFastAdvance();
      isPaused = false;
    });

    // Touch edge handling
    photoWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        handleEdgeZonePosition(e.touches[0].clientX);
      }
    }, { passive: true });

    photoWrapper.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleEdgeZonePosition(e.touches[0].clientX);
      }
    }, { passive: true });

    photoWrapper.addEventListener('touchend', () => {
      stopFastAdvance();
      isPaused = false;
    });

    // Initial center positioning and window resize handler
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
    startAutoSlide();
  }

  // ── Modal Popup Handler (Task 6: demo-only note) ─────────────
  window.openNexEdgeModal = function (title, subtitle, fields = []) {
    let backdrop = document.getElementById('nexedge-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'nexedge-modal-backdrop';
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal-box">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <div class="modal-header">
            <h3 id="nexedge-modal-title">Modal Title</h3>
            <p id="nexedge-modal-subtitle">Modal Subtitle</p>
          </div>
          <form id="nexedge-modal-form">
            <div id="nexedge-modal-body"></div>
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:1.2rem; justify-content:center;">Submit Application</button>
          </form>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.querySelector('.modal-close').addEventListener('click', () => {
        backdrop.classList.remove('active');
      });
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('active');
      });

      // NOTE: demo-only — simulates success client-side; no backend/email wired up yet.
      backdrop.querySelector('#nexedge-modal-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Submitted Successfully ✓';
        btn.style.background = '#15803D';
        setTimeout(() => {
          backdrop.classList.remove('active');
          btn.disabled = false;
          btn.textContent = 'Submit Application';
          btn.style.background = '';
          e.target.reset();
        }, 1500);
      });
    }

    document.getElementById('nexedge-modal-title').textContent = title;
    document.getElementById('nexedge-modal-subtitle').textContent = subtitle;
    const body = document.getElementById('nexedge-modal-body');
    
    let fieldsHTML = `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div>
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Full Name *</label>
          <input type="text" placeholder="Enter your full name" required style="width:100%; padding:0.6rem 0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;" />
        </div>
        <div>
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Email Address *</label>
          <input type="email" placeholder="your.email@example.com" required style="width:100%; padding:0.6rem 0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;" />
        </div>
        <div>
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Institution / Organization *</label>
          <input type="text" placeholder="e.g., UNIZIK, UNILAG, Oxford, etc." required style="width:100%; padding:0.6rem 0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;" />
        </div>
        <div>
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Additional Notes / Inquiry</label>
          <textarea placeholder="Briefly describe your interest or request..." rows="3" style="width:100%; padding:0.6rem 0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none; font-family:inherit;"></textarea>
        </div>
      </div>
    `;
    body.innerHTML = fieldsHTML;

    backdrop.classList.add('active');
  };

  // Bind trigger buttons across pages
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-title]');
    if (trigger) {
      e.preventDefault();
      const title = trigger.getAttribute('data-modal-title');
      const subtitle = trigger.getAttribute('data-modal-subtitle') || 'Fill in your details below to get started.';
      window.openNexEdgeModal(title, subtitle);
    }
  });

})();
