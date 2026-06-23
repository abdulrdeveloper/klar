"use client";

import Navigation from "@/app/components/Navigation";
import HeroSection from "@/app/components/HeroSection";
import ChatPreviewSection from "@/app/components/ChatPreviewSection";
import StatsSection from "@/app/components/StatsSection";
import ModelsSection from "@/app/components/ModelsSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import HowItWorksSection from "@/app/components/HowItWorksSection";
import IncludedSection from "@/app/components/IncludedSection";
import FinalCTASection from "@/app/components/FinalCTASection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-white bg-[#0f1015]">
      <Navigation />

      <div className="relative overflow-hidden">
        <div
          className="absolute top-7 right-50 w-72 h-72 rounded-full opacity-25 blur-[120px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(20,95%,55%) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-52 h-52 rounded-full opacity-25 blur-[100px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(20,95%,55%) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <HeroSection />
          <ChatPreviewSection />
          <StatsSection />
          <ModelsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <IncludedSection />
          <FinalCTASection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
