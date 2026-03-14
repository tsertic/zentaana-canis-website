"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Dog, Locale } from "@/lib/types";

type Props = {
  dog: Dog;
  locale: Locale;
};

function PedigreeCard({
  name,
  titles,
  slug,
  relation,
}: {
  name: string;
  titles?: string;
  slug?: string;
  relation: string;
}) {
  const content = (
    <div className="p-4 bg-white border border-neutral-200 hover:border-primary-300 transition-colors duration-300 h-full">
      <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
        {relation}
      </p>
      <p className="font-display text-sm font-semibold text-primary-800">
        {name}
      </p>
      {titles && <p className="text-xs text-accent-600 mt-0.5">{titles}</p>}
    </div>
  );

  if (slug) {
    return (
      <Link
        href={{ pathname: "/nasi-psi/[slug]", params: { slug } }}
        className="block group"
      >
        {content}
      </Link>
    );
  }
  return content;
}

export default function PedigreeTree({ dog, locale }: Props) {
  const t = useTranslations("dogs");

  const externalMap = new Map(
    dog.externalPedigree?.map((e) => [e.relation, e]) || [],
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-8">
        {t("pedigree")}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dog.sire ? (
          <PedigreeCard
            name={dog.sire.name}
            titles={dog.sire.titles}
            slug={dog.sire.slug.current}
            relation={locale === "hr" ? "Otac" : "Sire"}
          />
        ) : externalMap.has("sire") ? (
          <PedigreeCard
            name={externalMap.get("sire")!.name}
            titles={externalMap.get("sire")!.titles}
            relation={locale === "hr" ? "Otac" : "Sire"}
          />
        ) : (
          <div className="p-4 bg-neutral-100 border border-dashed border-neutral-300 h-full flex items-center justify-center">
            <span className="text-xs text-neutral-400">—</span>
          </div>
        )}

        {dog.dam ? (
          <PedigreeCard
            name={dog.dam.name}
            titles={dog.dam.titles}
            slug={dog.dam.slug.current}
            relation={locale === "hr" ? "Majka" : "Dam"}
          />
        ) : externalMap.has("dam") ? (
          <PedigreeCard
            name={externalMap.get("dam")!.name}
            titles={externalMap.get("dam")!.titles}
            relation={locale === "hr" ? "Majka" : "Dam"}
          />
        ) : (
          <div className="p-4 bg-neutral-100 border border-dashed border-neutral-300 h-full flex items-center justify-center">
            <span className="text-xs text-neutral-400">—</span>
          </div>
        )}

        {["sire_sire", "sire_dam", "dam_sire", "dam_dam"].map((relation) => {
          const labels: Record<string, { hr: string; en: string }> = {
            sire_sire: { hr: "Djed (po ocu)", en: "Grandsire (paternal)" },
            sire_dam: { hr: "Baka (po ocu)", en: "Granddam (paternal)" },
            dam_sire: { hr: "Djed (po majci)", en: "Grandsire (maternal)" },
            dam_dam: { hr: "Baka (po majci)", en: "Granddam (maternal)" },
          };

          const entry = externalMap.get(relation);

          if (!entry) {
            return (
              <div
                key={relation}
                className="p-4 bg-neutral-100 border border-dashed border-neutral-300 h-full flex items-center justify-center"
              >
                <span className="text-xs text-neutral-400">—</span>
              </div>
            );
          }

          return (
            <PedigreeCard
              key={relation}
              name={entry.name}
              titles={entry.titles}
              relation={
                locale === "hr" ? labels[relation].hr : labels[relation].en
              }
            />
          );
        })}
      </div>
    </motion.section>
  );
}
