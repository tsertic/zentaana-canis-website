"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Litter, Locale } from "@/lib/types";
import LitterFilter from "@/components/ui/LitterFilter";
import LitterCard from "@/components/ui/LitterCard";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  litters: Litter[];
};

const currentStatuses = ["available", "born", "expected"];
const pastStatuses = ["closed", "reserved"];

export default function LittersList({ litters }: Props) {
  const t = useTranslations("litters");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<"all" | "current" | "planned" | "past">(
    "all",
  );

  const counts = {
    all: litters.length,
    current: litters.filter((l) => currentStatuses.includes(l.status)).length,
    planned: litters.filter((l) => l.status === "planned").length,
    past: litters.filter((l) => pastStatuses.includes(l.status)).length,
  };

  const filtered = litters.filter((l) => {
    if (filter === "all") return true;
    if (filter === "current") return currentStatuses.includes(l.status);
    if (filter === "planned") return l.status === "planned";
    if (filter === "past") return pastStatuses.includes(l.status);
    return true;
  });

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader subtitle="Zentaana Canis" title={t("title")} />

        <div className="mb-12">
          <LitterFilter active={filter} onChange={setFilter} counts={counts} />
        </div>

        <motion.div layout className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((litter, i) => (
              <motion.div
                key={litter._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <LitterCard litter={litter} locale={locale} />
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
              ? "Nema legala u ovoj kategoriji"
              : "No litters in this category"}
          </motion.p>
        )}
      </div>
    </section>
  );
}
