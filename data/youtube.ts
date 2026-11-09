import { youtubeChannelConfig, socialLinks } from "@/data/profile";

export interface YouTubeVideoItem {
  id: string; // YouTube Video ID (e.g. 11-character string like "dQw4w9WgXcQ")
  title: string;
  description?: string;
  publishedAt?: string;
}

/**
 * Featured video items for the dedicated content creator section.
 * When actual YouTube video IDs are available from Yoga's Study Zone,
 * simply paste them below.
 *
 * If this array is empty (or IDs are empty strings), the portfolio
 * automatically renders the clean interactive channel preview card
 * with "Visit My YouTube Channel" and "Subscribe on YouTube" CTAs,
 * without inserting placeholder or random third-party video IDs.
 */
export const featuredYouTubeVideos: YouTubeVideoItem[] = [
  // Example: { id: "actual_video_id", title: "Introduction to Next.js 15 & Supabase" }
];

export { youtubeChannelConfig, socialLinks };

