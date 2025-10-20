document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  const initAnimations = () => {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
  };

  initAnimations();
  animateOnScroll();
  
  window.addEventListener('scroll', animateOnScroll);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});