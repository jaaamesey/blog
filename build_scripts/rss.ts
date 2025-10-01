import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

export function generateRSS() {
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>bikeshedd.ing</title>
    <description>james karlsson's blog</description>
    <link>https://bikeshedd.ing</link>
    <language>en-us</language>
  </channel>
</rss>`;

  const outputPath = join(process.cwd(), '.output', 'public', 'rss.xml');
  mkdirSync(dirname(outputPath), { recursive: true });
  
  writeFileSync(outputPath, rssContent, 'utf-8');
  console.log('Generated rss.xml in .output/public/');
}
