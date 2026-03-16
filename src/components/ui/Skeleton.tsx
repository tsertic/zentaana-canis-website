export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-neutral-200 ${className}`} />;
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-neutral-200 animate-pulse"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-neutral-200" />
      <div className="mt-4 space-y-2">
        <div className="h-5 bg-neutral-200 w-3/4" />
        <div className="h-4 bg-neutral-200 w-1/2" />
      </div>
    </div>
  );
}
