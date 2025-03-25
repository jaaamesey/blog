declare module "*.mdx" {
  let MDXComponent: (props: Record<string, unknown>) => unknown;
  export default MDXComponent;
}
