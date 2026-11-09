export type ProjectCategory =
  | "All Projects"
  | "All"
  | "Web Applications"
  | "Web Application"
  | "Mobile Applications"
  | "Full-Stack Projects"
  | "UI/UX Designs";

export interface ProjectMediaItem {
  id: string;
  originalFileName: string;
  mediaType: "image" | "video";
  projectFolder: string;
  publicAssetPath: string;
  caption: string;
  displayOrder: number;
}

export interface ProjectVideo {
  src: string;
  type: string;
  title: string;
  poster?: string;
  duration?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: "Web Applications" | "Web Application" | "Mobile Applications" | "Full-Stack Projects" | "UI/UX Designs";
  technologies: string[];
  cover_image: string;
  live_url?: string | null;
  github_url?: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  client_name?: string;
  client_location?: string;
  gallery?: ProjectMediaItem[];
  video?: ProjectVideo | null;
  manifest?: ProjectMediaItem[];
}

export type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at">;

export type InquiryStatus = "unread" | "read" | "replied" | "archived";

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  project_type: string;
  budget_range?: string | null;
  project_description: string;
  status: InquiryStatus;
  created_at: string;
}

export interface AdminUser {
  user_id: string;
  created_at: string;
}

export interface DashboardMetrics {
  totalProjects: number;
  publishedProjects: number;
  totalInquiries: number;
  unreadInquiries: number;
}
