export type Profile = {
  id: string;
  sejarah: string;
  visi: string;
  misi: string;
  struktur_organisasi_image: string | null;
  updated_at: string;
};

export type Teacher = {
  id: string;
  nama: string;
  jabatan: string;
  foto_url: string | null;
  created_at: string;
};

export type News = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string;
  created_at: string;
};

export type Achievement = {
  id: string;
  nama: string;
  foto_url: string;
  prestasi: string;
  created_at: string;
};
