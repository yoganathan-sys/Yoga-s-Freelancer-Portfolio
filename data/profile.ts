export interface ProfileConfig {
  name: string;
  heroGreeting: string;
  title: string;
  tagline: string;
  shortBio: string;
  fullBio: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  contact: {
    email: string;
    phone?: string;
    location: string;
    availability: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  resumeUrl: string;
  avatarUrl: string;
}

export const profileConfig: ProfileConfig = {
  name: "YOGANATHAN A",
  heroGreeting: "Hi, I'm",
  title: "Full-Stack Developer | Web & Mobile App Developer",
  tagline:
    "I build modern, scalable, responsive digital experiences that help businesses turn ideas into powerful web and mobile applications.",
  shortBio:
    "A dedicated software developer specializing in building modern web applications, cross-platform mobile apps, and robust backend architectures with clean code and high performance.",
  fullBio: {
    paragraph1:
      "I am Yoganathan A, a passionate Full-Stack and Mobile Application Developer focused on crafting high-performance, responsive, and intuitive digital solutions. With expertise spanning modern frontend frameworks, backend architecture, and relational databases, I help businesses and startups translate complex requirements into elegant, dependable software.",
    paragraph2:
      "My approach to solving business problems is anchored in understanding real user needs, architectural simplicity, and long-term maintainability. Whether developing scalable cloud applications with Next.js and Supabase or engineering cross-platform mobile experiences with React Native and Expo, I focus on clean code, security best practices, and performance optimization.",
    paragraph3:
      "My primary objective is building reliable, user-friendly applications that not only provide smooth user experiences but also deliver measurable business value. I continuously evolve my technical stack to stay at the cutting edge of modern software engineering.",
  },
  contact: {
    email: "yoganathan.developer@gmail.com",
    location: "Remote / Available Worldwide",
    availability: "Available for Freelance Projects & Contracts",
  },
  socialLinks: {
    github: "https://github.com/yoganathan-dev",
    linkedin: "https://linkedin.com/in/yoganathan-dev",
    email: "mailto:yoganathan.developer@gmail.com",
  },
  resumeUrl: "/assets/Yoganathan_A_Resume.pdf",
  avatarUrl: "/images/profile-photo.png",
};
