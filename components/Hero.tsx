"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // GSAP ScrollTrigger pin — plays nicely with Lenis (SmoothScroll already
  // wires lenis.on('scroll', ScrollTrigger.update) for us). The trigger pins
  // the section for `end - start` worth of scroll, then releases cleanly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%", // ≈ 1.8 viewports of scroll runway while pinned
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Timeline beats (units are arbitrary, totals to 1):
      //   0    → 0.40  image 1 holds
      //   0.40 → 0.55  carousel pans to image 2
      //   0.55 → 1.00  image 2 holds (then pin releases into next section)
      tl.to({}, { duration: 0.4 }); // image 1 dwell
      tl.to(
        trackRef.current,
        { xPercent: -50, ease: "power1.inOut", duration: 0.15 },
        0.4
      );
      tl.to({}, { duration: 0.45 }, 0.55); // image 2 dwell

      // Fade out the centered headline + subtitle right before the swap
      gsap.to(textRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=90%",
          scrub: 1,
        },
      });

      // Corner block crossfades the same way
      gsap.to(cornerRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=90%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-espresso"
    >
      {/* Carousel track — two full-viewport slides side by side */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex will-change-transform"
        style={{ width: "200vw" }}
      >
        <div className="relative w-screen h-full shrink-0">
          <Image
            src="/hero/hero1.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative w-screen h-full shrink-0">
          <Image
            src="/hero/hero2.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/30 to-espresso/65" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(31,24,21,0) 0%, rgba(31,24,21,0.18) 60%, rgba(31,24,21,0.55) 100%)",
        }}
      />

      {/* Dark overlay anchored at the navbar — keeps the brand pill, links and
          CTA legible no matter what the carousel is showing */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-56 md:h-64 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.55) 55%, rgba(11,11,11,0) 100%)",
        }}
      />

      {/* Top nav */}
      <div className="absolute top-5 md:top-7 left-0 right-0 z-20 px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 text-ivory">
          <Link
            href="/"
            aria-label="Touché — Home"
            className="group inline-flex items-baseline"
          >
            <span
              className="font-display italic font-medium text-[24px] md:text-[28px] text-ivory leading-none tracking-[-0.01em] group-hover:text-champagne transition-colors duration-500"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}
            >
              Touché
            </span>
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium tracking-[0.02em] text-ivory/85 hover:text-champagne transition-colors duration-500"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="justify-self-end flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-ivory pl-5 md:pl-6 pr-1.5 md:pr-2 py-1.5 md:py-2 text-[12px] md:text-[13px] font-medium hover:bg-cocoa transition-colors duration-500"
            >
              <span className="whitespace-nowrap">Begin Enquiry</span>
              <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-ivory text-ink">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-[5px] w-9 h-9 items-end justify-center"
            >
              <span
                className={`h-px bg-ivory transition-all duration-500 ease-luxe ${
                  menuOpen ? "w-6 rotate-45 translate-y-[3px]" : "w-6"
                }`}
              />
              <span
                className={`h-px bg-ivory transition-all duration-500 ease-luxe ${
                  menuOpen ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Centred overlay content */}
      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12 pt-28 pb-40 md:pb-44 text-ivory will-change-transform"
      >
        <h1
          className="w-full max-w-[1500px] text-center"
          style={{ textShadow: "0 2px 30px rgba(11,11,11,0.55)" }}
        >
          <span className="block overflow-hidden">
            <span
              className="block font-display font-normal uppercase tracking-[0.08em] leading-[1] opacity-0 animate-[fadeUp_1.2s_ease-out_0.7s_forwards]"
              style={{
                fontSize: "clamp(1rem, 5vw, 2.25rem)",
                textShadow: "0 1px 12px rgba(0,0,0,0.4)",
              }}
            >
              The Art of
            </span>
          </span>

          <span className="block overflow-hidden mt-3 md:mt-5">
            <span
              className="block font-display font-bold uppercase tracking-[-0.01em] leading-[0.95] whitespace-nowrap opacity-0 animate-[fadeUp_1.4s_ease-out_0.9s_forwards]"
              style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)" }}
            >
              Considered Living
            </span>
          </span>
        </h1>

        <p
          className="mt-6 md:mt-8 font-script italic text-base md:text-xl lg:text-2xl text-ivory text-center max-w-3xl mx-auto leading-snug opacity-0 animate-[fadeUp_1.4s_ease-out_1.2s_forwards]"
          style={{ textShadow: "0 2px 16px rgba(11,11,11,0.55)" }}
        >
          <span className="text-ivory/80">A studio for </span>
          <span className="font-bold">Residential</span>
          <span className="text-champagne mx-2 not-italic font-normal">|</span>
          <span className="font-bold">Commercial</span>
          <span className="text-champagne mx-2 not-italic font-normal">|</span>
          <span className="font-bold">Turnkey</span>
          <span className="text-ivory/80"> &amp; beyond</span>
        </p>
      </div>

      {/* Bottom-right corner block */}
      <div
        ref={cornerRef}
        className="absolute bottom-8 right-6 md:bottom-10 md:right-12 lg:right-16 z-10 max-w-[320px] md:max-w-[380px] text-ivory opacity-0 animate-[fadeUp_1.4s_ease-out_1.6s_forwards]"
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
      >
        <h3 className="font-display font-medium uppercase text-[16px] tracking-[0.1em] text-ivory whitespace-nowrap mb-2 md:mb-3">
          Luxury Interior Designers · Bangalore
        </h3>
        <p className="text-[14px] text-ivory/80 leading-[1.3] mb-4 font-normal">
          A Bangalore studio shaping residential and commercial interiors
          with restraint, material honesty and a devotion to detail.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/gallery"
            className="text-[10px] tracking-luxe uppercase border-b border-ivory/40 pb-1 hover:border-champagne hover:text-champagne transition-colors duration-500"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="text-[10px] tracking-luxe uppercase border-b border-champagne text-champagne pb-1 hover:opacity-80 transition-opacity duration-500"
          >
            Begin Enquiry →
          </Link>
        </div>
      </div>

      {/* Mobile / tablet full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] bg-cocoa text-ivory flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-6 md:px-10 pt-6">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-display font-black uppercase text-[24px] text-ivory leading-none tracking-[0.08em]"
              >
                Touché
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col gap-[5px] w-9 h-9 items-end justify-center pr-1"
              >
                <span className="h-px bg-ivory w-6 rotate-45 translate-y-[3px]" />
                <span className="h-px bg-ivory w-6 -rotate-45 -translate-y-[3px]" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
              <ul className="space-y-5 md:space-y-7">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-ivory/10 pb-5"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-6 group"
                    >
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
            <div className="px-6 md:px-12 py-8 border-t border-ivory/10">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center rounded-full bg-champagne text-ink px-6 py-2.5 text-[12px] font-semibold tracking-luxe uppercase"
              >
                <span className="whitespace-nowrap">Begin Enquiry</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
