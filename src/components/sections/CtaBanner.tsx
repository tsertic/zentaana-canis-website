"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CtaBanner() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden bg-primary-900"
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-700)_0%,_var(--color-primary-900)_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l2 3.5-2 3zm0-17V0H0v2h20v2l2-3.5L20 3.5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent text-sm uppercase tracking-[0.4em] text-accent-400 mb-6"
        >
          Zentaana Canis
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          {locale === "hr"
            ? "Pronađite svog savršenog prijatelja"
            : "Find your perfect companion"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg text-primary-300 max-w-2xl mx-auto leading-relaxed"
        >
          {locale === "hr"
            ? "Kontaktirajte nas za informacije o dostupnim štencima, planiranim leglima ili bilo kakva pitanja o našim psima."
            : "Contact us for information about available puppies, planned litters, or any questions about our dogs."}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500"
          >
            <span>{t("contact")}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/legla"
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary-500/30 text-primary-300 hover:text-white hover:border-primary-400 text-sm uppercase tracking-[0.2em] transition-all duration-500"
          >
            <span>{t("litters")}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
