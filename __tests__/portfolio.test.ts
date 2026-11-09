import { describe, it, expect } from "vitest";
import { profileConfig } from "@/data/profile";
import { servicesData } from "@/data/services";
import { skillsData, skillCategories } from "@/data/skills";
import { initialProjects } from "@/data/projects";
import { processSteps } from "@/data/process";
import { slugify, formatDate } from "@/lib/utils";

describe("Profile Configuration", () => {
  it("should have correct personal name and title", () => {
    expect(profileConfig.name).toBe("YOGANATHAN A");
    expect(profileConfig.heroGreeting).toBe("Hi, I'm");
    expect(profileConfig.title).toContain("Full-Stack Developer");
    expect(profileConfig.contact.email).toBe("yoganathan162008@gmail.com");
    expect(profileConfig.contact.phone).toBe("+91 90252 81363");
    expect(profileConfig.contact.whatsappUrl).toContain("wa.me/919025281363");
    expect(profileConfig.contact.locationMapUrl).toBe("https://maps.app.goo.gl/tpTi2YUs5Q9t15F67");
    expect(profileConfig.socialLinks.github).toBe("https://github.com/yoganathan-sys");
    expect(profileConfig.socialLinks.linkedin).toBe("https://www.linkedin.com/in/yoganathana");
  });

  it("should have resumeUrl configured", () => {
    expect(profileConfig.resumeUrl).toBe("/assets/Yoganathan_A_Resume.pdf");
  });
});

describe("Services Data", () => {
  it("should contain exactly 6 core services", () => {
    expect(servicesData).toHaveLength(6);
  });

  it("should cover Web, Mobile, Full-Stack, UI/UX, Database, and Deployment", () => {
    const titles = servicesData.map((s) => s.title);
    expect(titles).toContain("Web Development");
    expect(titles).toContain("Mobile App Development");
    expect(titles).toContain("Full-Stack Development");
    expect(titles).toContain("UI/UX Development");
    expect(titles).toContain("Database Development");
    expect(titles).toContain("Deployment & Maintenance");
  });

  it("each service should have features defined", () => {
    servicesData.forEach((service) => {
      expect(service.features.length).toBeGreaterThanOrEqual(4);
    });
  });
});

describe("Skills & Categorization", () => {
  it("should include all required categories", () => {
    expect(skillCategories).toContain("Frontend");
    expect(skillCategories).toContain("Backend");
    expect(skillCategories).toContain("Database");
    expect(skillCategories).toContain("Mobile");
    expect(skillCategories).toContain("Tools");
  });

  it("should include key technologies", () => {
    const skillNames = skillsData.map((s) => s.name);
    expect(skillNames).toContain("Next.js");
    expect(skillNames).toContain("TypeScript");
    expect(skillNames).toContain("React Native");
    expect(skillNames).toContain("Supabase");
    expect(skillNames).toContain("PostgreSQL");
  });
});

describe("Projects Data", () => {
  it("should contain exactly two verified client projects with complete media and slugs", () => {
    expect(initialProjects).toHaveLength(2);
    initialProjects.forEach((proj) => {
      expect(proj.title).toBeDefined();
      expect(proj.slug).toBeDefined();
      expect(proj.short_description).toBeDefined();
      expect(proj.full_description).toBeDefined();
      expect(proj.technologies.length).toBeGreaterThan(0);
      expect(proj.cover_image).toBeDefined();
      expect(proj.gallery?.length).toBeGreaterThanOrEqual(7);
    });

    // Verify client 1 has R-Tech Pure Water details
    expect(initialProjects[0].slug).toBe("r-tech-pure-water");
    expect(initialProjects[0].video).toBeNull();
    expect(initialProjects[0].cover_image).toBe("/projects/client-1/images/client-6.png");

    // Verify client 2 has Sri Siva Medicals details and video
    expect(initialProjects[1].slug).toBe("sri-siva-medicals");
    expect(initialProjects[1].video).toBeDefined();
    expect(initialProjects[1].video?.src).toBe("/projects/client-2/videos/siva-medicals.mp4");
  });
});

describe("Process Steps", () => {
  it("should contain all 6 sequential work steps", () => {
    expect(processSteps).toHaveLength(6);
    expect(processSteps[0].title).toBe("Discover");
    expect(processSteps[1].title).toBe("Plan & Design");
    expect(processSteps[2].title).toBe("Develop");
    expect(processSteps[3].title).toBe("Test");
    expect(processSteps[4].title).toBe("Deploy");
    expect(processSteps[5].title).toBe("Maintain");
  });
});

describe("Utility Functions", () => {
  it("slugify should create clean kebab-case url slugs", () => {
    expect(slugify("Hello World Project 2026")).toBe("hello-world-project-2026");
    expect(slugify("React Native & Expo App")).toBe("react-native-expo-app");
  });

  it("formatDate should format ISO dates into human readable strings", () => {
    const dateStr = "2026-05-15T12:00:00.000Z";
    const formatted = formatDate(dateStr);
    expect(formatted).toContain("2026");
    expect(formatted).toContain("May");
  });
});
