import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ContactMessage, DashboardMetrics, InquiryStatus, NotificationStatus } from "@/types";
import { initialProjects } from "@/data/projects";
import { sendContactNotificationEmail } from "@/lib/email";

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
    notification_status: "sent",
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
    notification_status: "sent",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
];

export async function submitContactMessage(params: {
  fullName: string;
  email: string;
  phone?: string | null;
  projectType: string;
  budgetRange?: string | null;
  projectDescription: string;
}): Promise<{
  success: boolean;
  messageId?: string;
  emailSent?: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const supabase = createClient() || createAdminClient();
    let messageId = `msg-${Date.now()}`;
    const createdAt = new Date().toISOString();

    if (supabase) {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            full_name: params.fullName,
            email: params.email,
            phone: params.phone || null,
            project_type: params.projectType,
            budget_range: params.budgetRange || null,
            project_description: params.projectDescription,
            status: "unread",
            notification_status: "pending",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error, falling back to local memory:", error);
        fallbackMessages.unshift({
          id: messageId,
          full_name: params.fullName,
          email: params.email,
          phone: params.phone || null,
          project_type: params.projectType,
          budget_range: params.budgetRange || null,
          project_description: params.projectDescription,
          status: "unread",
          notification_status: "pending",
          created_at: createdAt,
        });
      } else if (data) {
        messageId = data.id;
      }
    } else {
      // Store in memory for local testing
      fallbackMessages.unshift({
        id: messageId,
        full_name: params.fullName,
        email: params.email,
        phone: params.phone || null,
        project_type: params.projectType,
        budget_range: params.budgetRange || null,
        project_description: params.projectDescription,
        status: "unread",
        notification_status: "pending",
        created_at: createdAt,
      });
    }

    // Step 3: Send automatic notification email through Resend
    const emailResult = await sendContactNotificationEmail({
      inquiryId: messageId,
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      projectType: params.projectType,
      budgetRange: params.budgetRange,
      projectDescription: params.projectDescription,
      createdAt,
    });

    const newNotificationStatus: NotificationStatus = emailResult.success
      ? "sent"
      : "failed";

    // Update notification status in database / fallback memory
    if (supabase) {
      await supabase
        .from("contact_messages")
        .update({
          notification_status: newNotificationStatus,
        })
        .eq("id", messageId);
    } else {
      const target = fallbackMessages.find((m) => m.id === messageId);
      if (target) {
        target.notification_status = newNotificationStatus;
        if (!emailResult.success) {
          target.notification_error = emailResult.error;
        }
      }
    }

    return {
      success: true,
      messageId,
      emailSent: emailResult.success,
      message:
        "Thank you! Your project enquiry has been submitted successfully. I'll get back to you soon.",
    };
  } catch (err: any) {
    console.error("Contact submission exception:", err);
    return {
      success: false,
      error:
        err?.message ||
        "Unable to submit your enquiry. Please try again or contact me directly through WhatsApp.",
    };
  }
}

export async function retryNotificationEmail(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient() || createAdminClient();
    let message: ContactMessage | null = null;

    if (supabase) {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        message = data as ContactMessage;
      }
    }

    if (!message) {
      message = fallbackMessages.find((m) => m.id === id) || null;
    }

    if (!message) {
      return { success: false, error: "Enquiry message not found." };
    }

    const emailResult = await sendContactNotificationEmail({
      inquiryId: message.id,
      fullName: message.full_name,
      email: message.email,
      phone: message.phone || null,
      projectType: message.project_type,
      budgetRange: message.budget_range,
      projectDescription: message.project_description,
      createdAt: message.created_at,
    });

    const newStatus: NotificationStatus = emailResult.success ? "sent" : "failed";

    if (supabase) {
      await supabase
        .from("contact_messages")
        .update({
          notification_status: newStatus,
        })
        .eq("id", id);
    } else {
      const target = fallbackMessages.find((m) => m.id === id);
      if (target) {
        target.notification_status = newStatus;
        target.notification_error = emailResult.error || null;
      }
    }

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || "Failed to deliver email through Resend.",
      };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Unexpected error retrying email delivery.",
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

export async function updateMessageStatus(
  id: string,
  status: InquiryStatus
): Promise<{ success: boolean; error?: string }> {
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

export async function deleteContactMessageRecord(
  id: string
): Promise<{ success: boolean; error?: string }> {
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
