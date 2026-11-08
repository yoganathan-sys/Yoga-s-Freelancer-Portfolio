import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { initialProjects } from "@/data/projects";
import { Project, ProjectInput } from "@/types";

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    if (!supabase) {
      return initialProjects.filter((p) => p.published);
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return initialProjects.filter((p) => p.published);
    }

    return data as Project[];
  } catch (err) {
    console.warn("Failed to fetch projects from Supabase, using local fallback:", err);
    return initialProjects.filter((p) => p.published);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return data as Project;
      }
    }
  } catch (err) {
    console.warn("Supabase lookup failed for slug, falling back to local:", err);
  }

  const fallback = initialProjects.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      return initialProjects;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return initialProjects;
    }

    return data as Project[];
  } catch (err) {
    console.warn("Failed to fetch admin projects:", err);
    return initialProjects;
  }
}

export async function createProjectRecord(project: ProjectInput): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      return { success: false, error: "Database connection not configured. Check your Supabase environment variables." };
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Project };
  } catch (err: any) {
    return { success: false, error: err?.message || "Unexpected error creating project." };
  }
}

export async function updateProjectRecord(id: string, updates: Partial<ProjectInput>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      return { success: false, error: "Database connection not configured." };
    }

    const { error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Unexpected error updating project." };
  }
}

export async function deleteProjectRecord(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      return { success: false, error: "Database connection not configured." };
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Unexpected error deleting project." };
  }
}
