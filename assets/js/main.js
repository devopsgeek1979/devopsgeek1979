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

// ── Photo Modal Handler ──────────────────────────────────
const photoModal = document.getElementById('photoModal');
const profilePhotoBtn = document.querySelector('.profile-photo-btn');
const closePhotoModal = document.getElementById('closePhotoModal');

if (photoModal && profilePhotoBtn) {
  profilePhotoBtn.addEventListener('click', () => {
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  const closeModal = () => {
    photoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  closePhotoModal?.addEventListener('click', closeModal);
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) closeModal();
  });
}

// ── Page Preview Tooltips on Headings ────────────────────
const pageNames = {
  'index.html': 'Home',
  'about.html': 'About Profile',
  'experience.html': 'My Experience',
  'projects.html': 'Featured Projects',
  'contact.html': 'Get in Touch',
  'repos.html': 'GitHub Repos'
};
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const headings = document.querySelectorAll('h1, h2, h3');
headings.forEach(h => {
  if (!h.closest('.footer')) {
    h.classList.add('page-preview-trigger');
    const tooltip = document.createElement('div');
    tooltip.className = 'page-preview-tooltip';
    tooltip.textContent = `Page: ${pageNames[currentPage] || 'Portfolio'}`;
    h.appendChild(tooltip);
  }
});
// ── Photo modal (click to enlarge profile photo) ───────
const photoModal = document.getElementById('photoModal');
const photoBtn = document.querySelector('.profile-photo-btn');
const closeModalBtn = document.getElementById('closePhotoModal');

if (photoBtn && photoModal) {
  photoBtn.addEventListener('click', () => {
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeModalBtn && photoModal) {
  closeModalBtn.addEventListener('click', e => {
    e.stopPropagation();
    photoModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (photoModal) {
  photoModal.addEventListener('click', e => {
    if (e.target === photoModal) {
      photoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) {
      photoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
