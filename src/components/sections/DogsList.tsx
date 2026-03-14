"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Dog, Locale } from "@/lib/types";
import DogFilter from "@/components/ui/DogFilter";
import DogCard from "@/components/ui/DogCard";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  dogs: Dog[];
};

export default function DogsList({ dogs }: Props) {
  const t = useTranslations("dogs");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<"all" | "male" | "female">("all");

  const counts = {
    all: dogs.length,
    male: dogs.filter((d) => d.gender === "male").length,
    female: dogs.filter((d) => d.gender === "female").length,
  };

  const filtered =
    filter === "all" ? dogs : dogs.filter((d) => d.gender === filter);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader subtitle="Zentaana Canis" title={t("title")} />

        <div className="mb-12">
          <DogFilter active={filter} onChange={setFilter} counts={counts} />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dog, i) => (
              <motion.div
                key={dog._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <DogCard dog={dog} locale={locale} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neutral-400 py-20 font-accent text-lg italic"
          >
            {locale === "hr"
              ? "Nema pasa u ovoj kategoriji"
              : "No dogs in this category"}
          </motion.p>
        )}
      </div>
    </section>
  );
}
