import { A } from "@solidjs/router";
import { onCleanup, onMount, For } from "solid-js";
import { allPosts } from "~/all_posts.compile";
import { Marquee } from "./marquee";

export default function Home() {
  onMount(() => {
    if (document.getElementById("random-posts-title")?.innerText === "Posts") {
      generateRandomPostsTitle();
    }
  });
  // TODO: Make view transitions part of router
  let resolveViewTransition: (_: unknown) => void = () => {};
  onCleanup(() => {
    console.log("cleaning");
    resolveViewTransition(undefined);
    resolveViewTransition = () => {};
  });
  return (
    <main class="text-center mx-auto p-4 flex flex-col items-center gap-2">
      <h1 class="max-6-xs text-2xl my-6">james karlsson</h1>
      <div class="mb-6 text-sm">i makea da software</div>
      <div class="flex gap-4 mb-6">
        <a href="https://github.com/jaaamesey">github</a>
        <a href="https://www.canva.com">work</a>
        <a href="#" onClick={() => alert("it's jameskarlsson1(at)gmail.com")}>
          email
        </a>
        <a href="https://bridj.link">bridj.link</a>
      </div>
      <h2 id="random-posts-title">Posts</h2>
      <script>{`(${generateRandomPostsTitle})()`}</script>
      <div class="flex flex-col gap-2 max-w-96 w-full justify-end">
        <For each={allPosts}>
          {(p) => {
            const titleEl = (<span>{p.title}</span>) as HTMLSpanElement;
            return (
              <A
                class="w-full bg-white/90 rounded-2xl p-4 text-start text-gray-950"
                href={`/posts/${p.id}`}
                onClick={() => {
                  if (document.startViewTransition) {
                    const promise = new Promise((resolve) => {
                      console.log("CREATING PROMISE!");
                      resolveViewTransition(undefined);
                      resolveViewTransition = resolve;
                      setTimeout(resolve, 5000);
                    });
                    document.startViewTransition(() => promise);
                  }
                }}
              >
                <div class="flex flex-col justify-between gap-preserve 2">
                  <div>
                    <em>{p.date}</em>
                  </div>
                  <div
                    class="text-lg"
                    style={{ "view-transition-name": `title-${p.id}` }}
                  >
                    {titleEl}
                  </div>
                </div>
              </A>
            );
          }}
        </For>
      </div>
      <div class="mt-20 w-96">
        <Marquee>bikeshedd.ing</Marquee>
      </div>
    </main>
  );
}

const generateRandomPostsTitle = () => {
  const titles = [
    "posts",
    "posterinos",
    "very serious articles",
    "thoughts",
    "actual honest to god bikeshedding",
    "content",
    "articles",
    "written testimony",
    "truths",
  ];
  document.getElementById("random-posts-title")!.innerText =
    titles[Math.floor(Math.random() * titles.length)];
};
