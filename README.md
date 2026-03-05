# Website Resmi Sekolah - SMA Ganesha

Project ini menggunakan Next.js 14 (App Router), Supabase (PostgreSQL + Auth + Storage), Tailwind CSS, dan TypeScript.

## Menjalankan Project

1. Install dependency

```bash
npm install
```

2. Setup environment (`.env`)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Jalankan development

```bash
npm run dev
```

4. Build production

```bash
npm run build
npm start
```

## Setup Supabase

1. Jalankan SQL schema tabel: `supabase/schema.sql`
2. Jalankan SQL storage bucket + policy: `supabase/storage.sql`
3. Buat user admin via Supabase Auth (email + password)

## Struktur Folder

- `app/` public pages + admin pages
- `components/` reusable UI dan admin manager
- `lib/` Supabase client + auth helper
- `types/` shared TypeScript types
- `supabase/` SQL schema dan storage setup
