import { PostWrapper } from "~/components/post_wrapper";
import Article from "./article.mdx";
import config from "./meta";

export default () => (
  <PostWrapper postConfig={config}>
    <Article />
  </PostWrapper>
);
