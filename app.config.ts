import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), mdx({ jsxImportSource: "solid-jsx" })],
  },
  ssr: true,
  server: { preset: "static" },
});
