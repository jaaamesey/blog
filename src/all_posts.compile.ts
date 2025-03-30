import fg from "fast-glob";
import { PostConfig } from "./post_types";

const postEntryPoints = fg.sync("./src/routes/posts/*/meta.ts");
const postIds = postEntryPoints.map((path) => path.split("/").at(-2));
const configs = await Promise.all(
  postIds.map((id) =>
    import(`./routes/posts/${id}/meta.ts`).then(
      (m) => ({ ...m.default, id }) as PostConfig & { id: string },
    ),
  ),
);
export const allPosts = configs
  .filter((p) => !p.id.startsWith("_"))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const nextPosts = new Map(
  allPosts.map((p, i) => [p.id, allPosts[i + 1]?.id]),
);
export const prevPosts = new Map(
  allPosts.map((p, i) => [p.id, allPosts[i - 1]?.id]),
);

export const postsByKey = new Map(allPosts.map((p) => [p.id, p]));
