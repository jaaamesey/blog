import type { PostConfig } from "./post_types";

const metaFiles = import.meta.glob("./routes/posts/*/meta.ts", { eager: true });

const configs = Object.entries(metaFiles).map(([path, mod]) => {
  const id = path.split("/").at(-2)!;
  return { ...(mod as Record<string, unknown>).default as PostConfig, id };
});

export const allPosts = configs
  .filter((p) => !p.id.startsWith("_"))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const nextPosts = new Map(
  allPosts.map((p, i) => [p.id, allPosts[i + 1]?.id]),
);
export const prevPosts = new Map(
  allPosts.map((p, i) => [p.id, allPosts[i - 1]?.id]),
);

export const postsByKey = new Map(allPosts.map((p) => [p.id, p]));
