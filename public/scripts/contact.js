// Tyson Shields Portfolio — Contact Page Scripts (Validation & Spam Protection)
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formConfirmation = document.getElementById('form-confirmation');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const honeypot = document.querySelector('input[name="_gotcha"]');

  if (contactForm && formConfirmation) {
    contactForm.addEventListener('submit', (e) => {
      // Spam honeypot detection
      if (honeypot && honeypot.value.trim() !== '') {
        e.preventDefault();
        // Silent rejection for bots: simulate successful reception without relaying
        contactForm.classList.add('is-hidden');
        formConfirmation.classList.remove('is-hidden');
        return;
      }

      // Check form validity
      if (!contactForm.checkValidity()) {
        e.preventDefault();
        contactForm.reportValidity();
        return;
      }

      contactForm.classList.add('is-hidden');
      formConfirmation.classList.remove('is-hidden');
    });

    resetFormBtn?.addEventListener('click', () => {
      contactForm.reset();
      formConfirmation.classList.add('is-hidden');
      contactForm.classList.remove('is-hidden');
    });
  }
});
