// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== 1. INTERSECTION OBSERVER (fade-in animations) =====
  const faders = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { 
    threshold: 0.2, 
    rootMargin: '0px 0px -20px 0px' 
  });

  faders.forEach(el => observer.observe(el));

  // ===== 2. FORM HANDLER (contact → success message) =====
  const form = document.getElementById('realContactForm');
  const formContainer = document.getElementById('contactFormContainer');
  const successDiv = document.getElementById('successBlock');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Ambil data form
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      console.log('Form submitted:', { name, email, message });
      
      // Sembunyikan form, tampilkan success message
      formContainer.classList.add('hidden');
      successDiv.classList.remove('hidden');
      
      // Reset form
      form.reset();
    });
  }

  // ===== 3. SMOOTH SCROLL =====
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== 4. ACTIVE NAVIGATION HIGHLIGHT =====
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    let current = '';
    const headerHeight = document.querySelector('header').offsetHeight;
    
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

  console.log('✅ Website siap!');
});