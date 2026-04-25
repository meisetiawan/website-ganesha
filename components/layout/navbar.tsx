"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const profileLinks = [
  { href: "/profil/sejarah", label: "Sejarah" },
  { href: "/profil/visi-misi", label: "Visi & Misi" },
  { href: "/profil/guru-staff", label: "Guru & Staff" },
];

const mainLinks = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/agenda", label: "Agenda" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Logo SMA Negeri 1 Purbalingga"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div className="hidden sm:block">
                <p className="font-semibold text-foreground leading-tight">
                  SMA Negeri 1
                </p>
                <p className="text-xs text-muted-foreground">Purbalingga</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              <Link
                href="/"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Beranda
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none">
                  Profil
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {profileLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="w-full cursor-pointer">
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/berita"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Berita
              </Link>

              <Link
                href="/agenda"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Agenda
              </Link>

              <Link
                href="/kontak"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Kontak
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button asChild variant="outline" size="sm">
                <a href="https://elearning.sma1purbalingga.sch.id" target="_blank" rel="noopener noreferrer">Elsmansa</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background",
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </Link>

            {/* Profile dropdown for mobile */}
            <div>
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                Profil
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    profileDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  profileDropdownOpen ? "max-h-48" : "max-h-0"
                )}
              >
                {profileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md py-2 pl-6 pr-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4">
              <Button asChild className="w-full" variant="outline">
                <a href="https://elearning.sma1purbalingga.sch.id" target="_blank" rel="noopener noreferrer">Elsmansa</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
