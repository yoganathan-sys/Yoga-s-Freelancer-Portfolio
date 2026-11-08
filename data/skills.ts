export interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Mobile" | "Tools";
  description: string;
  iconName: string;
  featured?: boolean;
}

export const skillsData: SkillItem[] = [
  // Frontend
  { name: "HTML5", category: "Frontend", description: "Semantic markup & web standards", iconName: "FileCode" },
  { name: "CSS3", category: "Frontend", description: "Modern styling, animations & layouts", iconName: "Palette" },
  { name: "JavaScript", category: "Frontend", description: "Modern ES6+ asynchronous programming", iconName: "Code2" },
  { name: "TypeScript", category: "Frontend", description: "Strict type-safe scalable applications", iconName: "FileCheck", featured: true },
  { name: "React", category: "Frontend", description: "Component-driven reactive UIs & hooks", iconName: "Atom", featured: true },
  { name: "Next.js", category: "Frontend", description: "App router, SSR, SSG & optimization", iconName: "Cpu", featured: true },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first responsive design", iconName: "Wind", featured: true },
  { name: "Bootstrap", category: "Frontend", description: "Grid system & rapid component styling", iconName: "Boxes" },

  // Backend
  { name: "Node.js", category: "Backend", description: "Event-driven JavaScript runtime", iconName: "Server", featured: true },
  { name: "Express.js", category: "Backend", description: "RESTful APIs & middleware architecture", iconName: "Network" },
  { name: "PHP", category: "Backend", description: "Server scripting & backend business logic", iconName: "FileCode2" },
  { name: "Next.js Server Actions", category: "Backend", description: "Type-safe RPC & zero-API endpoints", iconName: "Zap", featured: true },

  // Database
  { name: "PostgreSQL", category: "Database", description: "Advanced relational DB & indexing", iconName: "Database", featured: true },
  { name: "Supabase", category: "Database", description: "Auth, Postgres, Realtime & RLS", iconName: "ShieldCheck", featured: true },
  { name: "MySQL", category: "Database", description: "Relational database design & queries", iconName: "Database" },
  { name: "MariaDB", category: "Database", description: "High-performance open-source SQL", iconName: "HardDrive" },

  // Mobile
  { name: "React Native", category: "Mobile", description: "Native cross-platform mobile apps", iconName: "Smartphone", featured: true },
  { name: "Expo", category: "Mobile", description: "Fast mobile iteration, EAS build & OTA", iconName: "Flame", featured: true },

  // Tools
  { name: "Git", category: "Tools", description: "Distributed version control & branches", iconName: "GitBranch" },
  { name: "GitHub", category: "Tools", description: "Code collaboration, CI/CD & actions", iconName: "Github", featured: true },
  { name: "VS Code", category: "Tools", description: "Custom development environment & tooling", iconName: "Terminal" },
  { name: "Figma", category: "Tools", description: "UI prototyping, wireframes & specs", iconName: "Figma" },
  { name: "Vercel", category: "Tools", description: "Edge hosting, previews & deployments", iconName: "Cloud", featured: true },
];

export const skillCategories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "Tools",
] as const;

