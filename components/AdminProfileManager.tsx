'use client';

import { FormEvent, useState } from 'react';
import { Profile, Teacher } from '@/types';
import { createClient } from '@/lib/supabaseClient';

export default function AdminProfileManager({
  initialProfile,
  initialTeachers
}: {
  initialProfile: Profile | null;
  initialTeachers: Teacher[];
}) {
  const [teachers, setTeachers] = useState(initialTeachers);

  const onSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const form = new FormData(e.currentTarget);

    const payload = {
      sejarah: String(form.get('sejarah')),
      visi: String(form.get('visi')),
      misi: String(form.get('misi')),
      struktur_organisasi_image: String(form.get('struktur_organisasi_image')),
      updated_at: new Date().toISOString()
    };

    if (initialProfile?.id) {
      await supabase.from('profiles').update(payload).eq('id', initialProfile.id);
    } else {
      await supabase.from('profiles').insert(payload);
    }
    alert('Profil tersimpan');
  };

  const onAddTeacher = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const form = new FormData(e.currentTarget);
    const { data } = await supabase
      .from('teachers')
      .insert({
        nama: String(form.get('nama')),
        jabatan: String(form.get('jabatan')),
        foto_url: String(form.get('foto_url')) || null
      })
      .select('*')
      .single();
    if (data) setTeachers((prev) => [data, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Edit Profil Sekolah</h1>
      <form onSubmit={onSaveProfile} className="card-surface grid gap-3 p-4">
        <textarea name="sejarah" defaultValue={initialProfile?.sejarah || ''} placeholder="Sejarah" rows={4} className="rounded-lg bg-white/10 p-3" />
        <textarea name="visi" defaultValue={initialProfile?.visi || ''} placeholder="Visi" rows={3} className="rounded-lg bg-white/10 p-3" />
        <textarea name="misi" defaultValue={initialProfile?.misi || ''} placeholder="Misi" rows={3} className="rounded-lg bg-white/10 p-3" />
        <input name="struktur_organisasi_image" defaultValue={initialProfile?.struktur_organisasi_image || ''} placeholder="URL Struktur Organisasi" className="rounded-lg bg-white/10 p-3" />
        <button className="rounded-lg bg-teal-400 py-2 font-semibold text-slate-900">Simpan Profil</button>
      </form>

      <form onSubmit={onAddTeacher} className="card-surface grid gap-3 p-4">
        <h2 className="text-lg font-semibold">Tambah Guru</h2>
        <input name="nama" required placeholder="Nama" className="rounded-lg bg-white/10 p-3" />
        <input name="jabatan" required placeholder="Jabatan" className="rounded-lg bg-white/10 p-3" />
        <input name="foto_url" placeholder="Foto URL" className="rounded-lg bg-white/10 p-3" />
        <button className="rounded-lg bg-teal-400 py-2 font-semibold text-slate-900">Tambah</button>
      </form>

      <div className="space-y-2">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="card-surface p-3">
            {teacher.nama} - {teacher.jabatan}
          </div>
        ))}
      </div>
    </div>
  );
}
