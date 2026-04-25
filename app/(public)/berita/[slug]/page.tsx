"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, ArrowLeft, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewsDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  image_url?: string;
  category: string;
  author: string;
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

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news/${slug}`);
        if (res.ok) {
          const data = await res.json();
          // API returns the news object directly, not wrapped in data
          if (data && !data.error && data.id) {
            setNews(data);
          } else if (data.success === false) {
            setError("Berita tidak ditemukan");
          } else {
            setError("Berita tidak ditemukan");
          }
        } else {
          setError("Berita tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal memuat berita");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchNews();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-6"></div>
            <div className="h-6 bg-muted rounded w-20 mb-4"></div>
            <div className="h-12 bg-muted rounded w-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-3/4 mb-8"></div>
            <div className="aspect-video bg-muted rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || "Berita tidak ditemukan"}
          </h1>
          <p className="text-muted-foreground mb-8">
            Maaf, berita yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Button asChild>
            <Link href="/berita">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Berita
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl = news.featured_image || news.image_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop";

  return (
    <article className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 -ml-4">
          <Link href="/berita">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Berita
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-8">
          <Badge className={getCategoryColor(news.category)}>
            {news.category}
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {news.title}
          </h1>
          {news.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{news.excerpt}</p>
          )}

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {news.author || "Admin"}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(news.published_at)}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {(news.view_count || 0).toLocaleString()} pembaca
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-primary"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* Share */}
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Bagikan artikel ini:
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: news.title,
                    text: news.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link berhasil disalin!");
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Bagikan
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
