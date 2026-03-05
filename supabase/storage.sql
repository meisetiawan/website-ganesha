insert into storage.buckets (id, name, public)
values
  ('news-images', 'news-images', true),
  ('gallery-images', 'gallery-images', true)
on conflict (id) do nothing;

create policy "Public read news images" on storage.objects
for select using (bucket_id = 'news-images');

create policy "Authenticated upload news images" on storage.objects
for insert with check (bucket_id = 'news-images' and auth.role() = 'authenticated');

create policy "Public read gallery images" on storage.objects
for select using (bucket_id = 'gallery-images');

create policy "Authenticated upload gallery images" on storage.objects
for insert with check (bucket_id = 'gallery-images' and auth.role() = 'authenticated');
