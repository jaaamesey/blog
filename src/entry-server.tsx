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
          <style>
            {`
            @font-face {
              font-family: "Playfair";
              src: url("/fonts/playfair.woff2");
            }
            @font-face {
              font-family: "Playfair Display";
              src: url("/fonts/playfairdisplay.woff2");
            }
            body {
              font-family: 'Playfair'
            }
            h1 {
              font-family: 'Playfair Display'
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
