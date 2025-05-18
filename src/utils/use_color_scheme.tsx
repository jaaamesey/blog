import { createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

const colorSchemes = [undefined, "dark", "light"] as const;

export function useColorScheme() {
  if (isServer) {
    throw new Error("Hook can only run on client");
  }
  const colorSchemeOverride = () => {
    const { fromOverride, active } = window._hooks.getColorScheme();
    return fromOverride ? active : undefined;
  };
  const [internalColorScheme, setInternalColorScheme] = createSignal(
    colorSchemeOverride(),
  );
  const disposeListener = window._hooks.onColorSchemeChanged(() =>
    setInternalColorScheme(colorSchemeOverride()),
  );
  onCleanup(disposeListener);
  const setOverride = window._hooks.setColorSchemeOverride;
  return {
    get: internalColorScheme,
    set: setOverride,
    rotate: () => {
      const currentIndex = colorSchemes.indexOf(colorSchemeOverride());
      const nextColor = colorSchemes[(currentIndex + 1) % colorSchemes.length];
      setOverride(nextColor);
    },
  };
}
