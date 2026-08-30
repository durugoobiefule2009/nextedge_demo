/**
 * NexEdge — programs.js
 * Gallery filter logic
 */
(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          // Animate in
          item.style.animation = 'none';
          item.offsetHeight; // reflow
          item.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Inject keyframe if not present
  if (!document.getElementById('gallery-keyframes')) {
    const style = document.createElement('style');
    style.id = 'gallery-keyframes';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

})();
