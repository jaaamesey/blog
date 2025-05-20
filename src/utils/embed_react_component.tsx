import { createResource, createRoot } from "solid-js";
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
    ]);
    return createRoot(() => (
      <SynchronousReactComponent Component={Component} props={props.props} />
    ));
  });
  return <>{component()}</>;
};

export const EmbedReactComponent = clientOnly(() =>
  Promise.resolve({ default: EmbedReactComponentImpl }),
) as typeof EmbedReactComponentImpl;
