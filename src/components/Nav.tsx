"use client";

import Image from "next/image";
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
    <header className="sticky top-0 z-50 bg-brioche">
      <div className="relative mx-auto flex items-center justify-between border-x border-b border-espresso px-5 py-3 md:block md:p-0 md:uw-1440 md:uh-54">
        <nav
          aria-label="Navigation principale"
          className="flex gap-4 md:absolute md:ul-123 md:ut-0 md:ugap-40"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className="link-swipe text-[17px] font-light tracking-[-0.07em] md:up-10 md:ufs-26"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={`/${other}${rest}`}
            hrefLang={other}
            lang={other}
            aria-label={other === "en" ? "English" : "Français"}
            className="rounded-full border border-espresso px-2 text-xs font-medium uppercase leading-5 hover:bg-espresso hover:text-brioche md:absolute md:ut-27 md:ur-234 md:-translate-y-1/2 md:upx-8 md:ufs-14"
          >
            {other}
          </Link>
          <Link href={`/${lang}`} aria-label="Miel" className="block md:absolute md:ul-1230 md:ut-13">
            <Image src="/svg/logo-nav.svg" alt="" width={87} height={28} className="h-[28px] w-[87px] md:uh-28 md:uw-87" />
          </Link>
        </div>
      </div>
    </header>
  );
}
