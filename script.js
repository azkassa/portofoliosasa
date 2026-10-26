/* ====================== HELPER DASAR ====================== */
const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ====================== NAMA HURUF DEMI HURUF ====================== */
function initNameAnimation(){
  const nameEl = $('#name');
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
  ['HTML & CSS', 95], ['JavaScript', 90], ['UI/UX & Figma', 85], ['Git & Deploy', 78],
];

/*
  PROYEK
  Format: [judul, kategori, deskripsi, [tag], warna cadangan, FOTO, LINK]
  - FOTO : letakkan file di folder  images/projects/  lalu tulis path-nya.
           Jika file belum ada, otomatis tampil warna gradasi.
  - LINK : alamat halaman project (Vercel / GitHub Pages), contoh
           'https://tokokopi.vercel.app' atau 'https://username.github.io/tokokopi'.
           Saat kartu diklik, pengunjung langsung diarahkan ke halaman itu.
           Selama masih '#', kartu belum bisa diklik.
  Menambah project: salin satu baris [ ... ], lalu isi judul, kategori
  (web / app / ui), deskripsi, tag, FOTO, dan LINK.
*/
const projects = [
  ['TypeRacer', 'web', 'Game Belajar mengetik melalui balapan mobil.',
    ['HTML','CSS','JS'], 'linear-gradient(135deg,#7a3e1d,#c8962e)',
    'image/imgproject/aplikasigudang.jpg', 'https://game-lyart-one-26.vercel.app'],
  ['Catatan Harian', 'app', 'Aplikasi catatan dengan mode gelap dan penyimpanan offline.',
    ['React','PWA'], 'linear-gradient(135deg,#2a2358,#5b3fd6)',
    'images/projects/catatan-harian.jpg', '#'],
  ['Dashboard Keuangan', 'ui', 'Desain dashboard pelacak pengeluaran dengan grafik interaktif.',
    ['Figma','UI'], 'linear-gradient(135deg,#0f6e5a,#17123a)',
    'images/projects/dashboard-keuangan.jpg', '#'],
  ['Portal Wisata Bali', 'web', 'Situs pariwisata dengan galeri, peta, dan pemesanan tur.',
    ['HTML','CSS','JS'], 'linear-gradient(135deg,#d8642c,#5b3fd6)',
    'images/projects/wisata-bali.jpg', '#'],
  ['Kuis Interaktif', 'app', 'Aplikasi kuis dengan skor, timer, dan papan peringkat.',
    ['JS','Node.js'], 'linear-gradient(135deg,#17123a,#c8962e)',
    'images/projects/kuis.jpg', '#'],
];

/*
  SERTIFIKAT  (hanya developer yang mengatur dari sini)
  Format: [tahun, judul, penerbit, FOTO]
  Cara mengisi foto:
    1. Simpan file foto sertifikat di folder  images/sertifikat/
    2. Tulis path file-nya di kolom FOTO, contoh: 'images/sertifikat/aws.jpg'
  Untuk menambah sertifikat, tambahkan satu baris baru di daftar di bawah.
  Jika file foto belum ada, kartu otomatis menampilkan tahun sebagai pengganti.
*/
const certificates = [
  ['2025', 'Introduction to Capture the Flag', 'ID-Networkers', 'image/sertifikat1.jpg'],
  ['2026', 'Public Speaking', 'Galeria Potensi', 'image/sertifikat2.jpg'],
  ['2023', 'Google UX Design', 'Google', 'image/sertifikat3.jpg'],
  ['2022', 'Belajar Dasar Pemrograman Web', 'Dicoding Indonesia', 'image/sertifikat4.jpg'],
  ['2022', 'JavaScript Algorithms & Data Structures', 'freeCodeCamp', 'image/sertifikat5.jpg'],
  ['2021', 'Responsive Web Design', 'freeCodeCamp', 'image/sertifikat6.jpg'],
  ['2026', 'Belajar Dasar Pemrograman Web', 'Dicoding Indonesia', 'image/sertifikat7.jpg'],
  ['2026', 'Belajar Fundamental Front-End Web Development', 'Dicoding Indonesia', 'image/sertifikat8.jpg'],
  ['2026', 'Belajar Fundamental Back-End Web Development', 'Dicoding Indonesia', 'image/sertifikat9.jpg'],
  ['2026', 'Belajar Membuat Aplikasi Back-End untuk Pemula', 'Dicoding Indonesia', 'image/sertifikat10.jpg'],
];

function renderSkills(){
  $('#skl').innerHTML = skills.map(([name, value]) => `
    <div class="bar rv">
      <div class="t"><span>${name}</span><span>${value}%</span></div>
      <div class="tr"><div class="f" data-w="${value}"></div></div>
    </div>`).join('');
}

function renderProjects(){
  $('#grid').innerHTML = projects.map(([title, cat, desc, tags, bg, image, url]) => {
    const ready = /^https?:\/\//.test(url);
    const link = ready ? `href="${url}"` : 'href="#projects" onclick="return false" aria-disabled="true"';
    return `
    <a class="card rv z${ready ? '' : ' soon'}" data-c="${cat}" ${link} aria-label="Buka proyek ${title}">
      <div class="th" style="background:${bg}">
        <img src="${image}" alt="Tampilan proyek ${title}" loading="lazy" onerror="this.remove()">
      </div>
      <div class="bd">
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="tags">${tags.map(t => `<i>${t}</i>`).join('')}</div>
        <span class="lk">${ready ? 'Lihat proyek →' : 'Segera hadir'}</span>
      </div>
    </a>`;
  }).join('');
}

function renderCertificates(){
  $('#cg').innerHTML = certificates.map(([year, title, issuer, image], i) => `
    <figure class="cert rv z">
      <div class="cimg">
        <img src="${image}" alt="Sertifikat ${title}" loading="lazy"
             onerror="this.parentNode.classList.add('noimg');this.remove()">
        <span class="cph">${year}</span>
        <button class="zoom" type="button" data-i="${i}">⤢ Perbesar</button>
      </div>
      <figcaption>
        <h3>${title}</h3>
        <p>${issuer} · ${year}</p>
      </figcaption>
    </figure>`).join('');
}

/* ====================== PERBESAR SERTIFIKAT (LIGHTBOX) ====================== */
function initCertificateZoom(){
  const box = $('#lightbox');
  const img = $('#lb-img');
  const cap = $('#lb-cap');

  function open(i){
    const [year, title, issuer, src] = certificates[i];
    img.src = src;
    img.alt = 'Sertifikat ' + title;
    cap.textContent = `${title} — ${issuer} (${year})`;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lb-x').focus();
  }
  function close(){
    box.hidden = true;
    img.src = '';
    document.body.style.overflow = '';
  }

  $('#cg').addEventListener('click', e => {
    const btn = e.target.closest('.zoom');
    if (btn) open(+btn.dataset.i);
  });
  $('#lb-x').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) close(); });
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

/* ====================== FOTO PROFIL (TILT 3D) ====================== */
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

/* ====================== FORMULIR KONTAK (FORMSPREE) ====================== */
function initContactForm(){
  const form = $('#contact-form');
  const formStatus = $('#form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = 'Mengirim...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok){
        formStatus.textContent = 'Pesan terkirim, terima kasih!';
        form.reset();
      } else {
        formStatus.textContent = 'Gagal mengirim, coba lagi.';
      }
    } catch {
      formStatus.textContent = 'Terjadi kesalahan jaringan.';
    }
  });
}

/* ====================== LOADING SCREEN ====================== */
function initLoader(){
  const loader = $('#loader');
  const root = document.documentElement;
  if (!loader){ root.classList.remove('loading'); return; }

  const num = $('#ld-num'), bar = $('#ld-bar'), track = $('#ld-track');
  const idxLabel = $('#ld-idx'), clock = $('#ld-clock');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MIN_TIME = reduce ? 500 : 3000;          // durasi minimum tampil (ms)
  const steps = [0, 25, 55, 85];                  // progres tempat teks peran berganti

  // jam lokal Bogor (WIB) di pojok kanan atas
  const tick = () => clock.textContent = 'Bogor, ' + new Date().toLocaleTimeString('en-GB',
    { timeZone:'Asia/Jakarta', hour:'2-digit', minute:'2-digit' }) + ' WIB';
  tick();
  const clockTimer = setInterval(tick, 1000);

  let loaded = false, shown = 0, current = -1, finished = false;

  // progres tertahan di 90% sampai halaman + font benar-benar siap
  const pageReady = new Promise(res =>
    document.readyState === 'complete' ? res() : addEventListener('load', res, { once: true }));
  Promise.all([pageReady, document.fonts ? document.fonts.ready : 0]).then(() => loaded = true);
  setTimeout(() => loaded = true, 6000);

  function setRole(i){
    if (i === current) return;
    current = i;
    track.style.setProperty('--i', i);
    idxLabel.textContent = `(0${Math.min(i + 1, 4)}/04)`;
  }

  function finish(){
    if (finished) return;
    finished = true;
    clearInterval(clockTimer);
    setRole(4);
    setTimeout(() => {
      loader.classList.add('leave');
      setTimeout(() => root.classList.remove('loading'), reduce ? 0 : 550);
      setTimeout(() => loader.remove(), reduce ? 50 : 1400);
    }, reduce ? 0 : 750);
  }

  const startTime = performance.now();
  (function frame(now){
    const t = Math.min((now - startTime) / MIN_TIME, 1);
    const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;   // ease-in-out lembut
    shown = Math.max(shown, Math.min(eased * 100, loaded ? 100 : 90));

    const p = Math.round(shown);
    num.textContent = p;
    bar.style.transform = `scaleX(${shown / 100})`;
    loader.style.setProperty('--w', Math.round(100 + shown * 8));   // 100 → 900

    let idx = 0;
    steps.forEach((th, k) => { if (shown >= th) idx = k; });
    setRole(idx);

    if (shown >= 99.9){ num.textContent = 100; return finish(); }
    requestAnimationFrame(frame);
  })(startTime);
}

/* ====================== JALANKAN SEMUA ====================== */
function init(){
  initLoader();
  initNameAnimation();
  initTypewriter();

  renderSkills();
  renderProjects();
  renderCertificates();

  initScrollReveal();
  initCounters();
  initProjectFilters();
  initCardTilt();
  initCertificateZoom();
  initScrollEffects();
  initCursorGlow();
  initMobileMenu();
  initPhotoTilt();
  initContactForm();
}

init();
