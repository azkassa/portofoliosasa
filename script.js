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
  Format: [judul, kategori, deskripsi, [tag], warna cadangan, ikon cadangan, FOTO, LINK]
  - FOTO : letakkan file di folder  images/projects/  lalu tulis path-nya.
           Jika file belum ada, otomatis tampil gradasi + ikon.
  - LINK : ganti '#' dengan alamat website project, contoh 'https://tokokopi.vercel.app'
*/
const projects = [
  ['Toko Kopi Nusantara', 'web', 'E-commerce kopi lokal dengan keranjang belanja dan pembayaran.',
    ['HTML','CSS','JS'], 'linear-gradient(135deg,#7a3e1d,#c8962e)', '☕',
    'images/projects/toko-kopi.jpg', '#'],
  ['Catatan Harian', 'app', 'Aplikasi catatan dengan mode gelap dan penyimpanan offline.',
    ['React','PWA'], 'linear-gradient(135deg,#2a2358,#5b3fd6)', '✎',
    'images/projects/catatan-harian.jpg', '#'],
  ['Dashboard Keuangan', 'ui', 'Desain dashboard pelacak pengeluaran dengan grafik interaktif.',
    ['Figma','UI'], 'linear-gradient(135deg,#0f6e5a,#17123a)', '◔',
    'images/projects/dashboard-keuangan.jpg', '#'],
  ['Portal Wisata Bali', 'web', 'Situs pariwisata dengan galeri, peta, dan pemesanan tur.',
    ['HTML','CSS','JS'], 'linear-gradient(135deg,#d8642c,#5b3fd6)', '✈',
    'images/projects/wisata-bali.jpg', '#'],
  ['Kuis Interaktif', 'app', 'Aplikasi kuis dengan skor, timer, dan papan peringkat.',
    ['JS','Node.js'], 'linear-gradient(135deg,#17123a,#c8962e)', '?',
    'images/projects/kuis.jpg', '#'],
  ['Rebrand Studio Batik', 'ui', 'Desain ulang identitas dan situs untuk studio batik modern.',
    ['Figma','Branding'], 'linear-gradient(135deg,#8b1e4f,#2a2358)', '❖',
    'images/projects/studio-batik.jpg', '#'],
];

/*
  SERTIFIKAT
  Format: [tahun, judul, penerbit, GAMBAR]
  - GAMBAR : letakkan file di folder  images/sertifikat/  lalu tulis path-nya.
*/
const certificates = [
  ['2024', 'AWS Cloud Practitioner', 'Amazon Web Services', 'images/sertifikat/aws.jpg'],
  ['2023', 'Meta Front-End Developer', 'Coursera', 'images/sertifikat/meta.jpg'],
  ['2023', 'Google UX Design', 'Google', 'images/sertifikat/google-ux.jpg'],
  ['2022', 'Belajar Dasar Pemrograman Web', 'Dicoding Indonesia', 'images/sertifikat/dicoding.jpg'],
  ['2022', 'JavaScript Algorithms & Data Structures', 'freeCodeCamp', 'images/sertifikat/freecodecamp-js.jpg'],
  ['2021', 'Responsive Web Design', 'freeCodeCamp', 'images/sertifikat/freecodecamp-rwd.jpg'],
];

function renderSkills(){
  $('#skl').innerHTML = skills.map(([name, value]) => `
    <div class="bar rv">
      <div class="t"><span>${name}</span><span>${value}%</span></div>
      <div class="tr"><div class="f" data-w="${value}"></div></div>
    </div>`).join('');
}

function renderProjects(){
  $('#grid').innerHTML = projects.map(([title, cat, desc, tags, bg, icon, image, url]) => {
    const external = /^https?:\/\//.test(url);
    const target = external ? 'target="_blank" rel="noopener noreferrer"' : '';
    return `
    <a class="card rv z" data-c="${cat}" href="${url}" ${target} aria-label="Buka proyek ${title}">
      <div class="th" style="background:${bg}">
        <span class="ico">${icon}</span>
        <img src="${image}" alt="Tampilan proyek ${title}" loading="lazy" onerror="this.remove()">
      </div>
      <div class="bd">
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="tags">${tags.map(t => `<i>${t}</i>`).join('')}</div>
        <span class="lk">Lihat proyek →</span>
      </div>
    </a>`;
  }).join('');
}

/* Foto sertifikat yang diunggah disimpan di browser (localStorage) */
const PHOTO_KEY = 'cert-photos';
function loadPhotos(){
  try { return JSON.parse(localStorage.getItem(PHOTO_KEY)) || {}; } catch { return {}; }
}
const certPhotos = loadPhotos();
function savePhotos(){
  try { localStorage.setItem(PHOTO_KEY, JSON.stringify(certPhotos)); return true; }
  catch { return false; }
}
const certSrc = (i) => certPhotos[i] || certificates[i][3];

function renderCertificates(){
  $('#cg').innerHTML = certificates.map(([year, title, issuer], i) => `
    <figure class="cert rv z" data-i="${i}">
      <div class="cimg">
        <img src="${certSrc(i)}" alt="Sertifikat ${title}" loading="lazy"
             onerror="this.parentNode.classList.add('noimg');this.remove()">
        <span class="cph">${year}</span>
        <button class="zoom" type="button" data-i="${i}">⤢ Perbesar</button>
      </div>
      <figcaption>
        <h3>${title}</h3>
        <p>${issuer} · ${year}</p>
        <div class="cact">
          <label class="up">📷 Unggah foto
            <input type="file" accept="image/*" data-i="${i}" hidden>
          </label>
          <button class="rm" type="button" data-i="${i}" ${certPhotos[i] ? '' : 'hidden'}>Hapus</button>
        </div>
      </figcaption>
    </figure>`).join('');
}

/* ====================== UNGGAH FOTO SERTIFIKAT ====================== */
function resizeImage(file, max = 1400){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const scale = Math.min(1, max / Math.max(im.width, im.height));
      const c = document.createElement('canvas');
      c.width = Math.round(im.width * scale);
      c.height = Math.round(im.height * scale);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    im.onerror = () => { URL.revokeObjectURL(url); reject(); };
    im.src = url;
  });
}

function showCertImage(i){
  const fig = $(`.cert[data-i="${i}"]`);
  const box = fig.querySelector('.cimg');
  box.classList.remove('noimg');
  box.querySelector('img')?.remove();
  const im = new Image();
  im.alt = 'Sertifikat ' + certificates[i][1];
  im.onerror = () => { box.classList.add('noimg'); im.remove(); };
  im.src = certSrc(i);
  box.prepend(im);
  fig.querySelector('.rm').hidden = !certPhotos[i];
}

function initCertificateUpload(){
  $('#cg').addEventListener('change', async (e) => {
    const input = e.target.closest('input[type=file]');
    if (!input || !input.files[0]) return;
    const i = +input.dataset.i;
    try {
      certPhotos[i] = await resizeImage(input.files[0]);
      if (!savePhotos()) alert('Foto tampil, tetapi penyimpanan browser penuh sehingga tidak akan tersimpan setelah halaman dimuat ulang.');
      showCertImage(i);
    } catch {
      alert('File tidak bisa dibaca. Pilih file gambar (JPG/PNG/WebP).');
    }
    input.value = '';
  });

  $('#cg').addEventListener('click', (e) => {
    const btn = e.target.closest('.rm');
    if (!btn) return;
    const i = +btn.dataset.i;
    delete certPhotos[i];
    savePhotos();
    showCertImage(i);
  });
}

/* ====================== PERBESAR SERTIFIKAT (LIGHTBOX) ====================== */
function initCertificateZoom(){
  const box = $('#lightbox');
  const img = $('#lb-img');
  const cap = $('#lb-cap');

  function open(i){
    const [year, title, issuer] = certificates[i];
    const src = certSrc(i);
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
  initCertificateZoom();
  initCertificateUpload();
  initScrollEffects();
  initCursorGlow();
  initMobileMenu();
  initPhotoTilt();
  initContactForm();
}

init();
