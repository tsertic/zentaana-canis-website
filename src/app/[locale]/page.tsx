import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import FeaturedDogs from "@/components/sections/FeaturedDogs";
import CurrentLitters from "@/components/sections/CurrentLitters";
import LatestNews from "@/components/sections/LatestNews";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Stats from "@/components/sections/Stats";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionDivider from "@/components/ui/SectionDivider";
import PageTransition from "@/components/ui/PageTransition";
import {
  getFeaturedDogs,
  getActiveLitters,
  getLatestNews,
  getSiteSettings,
} from "@/sanity/lib/queries";
import { getInstagramPosts } from "@/lib/instagram";
import { Locale } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr"
        ? "Zentaana Canis | FCI 19/25 — Uzgajivačnica pasa"
        : "Zentaana Canis | FCI 19/25 — Dog Breeding Kennel",
    description:
      locale === "hr"
        ? "Zentaana Canis — FCI registrirana uzgajivačnica pasa. Uzgoj s ljubavlju i strašću."
        : "Zentaana Canis — FCI registered dog breeding kennel. Breeding with love and passion.",
  };
}

export default async function Home() {
  const [featuredDogs, activeLitters, latestNews, settings, instagramPosts] =
    await Promise.all([
      getFeaturedDogs(),
      getActiveLitters(),
      getLatestNews(4),
      getSiteSettings(),
      getInstagramPosts(8),
    ]);

  return (
    <PageTransition>
      <Hero />
      <FeaturedDogs dogs={featuredDogs} />
      <SectionDivider variant="dots" />
      <CurrentLitters litters={activeLitters} />
      <Stats />
      <LatestNews news={latestNews} />
      <SectionDivider variant="dots" />
      <InstagramFeed posts={instagramPosts} settings={settings} />
      <CtaBanner />
    </PageTransition>
  );
}
