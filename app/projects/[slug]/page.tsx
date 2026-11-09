import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle,
  Calendar,
  Tag,
  ShieldCheck,
  MapPin,
  Building2,
} from "lucide-react";
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectVideoPlayer } from "@/components/projects/project-video-player";

interface ProjectDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found | Yoganathan A",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Yoganathan A Portfolio`,
    description: project.short_description,
    openGraph: {
      title: project.title,
      description: project.short_description,
      images: [
        {
          url: project.cover_image,
          width: 1200,
          height: 800,
          alt: project.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full gap-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
          >
            <Link href="/#portfolio">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-600 text-white shadow-sm">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black shadow-sm">
              VERIFIED CLIENT PROJECT
            </span>
            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 ml-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(project.created_at)}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
            {project.title}
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
            {project.short_description}
          </p>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.live_url && (
              <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-full font-bold shadow-lg gap-2"
              >
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}

            {project.github_url && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full font-bold border-zinc-300 dark:border-zinc-700 gap-2"
              >
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              </Button>
            )}

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-full font-bold gap-2"
            >
              <Link href="/#contact">
                <span>Request Similar Project</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Cover Image Preview */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-900">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>

        {/* Project Technical Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-heading">Project Overview & Architecture</h2>
            <div className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{project.full_description}</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-3 mt-8">
              <div className="flex items-center gap-2 text-sm font-bold font-heading">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Client Delivery Checklist</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Custom UI/UX & Responsive Layouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>One-Click WhatsApp & Call Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Production Deployed & High Uptime</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Real Client Handover Completed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Tech Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              {project.client_name && (
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Client</span>
                  </h3>
                  <p className="text-sm font-semibold">{project.client_name}</p>
                </div>
              )}

              {project.client_location && (
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Location</span>
                  </h3>
                  <p className="text-sm font-semibold">{project.client_location}</p>
                </div>
              )}

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  <span>Technologies Used</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="tech" className="text-xs py-1 px-2.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Category
                </h3>
                <p className="text-sm font-semibold">{project.category}</p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button asChild variant="heroDark" className="w-full justify-center rounded-xl font-bold">
                  <Link href="/#contact">
                    Discuss Your Project
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Demonstration Section (Only when video is available) */}
        {project.video && <ProjectVideoPlayer video={project.video} />}

        {/* Full Image Gallery with Lightbox (Uses all authentic assets) */}
        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery gallery={project.gallery} projectTitle={project.title} />
        )}
      </div>
    </main>
  );
}
