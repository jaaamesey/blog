import rss from "@astrojs/rss";
import { allPosts } from "~/all_posts";

export const prerender = true;

export async function GET(context: { site: URL }) {
  const feedUrl = new URL("/rss.xml", context.site).href;

  return rss({
    title: "bikeshedd.ing",
    description: "james karlsson's blog",
    site: context.site,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    items: allPosts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.description,
      link: `/posts/${post.id}`,
    })),
    customData: `<language>en-us</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
  });
}
