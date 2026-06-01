/// <reference types="astro/client" />
/// <reference path="../worker-configuration.d.ts" />

declare global {
  type ColorScheme = "dark" | "light" | undefined;
  interface Window {
    _hooks: {
      setColorSchemeOverride(scheme: ColorScheme): void;
      onColorSchemeChanged(listener: () => void): () => void;
      getColorScheme(): {
        active: ColorScheme;
        fromOverride: boolean;
        browserPreference: ColorScheme;
        override: ColorScheme;
      };
    };
  }
  namespace JSX {
    interface HTMLElementTags {
      marquee: any;
    }
  }
  interface Document {
    startViewTransition?: (_: () => Promise<unknown>) => void;
  }
}

export {};
