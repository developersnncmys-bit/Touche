"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ────────────────────────────────────────────────────────────────────────────
// QUOTE — HEAVN-style scroll-revealed blockquote, PINNED
//
// Section pins to the top of the viewport while a scrub timeline lights each
// word from low-contrast grey to solid ink, one after another. The eye reads
// the quote at its own pace because the section is held in view for the
// duration of the pin. Attribution + CTA fade up at the end of the reveal.
// ────────────────────────────────────────────────────────────────────────────

const QUOTE =
  "We design interiors with restraint, material honesty and devoted detail — every room a quiet argument for how to live.";

const QUOTE_WORDS = QUOTE.split(" ");

const ATTRIBUTION_NAME = "Apoorva Yadav";
const ATTRIBUTION_ROLE = "Founder, Touché";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const attributionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (words.length === 0) return;

      // Seed every word at very low contrast
      gsap.set(words, { color: "rgba(11, 11, 11, 0.12)" });
      if (attributionRef.current) {
        gsap.set(attributionRef.current, { y: 30, autoAlpha: 0 });
      }

      // PINNED timeline — section locks to viewport while words light up
      // and the attribution settles in. Pin spans ~150% of viewport scroll
      // so the reveal is slow enough to read.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 0 → 0.80: word-by-word reveal (stagger across timeline)
      tl.to(
        words,
        {
          color: "rgba(11, 11, 11, 1)",
          ease: "none",
          stagger: { each: 0.8 / Math.max(words.length, 1), ease: "none" },
          duration: 0.001,
        },
        0
      );

      // 0.85 → 1.0: attribution + CTA settle in once the quote is mostly lit
      if (attributionRef.current) {
        tl.to(
          attributionRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.12,
            ease: "power3.out",
          },
          0.85
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-ink overflow-hidden py-32 md:py-44 lg:py-56 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1500px] mx-auto">
        <blockquote
          className="font-display font-bold tracking-tight leading-[1.08]"
          style={{ fontSize: "clamp(2.25rem, 5.2vw, 4.75rem)" }}
        >
          {/* Opening quote */}
          <span
            ref={(el) => {
              wordsRef.current[0] = el;
            }}
            className="inline-block mr-[0.05em]"
          >
            &ldquo;
          </span>
          {QUOTE_WORDS.map((word, i) => (
            <span
              key={`${word}-${i}`}
              ref={(el) => {
                // offset by 1 because index 0 is the opening quote
                wordsRef.current[i + 1] = el;
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </span>
          ))}
          {/* Closing quote */}
          <span
            ref={(el) => {
              wordsRef.current[QUOTE_WORDS.length + 1] = el;
            }}
            className="inline-block"
          >
            &rdquo;
          </span>
        </blockquote>

        {/* Attribution + CTA — fades up after the quote is mostly revealed */}
        <div
          ref={attributionRef}
          className="mt-14 md:mt-20 lg:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <div>
            <p className="font-display font-medium text-ink text-lg md:text-xl">
              — {ATTRIBUTION_NAME}
            </p>
            <p className="text-sm text-ink/55 mt-1 tracking-wide">
              {ATTRIBUTION_ROLE}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center self-start md:self-end bg-ink text-ivory rounded-full px-9 py-4 text-[12px] tracking-[0.05em] font-medium hover:bg-champagne hover:text-ink transition-colors duration-500"
          >
            Begin an Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
