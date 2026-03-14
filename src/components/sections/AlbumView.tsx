"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { GalleryAlbum, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField } from "@/lib/locale";

type Props = {
  album: GalleryAlbum;
  locale: Locale;
};

export default function AlbumView({ album, locale }: Props) {
  const t = useTranslations("gallery");
  const [selected, setSelected] = useState<number | null>(null);
  const title = localeField(album, "title", locale);

  return (
    <article className="pt-28 pb-24 md:pt-36 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/galerija"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-800 tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            {album.date && (
              <span className="text-sm text-neutral-400">
                {new Date(album.date).toLocaleDateString(
                  locale === "hr" ? "hr-HR" : "en-GB",
                )}
              </span>
            )}
            <span className="text-sm text-neutral-400">
              {album.images.length} {locale === "hr" ? "fotografija" : "photos"}
            </span>
          </div>
          <div className="mt-4 h-px w-16 bg-accent-500" />
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {album.images.map((img, i) => {
            const caption =
              locale === "hr"
                ? img.caption_hr || img.caption_en || ""
                : img.caption_en || img.caption_hr || "";

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                onClick={() => setSelected(i)}
                className="relative w-full overflow-hidden bg-neutral-200 cursor-pointer group break-inside-avoid"
              >
                <Image
                  src={urlFor(img).width(500).url()}
                  alt={caption || `${title} ${i + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
                {caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs">{caption}</p>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelected(null)}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(
                    selected > 0 ? selected - 1 : album.images.length - 1,
                  );
                }}
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(
                    selected < album.images.length - 1 ? selected + 1 : 0,
                  );
                }}
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  className="w-10 h-10"
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
              </button>

              <motion.div
                key={selected}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[85vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={urlFor(album.images[selected]).width(1400).url()}
                  alt={`${title} ${selected + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                {selected + 1} / {album.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
