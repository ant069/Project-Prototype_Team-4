document.addEventListener('DOMContentLoaded', () => {
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elementos a animar (puedes añadir más selectores)
  const targets = document.querySelectorAll(
    '.animate-on-scroll, .stat-card, .exercise-card, .feature-card, .resource-card, .recent-session-card'
  );

  if (prefersReduce) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible', 'animate-slide-up'); // usa tus keyframes existentes
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  targets.forEach(el => {
    el.classList.add('animate-on-scroll');
    io.observe(el);
  });

  // Counter-up opcional para elementos con data-count
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const end = parseInt(el.getAttribute('data-count'), 10);
    if (Number.isNaN(end)) return;
    let start = 0;
    const duration = 800;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      el.textContent = Math.floor(start + (end - start) * p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
});