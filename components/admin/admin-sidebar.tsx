"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Users,
  Image,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

const menuItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/berita",
    label: "Berita",
    icon: Newspaper,
  },
  {
    href: "/admin/agenda",
    label: "Agenda",
    icon: CalendarDays,
  },
  {
    href: "/admin/staff",
    label: "Guru & Staff",
    icon: Users,
  },
  {
    href: "/admin/slider",
    label: "Slider",
    icon: Image,
  },
  {
    href: "/admin/pesan",
    label: "Pesan Masuk",
    icon: MessageSquare,
  },
  {
    href: "/admin/pengaturan",
    label: "Pengaturan",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity",
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setIsCollapsed(true)}
      />

      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden flex h-10 w-10 items-center justify-center rounded-lg glass"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:relative lg:z-auto",
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <NextImage
                src="/images/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain bg-white rounded-lg p-0.5"
              />
              <div className="hidden lg:block">
                <p className="font-semibold text-sm leading-tight">Admin Panel</p>
                <p className="text-xs text-sidebar-foreground/70">SMAN 1 Purbalingga</p>
              </div>
            </Link>
          )}
          <button
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    onClick={() => setIsCollapsed(true)}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          {!isCollapsed && admin && (
            <div className="mb-3 px-2">
              <p className="text-sm font-medium truncate">{admin.full_name || admin.username}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">{admin.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isCollapsed && "justify-center px-2"
            )}
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Keluar</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
