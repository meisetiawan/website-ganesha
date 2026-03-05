'use client';

import { FormEvent, useState } from 'react';
import { News } from '@/types';
import { createClient } from '@/lib/supabaseClient';

export default function AdminNewsManager({ initialNews }: { initialNews: News[] }) {
  const [items, setItems] = useState(initialNews);

  const uploadImage = async (file: File) => {
    const supabase = createClient();
    const filePath = `news/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('news-images').upload(filePath, file, { upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from('news-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const onCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const form = new FormData(e.currentTarget);
    const imageFile = form.get('image') as File;
    const imageUrl = imageFile?.size ? await uploadImage(imageFile) : null;

    const payload = {
      title: String(form.get('title')),
      slug: String(form.get('slug')),
      content: String(form.get('content')),
      image_url: imageUrl,
      published_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('news').insert(payload).select('*').single();
    if (!error && data) setItems((prev) => [data, ...prev]);
    e.currentTarget.reset();
  };

  const onDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from('news').delete().eq('id', id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">CRUD Berita</h1>
      <form onSubmit={onCreate} className="card-surface grid gap-3 p-4">
        <input name="title" required placeholder="Judul" className="rounded-lg bg-white/10 p-3" />
        <input name="slug" required placeholder="Slug (unik)" className="rounded-lg bg-white/10 p-3" />
        <textarea name="content" required placeholder="Konten berita" rows={5} className="rounded-lg bg-white/10 p-3" />
        <input name="image" type="file" accept="image/*" className="rounded-lg bg-white/10 p-3" />
        <button className="rounded-lg bg-teal-400 py-2 font-semibold text-slate-900">Simpan Berita</button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card-surface flex items-start justify-between p-4">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-slate-400">/{item.slug}</p>
            </div>
            <button onClick={() => onDelete(item.id)} className="rounded-lg bg-rose-400/20 px-3 py-1 text-sm text-rose-200">Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
