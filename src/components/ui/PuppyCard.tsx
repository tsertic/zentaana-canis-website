"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Puppy, Locale } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  puppy: Puppy;
  locale: Locale;
  index?: number;
};

const statusConfig: Record<
  string,
  { color: string; label_hr: string; label_en: string }
> = {
  available: {
    color: "bg-available",
    label_hr: "Dostupan",
    label_en: "Available",
  },
  reserved: {
    color: "bg-reserved",
    label_hr: "Rezerviran",
    label_en: "Reserved",
  },
  sold: { color: "bg-sold", label_hr: "Prodan", label_en: "Sold" },
  keeping: {
    color: "bg-primary-400",
    label_hr: "Ostaje u uzgoju",
    label_en: "Staying",
  },
};

export default function PuppyCard({ puppy, locale, index = 0 }: Props) {
  const status = statusConfig[puppy.status] || statusConfig.available;

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group"
    >
      <div className="relative overflow-hidden bg-neutral-200 aspect-square">
        {puppy.photo ? (
          <Image
            src={urlFor(puppy.photo).width(400).height(400).url()}
            alt={puppy.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
            <span className="text-5xl">🐾</span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm ${status.color}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {locale === "hr" ? status.label_hr : status.label_en}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-medium tracking-wider ${
              puppy.gender === "male" ? "text-blue-400" : "text-rose-300"
            } bg-black/30 backdrop-blur-sm px-2 py-1`}
          >
            {puppy.gender === "male" ? "♂" : "♀"}
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-display text-lg font-semibold text-primary-800 group-hover:text-primary-600 transition-colors">
          {puppy.name}
        </h3>
        {puppy.color && (
          <p className="text-xs text-neutral-400 uppercase tracking-wider">
            {puppy.color}
          </p>
        )}
      </div>
    </motion.div>
  );

  if (puppy.dogReference?.slug) {
    return (
      <Link
        href={{
          pathname: "/nasi-psi/[slug]",
          params: { slug: puppy.dogReference.slug.current },
        }}
      >
        {card}
      </Link>
    );
  }

  return card;
}
