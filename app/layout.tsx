import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Fira_Code } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { profileConfig } from "@/data/profile";
import { PWAProvider } from "@/components/pwa/pwa-context";
import { IOSInstallDialog } from "@/components/pwa/ios-install-dialog";
import { InstallBanner } from "@/components/pwa/install-banner";

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
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yoganathan.dev"),
  title: {
    default: `${profileConfig.name} — ${profileConfig.title}`,
    template: `%s | ${profileConfig.name}`,
  },
  description: profileConfig.tagline,
  applicationName: "Yoganathan A — Developer Portfolio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Yoganathan",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
    "PWA Developer",
  ],
  authors: [{ name: profileConfig.name, url: profileConfig.socialLinks.github }],
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
        <PWAProvider>
          <CustomCursor />
          {children}
          <InstallBanner />
          <IOSInstallDialog />
        </PWAProvider>
      </body>
    </html>
  );
}
