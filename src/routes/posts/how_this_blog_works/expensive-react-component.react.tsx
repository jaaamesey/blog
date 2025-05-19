import * as React from "react";

export function ExpensiveReactComponent() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  return (
    <div
      className="w-full h-40 bg-white relative"
      onMouseMove={(e) => setMousePos({ x: e.x, y: e.y })}
    >
      <div className="absolute bg-red-50 h-20 w-20" style={{transform: }}>Drag me!</div>
    </div>
  );
}
