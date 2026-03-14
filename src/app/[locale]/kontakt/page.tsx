import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getSiteSettings } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import ContactContent from "@/components/sections/ContactContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr" ? "Kontakt | Zentaana Canis" : "Contact | Zentaana Canis",
    description:
      locale === "hr"
        ? "Kontaktirajte uzgajivačnicu Zentaana Canis"
        : "Contact Zentaana Canis breeding kennel",
  };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const settings = await getSiteSettings();

  return (
    <PageTransition>
      <ContactContent settings={settings} locale={locale} />
    </PageTransition>
  );
}
