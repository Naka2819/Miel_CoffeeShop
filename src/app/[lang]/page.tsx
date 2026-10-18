import Link from "next/link";
import { notFound } from "next/navigation";
import { Marquee } from "@/components/Marquee";
import { PhotoSlot } from "@/components/PhotoSlot";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const h = dict.home;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <PhotoSlot label={`${dict.common.photo} : hero`} className="h-[70vh] min-h-[480px] w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="font-brush text-[clamp(6rem,18vw,15rem)] leading-[0.85] text-miel">Miel</h1>
          <p className="text-2xl italic">{dict.common.descriptor}</p>
          <p className="text-lg">{h.heroTagline}</p>
          <Link
            href={`/${lang}/menu`}
            className="mt-4 rounded-full bg-brioche px-8 py-2 text-base font-normal hover:bg-espresso hover:text-brioche"
          >
            {dict.common.seeMenu}
          </Link>
        </div>
      </section>

      {/* Le menu */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-20">
        <div className="text-center">
          <h2 className="font-brush text-7xl leading-none text-miel">{h.menuTitle}</h2>
          <p className="mt-2 text-4xl">{h.menuSubtitle}</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {h.cards.map((c) => (
            <Link key={c} href={`/${lang}/menu`} className="group relative block">
              <PhotoSlot label={`${dict.common.photo} : ${c}`} className="aspect-square w-full" />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brioche px-8 py-1.5 text-lg group-hover:bg-miel">
                {c}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bandeau sur place / pour la route */}
      <section className="grid md:grid-cols-2">
        <div className="bg-espresso px-5 py-20 text-brioche md:px-20">
          <h2 className="text-5xl leading-[1.3]">
            {h.bandTitleA} <em className="font-medium text-miel">{h.bandBrunch}</em> {h.bandTitleB}
            <br />
            {h.bandTitleC} <em className="font-medium text-miel">{h.bandCoffee}</em> {h.bandTitleD}
          </h2>
          <p className="mt-8 max-w-md text-xl italic">{h.bandText}</p>
          <Link
            href={`/${lang}/menu`}
            className="mt-8 inline-block rounded-full bg-brioche px-8 py-2 text-espresso hover:bg-miel"
          >
            {dict.common.seeMenu}
          </Link>
        </div>
        <PhotoSlot label={`${dict.common.photo} : brunch`} className="min-h-[360px]" />
      </section>

      {/* Favoris */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-20">
        <div className="text-center">
          <h2 className="font-brush text-7xl leading-none text-miel">{h.favoritesTitle}</h2>
          <p className="mt-2 text-4xl uppercase">{h.favoritesSubtitle}</p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {h.favorites.map((f) => (
            <li key={f.name}>
              <PhotoSlot label={`${dict.common.photo} : ${f.name}`} className="aspect-[3/4] w-full" />
              <h3 className="mt-4 font-brush text-2xl text-espresso">{f.name}</h3>
              <p className="mt-1 text-sm italic">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <Marquee words={h.marquee} />
    </>
  );
}
