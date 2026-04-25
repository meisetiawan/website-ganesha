"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Helper function to parse department into category and bidang
function parseDepartment(department: string): { category: string; bidang: string } {
  if (!department) return { category: "Staff", bidang: "" };
  
  // Check if it's in "Category - Bidang" format
  if (department.includes(" - ")) {
    const [category, bidang] = department.split(" - ");
    return { category, bidang };
  }
  
  // Otherwise it's just the category
  return { category: department, bidang: "" };
}

export default function EditStaffPage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    category: "Guru", // Pimpinan, Guru, Staff
    bidang: "", // Mata pelajaran atau bagian
    photo_url: "",
    email: "",
    phone: "",
    bio: "",
    is_active: true,
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(`/api/staff/${staffId}?admin=true`);
        if (res.ok) {
          const data = await res.json();
          const staffData = data.data || data;
          if (staffData && staffData.name) {
            const { category, bidang } = parseDepartment(staffData.department || "");
            setFormData({
              name: staffData.name || "",
              position: staffData.position || "",
              category: category,
              bidang: bidang,
              photo_url: staffData.image_url || staffData.photo_url || "",
              email: staffData.email || "",
              phone: staffData.phone || "",
              bio: staffData.bio || "",
              is_active: staffData.is_active ?? true,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Gagal mengambil data staff");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [staffId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Build department field from category and bidang
      const department = formData.bidang 
        ? `${formData.category} - ${formData.bidang}` 
        : formData.category;

      const res = await fetch(`/api/staff/${staffId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          position: formData.position,
          department: department,
          image_url: formData.photo_url,
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
          is_active: formData.is_active,
        }),
      });

      if (res.ok) {
        toast.success("Data staff berhasil diperbarui");
        router.push("/admin/staff");
      } else {
        const data = await res.json();
        toast.error(data.error || "Gagal memperbarui data staff");
      }
    } catch (error) {
      console.error("[v0] Error updating staff:", error);
      toast.error("Terjadi kesalahan saat menyimpan");
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
          <Link href="/admin/staff">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Edit Guru/Staff
          </h1>
          <p className="text-muted-foreground mt-1">
            Perbarui informasi guru atau staff
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
                <CardTitle>Informasi Pribadi</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Masukkan nama lengkap beserta gelar"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="position">Jabatan</FieldLabel>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="Contoh: Kepala Sekolah, Guru Matematika, Tata Usaha"
                      required
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@sekolah.sch.id"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">No. Telepon</FieldLabel>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="08xxxxxxxxxx"
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="bio">Biografi Singkat</FieldLabel>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Masukkan biografi singkat"
                      rows={4}
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="category">Kategori</FieldLabel>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pimpinan">Pimpinan (Kepala Sekolah, Wakil Kepala)</SelectItem>
                          <SelectItem value="Guru">Guru</SelectItem>
                          <SelectItem value="Staff">Staff / Tenaga Kependidikan</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Kategori menentukan pengelompokan di halaman website
                      </p>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="bidang">Bidang/Mata Pelajaran</FieldLabel>
                      <Input
                        id="bidang"
                        value={formData.bidang}
                        onChange={(e) =>
                          setFormData({ ...formData, bidang: e.target.value })
                        }
                        placeholder="Contoh: Matematika, Fisika, Administrasi"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Untuk guru: mata pelajaran. Untuk staff: bagian/unit kerja.
                      </p>
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Foto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.photo_url ? (
                    <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">
                      <Image
                        src={formData.photo_url}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}

                  <Field>
                    <FieldLabel htmlFor="photo_url">URL Foto</FieldLabel>
                    <Input
                      id="photo_url"
                      value={formData.photo_url}
                      onChange={(e) =>
                        setFormData({ ...formData, photo_url: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="is_active" className="mb-0">
                      Aktif
                    </FieldLabel>
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_active: checked })
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Staff yang tidak aktif tidak akan ditampilkan di halaman publik
                  </p>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full gradient-primary text-white"
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
                          Simpan Perubahan
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
