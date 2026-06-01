import { useColorScheme } from "~/utils/use_color_scheme";
import { UnreachableError } from "~/utils/unreachable_error";

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
  return (
    <button class="hover:cursor-pointer" onClick={colorScheme.rotate}>
      colours:{" "}
      <span class="inline-block w-10">
        {getColorSchemeIcon(colorScheme.getOverride())}
      </span>
    </button>
  );
}
