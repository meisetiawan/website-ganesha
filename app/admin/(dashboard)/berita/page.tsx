"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  status: string;
  is_published: number;
  published_at: string | null;
  created_at: string;
}



function formatDate(dateString: string | null) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusBadge(status: string) {
  if (status === "published") {
    return <Badge className="bg-green-100 text-green-800">Terbit</Badge>;
  }
  return <Badge variant="secondary">Draft</Badge>;
}



export default function AdminBeritaPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news?admin=true&limit=50");
      console.log("[v0] Admin News API response status:", res.status);
      const data = await res.json();
      console.log("[v0] Admin News API response:", data);
      
      if (data.success && Array.isArray(data.data)) {
        console.log("[v0] Found news data, length:", data.data.length);
        setNews(data.data);
      } else if (data.data?.news && Array.isArray(data.data.news)) {
        setNews(data.data.news);
      } else {
        console.log("[v0] No valid news data found, setting empty array");
        setNews([]);
      }
    } catch (error) {
      console.error("[v0] Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (slug: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    
    // Optimistic update
    setNews(prev => prev.filter(item => item.slug !== slug));
    
    try {
      await fetch(`/api/news/${slug}`, { method: "DELETE" });
    } catch {
      // Revert if failed
      fetchNews();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Kelola Berita
          </h1>
          <p className="text-muted-foreground mt-1">
            Tambah, edit, dan hapus berita website
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={fetchNews} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button asChild className="gradient-primary text-white">
            <Link href="/admin/berita/tambah">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Berita
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari berita..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Daftar Berita ({filteredNews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Judul</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Terbit</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium text-foreground line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        /{item.slug}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(item.published_at)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/berita/${item.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/berita/${item.slug}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(item.slug)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredNews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Tidak ada berita ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
