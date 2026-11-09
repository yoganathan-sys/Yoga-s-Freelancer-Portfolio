"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Images, AlertCircle } from "lucide-react";
import { ProjectMediaItem } from "@/types";

interface ProjectGalleryProps {
  gallery: ProjectMediaItem[];
  projectTitle: string;
}

export function ProjectGallery({ gallery, projectTitle }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string, url: string) => {
    console.error(`[ProjectGallery Image Error] Failed to load image asset: ${url} (ID: ${id})`);
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % gallery.length);
    }
  }, [lightboxIndex, gallery.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    }
  }, [lightboxIndex, gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, showNext, showPrev]);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const activeItem = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  return (
    <section className="space-y-6 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <Images className="w-4 h-4" />
            <span>Complete Image Gallery ({gallery.length} Photos)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Authentic On-Site & Application Showcase
          </h2>
        </div>
        <p className="text-xs text-zinc-500 font-mono">
          Click any photo for full-screen inspection
        </p>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item, idx) => {
          const isFailed = failedImages[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden">
                {!isFailed ? (
                  <Image
                    src={item.publicAssetPath}
                    alt={item.caption}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={() => handleImageError(item.id, item.publicAssetPath)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-zinc-900 border border-zinc-800 text-zinc-400">
                    <AlertCircle className="w-6 h-6 text-amber-500 mb-1.5" />
                    <span className="text-xs font-mono font-medium text-zinc-300 line-clamp-1">{item.originalFileName}</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5 font-mono">Image preview unavailable</span>
                  </div>
                )}

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/90 text-black shadow-lg scale-90 group-hover:scale-100 transition-transform duration-200">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>

                {/* Index Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-black/70 backdrop-blur-sm text-white border border-white/10">
                    #{idx + 1}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-snug line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>{item.originalFileName}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                    View Full
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between z-10 py-2 border-b border-zinc-800 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600">
                  {lightboxIndex + 1} / {gallery.length}
                </span>
                <span className="text-sm font-semibold text-zinc-300 hidden sm:inline">
                  {projectTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-mono hidden md:inline">
                  Use arrow keys or buttons to navigate
                </span>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Image Viewer */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Active Image */}
              <div className="relative w-full h-full max-w-5xl max-h-[72vh] flex items-center justify-center">
                {!failedImages[activeItem.id] ? (
                  <Image
                    src={activeItem.publicAssetPath}
                    alt={activeItem.caption}
                    fill
                    priority
                    className="object-contain"
                    sizes="100vw"
                    onError={() => handleImageError(activeItem.id, activeItem.publicAssetPath)}
                  />
                ) : (
                  <div className="w-full h-64 max-w-md flex flex-col items-center justify-center p-6 text-center bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400">
                    <AlertCircle className="w-10 h-10 text-amber-500 mb-3" />
                    <span className="text-sm font-bold text-zinc-200">{activeItem.originalFileName}</span>
                    <span className="text-xs text-zinc-500 mt-1 font-mono">Unable to display full-resolution preview</span>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="z-10 py-3 border-t border-zinc-800 text-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm sm:text-base font-medium max-w-3xl mx-auto leading-relaxed">
                {activeItem.caption}
              </p>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                Asset: {activeItem.publicAssetPath} (Original: {activeItem.originalFileName})
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
