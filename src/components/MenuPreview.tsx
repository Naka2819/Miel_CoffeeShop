"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Au survol d'une ligne de la carte (élément portant data-photo), la photo du produit
// apparaît à côté du curseur et le suit en douceur. Uniquement avec une souris.
const W = 240; // largeur de la vignette (px), format 3:4
const H = 320;
const GAP = 28; // écart entre le curseur et la vignette

export function MenuPreview({ photos, children }: { photos: string[]; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    const box = card.current;
    if (!enabled || !el || !box) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let placed = false;

    const place = (cx: number, cy: number) => {
      // À droite du curseur, ou à gauche s'il n'y a plus la place ; jamais hors de l'écran en hauteur.
      const right = cx + GAP + W < window.innerWidth - 16;
      target.x = right ? cx + GAP : cx - GAP - W;
      target.y = Math.min(Math.max(cy - H / 2, 16), window.innerHeight - H - 16);
      if (!placed || reduce) {
        pos.x = target.x;
        pos.y = target.y;
        placed = true;
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      box.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const row = (e.target as Element).closest<HTMLElement>("[data-photo]");
      place(e.clientX, e.clientY);
      setActive(row && el.contains(row) ? row.dataset.photo ?? null : null);
    };
    const onLeave = () => {
      setActive(null);
      placed = false;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
    };
  }, [enabled]);

  return (
    <div ref={root}>
      {children}
      {enabled && (
        <div
          ref={card}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ width: W, height: H }}
        >
          <div className={`menu-preview relative size-full overflow-hidden ${active ? "is-on" : ""}`}>
            {photos.map((p) => (
              <Image
                key={p}
                src={`/images/produits-picture/${p}.jpg`}
                alt=""
                fill
                sizes={`${W}px`}
                className={`object-cover transition-opacity duration-300 ${p === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
