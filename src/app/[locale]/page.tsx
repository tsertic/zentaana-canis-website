import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <div className="text-center space-y-6">
        <Image
          src="/zc_logo2.svg"
          alt="Zentaana Canis"
          width={200}
          height={200}
          className="mx-auto"
          priority
        />
        <h1 className="font-display text-6xl font-bold text-primary-700 tracking-tight">
          Zentaana Canis
        </h1>
        <p className="font-accent text-2xl text-neutral-500 italic">
          {t("home.hero.subtitle")}
        </p>
        <div className="w-24 h-px bg-accent-500 mx-auto" />
        <p className="text-neutral-600 text-lg">{t("meta.description")}</p>
      </div>
    </main>
  );
}
