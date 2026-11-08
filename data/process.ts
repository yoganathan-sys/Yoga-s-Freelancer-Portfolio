export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Understand the client's business and requirements.",
    description:
      "Deep dive into project goals, target audience, business model, and technical constraints to establish a crystal-clear scope and milestone roadmap.",
    deliverables: ["Requirement Specification", "User Stories", "Project Scope Document"],
    iconName: "Search",
  },
  {
    step: "02",
    title: "Plan & Design",
    subtitle: "Prepare architecture and user interface designs.",
    description:
      "Architect the database schemas, select the optimal stack, design wireframes, and create modern interactive UI prototypes in Figma.",
    deliverables: ["Interactive Wireframes", "Database Schema", "Architecture Diagram"],
    iconName: "Compass",
  },
  {
    step: "03",
    title: "Develop",
    subtitle: "Build the frontend, backend and database.",
    description:
      "Transform approved designs into clean, modular, and type-safe code across the user interface, server logic, and relational database.",
    deliverables: ["Clean Codebase", "API Integration", "Database Migrations"],
    iconName: "Code",
  },
  {
    step: "04",
    title: "Test",
    subtitle: "Verify functionality, responsiveness, performance and security.",
    description:
      "Comprehensive testing across devices, network speeds, accessibility standards, and unit/integration checkpoints to ensure zero downtime.",
    deliverables: ["Cross-device Testing", "Security Audits", "Performance Optimization"],
    iconName: "CheckCircle2",
  },
  {
    step: "05",
    title: "Deploy",
    subtitle: "Launch the completed application.",
    description:
      "Seamless production deployment to cloud hosting (e.g. Vercel, Supabase), domain verification, SSL configuration, and live monitoring.",
    deliverables: ["Production Deployment", "Custom Domain & SSL", "CI/CD Pipeline"],
    iconName: "Rocket",
  },
  {
    step: "06",
    title: "Maintain",
    subtitle: "Provide improvements and ongoing support.",
    description:
      "Ongoing technical support, performance tracking, regular security patches, and incremental feature enhancements as your business scales.",
    deliverables: ["Performance Monitoring", "Security Updates", "Feature Expansion"],
    iconName: "Wrench",
  },
];
