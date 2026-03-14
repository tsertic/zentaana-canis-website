"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { News, Locale } from "@/lib/types";
import SectionHeader from "@/components/ui/SectionHeader";
import NewsCard from "@/components/ui/NewsCard";

type Props = {
  news: News[];
};

export default function LatestNews({ news }: Props) {
  const t = useTranslations("home.news");
  const locale = useLocale() as Locale;

  if (!news || news.length === 0) return null;

  const featured = news[0];
  const rest = news.slice(1);

  return (
    <section className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          subtitle={t("title")}
          title={locale === "hr" ? "Što je novo?" : "What's new?"}
        />

        <div className="space-y-8">
          <NewsCard
            news={featured}
            locale={locale}
            index={0}
            variant="featured"
          />

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((item, i) => (
                <NewsCard
                  key={item._id}
                  news={item}
                  locale={locale}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/novosti"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary-600 hover:text-primary-800 transition-colors duration-300 group"
          >
            <span>{locale === "hr" ? "Sve novosti" : "All news"}</span>
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
