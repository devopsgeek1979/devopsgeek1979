document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav]');

  navLinks.forEach((link) => {
    const target = link.getAttribute('href');
    if (target === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
