"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createProjectRecord,
  updateProjectRecord,
  deleteProjectRecord,
} from "@/lib/projects";
import {
  updateMessageStatus,
  deleteContactMessageRecord,
  retryNotificationEmail,
} from "@/lib/messages";
import { InquiryStatus, ProjectCategory } from "@/types";

function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch {
    // In unit testing environments (e.g. Vitest), Next.js static generation store is not present
  }
}

export async function loginAdminAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please provide both email and password." };
  }

  const supabase = createClient();
  if (!supabase) {
    // If Supabase credentials are not yet configured in .env.local, allow local preview if using admin email
    if (email === (process.env.ADMIN_EMAIL || "admin@example.com") && password === "admin123") {
      return { success: true };
    }
    return {
      success: false,
      error: "Supabase authentication is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (or use admin@example.com / admin123 in development preview).",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  safeRevalidate("/admin");
  return { success: true };
}

export async function logoutAdminAction() {
  const supabase = createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  safeRevalidate("/admin");
  return { success: true };
}

export async function saveProjectAction(prevState: any, formData: FormData): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const id = (formData.get("id") as string) || "";
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const short_description = formData.get("short_description") as string;
    const full_description = formData.get("full_description") as string;
    const category = formData.get("category") as ProjectCategory;
    const technologiesRaw = formData.get("technologies") as string;
    const technologies = technologiesRaw
      ? technologiesRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    const cover_image = (formData.get("cover_image") as string) || "/images/projects/project-ecommerce.svg";
    const live_url = (formData.get("live_url") as string) || null;
    const github_url = (formData.get("github_url") as string) || null;
    const featured = formData.get("featured") === "true";
    const published = formData.get("published") === "true";

    if (!title || !short_description || !full_description || !category) {
      return { success: false, error: "Please fill in all required fields." };
    }

    if (id) {
      const res = await updateProjectRecord(id, {
        title,
        slug,
        short_description,
        full_description,
        category: category as any,
        technologies,
        cover_image,
        live_url,
        github_url,
        featured,
        published,
      });
      safeRevalidate("/admin/projects");
      safeRevalidate("/projects/" + slug);
      safeRevalidate("/");
      return { success: res.success, error: res.error };
    } else {
      const res = await createProjectRecord({
        title,
        slug,
        short_description,
        full_description,
        category: category as any,
        technologies,
        cover_image,
        live_url,
        github_url,
        featured,
        published,
      });
      safeRevalidate("/admin/projects");
      safeRevalidate("/");
      return { success: res.success, data: res.data, error: res.error };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to save project." };
  }
}

export async function deleteProjectAction(id: string) {
  const res = await deleteProjectRecord(id);
  safeRevalidate("/admin/projects");
  safeRevalidate("/");
  return res;
}

export async function togglePublishAction(id: string, published: boolean) {
  const res = await updateProjectRecord(id, { published });
  safeRevalidate("/admin/projects");
  safeRevalidate("/");
  return res;
}

export async function updateMessageStatusAction(id: string, status: InquiryStatus) {
  const res = await updateMessageStatus(id, status);
  safeRevalidate("/admin/messages");
  safeRevalidate("/admin");
  return res;
}

export async function deleteMessageAction(id: string) {
  const res = await deleteContactMessageRecord(id);
  safeRevalidate("/admin/messages");
  safeRevalidate("/admin");
  return res;
}

export async function retryNotificationEmailAction(id: string) {
  const res = await retryNotificationEmail(id);
  safeRevalidate("/admin/messages");
  safeRevalidate("/admin");
  return res;
}
