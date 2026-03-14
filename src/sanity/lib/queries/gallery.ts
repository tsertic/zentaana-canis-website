import { client } from "../client";
import { galleryCardFields } from "./fragments";
import { GalleryAlbum } from "@/lib/types";

export async function getAllAlbums(): Promise<GalleryAlbum[]> {
  return client.fetch(
    `*[_type == "gallery"] | order(order asc, date desc) { ${galleryCardFields} }`,
  );
}

export async function getAlbumBySlug(
  slug: string,
): Promise<GalleryAlbum | null> {
  return client.fetch(
    `*[_type == "gallery" && slug.current == $slug][0] { ... }`,
    { slug },
  );
}

export async function getAlbumSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "gallery" && defined(slug.current)]{ "slug": slug.current }`,
  );
}
