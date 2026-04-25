"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function PrincipalWelcome() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left" delay={100}>
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                {/* Main image container */}
                <div className="relative glass rounded-2xl p-4 shadow-xl">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                      src="https://dokumentasi-kegiatan.sgp1.cdn.digitaloceanspaces.com/website-ganesha/pak%20widi.webp?w=600&h=750&fit=crop&crop=face"
                      alt="Kepala Sekolah SMA Negeri 1 Purbalingga"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Name card overlay */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-6 py-3 text-center shadow-lg">
                    <p className="font-semibold text-foreground">Widi Purnama, S.Pd.</p>
                    <p className="text-sm text-muted-foreground">Kepala Sekolah</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right" delay={200}>
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                {/* Section label */}
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <span className="text-sm font-medium text-primary">Sambutan Kepala Sekolah</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                  Selamat Datang di SMA Negeri 1 Purbalingga
                </h2>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                  <blockquote className="pl-6 border-l-4 border-primary/30">
                    <p className="text-lg text-muted-foreground leading-relaxed italic">
                      Pendidikan adalah kunci untuk membuka pintu masa depan yang gemilang.
                      Di SMA Negeri 1 Purbalingga, kami berkomitmen untuk membentuk generasi
                      muda yang tidak hanya cerdas secara akademis, tetapi juga berkarakter
                      mulia dan siap menghadapi tantangan global.
                    </p>
                  </blockquote>
                </div>

                {/* Message */}
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Assalamualaikum Warahmatullahi Wabarakatuh,
                  </p>
                  <p>
                    Puji syukur kami panjatkan kepada Allah SWT atas segala rahmat dan karunia-Nya.
                    Kami menyambut hangat kunjungan Anda di website resmi SMA Negeri 1 Purbalingga.
                  </p>
                  <p>
                    Website ini merupakan media informasi dan komunikasi antara sekolah dengan
                    masyarakat luas. Melalui website ini, kami berharap dapat memberikan informasi
                    yang akurat dan terkini tentang kegiatan, prestasi, dan perkembangan sekolah kami.
                  </p>
                  <p>
                    Kami mengundang seluruh civitas akademika, orang tua, dan masyarakat untuk
                    bersama-sama mendukung kemajuan pendidikan di SMA Negeri 1 Purbalingga.
                  </p>
                  <p className="font-medium text-foreground">
                    Wassalamualaikum Warahmatullahi Wabarakatuh.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
