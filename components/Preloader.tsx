"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HOLD_MS = 1800;
const FADE_MS = 900;

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visible) return;
    const t = setTimeout(() => {
      document.body.style.overflow = "";
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ivory"
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium lowercase tracking-[-0.02em] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 6.4vw, 5.5rem)",
              backgroundImage:
                "linear-gradient(90deg, #C8A45D 0%, #A89582 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            touché
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
