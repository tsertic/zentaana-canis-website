import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getLitterBySlug, getLitterSlugs } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import { localeField } from "@/lib/locale";
import PageTransition from "@/components/ui/PageTransition";
import LitterProfile from "@/components/sections/LitterProfile";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getLitterSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const litter = await getLitterBySlug(slug);
  if (!litter) return { title: "Not Found" };

  const locale = (await getLocale()) as Locale;
  const name = localeField(litter, "name", locale);

  return {
    title: `${name} | Zentaana Canis`,
    description: localeField(litter, "shortDescription", locale),
  };
}

export default async function LitterPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const litter = await getLitterBySlug(slug);

  if (!litter) notFound();

  return (
    <PageTransition>
      <LitterProfile litter={litter} locale={locale} />
    </PageTransition>
  );
}
