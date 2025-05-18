import { createElement } from "react";
import { createRoot, Root } from "react-dom/client";
import { createRenderEffect, createSignal, onCleanup } from "solid-js";

export function SynchronousReactComponent<
  ReactProps extends {} | undefined,
>(props: {
  Component: React.FunctionComponent<ReactProps>;
  props?: ReactProps;
}) {
  const [reactRoot, setReactRoot] = createSignal<Root>();
  createRenderEffect(() => {
    const root = reactRoot();
    if (!root) {
      return;
    }
    root.render(
      createElement(props.Component as React.FunctionComponent, props.props),
    );
  });
  onCleanup(() => reactRoot()?.unmount());
  return (
    <div>
      <div
        ref={(el) => {
          setReactRoot(createRoot(el));
        }}
      />
    </div>
  );
}
