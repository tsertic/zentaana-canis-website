"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Litter, Locale } from "@/lib/types";
import SectionHeader from "@/components/ui/SectionHeader";
import LitterCard from "@/components/ui/LitterCard";

type Props = {
  litters: Litter[];
};

export default function CurrentLitters({ litters }: Props) {
  const t = useTranslations("home.litters");
  const locale = useLocale() as Locale;

  if (!litters || litters.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader subtitle="FCI 19/25" title={t("title")} />

        <div className="space-y-8">
          {litters.map((litter, i) => (
            <LitterCard
              key={litter._id}
              litter={litter}
              locale={locale}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/legla"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary-600 hover:text-primary-800 transition-colors duration-300 group"
          >
            <span>{locale === "hr" ? "Sva legla" : "All litters"}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
