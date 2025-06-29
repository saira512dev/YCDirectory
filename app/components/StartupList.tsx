"use client";
import { useState } from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

type Props = {
  startups: StartupTypeCard[];
};

export default function ClientStartupList({ startups }: Props) {
  const [sortBy, setSortBy] = useState("latest");
  const sorted = [...startups].sort((a, b) => {
    if (sortBy === "latest") {
      const dateA = new Date(a._createdAt).getTime();
      const dateB = new Date(b._createdAt).getTime();
      return dateB - dateA; // latest first
    } else if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    } else if (sortBy === "views") {
      return (Number(b.views) ?? 0) - (Number(a.views) ?? 0);
    }

    return 0;
  });

  return (
    <div className="space-y-4 p-4">
      {/* Sort Controls Only */}
      <div className="flex justify-end mb-6">
        <label htmlFor="sort" className="sr-only">
          Sort by
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none px-4 py-2 rounded-md  border border-black focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="latest">Sort by Latest</option>
          <option value="title">Sort by Title</option>
          <option value="views">Sort by Views</option>
        </select>
        {/* Optional custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {sorted.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((startup) => (
            <StartupCard key={startup._id} post={startup} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No startups found.</p>
      )}
    </div>
  );
}
