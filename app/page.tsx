import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { SkillsSection } from "@/components/sections/skills";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ProcessSection } from "@/components/sections/process";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage() {
  const publishedProjects = await getPublishedProjects();

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Sticky Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Section A & Hero: Tomasz Gajda Visual Identity with Split-Screen & Angled Divider */}
        <HeroSection />

        {/* Section B: About Me with Interactive 3D Object & Resume Download */}
        <AboutSection />

        {/* Section C: Premium Service Cards */}
        <ServicesSection />

        {/* Section D: Interactive Skills & Technologies Grid */}
        <SkillsSection />

        {/* Section E: Portfolio Showcase with Dynamic Filter & Supabase Data */}
        <PortfolioSection initialProjects={publishedProjects} />

        {/* Section F: 6-Step Structured Work Process Timeline */}
        <ProcessSection />

        {/* Section G: Contact Section with Validated Form & Honeypot */}
        <ContactSection />
      </main>

      {/* Section H: Comprehensive Footer */}
      <Footer />
    </div>
  );
}
