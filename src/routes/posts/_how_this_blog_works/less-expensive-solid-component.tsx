import { createSignal } from "solid-js";

export function LessExpensiveSolidComponent() {
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  return (
    <div
      class="w-full h-40 bg-white overflow-hidden relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <div
        class="absolute bg-blue-50 h-20 w-20"
        style={{ top: mousePos().y + "px", left: mousePos().x + "px" }}
      >
        Drag me!
      </div>
      {badFibonacci(34)}
    </div>
  );
}

function badFibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return badFibonacci(n - 1) + badFibonacci(n - 2);
}
