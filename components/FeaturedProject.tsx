"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

// ────────────────────────────────────────────────────────────────────────────
// FEATURED — staged-reveal carousel (Globe Express style)
//
// Pin engages → section reads as white briefly, then the dark world fades in
// with an INTRO state: "Featured Projects" title on the left, descriptive
// blurb, and the project thumbnails stacked at bottom-right.
//
// Each subsequent scroll "beat" reveals the next project full-bleed: the
// thumbnail's image expands to fill the entire stage, the intro fades, and
// the project's meta text slides in on the LEFT. Counter updates with the
// active project. Repeat for each project.
// ────────────────────────────────────────────────────────────────────────────

const FEATURED_SLUGS = ["maison-indira", "atelier-brera", "villa-riviere"];
const featuredProjects = FEATURED_SLUGS.map(
  (slug) => projects.find((p) => p.slug === slug)
).filter((p): p is NonNullable<typeof p> => Boolean(p));

const INTRO_BLURB =
  "A few of our most considered projects — each one shaped around the way it's actually lived in. Restraint, material honesty, devoted detail.";

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const darkWrapRef = useRef<HTMLDivElement>(null);
  const introLayerRef = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLHeadingElement>(null);
  const introDescRef = useRef<HTMLParagraphElement>(null);
  const thumbsRef = useRef<Array<HTMLDivElement | null>>([]);
  const projectLayersRef = useRef<Array<HTMLDivElement | null>>([]);
  const projectImagesRef = useRef<Array<HTMLDivElement | null>>([]);
  const projectMetasRef = useRef<Array<HTMLDivElement | null>>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP: pin + staged reveal scrub ──
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const projectLayers = projectLayersRef.current.filter(Boolean) as HTMLDivElement[];
          const projectImages = projectImagesRef.current.filter(Boolean) as HTMLDivElement[];
          const projectMetas = projectMetasRef.current.filter(Boolean) as HTMLDivElement[];
          const thumbs = thumbsRef.current.filter(Boolean) as HTMLDivElement[];

          // Initial state — dark world hidden, intro visible, projects hidden,
          // thumbs hidden (they pop in together once the pin engages).
          if (darkWrapRef.current)
            gsap.set(darkWrapRef.current, { autoAlpha: 0 });
          if (introLayerRef.current)
            gsap.set(introLayerRef.current, { autoAlpha: 1 });
          gsap.set(projectLayers, { autoAlpha: 0 });
          projectImages.forEach((img) =>
            gsap.set(img, { scale: 1.15, autoAlpha: 0 })
          );
          projectMetas.forEach((meta) =>
            gsap.set(meta, { x: -40, autoAlpha: 0 })
          );
          gsap.set(thumbs, { autoAlpha: 0, y: 30 });

          const STATES = featuredProjects.length + 1; // intro + 1 per project

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              // Generous per-state scroll distance + longer scrub so each state
              // has plenty of time to read and the reveal eases under scroll
              // instead of snapping.
              end: () => `+=${STATES * 260}%`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 1.6,
              invalidateOnRefresh: true,
              refreshPriority: 0,
              onUpdate: (self) => {
                if (!indicatorRef.current) return;
                // Progress 0 → 1 across STATES discrete states (intro + projects).
                // State 0 = intro (counter shows "—" or "00"), states 1..N = projects.
                const stateF = self.progress * STATES;
                const activeState = Math.min(Math.floor(stateF), STATES - 1);
                if (activeState === 0) {
                  indicatorRef.current.textContent = "00";
                } else {
                  indicatorRef.current.textContent = String(
                    activeState
                  ).padStart(2, "0");
                }
              },
            },
          });

          // ── Timeline plan ──────────────────────────────────────────
          //   0.00 → 0.04   dark world fades in (white → dark bg)
          //   0.02 → 0.08   intro title rises
          //   0.04 → 0.10   intro description rises
          //   0.04 → 0.10   3 thumbs settle in together
          //   0.10 → 0.22   INTRO HOLD (everything fully visible)
          //   0.22 → 0.34   intro → project 1 transition
          //   0.34 → 0.44   project 1 HOLD
          //   0.44 → 0.56   project 1 → project 2 transition
          //   0.56 → 0.66   project 2 HOLD
          //   0.66 → 0.78   project 2 → project 3 transition
          //   0.78 → 1.00   project 3 HOLD (longer end buffer)
          // ──────────────────────────────────────────────────────────

          const INTRO_HOLD_END = 0.22;
          const TRANSITION_DUR = 0.12;
          const PROJECT_HOLD = 0.10;
          const FADE_OUT = 0.06;
          const FADE_IN = 0.08;

          // BEAT 0 → 0.04: dark world fades in
          if (darkWrapRef.current) {
            tl.to(
              darkWrapRef.current,
              { autoAlpha: 1, duration: 0.04, ease: "power2.inOut" },
              0
            );
          }

          // BEAT 0.02 → 0.10: intro elements settle in
          if (introTitleRef.current) {
            tl.from(
              introTitleRef.current,
              { y: 40, autoAlpha: 0, duration: 0.06, ease: "power3.out" },
              0.02
            );
          }
          if (introDescRef.current) {
            tl.from(
              introDescRef.current,
              { y: 24, autoAlpha: 0, duration: 0.06, ease: "power3.out" },
              0.04
            );
          }
          if (thumbs.length > 0) {
            tl.to(
              thumbs,
              { y: 0, autoAlpha: 1, duration: 0.06, ease: "power2.out" },
              0.04
            );
          }
          // Intro is now visible and held from 0.10 → 0.22 (no animation in this window)

          // Per-project transitions, each starting at INTRO_HOLD_END + i*(TRANSITION_DUR+PROJECT_HOLD)
          // Outgoing completes by transitionStart + FADE_OUT.
          // Incoming starts at transitionStart + 0.04 (slight overlap) and
          // completes EXACTLY at transitionEnd — the centred-active position.
          featuredProjects.forEach((_, i) => {
            const transitionStart =
              INTRO_HOLD_END + i * (TRANSITION_DUR + PROJECT_HOLD);
            const transitionEnd = transitionStart + TRANSITION_DUR;
            const incomingAt = transitionEnd - FADE_IN; // so it completes at transitionEnd

            const image = projectImages[i];
            const meta = projectMetas[i];
            const layer = projectLayers[i];
            const thumb = thumbs[i];

            if (i === 0) {
              // Intro → Project 1
              if (introLayerRef.current) {
                tl.to(
                  introLayerRef.current,
                  { autoAlpha: 0, duration: FADE_OUT, ease: "power2.in" },
                  transitionStart
                );
              }
              if (layer) {
                tl.to(layer, { autoAlpha: 1, duration: 0.01 }, incomingAt);
              }
              if (image) {
                tl.fromTo(
                  image,
                  { scale: 1.15, autoAlpha: 0 },
                  { scale: 1, autoAlpha: 1, duration: FADE_IN, ease: "power2.out" },
                  incomingAt
                );
              }
              if (meta) {
                tl.to(
                  meta,
                  { x: 0, autoAlpha: 1, duration: FADE_IN, ease: "power2.out" },
                  incomingAt
                );
              }
              if (thumb) {
                tl.to(
                  thumb,
                  { autoAlpha: 0, duration: FADE_OUT, ease: "power2.in" },
                  transitionStart + 0.02
                );
              }
            } else {
              // Project (i-1) → Project i swap
              const prevLayer = projectLayers[i - 1];
              const prevImage = projectImages[i - 1];
              const prevMeta = projectMetas[i - 1];
              const prevThumb = thumbs[i - 1];

              // Outgoing phase — fades out first half of transition window
              if (prevMeta) {
                tl.to(
                  prevMeta,
                  { x: -40, autoAlpha: 0, duration: FADE_OUT, ease: "power2.in" },
                  transitionStart
                );
              }
              if (prevImage) {
                tl.to(
                  prevImage,
                  { autoAlpha: 0, duration: FADE_OUT, ease: "power2.in" },
                  transitionStart
                );
              }
              if (prevLayer) {
                tl.to(prevLayer, { autoAlpha: 0, duration: 0.01 }, transitionStart + FADE_OUT);
              }
              if (prevThumb) {
                tl.to(
                  prevThumb,
                  { autoAlpha: 1, duration: FADE_OUT, ease: "power2.out" },
                  transitionStart + 0.02
                );
              }

              // Incoming phase — completes exactly at transitionEnd
              if (layer) {
                tl.to(layer, { autoAlpha: 1, duration: 0.01 }, incomingAt);
              }
              if (image) {
                tl.fromTo(
                  image,
                  { scale: 1.12, autoAlpha: 0 },
                  { scale: 1, autoAlpha: 1, duration: FADE_IN, ease: "power2.out" },
                  incomingAt
                );
              }
              if (meta) {
                tl.to(
                  meta,
                  { x: 0, autoAlpha: 1, duration: FADE_IN, ease: "power2.out" },
                  incomingAt
                );
              }
              if (thumb) {
                tl.to(
                  thumb,
                  { autoAlpha: 0, duration: FADE_OUT, ease: "power2.in" },
                  incomingAt
                );
              }
            }
          });
        }
      );

      // ── MOBILE / reduced-motion: show first project statically ──
      mm.add(
        "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        () => {
          if (darkWrapRef.current)
            gsap.set(darkWrapRef.current, { autoAlpha: 1 });
          if (introLayerRef.current)
            gsap.set(introLayerRef.current, { autoAlpha: 0 });

          const projectLayers = projectLayersRef.current.filter(Boolean) as HTMLDivElement[];
          const projectImages = projectImagesRef.current.filter(Boolean) as HTMLDivElement[];
          const projectMetas = projectMetasRef.current.filter(Boolean) as HTMLDivElement[];

          if (projectLayers[0])
            gsap.set(projectLayers[0], { autoAlpha: 1 });
          if (projectImages[0])
            gsap.set(projectImages[0], { autoAlpha: 1, scale: 1 });
          if (projectMetas[0])
            gsap.set(projectMetas[0], { autoAlpha: 1, x: 0 });

          projectLayers.slice(1).forEach((l) =>
            gsap.set(l, { autoAlpha: 0 })
          );
          projectImages.slice(1).forEach((img) =>
            gsap.set(img, { autoAlpha: 0 })
          );
          projectMetas.slice(1).forEach((m) =>
            gsap.set(m, { autoAlpha: 0 })
          );

          // Thumbs: active project hidden, others visible
          const thumbs = thumbsRef.current.filter(Boolean) as HTMLDivElement[];
          if (thumbs[0]) gsap.set(thumbs[0], { autoAlpha: 0, y: 0 });
          thumbs.slice(1).forEach((t) => gsap.set(t, { autoAlpha: 1, y: 0 }));

          if (indicatorRef.current) indicatorRef.current.textContent = "01";
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-dark="true"
      className="relative bg-white overflow-hidden"
    >
      <div
        ref={stageRef}
        className="relative min-h-screen overflow-hidden bg-white"
      >
        {/* Dark world — autoAlpha 0 → 1 as the pin engages */}
        <div
          ref={darkWrapRef}
          className="absolute inset-0 text-ivory"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {/* Solid black backdrop sits at the bottom of the stack */}
          <div className="absolute inset-0 bg-black" aria-hidden="true" />

          {/* ── PROJECT LAYERS — full-bleed image + left-aligned meta text ── */}
          {featuredProjects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => {
                projectLayersRef.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {/* Full-bleed image (scales 1.15 → 1 on reveal) */}
              <div
                ref={(el) => {
                  projectImagesRef.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ opacity: 0 }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>

              {/* Stronger left gradient — much darker over the text column so
                  copy stays legible on light/bright photos. Falls off to fully
                  transparent on the right where the image dominates. */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.78) 18%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0) 78%)",
                }}
              />
              {/* Subtle bottom vignette — adds atmosphere + extra contrast
                  under the meta panel on lighter photos */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Meta text — slides in from left, vertically centred.
                  HEAVN-style typography: muted eyebrow, medium-weight display
                  title with terminal period, generous description leading,
                  pill CTA. Subtle text-shadows kept for legibility over the
                  photo (HEAVN puts text on solid panels; we're overlaid). */}
              <div
                ref={(el) => {
                  projectMetasRef.current[i] = el;
                }}
                className="absolute inset-y-0 left-12 xl:left-20 flex flex-col justify-center max-w-xl pointer-events-auto"
                style={{ opacity: 0 }}
              >
                <p
                  className="text-[11px] tracking-luxe uppercase text-ivory/75 font-semibold mb-7"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
                >
                  {p.category} · {p.year}
                </p>
                <h3
                  className="font-display font-bold uppercase tracking-tight leading-[1.02] mb-7 text-ivory"
                  style={{
                    fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.55)",
                  }}
                >
                  {p.title}.
                </h3>
                <p
                  className="text-ivory text-base md:text-lg font-medium mb-8 max-w-md leading-[1.6]"
                  style={{ textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}
                >
                  {p.description}
                </p>
                <p
                  className="text-[11px] tracking-luxe uppercase text-ivory/65 font-semibold mb-10"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
                >
                  {p.location}
                </p>
                <Link
                  href={`/gallery#${p.slug}`}
                  className="inline-flex items-center justify-center self-start bg-ivory text-ink rounded-full px-8 py-3.5 text-[12px] tracking-[0.05em] font-medium hover:bg-champagne transition-colors duration-500"
                >
                  Explore the work
                </Link>
              </div>
            </div>
          ))}

          {/* ── INTRO LAYER — HEAVN-style: all white, clean alignment ── */}
          <div
            ref={introLayerRef}
            className="absolute inset-0 px-12 xl:px-20 pt-32 pb-12 z-20"
            style={{ opacity: 1 }}
          >
            <div className="h-full flex flex-col justify-center max-w-2xl">
              <p className="text-[11px] tracking-luxe uppercase text-ivory/55 mb-7">
                Selected Work
              </p>
              <h2
                ref={introTitleRef}
                className="font-display font-medium tracking-tight leading-[1.02] text-ivory mb-8"
                style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)" }}
              >
                Featured projects.
              </h2>
              <p
                ref={introDescRef}
                className="text-ivory text-base md:text-lg max-w-lg leading-[1.65]"
              >
                {INTRO_BLURB}
              </p>
            </div>
          </div>

          {/* ── PERSISTENT THUMBNAIL STRIP — bottom-right, sits above project
              layers. Each thumb's autoAlpha toggles based on whether its
              project is the active full-bleed one (active = thumb hidden,
              inactive = thumb visible). Hover highlights with lift + champagne ring. ── */}
          <div className="absolute bottom-12 right-12 xl:right-20 z-30 flex items-end gap-4 pointer-events-none">
            {featuredProjects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  thumbsRef.current[i] = el;
                }}
                className="group/thumb relative w-[120px] xl:w-[140px] aspect-[3/4] rounded-md overflow-hidden ring-1 ring-ivory/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] pointer-events-auto cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:ring-2 hover:ring-champagne hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75)]"
                style={{ opacity: 0, visibility: "hidden" }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="140px"
                  className="object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-110"
                />
                {/* Hover wash — slightly brightens the photo */}
                <div className="absolute inset-0 bg-champagne/0 group-hover/thumb:bg-champagne/10 transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <p className="text-[10px] tracking-luxe uppercase text-ivory leading-tight group-hover/thumb:text-champagne transition-colors duration-500">
                    {p.title}
                  </p>
                  <p className="text-[9px] tracking-luxe uppercase text-ivory/55 mt-0.5">
                    {p.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Persistent top bar — slide counter only (Featured label removed) */}
          <div className="absolute top-20 md:top-24 left-12 right-12 xl:left-20 xl:right-20 z-30 flex items-center justify-end pointer-events-none">
            <p className="text-[11px] tracking-luxe uppercase text-ivory/40">
              <span ref={indicatorRef} className="text-ivory">
                00
              </span>
              <span className="mx-2">/</span>
              <span ref={totalRef}>
                {String(featuredProjects.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
