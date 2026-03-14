import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getAllAlbums } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import GalleryGrid from "@/components/sections/GalleryGrid";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr"
        ? "Galerija | Zentaana Canis"
        : "Gallery | Zentaana Canis",
    description:
      locale === "hr"
        ? "Foto galerija uzgajivačnice Zentaana Canis"
        : "Photo gallery of Zentaana Canis breeding kennel",
  };
}

export default async function GalleryPage() {
  const albums = await getAllAlbums();

  return (
    <PageTransition>
      <GalleryGrid albums={albums} />
    </PageTransition>
  );
}
