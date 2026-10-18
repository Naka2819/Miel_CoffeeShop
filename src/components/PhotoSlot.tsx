// Bloc provisoire : à remplacer par <Image> quand les photos finales sont dans /public/images.
export function PhotoSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-caramel text-sm text-espresso/60 ${className}`}
    >
      {label}
    </div>
  );
}
