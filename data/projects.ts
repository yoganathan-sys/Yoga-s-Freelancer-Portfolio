import { Project } from "@/types";

export const initialProjects: Project[] = [
  {
    id: "p1-ecommerce-platform",
    title: "NexStore — Headless Enterprise Commerce Platform",
    slug: "nexstore-headless-ecommerce",
    short_description:
      "A high-performance headless e-commerce store with server-side rendering, instant search, dynamic cart, and secure checkout integration.",
    full_description:
      "NexStore is a modern headless e-commerce solution engineered for scalability and lightning-fast load times. Built using Next.js App Router, Tailwind CSS, and Supabase PostgreSQL, it features real-time inventory tracking, Stripe payment gateway integration, dynamic filterable product catalogs, and server-side cached API responses. The architecture ensures Sub-second Core Web Vitals, resulting in high conversion rates and effortless store administration.",
    category: "Full-Stack Projects",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Stripe"],
    cover_image: "/images/projects/project-ecommerce.svg",
    live_url: "https://example.com/demo/nexstore",
    github_url: "https://github.com/yoganathan-dev/nexstore-commerce",
    featured: true,
    published: true,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "p2-healthpulse-mobile",
    title: "HealthPulse — Cross-Platform Telehealth & Vitals App",
    slug: "healthpulse-telehealth-mobile",
    short_description:
      "Cross-platform iOS and Android healthcare app facilitating real-time doctor appointments, vitals charting, and encrypted prescription sharing.",
    full_description:
      "HealthPulse is a mobile application developed with React Native and Expo, providing a secure and accessible bridge between patients and clinicians. The application features encrypted consultation messaging, appointment scheduling with calendar synchronization, wearable vitals monitoring graphs, and automated push notifications via Expo EAS. Engineered with strict data privacy considerations and offline-first data caching.",
    category: "Mobile Applications",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "Supabase"],
    cover_image: "/images/projects/project-healthpulse.svg",
    live_url: "https://example.com/demo/healthpulse",
    github_url: "https://github.com/yoganathan-dev/healthpulse-mobile",
    featured: true,
    published: true,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "p3-devflow-collaboration",
    title: "DevFlow — Agile Project Tracking & Sprint Workspace",
    slug: "devflow-agile-workspace",
    short_description:
      "Interactive real-time project management dashboard with Kanban boards, sprint telemetry, and team activity streams.",
    full_description:
      "DevFlow is a full-featured web application designed for agile development squads. It provides drag-and-drop Kanban sprint management, automated burn-down charts, milestone roadmaps, and real-time team notifications powered by Supabase Realtime and PostgreSQL triggers. Clean interface design combined with keyboard shortcuts gives developers a distraction-free productivity environment.",
    category: "Web Applications",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    cover_image: "/images/projects/project-devflow.svg",
    live_url: "https://example.com/demo/devflow",
    github_url: "https://github.com/yoganathan-dev/devflow-workspace",
    featured: true,
    published: true,
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: "p4-fintrack-analytics",
    title: "FinTrack — Wealth Intelligence & Real-Time Portfolio",
    slug: "fintrack-wealth-analytics",
    short_description:
      "Financial intelligence dashboard featuring multi-currency asset tracking, interactive data visualization, and predictive ROI modeling.",
    full_description:
      "FinTrack enables private investors and businesses to monitor multi-asset portfolios in real time. Built with Next.js App Router, Three.js 3D visualizations, and Tailwind CSS, the platform delivers interactive financial charts, automatic dividend tracking, currency conversion, and CSV ledger exports. Robust database indexing guarantees sub-50ms query responses on historical portfolios.",
    category: "Full-Stack Projects",
    technologies: ["Next.js", "TypeScript", "Three.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    cover_image: "/images/projects/project-fintrack.svg",
    live_url: "https://example.com/demo/fintrack",
    github_url: "https://github.com/yoganathan-dev/fintrack-analytics",
    featured: true,
    published: true,
    created_at: new Date(Date.now() - 120 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: "p5-fitpulse-tracker",
    title: "FitPulse — Workout Architect & Nutrition Log",
    slug: "fitpulse-workout-nutrition-app",
    short_description:
      "Native mobile companion for fitness tracking, custom routine builder, barcode food scanning, and community challenges.",
    full_description:
      "FitPulse is an engaging mobile app engineered using React Native and Expo. It allows fitness enthusiasts to design complex workout splits, log sets/reps with an intuitive numeric keypad, track caloric intake, and view weekly progression metrics. Features include local SQLite offline persistence with cloud sync, haptic feedback on PR achievements, and customized sound timers.",
    category: "Mobile Applications",
    technologies: ["React Native", "Expo", "TypeScript", "MySQL", "Node.js"],
    cover_image: "/images/projects/project-fitpulse.svg",
    live_url: "https://example.com/demo/fitpulse",
    github_url: "https://github.com/yoganathan-dev/fitpulse-mobile",
    featured: false,
    published: true,
    created_at: new Date(Date.now() - 150 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
  {
    id: "p6-aurora-design-system",
    title: "Aurora — High-Accessibility SaaS Design System",
    slug: "aurora-saas-design-system",
    short_description:
      "Comprehensive design system with over 60 accessible UI primitives, Figma component library, and interactive documentation.",
    full_description:
      "Aurora is a bespoke design system created to unify web and mobile products across an enterprise SaaS ecosystem. Featuring comprehensive Figma variables, strict WCAG 2.1 AA accessibility compliance, fluid dark/light themes, and interactive React/Tailwind component examples. The documentation site includes live editable code playgrounds and automated token exports.",
    category: "UI/UX Designs",
    technologies: ["Figma", "React", "TypeScript", "Tailwind CSS", "Storybook"],
    cover_image: "/images/projects/project-aurora.svg",
    live_url: "https://example.com/demo/aurora-design",
    github_url: "https://github.com/yoganathan-dev/aurora-design-system",
    featured: false,
    published: true,
    created_at: new Date(Date.now() - 180 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
];
