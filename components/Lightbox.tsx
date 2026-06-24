"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export default function Lightbox({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex flex-col"
        >
          <div className="flex items-center justify-between px-6 md:px-12 py-6 text-ivory">
            <div>
              <p className="eyebrow text-champagne mb-1">{project.category}</p>
              <h3 className="font-display text-2xl md:text-3xl">{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-[11px] tracking-luxe uppercase border-b border-ivory/40 pb-1 hover:text-champagne hover:border-champagne transition-colors"
            >
              Close ✕
            </button>
          </div>

          <div className="flex-1 relative flex items-center justify-center px-6 md:px-20 pb-12">
            <button
              onClick={onPrev}
              aria-label="Previous"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-ivory hover:text-champagne text-2xl"
            >
              ←
            </button>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full max-w-6xl max-h-[80vh]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
            <button
              onClick={onNext}
              aria-label="Next"
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-ivory hover:text-champagne text-2xl"
            >
              →
            </button>
          </div>

          <div className="px-6 md:px-12 py-6 border-t border-ivory/10 flex items-center justify-between text-ivory/70 text-xs tracking-wider uppercase">
            <span>{project.year}</span>
            <span>{project.location}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
