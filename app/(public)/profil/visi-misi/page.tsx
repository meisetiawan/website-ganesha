import type { Metadata } from "next";
import { Target, Lightbulb, Users, BookOpen, Heart, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Visi & Misi",
  description: "Visi dan Misi SMA Negeri 1 Purbalingga",
};

const misi = [
  {
    icon: BookOpen,
    title: "Pendidikan Berkualitas",
    description:
      "Menyelenggarakan pendidikan yang berkualitas tinggi dengan kurikulum yang relevan dan inovatif untuk mengembangkan potensi akademik peserta didik.",
  },
  {
    icon: Heart,
    title: "Pembentukan Karakter",
    description:
      "Membentuk karakter peserta didik yang berakhlak mulia, berbudi pekerti luhur, dan memiliki integritas tinggi berdasarkan nilai-nilai Pancasila.",
  },
  {
    icon: Users,
    title: "Pengembangan Bakat",
    description:
      "Mengembangkan bakat dan minat peserta didik melalui program ekstrakurikuler yang beragam dan berkualitas.",
  },
  {
    icon: Globe,
    title: "Wawasan Global",
    description:
      "Membekali peserta didik dengan wawasan global dan kemampuan berbahasa asing untuk bersaing di era globalisasi.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi & Teknologi",
    description:
      "Mengintegrasikan teknologi informasi dalam proses pembelajaran untuk meningkatkan efektivitas dan efisiensi pendidikan.",
  },
  {
    icon: Target,
    title: "Prestasi Unggul",
    description:
      "Mendorong dan memfasilitasi pencapaian prestasi akademik dan non-akademik di tingkat regional, nasional, dan internasional.",
  },
];

const tujuan = [
  "Menghasilkan lulusan yang beriman, berakhlak mulia, dan cerdas",
  "Meningkatkan prestasi akademik dengan target kelulusan 100%",
  "Meraih prestasi di berbagai kompetisi tingkat nasional dan internasional",
  "Mewujudkan lingkungan sekolah yang kondusif, aman, dan nyaman",
  "Mengembangkan keterampilan abad 21 (critical thinking, creativity, collaboration, communication)",
  "Mempersiapkan peserta didik melanjutkan ke perguruan tinggi terkemuka",
];

export default function VisiMisiPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Visi & Misi
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Arah dan tujuan pendidikan SMA Negeri 1 Purbalingga
          </p>
        </div>

        {/* Visi */}
        <section className="mb-16">
          <Card className="glass overflow-hidden">
            <div className="gradient-primary p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">VISI</h2>
              <p className="text-2xl lg:text-3xl font-semibold text-white text-balance leading-relaxed">
                &ldquo;Terwujudnya Peserta Didik yang Beriman, Berakhlak Mulia,
                Cerdas, Terampil, dan Berwawasan Global&rdquo;
              </p>
            </div>
            <CardContent className="p-6 bg-secondary/20">
              <p className="text-muted-foreground text-center">
                Visi ini mencerminkan komitmen kami untuk menghasilkan lulusan
                yang tidak hanya unggul dalam akademik, tetapi juga memiliki
                karakter kuat dan siap menghadapi tantangan global.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Misi */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            MISI
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {misi.map((item, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-accent text-white mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tujuan */}
        <section className="mb-16">
          <Card className="glass">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                TUJUAN
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {tujuan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-primary text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Motto */}
        <section>
          <Card className="glass overflow-hidden text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">MOTTO</h2>
              <div className="inline-block rounded-xl gradient-primary px-8 py-4">
                <p className="text-3xl font-bold text-white">
                  &ldquo;SMART - SAMAN SATU&rdquo;
                </p>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  <strong>S</strong>emangat
                </span>
                <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  <strong>M</strong>andiri
                </span>
                <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  <strong>A</strong>khlak Mulia
                </span>
                <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  <strong>R</strong>eligius
                </span>
                <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  <strong>T</strong>erampil
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
