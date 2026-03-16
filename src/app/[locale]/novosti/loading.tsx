import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function NewsLoading() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-4 w-24 bg-neutral-200 animate-pulse mx-auto mb-4" />
          <div className="h-10 w-48 bg-neutral-200 animate-pulse mx-auto mb-6" />
          <div className="h-px w-12 bg-neutral-200 mx-auto" />
        </div>
        <div className="space-y-8">
          <SkeletonBlock className="h-72 w-full" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
