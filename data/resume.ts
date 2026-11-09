export interface ResumeProject {
  title: string;
  technologies: string[];
  points: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  skills: {
    frontend: string[];
    backendAndLanguages: string[];
    databasesAndTools: string[];
    coreCompetencies: string[];
  };
  projects: ResumeProject[];
  education: {
    degree: string;
    field: string;
    status: string;
    coursework: string[];
    focus: string;
  };
  pdfUrl: string;
}

export const resumeData: ResumeData = {
  name: "YOGANATHAN A",
  title: "FRONTEND DEVELOPER | WEB DEVELOPER | B.TECH IT STUDENT",
  contact: {
    email: "yoganathan162008@gmail.com",
    linkedin: "https://www.linkedin.com/in/yoganathana",
    github: "https://github.com/yoganathan-sys",
  },
  summary:
    "Passionate B.Tech Information Technology student specializing in frontend and web development. Experienced in building responsive, accessible, and user-centric web applications using modern web standards. Demonstrated project track record in full-lifecycle interface development, server-side scripting, and cloud database integration. Eager to contribute and grow as a software engineering / frontend intern.",
  skills: {
    frontend: [
      "HTML5 (Semantic)",
      "CSS3 (Flexbox/Grid)",
      "JavaScript (ES6+)",
      "Bootstrap",
      "Responsive UI",
    ],
    backendAndLanguages: [
      "PHP",
      "Python",
      "Flask",
      "C Programming",
      "Relational SQL",
    ],
    databasesAndTools: [
      "Supabase",
      "MySQL",
      "Git",
      "GitHub",
      "REST APIs",
      "Chrome DevTools",
      "Linux/Windows CLI",
    ],
    coreCompetencies: [
      "Mobile-First Design",
      "Cross-Browser Compatibility",
      "Algorithm Analysis (Time/Space)",
    ],
  },
  projects: [
    {
      title: "Yoga's Parking System",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "Supabase"],
      points: [
        "Developed a web-based parking management application to streamline vehicle slot bookings and live space tracking.",
        "Integrated Supabase cloud database for secure record management, automated timestamps, and slot status persistence.",
        "Implemented responsive frontend interfaces with custom CSS layouts for clean mobile and desktop operability.",
      ],
      liveUrl: null,
      githubUrl: "https://github.com/yoganathan-sys",
    },
    {
      title: "Medical Shop Website",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      points: [
        "Engineered a modern storefront UI tailored for pharmacies to showcase healthcare supplies and prescription items.",
        "Utilized Bootstrap grid components and custom CSS transitions to ensure fluid UX across phone, tablet, and desktop.",
        "Structured intuitive product filtering and category navigation using modular vanilla JavaScript DOM scripts.",
      ],
      liveUrl: "https://sri-siva-medicals.vercel.app",
      githubUrl: "https://github.com/yoganathan-sys",
    },
    {
      title: "Code Time & Space Analyzer",
      technologies: ["Python", "Flask", "HTML", "CSS"],
      points: [
        "Built an educational developer tool to profile algorithm execution efficiency and calculate Big-O time and space complexity.",
        "Designed an intuitive Flask web backend parsing algorithmic code inputs and returning comparative benchmark metrics.",
        "Crafted a lightweight, dark-themed dashboard visualizing complexity curves and performance metrics.",
      ],
      liveUrl: null,
      githubUrl: "https://github.com/yoganathan-sys",
    },
  ],
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Information Technology",
    status: "Degree In Progress",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems (DBMS)",
      "Web Technologies",
      "Operating Systems",
      "Computer Networks",
    ],
    focus:
      "Active focus on practical software development, open-source collaboration on GitHub, and modern web application architecture.",
  },
  pdfUrl: "/resume.pdf",
};
