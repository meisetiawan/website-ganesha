const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;
if (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const mobileBtn = document.getElementById('mobileMenuBtn');
const menu = document.getElementById('mainMenu');
if (mobileBtn && menu) {
  mobileBtn.addEventListener('click', () => menu.classList.toggle('open'));
}

const track = document.querySelector('.news-track');
const dots = document.querySelectorAll('.dot');
let current = 0;
if (track && dots.length) {
  const setSlide = (idx) => {
    current = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  };
  dots.forEach((d, i) => d.addEventListener('click', () => setSlide(i)));
  setInterval(() => setSlide((current + 1) % dots.length), 4500);
}

async function loadNewsList() {
  const listEl = document.getElementById('newsList');
  if (!listEl || !supabaseClient) return;
  const { data, error } = await supabaseClient.from('news').select('*').order('published_at', { ascending: false }).limit(8);
  if (error) return;
  listEl.innerHTML = data.map(item => `
    <article class="card">
      <span class="badge">${new Date(item.published_at).toLocaleDateString('id-ID')}</span>
      <h3>${item.title}</h3>
      <p>${(item.content || '').slice(0, 110)}...</p>
      <a class="btn btn-outline" href="news-detail.html?slug=${item.slug}">Baca Detail</a>
    </article>
  `).join('');
}

async function loadNewsDetail() {
  const detailEl = document.getElementById('newsDetail');
  if (!detailEl || !supabaseClient) return;
  const slug = new URLSearchParams(location.search).get('slug');
  if (!slug) return;
  const { data, error } = await supabaseClient.from('news').select('*').eq('slug', slug).single();
  if (error || !data) return;
  detailEl.innerHTML = `
    <span class="badge">${new Date(data.published_at).toLocaleDateString('id-ID')}</span>
    <h1>${data.title}</h1>
    ${data.image_url ? `<img src="${data.image_url}" style="border-radius:14px;margin:14px 0;" alt="${data.title}">` : ''}
    <p>${(data.content || '').replace(/\n/g, '<br>')}</p>
  `;
}

async function bindSpmbForm() {
  const form = document.getElementById('spmbForm');
  const msg = document.getElementById('spmbMsg');
  if (!form || !supabaseClient) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = {
      nama_lengkap: String(fd.get('nama_lengkap')),
      email: String(fd.get('email')),
      no_hp: String(fd.get('no_hp')),
      asal_sekolah: String(fd.get('asal_sekolah')),
      jalur: String(fd.get('jalur')),
      catatan: String(fd.get('catatan') || '')
    };
    const { error } = await supabaseClient.from('spmb_applications').insert(payload);
    msg.textContent = error ? `Gagal: ${error.message}` : 'Pendaftaran berhasil dikirim.';
    if (!error) form.reset();
  });
}

async function bindContactForm() {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('contactMsg');
  if (!form || !supabaseClient) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = {
      nama: String(fd.get('nama')),
      email: String(fd.get('email')),
      pesan: String(fd.get('pesan'))
    };
    const { error } = await supabaseClient.from('contact_messages').insert(payload);
    msg.textContent = error ? `Gagal: ${error.message}` : 'Pesan berhasil dikirim. Terima kasih.';
    if (!error) form.reset();
  });
}

loadNewsList();
loadNewsDetail();
bindSpmbForm();
bindContactForm();
