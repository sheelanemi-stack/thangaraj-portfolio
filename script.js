/**
 * THANGARAJ P - PORTFOLIO INTERACTIVITY & HARDWARE SIMULATION
 * Modern Vanilla JavaScript for ECE Student Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initStickyHeader();
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initBackToTop();
  initCopyButtons();
  initContactForm();
  initCircuitCanvas();
  initDynamicTyping();
  initStatsCounter();
  initOscilloscopeSimulator();
  initSkillFiltering();
  initModals();
  init3DCardTilt();
  updateFooterYear();
});

/* ==========================================================================
   0. MULTI-PALETTE THEME SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const themeDots = document.querySelectorAll('.theme-dot');
  if (!themeDots.length) return;

  const savedTheme = localStorage.getItem('thangaraj_theme') || 'emerald';
  applyTheme(savedTheme);

  themeDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const selectedTheme = dot.getAttribute('data-theme-set');
      if (selectedTheme) {
        applyTheme(selectedTheme);
        localStorage.setItem('thangaraj_theme', selectedTheme);
      }
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeDots.forEach((dot) => {
      if (dot.getAttribute('data-theme-set') === theme) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   1. STICKY HEADER & ACTIVE NAV SCROLL SPY
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
}

/* ==========================================================================
   2. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking outside of the mobile drawer
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   3. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   4. DYNAMIC ANIMATED TYPING IN HERO TERMINAL
   ========================================================================== */
function initDynamicTyping() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const roles = [
    "Aspiring ECE Engineer",
    "Embedded Systems Enthusiast",
    "MATLAB & LTspice Simulation",
    "AI & TinyML Learner",
    "Hardware & Circuit Prototyping"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Brief pause before next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   5. ANIMATED STATS NUMBERS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const decimal = parseInt(counter.getAttribute('data-decimal')) || 0;
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = (target * easeOut).toFixed(decimal);

            counter.textContent = currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toFixed(decimal) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   6. INTERACTIVE SIGNAL & WAVEFORM OSCILLOSCOPE SIMULATOR
   Authentic real-time CRT phosphor oscilloscope with analog, digital, PWM, and noise filtering
   ========================================================================== */
function initOscilloscopeSimulator() {
  const canvas = document.getElementById('oscilloscopeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  // Oscilloscope Parameters
  let currentWave = 'sine'; // 'sine', 'square', 'pwm', 'noisy'
  let frequency = 2; // 1 to 5
  let amplitude = 3.3; // 1 to 5
  let filterActive = false;
  let phase = 0;

  // DOM Elements
  const waveButtons = document.querySelectorAll('.wave-btn');
  const freqRange = document.getElementById('freqRange');
  const ampRange = document.getElementById('ampRange');
  const filterToggle = document.getElementById('filterToggle');
  const freqDisp = document.getElementById('freqDisp');
  const ampDisp = document.getElementById('ampDisp');

  const scopeVpp = document.getElementById('scopeVpp');
  const scopeFreq = document.getElementById('scopeFreq');
  const scopeVrms = document.getElementById('scopeVrms');

  // Waveform Button Listener
  waveButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      waveButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentWave = btn.getAttribute('data-wave');
      updateHUD();
    });
  });

  // Slider Listeners
  if (freqRange) {
    freqRange.addEventListener('input', (e) => {
      frequency = parseFloat(e.target.value);
      if (freqDisp) freqDisp.textContent = `${(frequency * 0.5).toFixed(1)} kHz`;
      updateHUD();
    });
  }

  if (ampRange) {
    ampRange.addEventListener('input', (e) => {
      amplitude = parseFloat(e.target.value);
      if (ampDisp) ampDisp.textContent = `${amplitude.toFixed(1)} V`;
      updateHUD();
    });
  }

  // Filter Toggle Listener
  if (filterToggle) {
    filterToggle.addEventListener('change', (e) => {
      filterActive = e.target.checked;
      updateHUD();
    });
  }

  function updateHUD() {
    const vppVal = amplitude.toFixed(2);
    const freqVal = (frequency * 0.5).toFixed(2);
    const rmsVal = (amplitude / (currentWave === 'square' ? 1 : Math.SQRT2)).toFixed(2);

    if (scopeVpp) scopeVpp.textContent = `${vppVal} V`;
    if (scopeFreq) scopeFreq.textContent = `${freqVal} kHz`;
    if (scopeVrms) scopeVrms.textContent = `${rmsVal} V`;
  }

  updateHUD();

  // Noise generator cache for continuous smooth noise
  const noiseBuffer = [];
  for (let i = 0; i < 500; i++) {
    noiseBuffer.push((Math.random() - 0.5) * 2);
  }

  // Render Loop
  function drawWaveform() {
    ctx.clearRect(0, 0, width, height);

    const midY = height / 2;
    const ampPixels = (amplitude / 5) * (height * 0.38);
    const step = 2;
    const pointsCount = Math.floor(width / step);

    // Glowing phosphor trace setup
    const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00f5a0';
    ctx.beginPath();
    ctx.lineWidth = 2.5;

    if (currentWave === 'noisy' && !filterActive) {
      ctx.strokeStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
    } else if (currentWave === 'pwm') {
      ctx.strokeStyle = '#818cf8';
      ctx.shadowColor = '#818cf8';
    } else {
      ctx.strokeStyle = themeAccent;
      ctx.shadowColor = themeAccent;
    }
    ctx.shadowBlur = 12;

    for (let i = 0; i <= pointsCount; i++) {
      const x = i * step;
      const angle = (x / width) * Math.PI * 4 * frequency + phase;
      let y = 0;

      switch (currentWave) {
        case 'sine':
          y = Math.sin(angle);
          break;
        case 'square':
          y = Math.sin(angle) >= 0 ? 1 : -1;
          break;
        case 'pwm':
          // 40% duty cycle simulation
          y = (angle % (Math.PI * 2)) / (Math.PI * 2) < 0.4 ? 1 : -1;
          break;
        case 'noisy':
          const base = Math.sin(angle);
          if (filterActive) {
            // Simulated MATLAB DSP low-pass filter (attenuates high frequencies)
            const mildNoise = noiseBuffer[i % noiseBuffer.length] * 0.08;
            y = base + mildNoise;
          } else {
            // Raw unfiltered noise
            const heavyNoise = noiseBuffer[i % noiseBuffer.length] * 0.45;
            y = base + heavyNoise;
          }
          break;
        default:
          y = Math.sin(angle);
      }

      const plotY = midY - y * ampPixels;

      if (i === 0) {
        ctx.moveTo(x, plotY);
      } else {
        ctx.lineTo(x, plotY);
      }
    }

    ctx.stroke();

    // Advance phase
    phase += 0.045 * frequency;

    requestAnimationFrame(drawWaveform);
  }

  drawWaveform();
}

/* ==========================================================================
   7. SKILL CATEGORY FILTERING
   ========================================================================== */
function initSkillFiltering() {
  const filterButtons = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.classList.remove('card-filtered-out');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.classList.add('card-filtered-out');
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE MODALS (DOSSIER & PROJECT SPEC)
   ========================================================================== */
function initModals() {
  // Dossier Modal
  const dossierBackdrop = document.getElementById('dossierModalBackdrop');
  const heroDossierBtn = document.getElementById('heroDossierBtn');
  const navDossierBtn = document.getElementById('navDossierBtn');
  const closeDossierBtn = document.getElementById('closeDossierBtn');
  const printDossierBtn = document.getElementById('printDossierBtn');

  function openDossier() {
    if (!dossierBackdrop) return;
    dossierBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDossier() {
    if (!dossierBackdrop) return;
    dossierBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (heroDossierBtn) heroDossierBtn.addEventListener('click', openDossier);
  if (navDossierBtn) navDossierBtn.addEventListener('click', openDossier);
  if (closeDossierBtn) closeDossierBtn.addEventListener('click', closeDossier);

  if (printDossierBtn) {
    printDossierBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Project Technical Spec Modal
  const projectBackdrop = document.getElementById('projectModalBackdrop');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const specButtons = document.querySelectorAll('.open-spec-btn');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalSubtitle = document.getElementById('projectModalSubtitle');
  const projectModalContent = document.getElementById('projectModalContent');

  const projectSpecs = {
    "1": {
      title: "Smart Environmental Monitor & Hazard Alert System",
      subtitle: "Embedded Hardware Architecture & LTspice Power Conditioning",
      html: `
        <div class="spec-block-diagram">
          <div class="spec-node">
            <strong>Sensors</strong>
            <small>DHT11 &amp; MQ Gas</small>
          </div>
          <i class="fa-solid fa-arrow-right spec-arrow"></i>
          <div class="spec-node">
            <strong>Signal Conditioning</strong>
            <small>RC Filter &amp; ADC</small>
          </div>
          <i class="fa-solid fa-arrow-right spec-arrow"></i>
          <div class="spec-node">
            <strong>Microcontroller</strong>
            <small>Processing &amp; Logic</small>
          </div>
          <i class="fa-solid fa-arrow-right spec-arrow"></i>
          <div class="spec-node">
            <strong>Actuators</strong>
            <small>Buzzer &amp; LCD</small>
          </div>
        </div>

        <div class="spec-details-list">
          <div class="spec-detail-row">
            <div class="spec-icon-box"><i class="fa-solid fa-wave-square"></i></div>
            <div class="spec-text">
              <h5>LTspice Circuit Verification</h5>
              <p>Simulated 5V to 3.3V LDO linear regulation circuits with transient decoupling capacitors (10µF &amp; 0.1µF) to prevent supply voltage dropouts during buzzer switching transients.</p>
            </div>
          </div>
          <div class="spec-detail-row">
            <div class="spec-icon-box"><i class="fa-solid fa-sliders"></i></div>
            <div class="spec-text">
              <h5>Analog Sensor Calibration &amp; ADC Sampling</h5>
              <p>Configured 10-bit analog-to-digital conversion with moving-average software filtering to eliminate spurious ADC ripple on the MQ gas analog sensing pin.</p>
            </div>
          </div>
          <div class="spec-detail-row">
            <div class="spec-icon-box"><i class="fa-solid fa-shield-halved"></i></div>
            <div class="spec-text">
              <h5>Multi-Threshold Fail-Safe Protection</h5>
              <p>Implemented distinct safety thresholds: Level 1 (Audible alert beep), Level 2 (Continuous emergency alarm with critical LCD telemetry alert).</p>
            </div>
          </div>
        </div>
      `
    },
    "2": {
      title: "Digital Audio Signal Filtering & Noise Suppression in MATLAB",
      subtitle: "Discrete-Time Butterworth/IIR Modeling & FFT Spectral Analysis",
      html: `
        <div class="spec-block-diagram">
          <div class="spec-node">
            <strong>Noisy Audio Input</strong>
            <small>x[n] = s[n] + e[n]</small>
          </div>
          <i class="fa-solid fa-arrow-right spec-arrow"></i>
          <div class="spec-node">
            <strong>FFT Spectral Assessment</strong>
            <small>X(ω) Frequency Peak</small>
          </div>
          <i class="fa-solid fa-arrow-right spec-arrow"></i>
          <div class="spec-node">
            <strong>IIR Butterworth Filter</strong>
            <small>Order N=4, fc=3.5 kHz</small>
          </div>
          <i class="fa-solid fa-arrow-right spec-arrow"></i>
          <div class="spec-node">
            <strong>Restored Output</strong>
            <small>SNR Gain: +18.4 dB</small>
          </div>
        </div>

        <div class="spec-details-list">
          <div class="spec-detail-row">
            <div class="spec-icon-box"><i class="fa-solid fa-calculator"></i></div>
            <div class="spec-text">
              <h5>Filter Transfer Function Design</h5>
              <p>Derived 4th-order IIR Butterworth low-pass and notch filter polynomials with maximally flat passband response and zero ripple in MATLAB using bilinear transformation.</p>
            </div>
          </div>
          <div class="spec-detail-row">
            <div class="spec-icon-box"><i class="fa-solid fa-chart-line"></i></div>
            <div class="spec-text">
              <h5>Fast Fourier Transform (FFT) Spectral Verification</h5>
              <p>Computed 1024-point FFT before and after filtering to verify steep 24 dB/octave attenuation of 50 Hz power-line hum and 4 kHz high-frequency thermal hiss.</p>
            </div>
          </div>
          <div class="spec-detail-row">
            <div class="spec-icon-box"><i class="fa-solid fa-square-root-variable"></i></div>
            <div class="spec-text">
              <h5>Quantitative SNR Improvement</h5>
              <p>Achieved a measured +18.4 dB Signal-to-Noise Ratio (SNR) enhancement, restoring clean vocal and acoustic harmonics with negligible phase distortion.</p>
            </div>
          </div>
        </div>
      `
    }
  };

  specButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectSpecs[projId];
      if (!data || !projectBackdrop) return;

      projectModalTitle.textContent = data.title;
      projectModalSubtitle.textContent = data.subtitle;
      projectModalContent.innerHTML = data.html;

      projectBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeProjectModal() {
    if (!projectBackdrop) return;
    projectBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);

  // Close modals on backdrop click or Escape key
  [dossierBackdrop, projectBackdrop].forEach((backdrop) => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeDossier();
        closeProjectModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDossier();
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE 3D PERSPECTIVE TILT ON CARDS
   ========================================================================== */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('.project-card, .cert-card, .stat-card, .oscilloscope-wrapper');
  if (!tiltCards.length) return;

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   10. BACK TO TOP BUTTON WITH CIRCULAR PROGRESS
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  const scrollProgress = document.getElementById('scrollProgress');
  if (!backToTopBtn || !scrollProgress) return;

  const circleLength = 2 * Math.PI * 20; // r=20 => approx 125.66
  scrollProgress.style.strokeDasharray = `${circleLength}`;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollTop > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    if (scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight);
      const offset = circleLength - (progress * circleLength);
      scrollProgress.style.strokeDashoffset = `${offset}`;
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   11. COPY TO CLIPBOARD BUTTONS WITH TOAST
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Copied: ${textToCopy}`);
      } catch (err) {
        showToast(`Failed to copy: ${textToCopy}`);
      }
    });
  });
}

/* ==========================================================================
   12. CONTACT FORM VALIDATION & DIRECT TRANSMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const feedback = document.getElementById('formFeedback');
  const feedbackCloseBtn = document.getElementById('feedbackCloseBtn');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !feedback) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const messageInput = document.getElementById('senderMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    nameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
    messageInput.classList.remove('invalid');
    nameError.classList.remove('visible');
    emailError.classList.remove('visible');
    messageError.classList.remove('visible');
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
      const err = document.getElementById(`${input.name}Error`);
      if (err) err.classList.remove('visible');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    if (!nameVal) {
      nameInput.classList.add('invalid');
      nameError.classList.add('visible');
      isValid = false;
    }

    if (!emailVal || !validateEmail(emailVal)) {
      emailInput.classList.add('invalid');
      emailError.classList.add('visible');
      isValid = false;
    }

    if (!messageVal || messageVal.length < 10) {
      messageInput.classList.add('invalid');
      messageError.classList.add('visible');
      isValid = false;
    }

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Preparing dispatch...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      const targetEmail = "sheelanemi@gmai.com";
      const subject = encodeURIComponent(`Inquiry from ${nameVal} for THANGARAJ P`);
      const body = encodeURIComponent(
        `Hi Thangaraj,\n\n${messageVal}\n\nFrom: ${nameVal}\nEmail: ${emailVal}\n`
      );

      const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      form.style.display = 'none';
      feedback.style.display = 'block';

      window.location.href = mailtoLink;
    }, 700);
  });

  if (feedbackCloseBtn) {
    feedbackCloseBtn.addEventListener('click', () => {
      form.reset();
      clearErrors();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
      feedback.style.display = 'none';
      form.style.display = 'block';
    });
  }
}

/* ==========================================================================
   13. INTERACTIVE CIRCUIT BOARD CANVAS ANIMATION
   ========================================================================== */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuitCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  const numTraces = 18;
  const traces = [];

  class CircuitTrace {
    constructor() {
      this.reset();
    }

    reset() {
      const angle = Math.random() * Math.PI * 2;
      const minRadius = 90;
      const maxRadius = Math.min(width, height) * 0.46;

      const startX = width / 2 + Math.cos(angle) * minRadius;
      const startY = height / 2 + Math.sin(angle) * minRadius;

      this.points = [{ x: startX, y: startY }];

      const midRadius = minRadius + (maxRadius - minRadius) * 0.5;
      const midX = width / 2 + Math.cos(angle) * midRadius;
      const midY = startY;
      this.points.push({ x: midX, y: midY });

      const endX = width / 2 + Math.cos(angle) * maxRadius;
      const endY = height / 2 + Math.sin(angle) * maxRadius;
      this.points.push({ x: endX, y: endY });

      this.progress = Math.random();
      this.speed = 0.003 + Math.random() * 0.005;
      this.color = Math.random() > 0.4 ? '#00f2fe' : '#4facfe';
      this.packetSize = 3 + Math.random() * 2;
    }

    update() {
      this.progress += this.speed;
      if (this.progress > 1) {
        this.progress = 0;
      }
    }

    draw(ctx) {
      if (this.points.length < 3) return;

      const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00f5a0';
      
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      ctx.strokeStyle = themeAccent;
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      const endP = this.points[this.points.length - 1];
      ctx.beginPath();
      ctx.arc(endP.x, endP.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = themeAccent;
      ctx.globalAlpha = 0.45;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      const currentPoint = this.getPointAtProgress(this.progress);
      if (currentPoint) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, this.packetSize, 0, Math.PI * 2);
        ctx.fillStyle = themeAccent;
        ctx.shadowColor = themeAccent;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }
    }

    getPointAtProgress(p) {
      if (p <= 0.5) {
        const segT = p / 0.5;
        return {
          x: this.points[0].x + (this.points[1].x - this.points[0].x) * segT,
          y: this.points[0].y + (this.points[1].y - this.points[0].y) * segT
        };
      } else {
        const segT = (p - 0.5) / 0.5;
        return {
          x: this.points[1].x + (this.points[2].x - this.points[1].x) * segT,
          y: this.points[1].y + (this.points[2].y - this.points[1].y) * segT
        };
      }
    }
  }

  for (let i = 0; i < numTraces; i++) {
    traces.push(new CircuitTrace());
  }

  let mouse = { x: -100, y: -100, active: false };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    traces.forEach((trace) => {
      trace.update();
      trace.draw(ctx);
    });

    if (mouse.active) {
      ctx.save();
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
      grad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   14. DYNAMIC FOOTER YEAR
   ========================================================================== */
function updateFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.textContent = year > 2026 ? year : 2026;
  }
}
