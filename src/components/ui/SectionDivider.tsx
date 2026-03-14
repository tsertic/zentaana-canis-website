"use client";

import { motion } from "framer-motion";

type Props = {
  variant?: "dots" | "line" | "wave";
  className?: string;
};

export default function SectionDivider({
  variant = "line",
  className = "",
}: Props) {
  if (variant === "dots") {
    return (
      <div
        className={`flex items-center justify-center gap-3 py-8 ${className}`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-500"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-8 md:h-12 text-neutral-50 fill-current"
        >
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,30 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <motion.div
        className="h-px bg-neutral-200 w-full max-w-xs"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}
