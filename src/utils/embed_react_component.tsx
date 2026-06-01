import { createSignal, onMount } from "solid-js";

type DemoComponent = (props: Record<string, unknown>) => unknown;

interface ReactDemosWindow extends Window {
  _reactDemos?: Record<string, DemoComponent>;
  React?: {
    createElement: (
      type: DemoComponent,
      props?: Record<string, unknown>,
    ) => unknown;
  };
  ReactDOM?: {
    createRoot: (container: HTMLElement) => {
      render: (element: unknown) => void;
    };
  };
}

export function EmbedReactComponent(props: {
  name: string;
  demoProps?: Record<string, unknown>;
}) {
  const [el, setEl] = createSignal<HTMLDivElement | null>(null);

  onMount(async () => {
    const container = el();
    if (!container) return;

    const win = window as ReactDemosWindow;

    await new Promise<void>((resolve) => {
      if (win._reactDemos) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "/react-demos.js";
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    const Component = win._reactDemos?.[props.name];
    if (!Component) return;

    const { React, ReactDOM } = win;
    if (!React || !ReactDOM) return;

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(Component, props.demoProps));
  });

  return <div ref={setEl}>Loading...</div>;
}
