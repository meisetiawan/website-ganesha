"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
    pengumuman: "bg-blue-100 text-blue-800",
    kegiatan: "bg-purple-100 text-purple-800",
    akademik: "bg-orange-100 text-orange-800",
    umum: "bg-gray-100 text-gray-800",
  };
  return colors[category?.toLowerCase()] || "bg-gray-100 text-gray-800";
}

export function NewsPreview() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news?limit=3");
        console.log("[v0] News API response status:", res.status);
        const data = await res.json();
        console.log("[v0] News API response data:", data);
        
        if (data.success && Array.isArray(data.data)) {
          console.log("[v0] Using data.data array, length:", data.data.length);
          setNews(data.data.slice(0, 3));
        } else if (data.data?.news && Array.isArray(data.data.news)) {
          setNews(data.data.news.slice(0, 3));
        } else if (Array.isArray(data)) {
          setNews(data.slice(0, 3));
        } else {
          console.log("[v0] No valid news data found in response");
          setNews([]);
        }
      } catch (error) {
        console.error("[v0] Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="h-4 bg-muted rounded w-72 mb-10"></div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-44 bg-muted rounded-lg"></div>
                <div className="h-44 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  const [featuredNews, ...otherNews] = news;

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Berita Terkini
              </h2>
              <p className="mt-2 text-muted-foreground">
                Informasi dan kegiatan terbaru dari SMAN 1 Purbalingga
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/berita">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* News Grid - 1 Large + 2 Small */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured News - Large Card */}
          <ScrollReveal delay={100} direction="left">
            <Card className="glass overflow-hidden group h-full">
            <Link href={`/berita/${featuredNews.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featuredNews.featured_image || featuredNews.image_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"}
                  alt={featuredNews.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <Badge
                  className={`absolute top-4 left-4 ${getCategoryColor(featuredNews.category)}`}
                >
                  {featuredNews.category}
                </Badge>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredNews.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredNews.view_count?.toLocaleString() || 0}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {featuredNews.title}
                  </h3>
                  <p className="text-white/90 line-clamp-2">
                    {featuredNews.excerpt}
                  </p>
                </div>
              </div>
            </Link>
            </Card>
          </ScrollReveal>

          {/* Other News - 2 Small Cards */}
          <ScrollReveal delay={200} direction="right">
            <div className="flex flex-col gap-4 h-full">
            {otherNews.map((item) => (
              <Card key={item.id} className="glass overflow-hidden group flex-1">
                <Link href={`/berita/${item.slug}`} className="flex h-full">
                  <div className="relative w-1/3 min-w-[120px]">
                    <Image
                      src={item.featured_image || item.image_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex-1 p-4 flex flex-col justify-center">
                    <Badge
                      className={`w-fit mb-2 text-xs ${getCategoryColor(item.category)}`}
                    >
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.view_count?.toLocaleString() || 0}
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/berita">
              Lihat Semua Berita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
