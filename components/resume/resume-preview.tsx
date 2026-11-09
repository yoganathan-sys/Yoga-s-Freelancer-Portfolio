"use client";

import { useState } from "react";
import { ExternalLink, Printer, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDownloadButton } from "@/components/resume/resume-download-button";

interface ResumePreviewProps {
  pdfUrl?: string;
}

export function ResumePreview({ pdfUrl = "/resume.pdf" }: ResumePreviewProps) {
  const [viewMode, setViewMode] = useState<"both" | "pdf" | "interactive">("interactive");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
        {/* View Mode Toggle */}
        <div className="inline-flex rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1">
          <button
            onClick={() => setViewMode("interactive")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "interactive"
                ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Structured View</span>
            </span>
          </button>

          <button
            onClick={() => setViewMode("pdf")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "pdf"
                ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Original PDF Viewer</span>
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <ResumeDownloadButton size="sm" href={pdfUrl} />

          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 border-zinc-300 dark:border-zinc-700 text-xs font-semibold"
          >
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 border-zinc-300 dark:border-zinc-700 text-xs font-semibold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Resume</span>
          </Button>
        </div>
      </div>

      {/* Embedded PDF Viewer Mode */}
      {(viewMode === "pdf" || viewMode === "both") && (
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-900 print:hidden">
          <div className="p-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Embedded Document: /resume.pdf</span>
            <span>Original Single-Page Layout</span>
          </div>
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full h-[700px] md:h-[950px] border-0 bg-white"
            title="Yoganathan A Professional Resume PDF"
          />
        </div>
      )}
    </div>
  );
}
