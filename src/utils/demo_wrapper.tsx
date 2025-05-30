import type { JSXElement } from "solid-js";
import styles from "./demo_wrapper.module.css";

export function DemoWrapper(props: { children: JSXElement }) {
  return (
    <div
      class={`w-full bg-white text-black p-4 rounded-lg ${styles.demoWrapper}`}
    >
      <noscript>
        Looks like you have JavaScript disabled. You'll probably want to enable
        it for this demo to work properly.
      </noscript>
      {props.children}
    </div>
  );
}
