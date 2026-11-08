import Link from "next/link";
import {
  FolderKanban,
  CheckCircle,
  Mail,
  BellRing,
  Plus,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { getDashboardMetrics, getContactMessagesAdmin } from "@/lib/messages";
import { getAllProjectsAdmin } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();
  const recentMessages = (await getContactMessagesAdmin()).slice(0, 5);
  const recentProjects = (await getAllProjectsAdmin()).slice(0, 4);

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-3xl font-black font-heading tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time telemetry and management for your portfolio applications and inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="accent" size="sm" className="rounded-xl font-bold">
            <Link href="/admin/projects" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="rounded-xl border-zinc-800">
            <Link href="/" target="_blank" className="flex items-center gap-2">
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Projects */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Total Projects
            </span>
            <h3 className="text-3xl font-black font-heading text-white mt-1">
              {metrics.totalProjects}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        {/* Published Projects */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Published
            </span>
            <h3 className="text-3xl font-black font-heading text-emerald-400 mt-1">
              {metrics.publishedProjects}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Total Inquiries
            </span>
            <h3 className="text-3xl font-black font-heading text-purple-400 mt-1">
              {metrics.totalInquiries}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        {/* Unread Inquiries */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Unread
            </span>
            <h3 className="text-3xl font-black font-heading text-amber-400 mt-1">
              {metrics.unreadInquiries}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <BellRing className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2-Column Split: Recent Inquiries & Published Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-heading text-white">
                Recent Client Inquiries
              </h2>
              <Link
                href="/admin/messages"
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{msg.full_name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          msg.status === "unread"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono">{msg.email}</p>
                    <p className="text-xs text-zinc-300 line-clamp-1 mt-1">
                      {msg.project_description}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
              ))}

              {recentMessages.length === 0 && (
                <p className="text-xs text-zinc-500 py-6 text-center font-mono">
                  No inquiries recorded yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Project Roster Preview */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-heading text-white">
                Active Projects Roster
              </h2>
              <Link
                href="/admin/projects"
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Manage all</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white line-clamp-1">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-mono text-[11px] text-blue-400">{proj.category}</span>
                      <span>•</span>
                      <span>{proj.technologies.slice(0, 3).join(", ")}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      proj.published
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {proj.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
