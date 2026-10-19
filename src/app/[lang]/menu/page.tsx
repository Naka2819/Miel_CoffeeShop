import Image from "next/image";
import { notFound } from "next/navigation";
import { Swirl } from "@/components/Swirl";
import { menu, type MenuSection } from "@/data/menu";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

function ItemList({ section, lang }: { section: MenuSection; lang: Locale }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold uppercase">{section.title[lang]}</h3>
      <ul className="mt-5 space-y-3">
        {section.items.map((it) => (
          <li key={it.name.fr} className="flex items-baseline justify-between gap-6 text-lg">
            <span>
              <span className="font-normal">{it.name[lang]}</span>
              {it.note && <span className="ml-1.5 text-sm"> ({it.note[lang]})</span>}
            </span>
            <span className="font-semibold">{it.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Carré brun avec la phrase qui fait le tour du cadre.
function Badge({ phrases }: { phrases: string[] }) {
  const [a, b, c, d] = phrases;
  const dot = <span className="mx-3 inline-block size-1.5 rounded-full bg-miel align-middle" />;
  const horizontal = (
    <>
      {a}
      {dot}
      {b}
    </>
  );
  const vertical = (
    <>
      {c}
      {dot}
      {d}
    </>
  );
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[300px] bg-espresso text-xs text-miel [container-type:inline-size] md:mx-0 md:ml-auto"
    >
      <span className="absolute inset-x-0 top-3 whitespace-nowrap text-center">{horizontal}</span>
      <span className="absolute inset-x-0 bottom-3 rotate-180 whitespace-nowrap text-center">
        {horizontal}
      </span>
      <span
        className="absolute left-1/2 top-1/2 w-[100cqw] whitespace-nowrap text-center"
        style={{ transform: "translate(-50%, -50%) rotate(90deg) translateY(-43cqw)" }}
      >
        {vertical}
      </span>
      <span
        className="absolute left-1/2 top-1/2 w-[100cqw] whitespace-nowrap text-center"
        style={{ transform: "translate(-50%, -50%) rotate(-90deg) translateY(-43cqw)" }}
      >
        {vertical}
      </span>
      <Swirl className="absolute inset-0 m-auto size-[62%]" strokeWidth={5} />
    </div>
  );
}

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-[1440px] overflow-x-clip px-5 pb-12 pt-10 md:px-20">
      {menu.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          aria-labelledby={`${cat.id}-title`}
          className="relative scroll-mt-4 pb-24"
        >
          {cat.id === "brunch" && (
            <>
              <Swirl className="pointer-events-none absolute -right-10 top-24 -z-0 size-72 text-miel/20" strokeWidth={3} />
              <Swirl className="pointer-events-none absolute right-24 top-72 -z-0 size-64 text-miel/15" strokeWidth={3} />
            </>
          )}

          <h1 id={`${cat.id}-title`} className="display relative text-[clamp(4.5rem,11vw,8.5rem)]">
            {cat.title[lang]}
          </h1>

          <div className="relative mt-12 space-y-16">
            {cat.sections.map((s, idx) => {
              if (cat.id === "coffee" && idx === 0) {
                return (
                  <div key={s.title.fr} className="grid items-start gap-10 md:grid-cols-[1fr_300px]">
                    <ItemList section={s} lang={lang} />
                    <Badge phrases={dict.menuPage.badge} />
                  </div>
                );
              }
              if (cat.id === "sweets" && idx === 1) {
                return (
                  <div key={s.title.fr} className="grid items-start gap-10 md:grid-cols-[320px_1fr]">
                    <div className="relative">
                      <div className="relative aspect-[2/3] w-full overflow-hidden">
                        <Image
                          src="/images/menu-gateaux.jpg"
                          alt={dict.alt.gateaux}
                          fill
                          sizes="(min-width: 768px) 320px, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute -right-8 -top-8 flex size-20 items-center justify-center rounded-full bg-brioche text-espresso"
                      >
                        <Swirl className="size-12" strokeWidth={7} />
                      </span>
                    </div>
                    <ItemList section={s} lang={lang} />
                  </div>
                );
              }
              return <ItemList key={s.title.fr} section={s} lang={lang} />;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
