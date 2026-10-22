import Image from "next/image";
import { notFound } from "next/navigation";
import { MenuPreview } from "@/components/MenuPreview";
import { menu, type MenuSection } from "@/data/menu";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

// Mesures de la frame Figma « menu » (px) : titre de rubrique 50 px (boîte 65),
// lignes 35/25 px (boîte 46), 30 px sous le titre, 40 px entre les lignes, 80 px entre rubriques.
function ItemList({
  section,
  lang,
  className = "",
  priceRight = "md:uw-1190",
}: {
  section: MenuSection;
  lang: Locale;
  className?: string;
  priceRight?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-[28px] font-bold uppercase md:uh-65 md:ufs-50">{section.title[lang]}</h3>
      <ul className={`mt-4 flex flex-col gap-4 md:umt-30 md:ugap-40 ${priceRight}`}>
        {section.items.map((it) => (
          <li key={it.name.fr} data-photo={it.photo} className="flex items-baseline justify-between gap-4 md:uh-46">
            <span className="text-[19px] md:ufs-35">
              {it.name[lang]}{" "}
              {it.note && <span className="text-[14px] md:ufs-25">({it.note[lang]})</span>}
            </span>
            <span className="shrink-0 text-[19px] font-bold md:ufs-35">{it.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Carré brun : les quatre phrases font le tour du cadre, la spirale du logo au centre.
function Badge({ phrases, lang }: { phrases: string[]; lang: Locale }) {
  const [a, b, c, d] = phrases;
  // Les phrases anglaises sont plus longues : on réduit le corps pour qu'elles tiennent dans le cadre.
  const text = `whitespace-nowrap text-miel tracking-[-0.02em] ${lang === "fr" ? "ufs-26" : "ufs-23"}`;
  const dot = <Image src="/svg/dot.svg" alt="" width={12} height={12} className="shrink-0 usize-12" />;
  return (
    <div aria-hidden="true" className="badge-scale relative usize-482 shrink-0 bg-espresso">
      <div className="absolute ul-30 ut-10 flex items-center ugap-9">
        <span className={text}>{a}</span>
        {dot}
        <span className={text}>{b}</span>
      </div>
      <div className="absolute ul-35 ut-438 flex items-center ugap-9">
        <span className={`${text} rotate-180`}>{a}</span>
        {dot}
        <span className={`${text} rotate-180`}>{b}</span>
      </div>
      <div className="absolute ul-438 ut-49 flex flex-col items-center ugap-9">
        <span className={`${text} [writing-mode:vertical-rl]`}>{c}</span>
        {dot}
        <span className={`${text} [writing-mode:vertical-rl]`}>{d}</span>
      </div>
      <div className="absolute ul-10 ut-49 flex flex-col items-center ugap-9">
        <span className={`${text} rotate-180 [writing-mode:vertical-rl]`}>{d}</span>
        {dot}
        <span className={`${text} rotate-180 [writing-mode:vertical-rl]`}>{c}</span>
      </div>
      <Image src="/svg/menu-badge-swirl-1.svg" alt="" width={216} height={222} className="absolute ul-133 ut-130 uw-216 uh-222" />
      <Image src="/svg/menu-badge-swirl-2.svg" alt="" width={167} height={168} className="absolute ul-156 ut-157 uw-167 uh-168" />
      <Image src="/svg/menu-badge-swirl-3.svg" alt="" width={110} height={117} className="absolute ul-186 ut-186 uw-110 uh-117" />
    </div>
  );
}

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const photos = menu.flatMap((cat) => cat.sections.flatMap((s) => s.items.map((it) => it.photo)));

  return (
    <MenuPreview photos={photos}>
    <div className="overflow-x-clip md:upt-20">
      {menu.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          aria-labelledby={`${cat.id}-title`}
          className="relative scroll-mt-4"
        >
          <div
            className={`relative mx-auto px-5 pb-20 pt-12 md:px-0 md:upt-80 md:uw-1440 ${
              cat.id === "coffee" ? "md:upb-130" : "md:upb-80"
            }`}
          >
            {cat.id === "brunch" && (
              <Image
                src="/svg/swirl-brunch.svg"
                alt=""
                width={652}
                height={790}
                className="pointer-events-none absolute hidden max-w-none md:block md:ul-788 md:ut-230 md:uw-652 md:uh-790"
              />
            )}

            <h1
              id={`${cat.id}-title`}
              className={`relative text-[64px] font-bold italic uppercase text-miel md:ul-126 md:ufs-115 ${
                cat.id === "coffee" ? "md:uh-140" : ""
              }`}
            >
              {cat.title[lang]}
            </h1>

            <div className="relative mt-8 flex flex-col gap-14 md:umt-70 md:ugap-80">
              {cat.sections.map((s, idx) => {
                if (cat.id === "coffee" && idx === 0) {
                  return (
                    <div key={s.title.fr} className="flex flex-col gap-10 md:flex-row md:items-start md:ugap-210">
                      <ItemList section={s} lang={lang} priceRight="md:uw-623" className="md:ul-126 md:relative" />
                      <Badge phrases={dict.menuPage.badge} lang={lang} />
                    </div>
                  );
                }
                if (cat.id === "sweets" && idx === 1) {
                  return (
                    <div
                      key={s.title.fr}
                      className="flex flex-col gap-10 md:relative md:block md:-umt-70 md:uh-521"
                    >
                      <div className="relative mr-10 md:absolute md:ul-126 md:ut-68 md:mr-0">
                        <div className="relative aspect-[430/483] w-full max-w-[430px] overflow-hidden md:uw-430 md:uh-483 md:max-w-none">
                          <div className="absolute left-[-12.33%] top-[-40.53%] h-[150.06%] w-[112.33%]">
                            <Image
                              src="/images/menu-gateaux.jpg"
                              alt={dict.alt.gateaux}
                              fill
                              sizes="(min-width: 768px) 34vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/svg/swirl-badge.svg"
                        alt=""
                        width={136}
                        height={136}
                        className="absolute hidden md:block md:ul-488 md:ut-0 md:usize-136"
                      />
                      <ItemList section={s} lang={lang} priceRight="md:uw-697" className="md:absolute md:ul-619 md:ut-110" />
                    </div>
                  );
                }
                return <ItemList key={s.title.fr} section={s} lang={lang} className="md:relative md:ul-126" />;
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
    </MenuPreview>
  );
}
