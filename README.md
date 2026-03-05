# Website Sekolah Modern (Static HTML + Supabase PostgreSQL)

Website ini dibuat dengan struktur multi-halaman **HTML + CSS + JavaScript** seperti situs resmi sekolah profesional.

## Struktur File

- `index.html` (Beranda)
- `about.html` (Tentang)
- `kurikulum.html` (Kurikulum)
- `partnership.html` (Partnership)
- `spmb.html` (SPMB Online)
- `news.html` (Blog & Berita)
- `news-detail.html` (Detail Berita)
- `kontak.html` (Kontak)
- `styles.css`
- `scripts.js`
- `assets/`
- `supabase/static_site_schema.sql`

## Integrasi Supabase

1. Jalankan SQL berikut di Supabase SQL Editor:
   - `supabase/static_site_schema.sql`
2. Aktifkan project Supabase dan ambil:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Inject key di HTML (sebelum `scripts.js`) atau set global:

```html
<script>
  window.SUPABASE_URL = 'https://xxxxx.supabase.co';
  window.SUPABASE_ANON_KEY = 'public-anon-key';
</script>
```

## Jalankan Local

Karena ini static site, cukup gunakan server statis:

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## Fitur Utama

- Header/nav profesional + CTA
- Hero section dan layout modern responsif
- Slider berita otomatis
- Halaman berita list + detail dari Supabase
- Form SPMB online (insert ke Supabase)
- Form kontak aktif (insert ke Supabase)
