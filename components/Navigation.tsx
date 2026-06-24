"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function Navigation() {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      // Hero is GSAP-pinned for ~1.8 viewports; only surface the floating nav
      // once the user has cleared the second image and is entering the next
      // section.
      setPastHero(window.scrollY > window.innerHeight * 1.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Dark-section detection: when any [data-nav-dark] element is intersecting
  // the navbar's vertical band, switch the bar to light text on dark.
  useEffect(() => {
    const NAV_BAND_HEIGHT = 100; // approximate navbar zone from top
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-dark]")
    );
    if (targets.length === 0) return;

    const check = () => {
      const isDark = targets.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= NAV_BAND_HEIGHT && r.bottom >= 0;
      });
      setDarkMode(isDark);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // On the home page the hero ships its own nav strip,
  // so the floating nav stays out of the way until the user scrolls past it.
  if (isHome && !pastHero) return null;

  return (
    <>
      {/* Desktop — brand pill left, centred links, CTA pill right.
          Inverts colours when over a [data-nav-dark] section. */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hidden lg:block backdrop-blur-md transition-colors duration-500 ${
          darkMode
            ? "bg-black/40 border-b border-ivory/10"
            : "bg-ivory/20 border-b border-ink/5"
        }`}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-8 xl:px-12 py-3"
        >
          {/* Brand wordmark — elegant italic */}
          <Link
            href="/"
            aria-label="Touché — Home"
            className="group inline-flex items-baseline"
          >
            <span
              className={`font-display italic font-medium text-[26px] xl:text-[28px] leading-none tracking-[-0.01em] group-hover:text-champagne transition-colors duration-500 ${
                darkMode ? "text-ivory" : "text-ink"
              }`}
            >
              Touché
            </span>
          </Link>

          {/* Centre links */}
          <nav className="flex items-center justify-center gap-8 xl:gap-10">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[13px] font-medium transition-colors duration-500 ${
                    active
                      ? "text-champagne"
                      : darkMode
                      ? "text-ivory/80 hover:text-champagne"
                      : "text-ink/80 hover:text-champagne"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA pill — inverts on dark sections (white pill / dark text) */}
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 rounded-full pl-5 xl:pl-6 pr-1.5 xl:pr-2 py-1.5 text-[13px] font-medium transition-colors duration-500 ${
              darkMode
                ? "bg-ivory text-ink hover:bg-champagne"
                : "bg-ink text-ivory hover:bg-cocoa"
            }`}
          >
            <span className="whitespace-nowrap">Begin Enquiry</span>
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-500 ${
                darkMode ? "bg-ink text-ivory" : "bg-ivory text-ink"
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </motion.div>
      </header>

      {/* Mobile / tablet — brand pill left, hamburger right. Inverts on dark. */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden backdrop-blur-md transition-colors duration-500 ${
          darkMode
            ? "bg-black/40 border-b border-ivory/10"
            : "bg-ivory/20 border-b border-ink/5"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            aria-label="Touché — Home"
            className={`inline-flex items-center gap-2 rounded-full border pl-1.5 pr-4 py-1.5 transition-colors duration-500 ${
              darkMode
                ? "border-ivory/15 bg-black/30"
                : "border-ink/15 bg-ivory/60"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-display font-black text-[14px] leading-none transition-colors duration-500 ${
                darkMode ? "bg-ivory text-ink" : "bg-ink text-ivory"
              }`}
            >
              T
            </span>
            <span
              className={`font-display font-black uppercase text-[14px] leading-none tracking-[0.16em] transition-colors duration-500 ${
                darkMode ? "text-ivory" : "text-ink"
              }`}
            >
              Touché
            </span>
          </Link>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-[5px] w-9 h-9 items-end justify-center"
          >
            <span
              className={`h-px transition-all duration-500 ease-luxe ${
                darkMode ? "bg-ivory" : "bg-ink"
              } ${menuOpen ? "w-6 rotate-45 translate-y-[3px]" : "w-6"}`}
            />
            <span
              className={`h-px transition-all duration-500 ease-luxe ${
                darkMode ? "bg-ivory" : "bg-ink"
              } ${menuOpen ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4"}`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay (mobile + tablet) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 bg-cocoa text-ivory flex flex-col lg:hidden"
          >
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-20">
              <ul className="space-y-5 md:space-y-7">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-ivory/10 pb-5"
                  >
                    <Link href={l.href} className="flex items-baseline gap-6 group">
                      <span className="text-[10px] tracking-luxe text-champagne/80">
                        0{i + 1}
                      </span>
                      <span className="font-display text-5xl md:text-7xl tracking-tight group-hover:text-champagne transition-colors duration-500">
                        {l.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="px-6 md:px-12 py-8 border-t border-ivory/10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="eyebrow text-champagne mb-2">Studio</p>
                <p className="text-sm text-ivory/70 max-w-xs">
                  Indiranagar, Bangalore<br />Karnataka, India
                </p>
              </div>
              <div>
                <p className="eyebrow text-champagne mb-2">Contact</p>
                <p className="text-sm text-ivory/70">
                  hello@touche.studio<br />+91 99005 66466
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
