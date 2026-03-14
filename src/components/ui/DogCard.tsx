"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Dog, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { localeField } from "@/lib/locale";

type Props = {
  dog: Dog;
  locale: Locale;
  index?: number;
};

export default function DogCard({ dog, locale, index = 0 }: Props) {
  const description = localeField(dog, "shortDescription", locale);

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
      <Link href={`/nasi-psi/${dog.slug.current}`} className="group block">
        <div className="relative overflow-hidden bg-neutral-200 aspect-[3/4]">
          {dog.mainImage ? (
            <Image
              src={urlFor(dog.mainImage).width(600).height(800).url()}
              alt={dog.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
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

          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {dog.titles && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-accent-500/90 text-primary-900 text-xs font-medium tracking-wider uppercase backdrop-blur-sm">
                {dog.titles}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {description && (
                <p className="text-neutral-200 text-sm leading-relaxed line-clamp-2 mb-2">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-primary-800 group-hover:text-primary-600 transition-colors duration-300">
              {dog.name}
            </h3>
            <span
              className={`text-xs font-medium tracking-wider uppercase ${
                dog.gender === "male" ? "text-blue-500" : "text-rose-400"
              }`}
            >
              {dog.gender === "male" ? "♂" : "♀"}
            </span>
          </div>
          {dog.registeredName && (
            <p className="font-accent text-sm text-neutral-500 italic">
              {dog.registeredName}
            </p>
          )}
          {dog.breed && (
            <p className="text-xs text-neutral-400 uppercase tracking-wider">
              {dog.breed}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
