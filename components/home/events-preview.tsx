"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
}

function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.toLocaleDateString("id-ID", { month: "short" });
  const endMonth = end.toLocaleDateString("id-ID", { month: "short" });
  const year = start.getFullYear();

  if (startDate === endDate || start.toDateString() === end.toDateString()) {
    return {
      day: startDay.toString(),
      month: startMonth,
      year: year.toString(),
    };
  }

  return {
    day: `${startDay}-${endDay}`,
    month: startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`,
    year: year.toString(),
  };
}

export function EventsPreview() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?limit=4");
        if (res.ok) {
          const data = await res.json();
          // Handle different response formats
          let eventsData: EventItem[] = [];
          if (data.data?.events && Array.isArray(data.data.events)) {
            eventsData = data.data.events;
          } else if (data.events && Array.isArray(data.events)) {
            eventsData = data.events;
          } else if (Array.isArray(data.data)) {
            eventsData = data.data;
          } else if (Array.isArray(data)) {
            eventsData = data;
          }
          setEvents(eventsData.slice(0, 4)); // Only take 4 events
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="h-4 bg-muted rounded w-72 mb-10"></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Agenda Kegiatan
              </h2>
              <p className="mt-2 text-muted-foreground">
                Jadwal kegiatan dan acara penting sekolah
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/agenda">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Events Grid - 2x2 */}
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event, index) => {
            const dateInfo = formatDateRange(event.start_date, event.end_date);

            return (
              <ScrollReveal key={event.id} delay={100 + index * 100} direction="up">
                <Link href={`/agenda/${event.slug}`} className="block">
                  <Card className="glass overflow-hidden group hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Date Badge */}
                      <div className="gradient-primary text-white p-4 flex flex-col items-center justify-center min-w-[90px]">
                        <span className="text-2xl font-bold">{dateInfo.day}</span>
                        <span className="text-sm uppercase">{dateInfo.month}</span>
                        <span className="text-xs opacity-80">{dateInfo.year}</span>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>

                        <div className="mt-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/agenda">
              Lihat Semua Agenda
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
