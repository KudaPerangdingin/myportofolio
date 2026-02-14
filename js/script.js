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

  // ===== 2. SMOOTH SCROLL =====
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

// ===== FORM HANDLER DENGAN SUCCESS MESSAGE =====
const contactForm = document.getElementById('contactForm');
const formContainer = document.getElementById('formContainer');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable button biar gak double klik
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Sembunyikan form, tampilkan success message
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form untuk next time
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          alert(data.errors.map(error => error.message).join(', '));
        } else {
          alert('Gagal mengirim pesan. Coba lagi nanti.');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'kirim pesan';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Cek koneksi internet Anda.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'kirim pesan';
    }
  });
}
  console.log('✅ Website siap!');
});