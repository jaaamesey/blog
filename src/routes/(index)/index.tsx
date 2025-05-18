import { A } from "@solidjs/router";
import { allPosts } from "~/all_posts.compile";

export default function Home() {
  return (
    <main class="text-center mx-auto p-4 flex flex-col items-center gap-2">
      <h1 class="max-6-xs text-2xl my-6">james karlsson</h1>
      <div class="mb-6 text-sm">i makea da software</div>
      <div class="flex gap-4 mb-6">
        <a href="https://github.com/jaaamesey">github</a>
        <a href="https://www.canva.com/">work</a>
        <a href="#" onClick={() => alert("it's jameskarlsson1(at)gmail.com")}>
          email
        </a>
      </div>
      <h2 class="font-bold">posts</h2>
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
