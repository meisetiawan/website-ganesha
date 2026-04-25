"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  image_url?: string;
  photo_url?: string;
  email?: string;
}

function getDepartmentColor(department: string) {
  const colors: Record<string, string> = {
    MIPA: "bg-blue-100 text-blue-800",
    IPS: "bg-green-100 text-green-800",
    Bahasa: "bg-purple-100 text-purple-800",
    Teknologi: "bg-orange-100 text-orange-800",
    Manajemen: "bg-red-100 text-red-800",
    Pimpinan: "bg-red-100 text-red-800",
    Administrasi: "bg-gray-100 text-gray-800",
    Perpustakaan: "bg-amber-100 text-amber-800",
    Laboratorium: "bg-cyan-100 text-cyan-800",
    Kurikulum: "bg-indigo-100 text-indigo-800",
  };
  return colors[department] || "bg-gray-100 text-gray-800";
}

function PersonCard({
  person,
  showEmail = false,
}: {
  person: StaffMember;
  showEmail?: boolean;
}) {
  const photoUrl = person.image_url || person.photo_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop";
  
  return (
    <Card className="glass overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={photoUrl}
          alt={person.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <Badge className={`mb-2 ${getDepartmentColor(person.department)}`}>
          {person.department}
        </Badge>
        <h3 className="font-semibold text-foreground line-clamp-1">
          {person.name}
        </h3>
        <p className="text-sm text-muted-foreground">{person.position}</p>
        {showEmail && person.email && (
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate">{person.email}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function GuruStaffPage() {
  const [allStaff, setAllStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchStaff() {
      try {
        const res = await fetch("/api/staff?limit=50");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            setAllStaff(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);

  // Filter by search term
  const filteredStaff = allStaff.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate guru and staff based on department field
  // Department format: "Kategori" or "Kategori - Bidang"
  // Guru: department starts with "Guru" or "Pimpinan", or position contains "Guru" or "Kepala"
  // Staff: department starts with "Staff" or doesn't match guru criteria
  const isGuru = (person: StaffMember) => {
    const dept = person.department.toLowerCase();
    const pos = person.position.toLowerCase();
    return (
      dept.startsWith("guru") ||
      dept.startsWith("pimpinan") ||
      dept === "guru" ||
      dept === "pimpinan" ||
      pos.includes("guru") ||
      pos.includes("kepala sekolah") ||
      pos.includes("wakil kepala")
    );
  };
  
  const guru = filteredStaff.filter(isGuru);
  const staff = filteredStaff.filter(person => !isGuru(person));

  if (loading) {
    return (
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-48 mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mb-10"></div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-72 bg-muted rounded-lg"></div>
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
            Guru & Staff
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Tim pendidik dan tenaga kependidikan SMA Negeri 1 Purbalingga
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari guru atau staff..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Total: {guru.length} Guru, {staff.length} Staff
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="guru" className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="guru">Guru ({guru.length})</TabsTrigger>
            <TabsTrigger value="staff">Staff ({staff.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="guru">
            {guru.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {guru.map((person) => (
                  <PersonCard key={person.id} person={person} showEmail />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass rounded-lg">
                <p className="text-muted-foreground">Tidak ada data guru yang ditemukan.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="staff">
            {staff.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {staff.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass rounded-lg">
                <p className="text-muted-foreground">Tidak ada data staff yang ditemukan.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
