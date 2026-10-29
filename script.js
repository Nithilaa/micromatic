// ============================================================
// MICRO MATIC — site interactions
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Scroll progress + nav background ---------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = pct + '%';
  nav.classList.toggle('scrolled', scrollTop > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile nav burger ---------- */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- Active nav link on scroll ---------- */
const sections = ['about','capabilities','products','equipment','quality','contact']
  .map(id => document.getElementById(id)).filter(Boolean);
const navAnchors = Array.from(navLinks.querySelectorAll('a'));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
sections.forEach(s => navObserver.observe(s));

/* ---------- Reveal on scroll ---------- */
const revealTargets = document.querySelectorAll(
  '.about-media, .about-copy, .mv-card, .industry-card, .cap-stat, .cap-process-item, .g-item, .cert-card, .quality-instruments, .contact-info, .contact-card, .faq-item, .why-us-item, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

/* ---------- Product category jump chips ---------- */
const filterBar = document.getElementById('filterBar');
const galleryItems = document.querySelectorAll('.g-item');

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  const target = document.getElementById(btn.dataset.jump);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ---------- Category carousel prev/next scroll ---------- */
document.querySelectorAll('.cat-carousel').forEach(carousel => {
  const track = carousel.querySelector('.cat-carousel-track');
  const prev = carousel.querySelector('.cc-prev');
  const next = carousel.querySelector('.cc-next');
  const scrollAmount = () => Math.min(track.clientWidth * 0.8, 600);
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
});

/* ---------- Equipment Ledger data (from company profile) ---------- */
const equipmentData = [
  { name: 'LMW JV Kraft VMC', spec: '800 × 450 × 800 mm', qty: 4, tags: 'milling vmc' },
  { name: 'LMW JV Kraft VMC (4th Axis)', spec: '800 × 450 × 800 mm', qty: 3, tags: 'milling vmc 4axis' },
  { name: 'LMW JV 130 VMC (4th Axis)', spec: '1300 × 700 × 700 mm', qty: 1, tags: 'milling vmc 4axis' },
  { name: 'LMW JV 100 VMC (4th Axis)', spec: '1050 × 550 × 750 mm', qty: 1, tags: 'milling vmc 4axis' },
  { name: 'LMW J2 VMC (4th Axis)', spec: '800 × 500 × 500 mm', qty: 2, tags: 'milling vmc 4axis' },
  { name: 'LMW LV 80 VMC (4th Axis)', spec: '1000 × 600 × 600 mm', qty: 2, tags: 'milling vmc 4axis' },
  { name: 'LMW LV 55 VMC', spec: '800 × 550 × 550 mm', qty: 3, tags: 'milling vmc' },
  { name: 'LMW V55 VMC', spec: '600 × 300 × 300 mm', qty: 2, tags: 'milling vmc' },
  { name: 'LMW Pilatus Turning Centre', spec: '500 mm length', qty: 1, tags: 'turning' },
  { name: 'LMW L10 Turning Centre', spec: '1000 mm length', qty: 1, tags: 'turning' },
  { name: 'Pinacho Turning Centre', spec: '2000 mm length', qty: 1, tags: 'turning' },
  { name: 'HMT Econo Turning Centre', spec: '1500 mm length', qty: 1, tags: 'turning' },
  { name: 'HMT Cylindrical Grinding Machine G17', spec: '1500 mm length', qty: 2, tags: 'grinding' },
  { name: 'HMT Cylindrical Grinding Machine G22', spec: '2000 mm length', qty: 1, tags: 'grinding' },
  { name: 'Hitachi Vertical Milling Machine', spec: '—', qty: 2, tags: 'milling' },
  { name: 'OKK Vertical Milling Machine', spec: '—', qty: 1, tags: 'milling' },
  { name: 'S&T DRO Milling Machine', spec: '—', qty: 1, tags: 'milling' },
  { name: 'HMT Horizontal Milling Machine', spec: '—', qty: 1, tags: 'milling horizontal' },
  { name: 'Olivetti Horizontal Milling Machine', spec: '—', qty: 1, tags: 'milling horizontal' },
  { name: 'Herbert Drilling Machine', spec: '—', qty: 4, tags: 'drilling' },
  { name: 'Hitachi Seiki Horizontal Milling Machine', spec: '—', qty: 1, tags: 'milling horizontal' },
  { name: 'HMT Radial Drilling Machine', spec: '—', qty: 2, tags: 'drilling' },
  { name: 'Kristal Roller Balancing Machine', spec: '300 kg capacity', qty: 1, tags: 'balancing' },
  { name: 'SMT Band Saw Cutting Machine', spec: '—', qty: 1, tags: 'cutting' },
];

const ledgerBody = document.getElementById('ledgerBody');
const ledgerCount = document.getElementById('ledgerCount');
const ledgerSearch = document.getElementById('ledgerSearch');

function renderLedger(filterText = '') {
  const q = filterText.trim().toLowerCase();
  ledgerBody.innerHTML = '';
  let visible = 0;
  const totalUnits = equipmentData.reduce((s, e) => s + e.qty, 0);

  equipmentData.forEach((eq, i) => {
    const haystack = (eq.name + ' ' + eq.spec + ' ' + eq.tags).toLowerCase();
    const match = !q || haystack.includes(q);
    if (match) visible++;
    const tr = document.createElement('tr');
    if (!match) tr.classList.add('hide');
    tr.innerHTML = `
      <td class="lc-no">${String(i + 1).padStart(2, '0')}</td>
      <td class="lc-name">${eq.name}</td>
      <td class="lc-spec">${eq.spec}</td>
      <td class="lc-qty">${eq.qty} No${eq.qty > 1 ? 's' : ''}</td>
    `;
    ledgerBody.appendChild(tr);
  });

  ledgerCount.textContent = q
    ? `${visible} of ${equipmentData.length} machine types`
    : `${equipmentData.length} machine types — ${totalUnits} units on floor`;
}
renderLedger();
ledgerSearch.addEventListener('input', (e) => renderLedger(e.target.value));

/* ---------- Count-up stat numbers ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const noGroup = el.dataset.nogroup === 'true';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    el.textContent = (noGroup ? val : val.toLocaleString('en-IN')) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countTargets = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
countTargets.forEach(el => countObserver.observe(el));

/* ---------- Gallery lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;
const allItems = Array.from(galleryItems);

function openLightbox(index) {
  if (!allItems.length) return;
  currentIndex = (index + allItems.length) % allItems.length;
  const item = allItems[currentIndex];
  const img = item.querySelector('img');
  const caption = item.querySelector('figcaption');
  lbImage.src = img.src;
  lbImage.alt = img.alt;
  lbImage.classList.remove('zoomed');
  lbCaption.textContent = caption ? caption.textContent : '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
allItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
lbPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
lbNext.addEventListener('click', () => openLightbox(currentIndex + 1));
lbImage.addEventListener('click', (e) => { e.stopPropagation(); lbImage.classList.toggle('zoomed'); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
});
// Touch swipe navigation for mobile
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) openLightbox(currentIndex + (dx < 0 ? 1 : -1));
}, { passive: true });

/* ---------- Speed-dial floating actions ---------- */
const speedDial = document.getElementById('speedDial');
const speedDialToggle = document.getElementById('speedDialToggle');
speedDialToggle.addEventListener('click', () => speedDial.classList.toggle('open'));
document.addEventListener('click', (e) => {
  if (speedDial.classList.contains('open') && !speedDial.contains(e.target)) {
    speedDial.classList.remove('open');
  }
});

/* ---------- Back to top + speed-dial visibility (after hero) ---------- */
const backToTop = document.getElementById('backToTop');
const heroEl = document.querySelector('.hero');
function toggleFabVisibility() {
  const heroBottom = heroEl.getBoundingClientRect().bottom;
  const pastHero = heroBottom < 0;
  backToTop.classList.toggle('show', pastHero);
}
window.addEventListener('scroll', toggleFabVisibility, { passive: true });
toggleFabVisibility();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Desktop side dot nav + mobile tab bar active state ---------- */
const dotLinks = Array.from(document.querySelectorAll('.dot-nav a'));
const tabLinks = Array.from(document.querySelectorAll('.mt-item'));
const dotSections = ['top','about','capabilities','products','equipment','quality','contact']
  .map(id => document.getElementById(id)).filter(Boolean);

const dotObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dotLinks.forEach(a => a.classList.toggle('active', a.dataset.dot === id));
      tabLinks.forEach(a => a.classList.toggle('active', a.dataset.tab === id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
dotSections.forEach(s => dotObserver.observe(s));

/* ---------- Copy to clipboard ---------- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard');
    } catch {
      showToast('Could not copy — please copy manually');
    }
  });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => { if (i !== item) i.classList.remove('open'); });
    item.classList.toggle('open', !isOpen);
  });
});

/* ---------- Live Enquiry Configurator ---------- */
(function () {
  const card = document.querySelector('.cfg-card');
  if (!card) return;
  const steps = Array.from(card.querySelectorAll('.cfg-step'));
  const dots = Array.from(card.querySelectorAll('.cfg-dot'));
  const backBtn = document.getElementById('cfgBack');
  const sendBtn = document.getElementById('cfgSend');
  const summaryEl = document.getElementById('cfgSummary');
  const notesEl = document.getElementById('cfgNotes');

  let current = 1;
  const answers = { process: '', material: '', quantity: '' };
  const keys = ['process', 'material', 'quantity'];

  function render() {
    steps.forEach(s => s.classList.toggle('active', Number(s.dataset.cfgStep) === current));
    dots.forEach(d => {
      const n = Number(d.dataset.step);
      d.classList.toggle('active', n === current);
      d.classList.toggle('done', n < current);
    });
    backBtn.style.visibility = current === 1 ? 'hidden' : 'visible';
    sendBtn.style.display = current === 4 ? 'inline-flex' : 'none';

    if (current === 4) {
      summaryEl.innerHTML = `
        <div><strong>Process:</strong> ${answers.process || '—'}</div>
        <div><strong>Material:</strong> ${answers.material || '—'}</div>
        <div><strong>Quantity:</strong> ${answers.quantity || '—'}</div>
      `;
      updateSendLink();
    }
  }

  function updateSendLink() {
    const notes = notesEl.value.trim();
    let msg = `Hello Micro Matic, I'd like to enquire about:\n`;
    msg += `• Process: ${answers.process}\n`;
    msg += `• Material: ${answers.material}\n`;
    msg += `• Quantity: ${answers.quantity}\n`;
    if (notes) msg += `• Notes: ${notes}\n`;
    sendBtn.href = `https://wa.me/918668128386?text=${encodeURIComponent(msg)}`;
  }
  notesEl.addEventListener('input', updateSendLink);

  card.querySelectorAll('.cfg-step').forEach(step => {
    const stepNum = Number(step.dataset.cfgStep);
    step.querySelectorAll('.cfg-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        step.querySelectorAll('.cfg-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        answers[keys[stepNum - 1]] = opt.dataset.value;
        setTimeout(() => { if (current < 4) { current++; render(); } }, 250);
      });
    });
  });

  backBtn.addEventListener('click', () => { if (current > 1) { current--; render(); } });
  render();
})();
