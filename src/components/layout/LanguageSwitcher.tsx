"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "hr" ? "en" : "hr";
    router.replace(pathname as any, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 hover:border-primary-400 transition-colors duration-300 cursor-pointer"
    >
      <motion.span
        key={locale}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm font-medium text-neutral-700 uppercase tracking-widest"
      >
        {locale === "hr" ? "EN" : "HR"}
      </motion.span>
    </button>
  );
}
