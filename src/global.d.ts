declare module "*.mdx" {
  let MDXComponent: (props: Record<string, unknown>) => any;
  export default MDXComponent;
}
