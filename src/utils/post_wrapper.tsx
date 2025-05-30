import { A, useLocation } from "@solidjs/router";
import { createMemo, JSX } from "solid-js";
import { nextPosts, prevPosts } from "~/all_posts.compile";
import { PostConfig } from "~/post_types";
import { UnreachableError } from "~/utils/unreachable_error";
import { useColorScheme } from "~/utils/use_color_scheme";
import { clientOnly } from "@solidjs/start";
import styles from "./post_wrapper.module.css";
import { Title } from "@solidjs/meta";

export function PostWrapper(props: {
  postConfig: PostConfig;
  children: JSX.Element;
}) {
  const location = useLocation();
  const id = createMemo(() => location.pathname.substring("/posts/".length));
  return (
    <div class="min-h-screen flex justify-center py-8 px-4 text-text-primary overflow-x-clip">
      <Title>{props.postConfig.title}</Title>
      <div class="max-w-xl w-full">
        <header class="sticky top-5 not-sm:text-xs flex justify-between items-center pb-4 border-b border-border-color mb-8 z-1">
          <div
            style={{
              position: "absolute",
              "background-color": "rgb(var(--background-rgb))",
              transition: "var(--bg-transition)",
              height: "100%",
              width: "100%",
              transform: "scaleY(10) scaleX(5)",
              "transform-origin": "center bottom",
              top: 0,
              "z-index": -1,
              opacity: 0.975,
            }}
          />
          <div class="text-text-secondary">
            <A href="/" style={{ "view-transition-name": "logo" }}>
              james karlsson
            </A>
          </div>
          <div class="flex gap-2 text-text-secondary">
            <ColorSchemeIcon />
          </div>
          <div class="text-text-secondary">{props.postConfig.date}</div>
        </header>
        <h1 class="text-4xl md:text-5xl mb-8 text-text-primary">
          <div>
            <span
              style={{
                "view-transition-name": `title-${id()}`,
              }}
            >
              {props.postConfig.title}
            </span>
          </div>
        </h1>
        <div class={`text-lg flex flex-col gap-4 mb-20 ${styles.postBody}`}>
          {props.children}
        </div>
        <div style={{ display: "none" }}>
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
        <button class="hover:cursor-pointer" onClick={colorScheme?.rotate}>
          colours:{" "}
          <span class="inline-block w-10">
            {getColorSchemeIcon(colorScheme?.getOverride())}
          </span>
        </button>
      );
    },
  }),
);

function getColorSchemeIcon(scheme: ColorScheme) {
  switch (scheme) {
    case "dark":
      return "dark";
    case "light":
      return "light";
    case undefined:
      return "auto";
    default:
      throw new UnreachableError(scheme);
  }
}
