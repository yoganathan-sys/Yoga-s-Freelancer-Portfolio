"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

const FILTER_CATEGORIES = ["All Projects", "Web Application"] as const;
type FilterCategory = (typeof FILTER_CATEGORIES)[number];

interface PortfolioSectionProps {
  initialProjects: Project[];
}

export function PortfolioSection({ initialProjects }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All Projects");

  const filtered =
    selectedCategory === "All Projects"
      ? initialProjects
      : initialProjects.filter(
          (p) =>
            p.category === "Web Application" ||
            p.category === "Web Applications" ||
            p.category.includes("Web")
        );

  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Production Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase">
            Portfolio
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-4 rounded-full" />
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
            Authentic, deployed client web applications delivered for local businesses — built with modern architecture, fast load times, and genuine customer impact.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 uppercase",
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105"
                    : "bg-white text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid — Balanced 2-Column Showcase */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 max-w-md mx-auto">
            <Layers className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold">No projects found</h3>
            <p className="text-sm text-zinc-500 mt-1">
              There are currently no projects in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
