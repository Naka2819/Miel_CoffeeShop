import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

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
  const eyebrow = "pr-[0.04em] text-[20px] italic tracking-[-0.04em] text-miel md:ufs-30";

  return (
    <>
      {/* Mise en page inspirée de la page « About » de Sey Coffee : grande photo, texte centré
          en colonne étroite, photo pleine largeur, puis sections « surtitre + titre + texte ».
          Le concept est calé à gauche et l'adresse à droite, sur la grille de 1440 px. */}

      {/* Photo d'ouverture */}
      <section>
        <div className="relative mx-auto aspect-[4/3] overflow-hidden md:aspect-auto md:uw-1440 md:uh-720">
          <Image
            src="/images/hero-info.jpg"
            alt={a.heroInfo}
            fill
            sizes="(min-width: 768px) 1440px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[50%_62%]"
          />
        </div>
      </section>

      {/* Concept */}
      <section>
        <div className="mx-auto px-5 py-16 md:px-0 md:upy-120 md:uw-1440 md:upx-126">
          <p className={eyebrow}>{i.conceptLabel}</p>
          <h1 className="mt-3 text-[28px] font-bold leading-[1.05] tracking-[-0.04em] md:umt-20 md:uw-1000 md:ufs-50">
            {i.conceptText}
          </h1>
        </div>
      </section>

      {/* Photo pleine largeur de la grille */}
      <section>
        <div className="relative mx-auto aspect-[3/2] overflow-hidden md:aspect-auto md:uw-1440 md:uh-760">
          <Image
            src="/images/info-interieur.webp"
            alt={a.infoInterieur}
            fill
            sizes="(min-width: 768px) 1440px, 100vw"
            className="object-cover object-[50%_45%]"
          />
        </div>
      </section>

      {/* Adresse et horaires : le texte à droite, les infos pratiques en face, à gauche */}
      <section>
        <div className="mx-auto flex flex-col gap-10 px-5 py-16 md:flex-row-reverse md:items-end md:justify-between md:gap-0 md:px-0 md:upy-120 md:uw-1440 md:upx-126">
          <div className="text-right md:uw-582">
            <p className={eyebrow}>{i.addressLabel}</p>
            <h2 className="mt-3 whitespace-nowrap pr-[0.04em] text-[38px] font-bold uppercase leading-none tracking-[-0.04em] md:umt-20 md:ufs-60">
              {i.addressTitle}
            </h2>
            <p className="mt-6 pr-[0.04em] text-[19px] italic tracking-[-0.04em] md:umt-40 md:ufs-25">{i.addressText}</p>
          </div>

          <div className="flex flex-col gap-8 md:ugap-40">
            <div>
              <p className="text-[22px] font-bold uppercase tracking-[-0.04em] md:ufs-30">{dict.common.city}</p>
              <p className="mt-1 text-[15px] font-medium uppercase tracking-[-0.04em] md:umt-6 md:ufs-20">
                {dict.common.address}
              </p>
            </div>
            <div>
              <h3 className="text-[19px] font-bold uppercase tracking-[-0.04em] md:ufs-25">{i.hoursLabel}</h3>
              <ul className="mt-2 text-[15px] italic tracking-[-0.04em] md:umt-10 md:ufs-20">
                {i.hours.map((h) => (
                  <li key={h}>{hoursLine(h)}</li>
                ))}
              </ul>
            </div>
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
