import Hero from "@/components/sections/Hero";
import FeaturedDogs from "@/components/sections/FeaturedDogs";
import CurrentLitters from "@/components/sections/CurrentLitters";
import LatestNews from "@/components/sections/LatestNews";
import InstagramFeed from "@/components/sections/InstagramFeed";
import {
  getFeaturedDogs,
  getActiveLitters,
  getLatestNews,
  getSiteSettings,
} from "@/sanity/lib/queries";
import { getInstagramPosts } from "@/lib/instagram";

export default async function Home() {
  const [featuredDogs, activeLitters, latestNews, settings, instagramPosts] =
    await Promise.all([
      getFeaturedDogs(),
      getActiveLitters(),
      getLatestNews(4),
      getSiteSettings(),
      getInstagramPosts(8),
    ]);
  console.log(instagramPosts, "Instagram posts");
  return (
    <>
      <Hero />
      <FeaturedDogs dogs={featuredDogs} />
      <CurrentLitters litters={activeLitters} />
      <LatestNews news={latestNews} />
      <InstagramFeed posts={instagramPosts} settings={settings} />
    </>
  );
}
