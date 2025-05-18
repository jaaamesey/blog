import { A } from "@solidjs/router";
import { allPosts } from "~/all_posts.compile";

export default function Home() {
  return (
    <main class="text-center mx-auto p-4 flex flex-col items-center gap-2">
      <h1 class="max-6-xs text-2xl text-sky-700 font-thin my-16">
        bikeshedd.ing:
        <br />
        james karlsson's blog/page/whatever
      </h1>
      <div class="flex gap-4 mb-10">
        <a href="https://github.com/jaaamesey">github</a>
        <a href="https://www.canva.com/">work</a>
        <a href="https://www.linkedin.com/in/james-karlsson-43304314b/">
          linkedin
        </a>
      </div>
      <h2>Posts</h2>
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
