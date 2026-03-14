export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getAllLitters } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import LittersList from "@/components/sections/LittersList";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr" ? "Legla | Zentaana Canis" : "Litters | Zentaana Canis",
    description:
      locale === "hr"
        ? "Naša legla — aktualna, planirana i prošla"
        : "Our litters — current, planned and past",
  };
}

export default async function LittersPage() {
  const litters = await getAllLitters();

  return (
    <PageTransition>
      <LittersList litters={litters} />
    </PageTransition>
  );
}
