"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Fait apparaître les enfants « .reveal-item » quand le bloc est bien entré à l'écran.
export function Reveal({
  as: Tag = "div",
  className,
  style,
  children,
}: {
  as?: "div" | "ul";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-in");
        io.disconnect();
      },
      // Déclenche quand un quart des cases est visible, pas dès qu'elles effleurent le bas de l'écran.
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
