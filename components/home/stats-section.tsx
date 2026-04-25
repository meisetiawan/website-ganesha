"use client";

import { useEffect, useState, useRef } from "react";
import { GraduationCap, Users, Trophy, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const stats = [
  {
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Siswa Aktif",
    description: "Dari berbagai daerah di Jawa Tengah",
  },
  {
    icon: GraduationCap,
    value: 72,
    suffix: "+",
    label: "Tenaga Pengajar",
    description: "Guru profesional & bersertifikat",
  },
  {
    icon: Trophy,
    value: 500,
    suffix: "+",
    label: "Prestasi",
    description: "Tingkat regional & nasional",
  },
  {
    icon: BookOpen,
    value: 64,
    suffix: "",
    label: "Tahun Berdiri",
    description: "Sejak tahun 1961",
  },
];

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  description,
  isVisible,
}: {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  description: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-accent text-white">
        <Icon className="h-7 w-7" />
      </div>
      <div className="text-4xl font-bold text-foreground">
        {count}
        {suffix}
      </div>
      <div className="mt-1 font-medium text-foreground">{label}</div>
      <div className="mt-1 text-sm text-muted-foreground">{description}</div>
    </div>
  );
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 hero-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              SMAN 1 Purbalingga dalam Angka
            </h2>
            <p className="mt-2 text-muted-foreground">
              Prestasi dan pencapaian kami selama bertahun-tahun
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={100 + index * 100} direction="up">
              <StatCard {...stat} isVisible={isVisible} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
