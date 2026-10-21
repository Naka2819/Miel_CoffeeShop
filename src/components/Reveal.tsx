"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Fait apparaître les enfants « .reveal-item » quand le bloc entre à l'écran.
// Sans JavaScript, le contenu reste visible : l'état caché n'est posé qu'au montage.
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
    // Déjà à l'écran au chargement : on laisse tel quel, sans animation.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
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
