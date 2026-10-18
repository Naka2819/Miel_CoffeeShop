export function Marquee({ words }: { words: string[] }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div
      className="overflow-hidden bg-miel py-3 text-espresso"
      role="presentation"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0">
            {row.map((w, i) => (
              <span
                key={`${n}-${i}`}
                className="flex items-center gap-6 pr-6 text-2xl font-medium uppercase"
              >
                {w}
                <span className="size-2 rounded-full bg-espresso" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
