import React from "react";
import { cn } from "@/lib/utils";

interface ResumeSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ResumeSection({
  title,
  icon,
  children,
  className,
}: ResumeSectionProps) {
  return (
    <section className={cn("space-y-4 print:space-y-2", className)}>
      <div className="flex items-center gap-2.5 pb-2 border-b-2 border-zinc-900 dark:border-white print:border-black">
        {icon && <span className="text-blue-600 dark:text-blue-400 print:hidden">{icon}</span>}
        <h2 className="text-lg sm:text-xl font-bold font-heading uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

