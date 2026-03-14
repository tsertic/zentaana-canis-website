import { client } from "../client";
import { dogCardFields, dogFullFields } from "./fragments";
import { Dog } from "@/lib/types";

export async function getAllDogs(): Promise<Dog[]> {
  return client.fetch(
    `*[_type == "dog"] | order(name asc) { ${dogCardFields} }`,
  );
}

export async function getFeaturedDogs(): Promise<Dog[]> {
  return client.fetch(
    `*[_type == "dog" && isFeatured == true] | order(name asc) { ${dogCardFields} }`,
  );
}

export async function getDogsByGender(
  gender: "male" | "female",
): Promise<Dog[]> {
  return client.fetch(
    `*[_type == "dog" && gender == $gender] | order(name asc) { ${dogCardFields} }`,
    { gender },
  );
}

export async function getDogBySlug(slug: string): Promise<Dog | null> {
  return client.fetch(
    `*[_type == "dog" && slug.current == $slug][0] { ${dogFullFields} }`,
    { slug },
  );
}

export async function getDogSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "dog" && defined(slug.current)]{ "slug": slug.current }`,
  );
}
