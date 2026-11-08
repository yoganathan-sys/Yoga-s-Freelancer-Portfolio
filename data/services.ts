export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    description:
      "Crafting high-speed, modern websites and complex web applications built for scale, search visibility, and maximum user engagement.",
    iconName: "Globe",
    features: [
      "Business websites",
      "E-commerce applications",
      "Custom web applications",
      "Responsive websites",
    ],
  },
  {
    id: "mobile-development",
    number: "02",
    title: "Mobile App Development",
    description:
      "Developing seamless native and cross-platform mobile experiences that run smoothly on iOS and Android devices.",
    iconName: "Smartphone",
    features: [
      "Android applications",
      "iOS applications",
      "Cross-platform applications",
      "Mobile UI/UX",
    ],
  },
  {
    id: "fullstack-development",
    number: "03",
    title: "Full-Stack Development",
    description:
      "End-to-end software development combining modern frontend architectures with resilient, secure, and high-throughput server backends.",
    iconName: "Layers",
    features: [
      "Frontend architecture",
      "Backend development",
      "Database integration",
      "API development",
    ],
  },
  {
    id: "ui-ux-development",
    number: "04",
    title: "UI/UX Development",
    description:
      "Transforming complex product workflows into clean, accessible, and delightful interfaces with fluid motion and design consistency.",
    iconName: "Layout",
    features: [
      "Modern interfaces",
      "Responsive layouts",
      "Interactive components",
      "User-friendly experiences",
    ],
  },
  {
    id: "database-development",
    number: "05",
    title: "Database Development",
    description:
      "Designing relational schemas, setting up secure row-level access control, and tuning queries for maximum speed and data integrity.",
    iconName: "Database",
    features: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Database optimization",
    ],
  },
  {
    id: "deployment-maintenance",
    number: "06",
    title: "Deployment & Maintenance",
    description:
      "Managing production deployments, custom domains, continuous integration, monitoring, and proactive software maintenance.",
    iconName: "Server",
    features: [
      "Vercel deployment",
      "Hosting configuration",
      "Domain integration",
      "Application maintenance",
    ],
  },
];

