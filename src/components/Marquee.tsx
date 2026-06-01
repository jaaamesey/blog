import type { JSX } from "solid-js";

export function Marquee(props: { children: JSX.Element }) {
  return <marquee>{props.children}</marquee>;
}
