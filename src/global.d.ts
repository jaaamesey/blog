declare module "*.mdx" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let MDXComponent: (props: Record<string, unknown>) => any;
  export default MDXComponent;
}

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      marquee: any;
    }
  }
  interface Document {
    startViewTransition?: (_: () => Promise<unknown>) => void;
  }
}

export {};
