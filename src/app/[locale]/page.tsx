import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <Image
          src="/images/zc_logo2.svg"
          alt="Zentaana Canis"
          width={180}
          height={180}
          className="mx-auto"
          priority
        />
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-700 tracking-tight">
          Zentaana Canis
        </h1>
        <p className="font-accent text-2xl text-neutral-500 italic">
          {t("home.hero.subtitle")}
        </p>
        <div className="w-24 h-px bg-accent-500 mx-auto" />
      </div>
    </section>
  );
}
