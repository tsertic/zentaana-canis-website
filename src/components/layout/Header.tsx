"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const showLight = isHome && !scrolled;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-50/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/zc_logo2.svg"
              alt="Zentaana Canis"
              width={40}
              height={40}
              className={`transition-all duration-500 ${
                scrolled ? "w-8 h-8" : "w-10 h-10"
              } ${showLight ? "brightness-200" : ""}`}
            />
            <div className="flex flex-col">
              <span
                className={`font-display text-lg font-semibold leading-tight tracking-wide transition-colors duration-500 ${
                  showLight
                    ? "text-neutral-100 group-hover:text-accent-400"
                    : "text-primary-800 group-hover:text-primary-600"
                }`}
              >
                Zentaana Canis
              </span>
              <span
                className={`font-accent text-xs tracking-[0.3em] uppercase transition-all duration-500 ${
                  scrolled ? "opacity-0 h-0" : "opacity-100 h-4"
                } ${showLight ? "text-primary-400" : "text-neutral-400"}`}
              >
                FCI 19/25
              </span>
            </div>
          </Link>

          <Navigation isLight={showLight} />

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LanguageSwitcher isLight={showLight} />
            </div>
            <MobileMenu isLight={showLight} />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}
