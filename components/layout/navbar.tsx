"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallButton } from "@/components/pwa/install-button";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  name: string;
  href: string;
  isPage?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/#home" },
  { name: "About Me", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Skills", href: "/#skills" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Resume", href: "/resume", isPage: true },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (pathname === "/") {
        const sections = ["home", "about", "services", "skills", "portfolio", "process", "contact"];
        const scrollPos = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    setMobileMenuOpen(false);

    if (link.isPage) {
      // Normal navigation to /resume
      return;
    }

    if (pathname === "/") {
      e.preventDefault();
      const hash = link.href.replace("/#", "");
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isResumeActive = pathname === "/resume";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled || pathname !== "/"
          ? "bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Top Left */}
          <Link
            href="/#home"
            className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-105"
          >
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center font-bold text-white tracking-widest text-base shadow-sm group-hover:border-white transition-colors">
              <span className="font-heading font-black">Y</span>
              <span className="text-blue-500 font-heading font-black">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-wider uppercase text-zinc-900 dark:text-white">
                Yoganathan
              </span>
              <span className="text-[10px] tracking-widest text-zinc-500 font-mono">
                DEVELOPER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-zinc-900/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-800/50">
            {NAV_LINKS.map((link) => {
              const isActive = link.isPage
                ? isResumeActive
                : pathname === "/" && activeSection === link.href.replace("/#", "");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-200",
                    isActive
                      ? "text-white bg-zinc-800"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* White rounded "CONTACT ME" button (as in Gajda reference) + PWA Install */}
          <div className="hidden sm:flex items-center gap-3">
            <InstallButton variant="nav" />
            <Button
              asChild
              variant="heroWhite"
              size="pill"
              className="text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-white/20 group"
            >
              <Link href="/#contact" className="flex items-center gap-1.5">
                <span>CONTACT ME</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              asChild
              variant="heroWhite"
              size="sm"
              className="rounded-full text-[11px] font-bold px-3 py-1 sm:hidden"
            >
              <Link href="/#contact">
                CONTACT
              </Link>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 pt-4 pb-8 transition-all animate-in slide-in-from-top">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = link.isPage
                ? isResumeActive
                : pathname === "/" && activeSection === link.href.replace("/#", "");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={cn(
                    "flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-zinc-800 mt-2 space-y-2.5">
              <InstallButton variant="mobile" />
              <Button
                asChild
                variant="heroWhite"
                className="w-full justify-center rounded-xl font-bold uppercase tracking-wider py-3"
              >
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACT ME
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
