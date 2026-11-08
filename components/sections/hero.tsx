"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Sparkles, FolderGit2 } from "lucide-react";
import { profileConfig } from "@/data/profile";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[#f4f4f5] dark:bg-zinc-950 flex flex-col justify-center items-center px-3 sm:px-6 md:px-8 lg:px-12 pt-24 pb-12 overflow-hidden"
    >
      {/* Outer Container with Generous Margins - Inspired by Gajda Reference Frame */}
      <div className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-zinc-300 dark:border-zinc-800 relative bg-[#000000] min-h-[640px] lg:min-h-[720px] flex flex-col lg:flex-row">
        
        {/* DESKTOP SPLIT: Left Side with Light Grey Background (#D7D7D7) & Diagonal Angle Divider */}
        <div className="relative w-full lg:w-[58%] bg-[#D7D7D7] text-zinc-950 px-6 sm:px-10 md:px-14 py-12 sm:py-16 lg:py-20 flex flex-col justify-between z-10 lg:[clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-xl"
          >
            {/* Small Heading */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm border border-black/10 text-xs font-mono font-semibold tracking-wider uppercase text-zinc-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{profileConfig.heroGreeting}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight text-black uppercase leading-tight">
                {profileConfig.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-bold text-zinc-800 font-sans tracking-tight">
                {profileConfig.title}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-lg font-normal">
              {profileConfig.tagline}
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                asChild
                variant="heroDark"
                size="lg"
                className="font-bold text-sm tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <a href="#portfolio" onClick={scrollToPortfolio} className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-blue-400" />
                  <span>Explore My Work</span>
                </a>
              </Button>

              <Button
                asChild
                variant="heroWhite"
                size="lg"
                className="font-bold text-sm tracking-wide border border-black/15 shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <a href="#contact" onClick={scrollToContact} className="flex items-center gap-2">
                  <span>Let&apos;s Work Together</span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Social Icons on Left Side */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-10 flex items-center gap-4"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 mr-1">
              Connect:
            </span>

            <a
              href={profileConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-full bg-black/10 hover:bg-black text-zinc-900 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-full bg-black/10 hover:bg-[#0077b5] text-zinc-900 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={profileConfig.socialLinks.email}
              aria-label="Email Me Directly"
              className="w-10 h-10 rounded-full bg-black/10 hover:bg-red-600 text-zinc-900 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* DESKTOP SPLIT: Right Side with Pure Black Background (#000000) & Profile Photograph */}
        <div className="relative w-full lg:w-[48%] lg:-ml-[6%] bg-[#000000] min-h-[420px] sm:min-h-[500px] lg:min-h-full flex items-center justify-center p-4 sm:p-8 lg:p-10 z-0 overflow-hidden">
          {/* Subtle Ambient Radial Lighting for Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0,transparent_75%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] aspect-[4/5] flex items-center justify-center"
          >
            {/* Natural Blend Photo Wrapper (No unnatural heavy borders) */}
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden group">
              <Image
                src={profileConfig.avatarUrl}
                alt={`${profileConfig.name} - Professional Full-Stack & Mobile Developer`}
                fill
                priority
                quality={95}
                className="object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 460px"
              />

              {/* Bottom Soft Dissolve Gradient to blend naturally into black canvas */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Subtle Vignette for Natural Contrast Integration */}
              <div
                className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Status Pill on Photograph Base */}
              <div className="absolute bottom-5 left-4 right-4 sm:left-6 sm:right-6 bg-black/85 backdrop-blur-md border border-zinc-700/70 rounded-full px-4 py-2.5 flex items-center justify-between text-xs shadow-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-zinc-100 font-medium font-sans text-xs tracking-wide">
                    Available for Contracts
                  </span>
                </div>
                <span className="text-zinc-400 font-mono text-[11px] hidden sm:inline">
                  Web & Mobile
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="pt-8 flex flex-col items-center">
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors group"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-blue-500 transition-colors" />
        </a>
      </div>
    </section>
  );
}

