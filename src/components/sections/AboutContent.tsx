"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteSettings, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localePortableText, localeField } from "@/lib/locale";
import SectionHeader from "@/components/ui/SectionHeader";
import RichText from "@/components/ui/RichText";
type Props = {
  settings: SiteSettings;
  locale: Locale;
};

export default function AboutContent({ settings, locale }: Props) {
  const t = useTranslations("about");
  const aboutText = localePortableText(settings, "aboutText", locale);
  const aboutShort = localeField(settings, "aboutShort", locale);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader subtitle="Zentaana Canis" title={t("title")} />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {settings.aboutImages && settings.aboutImages.length > 0 ? (
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={urlFor(settings.aboutImages[0])
                      .width(800)
                      .height(600)
                      .url()}
                    alt="Zentaana Canis"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {settings.aboutImages.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {settings.aboutImages.slice(1, 3).map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                        className="relative aspect-square overflow-hidden bg-neutral-200"
                      >
                        <Image
                          src={urlFor(img).width(400).height(400).url()}
                          alt={img.caption || `Zentaana Canis ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 flex items-center justify-center">
                <Image
                  src="/images/zc_logo2.svg"
                  alt="Zentaana Canis"
                  width={200}
                  height={200}
                  className="opacity-20"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="flex items-center gap-6 mb-8">
              {settings.fciNumber && (
                <div className="px-4 py-3 border border-accent-300 bg-accent-500/5">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    FCI
                  </p>
                  <p className="font-display text-xl font-bold text-primary-800">
                    {settings.fciNumber}
                  </p>
                </div>
              )}
              {settings.foundedYear && (
                <div className="px-4 py-3 border border-neutral-200">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    {locale === "hr" ? "Osnovano" : "Founded"}
                  </p>
                  <p className="font-display text-xl font-bold text-primary-800">
                    {settings.foundedYear}
                  </p>
                </div>
              )}
            </div>

            {aboutShort && (
              <p className="text-lg text-neutral-600 leading-relaxed mb-8 font-accent italic">
                {aboutShort}
              </p>
            )}

            {aboutText && <RichText value={aboutText} />}
          </motion.div>
        </div>

        {settings.breeds && settings.breeds.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-10 text-center">
              {locale === "hr" ? "Naše pasmine" : "Our Breeds"}
            </h2>
            <div
              className={`grid gap-8 ${
                settings.breeds.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : settings.breeds.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {settings.breeds.map((breed, i) => {
                const breedName = localeField(breed, "name", locale);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
                      {breed.image ? (
                        <Image
                          src={urlFor(breed.image).width(500).height(667).url()}
                          alt={breedName}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                          <span className="text-5xl">🐕</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-primary-800">
                      {breedName}
                    </h3>
                    {breed.fciGroup && (
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mt-1">
                        FCI {locale === "hr" ? "Grupa" : "Group"}{" "}
                        {breed.fciGroup}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </article>
  );
}
