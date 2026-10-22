/**
 * @file scripts/404.js
 * @description 404 Route Recovery handler. Provides an accessible countdown
 * timer to return to the homepage, cancellable upon any user interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    let remaining = 5;
    let cancelled = false;

    // Allow user to cancel auto-redirect by clicking or keypress
    window.addEventListener('click', () => { cancelled = true; }, { once: true });
    window.addEventListener('keydown', () => { cancelled = true; }, { once: true });

    const timer = setInterval(() => {
      if (cancelled) {
        clearInterval(timer);
        return;
      }
      remaining -= 1;
      countdown.textContent = String(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        window.location.href = 'index.html';
      }
    }, 1000);
  }
});
