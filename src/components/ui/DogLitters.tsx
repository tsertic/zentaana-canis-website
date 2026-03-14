"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Litter, Locale } from "@/lib/types";
import { localeField } from "@/lib/locale";

type Props = {
  litters: Litter[];
  locale: Locale;
};

export default function DogLitters({ litters, locale }: Props) {
  const t = useTranslations("dogs");

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-8">
        {t("offspring")}
      </h2>

      <div className="space-y-3">
        {litters.map((litter, i) => {
          const name = localeField(litter, "name", locale);
          return (
            <motion.div
              key={litter._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={{
                  pathname: "/legla/[slug]",
                  params: { slug: litter.slug.current },
                }}
                className="flex items-center justify-between p-5 bg-white border border-neutral-200 hover:border-primary-300 transition-colors duration-300 group"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary-700 group-hover:text-primary-600 transition-colors">
                    {name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-neutral-400">
                    {litter.dateOfBirth && (
                      <span>
                        {new Date(litter.dateOfBirth).toLocaleDateString(
                          locale === "hr" ? "hr-HR" : "en-GB",
                        )}
                      </span>
                    )}
                    {litter.puppyCount && (
                      <span>
                        {litter.puppyCount}{" "}
                        {locale === "hr" ? "štenaca" : "puppies"}
                      </span>
                    )}
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-300 group-hover:text-primary-500 transition-all duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
