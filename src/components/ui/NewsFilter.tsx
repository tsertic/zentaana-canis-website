"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/types";

type FilterValue =
  | "all"
  | "shows"
  | "litters"
  | "results"
  | "health"
  | "general";

type Props = {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
  locale: Locale;
};

const filters: { value: FilterValue; label_hr: string; label_en: string }[] = [
  { value: "all", label_hr: "Sve", label_en: "All" },
  { value: "shows", label_hr: "Izložbe", label_en: "Shows" },
  { value: "litters", label_hr: "Legla", label_en: "Litters" },
  { value: "results", label_hr: "Rezultati", label_en: "Results" },
  { value: "health", label_hr: "Zdravlje", label_en: "Health" },
  { value: "general", label_hr: "Općenito", label_en: "General" },
];

export default function NewsFilter({
  active,
  onChange,
  counts,
  locale,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {filters.map((filter) => {
        if (filter.value !== "all" && counts[filter.value] === 0) return null;

        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={`relative px-4 py-2.5 text-sm uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
              active === filter.value
                ? "text-primary-700"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <span>{locale === "hr" ? filter.label_hr : filter.label_en}</span>
            <span className="ml-1 text-xs">({counts[filter.value]})</span>
            {active === filter.value && (
              <motion.div
                layoutId="news-filter-underline"
                className="absolute bottom-0 left-2 right-2 h-px bg-primary-600"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
