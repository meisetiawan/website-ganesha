"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link_url?: string;
  link_text?: string;
}

// Default slides as fallback
const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Selamat Datang di SMA Negeri 1 Purbalingga",
    subtitle:
      "Mencetak generasi unggul, berkarakter, dan siap bersaing di era global",
    image_url:
      "https://dokumentasi-kegiatan.sgp1.cdn.digitaloceanspaces.com/website-ganesha/slider/gedunglobi.webp",
    link_url: "/profil/sejarah",
    link_text: "Pelajari Lebih Lanjut",
  },
];

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch sliders from API
  useEffect(() => {
    async function fetchSliders() {
      try {
        const res = await fetch("/api/sliders");
        if (res.ok) {
          const data = await res.json();
          // Handle array response directly
          if (Array.isArray(data) && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
        // Keep default slides on error
      }
    }
    fetchSliders();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, slides.length, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, slides.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [goToNext, slides.length]);

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image */}
          <Image
            src={slide.image_url}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Content */}
          <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1
                className={cn(
                  "text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-700 delay-100",
                  index === currentIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  "mt-4 text-pretty text-lg text-white/90 sm:text-xl transition-all duration-700 delay-200",
                  index === currentIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
              >
                {slide.subtitle}
              </p>
              {slide.link_url && (
                <div
                  className={cn(
                    "mt-8 transition-all duration-700 delay-300",
                    index === currentIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                >
                  <Button
                    asChild
                    size="lg"
                    className="gradient-accent text-white hover:opacity-90"
                  >
                    <Link href={slide.link_url}>
                      {slide.link_text || "Selengkapnya"}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-all hover:bg-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-all hover:bg-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots - only show if more than 1 slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
