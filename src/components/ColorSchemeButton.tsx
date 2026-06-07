import { useColorScheme } from "~/utils/use_color_scheme";
import { UnreachableError } from "~/utils/unreachable_error";
import { createSignal } from "solid-js";

function getColorSchemeIcon(scheme: ColorScheme) {
  switch (scheme) {
    case "dark":
      return "dark";
    case "light":
      return "light";
    case undefined:
      return "auto";
    default:
      throw new UnreachableError(scheme);
  }
}

export default function ColorSchemeButton() {
  const colorScheme = useColorScheme();
  const [pressed, setPressed] = createSignal(false);
  const [springing, setSpringing] = createSignal(false);

  return (
    <button
      class="hover:cursor-pointer select-none touch-none"
      style={{ transform: pressed() ? 'translateY(1.5px) scale(1.07, 0.95)' : undefined, transition: 'transform .1s ease-out' }}
      onPointerDown={() => {
        setPressed(true);
        setSpringing(false)
        const release = () => {
          setPressed(false);
          window.removeEventListener("pointerup", release);
          console.log('release') // always fires
        };
        console.log('add release') // always fires
        window.addEventListener("pointerup", release);
      }}
      onclick={() => {
        setSpringing(true);
        colorScheme.rotate()
      }}
    >
      colours:{" "}
      <span
        class="inline-block w-10"
        style={
          springing()
            ? { animation: "spring-return 1s ease-out" }
            : pressed()
              ? { transform: "translateY(1.5px)", transition: "transform 0.15s ease-in" }
              : undefined
        }
      >
        {getColorSchemeIcon(colorScheme.getOverride())}
      </span>
    </button>
  );
}
