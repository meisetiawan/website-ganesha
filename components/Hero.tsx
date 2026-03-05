import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-school-gradient px-8 py-20 text-center shadow-2xl shadow-teal-500/10">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-teal-200">Website Resmi</p>
      <h1 className="mb-4 text-4xl font-bold md:text-6xl">SMA Ganesha Nusantara</h1>
      <p className="mx-auto mb-8 max-w-2xl text-slate-200">Membentuk generasi unggul, berprestasi, dan berakhlak mulia melalui pendidikan berbasis teknologi.</p>
      <div className="flex justify-center gap-4">
        <Link href="/profil" className="rounded-xl bg-teal-400 px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-teal-300">Lihat Profil</Link>
        <Link href="/kontak" className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10">Hubungi Kami</Link>
      </div>
    </section>
  );
}
