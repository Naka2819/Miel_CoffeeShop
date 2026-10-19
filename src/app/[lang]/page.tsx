import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Marquee } from "@/components/Marquee";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const h = dict.home;
  const a = dict.alt;

  const cards = [
    { label: h.cards[0], src: "/images/card-cafe.jpg", alt: a.cardCafe },
    { label: h.cards[1], src: "/images/card-brunch.jpg", alt: a.cardBrunch },
    { label: h.cards[2], src: "/images/card-dessert.jpg", alt: a.cardDessert },
  ];
  const favorites = [
    { ...h.favorites[0], src: "/images/fav-latte.jpg", alt: a.favLatte },
    { ...h.favorites[1], src: "/images/fav-tartine.jpg", alt: a.favTartine },
    { ...h.favorites[2], src: "/images/fav-pancakes.jpg", alt: a.favPancakes },
    { ...h.favorites[3], src: "/images/fav-roule.jpg", alt: a.favRoule },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero-home.webp"
          alt={a.heroHome}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 pb-10 md:flex-row md:items-end md:px-20">
          <div className="max-w-xl text-brioche">
            <p className="text-3xl">{h.heroKicker}</p>
            <h1 className="display text-[clamp(6rem,17vw,13rem)] [text-shadow:0_2px_24px_rgba(59,42,32,.25)]">
              Miel<sup className="ml-1 align-super text-[0.18em] not-italic">™</sup>
            </h1>
            <p className="mt-4 max-w-md text-lg leading-snug">{h.heroText}</p>
          </div>
          <p className="text-right text-sm uppercase leading-snug text-brioche">
            {dict.common.city}
            <br />
            {dict.common.openLine.replace(/\.$/, "")}
          </p>
        </div>
      </section>

      {/* Le menu */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-20">
        <div className="text-center">
          <h2 className="display text-[clamp(4rem,9vw,7rem)]">{h.menuTitle}</h2>
          <p className="mt-3 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-none">{h.menuSubtitle}</p>
        </div>
        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.label}>
              <Link href={`/${lang}/menu`} className="group relative block aspect-square overflow-hidden">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brioche px-10 py-1.5 text-lg font-normal group-hover:bg-miel">
                  {c.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Sur place / pour la route */}
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-espresso px-5 py-20 text-brioche md:px-20">
          <h2 className="text-[clamp(2rem,3.3vw,3rem)] leading-[1.35]">
            {h.bandA} <em className="font-semibold text-miel">{h.bandBrunch}</em> {h.bandB}
            <br />
            {h.bandC} <em className="font-semibold text-miel">{h.bandCoffee}</em> {h.bandD}
          </h2>
          <p className="mt-8 max-w-md text-xl italic leading-snug">{h.bandText}</p>
          <Link
            href={`/${lang}/menu`}
            className="mt-8 w-fit rounded-full bg-brioche px-10 py-1.5 text-lg font-normal text-espresso hover:bg-miel"
          >
            {dict.common.menuButton}
          </Link>
        </div>
        <div className="relative min-h-[420px]">
          <Image
            src="/images/band-brunch.jpg"
            alt={a.bandBrunch}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Adresse et horaires en bande défilante */}
      <Marquee items={[dict.common.addressUpper, dict.common.openLine]} />

      {/* Favoris */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-20">
        <div className="text-center">
          <h2 className="display text-[clamp(4rem,9vw,7rem)]">{h.favoritesTitle}</h2>
          <p className="mt-3 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-none">{h.favoritesSubtitle}</p>
        </div>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((f) => (
            <li key={f.name}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-normal text-miel">{f.name}</h3>
              <p className="mt-1 text-sm italic leading-snug">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
