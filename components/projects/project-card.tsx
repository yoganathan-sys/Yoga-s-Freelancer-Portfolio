"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Images, MapPin } from "lucide-react";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Project Cover Image */}
      <div className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden">
        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
          />
        </Link>

        {/* Category Badge Overlay */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/85 backdrop-blur-md text-white border border-white/10 shadow-md">
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-600 text-white shadow-md uppercase tracking-wider">
              REAL CLIENT PROJECT
            </span>
          </div>
        )}
      </div>

      {/* Project Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Client Location Badge if available */}
          {project.client_location && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono mb-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{project.client_location}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
            {project.short_description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-[11px] text-zinc-500 self-center font-mono pl-1">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Card Actions: Live Website & Project Gallery */}
        <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          {project.live_url && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 rounded-xl font-bold text-xs tracking-wider uppercase bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all group/live h-10"
            >
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live Website for ${project.title}`}
                className="flex items-center justify-center gap-1.5"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
              </a>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 rounded-xl font-semibold text-xs tracking-wider uppercase border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 group/gallery h-10"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center justify-center gap-1.5"
            >
              <Images className="w-3.5 h-3.5 text-zinc-500 group-hover/gallery:text-blue-500" />
              <span>Project Gallery</span>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
