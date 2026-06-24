"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ────────────────────────────────────────────────────────────────────────────
// ENQUIRY CTA — "Have a space in mind?", pinned, LEFT-ALIGNED
//
// Pinned section with brand-aligned typography: big display headline with
// italic taupe accent (matches the Hero / FeaturedProject styling), body
// copy and CTA in a grid below. Left-aligned, no editorial hairlines/eyebrow
// markers — matches the rest of the Touché site's voice.
// ────────────────────────────────────────────────────────────────────────────

export default function EnquiryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hidden initial states
      gsap.set(eyebrowRef.current, { autoAlpha: 0, y: 20 });
      gsap.set([line1Ref.current, line2Ref.current], {
        autoAlpha: 0,
        y: 80,
      });
      gsap.set(bodyRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 24, scale: 0.94 });

      // Pinned reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=110%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        eyebrowRef.current,
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.08 },
        0.05
      )
        .to(
          line1Ref.current,
          { autoAlpha: 1, y: 0, ease: "expo.out", duration: 0.18 },
          0.15
        )
        .to(
          line2Ref.current,
          { autoAlpha: 1, y: 0, ease: "expo.out", duration: 0.20 },
          0.33
        )
        .to(
          bodyRef.current,
          { autoAlpha: 1, y: 0, ease: "power3.out", duration: 0.14 },
          0.60
        )
        .to(
          ctaRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.6)",
            duration: 0.16,
          },
          0.78
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-ink overflow-hidden"
    >
      {/* Pinned stage — viewport-height, left-aligned grid composition */}
      <div
        ref={stageRef}
        className="relative h-screen flex items-center px-6 md:px-12 lg:px-16"
      >
        <div className="w-full max-w-[1500px] mx-auto">
          {/* Eyebrow — no dash marker */}
          <p
            ref={eyebrowRef}
            className="text-[11px] tracking-luxe uppercase text-champagne mb-6 md:mb-8"
          >
            A new project
          </p>

          {/* Massive left-aligned two-line headline */}
          <h2
            className="font-display tracking-tight leading-[0.92] mb-12 md:mb-16 lg:mb-20"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block font-semibold">
                Have a space
              </span>
            </span>
            <span className="block overflow-hidden mt-1 md:mt-2">
              <span
                ref={line2Ref}
                className="block italic font-normal text-taupe"
              >
                in mind?
              </span>
            </span>
          </h2>

          {/* Body + CTA — grid, body left, CTA right on desktop */}
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <p
              ref={bodyRef}
              className="col-span-12 md:col-span-7 lg:col-span-6 text-base md:text-lg text-ink/65 max-w-lg leading-[1.65]"
            >
              We take on a limited number of projects each year. Tell us
              about your home, business or development — we&apos;ll respond
              within two working days.
            </p>
            <div className="col-span-12 md:col-span-5 lg:col-span-6 md:flex md:justify-end">
              <Link
                ref={ctaRef}
                href="/contact"
                className="inline-flex items-center gap-3 self-start px-9 py-4 bg-ink text-ivory rounded-full text-[12px] tracking-luxe uppercase font-semibold hover:bg-champagne hover:text-ink transition-colors duration-500"
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
