import { HeroSlider } from "@/components/home/hero-slider";
import { NewsPreview } from "@/components/home/news-preview";
import { EventsPreview } from "@/components/home/events-preview";
import { StatsSection } from "@/components/home/stats-section";
import { PrincipalWelcome } from "@/components/home/principal-welcome";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <PrincipalWelcome />
      <NewsPreview />
      <EventsPreview />
    </>
  );
}
