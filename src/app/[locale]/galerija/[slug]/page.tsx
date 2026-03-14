import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getAlbumBySlug, getAlbumSlugs } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import { localeField } from "@/lib/locale";
import PageTransition from "@/components/ui/PageTransition";
import AlbumView from "@/components/sections/AlbumView";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAlbumSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) return { title: "Not Found" };

  const locale = (await getLocale()) as Locale;

  return {
    title: `${localeField(album, "title", locale)} | Zentaana Canis`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const album = await getAlbumBySlug(slug);

  if (!album) notFound();

  return (
    <PageTransition>
      <AlbumView album={album} locale={locale} />
    </PageTransition>
  );
}
