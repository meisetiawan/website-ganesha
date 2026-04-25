"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link_url?: string;
  link_text?: string;
  is_active: boolean;
  order_index: number;
}

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    link_url: "",
    link_text: "",
    is_active: true,
    order_index: 0,
  });

  const fetchSliders = useCallback(async () => {
    try {
      const res = await fetch("/api/sliders?admin=true");
      if (res.ok) {
        const data = await res.json();
        // Handle array response directly
        if (Array.isArray(data)) {
          setSliders(data);
        }
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  const handleOpenDialog = (slider?: Slider) => {
    if (slider) {
      setEditingSlider(slider);
      setFormData({
        title: slider.title,
        subtitle: slider.subtitle,
        image_url: slider.image_url,
        link_url: slider.link_url || "",
        link_text: slider.link_text || "",
        is_active: slider.is_active,
        order_index: slider.order_index,
      });
    } else {
      setEditingSlider(null);
      setFormData({
        title: "",
        subtitle: "",
        image_url: "",
        link_url: "",
        link_text: "",
        is_active: true,
        order_index: sliders.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingSlider
        ? `/api/sliders/${editingSlider.id}`
        : "/api/sliders";
      const method = editingSlider ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchSliders();
      }
    } catch (error) {
      console.error("Error saving slider:", error);
    }
  };

  const handleToggleActive = async (slider: Slider) => {
    try {
      await fetch(`/api/sliders/${slider.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...slider, is_active: !slider.is_active }),
      });
      fetchSliders();
    } catch (error) {
      console.error("Error toggling slider:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus slider ini?")) return;

    try {
      const res = await fetch(`/api/sliders/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchSliders();
      }
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Slider</h1>
          <p className="text-muted-foreground">
            Atur gambar slider untuk halaman utama
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Slider
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Slider</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-20">Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Belum ada slider. Tambahkan slider pertama Anda.
                  </TableCell>
                </TableRow>
              ) : (
                sliders.map((slider) => (
                  <TableRow key={slider.id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    </TableCell>
                    <TableCell>
                      <div className="relative h-12 w-20 rounded overflow-hidden bg-muted">
                        <Image
                          src={slider.image_url}
                          alt={slider.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{slider.title}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-[200px]">
                      {slider.subtitle}
                    </TableCell>
                    <TableCell>
                      <Badge variant={slider.is_active ? "default" : "secondary"}>
                        {slider.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(slider)}
                        >
                          {slider.is_active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(slider)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(slider.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSlider ? "Edit Slider" : "Tambah Slider Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">URL Gambar</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="link_url">URL Link (opsional)</Label>
                <Input
                  id="link_url"
                  value={formData.link_url}
                  onChange={(e) =>
                    setFormData({ ...formData, link_url: e.target.value })
                  }
                  placeholder="/berita"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link_text">Teks Tombol (opsional)</Label>
                <Input
                  id="link_text"
                  value={formData.link_text}
                  onChange={(e) =>
                    setFormData({ ...formData, link_text: e.target.value })
                  }
                  placeholder="Selengkapnya"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">Aktifkan slider</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                {editingSlider ? "Simpan Perubahan" : "Tambah Slider"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
