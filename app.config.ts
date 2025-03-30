import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import compileTime from "vite-plugin-compile-time";
import { allPosts } from "./src/all_posts.compile";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      mdx({ jsxImportSource: "solid-jsx" }),
      compileTime(),
    ],
  },
  ssr: true,
  server: {
    preset: "cloudflare-pages",
    prerender: {
      routes: ["/", ...allPosts.map((p) => "/posts/" + p.id)],
      crawlLinks: true,
    },
    rollupConfig: {
      //  external: ["node:async_hooks"],
    },
  },
});
