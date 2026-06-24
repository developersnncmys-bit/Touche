"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ───────────────────────────────────────── Data ─────────────────────────────────────────

// HEAVN-style editorial composition: a short story-headline that reads as the
// section's promise, followed by a smaller descriptive sentence. Words and
// photographs interleave so each phrase reads like a single line of typography
// punctuated by images.
type StoryToken =
  | { kind: "word"; text: string; accent?: boolean }
  | { kind: "img"; src: string; alt: string };

// Big hero statement — mirrors HEAVN's "Light [IMG] that feels like sun."
const HERO_HEADLINE: StoryToken[] = [
  { kind: "word", text: "Interiors" },
  { kind: "img", src: "/images/residential.png", alt: "A Touché interior" },
  { kind: "word", text: "that" },
  { kind: "word", text: "feel" },
  { kind: "word", text: "like" },
  { kind: "word", text: "you.", accent: true },
];

// Supporting description — the studio's full positioning statement,
// punctuated mid-sentence by a single project still.
const DESCRIPTION: StoryToken[] = [
  { kind: "word", text: "Touché" },
  { kind: "word", text: "is" },
  { kind: "word", text: "a" },
  { kind: "word", text: "Bangalore" },
  { kind: "word", text: "studio" },
  { kind: "word", text: "shaping" },
  { kind: "word", text: "residential,", accent: true },
  { kind: "word", text: "commercial", accent: true },
  { kind: "word", text: "and", accent: true },
  { kind: "word", text: "turnkey", accent: true },
  { kind: "img", src: "/images/commercial.png", alt: "A Touché commercial interior" },
  { kind: "word", text: "interiors" },
  { kind: "word", text: "—" },
  { kind: "word", text: "every" },
  { kind: "word", text: "room" },
  { kind: "word", text: "tuned" },
  { kind: "word", text: "with" },
  { kind: "word", text: "restraint," },
  { kind: "word", text: "material" },
  { kind: "word", text: "honesty" },
  { kind: "word", text: "and" },
  { kind: "word", text: "devoted" },
  { kind: "word", text: "detail." },
];

type Stat = { value: number; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 7, label: "Years In Practice" },
  { value: 4, label: "Design Categories" },
  { value: 16, label: "Studio Craftspeople" },
];

type Service = {
  num: string;
  category: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  href: string;
};

const services: Service[] = [
  { num: "01", category: "Residential", tag: "Homes", title: "Residential Design", desc: "Private homes shaped around how you live. Rooms that hold their light, their texture, their quiet. Restraint that reads as warmth.", image: "/images/residential.png", href: "/services#residential" },
  { num: "02", category: "Commercial", tag: "Brands", title: "Commercial Interiors", desc: "Retail and hospitality spaces elevated through craft. Surfaces, fixtures, and fittings chosen for quiet authority. Built to wear well and outlive trends.", image: "/images/commercial.png", href: "/services#commercial" },
  { num: "03", category: "Turnkey", tag: "Delivery", title: "Turnkey Execution", desc: "End-to-end delivery, from first sketch to last cushion. We hold the brief, the budget, the trades, and the timeline. One contract, one point of accountability.", image: "/images/turnkey.png", href: "/services#turnkey" },
  { num: "04", category: "Modular", tag: "Joinery", title: "Modular Furniture", desc: "Bespoke joinery built to the millimetre, not the catalogue. Wardrobes, kitchens, and storage fitted to your wall and your daily ritual. Made by craftspeople we've known for years.", image: "/images/modular-furniture.png", href: "/services#modular" },
  { num: "05", category: "Planning", tag: "Strategy", title: "Space Planning", desc: "Spatial choreography rooted in proportion and light. We study how you move and where you pause. The plan becomes a quiet argument for how to live.", image: "/images/space-planning.png", href: "/services#planning" },
  { num: "06", category: "Consultation", tag: "Direction", title: "Consultation", desc: "Studio counsel — a single room, a single drawing, or a master plan. Two hours or two months, with your samples or your half-built shell. Independent advice, considered without compromise.", image: "/images/consultation.png", href: "/services#consultation" },
];

// ───────────────────────────────────────── Component ─────────────────────────────────────────
// Natural flow scrolling — no pin. Each block reveals as it enters view.

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinBlockRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const heroWordsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const heroImgRef = useRef<HTMLSpanElement | null>(null);
  const growImgRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const descWordsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const descImgsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const statsOverlayRef = useRef<HTMLDivElement>(null);
  const statsCellsRef = useRef<Array<HTMLDivElement | null>>([]);
  const statNumbersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const offerTitleRef = useRef<HTMLDivElement>(null);
  const offerDescRef = useRef<HTMLDivElement>(null);
  const offerHeaderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroWords = heroWordsRef.current.filter(Boolean) as HTMLSpanElement[];
      const descWords = descWordsRef.current.filter(Boolean) as HTMLSpanElement[];
      const descImgs = descImgsRef.current.filter(Boolean) as HTMLSpanElement[];

      // Static initial state so nothing flashes before the pinned reveal runs.
      gsap.set(heroWords, { opacity: 0, y: 60 });
      if (heroImgRef.current) {
        gsap.set(heroImgRef.current, { opacity: 0, scale: 0.5, rotate: -6 });
      }
      gsap.set(descWords, { opacity: 0.12, y: 16 });
      gsap.set(descImgs, { opacity: 0, scale: 0.55 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.85, y: 24 });
      gsap.set(statsOverlayRef.current, { opacity: 0, y: 60 });

      // ── Anchor growImg at the inline image's natural position so the room
      // photograph appears to grow FROM the small image next to "Interiors",
      // not pop in at viewport center. Re-measures on ScrollTrigger refresh
      // so resize stays accurate.
      const anchorGrowImg = () => {
        if (
          !heroImgRef.current ||
          !growImgRef.current ||
          !pinBlockRef.current
        )
          return;
        // Briefly clear the inline image's entrance transform so we measure
        // its natural final-state bounding box, then restore initial state.
        const prevOp = gsap.getProperty(heroImgRef.current, "opacity");
        const prevSc = gsap.getProperty(heroImgRef.current, "scale");
        const prevRo = gsap.getProperty(heroImgRef.current, "rotate");
        gsap.set(heroImgRef.current, { opacity: 1, scale: 1, rotate: 0 });
        const h = heroImgRef.current.getBoundingClientRect();
        const p = pinBlockRef.current.getBoundingClientRect();
        gsap.set(heroImgRef.current, {
          opacity: prevOp,
          scale: prevSc,
          rotate: prevRo,
        });
        gsap.set(growImgRef.current, {
          top: h.top - p.top,
          left: h.left - p.left,
          width: h.width,
          height: h.height,
          borderRadius: "0.32em",
          opacity: 0,
          xPercent: 0,
          yPercent: 0,
        });
      };
      anchorGrowImg();

      // ── PINNED hero timeline ── pins only the hero block while the eye
      // scrolls through: words rise, then exit upward, then a room
      // photograph emerges from a single point and grows to fill the frame.
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinBlockRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          // Higher scrub value = more lerp between scroll position and
          // timeline progress. Smooths jank from fast wheel input and gives
          // the pinned reveal a softer, more cinematic feel.
          scrub: 1.5,
          invalidateOnRefresh: true,
          // Re-anchor growImg's starting position on every refresh (resize,
          // route reflow, etc.) so the inline-image origin stays correct.
          onRefreshInit: anchorGrowImg,
        },
      });

      // Beat 1 (0 → 0.25): Hero headline rises word-by-word + inline still settles in.
      pinTl.to(
        heroWords,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power3.out",
          stagger: 0.04,
        },
        0
      );
      if (heroImgRef.current) {
        pinTl.to(
          heroImgRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.25,
            ease: "back.out(1.6)",
          },
          0.08
        );
      }

      // Beat 1b (0.16 → 0.28): Description words rise (small stagger, fast).
      pinTl.to(
        descWords,
        {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power3.out",
          stagger: 0.006,
        },
        0.16
      );
      descImgs.forEach((img, i) => {
        pinTl.to(
          img,
          {
            opacity: 1,
            scale: 1,
            duration: 0.15,
            ease: "back.out(1.7)",
          },
          0.22 + i * 0.05
        );
      });

      // Beat 1c (0.26 → 0.32): CTA pops in last.
      pinTl.to(
        ctaRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.1,
          ease: "back.out(1.6)",
        },
        0.26
      );

      // Beat 2 (0.34 → 0.44): All hero content exits upward as WHOLE elements
      // (not per-word). This ensures parent opacity drops cleanly to 0, hiding
      // every descendant span/image at once — no ghosted text under the image.
      // Completes well before the image-grow beats start at 0.45.
      pinTl.to(
        [heroRef.current, descRef.current, ctaRef.current],
        {
          y: -250,
          opacity: 0,
          duration: 0.1,
          ease: "power2.in",
          stagger: 0.02,
        },
        0.34
      );

      // ── IMAGE GROW ── starts at the inline image's exact position (set by
      // anchorGrowImg above) and grows toward viewport center, then fills.
      // top/left animate alongside width/height so the box sweeps from the
      // inline location to centered, never popping in at viewport center.
      if (growImgRef.current) {
        // Beat 3a (0.43 → 0.62): from inline position → centered tall oval.
        // Centered oval at 22vw × 60vh → top = (100-60)/2 = 20vh, left = (100-22)/2 = 39vw.
        pinTl.to(
          growImgRef.current,
          {
            top: "20vh",
            left: "39vw",
            width: "22vw",
            height: "60vh",
            borderRadius: "50%",
            opacity: 1,
            duration: 0.19,
            ease: "power2.out",
          },
          0.43
        );

        // Beat 3b (0.62 → 0.85): oval → wide rounded rectangle (still centered).
        pinTl.to(
          growImgRef.current,
          {
            top: "7.5vh",
            left: "14vw",
            width: "72vw",
            height: "85vh",
            borderRadius: "5vw",
            duration: 0.23,
            ease: "power2.inOut",
          },
          0.62
        );

        // Beat 3c (0.85 → 1.0): rounded rect → fills the entire frame.
        pinTl.to(
          growImgRef.current,
          {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 0.15,
            ease: "power2.out",
          },
          0.85
        );
      }

      // ── Beat 4 (1.02 → 1.18): Stats overlay rises into the bottom of the
      // now-full-bleed image — a glass card with eyebrow, heading, and stats.
      pinTl.to(
        statsOverlayRef.current,
        { opacity: 1, y: 0, duration: 0.16, ease: "power3.out" },
        1.02
      );

      // ── Beat 4b (1.08 → ~1.45): Stat counters tick up in series. ──
      STATS.forEach((stat, i) => {
        const counter = { v: 0 };
        pinTl.to(
          counter,
          {
            v: stat.value,
            duration: 0.28,
            ease: "power2.out",
            onUpdate: () => {
              const text =
                Math.floor(counter.v).toString() + (stat.suffix ?? "");
              const el = statNumbersRef.current[i];
              if (el) el.textContent = text;
            },
          },
          1.08 + i * 0.04
        );
      });

      // (Description + CTA reveal is part of the pinned timeline above.)

      // ── Hover lift on inline images (independent of pinned timeline) ──
      const hoverImgs = [heroImgRef.current, ...descImgs].filter(
        Boolean
      ) as HTMLSpanElement[];
      hoverImgs.forEach((img) => {
        const onEnter = () =>
          gsap.to(img, {
            scale: 1.06,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        const onLeave = () =>
          gsap.to(img, {
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        img.addEventListener("mouseenter", onEnter);
        img.addEventListener("mouseleave", onLeave);
      });

      // (Stats overlay + counters are part of the pinned timeline above.)

      // ── Offer header — pinned split reveal. On desktop the heading
      // lands centred, then slides to the left while the description +
      // "All Services" button reveal in from the right. Mobile keeps the
      // stacked layout without horizontal transforms.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (
          !offerHeaderRef.current ||
          !offerTitleRef.current ||
          !offerDescRef.current
        )
          return;

        // Title starts visually centred (translated from left column toward
        // middle), description starts hidden and slightly off-screen right.
        gsap.set(offerTitleRef.current, { xPercent: 50 });
        gsap.set(offerDescRef.current, { opacity: 0, xPercent: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: offerHeaderRef.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        // Title held centred for the first beat, then slides left into its
        // natural left-column position.
        tl.to(
          offerTitleRef.current,
          { xPercent: 0, duration: 0.55, ease: "power3.inOut" },
          0.1
        );

        // Description + CTA fade in and slide to natural right-column.
        tl.to(
          offerDescRef.current,
          { opacity: 1, xPercent: 0, duration: 0.55, ease: "power2.out" },
          0.4
        );
      });

      mm.add("(max-width: 767px)", () => {
        if (!offerHeaderRef.current) return;
        // Mobile: simple brief pin, no horizontal transforms (stacked layout)
        ScrollTrigger.create({
          trigger: offerHeaderRef.current,
          start: "top top",
          end: "+=50%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
      });

      // ── Service rows ── Each h-screen row pins individually as it enters
      // the viewport. During the pin scroll, text reveals in sequence and
      // the image performs a subtle scale-down (Ken-Burns feel). Hover only
      // adds a small image scale; no row lift (the whole row is full-bleed).
      const liveCards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
      liveCards.forEach((card) => {
        const img = card.querySelector<HTMLImageElement>("img");
        const eyebrow = card.querySelector<HTMLDivElement>(".card-eyebrow");
        const title = card.querySelector<HTMLHeadingElement>(".card-title");
        const desc = card.querySelector<HTMLParagraphElement>(".card-desc");

        // Hide text content until the pin reveal plays.
        gsap.set([eyebrow, title, desc].filter(Boolean), {
          opacity: 0,
          y: 40,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "+=90%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        // Image gently scales down through the pin (Ken-Burns)
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.15 },
            { scale: 1, duration: 1, ease: "none" },
            0
          );
        }

        // Text reveals in sequence — pill eyebrow, big title, description.
        if (eyebrow) {
          tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.05);
        }
        if (title) {
          tl.to(title, { opacity: 1, y: 0, duration: 0.16, ease: "power3.out" }, 0.13);
        }
        if (desc) {
          tl.to(desc, { opacity: 1, y: 0, duration: 0.18, ease: "power3.out" }, 0.26);
        }

        // Hover — image scales subtly inside its mask, no row lift.
        const onEnter = () => {
          if (img)
            gsap.to(img, {
              scale: 1.06,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
        };
        const onLeave = () => {
          if (img)
            gsap.to(img, {
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              overwrite: "auto",
            });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-ink"
    >
      {/* ── PINNED hero block ── full-screen. Words rise + exit upward, then
          a room photograph emerges from a single point and grows to fill the
          frame (MinimalGoods pattern). ── */}
      <div
        ref={pinBlockRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Growing room photograph — GSAP anchors its top/left/width/height
            to the inline image's natural position on mount/refresh, then
            animates it outward to fill the viewport. */}
        <div
          ref={growImgRef}
          className="absolute overflow-hidden will-change-[width,height,border-radius,top,left] pointer-events-none"
          style={{ width: 0, height: 0, borderRadius: "50%", opacity: 0 }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/residential.png"
              alt="A Touché interior"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Hero content — headline + description + CTA stacked, all centered */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 md:px-12 max-w-[1500px] mx-auto">
          <h2
            ref={heroRef}
            className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-ink text-center"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {(() => {
              let wordIdx = 0;
              return HERO_HEADLINE.map((tok, i) => {
                if (tok.kind === "img") {
                  return (
                    <span
                      key={i}
                      ref={(el) => {
                        heroImgRef.current = el;
                      }}
                      className="relative inline-block align-middle mx-2 md:mx-3 rounded-[0.32em] overflow-hidden shadow-[0_22px_55px_rgba(11,11,11,0.22)] cursor-pointer will-change-transform"
                      style={{
                        width: "1.4em",
                        height: "0.875em",
                        verticalAlign: "-0.2em",
                        lineHeight: 1,
                      }}
                    >
                      <Image
                        src={tok.src}
                        alt={tok.alt}
                        fill
                        sizes="(max-width: 768px) 140px, 280px"
                        className="object-cover"
                        priority
                      />
                    </span>
                  );
                }
                const idx = wordIdx++;
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      heroWordsRef.current[idx] = el;
                    }}
                    className={`inline-block mr-[0.18em] will-change-[opacity,transform] ${
                      tok.accent ? "text-champagne italic font-script font-normal" : ""
                    }`}
                    style={{ opacity: 0 }}
                  >
                    {tok.text}
                  </span>
                );
              });
            })()}
          </h2>

          {/* Supporting description — smaller, sits beneath the big beat */}
          <p
            ref={descRef}
            className="font-display font-normal leading-[1.45] tracking-[-0.005em] text-ink/80 text-center max-w-4xl mx-auto mt-8 md:mt-12"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}
          >
            {(() => {
              let wordIdx = 0;
              let imgIdx = 0;
              return DESCRIPTION.map((tok, i) => {
                if (tok.kind === "img") {
                  const idx = imgIdx++;
                  return (
                    <span
                      key={i}
                      ref={(el) => {
                        descImgsRef.current[idx] = el;
                      }}
                      className="relative inline-block align-middle mx-1.5 md:mx-2 rounded-[0.35em] overflow-hidden shadow-[0_14px_36px_rgba(11,11,11,0.18)] cursor-pointer will-change-transform"
                      style={{
                        width: "1.6em",
                        height: "1em",
                        verticalAlign: "-0.25em",
                        lineHeight: 1,
                      }}
                    >
                      <Image
                        src={tok.src}
                        alt={tok.alt}
                        fill
                        sizes="(max-width: 768px) 80px, 160px"
                        className="object-cover"
                      />
                    </span>
                  );
                }
                const idx = wordIdx++;
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      descWordsRef.current[idx] = el;
                    }}
                    className={`inline-block mr-[0.2em] will-change-[opacity,transform] ${
                      tok.accent ? "text-champagne italic font-script font-normal" : ""
                    }`}
                    style={{ opacity: 0.12 }}
                  >
                    {tok.text}
                  </span>
                );
              });
            })()}
          </p>

          <Link
            ref={ctaRef}
            href="/about"
            className="inline-flex items-center mt-8 md:mt-10 px-8 py-3.5 bg-ink text-ivory rounded-full text-[12px] font-semibold tracking-wide hover:bg-champagne transition-colors duration-500"
          >
            Explore More
          </Link>
        </div>

        {/* ── Stats overlay ── Glass card pinned at the bottom of the now-
            full-bleed room photograph. Eyebrow + heading on the left, counter
            row on the right. Reveals at the end of the pinned timeline. ── */}
        <div
          ref={statsOverlayRef}
          className="absolute z-20 left-4 right-4 md:left-8 md:right-8 bottom-4 md:bottom-8 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="bg-ink/55 backdrop-blur-xl rounded-2xl border border-ivory/15 px-6 md:px-10 py-5 md:py-7 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10 max-w-[1500px] mx-auto pointer-events-auto">
            <div className="md:max-w-sm">
              <p className="text-[10px] md:text-[11px] tracking-luxe uppercase text-champagne mb-2">
                By the Numbers
              </p>
              <h3 className="font-display font-medium text-ivory text-xl md:text-3xl leading-snug tracking-tight">
                A studio measured in detail.
              </h3>
            </div>
            <div className="grid grid-cols-2 md:flex md:gap-10 lg:gap-14 gap-y-5 gap-x-6">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => {
                    statsCellsRef.current[i] = el;
                  }}
                >
                  <span
                    ref={(el) => {
                      statNumbersRef.current[i] = el;
                    }}
                    className="block font-display font-bold text-ivory text-3xl md:text-4xl lg:text-5xl leading-none mb-1.5 md:mb-2 tracking-[-0.02em]"
                  >
                    0
                  </span>
                  <p className="text-[10px] md:text-[11px] tracking-luxe uppercase text-ivory/70 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-48">
        {/* ── Offer header — split reveal. Title on the left, description +
            CTA on the right. Lands centred, then unfurls on scroll. ── */}
        <div
          ref={offerHeaderRef}
          className="relative mb-12 md:mb-16 pt-24 md:pt-40 pb-12 md:pb-20 bg-white"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center md:items-start max-w-[1400px] mx-auto">
            <div
              ref={offerTitleRef}
              className="text-center md:text-left will-change-transform"
            >
              <h3
                className="font-display tracking-tight leading-[1.02] text-ink"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                <span className="font-light">What we</span>{" "}
                <span className="font-bold italic">offer</span>
              </h3>
            </div>

            <div
              ref={offerDescRef}
              className="text-center md:text-left will-change-[transform,opacity]"
            >
              <p className="text-base md:text-lg text-ink/80 font-semibold leading-[1.6] max-w-md mx-auto md:mx-0 mb-6 md:mb-8">
                Six ways we shape interiors — from a single room to a turnkey
                villa, each project crafted with restraint and devoted detail.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-ivory rounded-full text-[12px] font-medium hover:bg-champagne transition-colors duration-500"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ── Service rows ── Full-bleed image-left / text-right sections.
          Each row is h-screen and pinned individually; the image attaches to
          the viewport's left edge while text + tag reveal on the right as
          the section scrolls through its pin. ── */}
      <div className="relative">
        {services.map((s, i) => (
          <Link
            key={s.num}
            href={s.href}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="relative block h-screen w-full overflow-hidden group"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="h-full grid md:grid-cols-2">
              {/* Image — left, flush to the viewport edge, no padding */}
              <div className="relative h-1/2 md:h-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Text — right side, centred vertically with comfortable padding */}
              <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28 py-10 md:py-0 bg-white">
                <div className="max-w-lg">
                  <div className="card-eyebrow inline-flex items-center bg-ink text-ivory text-[10px] tracking-luxe uppercase px-3.5 py-1.5 rounded-full font-medium mb-5 md:mb-6 w-fit">
                    {s.num} — {s.category}
                  </div>
                  <h4
                    className="card-title font-display font-bold tracking-tight leading-[1.06] text-ink mb-4 md:mb-5"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
                  >
                    {s.title}
                  </h4>
                  <p className="card-desc text-sm md:text-base lg:text-lg text-ink/65 leading-[1.55] max-w-md">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
