import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { allPosts } from '../src/all_posts.compile';

export function generateRSS() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toUTCString();
  };

  const rssItems = allPosts.map(post => {
    const postUrl = `https://bikeshedd.ing/posts/${post.id}`;
    const pubDate = formatDate(post.date);
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`;
  }).join('\n');

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>bikeshedd.ing</title>
    <description>james karlsson's blog</description>
    <link>https://bikeshedd.ing</link>
    <language>en-us</language>
    <lastBuildDate>${formatDate(new Date().toISOString())}</lastBuildDate>
    <generator>Custom RSS Generator</generator>
${rssItems}
  </channel>
</rss>`;

  const outputPath = join(process.cwd(), '.output', 'public', 'rss.xml');
  mkdirSync(dirname(outputPath), { recursive: true });
  
  writeFileSync(outputPath, rssContent, 'utf-8');
  console.log(`Generated rss.xml in .output/public/ with ${allPosts.length} posts`);
}
