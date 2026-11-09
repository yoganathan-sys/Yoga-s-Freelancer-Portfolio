"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, PlusSquare, Compass, CheckCircle2, Smartphone } from "lucide-react";
import { usePWA } from "@/components/pwa/pwa-context";
import { Button } from "@/components/ui/button";

export function IOSInstallDialog() {
  const { showIOSGuide, setShowIOSGuide } = usePWA();

  if (!showIOSGuide) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0"
          onClick={() => setShowIOSGuide(false)}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden text-zinc-900 dark:text-zinc-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-dialog-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black border border-white/20 flex items-center justify-center font-bold text-white tracking-widest text-sm shadow-md">
                <span className="font-heading font-black">Y</span>
                <span className="text-blue-500 font-heading font-black">A</span>
              </div>
              <div>
                <h3 id="ios-dialog-title" className="text-base sm:text-lg font-bold font-heading">
                  Install on Your iPhone
                </h3>
                <span className="text-xs text-zinc-500 font-mono">
                  Safari Web App Guide
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="py-6 space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div className="text-sm">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-500" />
                  <span>Open this website in Safari</span>
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Make sure you are viewing this portfolio in Apple Safari on your iPhone.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div className="text-sm">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-blue-500" />
                  <span>Tap the Share button</span>
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Located at the bottom toolbar (or top bar on iPad) of your Safari browser.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div className="text-sm">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <PlusSquare className="w-4 h-4 text-blue-500" />
                  <span>Select &ldquo;Add to Home Screen&rdquo;</span>
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Scroll down the share sheet actions and tap Add to Home Screen.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">
                4
              </div>
              <div className="text-sm">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Confirm by tapping &ldquo;Add&rdquo;</span>
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Tap &ldquo;Add&rdquo; in the upper-right corner. The YA app icon will appear instantly on your home screen.
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button
              onClick={() => setShowIOSGuide(false)}
              variant="heroDark"
              className="w-full sm:w-auto rounded-xl font-bold text-xs px-6 py-2.5"
            >
              Got It, Thanks!
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

