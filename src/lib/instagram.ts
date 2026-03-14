export type InstagramPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  prunedCaption?: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumbnailUrl?: string;
  isReel?: boolean;
  sizes?: {
    small: { mediaUrl: string };
    medium: { mediaUrl: string };
    large: { mediaUrl: string };
  };
};

export async function getInstagramPosts(
  count: number = 8,
): Promise<InstagramPost[]> {
  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;
  if (!feedId) return [];

  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const posts = data?.posts || [];

    return posts.slice(0, count);
  } catch {
    return [];
  }
}
