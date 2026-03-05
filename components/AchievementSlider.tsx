import Image from 'next/image';
import { Achievement } from '@/types';

export default function AchievementSlider({ items }: { items: Achievement[] }) {
  const loopItems = [...items, ...items];

  return (
    <section className="overflow-hidden">
      <div className="flex min-w-max animate-marquee gap-4">
        {loopItems.map((item, idx) => (
          <article key={`${item.id}-${idx}`} className="card-surface flex w-72 items-center gap-3 p-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src={item.foto_url} alt={item.nama} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-semibold">{item.nama}</h4>
              <p className="text-sm text-slate-300">{item.prestasi}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
