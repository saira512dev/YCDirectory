import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Author, Startup } from "@/sanity.types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LikeBookmarkActions from "./LikeBookmarkActions";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & {
  author?: Author;
  likeCount?: number;
  bookmarkCount?: number;
  hasLiked?: boolean;
  hasBookmarked?: boolean;
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    category,
    _id,
    title,
    description,
    image,
  } = post;

  return (
    <li className="relative rounded-lg border shadow-sm hover:shadow-lg p-4 bg-white flex flex-col justify-between">
      {/* Like + Views */}
      <div className="flex justify-between items-center mb-2 text-gray-500">
        <LikeBookmarkActions
          startupId={_id}
          initialLiked={post.hasLiked ?? false}
          initialBookmarked={post.hasBookmarked ?? false}
          initialLikeCount={post.likeCount || 0}
          initialBookmarkCount={post.bookmarkCount || 0}
        />
        <div className="flex items-center gap-1">
          <EyeIcon className="w-5 h-5 text-primary" />
          <span>{views}</span>
        </div>
      </div>

      {/* Title + Description */}
      <Link href={`/startup/${_id}`}>
        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>
      </Link>

      {/* Image */}
      <Link href={`/startup/${_id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mt-3"
        />
      </Link>

      {/* Category + Details */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-800">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <span className="bg-gray-100 px-2 py-1 rounded">{category}</span>
        </Link>
        <Button className="px-3 py-1 text-sm" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>

      {/* Author Info (Linked) */}
      {author && (
        <Link
          href={`/user/${author._id}`}
          className="flex items-center gap-2 mt-4 group"
        >
          <Image
            src={author.image || ""}
            alt={`${author?.name} – Founder of ${title}`}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm text-gray-700 group-hover:text-primary">
            {author.name}
          </span>
        </Link>
      )}

      {/* Date at Bottom Center */}
      <p className="text-center text-xs mt-4 text-gray-600">
        {formatDate(_createdAt)}
      </p>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
