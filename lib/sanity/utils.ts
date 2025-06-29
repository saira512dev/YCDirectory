import { sanityFetch } from "@/sanity/lib/live";
import { HAS_BOOKMARKED_QUERY, HAS_LIKED_QUERY } from "@/sanity/lib/queries";

export async function getStartupMeta(startupId: string, userId: string) {
    const [isLiked, isBookmarked] = await Promise.all([
      sanityFetch({ query: HAS_LIKED_QUERY, params: { startupId, userId } }),
      sanityFetch({ query: HAS_BOOKMARKED_QUERY, params: { startupId, userId } }),
    ]);
  
    return { isLiked, isBookmarked };
  }
  