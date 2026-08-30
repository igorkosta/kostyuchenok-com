import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "src", "data", "videos.json");

const FEED_URL =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf";

const res = await fetch(FEED_URL);
if (!res.ok) {
  throw new Error(`Failed to fetch playlist: HTTP ${res.status}`);
}
const xml = await res.text();

const videos = [];
const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
let match;
while ((match = entryRe.exec(xml))) {
  const block = match[1];
  const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
  if (!id) continue;
  const title = block.match(/<title>([^<]+)<\/title>/)?.[1] || "";
  const thumb =
    block.match(/<media:thumbnail url="([^"]+)"/)?.[1] ||
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
  videos.push({ id, title, thumb });
}

writeFileSync(outputPath, JSON.stringify(videos, null, 2) + "\n", "utf-8");
console.log(`Generated src/data/videos.json with ${videos.length} videos`);