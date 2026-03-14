"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { href: "/", label: "home" },
  { href: "/o-nama", label: "about" },
  { href: "/nasi-psi", label: "dogs" },
  { href: "/legla", label: "litters" },
  { href: "/novosti", label: "news" },
  { href: "/galerija", label: "gallery" },
  { href: "/kontakt", label: "contact" },
] as const;

export default function MobileMenu({ isLight = false }: { isLight?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-60 flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
        aria-label="Menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
          className={`block w-6 h-px absolute ${isLight ? "bg-neutral-100" : "bg-neutral-800"}`}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className={`block w-6 h-px absolute ${isLight ? "bg-neutral-100" : "bg-neutral-800"}`}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
          className={`block w-6 h-px absolute ${isLight ? "bg-neutral-100" : "bg-neutral-800"}`}
          transition={{ duration: 0.3 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-neutral-50/98 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center gap-2">
                {navItems.map((item, i) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`font-display text-3xl tracking-wide transition-colors duration-300 ${
                          isActive
                            ? "text-primary-600"
                            : "text-neutral-700 hover:text-primary-600"
                        }`}
                      >
                        {t(item.label)}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
