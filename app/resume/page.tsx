import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Linkedin,
  Github,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";
import { resumeData } from "@/data/resume";
import { ResumeSection } from "@/components/resume/resume-section";
import { ResumePreview } from "@/components/resume/resume-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Professional Resume | Yoganathan A — Frontend Developer",
  description:
    "Official resume of Yoganathan A, Frontend Developer, Web Developer, and B.Tech Information Technology student. Skills in HTML5, CSS3, JavaScript, PHP, Python, Supabase, and full-lifecycle web development.",
  openGraph: {
    title: "Yoganathan A — Professional Resume",
    description:
      "Frontend Developer | Web Developer | B.Tech IT Student. View online or download PDF.",
  },
};

export default function ResumePage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 py-12 pt-28 sm:py-16 sm:pt-32 print:bg-white print:text-black print:p-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 print:max-w-none print:px-0 print:space-y-4">
          {/* Navigation & Back to Home (Hidden in Print) */}
          <div className="flex items-center justify-between gap-4 print:hidden">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full gap-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <Link href="/#about">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </Link>
            </Button>

            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
              Official Document • Verified Resume
            </span>
          </div>

        {/* PDF Preview & Action Controls Toolbar */}
        <ResumePreview pdfUrl={resumeData.pdfUrl} />

        {/* Structured Resume Document Card */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm space-y-10 print:border-none print:shadow-none print:p-0 print:space-y-6">
          {/* 1. Header / Personal Information */}
          <header className="space-y-3 pb-8 border-b-2 border-zinc-900 dark:border-white print:border-black print:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-zinc-900 dark:text-white print:text-black">
                {resumeData.name}
              </h1>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 print:hidden self-start sm:self-auto">
                B.Tech IT
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold font-mono tracking-wider text-blue-600 dark:text-blue-400 uppercase print:text-zinc-700">
              {resumeData.title}
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-mono print:text-black">
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{resumeData.contact.email}</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700 print:text-zinc-400">•</span>
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/yoganathana</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700 print:text-zinc-400">•</span>
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/yoganathan-sys</span>
              </a>
            </div>
          </header>

          {/* 2. Professional Summary */}
          <ResumeSection
            title="Professional Summary"
            icon={<Sparkles className="w-4 h-4" />}
          >
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed print:text-black">
              {resumeData.summary}
            </p>
          </ResumeSection>

          {/* 3. Technical Skills */}
          <ResumeSection
            title="Technical Skills"
            icon={<Code2 className="w-4 h-4" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
                <h3 className="font-bold font-heading text-zinc-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Frontend Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.skills.frontend.map((skill) => (
                    <Badge key={skill} variant="tech" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
                <h3 className="font-bold font-heading text-zinc-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Backend & Languages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.skills.backendAndLanguages.map((skill) => (
                    <Badge key={skill} variant="tech" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
                <h3 className="font-bold font-heading text-zinc-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Databases & Tools
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.skills.databasesAndTools.map((skill) => (
                    <Badge key={skill} variant="tech" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
                <h3 className="font-bold font-heading text-zinc-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.skills.coreCompetencies.map((skill) => (
                    <Badge key={skill} variant="tech" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ResumeSection>

          {/* 4. Featured Projects (From Resume) */}
          <ResumeSection
            title="Featured Projects"
            icon={<Briefcase className="w-4 h-4" />}
          >
            <div className="space-y-6 print:space-y-4">
              {resumeData.projects.map((proj) => (
                <div
                  key={proj.title}
                  className="space-y-2 p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900 dark:text-white print:text-black">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-mono text-zinc-500">|</span>
                      <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                        {proj.technologies.join(", ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono font-semibold print:hidden">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1"
                        >
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed print:text-black">
                    {proj.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* 5. Education */}
          <ResumeSection
            title="Education"
            icon={<GraduationCap className="w-4 h-4" />}
          >
            <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900 dark:text-white print:text-black">
                    {resumeData.education.degree} in {resumeData.education.field}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 print:text-black">
                  {resumeData.education.status}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-2 leading-relaxed print:text-black">
                <p>
                  <strong className="text-zinc-900 dark:text-white print:text-black">
                    Relevant Coursework:
                  </strong>{" "}
                  {resumeData.education.coursework.join(", ")}.
                </p>
                <p>{resumeData.education.focus}</p>
              </div>
            </div>
          </ResumeSection>
        </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
