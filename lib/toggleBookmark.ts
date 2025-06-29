// lib/actions/bookmarks.ts
'use server';

import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';

export async function toggleBookmark(startupId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: 'Not authenticated' };

  const existing = await client.fetch(
    `*[_type == "bookmark" && author._ref == $userId && startup._ref == $startupId][0]{_id}`,
    { userId, startupId }
  );

  if (existing?._id) {
    await client.delete(existing._id);
    return { status: 'unbookmarked' };
  } else {
    await client.create({
      _type: 'bookmark',
      author: { _type: 'reference', _ref: userId },
      startup: { _type: 'reference', _ref: startupId },
    });
    return { status: 'bookmarked' };
  }
}
