/** @jsxImportSource react */
import * as React from 'react'
import { useState } from "react";

export function CounterReact() {
    const [c, setC] = useState(0)
    return <button onClick={() => setC(c=> c+1)}>{c}</button>
}
