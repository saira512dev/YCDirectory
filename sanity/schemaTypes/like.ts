export default {
    name: "like",
    type: "document",
    title: "Like",
    fields: [
      { name: "author", title: "author", type: "reference", to: [{ type: "author" }] },
      { name: "startup", title: "startup", type: "reference", to: [{ type: "startup" }] },
      { name: "createdAt", type: "datetime", initialValue: () => new Date().toISOString() },
    ],
  };
  