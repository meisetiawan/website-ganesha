'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GalleryItem } from '@/types';

export default function GaleriClient({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Galeri Kegiatan</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <button key={item.id} onClick={() => setActive(item)} className="card-surface overflow-hidden text-left transition hover:-translate-y-1">
            <div className="relative h-56 w-full">
              <Image src={item.image_url} alt={item.caption} fill className="object-cover" />
            </div>
            <p className="p-3 text-sm">{item.caption}</p>
          </button>
        ))}
      </div>
      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActive(null)}>
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image src={active.image_url} alt={active.caption} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
