import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Fira_Code } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { profileConfig } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yoganathan.dev"),
  title: {
    default: `${profileConfig.name} — ${profileConfig.title}`,
    template: `%s | ${profileConfig.name}`,
  },
  description: profileConfig.tagline,
  keywords: [
    "Yoganathan A",
    "Freelance Full-Stack Developer",
    "Next.js Developer",
    "React Native Developer",
    "Expo App Developer",
    "PostgreSQL",
    "Supabase Expert",
    "Web Application Development",
    "Mobile Application Development",
  ],
  authors: [{ name: profileConfig.name, url: "https://github.com/yoganathan-dev" }],
  creator: profileConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${profileConfig.name} — Senior Full-Stack & Mobile Developer`,
    description: profileConfig.tagline,
    siteName: `${profileConfig.name} Portfolio`,
    images: [
      {
        url: "/images/yoganathan-profile.svg",
        width: 1200,
        height: 630,
        alt: `${profileConfig.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileConfig.name} — Full-Stack Developer`,
    description: profileConfig.tagline,
    images: ["/images/yoganathan-profile.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} ${firaCode.variable} font-sans antialiased bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-blue-600 selection:text-white`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
