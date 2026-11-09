"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<void>;
  showIOSGuide: boolean;
  setShowIOSGuide: (show: boolean) => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // 1. Detect Standalone / Installed State
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes("android-app://");
      setIsInstalled(isStandalone);
    };

    checkStandalone();
    window.matchMedia("(display-mode: standalone)").addEventListener("change", checkStandalone);

    // 2. Detect iOS Device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // 3. Listen for Chromium beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 4. Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      console.log("[PWA] Application installed successfully!");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // 5. Register Service Worker in production or localhost
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[PWA] Service Worker registered with scope:", registration.scope);

            // Check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("[PWA] New content is available; please refresh.");
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn("[PWA] Service Worker registration failed:", err);
          });
      });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("[PWA] User accepted the install prompt");
        setIsInstalled(true);
      } else {
        console.log("[PWA] User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // For browsers where beforeinstallprompt already fired or is not supported
      setShowIOSGuide(true);
    }
  }, [deferredPrompt, isIOS]);

  // Installable if not yet installed and (we have the prompt event OR on iOS / mobile Safari)
  const isInstallable = !isInstalled && (deferredPrompt !== null || isIOS);

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        promptInstall,
        showIOSGuide,
        setShowIOSGuide,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error("usePWA must be used within a PWAProvider");
  }
  return context;
}

