create extension if not exists "pgcrypto";

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title varchar(255) not null,
  slug varchar(255) unique not null,
  content text not null,
  image_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists spmb_applications (
  id uuid primary key default gen_random_uuid(),
  nama_lengkap varchar(255) not null,
  email varchar(255) not null,
  no_hp varchar(50) not null,
  asal_sekolah varchar(255) not null,
  jalur varchar(100) not null,
  catatan text,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  nama varchar(255) not null,
  email varchar(255) not null,
  pesan text not null,
  created_at timestamptz not null default now()
);

alter table news enable row level security;
alter table spmb_applications enable row level security;
alter table contact_messages enable row level security;

create policy "public read news" on news for select using (true);
create policy "public insert spmb" on spmb_applications for insert with check (true);
create policy "public insert contact" on contact_messages for insert with check (true);
