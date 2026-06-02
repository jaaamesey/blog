import { createSignal } from "solid-js";

export function Counter() {
    const [c, setC] = createSignal(0)
    return <button onClick={() => setC(c=> c+1)}>{c()}</button>
}