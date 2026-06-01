import { DEV } from "solid-js";
import { PostConfig } from "./post_types";

export async function getAllPosts() {
  if (DEV || true) {
    return import("./all_posts").then((r) => (r as any).default() as PostConfig[]);
  }
}

