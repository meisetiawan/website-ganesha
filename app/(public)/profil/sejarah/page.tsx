import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sejarah",
  description: "Sejarah SMA Negeri 1 Purbalingga sejak tahun 1979",
};

const milestones = [
  {
    year: "1979",
    title: "Pendirian Sekolah",
    description:
      "SMA Negeri 1 Purbalingga didirikan sebagai jawaban atas kebutuhan pendidikan menengah atas di Kabupaten Purbalingga. Pada tahun pertama, sekolah hanya memiliki 3 kelas dengan total 120 siswa.",
  },
  {
    year: "1985",
    title: "Pengembangan Fasilitas",
    description:
      "Pembangunan gedung baru untuk laboratorium IPA dan perpustakaan. Sekolah mulai mendapat pengakuan sebagai salah satu sekolah unggulan di Jawa Tengah.",
  },
  {
    year: "1995",
    title: "Status Sekolah Unggulan",
    description:
      "Ditetapkan sebagai Sekolah Standar Nasional (SSN) oleh Kementerian Pendidikan. Prestasi akademik dan non-akademik mulai diakui di tingkat nasional.",
  },
  {
    year: "2005",
    title: "Akreditasi A",
    description:
      "Meraih akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M). Berbagai program unggulan mulai dikembangkan.",
  },
  {
    year: "2015",
    title: "Era Digital",
    description:
      "Implementasi pembelajaran berbasis teknologi dengan smart classroom, e-learning, dan laboratorium komputer modern. Sekolah menjadi rujukan untuk digitalisasi pendidikan di Purbalingga.",
  },
  {
    year: "2024",
    title: "Masa Kini",
    description:
      "Terus berkembang sebagai sekolah unggulan dengan lebih dari 1.200 siswa, 85+ guru profesional, dan ratusan prestasi di berbagai bidang. Implementasi Kurikulum Merdeka secara penuh.",
  },
];

export default function SejarahPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Sejarah Sekolah
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Perjalanan SMA Negeri 1 Purbalingga sejak 1979
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&h=700&fit=crop"
            alt="SMA Negeri 1 Purbalingga"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl font-bold text-white">
              45+ Tahun Mengabdi untuk Pendidikan
            </h2>
            <p className="mt-2 text-lg text-white/90">
              Mencetak generasi unggul dan berkarakter sejak 1979
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-muted-foreground leading-relaxed">
            SMA Negeri 1 Purbalingga merupakan salah satu sekolah menengah atas
            tertua dan terkemuka di Kabupaten Purbalingga, Jawa Tengah. Didirikan
            pada tahun 1979, sekolah ini telah menjadi kebanggaan masyarakat
            Purbalingga dalam mencetak generasi penerus bangsa yang berkualitas.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Selama lebih dari empat dekade, SMA Negeri 1 Purbalingga telah
            menghasilkan ribuan alumni yang berkiprah di berbagai bidang, baik
            di tingkat regional, nasional, maupun internasional. Komitmen kami
            dalam memberikan pendidikan berkualitas tetap menjadi prioritas
            utama hingga saat ini.
          </p>
        </div>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Perjalanan Waktu
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            {/* Milestones */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <div className="h-4 w-4 rounded-full gradient-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0
                        ? "md:pr-8 md:text-right"
                        : "md:pl-8 md:text-left"
                    }`}
                  >
                    <Card className="glass">
                      <CardContent className="p-6">
                        <span className="inline-block rounded-full gradient-accent px-3 py-1 text-sm font-semibold text-white mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Nilai-Nilai yang Dijunjung
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-white text-2xl font-bold">
                  I
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Integritas
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Menjunjung tinggi kejujuran dan etika dalam setiap tindakan
                </p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-white text-2xl font-bold">
                  U
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Unggul
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selalu berusaha mencapai yang terbaik dalam segala bidang
                </p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-white text-2xl font-bold">
                  I
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Inovatif
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Terus berinovasi untuk kemajuan pendidikan
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
