import * as React from "react";
import { memo, useState } from "react";

export const SomeReactComponent = memo((props) => {
  const [count, setCount] = useState(props.start);
  return (
    <button onClick={() => setCount((n) => n + 1)}>{count}</button>
  );
});
