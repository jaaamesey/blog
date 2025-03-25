"use server";

const posts = new Map<string, unknown>(
  Object.entries(import.meta.glob("/src/posts/*.mdx", { eager: true })).map(
    ([k, v]) => [k.split("/").at(-1)!.split(".")[0], v] as const,
  ),
);
const postsByDate = Array.from(posts).sort(
  ([, a], [, b]) =>
    new Date((a as { date?: string }).date ?? "").getTime() -
    new Date((b as { date?: string }).date ?? "").getTime(),
);

export async function getAllPosts() {
  return postsByDate.map(([k, m]) => ({
    k,
    m: 2,
  }));
}
