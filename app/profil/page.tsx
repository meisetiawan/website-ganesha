import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function ProfilPage() {
  const supabase = createServerSupabaseClient();
  const [{ data: profile }, { data: teachers }] = await Promise.all([
    supabase.from('profiles').select('*').limit(1).maybeSingle(),
    supabase.from('teachers').select('*').order('created_at', { ascending: false })
  ]);

  return (
    <div className="space-y-8">
      <section className="card-surface p-6">
        <h1 className="mb-4 text-3xl font-bold">Profil Sekolah</h1>
        <h2 className="text-xl font-semibold">Sejarah</h2>
        <p className="mt-2 whitespace-pre-line text-slate-300">{profile?.sejarah || 'Isi sejarah sekolah melalui admin panel.'}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold">Visi</h2>
          <p className="mt-2 whitespace-pre-line text-slate-300">{profile?.visi || '-'}</p>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold">Misi</h2>
          <p className="mt-2 whitespace-pre-line text-slate-300">{profile?.misi || '-'}</p>
        </div>
      </section>

      <section className="card-surface p-6">
        <h2 className="mb-4 text-xl font-semibold">Struktur Organisasi</h2>
        {profile?.struktur_organisasi_image ? (
          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <Image src={profile.struktur_organisasi_image} alt="Struktur organisasi" fill className="object-contain" />
          </div>
        ) : (
          <p className="text-slate-400">Belum ada gambar struktur organisasi.</p>
        )}
      </section>

      <section className="card-surface overflow-auto p-6">
        <h2 className="mb-4 text-xl font-semibold">Data Guru & Tenaga Kependidikan</h2>
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-3">Nama</th>
              <th>Jabatan</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {(teachers ?? []).map((teacher) => (
              <tr key={teacher.id} className="border-b border-white/5">
                <td className="py-3">{teacher.nama}</td>
                <td>{teacher.jabatan}</td>
                <td>{teacher.foto_url ? 'Tersedia' : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
