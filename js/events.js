/**
 * NextEdge — events.js
 * Tab switcher for Upcoming / Past events
 */
(function () {
  'use strict';

  const tabBtns  = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');

      // Update buttons
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        // Fade in animation
        target.style.animation = 'none';
        target.offsetHeight;
        target.style.animation = 'fadeIn 0.3s ease';
      }
    });
  });

  // Inject keyframe
  if (!document.getElementById('events-keyframes')) {
    const style = document.createElement('style');
    style.id = 'events-keyframes';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

})();
