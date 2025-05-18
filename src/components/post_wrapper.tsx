import { useLocation } from "@solidjs/router";
import { createMemo, JSX } from "solid-js";
import { nextPosts, prevPosts } from "~/all_posts.compile";
import { PostConfig } from "~/post_types";
import { UnreachableError } from "~/utils/unreachable_error";
import { useColorScheme } from "~/utils/use_color_scheme";
import { clientOnly } from "@solidjs/start";

export function PostWrapper(props: {
  postConfig: PostConfig;
  children: JSX.Element;
}) {
  const location = useLocation();
  const id = createMemo(() => location.pathname.substring("/posts/".length));
  return (
    <div class="min-h-screen flex justify-center py-8 px-4 text-text-primary">
      <div class="max-w-xl w-full">
        <header class="flex justify-between items-center pb-4 border-b border-border-color mb-8">
          <div class="text-text-secondary">james karlsson</div>
          <div class="flex gap-2 text-text-secondary">
            <ColorSchemeIcon />
          </div>
          <div class="text-text-secondary">{props.postConfig.date}</div>
        </header>
        <h1 class="text-4xl md:text-5xl mb-6 text-text-primary">
          {props.postConfig.title}
        </h1>
        <div class="text-lg">{props.children}</div>
        <div>
          {id()}
          {nextPosts.size}
          more:
          {prevPosts.get(id())}
          {nextPosts.get(id())}
        </div>
      </div>
    </div>
  );
}

const ColorSchemeIcon = clientOnly(() =>
  Promise.resolve({
    default: () => {
      const colorScheme = useColorScheme();
      return (
        <button onClick={colorScheme?.rotate}>
          {getColorSchemeIcon(colorScheme?.get())}
        </button>
      );
    },
  }),
);

function getColorSchemeIcon(scheme: ColorScheme) {
  switch (scheme) {
    case "dark":
      return "DARK";
    case "light":
      return "LIGHT";
    case undefined:
      return "AUTO";
    default:
      throw new UnreachableError(scheme);
  }
}
