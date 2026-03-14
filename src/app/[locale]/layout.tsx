import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  Playfair_Display,
  DM_Sans,
  Cormorant_Garamond,
} from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { getSiteSettings } from "@/sanity/lib/queries";
import {
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-accent",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} antialiased grain-overlay`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <JsonLd data={generateOrganizationJsonLd()} />
        <JsonLd data={generateLocalBusinessJsonLd(settings)} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
