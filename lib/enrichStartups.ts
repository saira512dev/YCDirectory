import { client } from "@/sanity/lib/client";
import {
  BOOKMARKED_STARTUPS_BY_USER,
  LIKED_STARTUPS_BY_USER,
} from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/app/components/StartupCard";

export const enrichStartups = async ({
  startups,
  userId,
}: {
  startups: StartupTypeCard[];
  userId: string;
}): Promise<StartupTypeCard[]> => {
  const [likedStartups, bookmarkedStartups] = await Promise.all([
    client.fetch(LIKED_STARTUPS_BY_USER, { userId }),
    client.fetch(BOOKMARKED_STARTUPS_BY_USER, { userId }),
  ]);
console.log(likedStartups)
  const likedIds = likedStartups.map((item) => item.startup._id);
  const bookmarkedIds = bookmarkedStartups.map((item) => item.startup._id);

  return startups.map((startup) => ({
    ...startup,
    hasLiked: likedIds.includes(startup._id),
    hasBookmarked: bookmarkedIds.includes(startup._id),
  }));
};
