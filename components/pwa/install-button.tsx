"use client";

import { Download, Smartphone, CheckCircle } from "lucide-react";
import { usePWA } from "@/components/pwa/pwa-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InstallButtonProps {
  variant?: "nav" | "footer" | "mobile";
  className?: string;
}

export function InstallButton({ variant = "nav", className }: InstallButtonProps) {
  const { isInstalled, promptInstall } = usePWA();

  if (isInstalled) {
    if (variant === "footer") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>App Installed</span>
        </span>
      );
    }
    return null;
  }

  if (variant === "footer") {
    return (
      <Button
        onClick={promptInstall}
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-semibold tracking-wider uppercase gap-2 shadow-sm transition-all",
          className
        )}
        aria-label="Install Portfolio Application"
      >
        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
        <span>INSTALL APP</span>
      </Button>
    );
  }

  if (variant === "mobile") {
    return (
      <Button
        onClick={promptInstall}
        variant="default"
        size="sm"
        className={cn(
          "w-full justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 shadow-md gap-2",
          className
        )}
        aria-label="Install Portfolio Application"
      >
        <Download className="w-4 h-4" />
        <span>INSTALL APP</span>
      </Button>
    );
  }

  // Default: nav pill
  return (
    <Button
      onClick={promptInstall}
      variant="outline"
      size="sm"
      className={cn(
        "rounded-full border-zinc-700 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1.5 h-8 gap-1.5 shadow-sm transition-all",
        className
      )}
      aria-label="Install Portfolio Application"
    >
      <Smartphone className="w-3.5 h-3.5 text-blue-400" />
      <span>INSTALL APP</span>
    </Button>
  );
}

