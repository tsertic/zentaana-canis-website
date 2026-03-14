"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type FilterValue = "all" | "male" | "female";

type Props = {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: { all: number; male: number; female: number };
};

const filters: { value: FilterValue; labelKey: string }[] = [
  { value: "all", labelKey: "filterAll" },
  { value: "male", labelKey: "filterMale" },
  { value: "female", labelKey: "filterFemale" },
];

export default function DogFilter({ active, onChange, counts }: Props) {
  const t = useTranslations("dogs");

  return (
    <div className="flex items-center justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`relative px-5 py-2.5 text-sm uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
            active === filter.value
              ? "text-primary-700"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <span>{t(filter.labelKey)}</span>
          <span className="ml-1.5 text-xs">({counts[filter.value]})</span>
          {active === filter.value && (
            <motion.div
              layoutId="dog-filter-underline"
              className="absolute bottom-0 left-2 right-2 h-px bg-primary-600"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
