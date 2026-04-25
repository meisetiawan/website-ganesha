"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

interface SiteSettings {
  site_name: string;
  site_description: string;
  address: string;
  phone: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
}

const defaultSettings: SiteSettings = {
  site_name: "SMA Negeri 1 Purbalingga",
  site_description: "Sekolah unggulan dengan prestasi akademik dan non-akademik terbaik di Kabupaten Purbalingga.",
  address: "Jl. Mayjen Sungkono No. 1, Purbalingga, Jawa Tengah 53311",
  phone: "(0281) 891234",
  email: "info@sman1purbalingga.sch.id",
  facebook_url: "#",
  instagram_url: "#",
  youtube_url: "#",
};

const quickLinks = [
  { href: "/profil/sejarah", label: "Sejarah" },
  { href: "/profil/visi-misi", label: "Visi & Misi" },
  { href: "/berita", label: "Berita" },
  { href: "/agenda", label: "Agenda" },
  { href: "/kontak", label: "Hubungi Kami" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          // API returns settings object directly (not wrapped)
          if (data && typeof data === 'object' && !data.error) {
            setSettings({
              site_name: data.site_name || defaultSettings.site_name,
              site_description: data.site_description || defaultSettings.site_description,
              address: data.address || defaultSettings.address,
              phone: data.contact_phone || data.phone || defaultSettings.phone,
              email: data.contact_email || data.email || defaultSettings.email,
              facebook_url: data.facebook_url || defaultSettings.facebook_url,
              instagram_url: data.instagram_url || defaultSettings.instagram_url,
              youtube_url: data.youtube_url || defaultSettings.youtube_url,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const socialLinks = [
    { href: settings.facebook_url, icon: Facebook, label: "Facebook" },
    { href: settings.instagram_url, icon: Instagram, label: "Instagram" },
    { href: settings.youtube_url, icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="gradient-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Logo SMA Negeri 1 Purbalingga"
                width={48}
                height={48}
                className="h-12 w-12 object-contain bg-white/90 rounded-lg p-1"
              />
              <div>
                <p className="font-semibold text-lg leading-tight">
                  SMA Negeri 1
                </p>
                <p className="text-sm text-white/80">Purbalingga</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {settings.site_description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Senin - Jumat: 07.00 - 15.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold">Media Sosial</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium">Jam Operasional</h4>
              <p className="text-sm text-white/80">
                Senin - Kamis: 07.00 - 15.00 WIB
              </p>
              <p className="text-sm text-white/80">Jumat: 07.00 - 11.30 WIB</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/80">
              &copy; {currentYear} {settings.site_name}. All rights reserved.
            </p>
            <p className="text-sm text-white/60">
              Designed with care for Indonesian education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
