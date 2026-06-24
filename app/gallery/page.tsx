"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/lib/projects";
import Lightbox from "@/components/Lightbox";

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "Residential",
  "Commercial",
  "Turnkey",
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const active: Project | null = activeIndex !== null ? filtered[activeIndex] : null;

  const onPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const onNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 md:pb-20 px-6 md:px-12 bg-ivory">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-champagne mb-4">— 04 / Gallery</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight">
              Selected<br />
              <span className="italic text-taupe">projects.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink/70 leading-relaxed">
              A curated edit of recent residential, commercial and turnkey
              work. Click any image for a closer look.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 pb-14 bg-ivory">
        <div className="flex items-center justify-between border-y border-ink/15 py-5 gap-6 overflow-x-auto">
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[11px] tracking-luxe uppercase px-4 py-2 transition-all duration-500 whitespace-nowrap ${
                    active
                      ? "bg-ink text-ivory"
                      : "text-ink/70 hover:text-champagne"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] tracking-luxe uppercase text-ink/50 whitespace-nowrap">
            {filtered.length} Projects
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 pb-24 md:pb-40 bg-ivory">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.map((p, i) => (
              <motion.button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: (i % 6) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group text-left ${
                  i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden bg-bone ${i % 7 === 0 ? "aspect-[16/11]" : "aspect-[4/5]"}`}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
                  <span className="absolute top-4 left-4 text-[10px] tracking-luxe uppercase text-ivory bg-ink/40 backdrop-blur-sm px-2 py-1">
                    {p.category}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight group-hover:text-champagne transition-colors duration-500">
                      {p.title}
                    </h3>
                    <p className="text-xs tracking-wider uppercase mt-2 text-ink/50">
                      {p.location} · {p.year}
                    </p>
                  </div>
                  <span className="text-champagne text-lg translate-y-1 transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Lightbox
        project={active}
        onClose={() => setActiveIndex(null)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
}
