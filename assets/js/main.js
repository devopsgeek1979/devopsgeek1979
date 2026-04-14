// ── Scroll progress bar ────────────────────────────────
const bar = document.getElementById('scroll-progress');
if (bar) {
  const updateBar = () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? Math.min((scrolled / total) * 100, 100) + '%' : '0';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

// ── Active nav link ─────────────────────────────────────
document.querySelectorAll('[data-nav]').forEach(a => {
  if (a.href === location.href || location.pathname.endsWith(a.getAttribute('href'))) {
    a.classList.add('active');
  }
});

// ── Lucide icons ────────────────────────────────────────
if (typeof lucide !== 'undefined') lucide.createIcons();

// ── Skill bar animations (IntersectionObserver) ─────────
const fills = document.querySelectorAll('.skill-fill');
if (fills.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
}

// ── Card entrance animation on scroll ──────────────────
const animCards = document.querySelectorAll('.card');
if (animCards.length && 'IntersectionObserver' in window) {
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  animCards.forEach(c => {
    c.style.animationPlayState = 'paused';
    cardObs.observe(c);
  });
}
