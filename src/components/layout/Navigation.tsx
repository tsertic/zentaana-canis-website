"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "home" },
  { href: "/o-nama", label: "about" },
  { href: "/nasi-psi", label: "dogs" },
  { href: "/legla", label: "litters" },
  { href: "/novosti", label: "news" },
  { href: "/galerija", label: "gallery" },
  { href: "/kontakt", label: "contact" },
] as const;

export default function Navigation({ isLight = false }: { isLight?: boolean }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 text-sm tracking-wide uppercase group"
          >
            <span
              className={`transition-colors duration-300 ${
                isActive
                  ? isLight
                    ? "text-accent-400"
                    : "text-primary-600"
                  : isLight
                    ? "text-neutral-300 group-hover:text-white"
                    : "text-neutral-600 group-hover:text-primary-700"
              }`}
            >
              {t(item.label)}
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className={`absolute bottom-0 left-4 right-4 h-px ${
                  isLight ? "bg-accent-400" : "bg-primary-500"
                }`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
