import Image from "next/image";
import { notFound } from "next/navigation";
import { Swirl } from "@/components/Swirl";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function InfoPage({ params }: PageProps<"/[lang]/informations">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const i = dict.info;
  const a = dict.alt;

  return (
    <>
      {/* Hero : le concept sur une image */}
      <section className="relative h-[64vh] min-h-[440px] w-full overflow-hidden">
        <Image
          src="/images/hero-info.jpg"
          alt={a.heroInfo}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-10 text-brioche md:px-20">
          <p className="italic text-miel">{i.conceptLabel}</p>
          <h1 className="mt-2 max-w-4xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-tight">
            {i.conceptText}
          </h1>
        </div>
      </section>

      {/* Adresse */}
      <section className="mx-auto grid max-w-[1440px] items-start gap-12 px-5 py-24 md:grid-cols-2 md:px-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden md:max-w-[480px]">
          <Image
            src="/images/salle.webp"
            alt={a.salle}
            fill
            sizes="(min-width: 768px) 35vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-right italic text-miel">{i.addressLabel}</p>
          <h2 className="text-right text-[clamp(2.5rem,5vw,4rem)] font-medium uppercase leading-none">
            {i.addressTitle}
          </h2>
          <p className="mt-14 text-2xl font-medium uppercase">{dict.common.city}</p>
          <p className="text-sm uppercase">{dict.common.address}</p>
          <blockquote className="relative mt-12 max-w-md pl-6 text-xl italic leading-snug">
            <span aria-hidden="true" className="absolute -left-1 -top-2 text-4xl not-italic text-miel">
              “
            </span>
            {i.addressText}
            <span aria-hidden="true" className="ml-1 align-bottom text-4xl not-italic leading-none text-miel">
              ”
            </span>
          </blockquote>
          <h3 className="mt-14 text-xl font-medium uppercase">{i.hoursLabel}</h3>
          <ul className="mt-3 space-y-1 text-sm uppercase italic">
            {i.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Histoire */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-20">
        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="italic text-miel">{i.storyLabel}</p>
            <h2 className="mt-1 max-w-xl text-[clamp(2.5rem,5vw,4rem)] font-medium uppercase leading-[0.95]">
              {i.storyTitle}
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-xl font-medium">{i.storySub}</p>
            <p className="mt-3 italic leading-snug">{i.storyText}</p>
          </div>
        </div>

        <div className="mt-14 grid items-start gap-6 md:grid-cols-[1fr_1.4fr_1fr]">
          <div className="relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/histoire-comptoir.webp"
                alt={a.histoireComptoir}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -top-10 right-0 flex size-20 items-center justify-center rounded-full bg-brioche text-espresso"
            >
              <Swirl className="size-12" strokeWidth={7} />
            </span>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden md:mt-28">
            <Image
              src="/images/histoire-lattes.webp"
              alt={a.histoireLattes}
              fill
              sizes="(min-width: 768px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square w-full overflow-hidden md:mt-14">
            <Image
              src="/images/histoire-terrasse.webp"
              alt={a.histoireTerrasse}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
