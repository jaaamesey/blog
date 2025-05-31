import { createResource, createRoot, ErrorBoundary, Suspense } from "solid-js";
import { clientOnly } from "@solidjs/start";

const EmbedReactComponentImpl = <
  ReactProps extends Record<string, unknown> | undefined,
>(props: {
  loader: () => Promise<React.FunctionComponent<ReactProps>>;
  props?: ReactProps;
}) => {
  const [component] = createResource(async () => {
    const [Component, { SynchronousReactComponent }] = await Promise.all([
      props.loader(),
      import("./synchronous_react_component"),
      Promise.reject(),
    ]);
    return createRoot(() => (
      <SynchronousReactComponent Component={Component} props={props.props} />
    ));
  });
  return <>{component()}</>;
};

const EmbedReactComponentLazy = clientOnly(() =>
  Promise.resolve({ default: EmbedReactComponentImpl }),
) as typeof EmbedReactComponentImpl;

export const EmbedReactComponent: typeof EmbedReactComponentLazy = (props) => {
  return (
    <ErrorBoundary
      fallback={<div>An error occurred. Please try refreshing the page.</div>}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <EmbedReactComponentLazy {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
