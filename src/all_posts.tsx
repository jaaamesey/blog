import { DEV } from "solid-js";

export async function getAllPosts() {
  if (DEV || true) {
    return import("./all_posts.compile").then((r) => r.default());
  }
}

export async function testFn() {
  const x = compileTime(33);
  console.log({ x });
  return x;
}
