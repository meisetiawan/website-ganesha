"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import type { News } from "@/lib/types";

// Demo data - sama dengan di API
const DEMO_NEWS: Record<string, { title: string; content: string; excerpt: string; featured_image: string; category: string; status: string }> = {
  "siswa-sman-1-purbalingga-raih-medali-emas": {
    title: "Siswa SMAN 1 Purbalingga Raih Medali Emas Olimpiade Sains",
    content: "Siswa SMAN 1 Purbalingga berhasil meraih medali emas dalam ajang Olimpiade Sains Nasional (OSN) tahun 2024. Prestasi ini merupakan hasil kerja keras dan dedikasi tinggi dari siswa dan guru pembimbing.\n\nOlimpiade yang diselenggarakan di Jakarta ini diikuti oleh ribuan peserta dari seluruh Indonesia. Keberhasilan ini menunjukkan kualitas pendidikan di SMAN 1 Purbalingga yang terus meningkat dari tahun ke tahun.",
    excerpt: "Prestasi membanggakan diraih oleh siswa SMAN 1 Purbalingga dalam ajang Olimpiade Sains Nasional.",
    featured_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    category: "prestasi",
    status: "published",
  },
  "pembukaan-pendaftaran-siswa-baru-2024": {
    title: "Pembukaan Pendaftaran Siswa Baru Tahun Ajaran 2024/2025",
    content: "SMAN 1 Purbalingga dengan bangga mengumumkan pembukaan pendaftaran siswa baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai tanggal 1 Februari hingga 31 Maret 2024.\n\nCalon siswa dapat mendaftar secara online melalui website resmi sekolah atau datang langsung ke sekolah pada jam kerja. Persyaratan dan informasi lebih lanjut dapat dilihat di halaman pendaftaran.",
    excerpt: "SMAN 1 Purbalingga membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025.",
    featured_image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    category: "pengumuman",
    status: "published",
  },
  "kegiatan-pentas-seni-budaya-2024": {
    title: "Kegiatan Pentas Seni dan Budaya 2024",
    content: "Dalam rangka memperingati hari jadi sekolah, SMAN 1 Purbalingga akan mengadakan Pentas Seni dan Budaya 2024. Acara ini akan menampilkan berbagai pertunjukan seni dari siswa-siswi berbakat.\n\nPentas seni ini bertujuan untuk mengembangkan kreativitas dan bakat seni siswa serta melestarikan budaya Indonesia.",
    excerpt: "SMAN 1 Purbalingga akan mengadakan pentas seni dan budaya tahunan.",
    featured_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    category: "kegiatan",
    status: "published",
  },
};

export default function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured_image: "",
    category: "pengumuman",
    status: "draft",
  });

  useEffect(() => {
    fetchNews();
  }, [slug]);

  async function fetchNews() {
    try {
      const res = await fetch(`/api/news/${slug}?admin=true`);
      if (res.ok) {
        const data = await res.json();
        // Handle both direct data and wrapped response
        const newsData = data.data || data;
        if (newsData && newsData.title) {
          setFormData({
            title: newsData.title,
            content: newsData.content,
            excerpt: newsData.excerpt || "",
            featured_image: newsData.featured_image || "",
            category: newsData.category,
            status: newsData.status,
          });
          setLoading(false);
          return;
        }
      }
    } catch {
      // Continue to fallback
    }

    // Fallback to demo data
    const demoData = DEMO_NEWS[slug];
    if (demoData) {
      setFormData({
        title: demoData.title,
        content: demoData.content,
        excerpt: demoData.excerpt,
        featured_image: demoData.featured_image,
        category: demoData.category,
        status: demoData.status,
      });
    } else {
      setError("Berita tidak ditemukan");
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/news/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/berita");
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mengupdate berita");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/berita">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Edit Berita</h1>
        </div>
        <Card className="glass">
          <CardContent className="p-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/berita">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Berita</h1>
          <p className="text-muted-foreground mt-1">Perbarui informasi berita</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Informasi Berita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Judul Berita *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan judul berita"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="prestasi">Prestasi</SelectItem>
                    <SelectItem value="kegiatan">Kegiatan</SelectItem>
                    <SelectItem value="akademik">Akademik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Dipublikasikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Ringkasan singkat berita (opsional)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Isi berita lengkap"
                rows={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured_image">URL Gambar</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/berita">
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </Link>
              <Button type="submit" disabled={saving} className="gap-2">
                {saving ? <Spinner className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                Simpan Perubahan
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
