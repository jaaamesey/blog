// TODO: Add this automatically somehow?
import * as React from "react";
import { createElement, memo, useState } from "react";
import { createRoot } from "react-dom/client";
import { reactToSolid } from "~/utils/embed_react_component";

export const SomeReactComponent = memo(() => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((n) => n + 1)}>{count}</button>
  ) as React.ReactNode;
});
