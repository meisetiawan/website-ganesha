"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventItem {
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
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(startTime: string, endTime: string) {
  return `${startTime} - ${endTime} WIB`;
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

export default function AgendaPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?limit=20");
        if (res.ok) {
          const data = await res.json();
          if (data.data?.events && Array.isArray(data.data.events)) {
            setEvents(data.data.events);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Filter events by current month
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.start_date);
    return eventDate.getMonth() === currentMonth.getMonth() &&
           eventDate.getFullYear() === currentMonth.getFullYear();
  });

  // Get upcoming events (regardless of month filter)
  const upcomingEvents = events
    .filter(event => new Date(event.start_date) >= new Date())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mb-10"></div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-muted rounded-lg"></div>
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
            Agenda Kegiatan
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Jadwal kegiatan dan acara penting SMA Negeri 1 Purbalingga
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Events List */}
          <div className="lg:col-span-2">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Events for selected month */}
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event) => {
                  const status = getEventStatus(event.start_date, event.end_date);
                  return (
                    <Card key={event.id} className="glass overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          {/* Date Badge */}
                          <div className="gradient-primary text-white p-4 flex flex-col items-center justify-center min-w-[100px]">
                            <span className="text-3xl font-bold">
                              {new Date(event.start_date).getDate()}
                            </span>
                            <span className="text-sm uppercase">
                              {new Date(event.start_date).toLocaleDateString("id-ID", { month: "short" })}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <Link href={`/agenda/${event.slug}`}>
                                  <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    {event.title}
                                  </h3>
                                </Link>
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                  {event.description}
                                </p>
                              </div>
                              <Badge className={status.color}>
                                {status.label}
                              </Badge>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>{formatDate(event.start_date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(event.start_time, event.end_time)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 glass rounded-lg">
                <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Tidak ada agenda pada bulan ini.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Upcoming Events */}
          <div>
            <Card className="glass sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Agenda Mendatang</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-l-2 border-primary pl-4">
                        <Link href={`/agenda/${event.slug}`}>
                          <h4 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                            {event.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(event.start_date)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Tidak ada agenda mendatang.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
