import { SkeletonCard } from "@/components/ui/Skeleton";

export default function DogsLoading() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-4 w-32 bg-neutral-200 animate-pulse mx-auto mb-4" />
          <div className="h-10 w-64 bg-neutral-200 animate-pulse mx-auto mb-6" />
          <div className="h-px w-12 bg-neutral-200 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
