import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Marquee } from "@/components/Marquee";
import { getDictionary, hasLocale } from "./dictionaries";

// Largeur ajoutée de chaque côté quand l'écran dépasse les 1440 px de la maquette.
const bleed = "max(0px, calc((100cqw - 1440px) / 2))";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const h = dict.home;
  const a = dict.alt;

  // Cadrage des photos repris des frames Figma (boîte image dans une carte de 360 × 380).
  const cards = [
    { label: h.cards[0], src: "/images/card-cafe.jpg", alt: a.cardCafe, crop: "md:-ut-90 md:uh-639" },
    { label: h.cards[1], src: "/images/card-brunch.jpg", alt: a.cardBrunch, crop: "md:ut-0 md:uh-638" },
    { label: h.cards[2], src: "/images/card-dessert.jpg", alt: a.cardDessert, crop: "md:-ut-56 md:uh-540" },
  ];
  // Favoris : carte de 279 × 380, image positionnée comme dans la frame.
  const favorites = [
    { ...h.favorites[0], src: "/images/fav-latte.jpg", alt: a.favLatte, crop: "md:-ul-21 md:-ut-47 md:uw-320 md:uh-427" },
    { ...h.favorites[1], src: "/images/fav-tartine.jpg", alt: a.favTartine, crop: "md:-ul-25 md:ut-0 md:uw-304 md:uh-380" },
    { ...h.favorites[2], src: "/images/fav-pancakes.jpg", alt: a.favPancakes, crop: "md:ul-0 md:ut-0 md:uw-279 md:uh-419" },
    { ...h.favorites[3], src: "/images/fav-roule.jpg", alt: a.favRoule, crop: "md:ul-0 md:-ut-55 md:uw-283 md:uh-435" },
  ];

  const title =
    "text-[64px] font-bold italic uppercase leading-[0.95] tracking-[-0.07em] text-miel pr-[0.07em] md:leading-[normal] md:ufs-120";
  const subtitle =
    "text-[30px] font-extralight uppercase tracking-[-0.07em] pr-[0.07em] leading-none md:leading-[normal] md:ufs-60";

  return (
    <>
      {/* Hero */}
      <section className="relative z-10">
        <div className="relative mx-auto h-[640px] md:h-auto md:uw-1440 md:uh-1004">
          <div
            className="absolute inset-0 overflow-hidden md:inset-y-0"
            style={{ left: `calc(-1 * ${bleed})`, right: `calc(-1 * ${bleed})` }}
          >
            <div
              className="absolute inset-0 md:inset-auto md:-ul-8 md:-ut-146.5 md:aspect-[1448/1812] md:w-(--w)"
              style={{ ["--w" as string]: `calc(1448 * var(--u) + 2 * ${bleed})` }}
            >
              <Image
                src="/images/hero-home.webp"
                alt={a.heroHome}
                fill
                sizes="(min-width: 768px) 101vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover object-top"
              />
            </div>
            <Image
              src="/svg/hero-shadow.svg"
              alt=""
              width={1440}
              height={1222}
              className="pointer-events-none absolute hidden max-w-none md:block md:ul-0 md:ut-150 md:uw-1440 md:uh-1222"
            />
            {/* Le dégradé Figma a ses deux arrêts à 0 % : il ne laisse qu'un filet sombre sous la nav. */}
            <div className="absolute inset-x-0 top-0 h-px bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent to-60% md:hidden" />
          </div>
          {/* Le flou de l'ombre déborde sur la section suivante, comme dans la maquette. */}
          <div className="pointer-events-none absolute hidden overflow-hidden md:block md:ul-0 md:ut-1004 md:uw-1440 md:uh-368">
            <Image
              src="/svg/hero-shadow.svg"
              alt=""
              width={1440}
              height={1222}
              className="absolute max-w-none md:ul-0 md:-ut-854 md:uw-1440 md:uh-1222"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col px-5 pb-8 text-brioche md:contents">
            <p className="text-[32px] font-medium tracking-[-0.07em] md:absolute md:ul-126 md:ut-483 md:ufs-60">
              {h.heroKicker}
            </p>
            <h1 className="mt-2 md:absolute md:ul-123 md:ut-561 md:mt-0">
              <span className="sr-only">Miel</span>
              <Image
                src="/svg/logo-hero.svg"
                alt=""
                width={593}
                height={193}
                loading="eager"
                className="h-auto w-[280px] md:uh-193 md:uw-593"
              />
            </h1>
            <p className="mt-5 max-w-[481px] text-[18px] font-medium tracking-[-0.07em] md:absolute md:ul-126 md:ut-777 md:mt-0 md:max-w-none md:uw-481 md:ufs-30">
              {h.heroText}
            </p>
            <div className="mt-6 text-[14px] font-medium uppercase md:contents md:text-right">
              <p className="tracking-[-0.07em] md:absolute md:ur-126 md:ut-828 md:whitespace-nowrap md:pr-[0.07em] md:ufs-25">
                {dict.common.city},
              </p>
              <p className="tracking-[-0.07em] md:absolute md:ur-126 md:ut-861 md:whitespace-nowrap md:pr-[0.07em] md:ufs-25">
                {dict.common.openLine.replace(/\.$/, "")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Le menu */}
      <section className="bg-brioche">
        <div className="relative mx-auto px-5 py-20 md:p-0 md:uw-1440 md:uh-797">
          <div className="text-center">
            <h2 className={`${title} md:absolute md:inset-x-0 md:ut-50`}>{h.menuTitle}</h2>
            <p className={`${subtitle} -mt-2 md:absolute md:inset-x-0 md:ut-141 md:mt-0`}>{h.menuSubtitle}</p>
          </div>
          <ul className="mt-12 grid gap-6 md:absolute md:ul-126 md:ut-317 md:mt-0 md:flex md:ugap-54">
            {cards.map((c) => (
              <li key={c.label}>
                <Link
                  href={`/${lang}/menu`}
                  className="group relative block aspect-[360/380] overflow-hidden md:aspect-auto md:uw-360 md:uh-380"
                >
                  <span className={`absolute inset-0 md:inset-auto md:ul-0 md:uw-360 ${c.crop}`}>
                    <Image
                      src={c.src}
                      alt={c.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="absolute bottom-[19px] left-1/2 flex h-[47px] w-[222px] -translate-x-1/2 items-center justify-center rounded-full bg-brioche pr-[0.07em] text-[26px] tracking-[-0.07em] whitespace-nowrap transition-colors group-hover:bg-miel md:bottom-auto md:ut-308 md:uh-47 md:uw-222 md:ufs-30">
                    {c.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sur place / pour la route */}
      <section className="relative overflow-hidden bg-espresso">
        <div className="relative mx-auto flex flex-col md:block md:uw-1440 md:uh-683">
          <Image
            src="/svg/swirl-band.svg"
            alt=""
            width={1196}
            height={672}
            className="pointer-events-none absolute hidden max-w-none md:block md:ul-104 md:ut-12 md:uw-1196 md:uh-672"
          />
          <div className="relative z-10 px-5 py-16 text-brioche md:static md:p-0">
            <h2>
              {[
                { a: h.bandA, em: h.bandBrunch, b: h.bandB, emTrack: "tracking-[-0.1em] pr-[0.1em]", top: "md:ut-137" },
                { a: h.bandC, em: h.bandCoffee, b: h.bandD, emTrack: "tracking-[-0.08em] pr-[0.08em]", top: "md:ut-225" },
              ].map((line) => (
                <span
                  key={line.em}
                  className={`flex flex-wrap items-start whitespace-nowrap md:absolute md:ul-126 ${line.top}`}
                >
                  {line.a && (
                    <span className="pr-[0.07em] text-[34px] tracking-[-0.07em] text-white md:ufs-60">{line.a}</span>
                  )}
                  <em className={`text-[37px] font-bold italic text-miel md:ufs-65 ${line.emTrack}`}>{line.em}</em>
                  <span className="text-[34px] tracking-[-0.07em] text-white md:ufs-60">{line.b}</span>
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-[583px] text-[20px] font-extralight italic tracking-[-0.04em] md:absolute md:ul-126 md:ut-353 md:mt-0 md:max-w-none md:uw-583 md:ufs-30">
              {h.bandText}
            </p>
            <Link
              href={`/${lang}/menu`}
              className="mt-8 flex h-[47px] w-[222px] items-center justify-center rounded-full bg-brioche pr-[0.07em] text-[26px] tracking-[-0.07em] text-espresso transition-colors hover:bg-miel md:absolute md:ul-126 md:ut-520 md:mt-0 md:uh-47 md:uw-222 md:ufs-30"
            >
              {dict.common.menuButton}
            </Link>
          </div>
          <div
            className="relative aspect-[631/684] overflow-hidden md:absolute md:aspect-auto md:ul-809 md:ut-0 md:uh-684 md:w-(--w)"
            style={{
              ["--w" as string]: `calc(631 * var(--u) + ${bleed})`,
              ["--iw" as string]: `calc(639 * var(--u) + ${bleed})`,
            }}
          >
            <div className="absolute inset-0 md:inset-auto md:-ul-8 md:-ut-32 md:aspect-[1200/1499] md:w-(--iw)">
              <Image
                src="/images/band-brunch.jpg"
                alt={a.bandBrunch}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Adresse et horaires en bande défilante */}
      <Marquee items={[dict.common.addressUpper, dict.common.openLine]} />

      {/* Favoris */}
      <section className="bg-brioche">
        <div className="relative mx-auto px-5 py-20 md:p-0 md:uw-1440 md:uh-914">
          <div className="text-center">
            <h2 className={`${title} md:absolute md:inset-x-0 md:ut-52`}>{h.favoritesTitle}</h2>
            <p
              className={`${subtitle} -mt-2 md:absolute md:inset-x-0 md:ut-143 md:mt-0 md:pl-[calc(27*var(--u))]`}
            >
              {h.favoritesSubtitle}
            </p>
          </div>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 md:absolute md:ul-126 md:ut-321 md:mt-0 md:flex md:ugap-24">
            {favorites.map((f) => (
              <li key={f.name} className="md:uw-279">
                <div className="relative aspect-[279/380] overflow-hidden md:aspect-auto md:uh-380">
                  <span className={`absolute inset-0 md:inset-auto ${f.crop}`}>
                    <Image
                      src={f.src}
                      alt={f.alt}
                      fill
                      sizes="(min-width: 768px) 23vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </span>
                </div>
                <h3 className="mt-4 whitespace-nowrap text-[26px] font-bold tracking-[-0.08em] text-miel md:umt-20 md:ufs-30">
                  {f.name}
                </h3>
                <p className="mt-0.5 text-[17px] italic tracking-[-0.04em] opacity-75 md:umt-2 md:ufs-20">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
