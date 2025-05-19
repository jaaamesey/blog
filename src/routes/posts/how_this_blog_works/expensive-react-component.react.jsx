import * as React from "react";

// TODO: Measure performance with mutationobserver 
export function ExpensiveReactComponent() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const expensiveComputation = React.useMemo(() => {
    console.time()
    const res = badFibonacci(34);
    console.timeEnd()
    return res;
  }, []);
  return (
    <div
      className="w-full h-40 bg-white overflow-hidden relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <div className="absolute bg-red-50 h-20 w-20" style={{ top: mousePos.y, left: mousePos.x }}>Drag me!</div>
      {expensiveComputation}
    </div >
  );
}

function badFibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return badFibonacci(n - 1) + badFibonacci(n - 2);
}
