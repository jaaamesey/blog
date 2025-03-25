import { A, createAsync } from "@solidjs/router";
import Counter from "~/components/Counter";
import { getAllPosts } from "~/posts";

export default function Home() {
  const posts = createAsync(getAllPosts);
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      test
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
      {posts()?.map((p) => <div>{p}</div>)}
    </main>
  );
}
