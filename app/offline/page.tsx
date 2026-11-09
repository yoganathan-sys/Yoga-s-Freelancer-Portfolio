"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WifiOff, RefreshCw, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      window.location.reload();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    if (navigator.onLine) {
      window.location.reload();
    } else {
      setTimeout(() => {
        setIsRetrying(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Monogram */}
      <header className="flex items-center justify-between max-w-4xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center font-bold text-white tracking-widest text-base shadow-sm group-hover:border-white transition-colors">
            <span className="font-heading font-black">Y</span>
            <span className="text-blue-500 font-heading font-black">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wider uppercase text-white">
              Yoganathan
            </span>
            <span className="text-[10px] tracking-widest text-zinc-500 font-mono">
              DEVELOPER
            </span>
          </div>
        </Link>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-red-950/60 border border-red-800 text-red-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Offline Mode</span>
        </span>
      </header>

      {/* Center Offline Card */}
      <main className="max-w-md mx-auto text-center space-y-6 my-auto py-12 relative z-10">
        {/* WifiOff Icon with pulse */}
        <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400 shadow-2xl">
          <WifiOff className="w-10 h-10 text-zinc-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
            You&apos;re Currently Offline
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
            Please check your internet connection. Your portfolio experience will be available again once you&apos;re connected.
          </p>
        </div>

        {/* Note on server requirements */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-left text-xs text-zinc-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            Real-time project inquiries, database submissions, and email notifications require an active connection to ensure dependable delivery.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            variant="heroDark"
            size="lg"
            className="w-full sm:w-auto rounded-2xl justify-center font-bold tracking-wider uppercase text-xs px-8 py-3.5 gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin text-blue-500" : ""}`} />
            <span>{isRetrying ? "Reconnecting..." : "Try Again"}</span>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-2xl justify-center border-zinc-800 text-zinc-300 font-semibold text-xs px-6 py-3.5 gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer info */}
      <footer className="text-center text-xs font-mono text-zinc-600 relative z-10">
        © 2026 YOGANATHAN A • Progressive Web Application
      </footer>
    </div>
  );
}

