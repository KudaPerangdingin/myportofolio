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

  // ===== 2. FORM HANDLER UNTUK FORMSPREE =====
  const form = document.querySelector('form[action*="formspree"]');
  const formContainer = document.getElementById('contactFormContainer');
  const successDiv = document.getElementById('successBlock');

  // CEK DULU APAKAH FORM ADA
  if (form) {
    console.log('✅ Form ditemukan, siap digunakan');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Sembunyikan form, tampilkan success message
          if (formContainer) formContainer.classList.add('hidden');
          if (successDiv) successDiv.classList.remove('hidden');
          form.reset();
        } else {
          alert('Gagal mengirim pesan. Coba lagi nanti.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Gagal mengirim pesan. Cek koneksi internet Anda.');
      });
    });
  } else {
    console.log('⚠️ Form tidak ditemukan di halaman ini');
  }

  // ===== 3. SMOOTH SCROLL =====
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
          e.preventDefault();
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ===== 4. ACTIVE NAVIGATION HIGHLIGHT =====
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