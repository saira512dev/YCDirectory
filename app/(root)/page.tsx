import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "../components/StartupCard";
import {
  BOOKMARKED_STARTUPS_BY_USER,
  LIKED_STARTUPS_BY_USER,
  STARTUPS_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import ClientStartupList from "../components/StartupList";
import Startup from "./startup/[id]/page";
import { enrichStartups } from "@/lib/enrichStartups";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query?.toLowerCase();
  const wildcardSearch = query ? `*${query}*` : null;
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: wildcardSearch },
  });
  let enrichedPosts = posts;

  const session = await auth();
  if (session) {
    enrichedPosts = await enrichStartups({
      startups: posts,
      userId: session.user.id,
    });
  }
  // console.log(enrichedPosts);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section-container">
        <p className="text-30-semibold text-center mt-2">
          {query ? `Search results for "${query}" ` : `All Startups`}
        </p>
        <ClientStartupList startups={enrichedPosts} />
      </section>
      <SanityLive />
    </>
  );
}
