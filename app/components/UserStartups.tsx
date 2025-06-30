import { auth } from "@/auth";
import { enrichStartups } from "@/lib/enrichStartups";
import { client } from "@/sanity/lib/client";
import {
  STARTUPS_BY_AUTHOR_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  const enrichedStartups = await enrichStartups({
    startups,
    userId: id,
  });
  return (
    <>
      {enrichedStartups.length > 0 ? (
        enrichedStartups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No Startups yet</p>
      )}
    </>
  );
};

export default UserStartups;
