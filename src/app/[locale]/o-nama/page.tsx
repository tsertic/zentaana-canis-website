import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getSiteSettings } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import AboutContent from "@/components/sections/AboutContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr" ? "O nama | Zentaana Canis" : "About | Zentaana Canis",
    description:
      locale === "hr"
        ? "O uzgajivačnici Zentaana Canis — FCI registrirana uzgajivačnica"
        : "About Zentaana Canis — FCI registered breeding kennel",
  };
}

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const settings = await getSiteSettings();

  return (
    <PageTransition>
      <AboutContent settings={settings} locale={locale} />
    </PageTransition>
  );
}
