"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ────────────────────────────────────────────────────────────────────────────
// ENQUIRY CTA — pinned, centred, dark, word-by-word scrub reveal
//
// Section starts white, fades to black on pin engage, then every word in the
// headline + body progressively lights up from dim ivory to full ivory as
// the user scrolls — HEAVN-style. Eyebrow + CTA animate separately.
// ────────────────────────────────────────────────────────────────────────────

const HEADLINE_LINE1 = "Have a space";
const HEADLINE_LINE2 = "in mind?";
const BODY =
  "We take on a limited number of projects each year. Tell us about your home, business or development — we'll respond within two working days.";

const LINE1_WORDS = HEADLINE_LINE1.split(" ");
const LINE2_WORDS = HEADLINE_LINE2.split(" ");
const BODY_WORDS = BODY.split(" ");

const DIM = "rgba(245, 239, 230, 0.15)";
const FULL = "rgba(245, 239, 230, 1)";

export default function EnquiryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const darkWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineWordsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const bodyWordsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headlineWords = headlineWordsRef.current.filter(
        Boolean
      ) as HTMLSpanElement[];
      const bodyWords = bodyWordsRef.current.filter(Boolean) as HTMLSpanElement[];

      // Initial state
      if (darkWrapRef.current)
        gsap.set(darkWrapRef.current, { autoAlpha: 0 });
      gsap.set(eyebrowRef.current, { autoAlpha: 0, y: 16 });
      gsap.set([...headlineWords, ...bodyWords], { color: DIM });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 20, scale: 0.94 });

      // Pinned reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 0.00 → 0.10 : dark world fades in (white → black)
      if (darkWrapRef.current) {
        tl.to(
          darkWrapRef.current,
          { autoAlpha: 1, duration: 0.10, ease: "power2.inOut" },
          0
        );
      }

      // 0.12 → 0.18 : eyebrow fades in
      tl.to(
        eyebrowRef.current,
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.06 },
        0.12
      );

      // 0.20 → 0.78 : word-by-word scrub reveal across headline + body
      const allWords = [...headlineWords, ...bodyWords];
      tl.to(
        allWords,
        {
          color: FULL,
          ease: "none",
          duration: 0.001,
          stagger: {
            each: 0.58 / Math.max(allWords.length, 1),
            ease: "none",
          },
        },
        0.20
      );

      // 0.85 → 0.95 : CTA pops in
      tl.to(
        ctaRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.6)",
          duration: 0.10,
        },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-dark="true"
      className="relative w-full bg-white overflow-hidden"
    >
      <div
        ref={stageRef}
        className="relative h-screen overflow-hidden bg-white"
      >
        {/* Dark world — fades in on pin engage */}
        <div
          ref={darkWrapRef}
          className="absolute inset-0"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-black" aria-hidden="true" />

          {/* Centred content */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="w-full max-w-3xl mx-auto text-center">
              <p
                ref={eyebrowRef}
                className="text-[11px] tracking-luxe uppercase text-ivory mb-7 md:mb-9"
              >
                A new project
              </p>

              <h2
                className="font-display tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                aria-label={`${HEADLINE_LINE1} ${HEADLINE_LINE2}`}
              >
                <span className="block">
                  {LINE1_WORDS.map((word, i) => (
                    <span
                      key={`l1-${i}`}
                      ref={(el) => {
                        headlineWordsRef.current[i] = el;
                      }}
                      className="inline-block mr-[0.25em] font-semibold"
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <span className="block mt-1">
                  {LINE2_WORDS.map((word, i) => (
                    <span
                      key={`l2-${i}`}
                      ref={(el) => {
                        headlineWordsRef.current[LINE1_WORDS.length + i] = el;
                      }}
                      className="inline-block mr-[0.25em] italic font-normal"
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </h2>

              <p
                className="text-sm md:text-base mt-8 md:mt-10 max-w-lg mx-auto leading-[1.7]"
                aria-label={BODY}
              >
                {BODY_WORDS.map((word, i) => (
                  <span
                    key={`b-${i}`}
                    ref={(el) => {
                      bodyWordsRef.current[i] = el;
                    }}
                    className="inline-block mr-[0.22em]"
                  >
                    {word}
                  </span>
                ))}
              </p>

              <Link
                ref={ctaRef}
                href="/contact"
                className="inline-flex items-center gap-3 mt-9 md:mt-11 px-9 py-4 bg-ivory text-ink rounded-full text-[12px] tracking-luxe uppercase font-semibold hover:bg-champagne hover:text-ink transition-colors duration-500"
              >
                Begin an Enquiry
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
