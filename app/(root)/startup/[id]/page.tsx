import LikeBookmarkActions from "@/app/components/LikeBookmarkActions";
import StartupCard, { StartupTypeCard } from "@/app/components/StartupCard";
import View from "@/app/components/View";
import { auth } from "@/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { enrichStartups } from "@/lib/enrichStartups";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import markdownit from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
export const experimental_ppr = true;

type Props = {};
const md = markdownit();

const Startup = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: viewersPicks }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "viewer-s-pick",
    }),
  ]);

  if (!post) return notFound();
  let enrichedViewerPicks = viewersPicks;
  let enrichedPost = post;
  const session = await auth();
  if (session) {
    enrichedViewerPicks = await enrichStartups({
      startups: viewersPicks,
      userId: session.user.id,
    });
    enrichedPost = await enrichStartups({
      startups: [post],
      userId: session.user.id,
    });

    enrichedPost = enrichedPost[0];
  }
  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <div className="mx-auto max-w-4xl mb-2">
          <LikeBookmarkActions
            startupId={id}
            initialLiked={enrichedPost.hasLiked ?? false}
            initialBookmarked={enrichedPost.hasBookmarked ?? false}
            initialLikeCount={enrichedPost.likeCount || 0}
            initialBookmarkCount={enrichedPost.bookmarkCount || 0}
          />
        </div>

        <img
          src={post.image}
          alt="post-thumbnail"
          className="w-full max-w-4xl mx-auto h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex flex-col gap-3 xs:flex-row xs:justify-between xs:items-center">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No Details Provided</p>
          )}
        </div>
        <hr className="divider" />
        {viewersPicks?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Viewer Picks</p>
            <ul className="mt-7 card_grid-sm">
              {enrichedViewerPicks.map(
                (post: StartupTypeCard, index: number) => (
                  <StartupCard key={index} post={post} />
                )
              )}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Startup;
