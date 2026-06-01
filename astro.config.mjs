import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypePrettyCode from "rehype-pretty-code";
import path from "node:path";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    // rehype-pretty-code/postcss are happier in Node during prerender
    prerenderEnvironment: "node",
  }),
  prefetch: true,
  // "always" breaks API routes: GET /api/foo returns HTML that meta-refreshes to the
  // wrong URL (no slash) even when the Location header is correct.
  trailingSlash: "ignore",
  integrations: [
    solid(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": path.resolve("./src"),
      },
    },
  },
});
