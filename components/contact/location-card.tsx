"use client";

import { useState } from "react";
import { MapPin, ArrowUpRight, Loader2, AlertCircle, ExternalLink, X } from "lucide-react";
import { profileConfig } from "@/data/profile";

const FALLBACK_MAPS_URL =
  profileConfig.contact.locationMapUrl ||
  "https://maps.app.goo.gl/tpTi2YUs5Q9t15F67";

export function LocationCard() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "info" | "success";
    message: string;
  } | null>(null);

  const handleLocationClick = () => {
    setFeedback(null);

    // Section 5: Prevent popup blocker issues by opening a new window synchronously
    // in the direct user gesture event stack before starting asynchronous geolocation.
    let mapWindow: Window | null = null;
    try {
      mapWindow = window.open("about:blank", "_blank");
      if (mapWindow) {
        mapWindow.document.title = "Opening Google Maps...";
      }
    } catch {
      mapWindow = null;
    }

    // Check if Geolocation API is supported in this browser
    if (typeof window === "undefined" || !navigator || !navigator.geolocation) {
      if (mapWindow && !mapWindow.closed) {
        mapWindow.location.href = FALLBACK_MAPS_URL;
      } else {
        const opened = window.open(FALLBACK_MAPS_URL, "_blank", "noopener,noreferrer");
        if (!opened) {
          window.location.href = FALLBACK_MAPS_URL;
        }
      }
      setFeedback({
        type: "info",
        message:
          "Your browser does not support geolocation. Opened the saved Google Maps location instead.",
      });
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetecting(false);
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        if (mapWindow && !mapWindow.closed) {
          mapWindow.location.href = mapsUrl;
        } else {
          const opened = window.open(mapsUrl, "_blank", "noopener,noreferrer");
          if (!opened) {
            window.location.href = mapsUrl;
          }
        }
      },
      (error) => {
        setIsDetecting(false);
        let errorMsg = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg =
              "Location permission denied. Opening the saved Google Maps location instead.";
            // Navigate the open window to the fallback URL
            if (mapWindow && !mapWindow.closed) {
              mapWindow.location.href = FALLBACK_MAPS_URL;
            } else {
              const opened = window.open(
                FALLBACK_MAPS_URL,
                "_blank",
                "noopener,noreferrer"
              );
              if (!opened) {
                window.location.href = FALLBACK_MAPS_URL;
              }
            }
            break;

          case error.POSITION_UNAVAILABLE:
            errorMsg = "Unable to detect your location. Please try again.";
            // Close the blank window since we could not locate
            if (mapWindow && !mapWindow.closed) {
              mapWindow.close();
            }
            break;

          case error.TIMEOUT:
            errorMsg = "Location request timed out. Please try again.";
            if (mapWindow && !mapWindow.closed) {
              mapWindow.close();
            }
            break;

          default:
            errorMsg = "Unable to detect your location. Please try again.";
            if (mapWindow && !mapWindow.closed) {
              mapWindow.close();
            }
            break;
        }

        setFeedback({
          type: "error",
          message: errorMsg,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleLocationClick();
    }
  };

  return (
    <div className="space-y-2">
      {/* Interactive Location Card */}
      <button
        type="button"
        onClick={handleLocationClick}
        onKeyDown={handleKeyDown}
        disabled={isDetecting}
        aria-label="View location on Google Maps: Remote / Available Worldwide"
        aria-busy={isDetecting}
        data-testid="location-card"
        className="group w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 hover:shadow-lg transition-all duration-200 shadow-sm cursor-pointer disabled:cursor-wait text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
            {isDetecting ? (
              <Loader2 className="w-5 h-5 animate-spin text-purple-600 dark:text-purple-400" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-0.5">
                LOCATION
              </span>
              {isDetecting && (
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 animate-pulse">
                  Detecting...
                </span>
              )}
            </div>
            <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors block">
              {isDetecting
                ? "Detecting your location..."
                : profileConfig.contact.location}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDetecting ? (
            <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
          ) : (
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          )}
        </div>
      </button>

      {/* Dynamic Feedback & Working Fallback Google Maps Link */}
      {feedback && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 text-xs font-mono text-purple-900 dark:text-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-purple-600 dark:text-purple-400 mt-0.5" />
            <span>{feedback.message}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-6 sm:pl-0">
            <a
              href={FALLBACK_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-purple-700 dark:text-purple-300 hover:underline"
              aria-label="Open saved Google Maps location"
            >
              <span>Open Saved Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="p-1 rounded-md text-purple-500 hover:text-purple-800 dark:hover:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
