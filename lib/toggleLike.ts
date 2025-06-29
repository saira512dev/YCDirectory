"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function toggleLike(startupId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { status: "unauthenticated" };
  }

  const existing = await client.fetch(
    `*[_type == "like" && startup._ref == $startupId && author._ref == $userId][0]{ _id }`,
    { startupId, userId }
  );

  if (existing) {
    await client.delete(existing._id);
    return { status: "unliked" };
  } else {
    await client.create({
      _type: "like",
      startup: { _type: "reference", _ref: startupId },
      author: { _type: "reference", _ref: userId },
    });
    return { status: "liked" };
  }
}
