"use client";

import { motion } from "framer-motion";
import {
  Youtube,
  ExternalLink,
  Sparkles,
  BookOpen,
  Code2,
  Laptop,
  Layers,
  Play,
} from "lucide-react";
import { youtubeChannelConfig, socialLinks } from "@/data/profile";
import { featuredYouTubeVideos } from "@/data/youtube";
import { Button } from "@/components/ui/button";

const TOPICS = [
  { icon: Code2, label: "Web Development" },
  { icon: Laptop, label: "Programming Concepts" },
  { icon: Layers, label: "Full-Stack Architecture" },
  { icon: BookOpen, label: "Learning Resources" },
];

export function YouTubeCreatorSection() {
  const hasActiveVideos =
    featuredYouTubeVideos.length > 0 &&
    featuredYouTubeVideos.some((v) => v.id && v.id.trim() !== "");

  return (
    <section
      id="content-creator"
      className="py-24 sm:py-32 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900"
    >
      {/* Background Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono font-semibold tracking-widest uppercase text-red-600 dark:text-red-400 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Content Creation & Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase">
            {youtubeChannelConfig.sectionTitle}
          </h2>

          <div className="w-16 h-1 bg-black dark:bg-white mt-4 rounded-full" />

          <p className="mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {youtubeChannelConfig.sectionDescription}
          </p>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Column 1: Channel Overview & Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl"
          >
            <div className="space-y-6">
              {/* Channel Header Pill */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/25 shrink-0">
                  <Youtube className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block">
                    YouTube Channel
                  </span>
                  <h3 className="text-2xl font-black font-heading text-zinc-900 dark:text-white">
                    {youtubeChannelConfig.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {youtubeChannelConfig.handle}
                  </span>
                </div>
              </div>

              {/* Mission Statement */}
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                {youtubeChannelConfig.aboutText}
              </p>

              {/* Focus Topics Badges */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                  Content Pillars:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={topic.label}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        <Icon className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{topic.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons: Visit Channel & Subscribe */}
            <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center gap-3">
              <Button
                asChild
                className="w-full sm:w-auto flex-1 justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-2xl shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 text-sm"
              >
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Subscribe on YouTube</span>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto flex-1 justify-center rounded-2xl border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white font-bold py-3 px-5 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 text-sm text-zinc-900 dark:text-white"
              >
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Channel"
                >
                  <span>Visit Channel</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Column 2: Video Showcase Area (Responsive 16:9) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-xl overflow-hidden relative"
          >
            {/* Subtle Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>Featured Channel Showcase</span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800/60">
                  16:9 Video Canvas
                </span>
              </div>

              {/* 16:9 Responsive Video / Showcase Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex items-center justify-center group">
                {hasActiveVideos ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredYouTubeVideos[0].id}`}
                    title={featuredYouTubeVideos[0].title || "Yoga's Study Zone Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  /* Clean, High-End Channel Video Showcase Banner when awaiting specific video IDs */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
                    {/* Background Radial Rings */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600/15 border border-red-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
                      Yoga&apos;s Study Zone Video Tutorials
                    </h4>

                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-1.5 line-clamp-2">
                      Watch software engineering walkthroughs, modern frontend patterns, and web development explanations.
                    </p>

                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 border border-white/20"
                    >
                      <Youtube className="w-3.5 h-3.5 text-red-500" />
                      <span>Watch On YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Meta Note */}
            <div className="pt-6 mt-6 border-t border-zinc-800 text-xs font-mono text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Free Educational Content Available Worldwide</span>
              </span>

              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 inline-flex items-center gap-1 font-semibold transition-colors"
              >
                <span>youtube.com/@yogasstudyzone</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
