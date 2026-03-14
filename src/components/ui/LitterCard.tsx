"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Litter, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField } from "@/lib/locale";

type Props = {
  litter: Litter;
  locale: Locale;
  index?: number;
};

const statusColors: Record<string, string> = {
  planned: "bg-neutral-400",
  expected: "bg-amber-400",
  born: "bg-blue-400",
  available: "bg-available",
  reserved: "bg-reserved",
  closed: "bg-neutral-500",
};

export default function LitterCard({ litter, locale, index = 0 }: Props) {
  const t = useTranslations("litters");
  const name = localeField(litter, "name", locale);
  const description = localeField(litter, "shortDescription", locale);

  const statusMap: Record<string, string> = {
    planned: t("planned"),
    expected: t("current"),
    born: t("current"),
    available: t("current"),
    reserved: t("current"),
    closed: t("past"),
  };

  const availableCount = (litter as any).availableCount || 0;

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
          pathname: "/legla/[slug]",
          params: { slug: litter.slug.current },
        }}
        className="group block"
      >
        <div className="relative overflow-hidden bg-neutral-100 border border-neutral-200 hover:border-primary-300 transition-colors duration-500">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto">
              {litter.mainImage ? (
                <Image
                  src={urlFor(litter.mainImage).width(600).height(450).url()}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={0.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                    />
                  </svg>
                </div>
              )}

              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wider uppercase text-white backdrop-blur-sm ${statusColors[litter.status]}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  {statusMap[litter.status]}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h3 className="font-display text-2xl font-semibold text-primary-800 group-hover:text-primary-600 transition-colors duration-300">
                {name}
              </h3>

              {(litter.sire || litter.dam) && (
                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                  {litter.sire && (
                    <span className="flex items-center gap-1">
                      <span className="text-blue-400">♂</span>
                      {litter.sire.name}
                    </span>
                  )}
                  {litter.sire && litter.dam && (
                    <span className="text-accent-500">×</span>
                  )}
                  {litter.dam && (
                    <span className="flex items-center gap-1">
                      <span className="text-rose-400">♀</span>
                      {litter.dam.name}
                    </span>
                  )}
                </div>
              )}

              {litter.dateOfBirth && (
                <p className="mt-3 text-sm text-neutral-400">
                  {t("born")}:{" "}
                  {new Date(litter.dateOfBirth).toLocaleDateString(
                    locale === "hr" ? "hr-HR" : "en-GB",
                  )}
                  {litter.puppyCount && (
                    <span>
                      {" "}
                      — {litter.puppyCount} {t("puppies")}
                    </span>
                  )}
                </p>
              )}

              {description && (
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}

              {litter.status === "available" && availableCount > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium tracking-wider uppercase self-start">
                  <span className="w-2 h-2 rounded-full bg-available animate-pulse" />
                  {availableCount} {t("available").toLowerCase()}
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 text-sm text-primary-600 group-hover:text-primary-800 transition-colors duration-300">
                <span className="uppercase tracking-[0.15em]">
                  {locale === "hr" ? "Pogledajte" : "View"}
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
        </div>
      </Link>
    </motion.div>
  );
}
