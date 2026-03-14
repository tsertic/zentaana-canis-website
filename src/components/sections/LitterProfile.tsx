"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PortableText } from "@portabletext/react";
import { Litter, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField, localePortableText } from "@/lib/locale";
import DogGallery from "@/components/ui/DogGallery";
import PuppyCard from "@/components/ui/PuppyCard";

type Props = {
  litter: Litter;
  locale: Locale;
};

const statusConfig: Record<
  string,
  { color: string; label_hr: string; label_en: string }
> = {
  planned: {
    color: "bg-neutral-400",
    label_hr: "Planirano",
    label_en: "Planned",
  },
  expected: {
    color: "bg-amber-400",
    label_hr: "Očekujemo",
    label_en: "Expected",
  },
  born: { color: "bg-blue-400", label_hr: "Rođeni", label_en: "Born" },
  available: {
    color: "bg-available",
    label_hr: "Dostupni",
    label_en: "Available",
  },
  reserved: {
    color: "bg-reserved",
    label_hr: "Rezervirani",
    label_en: "Reserved",
  },
  closed: {
    color: "bg-neutral-500",
    label_hr: "Zatvoreno",
    label_en: "Closed",
  },
};

function ParentCard({
  parent,
  label,
  locale,
}: {
  parent: any;
  label: string;
  locale: Locale;
}) {
  return (
    <Link
      href={{
        pathname: "/nasi-psi/[slug]",
        params: { slug: parent.slug.current },
      }}
      className="group flex items-center gap-4 p-4 bg-white border border-neutral-200 hover:border-primary-300 transition-colors duration-300"
    >
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-neutral-200">
        {parent.mainImage ? (
          <Image
            src={urlFor(parent.mainImage).width(160).height(160).url()}
            alt={parent.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
            <span className="text-2xl">
              {parent.gender === "male" ? "♂" : "♀"}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">
          {label}
        </p>
        <p className="font-display text-lg font-semibold text-primary-800 group-hover:text-primary-600 transition-colors">
          {parent.name}
        </p>
        {parent.titles && (
          <p className="text-xs text-accent-600 mt-0.5">{parent.titles}</p>
        )}
      </div>
    </Link>
  );
}

export default function LitterProfile({ litter, locale }: Props) {
  const t = useTranslations("litters");
  const name = localeField(litter, "name", locale);
  const description = localePortableText(litter, "description", locale);
  const shortDesc = localeField(litter, "shortDescription", locale);
  const status = statusConfig[litter.status] || statusConfig.planned;

  const availableCount =
    litter.puppies?.filter((p) => p.status === "available").length || 0;

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
            href="/legla"
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              {litter.mainImage ? (
                <Image
                  src={urlFor(litter.mainImage).width(800).height(600).url()}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                  <span className="text-6xl">🐾</span>
                </div>
              )}
              <div className="absolute top-6 left-6">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm ${status.color}`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  {locale === "hr" ? status.label_hr : status.label_en}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-800 tracking-tight">
              {name}
            </h1>

            {litter.breed && (
              <p className="text-sm text-neutral-400 uppercase tracking-wider mt-2">
                {litter.breed}
              </p>
            )}

            <div className="mt-6 h-px w-16 bg-accent-500" />

            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {litter.dateOfBirth && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {t("born")}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-700">
                    {new Date(litter.dateOfBirth).toLocaleDateString(
                      locale === "hr" ? "hr-HR" : "en-GB",
                    )}
                  </dd>
                </div>
              )}
              {litter.expectedDate && !litter.dateOfBirth && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Očekivani datum" : "Expected date"}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-700">
                    {new Date(litter.expectedDate).toLocaleDateString(
                      locale === "hr" ? "hr-HR" : "en-GB",
                    )}
                  </dd>
                </div>
              )}
              {litter.puppyCount && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {t("puppies")}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-700">
                    {litter.puppyCount}
                  </dd>
                </div>
              )}
              {availableCount > 0 && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Dostupno" : "Available"}
                  </dt>
                  <dd className="mt-1">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                      <span className="w-2 h-2 rounded-full bg-available animate-pulse" />
                      {availableCount}
                    </span>
                  </dd>
                </div>
              )}
            </dl>

            {shortDesc && (
              <p className="mt-8 text-neutral-600 leading-relaxed">
                {shortDesc}
              </p>
            )}

            {description && (
              <div className="mt-6 prose prose-neutral prose-sm max-w-none">
                <PortableText value={description} />
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-16 space-y-20">
          {(litter.sire || litter.dam) && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-8">
                {locale === "hr" ? "Roditelji" : "Parents"}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {litter.sire && (
                  <ParentCard
                    parent={litter.sire}
                    label={locale === "hr" ? "Otac" : "Sire"}
                    locale={locale}
                  />
                )}
                {litter.dam && (
                  <ParentCard
                    parent={litter.dam}
                    label={locale === "hr" ? "Majka" : "Dam"}
                    locale={locale}
                  />
                )}
              </div>
            </motion.section>
          )}

          {litter.puppies && litter.puppies.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-8">
                {locale === "hr" ? "Štenad" : "Puppies"}
                <span className="text-neutral-400 font-normal text-xl ml-3">
                  ({litter.puppies.length})
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {litter.puppies.map((puppy, i) => (
                  <PuppyCard
                    key={puppy._key}
                    puppy={puppy}
                    locale={locale}
                    index={i}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {litter.gallery && litter.gallery.length > 0 && (
            <DogGallery images={litter.gallery} dogName={name} />
          )}
        </div>
      </div>
    </article>
  );
}
