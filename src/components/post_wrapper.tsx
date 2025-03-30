import { JSX } from "solid-js";
import { PostConfig } from "~/post_types";

export function PostWrapper(props: {
  postConfig: PostConfig;
  children: JSX.Element;
}) {
  return (
    <div class="min-h-screen flex justify-center py-8 px-4 text-text-primary">
      <div class="max-w-3xl w-full [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-8">
        <header class="flex justify-between items-center pb-4 border-b border-border-color mb-8">
          <div class="text-text-secondary">bikeshedd.ing</div>
          <div class="flex gap-2 text-text-secondary">○ ○ ○</div>
          <div class="text-text-secondary">{props.postConfig.date}</div>
        </header>
        <h1 class="text-4xl md:text-5xl mb-6 text-text-primary">
          {props.postConfig.title}
        </h1>
        {props.children}
      </div>
    </div>
  );
}
