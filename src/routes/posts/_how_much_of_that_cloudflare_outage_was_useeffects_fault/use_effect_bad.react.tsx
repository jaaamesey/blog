import * as React from "react";

export function UseEffectBad() {
  const [count, setCount] = React.useState(2);
  const [, setSneezeCount] = React.useState(0);
  const object = {}
  React.useEffect(() => {
    setTimeout(() => {
        setCount((n) => n + 1);
    }, Math.random() * 2000 +1000);
  }, [object]);
  return (<div>
    <div style={{display: 'none'}}>Okay, since you've gone as far as to inspect the code for this - the show's over, this widget doesn't actually ping the Cloudflare API. It just simulates that with a randomized setTimeout.</div>
    <h1 style={{"font-size": "32px"}}>
        Cloudflare Outage Simulator 2025
    </h1>
    <p>I've made {count} unnecessary requests to the Cloudflare API!</p>
    <button style={{'font-size': "8px"}} onClick={() => setSneezeCount((n) => n + 1)}>Sneeze</button>
</div>);
}