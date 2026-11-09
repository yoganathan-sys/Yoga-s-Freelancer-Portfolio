"use client";

import { useRef, useState } from "react";
import { Play, Video, Volume2 } from "lucide-react";
import { ProjectVideo } from "@/types";

interface ProjectVideoPlayerProps {
  video: ProjectVideo;
}

export function ProjectVideoPlayer({ video }: ProjectVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="space-y-6 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      {/* Video Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
          <Video className="w-4 h-4" />
          <span>Project Demonstration Video</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading">
          {video.title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Watch the authentic on-site demonstration and walk-through recorded during the real-world deployment.
        </p>
      </div>

      {/* Responsive Video Container */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-2xl max-w-4xl mx-auto group">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={video.poster}
          className="w-full h-auto max-h-[580px] object-contain mx-auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={video.src} type={video.type || "video/mp4"} />
          Your browser does not support the video tag.
        </video>

        {/* Custom Initial Play Overlay if paused */}
        {!isPlaying && (
          <button
            onClick={handlePlayToggle}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200 focus:outline-none pointer-events-auto"
            aria-label="Play Demonstration Video"
          >
            <Play className="w-8 h-8 fill-white ml-1" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 font-mono max-w-4xl mx-auto px-2">
        <span className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Native HTML5 Video with Full Screen, Play/Pause & Volume controls</span>
        </span>
        <span>Original format: MP4</span>
      </div>
    </section>
  );
}

