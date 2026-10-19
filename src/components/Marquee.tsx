export function Marquee({ items }: { items: string[] }) {
  // Deux moitiés identiques : la piste glisse de -50 % puis recommence sans coupure.
  const half = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden bg-miel py-2.5 text-espresso md:py-0 md:uh-48">
      <p className="sr-only">{items.join(" ")}</p>
      <div className="marquee-track flex w-max md:absolute md:ul-14 md:ut-11" aria-hidden="true">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0">
            {half.map((text, i) => (
              <span
                key={`${n}-${i}`}
                className="whitespace-nowrap pr-[calc(24px+0.04em)] text-[15px] font-medium uppercase tracking-[-0.04em] md:pr-[calc(30*var(--u)+0.04em)] md:ufs-20"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
