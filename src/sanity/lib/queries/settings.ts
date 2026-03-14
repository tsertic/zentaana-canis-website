import { client } from "../client";
import { SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      ...,
      instagramPosts[] {
        _key,
        image,
        url,
        caption
      }
    }`,
  );
}
