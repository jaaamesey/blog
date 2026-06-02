import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypePrettyCode from "rehype-pretty-code";
import path from "node:path";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://bikeshedd.ing",
  output: "server",
  adapter: cloudflare({
    // rehype-pretty-code/postcss are happier in Node during prerender
    prerenderEnvironment: "node",
  }),
  prefetch: true,
  // "always" breaks API routes: GET /api/foo returns HTML that meta-refreshes to the
  // wrong URL (no slash) even when the Location header is correct.
  trailingSlash: "ignore",
  integrations: [solid({
    include: ['**/*.tsx'],
    exclude: ['**/*.react.tsx'],
  }), react({
    include: ['**/*.react.tsx', '**/*.react.jsx'],
  }), mdx() ],
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