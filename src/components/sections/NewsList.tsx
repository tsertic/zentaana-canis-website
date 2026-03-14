"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { News, Locale } from "@/lib/types";
import NewsFilter from "@/components/ui/NewsFilter";
import NewsCard from "@/components/ui/NewsCard";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  news: News[];
};

type FilterValue =
  | "all"
  | "shows"
  | "litters"
  | "results"
  | "health"
  | "general";

export default function NewsList({ news }: Props) {
  const t = useTranslations("news");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts: Record<FilterValue, number> = {
    all: news.length,
    shows: news.filter((n) => n.category === "shows").length,
    litters: news.filter((n) => n.category === "litters").length,
    results: news.filter((n) => n.category === "results").length,
    health: news.filter((n) => n.category === "health").length,
    general: news.filter((n) => n.category === "general").length,
  };

  const filtered =
    filter === "all" ? news : news.filter((n) => n.category === filter);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader subtitle={t("latest")} title={t("title")} />

        <div className="mb-12">
          <NewsFilter
            active={filter}
            onChange={setFilter}
            counts={counts}
            locale={locale}
          />
        </div>

        <motion.div layout className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <NewsCard
                  news={item}
                  locale={locale}
                  variant={i === 0 && filter === "all" ? "featured" : "default"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neutral-400 py-20 font-accent text-lg italic"
          >
            {locale === "hr"
              ? "Nema novosti u ovoj kategoriji"
              : "No news in this category"}
          </motion.p>
        )}
      </div>
    </section>
  );
}
