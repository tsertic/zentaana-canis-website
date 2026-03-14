"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { News, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField } from "@/lib/locale";

type Props = {
  news: News;
  locale: Locale;
  index?: number;
  variant?: "default" | "featured";
};

const categoryColors: Record<string, string> = {
  shows: "text-amber-600 bg-amber-50 border-amber-200",
  litters: "text-emerald-600 bg-emerald-50 border-emerald-200",
  results: "text-blue-600 bg-blue-50 border-blue-200",
  health: "text-rose-600 bg-rose-50 border-rose-200",
  general: "text-neutral-600 bg-neutral-100 border-neutral-200",
};

export default function NewsCard({
  news,
  locale,
  index = 0,
  variant = "default",
}: Props) {
  const t = useTranslations();
  const title = localeField(news, "title", locale);
  const excerpt = localeField(news, "excerpt", locale);

  const categoryLabels: Record<string, string> = {
    shows: locale === "hr" ? "Izložbe" : "Shows",
    litters: locale === "hr" ? "Legla" : "Litters",
    results: locale === "hr" ? "Rezultati" : "Results",
    health: locale === "hr" ? "Zdravlje" : "Health",
    general: locale === "hr" ? "Općenito" : "General",
  };

  const formattedDate = new Date(news.publishedAt).toLocaleDateString(
    locale === "hr" ? "hr-HR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <Link
          href={{
            pathname: "/novosti/[slug]",
            params: { slug: news.slug.current },
          }}
          className="group block"
        >
          <div className="grid md:grid-cols-2 gap-0 bg-white border border-neutral-200 hover:border-primary-300 overflow-hidden transition-colors duration-500">
            <div className="relative aspect-[16/10] md:aspect-auto">
              {news.mainImage ? (
                <Image
                  src={urlFor(news.mainImage).width(800).height(500).url()}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                  <span className="text-4xl">📰</span>
                </div>
              )}
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider border ${categoryColors[news.category]}`}
                >
                  {categoryLabels[news.category]}
                </span>
                <span className="text-xs text-neutral-400">
                  {formattedDate}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary-800 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
                {title}
              </h3>
              {excerpt && (
                <p className="mt-4 text-neutral-600 leading-relaxed line-clamp-3">
                  {excerpt}
                </p>
              )}
              <div className="mt-6 flex items-center gap-2 text-sm text-primary-600 group-hover:text-primary-800 transition-colors duration-300">
                <span className="uppercase tracking-[0.15em]">
                  {t("home.news.readMore")}
                </span>
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
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={{
          pathname: "/novosti/[slug]",
          params: { slug: news.slug.current },
        }}
        className="group block h-full"
      >
        <div className="h-full bg-white border border-neutral-200 hover:border-primary-300 overflow-hidden transition-colors duration-500">
          <div className="relative aspect-[16/10] overflow-hidden">
            {news.mainImage ? (
              <Image
                src={urlFor(news.mainImage).width(600).height(375).url()}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                <span className="text-3xl">📰</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider border backdrop-blur-sm ${categoryColors[news.category]}`}
              >
                {categoryLabels[news.category]}
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs text-neutral-400 mb-3">{formattedDate}</p>
            <h3 className="font-display text-lg font-semibold text-primary-800 group-hover:text-primary-600 transition-colors duration-300 leading-snug line-clamp-2">
              {title}
            </h3>
            {excerpt && (
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed line-clamp-2">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
