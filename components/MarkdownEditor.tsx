// components/MarkdownEditor.tsx
"use client";

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default MDEditor;
