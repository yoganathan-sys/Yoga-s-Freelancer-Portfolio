"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { profileConfig } from "@/data/profile";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  projectType: z.string().min(1, "Please select a project type."),
  budgetRange: z.string().optional(),
  projectDescription: z
    .string()
    .min(10, "Please describe your project (minimum 10 characters)."),
  website_honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const PROJECT_TYPE_OPTIONS = [
  "Website Development",
  "Web Application",
  "Mobile Application",
  "Full-Stack Application",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "To be discussed",
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      projectType: "Web Application",
      budgetRange: "$3,000 - $5,000",
      projectDescription: "",
      website_honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("projectType", data.projectType);
      formData.append("budgetRange", data.budgetRange || "");
      formData.append("projectDescription", data.projectDescription);
      formData.append("website_honeypot", data.website_honeypot || "");

      const result = await submitContactAction(null, formData);

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: result.message,
        });
        reset();
      } else {
        setSubmitStatus({
          success: false,
          message: result.message,
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: "Failed to submit form. Please check your network or email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase">
            Have a Project in Mind?
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-4 rounded-full" />
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-4">
            Let&apos;s discuss your idea and turn it into a powerful digital solution.
          </p>
        </div>

        {/* 2-Column Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Info & Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-heading mb-3">
                Let&apos;s talk about your next milestone
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether you need a dedicated full-stack engineer, a brand-new MVP, or architecture consultation, I am ready to help you launch fast and reliably.
              </p>
            </div>

            {/* Direct Details Box */}
            <div className="space-y-4">
              <a
                href={profileConfig.socialLinks.email}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-all shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-0.5">
                    Email Address
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {profileConfig.contact.email}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-0.5">
                    Current Availability
                  </span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    {profileConfig.contact.availability}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-0.5">
                    Location & Timezone
                  </span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    {profileConfig.contact.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                Social Profiles & Repositories
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={profileConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold hover:bg-[#0077b5] hover:text-white transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 shadow-xl">
              {submitStatus?.success ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                    {submitStatus.message}
                  </p>
                  <Button
                    onClick={() => setSubmitStatus(null)}
                    variant="outline"
                    className="rounded-full mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field (hidden from real users for spam deterrence) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_honeypot">Leave blank</label>
                    <input
                      id="website_honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website_honeypot")}
                    />
                  </div>

                  {submitStatus && !submitStatus.success && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitStatus.message}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="e.g. John Doe"
                        {...register("fullName")}
                        className={errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="e.g. john@company.com"
                        {...register("email")}
                        className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Project Type & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        Project Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("projectType")}
                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:focus-visible:ring-zinc-400"
                      >
                        {PROJECT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.projectType.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        Budget Range (Optional)
                      </label>
                      <select
                        {...register("budgetRange")}
                        className="flex h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:focus-visible:ring-zinc-400"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      rows={5}
                      placeholder="Tell me about your product requirements, target timelines, or existing systems..."
                      {...register("projectDescription")}
                      className={errors.projectDescription ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.projectDescription && (
                      <p className="text-xs text-red-500 mt-1.5">
                        {errors.projectDescription.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="heroDark"
                    size="lg"
                    className="w-full justify-center rounded-xl font-bold uppercase tracking-wider py-4 shadow-xl text-sm gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

