
// Final interactive behaviors: typing roles, tilt, observer, EmailJS
// EmailJS Configuration & Function
function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !subject || !message) {
    alert("Please fill out all fields!");
    return;
  }

  const btn = document.querySelector(".form-card .submit");
  const originalText = btn.innerText;
  btn.innerText = "Sending...";
  btn.disabled = true;

  const params = {
    name: name,
    email: email,
    title: subject, // Changed from 'subject' to 'title' to match your template screenshot
    message: message,
  };

  if (typeof emailjs === 'undefined') {
    console.error("EmailJS library not loaded.");
    alert("❌ Error: Email service not available. Please refresh the page.");
    btn.innerText = originalText;
    btn.disabled = false;
    return;
  }

  emailjs
    .send("service_eoo7yk4", "template_z156fcn", params)
    .then((res) => {
      alert("✅ Message Sent Successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      // Detailed error messages for debugging
      let errorMsg = "❌ Failed to send email.";
      if (err.text) {
        errorMsg += " Details: " + err.text;
      } else if (err.status === 401 || err.status === 403) {
        errorMsg += " (Error: Invalid Public Key or Service/Template ID)";
      } else if (err.status === 412) {
        errorMsg += " (Error: Precondition failed - usually an issue with the template)";
      } else {
        errorMsg += " Please try again later.";
      }
      alert(errorMsg);
    })
    .finally(() => {
      btn.innerText = originalText;
      btn.disabled = false;
    });
}


document.addEventListener('DOMContentLoaded', function () {

  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      navToggle.querySelector('i').classList.toggle('fa-bars');
      navToggle.querySelector('i').classList.toggle('fa-xmark');
    });
  }

  // Close nav on click (mobile)
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('active'));
  });

  // 💎 Premium Technology Background: 3D Floating Geometric Shards
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, shards = [];
  const shardCount = 25;
  const mouse = { x: 0, y: 0 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX - width / 2) * 0.05;
    mouse.y = (e.clientY - height / 2) * 0.05;
  });
  resize();

  class Shard {
    constructor() {
      this.init();
    }
    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.z = Math.random() * 500 + 100;
      this.size = Math.random() * 40 + 20;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      this.opacity = Math.random() * 0.1 + 0.05;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.x < -100) this.x = width + 100;
      if (this.x > width + 100) this.x = -100;
      if (this.y < -100) this.y = height + 100;
      if (this.y > height + 100) this.y = -100;
    }
    draw() {
      const scale = 400 / (400 + this.z);
      const px = (this.x - width / 2 + mouse.x * scale) * scale + width / 2;
      const py = (this.y - height / 2 + mouse.y * scale) * scale + height / 2;
      const s = this.size * scale;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(this.rotation);

      // Triangle Shard
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s, s);
      ctx.lineTo(-s, s);
      ctx.closePath();

      ctx.fillStyle = `rgba(45, 214, 191, ${this.opacity})`;
      ctx.strokeStyle = `rgba(45, 214, 191, ${this.opacity + 0.2})`;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();

      // Add a small glowing dot at one corner
      ctx.fillStyle = `rgba(45, 214, 191, ${this.opacity * 2})`;
      ctx.beginPath();
      ctx.arc(0, -s, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < shardCount; i++) shards.push(new Shard());

  function animate() {
    ctx.fillStyle = "#02060f";
    ctx.fillRect(0, 0, width, height);

    shards.forEach(s => {
      s.update();
      s.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  // Typed-like simple rotator for roles
  const roles = ['Python Developer', 'AI Architect', 'Prompt Engineer', 'Full Stack Developer', 'Data Analyst', 'Creative Editor', 'UI/UX Designer', 'Marketing Strategist'];
  let ri = 0;
  const roleEl = document.getElementById('roleTyped');
  function typeRole() {
    const text = roles[ri % roles.length];
    let i = 0;
    roleEl.textContent = '';
    const t = setInterval(() => {
      roleEl.textContent += text[i++] || '';
      if (i > text.length) { clearInterval(t); setTimeout(() => { eraseRole(); }, 1100); }
    }, 70);
  }
  function eraseRole() {
    let s = roleEl.textContent;
    let i = s.length;
    const t = setInterval(() => {
      roleEl.textContent = s.slice(0, --i);
      if (i <= 0) { clearInterval(t); ri++; setTimeout(typeRole, 250); }
    }, 30);
  }
  typeRole();

  // tilt effect for elements with data-tilt
  function applyTilt(el, e) {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * 10;
    const ry = (x - 0.5) * -10;
    el.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(6px)';
    const img = el.querySelector('img');
    if (img) img.style.transform = 'translate(' + ((x - 0.5) * 8) + 'px,' + ((y - 0.5) * 8) + 'px) scale(1.02)';
  }
  function resetTilt(el) {
    el.style.transform = '';
    const img = el.querySelector('img'); if (img) img.style.transform = '';
  }
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => applyTilt(el, e));
    el.addEventListener('mouseleave', () => resetTilt(el));
    el.addEventListener('mouseenter', () => el.style.transition = 'transform .18s ease');
  });

  // 🖱️ Custom Cursor Follow Logic
  const cursor = document.getElementById('custom-cursor');
  document.addEventListener('mousemove', (e) => {
    if (cursor) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }
  });

  // 🕵️ Enhanced Scroll Reveal Observer
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .skill-card, .project-card, .service-card, .exp-card').forEach(el => {
    el.classList.add('reveal'); // Ensure all items have the base class
    revealObs.observe(el);
  });

  // profile parallax
  const profile = document.getElementById('profileCard');
  window.addEventListener('scroll', () => { if (profile) profile.style.transform = 'translateY(' + Math.min(window.scrollY * 0.04, 20) + 'px)'; });

  // project image click placeholder
  document.querySelectorAll('.project-card .proj-thumb').forEach(a => a.addEventListener('click', e => { e.preventDefault(); alert('Project preview — replace link with live demo or repo.'); }));
});
// Dynamic color effect on hover
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(47,214,191,0.25), rgba(255,255,255,0.02))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--card)';
  });
});

