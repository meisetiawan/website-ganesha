create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  sejarah text not null default '',
  visi text not null default '',
  misi text not null default '',
  struktur_organisasi_image text,
  updated_at timestamptz not null default now()
);

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  nama varchar(255) not null,
  jabatan varchar(255) not null,
  foto_url text,
  created_at timestamptz not null default now()
);

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title varchar(255) not null,
  slug varchar(255) unique not null,
  content text not null,
  image_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption varchar(255) not null,
  created_at timestamptz not null default now()
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  nama varchar(255) not null,
  foto_url text not null,
  prestasi text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table teachers enable row level security;
alter table news enable row level security;
alter table gallery enable row level security;
alter table achievements enable row level security;

create policy "Public read profiles" on profiles for select using (true);
create policy "Public read teachers" on teachers for select using (true);
create policy "Public read news" on news for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read achievements" on achievements for select using (true);

create policy "Authenticated full profiles" on profiles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated full teachers" on teachers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated full news" on news for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated full gallery" on gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated full achievements" on achievements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
