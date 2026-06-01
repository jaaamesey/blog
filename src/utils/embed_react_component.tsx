import { createSignal, onMount } from "solid-js";

export function EmbedReactComponent(props: {
  name: string;
  demoProps?: any;
}) {
  const [el, setEl] = createSignal<HTMLDivElement | null>(null);

  onMount(async () => {
    const container = el();
    if (!container) return;

    await new Promise<void>((resolve) => {
      if ((window as any)._reactDemos) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "/react-demos.js";
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    const demos = (window as any)._reactDemos;
    const Component = demos?.[props.name];
    if (!Component) return;

    const React = (window as any).React;
    const ReactDOM = (window as any).ReactDOM;
    if (!React || !ReactDOM) return;

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(Component, props.demoProps));
  });

  return <div ref={setEl}>Loading...</div>;
}
