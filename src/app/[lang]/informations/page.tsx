import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

// Largeur ajoutée de chaque côté quand l'écran dépasse les 1440 px de la maquette.
const bleed = "max(0px, calc((100cqw - 1440px) / 2))";

// « Mardi – Dimanche | 08:00 – 17:00 » → jours en capitales ; « Lundi – fermé » → « LUNDI – fermé ».
function hoursLine(line: string) {
  const i = line.lastIndexOf(" – ");
  if (i === -1) return line.toUpperCase();
  return (
    <>
      {line.slice(0, i).toUpperCase()}
      {line.slice(i)}
    </>
  );
}

export default async function InfoPage({ params }: PageProps<"/[lang]/informations">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const i = dict.info;
  const a = dict.alt;

  // Retour à la ligne après la première phrase, comme dans la maquette.
  const storyBreak = i.storyText.indexOf(". ") + 1;
  const quote = "font-semibold text-[40px] leading-[1.2] text-miel md:ufs-60";

  return (
    <>
      {/* Hero : le concept sur une image */}
      <section className="relative">
        <div className="relative mx-auto h-[560px] md:h-auto md:uw-1440 md:uh-981">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ left: `calc(-1 * ${bleed})`, right: `calc(-1 * ${bleed})` }}
          >
            <div
              className="absolute inset-0 md:inset-auto md:ul-0 md:-ut-559 md:aspect-[1199/1427] md:w-(--w)"
              style={{ ["--w" as string]: `calc(1642 * var(--u) + 2 * ${bleed})` }}
            >
              <Image
                src="/images/hero-info.jpg"
                alt={a.heroInfo}
                fill
                sizes="(min-width: 768px) 115vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover object-[0%_60%]"
              />
            </div>
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:contents">
            <p className="text-[20px] italic tracking-[-0.04em] text-miel md:absolute md:ul-126 md:ut-662 md:ufs-30">
              {i.conceptLabel}
            </p>
            <h1 className="mt-2 text-[30px] font-bold leading-none tracking-[-0.04em] text-brioche md:absolute md:ul-126 md:ut-721 md:mt-0 md:uw-1188 md:ufs-60">
              {i.conceptText}
            </h1>
          </div>
        </div>
      </section>

      {/* Adresse */}
      <section className="relative">
        <div className="relative mx-auto flex flex-col gap-10 px-5 py-16 md:block md:p-0 md:uw-1440 md:uh-766">
          <div className="text-right md:contents">
            <p className="pr-[0.04em] text-[20px] italic tracking-[-0.04em] text-miel md:absolute md:ur-126 md:ut-80 md:ufs-30">
              {i.addressLabel}
            </p>
            <h2 className="pr-[0.04em] text-[38px] font-bold uppercase leading-none tracking-[-0.04em] md:absolute md:ur-126 md:ut-139 md:whitespace-nowrap md:ufs-60">
              {i.addressTitle}
            </h2>
          </div>
          <div className="relative order-first aspect-[505/558] w-full overflow-hidden md:absolute md:ul-126 md:ut-139 md:uw-505 md:uh-558">
            <div className="absolute left-0 top-[-16.16%] h-[120.67%] w-full">
              <Image src="/images/salle.webp" alt={a.salle} fill sizes="(min-width: 768px) 36vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="md:contents">
            <p className="text-[22px] font-bold uppercase tracking-[-0.04em] md:absolute md:ul-732 md:ut-249 md:ufs-30">
              {dict.common.city}
            </p>
            <p className="text-[15px] font-medium uppercase tracking-[-0.04em] md:absolute md:ul-732 md:ut-298 md:ufs-20">
              {dict.common.address}
            </p>
            <blockquote className="relative mt-12 ml-5 max-w-[582px] text-[19px] italic tracking-[-0.04em] md:absolute md:ul-732 md:ut-403 md:m-0 md:max-w-none md:uw-582 md:ufs-25">
              <span aria-hidden="true" className={`${quote} absolute -left-[0.4em] -top-[0.42em] md:-ul-21 md:-ut-22`}>
                “
              </span>
              {i.addressText}
              <span aria-hidden="true" className="relative">
                <span className={`${quote} absolute left-0 top-[-0.38em] inline-block rotate-180 md:-ul-1 md:-ut-20`}>“</span>
              </span>
            </blockquote>
            <h3 className="mt-10 text-[19px] font-bold uppercase tracking-[-0.04em] md:absolute md:ul-732 md:ut-582 md:mt-0 md:ufs-25">
              {i.hoursLabel}
            </h3>
            <ul className="mt-3 text-[15px] italic tracking-[-0.04em] md:contents md:ufs-20">
              {i.hours.map((h, idx) => (
                <li
                  key={h}
                  className={`md:absolute md:ul-732 md:whitespace-nowrap md:ufs-20 ${idx === 0 ? "md:ut-635" : "md:ut-671"}`}
                >
                  {hoursLine(h)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="relative">
        <div className="relative mx-auto px-5 pb-20 md:p-0 md:uw-1440 md:uh-949">
          <p className="text-[20px] italic tracking-[-0.04em] text-miel md:absolute md:ul-126 md:ut-80 md:ufs-30">
            {i.storyLabel}
          </p>
          <h2 className="max-w-[520px] text-[38px] font-bold uppercase leading-none tracking-[-0.04em] md:absolute md:ul-126 md:ut-139 md:max-w-none md:uw-520 md:ufs-60">
            {i.storyTitle}
          </h2>
          <div className="mt-8 md:contents md:text-right">
            <p className="text-[22px] font-bold tracking-[-0.04em] md:absolute md:ur-126 md:ut-139 md:whitespace-nowrap md:pr-[0.04em] md:ufs-30">
              {i.storySub}
            </p>
            <p className="mt-2 text-[18px] italic tracking-[-0.04em] md:absolute md:ur-126 md:ut-198 md:mt-0 md:pr-[0.04em] md:uw-481 md:ufs-25">
              {i.storyText.slice(0, storyBreak)}
              <br />
              {i.storyText.slice(storyBreak).trim()}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:contents">
            <div className="relative col-span-2 aspect-[348/531] w-3/4 overflow-hidden md:absolute md:aspect-auto md:ul-126 md:ut-338 md:uw-348 md:uh-531">
              <div className="absolute left-[-22.13%] top-0 h-full w-[122.13%]">
                <Image
                  src="/images/histoire-comptoir.webp"
                  alt={a.histoireComptoir}
                  fill
                  sizes="(min-width: 768px) 30vw, 75vw"
                  className="object-cover"
                />
              </div>
            </div>
            <Image
              src="/svg/swirl-badge.svg"
              alt=""
              width={136}
              height={136}
              className="absolute hidden md:block md:ul-406 md:ut-270 md:usize-136"
            />
            <div className="relative aspect-[402/315] overflow-hidden md:absolute md:aspect-auto md:ul-508 md:ut-554 md:uw-402 md:uh-315">
              <div className="absolute left-0 top-[-34.58%] h-[159.76%] w-full">
                <Image
                  src="/images/histoire-lattes.webp"
                  alt={a.histoireLattes}
                  fill
                  sizes="(min-width: 768px) 28vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative aspect-[370/462] overflow-hidden md:absolute md:aspect-auto md:ul-944 md:ut-407 md:uw-370 md:uh-462">
              <Image
                src="/images/histoire-terrasse.webp"
                alt={a.histoireTerrasse}
                fill
                sizes="(min-width: 768px) 26vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
