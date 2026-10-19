"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(fr|en)/, "");
  const other: Locale = lang === "fr" ? "en" : "fr";

  const links = [
    { href: `/${lang}`, label: dict.nav.home, active: rest === "" },
    { href: `/${lang}/menu`, label: dict.nav.menu, active: rest.startsWith("/menu") },
    { href: `/${lang}/informations`, label: dict.nav.info, active: rest.startsWith("/informations") },
  ];

  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3 text-[15px] md:px-20">
      <nav aria-label="Navigation principale" className="flex gap-5 md:gap-10">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={l.active ? "page" : undefined}
            className={l.active ? "font-medium" : "hover:underline"}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Link
          href={`/${other}${rest}`}
          hrefLang={other}
          lang={other}
          aria-label={other === "en" ? "English" : "Français"}
          className="rounded-full border border-espresso px-2.5 py-0.5 text-xs font-medium uppercase hover:bg-espresso hover:text-brioche"
        >
          {other}
        </Link>
        <Link href={`/${lang}`} aria-label="Miel" className="display text-3xl">
          Miel<sup className="ml-0.5 align-super text-[0.35em] not-italic">™</sup>
        </Link>
      </div>
    </header>
  );
}
