import { A, createAsync, useParams } from "@solidjs/router";
import { getPost } from "~/posts";

export default function () {
  const params = useParams();
  console.log("created");
  const post = createAsync(() => getPost(params.post));
  return (
    <div>
      hii {post()?.title} <A href="/posts/one">one</A>
      <A href="/posts/two">two</A>
    </div>
  );
}
