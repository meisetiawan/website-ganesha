"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function TambahBeritaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "umum",
    author: "Admin",
    status: "published",
    is_featured: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.title.trim()) {
      setError("Judul berita harus diisi");
      return;
    }
    if (!formData.content.trim()) {
      setError("Konten berita harus diisi");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          featured_image: formData.image_url,
          category: formData.category,
          author: formData.author || "Admin",
          status: formData.status,
          is_featured: formData.is_featured,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push("/admin/berita");
      } else {
        setError(data.error || "Gagal menambahkan berita");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan berita");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/berita">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Tambah Berita
          </h1>
          <p className="text-muted-foreground mt-1">
            Buat berita baru untuk website
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Konten Berita</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Judul Berita *</FieldLabel>
                    <Input
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="Masukkan judul berita"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Slug URL</FieldLabel>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="url-berita"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL: /berita/{formData.slug || "url-berita"}
                    </p>
                  </Field>

                  <Field>
                    <FieldLabel>Ringkasan</FieldLabel>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      placeholder="Ringkasan singkat berita (max 200 karakter)"
                      rows={3}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Konten Berita *</FieldLabel>
                    <Textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, content: e.target.value }))
                      }
                      placeholder="Tulis konten berita di sini..."
                      rows={12}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Mendukung format HTML dasar
                    </p>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Pengaturan</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Terbit</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Kategori</FieldLabel>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="umum">Umum</SelectItem>
                        <SelectItem value="prestasi">Prestasi</SelectItem>
                        <SelectItem value="pengumuman">Pengumuman</SelectItem>
                        <SelectItem value="kegiatan">Kegiatan</SelectItem>
                        <SelectItem value="akademik">Akademik</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Penulis</FieldLabel>
                    <Input
                      value={formData.author}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, author: e.target.value }))
                      }
                      placeholder="Nama penulis"
                    />
                  </Field>

                  <div className="flex items-center justify-between">
                    <FieldLabel className="mb-0">Berita Unggulan</FieldLabel>
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, is_featured: checked }))
                      }
                    />
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Gambar</CardTitle>
              </CardHeader>
              <CardContent>
                <Field>
                  <FieldLabel>URL Gambar</FieldLabel>
                  <Input
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </Field>
                {formData.image_url && (
                  <div className="mt-4 aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-primary text-white"
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
