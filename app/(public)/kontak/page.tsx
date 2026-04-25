"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

interface SiteSettings {
  address: string;
  phone: string;
  email: string;
  operational_hours: string;
  maps_embed_url: string;
}

const defaultSettings: SiteSettings = {
  address: "Jl. Mayjen Sungkono No. 1, Purbalingga, Jawa Tengah 53311",
  phone: "(0281) 891234",
  email: "info@sman1purbalingga.sch.id",
  operational_hours: "Senin - Jumat: 07.00 - 15.00 WIB",
  maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.281019171089!2d109.3502213!3d-7.3872267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65584a30a657cb%3A0x2366faf85573fb0d!2sSMA%20Negeri%201%20Purbalingga!5e0!3m2!1sid!2sid!4v1710000000000",
};

export default function KontakPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          // API returns settings object directly (not wrapped)
          if (data && typeof data === 'object' && !data.error) {
            setSettings({
              address: data.address || defaultSettings.address,
              phone: data.contact_phone || data.phone || defaultSettings.phone,
              email: data.contact_email || data.email || defaultSettings.email,
              operational_hours: data.operational_hours || defaultSettings.operational_hours,
              maps_embed_url: data.maps_embed_url || defaultSettings.maps_embed_url,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      content: settings.address,
    },
    {
      icon: Phone,
      title: "Telepon",
      content: settings.phone,
    },
    {
      icon: Mail,
      title: "Email",
      content: settings.email,
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: settings.operational_hours,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(data.error || "Gagal mengirim pesan");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim pesan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Hubungi Kami
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Kami siap membantu Anda. Silakan hubungi kami melalui informasi di
            bawah ini.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <Card key={item.title} className="glass">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-accent text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map */}
            <Card className="glass mt-6 overflow-hidden">
              <div className="aspect-video bg-muted">
                <iframe
                  src={settings.maps_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi SMAN 1 Purbalingga"
                />
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Pesan Terkirim!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Terima kasih telah menghubungi kami. Kami akan segera
                      merespons pesan Anda.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field>
                          <FieldLabel>Nama Lengkap *</FieldLabel>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel>Email *</FieldLabel>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field>
                          <FieldLabel>Nomor Telepon</FieldLabel>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="08xx-xxxx-xxxx"
                          />
                        </Field>
                        <Field>
                          <FieldLabel>Subjek *</FieldLabel>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subjek pesan"
                            required
                          />
                        </Field>
                      </div>

                      <Field>
                        <FieldLabel>Pesan *</FieldLabel>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tulis pesan Anda di sini..."
                          rows={6}
                          required
                        />
                      </Field>

                      <Button
                        type="submit"
                        className="w-full gradient-primary text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                            </span>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </FieldGroup>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
