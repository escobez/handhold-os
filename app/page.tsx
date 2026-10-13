import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { JourneyShowcase } from "@/components/journey-showcase";
import { BentoSteps } from "@/components/bento-steps";
import { StatsBanner } from "@/components/stats-banner";
import { QuoteTestimonials } from "@/components/quote-testimonials";
import { FaqAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080A0F] text-[#F3F4F6] selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <JourneyShowcase />
      <StatsBanner />
      <BentoSteps />
      <QuoteTestimonials />
      <FaqAccordion />
      <Footer />
    </main>
  );
}
