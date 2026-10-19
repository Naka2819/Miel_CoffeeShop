export function Marquee({ items }: { items: string[] }) {
  // Deux moitiés identiques : la piste glisse de -50 % puis recommence sans coupure.
  const half = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-miel py-3 text-espresso">
      <p className="sr-only">{items.join(" ")}</p>
      <div className="marquee-track flex w-max" aria-hidden="true">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0">
            {half.map((text, i) => (
              <span key={`${n}-${i}`} className="px-6 text-sm font-normal uppercase tracking-tight md:text-base">
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
