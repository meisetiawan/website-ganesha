'use client';

import { FormEvent, useState } from 'react';
import { GalleryItem } from '@/types';
import { createClient } from '@/lib/supabaseClient';

export default function AdminGalleryManager({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);

  const onCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const form = new FormData(e.currentTarget);
    const file = form.get('image') as File;
    if (!file?.size) return;

    const filePath = `gallery/${Date.now()}-${file.name}`;
    await supabase.storage.from('gallery-images').upload(filePath, file);
    const { data: urlData } = supabase.storage.from('gallery-images').getPublicUrl(filePath);

    const { data } = await supabase
      .from('gallery')
      .insert({ image_url: urlData.publicUrl, caption: String(form.get('caption')) })
      .select('*')
      .single();

    if (data) setItems((prev) => [data, ...prev]);
    e.currentTarget.reset();
  };

  const onDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from('gallery').delete().eq('id', id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">CRUD Galeri</h1>
      <form onSubmit={onCreate} className="card-surface grid gap-3 p-4">
        <input name="caption" required placeholder="Caption" className="rounded-lg bg-white/10 p-3" />
        <input name="image" type="file" required accept="image/*" className="rounded-lg bg-white/10 p-3" />
        <button className="rounded-lg bg-teal-400 py-2 font-semibold text-slate-900">Upload</button>
      </form>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="card-surface flex items-center justify-between p-4">
            <p>{item.caption}</p>
            <button onClick={() => onDelete(item.id)} className="rounded-lg bg-rose-400/20 px-3 py-1 text-sm text-rose-200">Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
