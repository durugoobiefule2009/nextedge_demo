/**
 * NexEdge Research Scheme — contact.js
 * Contact form handling with client-side feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (contactForm) {
    // NOTE: demo-only — simulates success client-side; no backend/email wired up yet.
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const btn = contactForm.querySelector('button[type="submit"]');

      if (name && email && email.includes('@')) {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Submitting Inquiry...';
        }
        setTimeout(() => {
          if (statusMsg) {
            statusMsg.style.color = '#15803D';
            statusMsg.textContent = 'Thank you! Your inquiry has been submitted successfully. Our team will reach out shortly.';
          }
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Submit Inquiry ✓';
            btn.style.background = '#15803D';
          }
          contactForm.reset();
          setTimeout(() => {
            if (btn) {
              btn.textContent = 'Submit Inquiry →';
              btn.style.background = '';
            }
            if (statusMsg) statusMsg.textContent = '';
          }, 4000);
        }, 1000);
      } else {
        if (statusMsg) {
          statusMsg.style.color = 'var(--orange)';
          statusMsg.textContent = 'Please complete all required fields with a valid email address.';
        }
      }
    });
  }
});
