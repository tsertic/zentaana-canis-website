import { client } from "../client";
import { newsCardFields, newsFullFields } from "./fragments";
import { News } from "@/lib/types";

export async function getAllNews(): Promise<News[]> {
  return client.fetch(
    `*[_type == "news"] | order(publishedAt desc) { ${newsCardFields} }`,
  );
}

export async function getLatestNews(count: number = 3): Promise<News[]> {
  return client.fetch(
    `*[_type == "news"] | order(publishedAt desc)[0...$count] { ${newsCardFields} }`,
    { count },
  );
}

export async function getNewsByCategory(category: string): Promise<News[]> {
  return client.fetch(
    `*[_type == "news" && category == $category] | order(publishedAt desc) { ${newsCardFields} }`,
    { category },
  );
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  if (!slug) return null; // ← guard added

  const query = `*[_type == "news" && slug.current == $slug][0] { ${newsFullFields} }`;
  return client.fetch(query, { slug });
}

export async function getNewsSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "news" && defined(slug.current)]{ "slug": slug.current }`,
  );
}
