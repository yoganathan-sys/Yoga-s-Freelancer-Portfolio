/**
 * Centralized strongly typed Project Media Manifest
 * Represents the verified local media assets for all client projects
 */

export interface ProjectMediaAsset {
  id: string;
  filename: string;
  publicPath: string;
  caption: string;
  mediaType: "image" | "video";
  displayOrder: number;
}

export interface PortfolioProjectManifest {
  slug: string;
  title: string;
  category: string;
  liveUrl: string;
  clientLocation: string;
  coverImage: string;
  galleryImages: ProjectMediaAsset[];
  videos: ProjectMediaAsset[];
}

export const PORTFOLIO_MEDIA_MANIFEST: Record<string, PortfolioProjectManifest> = {
  "ro-water-website": {
    slug: "ro-water-website",
    title: "RO Water Website",
    category: "Web Application",
    liveUrl: "https://ro-water-rouge.vercel.app/",
    clientLocation: "Tirupattur, Tamil Nadu",
    coverImage: "/projects/client-1/images/client-6.png",
    galleryImages: [
      {
        id: "c1-img-1",
        filename: "client-6.png",
        publicPath: "/projects/client-1/images/client-6.png",
        caption: "RO Water Website live application running on desktop browser (ro-water-rouge.vercel.app)",
        mediaType: "image",
        displayOrder: 1,
      },
      {
        id: "c1-img-2",
        filename: "client.png",
        publicPath: "/projects/client-1/images/client.png",
        caption: "Official First Client Project Celebration Poster — A new milestone in web development journey",
        mediaType: "image",
        displayOrder: 2,
      },
      {
        id: "c1-img-3",
        filename: "client-2.png",
        publicPath: "/projects/client-1/images/client-2.png",
        caption: "On-site delivery & client handover in front of the RO sales & service store",
        mediaType: "image",
        displayOrder: 3,
      },
      {
        id: "c1-img-4",
        filename: "client-3.png",
        publicPath: "/projects/client-1/images/client-3.png",
        caption: "Interactive web platform hero section displaying Clean Water for Healthy Living",
        mediaType: "image",
        displayOrder: 4,
      },
      {
        id: "c1-img-5",
        filename: "client-1.png",
        publicPath: "/projects/client-1/images/client-1.png",
        caption: "Store owner reviewing the commercial RO water system catalog on the laptop",
        mediaType: "image",
        displayOrder: 5,
      },
      {
        id: "c1-img-6",
        filename: "client-4.png",
        publicPath: "/projects/client-1/images/client-4.png",
        caption: "Demonstration of service booking workflow and customer enquiry forms",
        mediaType: "image",
        displayOrder: 6,
      },
      {
        id: "c1-img-7",
        filename: "client-5.png",
        publicPath: "/projects/client-1/images/client-5.png",
        caption: "Client verifying the responsive website design and instant contact integrations",
        mediaType: "image",
        displayOrder: 7,
      },
    ],
    videos: [],
  },
  "medical-shop-website": {
    slug: "medical-shop-website",
    title: "Medical Shop Website",
    category: "Web Application",
    liveUrl: "https://medical-project-wine-one.vercel.app/",
    clientLocation: "Vadugamuthampatti / Kurusilapattu, Tamil Nadu",
    coverImage: "/projects/client-2/images/med-2.png",
    galleryImages: [
      {
        id: "c2-img-1",
        filename: "med-2.png",
        publicPath: "/projects/client-2/images/med-2.png",
        caption: "Medical Shop Website live platform on pharmacy counter (medical-project-wine-one.vercel.app)",
        mediaType: "image",
        displayOrder: 1,
      },
      {
        id: "c2-img-2",
        filename: "med-3.png",
        publicPath: "/projects/client-2/images/med-3.png",
        caption: "About page with owner profile and completed project checklist",
        mediaType: "image",
        displayOrder: 2,
      },
      {
        id: "c2-img-3",
        filename: "med-1.png",
        publicPath: "/projects/client-2/images/med-1.png",
        caption: "Pharmacist client standing at pharmacy dispensing counter",
        mediaType: "image",
        displayOrder: 3,
      },
      {
        id: "c2-img-4",
        filename: "med-10.png",
        publicPath: "/projects/client-2/images/med-10.png",
        caption: "Exterior clinic & medical store sign board",
        mediaType: "image",
        displayOrder: 4,
      },
      {
        id: "c2-img-5",
        filename: "med-7.png",
        publicPath: "/projects/client-2/images/med-7.png",
        caption: "Official project handover ceremony with pharmacist client",
        mediaType: "image",
        displayOrder: 5,
      },
      {
        id: "c2-img-6",
        filename: "med-5.png",
        publicPath: "/projects/client-2/images/med-5.png",
        caption: "Client demonstrating digital prescription enquiry workflow on laptop",
        mediaType: "image",
        displayOrder: 6,
      },
      {
        id: "c2-img-7",
        filename: "med-6.png",
        publicPath: "/projects/client-2/images/med-6.png",
        caption: "Client delivery and team review inside the pharmacy premises",
        mediaType: "image",
        displayOrder: 7,
      },
      {
        id: "c2-img-8",
        filename: "med-4.png",
        publicPath: "/projects/client-2/images/med-4.png",
        caption: "Full pharmacy shopfront perspective with live website running on the front counter",
        mediaType: "image",
        displayOrder: 8,
      },
      {
        id: "c2-img-9",
        filename: "med-8.png",
        publicPath: "/projects/client-2/images/med-8.png",
        caption: "Medicine inventory shelves categorized for digital stock management",
        mediaType: "image",
        displayOrder: 9,
      },
      {
        id: "c2-img-10",
        filename: "med-9.png",
        publicPath: "/projects/client-2/images/med-9.png",
        caption: "Dispensary section with allopathic medicines cataloged in the web app",
        mediaType: "image",
        displayOrder: 10,
      },
    ],
    videos: [
      {
        id: "c2-vid-1",
        filename: "siva-medicals.mp4",
        publicPath: "/projects/client-2/videos/siva-medicals.mp4",
        caption: "Medical Shop Website — Live On-Site Demonstration",
        mediaType: "video",
        displayOrder: 11,
      },
    ],
  },
};

