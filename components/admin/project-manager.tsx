"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Github,
  Check,
  X,
  Loader2,
  FolderPlus,
} from "lucide-react";
import { Project, ProjectCategory } from "@/types";
import {
  saveProjectAction,
  deleteProjectAction,
  togglePublishAction,
} from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES: ProjectCategory[] = [
  "Web Applications",
  "Mobile Applications",
  "Full-Stack Projects",
  "UI/UX Designs",
];

interface ProjectManagerProps {
  initialProjects: Project[];
}

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Project) => {
    setEditingProject(p);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleTogglePublish = async (p: Project) => {
    const updated = !p.published;
    setProjects((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, published: updated } : item))
    );
    await togglePublishAction(p.id, updated);
  };

  const handleDelete = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    await deleteProjectAction(id);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await saveProjectAction(null, formData);

    setIsSubmitting(false);

    if (result.success) {
      if (editingProject) {
        // Update local state
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id
              ? {
                  ...p,
                  title: formData.get("title") as string,
                  slug: formData.get("slug") as string,
                  short_description: formData.get("short_description") as string,
                  full_description: formData.get("full_description") as string,
                  category: formData.get("category") as any,
                  technologies: (formData.get("technologies") as string)
                    .split(",")
                    .map((t) => t.trim()),
                  cover_image: (formData.get("cover_image") as string) || p.cover_image,
                  live_url: (formData.get("live_url") as string) || null,
                  github_url: (formData.get("github_url") as string) || null,
                  featured: formData.get("featured") === "true",
                  published: formData.get("published") === "true",
                }
              : p
          )
        );
      } else {
        // Add new to state
        const newProj: Project = {
          id: result.data?.id || `proj-${Date.now()}`,
          title: formData.get("title") as string,
          slug: formData.get("slug") as string,
          short_description: formData.get("short_description") as string,
          full_description: formData.get("full_description") as string,
          category: formData.get("category") as any,
          technologies: (formData.get("technologies") as string)
            .split(",")
            .map((t) => t.trim()),
          cover_image:
            (formData.get("cover_image") as string) ||
            "/images/projects/project-ecommerce.svg",
          live_url: (formData.get("live_url") as string) || null,
          github_url: (formData.get("github_url") as string) || null,
          featured: formData.get("featured") === "true",
          published: formData.get("published") === "true",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProjects((prev) => [newProj, ...prev]);
      }
      handleCloseModal();
    }
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-heading tracking-tight text-white">
            Projects Management
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Create, update, publish, or remove projects displayed across the portfolio.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          variant="accent"
          size="sm"
          className="rounded-xl font-bold gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Button>
      </div>

      {/* Projects Table / Grid */}
      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950/70 border-b border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-4 px-6">Project</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Tech Stack</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-zinc-850/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <h4 className="font-bold text-white font-heading">{proj.title}</h4>
                      <span className="text-xs font-mono text-zinc-500">/{proj.slug}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-blue-400">{proj.category}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-colors ${
                        proj.published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700"
                      }`}
                    >
                      {proj.published ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handleOpenEditModal(proj)}
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                        title="Edit Project"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>

                      <Button
                        onClick={() => setDeleteConfirmId(proj.id)}
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Delete Project?</h3>
            <p className="text-xs text-zinc-400">
              This action cannot be undone. Are you sure you want to permanently delete this project?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                onClick={() => setDeleteConfirmId(null)}
                variant="outline"
                size="sm"
                className="rounded-xl border-zinc-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                variant="destructive"
                size="sm"
                className="rounded-xl"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold font-heading text-white">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input type="hidden" name="id" defaultValue={editingProject?.id || ""} />

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                  Project Title *
                </label>
                <Input
                  name="title"
                  required
                  defaultValue={editingProject?.title || ""}
                  placeholder="e.g. CloudFleet Logistics Suite"
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                    Slug *
                  </label>
                  <Input
                    name="slug"
                    required
                    defaultValue={editingProject?.slug || ""}
                    placeholder="e.g. cloudfleet-logistics"
                    className="bg-zinc-950 border-zinc-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                    Category *
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProject?.category || "Full-Stack Projects"}
                    className="flex h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white shadow-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                  Short Description *
                </label>
                <Input
                  name="short_description"
                  required
                  defaultValue={editingProject?.short_description || ""}
                  placeholder="A concise summary for the card view"
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                  Full Description & Architecture *
                </label>
                <Textarea
                  name="full_description"
                  required
                  rows={4}
                  defaultValue={editingProject?.full_description || ""}
                  placeholder="Detailed breakdown for the dedicated project page..."
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                  Technologies (comma-separated) *
                </label>
                <Input
                  name="technologies"
                  required
                  defaultValue={editingProject?.technologies.join(", ") || "Next.js, TypeScript, Tailwind CSS, Supabase"}
                  placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
                  className="bg-zinc-950 border-zinc-800 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                    Cover Image URL / Path
                  </label>
                  <Input
                    name="cover_image"
                    defaultValue={editingProject?.cover_image || "/images/projects/project-ecommerce.svg"}
                    className="bg-zinc-950 border-zinc-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                    Live Demo URL
                  </label>
                  <Input
                    name="live_url"
                    defaultValue={editingProject?.live_url || ""}
                    placeholder="https://..."
                    className="bg-zinc-950 border-zinc-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-400 mb-1.5">
                  GitHub URL
                </label>
                <Input
                  name="github_url"
                  defaultValue={editingProject?.github_url || ""}
                  placeholder="https://github.com/..."
                  className="bg-zinc-950 border-zinc-800 text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-mono cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    name="featured"
                    value="true"
                    defaultChecked={editingProject?.featured ?? false}
                    className="rounded border-zinc-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-mono cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    name="published"
                    value="true"
                    defaultChecked={editingProject?.published ?? true}
                    className="rounded border-zinc-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Publish to Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-800">
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  variant="outline"
                  className="rounded-xl border-zinc-700"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="accent"
                  className="rounded-xl font-bold gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
