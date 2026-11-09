"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeDownloadButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function ResumeDownloadButton({
  className,
  variant = "primary",
  size = "md",
  href = "/resume.pdf",
}: ResumeDownloadButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-8 py-3.5 text-sm sm:text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black shadow-md hover:shadow-xl",
    secondary:
      "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white border border-zinc-200 dark:border-zinc-700",
    outline:
      "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700",
    white:
      "bg-white hover:bg-zinc-100 text-black shadow-md hover:shadow-xl border border-zinc-200",
  }[variant];

  return (
    <a
      href={href}
      download="Yoganathan_A_Resume.pdf"
      className={cn(
        "group inline-flex items-center justify-center font-bold font-sans tracking-wide rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer",
        sizeClasses,
        variantClasses,
        className
      )}
      aria-label="Download Resume"
    >
      <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
      <span>Download Resume</span>
    </a>
  );
}
