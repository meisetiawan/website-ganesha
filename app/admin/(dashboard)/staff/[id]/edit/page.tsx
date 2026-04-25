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

// Mock data for demo
const mockStaff: Record<string, {
  id: number;
  name: string;
  nip: string;
  role: string;
  position: string;
  department: string;
  photo_url: string;
  email: string;
  phone: string;
  bio: string;
  is_active: boolean;
}> = {
  "1": {
    id: 1,
    name: "Drs. H. Sutrisno, M.Pd.",
    nip: "196512151990031004",
    role: "principal",
    position: "Kepala Sekolah",
    department: "Manajemen",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    email: "sutrisno@sman1purbalingga.sch.id",
    phone: "081234567890",
    bio: "Kepala sekolah dengan pengalaman lebih dari 25 tahun dalam dunia pendidikan.",
    is_active: true,
  },
  "2": {
    id: 2,
    name: "Dr. Heru Pramono, M.Sc.",
    nip: "197003201995121001",
    role: "teacher",
    position: "Guru Fisika",
    department: "MIPA",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    email: "heru@sman1purbalingga.sch.id",
    phone: "081234567891",
    bio: "Guru fisika dengan spesialisasi mekanika kuantum.",
    is_active: true,
  },
  "3": {
    id: 3,
    name: "Hj. Siti Aminah, S.Pd., M.M.",
    nip: "197105151998022002",
    role: "teacher",
    position: "Guru Matematika",
    department: "MIPA",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    email: "siti@sman1purbalingga.sch.id",
    phone: "081234567892",
    bio: "Guru matematika berpengalaman dengan berbagai prestasi olimpiade.",
    is_active: true,
  },
  "4": {
    id: 4,
    name: "Rini Wulandari",
    nip: "198506102010012003",
    role: "staff",
    position: "Kepala Tata Usaha",
    department: "Administrasi",
    photo_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    email: "rini@sman1purbalingga.sch.id",
    phone: "081234567893",
    bio: "Kepala TU yang bertanggung jawab atas administrasi sekolah.",
    is_active: true,
  },
};

export default function EditStaffPage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    role: "teacher",
    position: "",
    department: "",
    photo_url: "",
    email: "",
    phone: "",
    bio: "",
    is_active: true,
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        // Try API first with admin flag
        const res = await fetch(`/api/staff/${staffId}?admin=true`);
        if (res.ok) {
          const data = await res.json();
          // Handle both direct data and wrapped response
          const staffData = data.data || data;
          if (staffData && staffData.name) {
            setFormData({
              name: staffData.name || "",
              nip: staffData.nip || "",
              role: staffData.role || "teacher",
              position: staffData.position || "",
              department: staffData.department || "",
              photo_url: staffData.photo_url || "",
              email: staffData.email || "",
              phone: staffData.phone || "",
              bio: staffData.bio || "",
              is_active: staffData.is_active ?? true,
            });
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to mock data
      }

      // Use mock data
      const mockData = mockStaff[staffId];
      if (mockData) {
        setFormData({
          name: mockData.name,
          nip: mockData.nip,
          role: mockData.role,
          position: mockData.position,
          department: mockData.department,
          photo_url: mockData.photo_url,
          email: mockData.email,
          phone: mockData.phone,
          bio: mockData.bio,
          is_active: mockData.is_active,
        });
      }
      setLoading(false);
    };

    fetchStaff();
  }, [staffId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/staff/${staffId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Data staff berhasil diperbarui");
        router.push("/admin/staff");
      } else {
        toast.error("Gagal memperbarui data staff");
      }
    } catch {
      // Demo mode
      toast.success("Data staff berhasil diperbarui (demo mode)");
      router.push("/admin/staff");
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
                    <FieldLabel htmlFor="nip">NIP</FieldLabel>
                    <Input
                      id="nip"
                      value={formData.nip}
                      onChange={(e) =>
                        setFormData({ ...formData, nip: e.target.value })
                      }
                      placeholder="Masukkan NIP"
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
                <CardTitle>Informasi Jabatan</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="role">Kategori</FieldLabel>
                      <Select
                        value={formData.role}
                        onValueChange={(value) =>
                          setFormData({ ...formData, role: value })
                        }
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="principal">Kepala Sekolah</SelectItem>
                          <SelectItem value="vice_principal">Wakil Kepala Sekolah</SelectItem>
                          <SelectItem value="teacher">Guru</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="department">Departemen</FieldLabel>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({ ...formData, department: e.target.value })
                        }
                        placeholder="contoh: MIPA, Bahasa, Administrasi"
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="position">Jabatan</FieldLabel>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      placeholder="contoh: Guru Matematika, Kepala TU"
                      required
                    />
                  </Field>
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
