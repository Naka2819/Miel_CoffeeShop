import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-20 md:px-20">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6 uppercase">
          <p className="text-sm opacity-70">{dict.common.address}</p>
          <div>
            <p className="text-sm opacity-70">{dict.common.hoursShort.split("·")[0]}</p>
            <p className="text-4xl font-normal">8:00 – 17:00</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 text-xl font-medium uppercase">
          <Link href={`/${lang}`}>{dict.nav.home}</Link>
          <Link href={`/${lang}/menu`}>{dict.nav.menu}</Link>
          <Link href={`/${lang}/informations`}>{dict.nav.info}</Link>
        </nav>
      </div>
      <p className="mt-16 font-medium uppercase leading-[0.95] text-[clamp(2.5rem,8vw,7rem)]">
        {dict.footer.tagline}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-espresso pt-4 text-xs uppercase">
        <span>{dict.footer.copyright}</span>
        <span className="flex gap-4">
          <a href="https://instagram.com" rel="noreferrer">
            {dict.footer.instagram}
          </a>
          <a href="https://facebook.com" rel="noreferrer">
            {dict.footer.facebook}
          </a>
        </span>
      </div>
    </footer>
  );
}
