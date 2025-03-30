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
export const allPosts = configs;
