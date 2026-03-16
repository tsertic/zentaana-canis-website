export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-neutral-200 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-primary-600 rounded-full animate-spin" />
        </div>
        <p className="text-sm text-neutral-400 uppercase tracking-wider">
          Učitavanje...
        </p>
      </div>
    </div>
  );
}
