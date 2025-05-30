// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <script>{`(${() => {
            let currentColorScheme: ColorScheme | undefined;
            const colorSchemeListeners = new Set<() => void>();
            function syncColorScheme() {
              const scheme =
                window.localStorage.getItem("colorSchemeOverride") ||
                (window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light");
              currentColorScheme = scheme as ColorScheme;
              for (const l of colorSchemeListeners) {
                l();
              }
              if (scheme == "dark") {
                document.documentElement.classList.add("colorSchemeDark");
              } else {
                document.documentElement.classList.remove("colorSchemeDark");
              }
            }
            syncColorScheme();
            window
              .matchMedia("(prefers-color-scheme: dark)")
              .addEventListener("change", syncColorScheme);

            window._hooks = {
              setColorSchemeOverride(scheme) {
                window.localStorage.setItem(
                  "colorSchemeOverride",
                  scheme || "",
                );
                syncColorScheme();
              },
              onColorSchemeChanged(listener: () => void) {
                colorSchemeListeners.add(listener);
                return () => colorSchemeListeners.delete(listener);
              },
              getColorScheme() {
                const override =
                  (window.localStorage.getItem(
                    "colorSchemeOverride",
                  ) as ColorScheme) || undefined;
                return {
                  active: currentColorScheme,
                  fromOverride: !!override,
                  override,
                  browserPreference: window.matchMedia(
                    "(prefers-color-scheme: dark)",
                  ).matches
                    ? "dark"
                    : "light",
                };
              },
            };
          }})()`}</script>
          <style>
            {`
            @font-face {
              font-family: "Playfair";
              src: url("/fonts/playfair.woff2");
              font-display: swap;
            }
            @font-face {
              font-family: "Playfair Display";
              src: url("/fonts/playfairdisplay.woff2");
              font-display: swap;
            }
            body {
              font-family: 'Playfair', serif;
            }
            h1 {
              font-family: 'Playfair Display', serif;
            }
          `}
          </style>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
