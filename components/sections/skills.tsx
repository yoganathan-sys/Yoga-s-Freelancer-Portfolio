"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode,
  Palette,
  Code2,
  FileCheck,
  Atom,
  Cpu,
  Wind,
  Boxes,
  Server,
  Network,
  FileCode2,
  Zap,
  Database,
  ShieldCheck,
  HardDrive,
  Smartphone,
  Flame,
  GitBranch,
  Github,
  Terminal,
  Figma,
  Cloud,
  Sparkles,
} from "lucide-react";
import { skillsData, skillCategories, SkillItem } from "@/data/skills";
import { cn } from "@/lib/utils";

const SKILL_ICON_MAP: Record<string, React.ElementType> = {
  FileCode,
  Palette,
  Code2,
  FileCheck,
  Atom,
  Cpu,
  Wind,
  Boxes,
  Server,
  Network,
  FileCode2,
  Zap,
  Database,
  ShieldCheck,
  HardDrive,
  Smartphone,
  Flame,
  GitBranch,
  Github,
  Terminal,
  Figma,
  Cloud,
};

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-4 rounded-full" />
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-4">
            Production-tested frameworks, database systems, and tooling leveraged to engineer dependable software.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {skillCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 uppercase",
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill: SkillItem) => {
              const IconComp = SKILL_ICON_MAP[skill.iconName] || Code2;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-5 hover:border-blue-500/50 hover:shadow-xl dark:hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-base font-bold font-heading text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Skill Short Description */}
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
