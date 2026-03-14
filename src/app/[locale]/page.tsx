import Hero from "@/components/sections/Hero";
import FeaturedDogs from "@/components/sections/FeaturedDogs";
import { getFeaturedDogs } from "@/sanity/lib/queries";

export default async function Home() {
  const featuredDogs = await getFeaturedDogs();
  console.log(featuredDogs);
  return (
    <>
      <Hero />
      <FeaturedDogs dogs={featuredDogs} />
    </>
  );
}
