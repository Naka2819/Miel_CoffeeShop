import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-24 md:px-20">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 uppercase">
          <p className="text-lg opacity-70">{dict.common.address}</p>
          <div>
            <p className="text-lg opacity-70">{dict.common.daysShort}</p>
            <p className="text-5xl font-normal">{dict.common.hoursBig}</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-5 text-xl font-medium uppercase">
          <Link href={`/${lang}`}>{dict.nav.home}</Link>
          <Link href={`/${lang}/menu`}>{dict.nav.menu}</Link>
          <Link href={`/${lang}/informations`}>{dict.nav.info}</Link>
        </nav>
      </div>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-espresso pt-4 text-xs uppercase">
        <span>{dict.footer.copyright}</span>
        <span className="flex gap-4">
          <a href="#">{dict.footer.instagram}</a>
          <a href="#">{dict.footer.facebook}</a>
        </span>
      </div>
    </footer>
  );
}
