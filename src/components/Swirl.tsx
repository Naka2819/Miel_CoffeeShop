// Motif "empreinte" : anneaux concentriques irréguliers, dessinés en SVG.
// À remplacer par le SVG exact du logo quand tu l'as exporté de ta maquette.
function ring(radius: number, phase: number) {
  const steps = 72;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.1 * Math.sin(3 * t + phase) +
      0.06 * Math.sin(5 * t + phase * 1.7) +
      0.03 * Math.sin(8 * t - phase);
    const r = radius * wobble;
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)},${(50 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

const paths = [44, 33, 22, 12].map((r, i) => ring(r, i * 0.9));

export function Swirl({
  className = "",
  strokeWidth = 6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
