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
    phone: string;
    phoneRaw: string;
    whatsapp: string;
    whatsappUrl: string;
    location: string;
    locationMapUrl: string;
    availability: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    youtube: string;
    email: string;
    phone: string;
    whatsapp: string;
    twitter?: string;
  };
  resumeUrl: string;
  avatarUrl: string;
}

const WHATSAPP_NUMBER = "919025281363";
const WHATSAPP_PREFILLED_MESSAGE = encodeURIComponent(
  "Hello Yoganathan! I visited your portfolio and would like to discuss a development project."
);

/**
 * Centralized social media & external link configuration
 * Use throughout components to maintain consistency and single source of truth.
 */
export const socialLinks = {
  github: "https://github.com/yoganathan-sys",
  linkedin: "https://www.linkedin.com/in/yoganathana",
  youtube: "https://www.youtube.com/@yogasstudyzone",
  email: "mailto:yoganathan162008@gmail.com",
  phone: "tel:+919025281363",
  whatsapp: "https://wa.me/919025281363",
  whatsappPrefilled: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MESSAGE}`,
};

/**
 * Dedicated YouTube channel details
 */
export const youtubeChannelConfig = {
  name: "Yoga's Study Zone",
  url: "https://www.youtube.com/@yogasstudyzone",
  platform: "YouTube",
  handle: "@yogasstudyzone",
  aboutText:
    "Alongside software development, I create educational technology content through my YouTube channel, Yoga's Study Zone, where I share programming concepts, web development tutorials and learning resources.",
  sectionTitle: "Beyond Development — Sharing Knowledge",
  sectionDescription:
    "Technology becomes more powerful when knowledge is shared. Through Yoga's Study Zone, I create educational content covering programming, web development and technology concepts to help learners grow.",
};

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
    email: "yoganathan162008@gmail.com",
    phone: "+91 90252 81363",
    phoneRaw: "+919025281363",
    whatsapp: "+91 90252 81363",
    whatsappUrl: socialLinks.whatsappPrefilled,
    location: "Remote / Available Worldwide",
    locationMapUrl: "https://maps.app.goo.gl/tpTi2YUs5Q9t15F67",
    availability: "Available for Freelance Projects & Contracts",
  },
  socialLinks: {
    github: socialLinks.github,
    linkedin: socialLinks.linkedin,
    youtube: socialLinks.youtube,
    email: socialLinks.email,
    phone: socialLinks.phone,
    whatsapp: socialLinks.whatsappPrefilled,
  },
  resumeUrl: "/resume.pdf",
  avatarUrl: "/images/profile-photo.png",
};
