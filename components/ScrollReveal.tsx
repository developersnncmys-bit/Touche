"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Variant = "fade" | "text" | "mask";

export default function ScrollReveal({
  children,
  variant = "fade",
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const classMap: Record<Variant, string> = {
    fade: "reveal-fade",
    text: "reveal-text",
    mask: "img-mask",
  };

  const Element = Tag as React.ElementType;

  if (variant === "text") {
    return (
      <Element
        ref={ref as React.RefObject<HTMLElement>}
        className={clsx("reveal-text", visible && "in-view", className)}
      >
        <span>{children}</span>
      </Element>
    );
  }

  return (
    <Element
      ref={ref as React.RefObject<HTMLElement>}
      className={clsx(classMap[variant], visible && "in-view", className)}
    >
      {children}
    </Element>
  );
}
