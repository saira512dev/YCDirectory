import "server-only";
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { config } from "process";

export const { sanityFetch, SanityLive } = defineLive({ client });
