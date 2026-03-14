"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PortableText } from "@portabletext/react";
import { News, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField, localePortableText } from "@/lib/locale";
import DogGallery from "@/components/ui/DogGallery";

type Props = {
  news: News;
  locale: Locale;
};

const categoryLabels: Record<
  string,
  { hr: string; en: string; color: string }
> = {
  shows: {
    hr: "Izložbe",
    en: "Shows",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  litters: {
    hr: "Legla",
    en: "Litters",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  results: {
    hr: "Rezultati",
    en: "Results",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  health: {
    hr: "Zdravlje",
    en: "Health",
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
  general: {
    hr: "Općenito",
    en: "General",
    color: "text-neutral-600 bg-neutral-100 border-neutral-200",
  },
};

export default function NewsArticle({ news, locale }: Props) {
  const t = useTranslations("news");
  const title = localeField(news, "title", locale);
  const body = localePortableText(news, "body", locale);
  const category = categoryLabels[news.category] || categoryLabels.general;

  const formattedDate = new Date(news.publishedAt).toLocaleDateString(
    locale === "hr" ? "hr-HR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <article className="pt-28 pb-24 md:pt-36 md:pb-32 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/novosti"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-600 transition-colors duration-300"
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
            <span className="uppercase tracking-wider">{t("title")}</span>
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider border ${category.color}`}
            >
              {locale === "hr" ? category.hr : category.en}
            </span>
            <span className="text-sm text-neutral-400">{formattedDate}</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-800 tracking-tight leading-tight">
            {title}
          </h1>
        </motion.header>

        {news.mainImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[16/9] overflow-hidden bg-neutral-200 mb-12"
          >
            <Image
              src={urlFor(news.mainImage).width(1200).height(675).url()}
              alt={news.mainImage.alt || title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </motion.div>
        )}

        {body && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-neutral prose-lg max-w-none
              prose-headings:font-display prose-headings:text-primary-800 prose-headings:tracking-tight
              prose-p:text-neutral-600 prose-p:leading-relaxed
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-800
              prose-img:rounded-none
              prose-strong:text-neutral-800"
          >
            <PortableText value={body} />
          </motion.div>
        )}

        {news.gallery && news.gallery.length > 0 && (
          <div className="mt-16">
            <DogGallery images={news.gallery} dogName={title} />
          </div>
        )}

        {news.relatedDogs && news.relatedDogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-12 border-t border-neutral-200"
          >
            <h3 className="font-display text-xl font-semibold text-primary-800 mb-6">
              {locale === "hr" ? "Povezani psi" : "Related Dogs"}
            </h3>
            <div className="flex flex-wrap gap-3">
              {news.relatedDogs.map((dog) => (
                <Link
                  key={dog._id}
                  href={{
                    pathname: "/nasi-psi/[slug]",
                    params: { slug: dog.slug.current },
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-primary-300 transition-colors duration-300 group"
                >
                  {dog.mainImage && (
                    <div className="relative w-8 h-8 overflow-hidden bg-neutral-200 rounded-full">
                      <Image
                        src={urlFor(dog.mainImage).width(64).height(64).url()}
                        alt={dog.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium text-primary-700 group-hover:text-primary-600 transition-colors">
                    {dog.name}
                  </span>
                  {dog.titles && (
                    <span className="text-xs text-neutral-400">
                      ({dog.titles})
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {news.relatedLitter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mt-8 ${!news.relatedDogs?.length ? "pt-12 border-t border-neutral-200" : ""}`}
          >
            <h3 className="font-display text-xl font-semibold text-primary-800 mb-4">
              {locale === "hr" ? "Povezano leglo" : "Related Litter"}
            </h3>
            <Link
              href={{
                pathname: "/legla/[slug]",
                params: { slug: news.relatedLitter.slug.current },
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-primary-300 transition-colors duration-300 text-sm font-medium text-primary-700 hover:text-primary-600 group"
            >
              <span>🐾</span>
              <span>{news.relatedLitter.name_hr}</span>
              <svg
                className="w-4 h-4 text-neutral-300 group-hover:text-primary-500 transition-all duration-300 group-hover:translate-x-1"
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
        )}
      </div>
    </article>
  );
}
