import { notFound } from "next/navigation";
import { menu } from "@/data/menu";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const m = dict.menuPage;

  return (
    <>
      <section className="bg-espresso px-5 pb-16 pt-12 md:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-brush text-[clamp(4.5rem,11vw,8rem)] leading-[0.9] text-miel">
            {m.title}
          </h1>
          <nav aria-label="Catégories" className="flex flex-wrap gap-2">
            {menu.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="rounded-full bg-brioche px-5 py-1.5 text-base hover:bg-miel"
              >
                {m.tabs[cat.id]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="bg-espresso px-5 pb-20 md:px-20">
        <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-[1fr_2fr]">
          <aside className="flex flex-col justify-between rounded-2xl bg-cerise p-6 text-brioche md:sticky md:top-4 md:h-[520px]">
            <div>
              <p className="font-brush text-6xl leading-none">Miel</p>
              <p className="text-lg italic">{dict.common.descriptor}</p>
            </div>
            <p className="text-xs uppercase leading-relaxed tracking-wider">
              {dict.common.hoursShort}
              <br />
              <br />
              Mons, Belgique
            </p>
          </aside>

          <div className="space-y-4">
            {menu.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                aria-labelledby={`${cat.id}-title`}
                className="scroll-mt-4 rounded-2xl bg-brioche p-6 md:p-8"
              >
                <div className="flex justify-between text-xs uppercase">
                  <span>{m.title}</span>
                  <span>{m.handle}</span>
                </div>
                <hr className="mt-2 border-espresso" />
                <h2 id={`${cat.id}-title`} className="mt-6 font-brush text-5xl text-cerise">
                  {cat.title[lang]}
                </h2>

                {cat.sections.map((s) => (
                  <div key={s.title.fr} className="mt-8">
                    <h3 className="text-lg font-medium uppercase">{s.title[lang]}</h3>
                    <ul className="mt-3 space-y-3">
                      {s.items.map((it) => (
                        <li key={it.name.fr}>
                          <div className="flex justify-between gap-4 uppercase">
                            <span>{it.name[lang]}</span>
                            <span>{it.price}</span>
                          </div>
                          {it.note && (
                            <p className="text-xs italic text-espresso/80">{it.note[lang]}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <p className="mt-8 text-sm uppercase">{cat.extras[lang]}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
