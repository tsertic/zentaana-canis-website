export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import {
  getDogBySlug,
  getDogSlugs,
  getLittersByDog,
} from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import DogProfile from "@/components/sections/DogProfile";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getDogSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dog = await getDogBySlug(slug);
  if (!dog) return { title: "Not Found" };

  const locale = (await getLocale()) as Locale;
  const description =
    dog[`shortDescription_${locale}`] || dog.shortDescription_hr || "";

  return {
    title: `${dog.name}${dog.titles ? ` — ${dog.titles}` : ""} | Zentaana Canis`,
    description,
  };
}

export default async function DogPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const dog = await getDogBySlug(slug);

  if (!dog) notFound();

  const litters = await getLittersByDog(dog._id);

  return (
    <PageTransition>
      <DogProfile dog={dog} locale={locale} litters={litters} />
    </PageTransition>
  );
}
