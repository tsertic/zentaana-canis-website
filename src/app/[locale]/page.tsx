import Hero from "@/components/sections/Hero";
import FeaturedDogs from "@/components/sections/FeaturedDogs";
import CurrentLitters from "@/components/sections/CurrentLitters";
import { getFeaturedDogs, getActiveLitters } from "@/sanity/lib/queries";

export default async function Home() {
  const [featuredDogs, activeLitters] = await Promise.all([
    getFeaturedDogs(),
    getActiveLitters(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedDogs dogs={featuredDogs} />
      <CurrentLitters litters={activeLitters} />
    </>
  );
}
