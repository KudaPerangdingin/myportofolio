// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== 1. INTERSECTION OBSERVER (fade-in animations) =====
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
    
    faders.forEach(el => observer.observe(el));
  }

// ===== 2. SMOOTH SCROLL =====
const navLinks = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header'); // Pindahkan ke luar event listener

if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Gunakan headerHeight yang sudah didefinisikan
          const headerHeight = header ? header.offsetHeight : 0; // CEK APAKAH HEADER ADA
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ===== 3. ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll('section');
if (sections.length > 0 && navLinks.length > 0) {
  window.addEventListener('scroll', function() {
    let current = '';
    // Gunakan header yang sudah didefinisikan di atas
    const headerHeight = header ? header.offsetHeight : 0; // CEK APAKAH HEADER ADA
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

  // ===== 3. ACTIVE NAVIGATION HIGHLIGHT =====
  const sections = document.querySelectorAll('section');
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function() {
      let current = '';
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  console.log('✅ Website siap!');
});