export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <div className="text-center space-y-6">
        <h1 className="font-display text-6xl font-bold text-primary-700 tracking-tight">
          Zentaana Canis
        </h1>
        <p className="font-accent text-2xl text-neutral-500 italic">
          FCI 19/25
        </p>
        <div className="w-24 h-px bg-accent-500 mx-auto" />
        <p className="font-body text-neutral-600 text-lg">
          Projekt se gradi... 🐕
        </p>
      </div>
    </main>
  );
}
