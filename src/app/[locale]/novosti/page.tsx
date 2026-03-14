import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getAllNews } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import NewsList from "@/components/sections/NewsList";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr" ? "Novosti | Zentaana Canis" : "News | Zentaana Canis",
    description:
      locale === "hr"
        ? "Novosti iz uzgajivačnice Zentaana Canis"
        : "News from Zentaana Canis breeding kennel",
  };
}

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <PageTransition>
      <NewsList news={news} />
    </PageTransition>
  );
}
