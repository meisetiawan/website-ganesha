'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop'
];

export default function ImageSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="card-surface overflow-hidden p-4">
      <div className="relative h-72 w-full overflow-hidden rounded-xl md:h-[420px]">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-700 ${active === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${active === i ? 'bg-teal-300' : 'bg-white/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
