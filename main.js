

/* Cursor Glow */
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  /* Scroll Reveal */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  /* Skill Bar Animation */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  const grid = document.getElementById('skillsGrid');
  if (grid) skillObserver.observe(grid);

  /* Animate skill items on scroll */
  const skillItems = document.querySelectorAll('.skill-item');
  const si = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, Array.from(skillItems).indexOf(e.target) * 80);
        si.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  skillItems.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
    si.observe(s);
  });

  /* Send handler */
  function handleSend() {
    const btn = event.target;
    btn.textContent = '✅ Message Sent!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = 'Send Message ✉️';
      btn.style.background = '';
    }, 3000);
  }

  /* Active nav link highlight */
  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  });


  // CONTACT CARD ANIMATION

const contactCards =
document.querySelectorAll(".contact-card");

contactCards.forEach((card)=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
        "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "translateY(0px) scale(1)";

    });

});