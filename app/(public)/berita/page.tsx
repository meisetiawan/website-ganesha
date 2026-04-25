"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar, Eye, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  image_url?: string;
  category: string;
  published_at: string;
  view_count: number;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    prestasi: "bg-green-100 text-green-800",
    Prestasi: "bg-green-100 text-green-800",
    pengumuman: "bg-blue-100 text-blue-800",
    Pengumuman: "bg-blue-100 text-blue-800",
    kegiatan: "bg-purple-100 text-purple-800",
    Kegiatan: "bg-purple-100 text-purple-800",
    akademik: "bg-orange-100 text-orange-800",
    Akademik: "bg-orange-100 text-orange-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}

export default function BeritaPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news?limit=20");
        if (res.ok) {
          const data = await res.json();
          if (data.data?.news && Array.isArray(data.data.news)) {
            setNews(data.data.news);
          }
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["Prestasi", "Pengumuman", "Kegiatan", "Akademik"];

  if (loading) {
    return (
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mb-10"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Berita & Informasi
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Berita terkini dan informasi penting dari SMA Negeri 1 Purbalingga
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berita..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={selectedCategory === null ? "secondary" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory(null)}
            >
              Semua
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "secondary" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => (
              <Card
                key={item.id}
                className="glass overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.featured_image || item.image_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(item.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {item.view_count?.toLocaleString() || 0}
                    </span>
                  </div>
                  <Link href={`/berita/${item.slug}`}>
                    <h2 className="text-lg font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {item.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada berita yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
