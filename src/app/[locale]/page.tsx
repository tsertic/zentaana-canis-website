import Hero from "@/components/sections/Hero";
import FeaturedDogs from "@/components/sections/FeaturedDogs";
import CurrentLitters from "@/components/sections/CurrentLitters";
import LatestNews from "@/components/sections/LatestNews";
import {
  getFeaturedDogs,
  getActiveLitters,
  getLatestNews,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [featuredDogs, activeLitters, latestNews] = await Promise.all([
    getFeaturedDogs(),
    getActiveLitters(),
    getLatestNews(4),
  ]);

  return (
    <>
      <Hero />
      <FeaturedDogs dogs={featuredDogs} />
      <CurrentLitters litters={activeLitters} />
      <LatestNews news={latestNews} />
    </>
  );
}
