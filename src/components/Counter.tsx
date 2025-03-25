import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button
      class="w-[200px] rounded-full bg-blue-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
      onClick={async () => {
        setCount((c) => c + 1);
        const y = x();
        console.log(y);
      }}
    >
      Clicks: {count()}
    </button>
  );
}

function x() {
  "use server";
  return 4;
}
