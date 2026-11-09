"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";
import { usePWA } from "@/components/pwa/pwa-context";
import { Button } from "@/components/ui/button";

const DISMISS_STORAGE_KEY = "pwa_banner_dismissed_until";

export function InstallBanner() {
  const { isInstalled, promptInstall } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInstalled) {
      setIsVisible(false);
      return;
    }

    const dismissedUntil = localStorage.getItem(DISMISS_STORAGE_KEY);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      setIsVisible(false);
      return;
    }

    // Delay banner appearance slightly so it doesn't obstruct initial page view
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for 7 days
    const nextWeek = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_STORAGE_KEY, nextWeek.toString());
  };

  const handleInstallClick = async () => {
    await promptInstall();
    setIsVisible(false);
  };

  if (!isVisible || isInstalled) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-zinc-900/95 dark:bg-zinc-900/95 text-white border border-zinc-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md"
        role="region"
        aria-label="Install Portfolio Web App"
      >
        <div className="flex items-start gap-3.5">
          {/* YA Icon */}
          <div className="w-11 h-11 rounded-2xl bg-black border border-white/20 flex items-center justify-center font-bold text-white tracking-widest text-base shadow-md shrink-0">
            <span className="font-heading font-black">Y</span>
            <span className="text-blue-500 font-heading font-black">A</span>
          </div>

          <div className="flex-1 pr-6">
            <h4 className="text-sm font-bold font-heading text-white tracking-tight">
              Install Yoganathan&apos;s Portfolio
            </h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Add my developer portfolio to your home screen for quick access.
            </p>

            <div className="mt-3.5 flex items-center gap-2.5">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs px-4 py-2 gap-1.5 shadow-md shadow-blue-600/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install Now</span>
              </Button>

              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white rounded-xl text-xs px-3 py-2"
              >
                Maybe Later
              </Button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

