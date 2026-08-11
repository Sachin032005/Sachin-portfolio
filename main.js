/* Send handler - kept in global scope in case it is called inline from HTML */
function handleSend(event) {
  const btn = event ? event.target : window.event.target;
  btn.textContent = '✅ Message Sent!';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.textContent = 'Send Message ✉️';
    btn.style.background = '';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  /* ─── TOAST NOTIFICATION UTILITY ─── */
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    // Set appropriate icon
    let iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';
    
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ─── CURSOR GLOW ─── */
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ─── NAVBAR MOBILE MENU & SCROLL STATE ─── */
  const nav = document.querySelector('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when links are clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Navbar glass opacity on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  /* ─── ACTIVE NAV LINK HIGHLIGHT ─── */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 150) {
        current = s.id;
      }
    });
    allNavLinks.forEach(a => {
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--accent)';
      } else {
        a.style.color = '';
      }
    });
  });

  /* ─── SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { 
      if (e.isIntersecting) {
        e.target.classList.add('visible'); 
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  /* ─── SKILL BAR ANIMATION ─── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  
  const grid = document.getElementById('skillsGrid');
  if (grid) skillObserver.observe(grid);

  /* ─── ANIMATE SKILL ITEMS ON SCROLL ─── */
  const skillItems = document.querySelectorAll('.skill-item');
  const si = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const index = Array.from(skillItems).indexOf(e.target);
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, index * 80);
        si.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillItems.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    s.style.transition = 'opacity 0.6s var(--transition), transform 0.6s var(--transition), border-color 0.3s, box-shadow 0.3s';
    si.observe(s);
  });

  /* ─── CONTACT CARD ANIMATION ─── */
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0px) scale(1)';
    });
  });

  /* Note: Resume viewing and downloading are handled natively via HTML attributes in index.html */
});