import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import compileTime from "vite-plugin-compile-time";

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
    rollupConfig: {
      //  external: ["node:async_hooks"],
    },
  },
});
