import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Meta, MetaProvider } from "@solidjs/meta";

export default function App() {
  return (
    <MetaProvider>
      <Meta name="description" content="James Karlsson's blog" />
      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
