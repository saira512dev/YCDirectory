import { defineField } from "sanity";

export default {
    name: "bookmark",
    type: "document",
    title: "Bookmark",
    fields: [
        defineField({ name: "author", title: "author",type: "reference", to: [{ type: "author" }] }),
      defineField({ name: "startup", title: "startup", type: "reference", to: [{ type: "startup" }] }),
      defineField({ name: "createdAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    ],
  };
  