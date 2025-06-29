import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import bookmark from "./bookmark";
import like from "./like";
import { playlist } from "./playlist";
import { startup } from "./startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist, bookmark, like],
};
