"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { GalleryAlbum, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField } from "@/lib/locale";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  albums: GalleryAlbum[];
};

type FilterValue =
  | "all"
  | "shows"
  | "puppies"
  | "everyday"
  | "training"
  | "other";

const categoryLabels: Record<FilterValue, { hr: string; en: string }> = {
  all: { hr: "Sve", en: "All" },
  shows: { hr: "Izložbe", en: "Shows" },
  puppies: { hr: "Štenad", en: "Puppies" },
  everyday: { hr: "Svakodnevica", en: "Everyday" },
  training: { hr: "Trening", en: "Training" },
  other: { hr: "Ostalo", en: "Other" },
};

export default function GalleryGrid({ albums }: Props) {
  const t = useTranslations("gallery");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = Object.fromEntries(
    Object.keys(categoryLabels).map((key) => [
      key,
      key === "all"
        ? albums.length
        : albums.filter((a) => a.category === key).length,
    ]),
  ) as Record<FilterValue, number>;

  const filtered =
    filter === "all" ? albums : albums.filter((a) => a.category === filter);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader subtitle="Zentaana Canis" title={t("title")} />

        <div className="flex items-center justify-center gap-1 flex-wrap mb-12">
          {(Object.keys(categoryLabels) as FilterValue[]).map((key) => {
            if (key !== "all" && counts[key] === 0) return null;

            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`relative px-4 py-2.5 text-sm uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  filter === key
                    ? "text-primary-700"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <span>
                  {locale === "hr"
                    ? categoryLabels[key].hr
                    : categoryLabels[key].en}
                </span>
                <span className="ml-1 text-xs">({counts[key]})</span>
                {filter === key && (
                  <motion.div
                    layoutId="gallery-filter-underline"
                    className="absolute bottom-0 left-2 right-2 h-px bg-primary-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((album, i) => {
              const title = localeField(album, "title", locale);
              const imageCount = (album as any).imageCount || 0;

              return (
                <motion.div
                  key={album._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <AlbumCard
                    album={album}
                    title={title}
                    imageCount={imageCount}
                    locale={locale}
                    slug={album.slug.current}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neutral-400 py-20 font-accent text-lg italic"
          >
            {locale === "hr"
              ? "Nema albuma u ovoj kategoriji"
              : "No albums in this category"}
          </motion.p>
        )}
      </div>
    </section>
  );
}

function AlbumCard({
  album,
  title,
  imageCount,
  locale,
  slug,
}: {
  album: GalleryAlbum;
  title: string;
  imageCount: number;
  locale: Locale;
  slug: string;
}) {
  const cat =
    categoryLabels[album.category as FilterValue] || categoryLabels.other;

  return (
    <Link
      href={{ pathname: "/galerija/[slug]", params: { slug } }}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        {album.coverImage ? (
          <Image
            src={urlFor(album.coverImage).width(600).height(450).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
            <span className="text-4xl">📸</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4">
          <span className="inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white bg-primary-800/60 backdrop-blur-sm">
            {locale === "hr" ? cat.hr : cat.en}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <p className="text-white text-sm">
            {imageCount} {locale === "hr" ? "fotografija" : "photos"}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-display text-xl font-semibold text-primary-800 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        {album.date && (
          <p className="text-xs text-neutral-400">
            {new Date(album.date).toLocaleDateString(
              locale === "hr" ? "hr-HR" : "en-GB",
            )}
          </p>
        )}
      </div>
    </Link>
  );
}
