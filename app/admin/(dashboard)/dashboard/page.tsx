"use client";

import { Newspaper, CalendarDays, Users, MessageSquare, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

const stats = [
  {
    title: "Total Berita",
    value: "24",
    change: "+3 bulan ini",
    icon: Newspaper,
    color: "bg-blue-500",
  },
  {
    title: "Agenda Aktif",
    value: "8",
    change: "2 minggu ini",
    icon: CalendarDays,
    color: "bg-green-500",
  },
  {
    title: "Guru & Staff",
    value: "89",
    change: "85 guru, 4 staff",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Pesan Masuk",
    value: "12",
    change: "5 belum dibaca",
    icon: MessageSquare,
    color: "bg-orange-500",
  },
];

const recentActivities = [
  {
    action: "Berita baru dipublikasikan",
    title: "Siswa Raih Medali Emas OSN",
    time: "2 jam lalu",
  },
  {
    action: "Agenda ditambahkan",
    title: "Upacara Hari Pendidikan Nasional",
    time: "5 jam lalu",
  },
  {
    action: "Pesan masuk baru",
    title: "Pertanyaan tentang PPDB",
    time: "1 hari lalu",
  },
  {
    action: "Staff diperbarui",
    title: "Data Guru Matematika",
    time: "2 hari lalu",
  },
];

export default function AdminDashboardPage() {
  const { admin } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang kembali, {admin?.full_name || admin?.username}!
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Overview */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Statistik Pengunjung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hari ini</span>
                <span className="font-semibold text-foreground">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Minggu ini</span>
                <span className="font-semibold text-foreground">8,567</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bulan ini</span>
                <span className="font-semibold text-foreground">32,451</span>
              </div>
              <div className="h-32 flex items-center justify-center bg-secondary/30 rounded-lg">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Grafik pengunjung
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg bg-secondary/30"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/admin/berita/tambah"
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <Newspaper className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-foreground">Tambah Berita</span>
            </a>
            <a
              href="/admin/agenda/tambah"
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <CalendarDays className="h-5 w-5 text-green-500" />
              <span className="font-medium text-foreground">Tambah Agenda</span>
            </a>
            <a
              href="/admin/staff/tambah"
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <Users className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-foreground">Tambah Staff</span>
            </a>
            <a
              href="/admin/pesan"
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-foreground">Lihat Pesan</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
