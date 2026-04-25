"use client";

import { useState, useEffect } from "react";
import { Search, Mail, MailOpen, Trash2, MoreHorizontal, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusBadge(status: string) {
  const badges: Record<string, { label: string; className: string }> = {
    unread: { label: "Belum Dibaca", className: "bg-blue-100 text-blue-800" },
    read: { label: "Sudah Dibaca", className: "bg-gray-100 text-gray-800" },
    replied: { label: "Sudah Dibalas", className: "bg-green-100 text-green-800" },
  };
  const badge = badges[status] || { label: status, className: "bg-gray-100 text-gray-800" };
  return <Badge className={badge.className}>{badge.label}</Badge>;
}

export default function AdminPesanPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let url = "/api/contact?limit=50";
      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMessages(data.data);
      } else if (data.data?.messages && Array.isArray(data.data.messages)) {
        setMessages(data.data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleMarkAsRead = async (message: Message) => {
    setSelectedMessage(message);
    
    // Update status to read if currently unread
    if (message.status === "unread") {
      try {
        const res = await fetch("/api/contact", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: message.id, status: "read" }),
        });
        
        if (res.ok) {
          // Update local state
          setMessages(messages.map(m => 
            m.id === message.id ? { ...m, status: "read" } : m
          ));
        }
      } catch (error) {
        console.error("Error updating message status:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    
    // In real app, would call API to delete
    setMessages(messages.filter(m => m.id !== id));
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    unread: messages.filter(m => m.status === "unread").length,
    read: messages.filter(m => m.status === "read").length,
    replied: messages.filter(m => m.status === "replied").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Pesan Masuk
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola pesan dari pengunjung website
          </p>
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="glass">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-blue-500 p-2 text-white">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.unread}</p>
              <p className="text-xs text-muted-foreground">Belum Dibaca</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-gray-500 p-2 text-white">
              <MailOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.read}</p>
              <p className="text-xs text-muted-foreground">Sudah Dibaca</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-green-500 p-2 text-white">
              <MailOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.replied}</p>
              <p className="text-xs text-muted-foreground">Sudah Dibalas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pesan..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge
                variant={statusFilter === null ? "secondary" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setStatusFilter(null)}
              >
                Semua
              </Badge>
              <Badge 
                variant={statusFilter === "unread" ? "secondary" : "outline"} 
                className="cursor-pointer hover:bg-accent"
                onClick={() => setStatusFilter("unread")}
              >
                Belum Dibaca
              </Badge>
              <Badge 
                variant={statusFilter === "replied" ? "secondary" : "outline"} 
                className="cursor-pointer hover:bg-accent"
                onClick={() => setStatusFilter("replied")}
              >
                Sudah Dibalas
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Daftar Pesan ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada pesan masuk
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Pengirim</TableHead>
                  <TableHead className="w-[35%]">Subjek</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((item) => (
                  <TableRow
                    key={item.id}
                    className={item.status === "unread" ? "bg-primary/5" : ""}
                  >
                    <TableCell>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.email}</div>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-left hover:text-primary transition-colors"
                        onClick={() => handleMarkAsRead(item)}
                      >
                        <div className="font-medium text-foreground line-clamp-1">
                          {item.subject}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {item.message}
                        </div>
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.created_at)}
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
                          <DropdownMenuItem onClick={() => handleMarkAsRead(item)}>
                            <MailOpen className="mr-2 h-4 w-4" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Pengirim</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tanggal</p>
                  <p className="font-medium">{formatDate(selectedMessage.created_at)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telepon</p>
                  <p className="font-medium">{selectedMessage.phone || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Pesan</p>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Tutup
                </Button>
                <Button 
                  className="gradient-primary text-white"
                  onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, '_blank')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Balas via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
