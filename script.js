/* ====================== HELPER DASAR ====================== */
const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ====================== NAMA HURUF DEMI HURUF ====================== */
function initNameAnimation(){
  const nameEl = $('#name');
  // bungkus kata dalam <em> tetap menjadi <em>, sisanya teks biasa
  nameEl.innerHTML = [...nameEl.childNodes]
    .map(n => n.nodeType === 3 ? n.textContent : `<em>${n.textContent}</em>`)
    .join('');

  let delayIndex = 0;
  function splitIntoLetters(el){
    [...el.childNodes].forEach(node => {
      if (node.nodeType !== 3){ splitIntoLetters(node); return; }
      const fragment = document.createDocumentFragment();
      [...node.textContent].forEach(char => {
        const span = document.createElement('span');
        span.className = 'ch';
        span.style.animationDelay = `${0.3 + delayIndex++ * 0.06}s`;
        span.textContent = char === ' ' ? '\u00a0' : char;
        span.setAttribute('aria-hidden', 'true');
        fragment.appendChild(span);
      });
      node.replaceWith(fragment);
    });
  }
  splitIntoLetters(nameEl);
}

/* ====================== EFEK MENGETIK (ROLE) ====================== */
const roles = ['Web Developer', 'Frontend Engineer', 'UI Designer', 'Kreator Digital'];

function initTypewriter(){
  let roleIndex = 0, charIndex = 0, deleting = false;
  (function tick(){
    const word = roles[roleIndex];
    $('#type').textContent = word.slice(0, charIndex);

    if (!deleting && charIndex++ === word.length){
      deleting = true;
      return setTimeout(tick, 1400);
    }
    if (deleting && --charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(tick, deleting ? 45 : 90);
  })();
}

/* ====================== DATA: KEAHLIAN, PROYEK, SERTIFIKAT ====================== */
const skills = [
  ['HTML & CSS', 95], ['JavaScript', 90], ['React', 82],
  ['Node.js', 72], ['UI/UX & Figma', 85], ['Git & Deploy', 78],
];

const projects = [
  ['Toko Kopi Nusantara', 'web', 'E-commerce kopi lokal dengan keranjang belanja dan pembayaran.',
    ['HTML','CSS','JS'], 'linear-gradient(135deg,#7a3e1d,#c8962e)', '☕'],
  ['Catatan Harian', 'app', 'Aplikasi catatan dengan mode gelap dan penyimpanan offline.',
    ['React','PWA'], 'linear-gradient(135deg,#2a2358,#5b3fd6)', '✎'],
  ['Dashboard Keuangan', 'ui', 'Desain dashboard pelacak pengeluaran dengan grafik interaktif.',
    ['Figma','UI'], 'linear-gradient(135deg,#0f6e5a,#17123a)', '◔'],
  ['Portal Wisata Bali', 'web', 'Situs pariwisata dengan galeri, peta, dan pemesanan tur.',
    ['HTML','CSS','JS'], 'linear-gradient(135deg,#d8642c,#5b3fd6)', '✈'],
  ['Kuis Interaktif', 'app', 'Aplikasi kuis dengan skor, timer, dan papan peringkat.',
    ['JS','Node.js'], 'linear-gradient(135deg,#17123a,#c8962e)', '?'],
  ['Rebrand Studio Batik', 'ui', 'Desain ulang identitas dan situs untuk studio batik modern.',
    ['Figma','Branding'], 'linear-gradient(135deg,#8b1e4f,#2a2358)', '❖'],
];

const certificates = [
  ['2024', 'AWS Cloud Practitioner', 'Amazon Web Services'],
  ['2023', 'Meta Front-End Developer', 'Coursera'],
  ['2023', 'Google UX Design', 'Google'],
  ['2022', 'Belajar Dasar Pemrograman Web', 'Dicoding Indonesia'],
  ['2022', 'JavaScript Algorithms & Data Structures', 'freeCodeCamp'],
  ['2021', 'Responsive Web Design', 'freeCodeCamp'],
];

function renderSkills(){
  $('#skl').innerHTML = skills.map(([name, value]) => `
    <div class="bar rv">
      <div class="t"><span>${name}</span><span>${value}%</span></div>
      <div class="tr"><div class="f" data-w="${value}"></div></div>
    </div>`).join('');
}

function renderProjects(){
  $('#grid').innerHTML = projects.map(([title, cat, desc, tags, bg, icon]) => `
    <article class="card rv z" data-c="${cat}">
      <div class="th" style="background:${bg}"><span>${icon}</span></div>
      <div class="bd">
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="tags">${tags.map(t => `<i>${t}</i>`).join('')}</div>
        <a class="lk" href="#">Lihat proyek →</a>
      </div>
    </article>`).join('');
}

function renderCertificates(){
  $('#cg').innerHTML = certificates.map(([year, title, issuer]) => `
    <article class="cert rv r">
      <div class="seal">${year}</div>
      <div>
        <h3>${title}</h3>
        <p>${issuer}</p>
        <a class="lk" href="#">Lihat sertifikat</a>
      </div>
    </article>`).join('');
}

/* ====================== ANIMASI MUNCUL SAAT SCROLL ====================== */
function initScrollReveal(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      const bar = entry.target.querySelector('.f');
      if (bar) bar.style.width = bar.dataset.w + '%';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  $$('.rv').forEach((el, i) => {
    const inGrid = el.closest('.grid, .sk');
    el.style.transitionDelay = (inGrid ? (i % 3) * 0.12 : 0) + 's';
    observer.observe(el);
  });
}

/* ====================== PENGHITUNG ANGKA STATISTIK ====================== */
function initCounters(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const target = +entry.target.dataset.n;
      let start = null;
      const step = (timestamp) => {
        start ??= timestamp;
        const progress = Math.min((timestamp - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.round(target * eased) + '+';
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
  $$('[data-n]').forEach(el => observer.observe(el));
}

/* ====================== FILTER PROYEK ====================== */
function initProjectFilters(){
  $$('.fb').forEach(button => {
    button.onclick = () => {
      $$('.fb').forEach(b => b.classList.remove('on'));
      button.classList.add('on');

      $$('.card').forEach(card => {
        const show = button.dataset.f === 'all' || card.dataset.c === button.dataset.f;
        card.classList.toggle('hide', !show);
        if (!show) return;

        card.style.transition = 'none';
        card.style.opacity = 0;
        card.style.transform = 'scale(.9)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          card.style.transition = '';
          card.style.opacity = 1;
          card.style.transform = '';
        }));
      });
    };
  });
}

/* ====================== KEMIRINGAN 3D KARTU PROYEK ====================== */
function initCardTilt(){
  $$('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transitionDelay = '0s';
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ====================== EFEK SCROLL: NAV, PROGRESS BAR, TOMBOL ATAS ====================== */
function initScrollEffects(){
  const sections = $$('header, section, footer');
  const navLinks = $$('#menu a');

  addEventListener('scroll', () => {
    const y = scrollY;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;

    $('#progress').style.width = (y / maxScroll * 100) + '%';
    $('#nav').classList.toggle('s', y > 40);
    $('#top').classList.toggle('v', y > 600);

    let current = 'home';
    sections.forEach(s => { if (y + 200 >= s.offsetTop) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + current));
  }, { passive: true });

  $('#top').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
}

/* ====================== CAHAYA MENGIKUTI KURSOR ====================== */
function initCursorGlow(){
  addEventListener('mousemove', e => {
    const glow = $('#glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ====================== MENU MOBILE ====================== */
function initMobileMenu(){
  const menu = $('#menu');
  const burger = $('#burger');

  burger.onclick = () => {
    menu.classList.toggle('open');
    burger.textContent = menu.classList.contains('open') ? '✕' : '☰';
  };
  $$('#menu a').forEach(a => a.onclick = () => {
    menu.classList.remove('open');
    burger.textContent = '☰';
  });
}

/* ====================== TEMA TERANG / GELAP ====================== */
function initTheme(){
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
  } catch (e) {}

  $('#theme').onclick = () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  };
}

/* ====================== FORMULIR KONTAK ====================== */
function initContactForm(){
  $('#form').onsubmit = (e) => {
    e.preventDefault();
    const name = $('#n').value;
    $('#msg').textContent = currentLang === 'en'
      ? `Thank you, ${name}! Your message has been sent.`
      : `Terima kasih, ${name}! Pesan Anda sudah terkirim.`;
    e.target.reset();
  };
}

/* ====================== FOTO PROFIL (UNGGAH + TILT 3D) ====================== */
function initPhotoUpload(){
  const face = $('#face');
  const placeholder = $('#ph');

  function showFace(src){
    face.src = src;
    face.hidden = false;
    placeholder.hidden = true;
  }

  try {
    const saved = localStorage.getItem('face');
    if (saved) showFace(saved);
  } catch (e) {}

  $('#photo').onclick = () => $('#file').click();
  $('#photo').onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      $('#file').click();
    }
  };
  $('#file').onclick = (e) => e.stopPropagation();
  $('#file').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // kompres agar tidak terlalu berat sebelum disimpan
        const scale = Math.min(1, 800 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        showFace(dataUrl);
        try { localStorage.setItem('face', dataUrl); } catch (e) {}
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
}

function initPhotoTilt(){
  const orb = $('#orb');
  const wrapper = orb.parentNode;
  wrapper.addEventListener('mousemove', e => {
    const r = orb.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    orb.style.transform = `perspective(700px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg)`;
  });
  wrapper.addEventListener('mouseleave', () => { orb.style.transform = ''; });
}

/* ====================== BAHASA: TERJEMAHAN OTOMATIS ====================== */
// Menerjemahkan teks Indonesia -> Inggris otomatis lewat API MyMemory (gratis, tanpa API key).
// Hasil terjemahan disimpan di localStorage supaya tidak perlu request ulang tiap ganti bahasa.

let currentLang = 'id';
try { currentLang = localStorage.getItem('lang') || 'id'; } catch (e) {}

const ariaLabels = {
  id: { lang: 'Switch to English', theme: 'Ganti tema', burger: 'Buka menu', top: 'Kembali ke atas', photo: 'Ganti foto' },
  en: { lang: 'Ganti ke Bahasa Indonesia', theme: 'Toggle theme', burger: 'Open menu', top: 'Back to top', photo: 'Change photo' },
};

// simpan teks asli tiap text-node, supaya bisa dikembalikan ke Bahasa Indonesia tanpa fetch ulang
const originalText = new WeakMap();

function collectTextNodes(){
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())){
    if (node.parentNode.closest('script, #type, #lang')) continue;
    if (!originalText.has(node)) originalText.set(node, node.textContent);
    if (originalText.get(node).trim()) nodes.push(node);
  }
  return nodes;
}

function getTranslationCache(){
  try { return JSON.parse(localStorage.getItem('translationCache') || '{}'); }
  catch (e) { return {}; }
}
function saveTranslationCache(cache){
  try { localStorage.setItem('translationCache', JSON.stringify(cache)); }
  catch (e) {}
}

async function translateToEnglish(text, cache){
  if (cache[text]) return cache[text];
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|en`;
    const res = await fetch(url);
    const data = await res.json();
    const translated = data?.responseData?.translatedText || text;
    cache[text] = translated;
    return translated;
  } catch (e) {
    return text; // kalau API gagal/offline, tampilkan teks asli saja
  }
}

async function applyLanguage(lang){
  const nodes = collectTextNodes();

  if (lang === 'id'){
    nodes.forEach(n => { n.textContent = originalText.get(n); });
  } else {
    const cache = getTranslationCache();
    await Promise.all(nodes.map(async n => {
      const original = originalText.get(n);
      const trimmed = original.trim();
      const translated = await translateToEnglish(trimmed, cache);
      n.textContent = original.replace(trimmed, translated);
    }));
    saveTranslationCache(cache);
  }

  document.documentElement.lang = lang;
  $('#lang').textContent = lang === 'en' ? 'ID' : 'EN';
  Object.entries(ariaLabels[lang]).forEach(([key, value]) => {
    $('#' + key)?.setAttribute('aria-label', value);
  });
}

async function setLanguage(lang){
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch (e) {}

  document.body.classList.add('sw');
  await applyLanguage(lang);
  document.body.classList.remove('sw');
}

function initLanguageSwitch(){
  $('#lang').onclick = () => setLanguage(currentLang === 'id' ? 'en' : 'id');
  setLanguage(currentLang);
}

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Mengirim...";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      status.textContent = "Pesan terkirim, terima kasih!";
      form.reset();
    } else {
      status.textContent = "Gagal mengirim, coba lagi.";
    }
  } catch {
    status.textContent = "Terjadi kesalahan jaringan.";
  }
});

/* ====================== JALANKAN SEMUA ====================== */
function init(){
  initNameAnimation();
  initTypewriter();

  renderSkills();
  renderProjects();
  renderCertificates();

  initScrollReveal();
  initCounters();
  initProjectFilters();
  initCardTilt();
  initScrollEffects();
  initCursorGlow();
  initMobileMenu();
  initTheme();
  initContactForm();
  initPhotoUpload();
  initPhotoTilt();
  initLanguageSwitch();
}

init();
