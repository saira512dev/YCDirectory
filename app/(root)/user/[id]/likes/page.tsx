// app/user/[id]/likes/page.tsx
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { enrichStartups } from "@/lib/enrichStartups";
import { LIKED_STARTUPS_BY_USER_QUERY } from "@/sanity/lib/queries";
import StartupCard from "@/app/components/StartupCard";
import { notFound } from "next/navigation";

const LikesPage = async () => {
  const session = await auth();
  if (!session) return notFound();

  const userId = session.user.id;

  const likes = await client.fetch(LIKED_STARTUPS_BY_USER_QUERY, { userId });
  const likedStartups = likes.map((b: any) => b.startup);

  if (!likedStartups?.length) {
    return (
      <p className="text-center mt-10 text-gray-500">No liked startups yet.</p>
    );
  }

  const enriched = await enrichStartups({ startups: likedStartups, userId });

  return (
    <section className="section_container">
      <h1 className="text-3xl font-semibold mb-6">My Liked Startups</h1>
      <ul className="card_grid-sm">
        {enriched.map((post, index) => (
          <StartupCard key={index} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default LikesPage;
