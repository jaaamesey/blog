import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import compileTime from "vite-plugin-compile-time";
import rehypePrettyCode from "rehype-pretty-code";
import { allPosts } from "./src/all_posts.compile";

export default defineConfig({
  solid: { exclude: /\.react\.(tsx|jsx)/ },
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
      // What the hell, crawling is broken???
      crawlLinks: false,
      routes: ["/", ...allPosts.map((p) => "/" + p.id)],
    },
  },
});
