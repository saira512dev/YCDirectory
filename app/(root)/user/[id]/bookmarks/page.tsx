// app/user/[id]/bookmarks/page.tsx
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { enrichStartups } from "@/lib/enrichStartups";
import { BOOKMARKED_STARTUPS_BY_USER_QUERY } from "@/sanity/lib/queries";
import StartupCard from "@/app/components/StartupCard";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";

const BookmarksPage = async () => {
  const session = await auth();
  if (!session) return notFound();

  const userId = session.user.id;

  const bookmarks = await client.fetch(BOOKMARKED_STARTUPS_BY_USER_QUERY, {
    userId: session.user.id,
  });
  const boookmarkedStartups = bookmarks.map((b: any) => b.startup);
  if (!boookmarkedStartups?.length) {
    return (
      <p className="text-center mt-10 text-gray-500">No bookmarks found.</p>
    );
  }

  const enriched = await enrichStartups({
    startups: boookmarkedStartups,
    userId,
  });
  return (
    <section className="section_container">
      <h1 className="text-3xl font-semibold mb-6">My Bookmarked Startups</h1>
      <ul className="card_grid-sm">
        {enriched.map((post, index) => (
          <StartupCard key={index} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default BookmarksPage;
