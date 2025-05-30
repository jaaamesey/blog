import { createSignal } from "solid-js";

export function Counter() {
  const [counter, setCounter] = createSignal(0);
  return <button onClick={() => setCounter((c) => c + 1)}>{counter()}</button>;
}
