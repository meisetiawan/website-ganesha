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
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AddStaffPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    bio: "",
    photo_url: "",
    staff_type: "guru",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.name.trim()) {
      setError("Nama lengkap harus diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          nip: formData.nip,
          role: formData.staff_type,
          position: formData.position || formData.staff_type,
          department: formData.department,
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
          photo_url: formData.photo_url,
          is_active: true,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push("/admin/staff");
      } else {
        setError(data.error || "Gagal menambahkan data");
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
        <Link href="/admin/staff">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <UserPlus className="h-8 w-8" />
            Tambah Guru/Staff
          </h1>
          <p className="text-muted-foreground mt-1">Tambahkan data guru atau staff baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Data Guru/Staff</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama lengkap dengan gelar"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  id="nip"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="Nomor Induk Pegawai"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="staff_type">Tipe</Label>
                <Select
                  value={formData.staff_type}
                  onValueChange={(value) => setFormData({ ...formData, staff_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kepala_sekolah">Kepala Sekolah</SelectItem>
                    <SelectItem value="wakil_kepala">Wakil Kepala Sekolah</SelectItem>
                    <SelectItem value="guru">Guru</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Jabatan</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Jabatan/posisi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Bidang/Mata Pelajaran</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Bidang studi atau bagian"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografi</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Biografi singkat"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo_url">URL Foto</Label>
              <Input
                id="photo_url"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/staff">
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? <Spinner className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                Simpan Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
