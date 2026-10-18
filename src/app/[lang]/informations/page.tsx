import { notFound } from "next/navigation";
import { PhotoSlot } from "@/components/PhotoSlot";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function InfoPage({ params }: PageProps<"/[lang]/informations">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const i = dict.info;

  return (
    <>
      {/* Hero : concept en grand sur une image */}
      <section className="relative">
        <PhotoSlot label={`${dict.common.photo} : hero`} className="h-[60vh] min-h-[420px] w-full" />
        <h1 className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-12 text-center text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-tight text-brioche [text-shadow:0_1px_12px_rgba(59,42,32,.6)]">
          {i.heroTitle}
        </h1>
      </section>

      {/* Adresse */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-2 md:px-20">
        <PhotoSlot label={`${dict.common.photo} : salle`} className="aspect-[4/5] w-full" />
        <div className="md:pl-6">
          <p className="text-right italic text-espresso/80">{i.addressLabel}</p>
          <h2 className="text-right text-6xl font-medium uppercase leading-none">{i.addressTitle}</h2>
          <p className="mt-12 text-2xl font-medium uppercase">{i.city}</p>
          <p className="text-sm uppercase">{dict.common.address}</p>
          <blockquote className="mt-10 text-xl italic">{i.addressText}</blockquote>
          <p className="mt-6 font-medium">{i.noBooking}</p>
          <h3 className="mt-10 text-xl font-medium uppercase">{i.hoursLabel}</h3>
          <ul className="mt-2 space-y-1 italic">
            {i.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rue+de+la+Clef+14+7000+Mons"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-cerise px-8 py-2 text-brioche hover:bg-espresso"
          >
            {dict.common.directions}
          </a>
        </div>
      </section>

      {/* Histoire */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-20">
        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="italic text-espresso/80">{i.storyLabel}</p>
            <h2 className="text-6xl font-medium uppercase leading-[0.95]">{i.storyTitle}</h2>
          </div>
          <div className="md:text-right">
            <p className="text-xl font-medium">{i.storySub}</p>
            <p className="mt-3 italic">{i.storyText}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <PhotoSlot label={`${dict.common.photo} : comptoir`} className="aspect-[3/4]" />
          <PhotoSlot label={`${dict.common.photo} : latte art`} className="aspect-[4/3] md:mt-24" />
          <PhotoSlot label={`${dict.common.photo} : terrasse`} className="aspect-[3/4] md:mt-12" />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-12">
          <p>{i.storyBy}</p>
          <p>{i.storyBy2}</p>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="bg-brioche px-5 pb-24 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-brush text-5xl text-miel">{i.practicalTitle}</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {i.practical.map((p) => (
              <li key={p} className="border-t border-espresso pt-3 text-lg">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
