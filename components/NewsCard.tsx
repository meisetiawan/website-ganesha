import Image from 'next/image';
import Link from 'next/link';
import { News } from '@/types';

export default function NewsCard({ item }: { item: News }) {
  return (
    <article className="card-surface overflow-hidden transition hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image src={item.image_url || 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop'} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <p className="mb-2 text-xs text-slate-400">{new Date(item.published_at).toLocaleDateString('id-ID')}</p>
        <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
        <Link href={`/berita/${item.slug}`} className="text-sm text-teal-300 transition hover:text-teal-200">Baca selengkapnya →</Link>
      </div>
    </article>
  );
}
