"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, MoreHorizontal, CalendarDays, MapPin, RefreshCw } from "lucide-react";
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

interface EventItem {
  id: number;
  title: string;
  slug: string;
  description?: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  is_published: number;
}



function formatDate(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (startDate === endDate) {
    return start.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return `${start.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - ${end.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`;
}

function getStatusBadge(status: string) {
  if (status === "published") {
    return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
  }
  return <Badge variant="secondary">Draft</Badge>;
}

export default function AdminAgendaPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events?admin=true&limit=50");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setEvents(data.data.map((e: EventItem & { start_date: string; end_date: string }) => ({
          ...e,
          start_date: e.start_date?.split("T")[0] || e.start_date,
          end_date: e.end_date?.split("T")[0] || e.end_date,
        })));
      } else if (data.data?.events && Array.isArray(data.data.events)) {
        setEvents(data.data.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (slug: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda ini?")) return;
    
    setEvents(prev => prev.filter(item => item.slug !== slug));
    
    try {
      await fetch(`/api/events/${slug}`, { method: "DELETE" });
    } catch {
      fetchEvents();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Kelola Agenda
          </h1>
          <p className="text-muted-foreground mt-1">
            Tambah, edit, dan hapus agenda kegiatan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={fetchEvents} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button asChild className="gradient-primary text-white">
            <Link href="/admin/agenda/tambah">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Agenda
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
                placeholder="Cari agenda..."
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
          <CardTitle>Daftar Agenda ({filteredEvents.length})</CardTitle>
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
                  <TableHead className="w-[40%]">Kegiatan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium text-foreground line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays className="h-3 w-3" />
                        {formatDate(item.start_date, item.end_date)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/agenda/${item.slug}/edit`}>
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
                {filteredEvents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Tidak ada agenda ditemukan
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
