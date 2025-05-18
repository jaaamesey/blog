import { A } from "@solidjs/router";
import { onMount } from "solid-js";
import { allPosts } from "~/all_posts.compile";

export default function Home() {
  onMount(() => {
    if (document.getElementById("random-posts-title")?.innerText === "Posts") {
      generateRandomPostsTitle();
    }
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
      <div class="flex w-96 justify-end">
        {allPosts?.map((p) => (
          <A
            class="w-full bg-white rounded-2xl p-4 text-start text-gray-950"
            href={`/posts/${p.id}`}
          >
            <div class="flex justify-between">
              <div>
                <em>{p.date}</em>
              </div>
              <div>{p.title}</div>
            </div>
          </A>
        ))}
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
