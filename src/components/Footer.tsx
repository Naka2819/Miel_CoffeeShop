"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  // Dans la maquette, les liens du pied de page passent en 25 px sur la page menu.
  const onMenu = usePathname().replace(/^\/(fr|en)/, "").startsWith("/menu");
  const link = `block text-[22px] font-bold uppercase tracking-[-0.04em] md:absolute md:whitespace-nowrap ${
    onMenu ? "md:ufs-25" : "md:ufs-30"
  }`;
  const muted = "font-medium uppercase tracking-[-0.04em] opacity-75";

  return (
    <footer className="bg-brioche">
      <div className="relative mx-auto px-5 pb-8 pt-16 md:p-0 md:uw-1440 md:uh-552">
        <div className="flex flex-col gap-10 md:contents">
          <div className="flex flex-col gap-6 md:contents">
            <p className={`${muted} text-[18px] md:absolute md:ul-126 md:ut-80 md:ufs-30`}>{dict.common.address}</p>
            <div className="md:contents">
              <p className={`${muted} text-[18px] md:absolute md:ul-126 md:ut-163 md:ufs-30`}>
                {dict.common.daysShort}
              </p>
              <p className="text-[36px] font-bold tracking-[-0.04em] md:absolute md:ul-126 md:ut-212 md:ufs-50">
                {dict.common.hoursBig}
              </p>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-4 md:absolute md:ul-833 md:ut-80 md:block">
            <Link href={`/${lang}`} className={`${link} md:ut-0`}>
              {dict.nav.home}
            </Link>
            <Link href={`/${lang}/menu`} className={`${link} md:ut-79`}>
              {dict.nav.menu}
            </Link>
            <Link href={`/${lang}/informations`} className={`${link} md:ut-158`}>
              {dict.nav.info}
            </Link>
          </nav>
        </div>

        <div className="mt-14 h-px bg-espresso md:absolute md:ul-126 md:ut-415 md:mt-0 md:uw-1188" />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 md:contents">
          <p className="flex items-center md:absolute md:ul-126 md:ut-446">
            <span className={`${muted} pr-[0.04em] text-[14px] md:ufs-20`}>
              {dict.footer.copyright.replace(/\s*©\s*$/, "")}
            </span>
            <Image
              src="/svg/copyright.svg"
              alt="©"
              width={14}
              height={14}
              className="ml-1 size-[11px] md:uml-5 md:usize-14"
            />
          </p>
          <span className="flex gap-4 md:absolute md:ur-126 md:ut-446 md:ugap-30">
            <a href="#" className={`${muted} pr-[0.04em] text-[14px] md:ufs-20`}>
              {dict.footer.instagram}
            </a>
            <a href="#" className={`${muted} pr-[0.04em] text-[14px] md:ufs-20`}>
              {dict.footer.facebook}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
