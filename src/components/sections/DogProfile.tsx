"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PortableText } from "@portabletext/react";
import { Dog, Litter, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField, localePortableText } from "@/lib/locale";
import DogGallery from "@/components/ui/DogGallery";
import AwardsTable from "@/components/ui/AwardsTable";
import HealthTable from "@/components/ui/HealthTable";
import PedigreeTree from "@/components/ui/PedigreeTree";
import DogLitters from "@/components/ui/DogLitters";

type Props = {
  dog: Dog;
  locale: Locale;
  litters: Litter[];
};

export default function DogProfile({ dog, locale, litters }: Props) {
  const t = useTranslations("dogs");
  const bio = localePortableText(dog, "bio", locale);
  const shortDesc = localeField(dog, "shortDescription", locale);

  const age = dog.dateOfBirth
    ? Math.floor(
        (Date.now() - new Date(dog.dateOfBirth).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000),
      )
    : null;

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
            href="/nasi-psi"
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
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
              {dog.mainImage ? (
                <Image
                  src={urlFor(dog.mainImage).width(800).height(1067).url()}
                  alt={dog.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                  <svg
                    className="w-24 h-24"
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
              {dog.titles && (
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-2 bg-accent-500/90 text-primary-900 text-xs font-medium tracking-wider uppercase backdrop-blur-sm">
                    {dog.titles}
                  </span>
                </div>
              )}
              {dog.status === "retired" && (
                <div className="absolute top-6 right-6">
                  <span className="inline-block px-3 py-1.5 bg-neutral-800/80 text-neutral-200 text-xs tracking-wider uppercase backdrop-blur-sm">
                    {locale === "hr" ? "Umirovljen" : "Retired"}
                  </span>
                </div>
              )}
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
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-sm font-medium tracking-wider uppercase ${
                  dog.gender === "male" ? "text-blue-500" : "text-rose-400"
                }`}
              >
                {dog.gender === "male"
                  ? locale === "hr"
                    ? "♂ Mužjak"
                    : "♂ Male"
                  : locale === "hr"
                    ? "♀ Ženka"
                    : "♀ Female"}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 tracking-tight">
              {dog.name}
            </h1>

            {dog.registeredName && (
              <p className="font-accent text-lg text-neutral-500 italic mt-2">
                {dog.registeredName}
              </p>
            )}

            <div className="mt-6 h-px w-16 bg-accent-500" />

            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {dog.breed && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Pasmina" : "Breed"}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-700">{dog.breed}</dd>
                </div>
              )}
              {dog.dateOfBirth && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Datum rođenja" : "Date of Birth"}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-700">
                    {new Date(dog.dateOfBirth).toLocaleDateString(
                      locale === "hr" ? "hr-HR" : "en-GB",
                    )}
                    {age !== null && (
                      <span className="text-neutral-400 ml-1">
                        ({age} {locale === "hr" ? "god." : "yrs"})
                      </span>
                    )}
                  </dd>
                </div>
              )}
              {dog.color && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Boja" : "Color"}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-700">{dog.color}</dd>
                </div>
              )}
              {dog.sire && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Otac" : "Sire"}
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={{
                        pathname: "/nasi-psi/[slug]",
                        params: { slug: dog.sire.slug.current },
                      }}
                      className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
                    >
                      {dog.sire.name}
                      {dog.sire.titles && (
                        <span className="text-neutral-400 ml-1">
                          ({dog.sire.titles})
                        </span>
                      )}
                    </Link>
                  </dd>
                </div>
              )}
              {dog.dam && (
                <div>
                  <dt className="text-xs text-neutral-400 uppercase tracking-wider">
                    {locale === "hr" ? "Majka" : "Dam"}
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={{
                        pathname: "/nasi-psi/[slug]",
                        params: { slug: dog.sire ? dog.sire.slug.current : "" },
                      }}
                      className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
                    >
                      {dog.dam.name}
                      {dog.dam.titles && (
                        <span className="text-neutral-400 ml-1">
                          ({dog.dam.titles})
                        </span>
                      )}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>

            {shortDesc && (
              <p className="mt-8 text-neutral-600 leading-relaxed">
                {shortDesc}
              </p>
            )}

            {bio && (
              <div className="mt-6 prose prose-neutral prose-sm max-w-none">
                <PortableText value={bio} />
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-20 space-y-20">
          {dog.gallery && dog.gallery.length > 0 && (
            <DogGallery images={dog.gallery} dogName={dog.name} />
          )}

          {dog.awards && dog.awards.length > 0 && (
            <AwardsTable awards={dog.awards} locale={locale} />
          )}

          {dog.healthTests && dog.healthTests.length > 0 && (
            <HealthTable tests={dog.healthTests} locale={locale} />
          )}

          {(dog.sire ||
            dog.dam ||
            (dog.externalPedigree && dog.externalPedigree.length > 0)) && (
            <PedigreeTree dog={dog} locale={locale} />
          )}

          {litters.length > 0 && (
            <DogLitters litters={litters} locale={locale} />
          )}
        </div>
      </div>
    </article>
  );
}
