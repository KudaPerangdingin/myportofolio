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
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
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

  // ===== 4. FORM HANDLER (FINAL VERSION) =====
  const contactForm = document.getElementById('contactForm');
  const formContainer = document.getElementById('formContainer');
  const successMessage = document.getElementById('successMessage');
  const submitBtn = document.getElementById('submitBtn');

  // CEK DULU APAKAH SEMUA ELEMENT ADA
  if (contactForm && formContainer && successMessage && submitBtn) {
    console.log('✅ Form elements ditemukan');
    
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Disable button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Mengirim...';
      
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          // Sembunyikan form, tampilkan success message
          formContainer.style.display = 'none';
          successMessage.style.display = 'block';
          contactForm.reset();
        } else {
          const data = await response.json();
          alert('Error: ' + (data?.errors?.[0]?.message || 'Gagal kirim'));
          submitBtn.disabled = false;
          submitBtn.textContent = 'kirim pesan';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Gagal mengirim pesan. Cek koneksi internet.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'kirim pesan';
      }
    });
  } else {
    console.log('⚠️ Form elements tidak ditemukan, cek ID di HTML');
    if (!contactForm) console.log('contactForm tidak ada');
    if (!formContainer) console.log('formContainer tidak ada');
    if (!successMessage) console.log('successMessage tidak ada');
    if (!submitBtn) console.log('submitBtn tidak ada');
  }

  console.log('✅ Website siap!');
});