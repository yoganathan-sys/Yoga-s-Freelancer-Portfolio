"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { profileConfig } from "@/data/profile";
import { Button } from "@/components/ui/button";

const FOOTER_NAV = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-zinc-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-zinc-800/80">
          {/* Brand & Introduction */}
          <div className="md:col-span-5 space-y-4">
            <Link href="#home" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-white tracking-widest text-base group-hover:border-white transition-colors">
                <span className="font-heading font-black">Y</span>
                <span className="text-blue-500 font-heading font-black">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm tracking-wider uppercase text-white">
                  {profileConfig.name}
                </span>
                <span className="text-[10px] tracking-widest text-zinc-400 font-mono">
                  FULL-STACK & MOBILE
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {profileConfig.shortBio}
            </p>

            <div className="pt-2">
              <span className="text-xs font-mono text-zinc-500 block mb-1">
                Direct Contact:
              </span>
              <a
                href={profileConfig.socialLinks.email}
                className="text-sm font-semibold text-zinc-200 hover:text-blue-400 transition-colors"
              >
                {profileConfig.contact.email}
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {FOOTER_NAV.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Admin Portal Access */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Connect
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={profileConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={profileConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={profileConfig.socialLinks.email}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/admin"
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors underline-offset-4 hover:underline"
              >
                → Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© {currentYear} {profileConfig.name}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all group"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

