"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

// Mock data for demo
const mockEvents: Record<string, {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: string;
}> = {
  "upacara-hardiknas-2024": {
    id: 1,
    title: "Upacara Hari Pendidikan Nasional",
    slug: "upacara-hardiknas-2024",
    description: "Upacara memperingati Hari Pendidikan Nasional tahun 2024 dengan berbagai rangkaian kegiatan.",
    location: "Lapangan Utama",
    start_date: "2024-05-02",
    end_date: "2024-05-02",
    start_time: "07:00",
    end_time: "09:00",
    status: "published",
  },
  "uas-genap-2024": {
    id: 2,
    title: "Ujian Akhir Semester Genap",
    slug: "uas-genap-2024",
    description: "Pelaksanaan Ujian Akhir Semester Genap untuk seluruh siswa kelas X, XI, dan XII.",
    location: "Ruang Kelas",
    start_date: "2024-05-20",
    end_date: "2024-05-31",
    start_time: "07:30",
    end_time: "12:00",
    status: "published",
  },
  "pentas-seni-2024": {
    id: 3,
    title: "Pentas Seni Akhir Tahun",
    slug: "pentas-seni-2024",
    description: "Pentas seni tahunan menampilkan kreativitas siswa dalam bidang seni dan budaya.",
    location: "Aula Sekolah",
    start_date: "2024-06-15",
    end_date: "2024-06-15",
    start_time: "08:00",
    end_time: "14:00",
    status: "draft",
  },
};

export default function EditAgendaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    status: "draft",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Try API first with admin flag
        const res = await fetch(`/api/events/${slug}?admin=true`);
        if (res.ok) {
          const data = await res.json();
          // Handle both direct data and wrapped response
          const eventData = data.data || data;
          if (eventData && eventData.title) {
            const startDate = eventData.start_date ? new Date(eventData.start_date).toISOString().split("T")[0] : "";
            const endDate = eventData.end_date ? new Date(eventData.end_date).toISOString().split("T")[0] : "";
            setFormData({
              title: eventData.title || "",
              description: eventData.description || "",
              location: eventData.location || "",
              start_date: startDate,
              end_date: endDate,
              start_time: eventData.start_time || "",
              end_time: eventData.end_time || "",
              status: eventData.status || "draft",
            });
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to mock data
      }

      // Use mock data
      const mockEvent = mockEvents[slug];
      if (mockEvent) {
        setFormData({
          title: mockEvent.title,
          description: mockEvent.description,
          location: mockEvent.location,
          start_date: mockEvent.start_date,
          end_date: mockEvent.end_date,
          start_time: mockEvent.start_time,
          end_time: mockEvent.end_time,
          status: mockEvent.status,
        });
      }
      setLoading(false);
    };

    fetchEvent();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/events/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Agenda berhasil diperbarui");
        router.push("/admin/agenda");
      } else {
        toast.error("Gagal memperbarui agenda");
      }
    } catch {
      // Demo mode
      toast.success("Agenda berhasil diperbarui (demo mode)");
      router.push("/admin/agenda");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/agenda">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Edit Agenda
          </h1>
          <p className="text-muted-foreground mt-1">
            Perbarui informasi agenda kegiatan
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Informasi Kegiatan</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="title">Judul Kegiatan</FieldLabel>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Masukkan judul kegiatan"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Masukkan deskripsi kegiatan"
                      rows={5}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="location">Lokasi</FieldLabel>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Masukkan lokasi kegiatan"
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Waktu Pelaksanaan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="start_date">Tanggal Mulai</FieldLabel>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="end_date">Tanggal Selesai</FieldLabel>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="start_time">Waktu Mulai</FieldLabel>
                    <Input
                      id="start_time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) =>
                        setFormData({ ...formData, start_time: e.target.value })
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="end_time">Waktu Selesai</FieldLabel>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) =>
                        setFormData({ ...formData, end_time: e.target.value })
                      }
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Publikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Publikasikan</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 gradient-primary text-white"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Simpan
                        </>
                      )}
                    </Button>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
