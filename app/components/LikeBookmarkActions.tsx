"use client";

import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { BookmarkIcon, Heart } from "lucide-react";
import { toggleLike } from "@/lib/toggleLike";
import { toggleBookmark } from "@/lib/toggleBookmark";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

type Props = {
  startupId: string;
  initialLiked?: boolean;
  initialBookmarked?: boolean;
  initialLikeCount?: number;
  initialBookmarkCount?: number;
};

export default function LikeBookmarkActions({
  startupId,
  initialLiked = false,
  initialBookmarked = false,
  initialLikeCount = 0,
  initialBookmarkCount = 0,
}: Props) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarkCount);
  const [isPending, startTransition] = useTransition();

  const handleToggleLike = async () => {
    if (!session) {
      toast.error("Please log in to like this startup.");
      return;
    }

    if (isPending) return;

    startTransition(async () => {
      try {
        const res = await toggleLike(startupId);
        console.log(res);

        if (!res?.status) {
          toast.error("Something went wrong.");
          return;
        }

        if (res.status === "liked") {
          if (!liked) {
            setLiked(true);
            setLikeCount((prev) => prev + 1);
          }
        } else if (res.status === "unliked") {
          if (liked) {
            setLiked(false);
            setLikeCount((prev) => Math.max(0, prev - 1));
          }
        }
      } catch (error) {
        toast.error("Failed to update like. Try again." + error);
      }
    });
  };

  const handleToggleBookmark = async () => {
    if (!session) {
      toast.error("Please log in to bookmark this startup.");
      return;
    }

    if (isPending) return;

    startTransition(async () => {
      try {
        const res = await toggleBookmark(startupId);

        if (!res?.status) {
          toast.error("Something went wrong.");
          return;
        }

        if (res.status === "bookmarked") {
          if (!bookmarked) {
            setBookmarked(true);
            setBookmarkCount((prev) => prev + 1);
          }
        } else if (res.status === "unbookmarked") {
          if (bookmarked) {
            setBookmarked(false);
            setBookmarkCount((prev) => Math.max(0, prev - 1));
          }
        }
      } catch (error) {
        toast.error("Failed to update bookmark. Try again.");
      }
    });
  };

  return (
    <div className="flex items-center gap-3 text-gray-500">
      {/* Like */}
      <div className="flex items-center gap-1">
        <Heart
          onClick={!isPending ? handleToggleLike : undefined}
          className={cn(
            "w-5 h-5 cursor-pointer",
            liked ? "text-red-500 fill-red-500" : "hover:text-red-500",
            isPending && "opacity-50 pointer-events-none"
          )}
        />

        <span>{likeCount}</span>
      </div>

      {/* Bookmark */}
      <div className="flex items-center gap-1">
        <BookmarkIcon
          onClick={!isPending ? handleToggleBookmark : undefined}
          className={cn(
            "w-5 h-5 cursor-pointer",
            bookmarked
              ? "text-yellow-500 fill-yellow-500"
              : "hover:text-yellow-500",
            isPending && "opacity-50 pointer-events-none"
          )}
        />
        <span>{bookmarkCount}</span>
      </div>
    </div>
  );
}
