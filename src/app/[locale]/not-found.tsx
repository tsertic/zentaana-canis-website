import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-neutral-50">
      <div className="text-center px-6">
        <p className="font-accent text-8xl md:text-9xl font-bold text-primary-100">
          404
        </p>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-primary-800 -mt-4">
          Stranica nije pronađena
        </h1>
        <p className="mt-4 text-neutral-500 max-w-md mx-auto">
          Stranica koju tražite ne postoji ili je premještena.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white text-sm uppercase tracking-[0.2em] hover:bg-primary-800 transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span>Početna</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
