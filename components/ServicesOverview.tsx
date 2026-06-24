"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  {
    num: "01",
    category: "Residential",
    tag: "Homes",
    title: "Residential Design",
    desc: "Private homes shaped around how you live.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    href: "/services#residential",
  },
  {
    num: "02",
    category: "Commercial",
    tag: "Brands",
    title: "Commercial Interiors",
    desc: "Retail and hospitality spaces elevated through craft.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    href: "/services#commercial",
  },
  {
    num: "03",
    category: "Turnkey",
    tag: "Delivery",
    title: "Turnkey Execution",
    desc: "End-to-end delivery, from first sketch to last cushion.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    href: "/services#turnkey",
  },
  {
    num: "04",
    category: "Modular",
    tag: "Joinery",
    title: "Modular Furniture",
    desc: "Bespoke joinery built to the millimetre, not the catalogue.",
    image:
      "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=1200&q=85",
    href: "/services#modular",
  },
  {
    num: "05",
    category: "Planning",
    tag: "Strategy",
    title: "Space Planning",
    desc: "Spatial choreography rooted in proportion and light.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    href: "/services#planning",
  },
  {
    num: "06",
    category: "Consultation",
    tag: "Direction",
    title: "Consultation",
    desc: "Studio counsel — a single room or a master plan.",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=85",
    href: "/services#consultation",
  },
];

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── MASTER TIMELINE: one scroll trigger, all entrance choreography
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Header: title → subtitle → CTA (slight overlap, staggered)
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
        0
      )
        .fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.75"
        )
        .fromTo(
          ctaRef.current,
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.75"
        );

      // Cards: each card gets a sub-sequence within the master timeline
      const liveCards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
      liveCards.forEach((card, i) => {
        const img = card.querySelector<HTMLImageElement>("img");
        const tag = card.querySelector<HTMLSpanElement>(
          "span.inline-flex"
        );
        const baseDelay = 0.35 + i * 0.1;

        // Card body: clip-path mask reveal from bottom + slide-up + slight scale
        tl.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
            scale: 0.94,
            clipPath: "inset(8% 8% 8% 8% round 1rem)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            duration: 1.3,
            ease: "expo.out",
          },
          baseDelay
        );

        // Image: scale-in from 1.25 so the photo "settles" inside the card
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.25 },
            { scale: 1, duration: 1.5, ease: "expo.out" },
            baseDelay
          );
        }

        // Tag pill: pop-in with bounce after the card lands
        if (tag) {
          tl.fromTo(
            tag,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.7)" },
            baseDelay + 0.55
          );
        }
      });

      // ── HOVER: lift card + zoom image continuously (separate from entrance)
      const hoverCleanups: Array<() => void> = [];
      liveCards.forEach((card) => {
        const img = card.querySelector<HTMLImageElement>("img");

        const onEnter = () => {
          gsap.to(card, {
            y: -10,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (img) {
            gsap.to(img, {
              scale: 1.08,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        hoverCleanups.forEach((fn) => fn());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-12 bg-white text-ink"
    >
      <div ref={containerRef} className="max-w-[1500px] mx-auto">
        {/* ── Header: title + subtitle (left) + CTA pill (right) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <h2
              ref={titleRef}
              className="font-display font-semibold tracking-tight leading-[1.05] mb-3 text-ink"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)" }}
            >
              What we offer
            </h2>
            <p
              ref={subtitleRef}
              className="text-sm md:text-[15px] text-ink/55 leading-[1.55] max-w-xl"
            >
              Six ways we shape interiors — from a single room to a turnkey
              villa, each project crafted with restraint and devoted detail.
            </p>
          </div>
          <Link
            ref={ctaRef}
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-ivory rounded-full text-[12px] font-medium hover:bg-champagne transition-colors duration-500 self-start lg:self-start flex-shrink-0"
          >
            Begin a Project
          </Link>
        </div>

        {/* ── Card grid: 3 columns on desktop, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <Link
              key={s.num}
              href={s.href}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative block rounded-2xl overflow-hidden aspect-[4/5]"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Full-card image */}
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />

              {/* Dark gradient at bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Text overlay — bottom of card, on the image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-ivory">
                <h3 className="font-display font-semibold text-lg md:text-xl leading-tight mb-1">
                  {s.title}
                </h3>
                <p className="text-[13px] text-ivory/75 leading-[1.45] mb-4">
                  {s.desc}
                </p>

                {/* Tag pill — white pill with dark text, matches reference */}
                <span className="inline-flex items-center gap-1.5 bg-white text-ink text-[10.5px] tracking-wide px-3 py-1.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink" aria-hidden />
                  {s.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
