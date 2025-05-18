import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import compileTime from "vite-plugin-compile-time";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      mdx({
        jsxImportSource: "solid-jsx",
        rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
      }),
      compileTime(),
    ],
  },
  ssr: true,
  server: {
    preset: "static",
    prerender: {
      // routes: ["/", ...allPosts.map((p) => "/posts/" + p.id)],
      //crawlLinks: true,
    },
    rollupConfig: {
      //  external: ["node:async_hooks"],
    },
  },
});
