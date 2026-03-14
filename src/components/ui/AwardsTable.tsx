"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  awards: Award[];
  locale: Locale;
};

export default function AwardsTable({ awards, locale }: Props) {
  const t = useTranslations("dogs");

  const sorted = [...awards].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-8">
        {t("awards")}
      </h2>

      <div className="space-y-4">
        {sorted.map((award, i) => (
          <motion.div
            key={award._key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex items-start gap-4 p-5 bg-white border border-neutral-200 hover:border-accent-300 transition-colors duration-300"
          >
            {award.photo && (
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-neutral-100">
                <Image
                  src={urlFor(award.photo).width(128).height(128).url()}
                  alt={award.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary-700">
                    {award.title}
                  </h3>
                  {award.show && (
                    <p className="text-sm text-neutral-600 mt-0.5">
                      {award.show}
                    </p>
                  )}
                </div>
                {award.date && (
                  <span className="text-xs text-neutral-400 flex-shrink-0 mt-1">
                    {new Date(award.date).toLocaleDateString(
                      locale === "hr" ? "hr-HR" : "en-GB",
                    )}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                {award.judge && (
                  <span>
                    {locale === "hr" ? "Sudac" : "Judge"}: {award.judge}
                  </span>
                )}
                {award.location && <span>{award.location}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
