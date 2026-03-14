import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/o-nama": {
      hr: "/o-nama",
      en: "/about",
    },
    "/nasi-psi": {
      hr: "/nasi-psi",
      en: "/our-dogs",
    },
    "/nasi-psi/[slug]": {
      hr: "/nasi-psi/[slug]",
      en: "/our-dogs/[slug]",
    },
    "/legla": {
      hr: "/legla",
      en: "/litters",
    },
    "/legla/[slug]": {
      hr: "/legla/[slug]",
      en: "/litters/[slug]",
    },
    "/novosti": {
      hr: "/novosti",
      en: "/news",
    },
    "/novosti/[slug]": {
      hr: "/novosti/[slug]",
      en: "/news/[slug]",
    },
    "/galerija": {
      hr: "/galerija",
      en: "/gallery",
    },
    "/kontakt": {
      hr: "/kontakt",
      en: "/contact",
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
