"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Save, CalendarPlus } from "lucide-react";
import Link from "next/link";

export default function AddEventPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    category: "akademik",
    status: "upcoming",
    featured_image: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.title.trim()) {
      setError("Nama kegiatan harus diisi");
      return;
    }
    if (!formData.event_date) {
      setError("Tanggal kegiatan harus diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          start_date: formData.event_date,
          end_date: formData.event_date,
          start_time: formData.event_time || "08:00",
          end_time: formData.event_time ? formData.event_time.replace(/^\d{2}/, (h) => String(parseInt(h) + 2).padStart(2, '0')) : "10:00",
          location: formData.location,
          image_url: formData.featured_image,
          status: formData.status === "upcoming" ? "published" : formData.status,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push("/admin/agenda");
      } else {
        setError(data.error || "Gagal menambahkan agenda");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/agenda">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <CalendarPlus className="h-8 w-8" />
            Tambah Agenda
          </h1>
          <p className="text-muted-foreground mt-1">Buat agenda kegiatan baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Informasi Agenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Nama Kegiatan *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan nama kegiatan"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="event_date">Tanggal *</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event_time">Waktu</Label>
                <Input
                  id="event_time"
                  type="time"
                  value={formData.event_time}
                  onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                />
              </div>

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
                    <SelectItem value="akademik">Akademik</SelectItem>
                    <SelectItem value="olahraga">Olahraga</SelectItem>
                    <SelectItem value="seni">Seni & Budaya</SelectItem>
                    <SelectItem value="organisasi">Organisasi</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Tempat kegiatan"
                />
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
                    <SelectItem value="upcoming">Akan Datang</SelectItem>
                    <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi lengkap kegiatan"
                rows={5}
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
              <Link href="/admin/agenda">
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? <Spinner className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                Simpan Agenda
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
