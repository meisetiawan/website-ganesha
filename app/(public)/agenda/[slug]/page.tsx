"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  location: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getEventStatus(startDate: string, endDate: string) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return { label: "Akan Datang", color: "bg-blue-100 text-blue-800" };
  } else if (now >= start && now <= end) {
    return { label: "Berlangsung", color: "bg-green-100 text-green-800" };
  } else {
    return { label: "Selesai", color: "bg-gray-100 text-gray-800" };
  }
}

export default function AgendaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${slug}`);
        if (res.ok) {
          const data = await res.json();
          // API returns the event object directly, not wrapped in data
          if (data && !data.error && data.id) {
            setEvent(data);
          } else if (data.success === false) {
            setError("Agenda tidak ditemukan");
          } else {
            setError("Agenda tidak ditemukan");
          }
        } else {
          setError("Agenda tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal memuat agenda");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-24 mb-8"></div>
            <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || "Agenda tidak ditemukan"}
          </h1>
          <p className="text-muted-foreground mb-8">
            Maaf, agenda yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Button asChild>
            <Link href="/agenda">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Agenda
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const status = getEventStatus(event.start_date, event.end_date);
  const isSingleDay = event.start_date === event.end_date || 
    new Date(event.start_date).toDateString() === new Date(event.end_date).toDateString();

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/agenda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Agenda
          </Link>
        </Button>

        {/* Event Header */}
        <div className="mb-8">
          <Badge className={status.color}>{status.label}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {event.title}
          </h1>
        </div>

        {/* Event Image */}
        {event.image_url && (
          <div className="relative aspect-video overflow-hidden rounded-xl mb-8">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Event Info Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium text-foreground">
                  {isSingleDay ? (
                    formatDateShort(event.start_date)
                  ) : (
                    `${formatDateShort(event.start_date)} - ${formatDateShort(event.end_date)}`
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Waktu</p>
                <p className="font-medium text-foreground">
                  {event.start_time} - {event.end_time} WIB
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lokasi</p>
                <p className="font-medium text-foreground">{event.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Description */}
        <Card className="glass mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Deskripsi Kegiatan
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {event.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Share Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: event.title,
                  text: event.description,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link berhasil disalin!");
              }
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Bagikan Agenda
          </Button>
        </div>
      </div>
    </div>
  );
}
