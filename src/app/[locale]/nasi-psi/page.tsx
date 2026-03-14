import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getAllDogs } from "@/sanity/lib/queries";
import { Locale } from "@/lib/types";
import PageTransition from "@/components/ui/PageTransition";
import DogsList from "@/components/sections/DogsList";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return {
    title:
      locale === "hr"
        ? "Naši psi | Zentaana Canis"
        : "Our Dogs | Zentaana Canis",
    description:
      locale === "hr"
        ? "Upoznajte naše pse — uzgajivačnica Zentaana Canis"
        : "Meet our dogs — Zentaana Canis breeding kennel",
  };
}

export default async function DogsPage() {
  const dogs = await getAllDogs();

  return (
    <PageTransition>
      <DogsList dogs={dogs} />
    </PageTransition>
  );
}
