"use client";

import { useLocale } from "next-intl";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";

type StatItem = {
  value: number;
  suffix?: string;
  label_hr: string;
  label_en: string;
  description_hr?: string;
  description_en?: string;
};

const stats: StatItem[] = [
  {
    value: 19,
    suffix: "/25",
    label_hr: "FCI registracija",
    label_en: "FCI Registration",
    description_hr: "Međunarodna potvrda izvrsnosti",
    description_en: "International mark of excellence",
  },
  {
    value: 10,
    suffix: "+",
    label_hr: "Godina iskustva",
    label_en: "Years of Experience",
    description_hr: "Posvećeni uzgoju od 2014.",
    description_en: "Dedicated to breeding since 2014",
  },
  {
    value: 50,
    suffix: "+",
    label_hr: "Sretnih obitelji",
    label_en: "Happy Families",
    description_hr: "Kojima smo pronašli savršenog psa",
    description_en: "Who found their perfect companion",
  },
  {
    value: 20,
    suffix: "+",
    label_hr: "Šampionskih titula",
    label_en: "Champion Titles",
    description_hr: "Na natjecanjima diljem Europe",
    description_en: "At competitions across Europe",
  },
];

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 2.2,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-0.5">
      <motion.span>{rounded}</motion.span>
      <span className="text-accent-500">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const locale = useLocale();

  return (
    <section className="relative py-24 md:py-32 bg-primary-900 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent origin-left"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px w-12 bg-accent-500/40" />
          <span className="text-[10px] text-accent-500/80 uppercase tracking-[0.35em] font-body">
            {locale === "hr" ? "Naše brojke" : "Our numbers"}
          </span>
          <div className="h-px w-12 bg-accent-500/40" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-primary-700/40">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative flex flex-col items-center text-center px-6 py-10 md:py-12"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/[0.03] transition-colors duration-700" />

              {/* Number */}
              <p className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-100 leading-none tabular-nums">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="h-px bg-accent-500/50 mx-auto my-4"
              />

              {/* Label */}
              <p className="font-accent text-base md:text-lg text-primary-200 italic tracking-wide">
                {locale === "hr" ? stat.label_hr : stat.label_en}
              </p>

              {/* Description */}
              {(stat.description_hr || stat.description_en) && (
                <p className="mt-2 text-xs text-primary-500 tracking-wide leading-relaxed max-w-[140px]">
                  {locale === "hr" ? stat.description_hr : stat.description_en}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent origin-right"
      />
    </section>
  );
}
