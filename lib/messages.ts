import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ContactMessage, DashboardMetrics, InquiryStatus } from "@/types";
import { initialProjects } from "@/data/projects";

// In-memory fallback message store for local development when Supabase is not yet connected
let fallbackMessages: ContactMessage[] = [
  {
    id: "mock-msg-1",
    full_name: "Sarah Jenkins",
    email: "sarah.j@techstartup.io",
    project_type: "Full-Stack Application",
    budget_range: "$5k - $10k",
    project_description:
      "Looking to build a multi-tenant client portal with real-time analytics and Supabase backend. Loved your portfolio!",
    status: "unread",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "mock-msg-2",
    full_name: "Marcus Vance",
    email: "m.vance@retailflow.com",
    project_type: "Mobile Application",
    budget_range: "$3k - $5k",
    project_description:
      "Need a React Native / Expo application for retail inventory scanning and warehouse management. Need fast turnaround.",
    status: "read",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
];

export async function submitContactMessage(params: {
  fullName: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  projectDescription: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();

    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert([
        {
          full_name: params.fullName,
          email: params.email,
          project_type: params.projectType,
          budget_range: params.budgetRange || null,
          project_description: params.projectDescription,
          status: "unread",
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
      }
    } else {
      // Store in memory for local testing
      fallbackMessages.unshift({
        id: `local-msg-${Date.now()}`,
        full_name: params.fullName,
        email: params.email,
        project_type: params.projectType,
        budget_range: params.budgetRange || null,
        project_description: params.projectDescription,
        status: "unread",
        created_at: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: "Thank you! Your message has been received. I will review your project details and get back to you shortly.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "An unexpected error occurred while sending your message. Please try again.",
    };
  }
}

export async function getContactMessagesAdmin(): Promise<ContactMessage[]> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      return fallbackMessages;
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return fallbackMessages;
    }

    return data as ContactMessage[];
  } catch (err) {
    console.warn("Error fetching contact messages:", err);
    return fallbackMessages;
  }
}

export async function updateMessageStatus(id: string, status: InquiryStatus): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      const target = fallbackMessages.find((m) => m.id === id);
      if (target) target.status = status;
      return { success: true };
    }

    const { error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update status." };
  }
}

export async function deleteContactMessageRecord(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      fallbackMessages = fallbackMessages.filter((m) => m.id !== id);
      return { success: true };
    }

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete message." };
  }
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const supabase = createClient() || createAdminClient();
    if (!supabase) {
      return {
        totalProjects: initialProjects.length,
        publishedProjects: initialProjects.filter((p) => p.published).length,
        totalInquiries: fallbackMessages.length,
        unreadInquiries: fallbackMessages.filter((m) => m.status === "unread").length,
      };
    }

    const [projectsRes, inquiriesRes] = await Promise.all([
      supabase.from("projects").select("id, published"),
      supabase.from("contact_messages").select("id, status"),
    ]);

    const projects = projectsRes.data || [];
    const inquiries = inquiriesRes.data || [];

    return {
      totalProjects: projects.length,
      publishedProjects: projects.filter((p: any) => p.published).length,
      totalInquiries: inquiries.length,
      unreadInquiries: inquiries.filter((i: any) => i.status === "unread").length,
    };
  } catch (err) {
    return {
      totalProjects: initialProjects.length,
      publishedProjects: initialProjects.filter((p) => p.published).length,
      totalInquiries: fallbackMessages.length,
      unreadInquiries: fallbackMessages.filter((m) => m.status === "unread").length,
    };
  }
}

