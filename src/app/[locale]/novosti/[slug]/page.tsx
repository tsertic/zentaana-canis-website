import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getNewsBySlug, getNewsSlugs } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import { localeField } from "@/lib/locale";
import PageTransition from "@/components/ui/PageTransition";
import NewsArticle from "@/components/sections/NewsArticle";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return { title: "Not Found" };

  const locale = (await getLocale()) as Locale;

  return {
    title: `${localeField(news, "title", locale)} | Zentaana Canis`,
    description: localeField(news, "excerpt", locale),
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const news = await getNewsBySlug(slug);

  if (!news) notFound();

  return (
    <PageTransition>
      <NewsArticle news={news} locale={locale} />
    </PageTransition>
  );
}
