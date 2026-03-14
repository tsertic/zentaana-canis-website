"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  light = false,
}: Props) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`font-accent text-sm uppercase tracking-[0.3em] mb-3 ${
            light ? "text-primary-400" : "text-accent-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-display text-3xl md:text-5xl font-bold tracking-tight ${
          light ? "text-neutral-100" : "text-primary-800"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "3rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`h-px mt-6 ${light ? "bg-accent-400" : "bg-accent-500"} ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
