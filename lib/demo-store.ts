// In-memory store for demo data (persists during server session)
// This allows editing demo data when database is unavailable

import type { News, Event, Staff, ContactMessage, Slider } from '@/lib/types';

// Demo News Data
const initialNews: News[] = [
  {
    id: 1,
    title: "Siswa SMAN 1 Purbalingga Raih Medali Emas Olimpiade Sains",
    slug: "siswa-sman-1-purbalingga-raih-medali-emas",
    excerpt: "Prestasi membanggakan diraih oleh siswa SMAN 1 Purbalingga dalam ajang Olimpiade Sains Nasional.",
    content: "Siswa SMAN 1 Purbalingga berhasil meraih medali emas dalam ajang Olimpiade Sains Nasional (OSN) tahun 2024. Prestasi ini merupakan hasil kerja keras dan dedikasi tinggi dari siswa dan guru pembimbing.\n\nOlimpiade yang diselenggarakan di Jakarta ini diikuti oleh ribuan peserta dari seluruh Indonesia. Keberhasilan ini menunjukkan kualitas pendidikan di SMAN 1 Purbalingga yang terus meningkat dari tahun ke tahun.",
    featured_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    category: "prestasi",
    author: "Admin",
    status: "published",
    is_featured: true,
    view_count: 245,
    published_at: new Date("2024-01-15"),
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Pembukaan Pendaftaran Siswa Baru Tahun Ajaran 2024/2025",
    slug: "pembukaan-pendaftaran-siswa-baru-2024",
    excerpt: "SMAN 1 Purbalingga membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025.",
    content: "SMAN 1 Purbalingga dengan bangga mengumumkan pembukaan pendaftaran siswa baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai tanggal 1 Februari hingga 31 Maret 2024.\n\nCalon siswa dapat mendaftar secara online melalui website resmi sekolah atau datang langsung ke sekolah pada jam kerja. Persyaratan dan informasi lebih lanjut dapat dilihat di halaman pendaftaran.",
    featured_image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    category: "pengumuman",
    author: "Admin",
    status: "published",
    is_featured: false,
    view_count: 532,
    published_at: new Date("2024-01-10"),
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
  },
  {
    id: 3,
    title: "Kegiatan Pentas Seni dan Budaya 2024",
    slug: "kegiatan-pentas-seni-budaya-2024",
    excerpt: "SMAN 1 Purbalingga akan mengadakan pentas seni dan budaya tahunan.",
    content: "Dalam rangka memperingati hari jadi sekolah, SMAN 1 Purbalingga akan mengadakan Pentas Seni dan Budaya 2024. Acara ini akan menampilkan berbagai pertunjukan seni dari siswa-siswi berbakat.\n\nPentas seni ini bertujuan untuk mengembangkan kreativitas dan bakat seni siswa serta melestarikan budaya Indonesia.",
    featured_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    category: "kegiatan",
    author: "Admin",
    status: "published",
    is_featured: false,
    view_count: 189,
    published_at: new Date("2024-01-05"),
    created_at: new Date("2024-01-05"),
    updated_at: new Date("2024-01-05"),
  },
];

// Demo Events Data
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Upacara Hari Pendidikan Nasional",
    slug: "upacara-hardiknas-2024",
    description: "Upacara peringatan Hari Pendidikan Nasional tahun 2024 akan dilaksanakan di lapangan sekolah. Seluruh siswa, guru, dan staf wajib hadir dengan seragam lengkap.",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    location: "Lapangan SMAN 1 Purbalingga",
    start_date: new Date("2024-05-02"),
    end_date: new Date("2024-05-02"),
    start_time: "07:00",
    end_time: "09:00",
    status: "published",
    created_at: new Date("2024-04-15"),
    updated_at: new Date("2024-04-15"),
  },
  {
    id: 2,
    title: "Ujian Tengah Semester Genap",
    slug: "uts-genap-2024",
    description: "Pelaksanaan Ujian Tengah Semester (UTS) Genap tahun ajaran 2023/2024. Siswa diharapkan mempersiapkan diri dengan baik.",
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    location: "Ruang Kelas SMAN 1 Purbalingga",
    start_date: new Date("2024-03-11"),
    end_date: new Date("2024-03-15"),
    start_time: "07:30",
    end_time: "12:00",
    status: "published",
    created_at: new Date("2024-02-20"),
    updated_at: new Date("2024-02-20"),
  },
  {
    id: 3,
    title: "Pentas Seni Akhir Tahun",
    slug: "pentas-seni-2024",
    description: "Pentas seni dan budaya akhir tahun menampilkan berbagai pertunjukan dari siswa-siswi berbakat SMAN 1 Purbalingga.",
    image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    location: "Aula SMAN 1 Purbalingga",
    start_date: new Date("2024-06-20"),
    end_date: new Date("2024-06-21"),
    start_time: "09:00",
    end_time: "15:00",
    status: "published",
    created_at: new Date("2024-05-01"),
    updated_at: new Date("2024-05-01"),
  },
];

// Demo Staff Data
const initialStaff: Staff[] = [
  {
    id: 1,
    name: "Drs. Bambang Supriyadi, M.Pd.",
    nip: "196501151990031005",
    role: "kepala_sekolah",
    position: "Kepala Sekolah",
    department: "Pimpinan",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    email: "kepala@smansapbg.sch.id",
    phone: "0281-891234",
    education: "S2 Pendidikan",
    bio: "Kepala Sekolah SMAN 1 Purbalingga sejak tahun 2020. Berpengalaman lebih dari 30 tahun di dunia pendidikan.",
    sort_order: 1,
    is_active: true,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Dra. Siti Aminah, M.Pd.",
    nip: "196708201992032008",
    role: "wakil_kepala",
    position: "Wakil Kepala Sekolah Bidang Kurikulum",
    department: "Kurikulum",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    email: "kurikulum@smansapbg.sch.id",
    phone: "0281-891235",
    education: "S2 Pendidikan Matematika",
    bio: "Bertanggung jawab atas pengembangan kurikulum dan kegiatan akademik sekolah.",
    sort_order: 2,
    is_active: true,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Ahmad Fauzi, S.Pd., M.Si.",
    nip: "197512102000121003",
    role: "guru",
    position: "Guru Fisika",
    department: "MIPA",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    email: "fauzi@smansapbg.sch.id",
    phone: "0281-891236",
    education: "S2 Fisika",
    bio: "Guru Fisika dengan pengalaman mengajar lebih dari 20 tahun. Pembina Olimpiade Sains bidang Fisika.",
    sort_order: 10,
    is_active: true,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
];

// Demo Contact Messages Data
const initialMessages: ContactMessage[] = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "081234567890",
    subject: "Pertanyaan tentang PPDB 2024",
    message: "Selamat pagi, saya ingin menanyakan jadwal pendaftaran PPDB tahun ajaran 2024/2025. Kapan pendaftaran dibuka dan apa saja persyaratan yang diperlukan? Terima kasih.",
    status: "unread",
    created_at: new Date("2024-01-15T10:30:00"),
    updated_at: new Date("2024-01-15T10:30:00"),
  },
  {
    id: 2,
    name: "Siti Rahayu",
    email: "siti@email.com",
    phone: "082345678901",
    subject: "Informasi Beasiswa",
    message: "Halo, apakah ada program beasiswa untuk siswa berprestasi? Mohon informasinya mengenai syarat dan cara pengajuannya.",
    status: "read",
    created_at: new Date("2024-01-14T14:20:00"),
    updated_at: new Date("2024-01-14T14:20:00"),
  },
  {
    id: 3,
    name: "Ahmad Fauzan",
    email: "ahmad@email.com",
    phone: "083456789012",
    subject: "Kerjasama dengan Industri",
    message: "Dengan hormat, kami dari PT XYZ ingin menawarkan kerjasama untuk program magang siswa. Mohon dapat dihubungi untuk diskusi lebih lanjut.",
    status: "replied",
    created_at: new Date("2024-01-13T09:15:00"),
    updated_at: new Date("2024-01-13T09:15:00"),
  },
];

// Demo Slider Data
const initialSliders: Slider[] = [
  {
    id: 1,
    title: "Selamat Datang di SMA Negeri 1 Purbalingga",
    subtitle: "Mencetak generasi unggul, berkarakter, dan siap bersaing di era global",
    image_url: "https://dokumentasi-kegiatan.sgp1.cdn.digitaloceanspaces.com/website-ganesha/gedung-utama-sman1purbalingga.JPG?w=1920&h=1080&fit=crop",
    link_url: "/profil/sejarah",
    link_text: "Pelajari Lebih Lanjut",
    sort_order: 1,
    is_active: true,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Prestasi Akademik Unggulan",
    subtitle: "Raih prestasi gemilang di berbagai kompetisi sains dan olimpiade tingkat nasional",
    image_url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop",
    link_url: "/berita",
    link_text: "Lihat Prestasi",
    sort_order: 2,
    is_active: true,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    title: "Fasilitas Modern & Lengkap",
    subtitle: "Didukung sarana prasarana terkini untuk menunjang proses belajar mengajar",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop",
    link_url: "/profil/visi-misi",
    link_text: "Fasilitas Kami",
    sort_order: 3,
    is_active: true,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
];

// In-memory stores
let newsStore: News[] = [...initialNews];
let eventsStore: Event[] = [...initialEvents];
let staffStore: Staff[] = [...initialStaff];
let messagesStore: ContactMessage[] = [...initialMessages];
let slidersStore: Slider[] = [...initialSliders];

// News Store Functions
export const demoNewsStore = {
  getAll: () => newsStore,
  getBySlug: (slug: string) => newsStore.find(n => n.slug === slug),
  update: (slug: string, data: Partial<News>) => {
    const index = newsStore.findIndex(n => n.slug === slug);
    if (index !== -1) {
      newsStore[index] = { ...newsStore[index], ...data, updated_at: new Date() };
      return newsStore[index];
    }
    return null;
  },
  delete: (slug: string) => {
    const index = newsStore.findIndex(n => n.slug === slug);
    if (index !== -1) {
      newsStore.splice(index, 1);
      return true;
    }
    return false;
  },
  create: (data: Omit<News, 'id' | 'created_at' | 'updated_at'>) => {
    const newNews: News = {
      ...data,
      id: Math.max(...newsStore.map(n => n.id)) + 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    newsStore.push(newNews);
    return newNews;
  },
};

// Events Store Functions
export const demoEventsStore = {
  getAll: () => eventsStore,
  getBySlug: (slug: string) => eventsStore.find(e => e.slug === slug),
  update: (slug: string, data: Partial<Event>) => {
    const index = eventsStore.findIndex(e => e.slug === slug);
    if (index !== -1) {
      eventsStore[index] = { ...eventsStore[index], ...data, updated_at: new Date() };
      return eventsStore[index];
    }
    return null;
  },
  delete: (slug: string) => {
    const index = eventsStore.findIndex(e => e.slug === slug);
    if (index !== -1) {
      eventsStore.splice(index, 1);
      return true;
    }
    return false;
  },
  create: (data: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    const newEvent: Event = {
      ...data,
      id: Math.max(...eventsStore.map(e => e.id)) + 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    eventsStore.push(newEvent);
    return newEvent;
  },
};

// Staff Store Functions
export const demoStaffStore = {
  getAll: () => staffStore,
  getById: (id: number) => staffStore.find(s => s.id === id),
  update: (id: number, data: Partial<Staff>) => {
    const index = staffStore.findIndex(s => s.id === id);
    if (index !== -1) {
      staffStore[index] = { ...staffStore[index], ...data, updated_at: new Date() };
      return staffStore[index];
    }
    return null;
  },
  delete: (id: number) => {
    const index = staffStore.findIndex(s => s.id === id);
    if (index !== -1) {
      staffStore.splice(index, 1);
      return true;
    }
    return false;
  },
  create: (data: Omit<Staff, 'id' | 'created_at' | 'updated_at'>) => {
    const newStaff: Staff = {
      ...data,
      id: Math.max(...staffStore.map(s => s.id)) + 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    staffStore.push(newStaff);
    return newStaff;
  },
};

// Contact Messages Store Functions
export const demoMessagesStore = {
  getAll: () => messagesStore,
  getById: (id: number) => messagesStore.find(m => m.id === id),
  update: (id: number, data: Partial<ContactMessage>) => {
    const index = messagesStore.findIndex(m => m.id === id);
    if (index !== -1) {
      messagesStore[index] = { ...messagesStore[index], ...data, updated_at: new Date() };
      return messagesStore[index];
    }
    return null;
  },
  delete: (id: number) => {
    const index = messagesStore.findIndex(m => m.id === id);
    if (index !== -1) {
      messagesStore.splice(index, 1);
      return true;
    }
    return false;
  },
  create: (data: Omit<ContactMessage, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    const newMessage: ContactMessage = {
      ...data,
      id: messagesStore.length > 0 ? Math.max(...messagesStore.map(m => m.id)) + 1 : 1,
      status: 'unread',
      created_at: new Date(),
      updated_at: new Date(),
    };
    messagesStore.unshift(newMessage); // Add to beginning
    return newMessage;
  },
};

// Sliders Store Functions
export const demoSlidersStore = {
  getAll: () => slidersStore.filter(s => s.is_active).sort((a, b) => a.sort_order - b.sort_order),
  getAllAdmin: () => slidersStore.sort((a, b) => a.sort_order - b.sort_order),
  getById: (id: number) => slidersStore.find(s => s.id === id),
  update: (id: number, data: Partial<Slider>) => {
    const index = slidersStore.findIndex(s => s.id === id);
    if (index !== -1) {
      slidersStore[index] = { ...slidersStore[index], ...data, updated_at: new Date() };
      return slidersStore[index];
    }
    return null;
  },
  delete: (id: number) => {
    const index = slidersStore.findIndex(s => s.id === id);
    if (index !== -1) {
      slidersStore.splice(index, 1);
      return true;
    }
    return false;
  },
  create: (data: Omit<Slider, 'id' | 'created_at' | 'updated_at'>) => {
    const newSlider: Slider = {
      ...data,
      id: slidersStore.length > 0 ? Math.max(...slidersStore.map(s => s.id)) + 1 : 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    slidersStore.push(newSlider);
    return newSlider;
  },
};

// Check if we're in demo mode (database unavailable)
export const isDemoMode = async (): Promise<boolean> => {
  try {
    const { query } = await import('@/lib/db');
    await query('SELECT 1');
    return false;
  } catch {
    return true;
  }
};
