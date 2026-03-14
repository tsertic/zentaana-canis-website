import { client } from "../client";
import { litterCardFields, litterFullFields } from "./fragments";
import { Litter } from "@/lib/types";

export async function getAllLitters(): Promise<Litter[]> {
  return client.fetch(
    `*[_type == "litter"] | order(dateOfBirth desc) { ${litterCardFields} }`,
  );
}

export async function getFeaturedLitters(): Promise<Litter[]> {
  return client.fetch(
    `*[_type == "litter" && isFeatured == true] | order(dateOfBirth desc) { ${litterCardFields} }`,
  );
}

export async function getActiveLitters(): Promise<Litter[]> {
  return client.fetch(
    `*[_type == "litter" && status in ["available", "born", "expected"]] | order(dateOfBirth desc) { ${litterCardFields} }`,
  );
}

export async function getLitterBySlug(slug: string): Promise<Litter | null> {
  return client.fetch(
    `*[_type == "litter" && slug.current == $slug][0] { ${litterFullFields} }`,
    { slug },
  );
}

export async function getLitterSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "litter" && defined(slug.current)]{ "slug": slug.current }`,
  );
}

export async function getLittersByDog(dogId: string): Promise<Litter[]> {
  return client.fetch(
    `*[_type == "litter" && (sire._ref == $dogId || dam._ref == $dogId)] | order(dateOfBirth desc) { ${litterCardFields} }`,
    { dogId },
  );
}
