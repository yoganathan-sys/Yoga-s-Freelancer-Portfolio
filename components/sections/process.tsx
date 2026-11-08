"use client";

import { motion } from "framer-motion";
import {
  Search,
  Compass,
  Code,
  CheckCircle2,
  Rocket,
  Wrench,
  Sparkles,
} from "lucide-react";
import { processSteps, ProcessStep } from "@/data/process";

const PROCESS_ICON_MAP: Record<string, React.ElementType> = {
  Search,
  Compass,
  Code,
  CheckCircle2,
  Rocket,
  Wrench,
};

export function ProcessSection() {
  return (
    <section
      id="process"
      className="py-24 sm:py-32 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase">
            Work Process
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-4 rounded-full" />
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-4">
            A battle-tested 6-step engineering lifecycle designed to eliminate uncertainty and deliver resilient applications on schedule.
          </p>
        </div>

        {/* 6 Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((step: ProcessStep, index: number) => {
            const IconComp = PROCESS_ICON_MAP[step.iconName] || Code;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-black text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold font-heading mb-1 text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 mb-3">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Key Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((deliv, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

