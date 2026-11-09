"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Terminal, Code2, ShieldCheck, Sparkles, FileText } from "lucide-react";
import { profileConfig } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { TechGeometricCanvas } from "@/components/3d/tech-geometric";
import { ResumeDownloadButton } from "@/components/resume/resume-download-button";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase">
            About Me
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-4 rounded-full" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Tech Canvas & Core Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Interactive 3D Card */}
            <div className="relative rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 overflow-hidden shadow-xl group">
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Interactive 3D Engine
                </span>
              </div>

              {/* 3D Geometry Canvas */}
              <div className="w-full h-64 sm:h-72 mt-4 flex items-center justify-center">
                <TechGeometricCanvas />
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Drag or hover to rotate</span>
                <span className="text-blue-600 dark:text-blue-400">Three.js / WebGL</span>
              </div>
            </div>

            {/* Quick Principles Banner */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
                <Code2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase tracking-wider">Clean Code</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Modular & strictly typed</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-sans uppercase tracking-wider">Reliability</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Scalable & secure</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editable Bio & Objectives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              <p className="font-medium text-zinc-900 dark:text-white">
                {profileConfig.fullBio.paragraph1}
              </p>
              <p>
                {profileConfig.fullBio.paragraph2}
              </p>
              <p>
                {profileConfig.fullBio.paragraph3}
              </p>
            </div>

            {/* Core Development Focus Checklist */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span>Development Focus & Capabilities:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full-Stack Next.js & Server Actions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>React Native & Expo Mobile Apps</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>PostgreSQL & Supabase Architecture</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>API Engineering & Cloud Deployment</span>
                </div>
              </div>
            </div>

            {/* Resume Integration Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <ResumeDownloadButton
                variant="primary"
                size="lg"
                href={profileConfig.resumeUrl}
              />

              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold tracking-wide rounded-full border-zinc-300 dark:border-zinc-700 hover:scale-105 transition-all gap-2"
              >
                <Link href="/resume">
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="font-semibold tracking-wide rounded-full text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              >
                <a href="#services">
                  <span>Explore Services</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
