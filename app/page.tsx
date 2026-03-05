import Image from 'next/image';
import Hero from '@/components/Hero';
import ImageSlider from '@/components/ImageSlider';
import NewsCard from '@/components/NewsCard';
import AchievementSlider from '@/components/AchievementSlider';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

const ekskul = ['Pramuka', 'Basket', 'Robotik', 'Paskibra', 'PMR', 'Karya Ilmiah'];

export default async function HomePage() {
  const supabase = createServerSupabaseClient();

  const [{ data: latestNews }, { data: achievements }] = await Promise.all([
    supabase.from('news').select('*').order('published_at', { ascending: false }).limit(3),
    supabase.from('achievements').select('*').order('created_at', { ascending: false }).limit(8)
  ]);

  return (
    <div className="space-y-12">
      <Hero />
      <ImageSlider />

      <section className="card-surface grid gap-6 p-6 md:grid-cols-[160px_1fr]">
        <div className="relative h-40 w-40 overflow-hidden rounded-2xl">
          <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="Kepala Sekolah" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Sambutan Kepala Sekolah</h2>
          <p className="mt-1 text-teal-300">Dr. Siti Rahmawati, M.Pd — Kepala Sekolah</p>
          <p className="mt-4 text-slate-300">Selamat datang di website resmi SMA Ganesha Nusantara. Kami berkomitmen menciptakan lingkungan belajar inovatif, inklusif, dan berorientasi masa depan.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Berita Terbaru</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(latestNews ?? []).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Ekstrakurikuler</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {ekskul.map((name) => (
            <div key={name} className="card-surface rounded-xl p-4 text-center text-sm font-medium text-teal-200">{name}</div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Siswa Berprestasi</h2>
        {achievements && achievements.length > 0 ? (
          <AchievementSlider items={achievements} />
        ) : (
          <p className="text-slate-400">Belum ada data siswa berprestasi.</p>
        )}
      </section>
    </div>
  );
}
