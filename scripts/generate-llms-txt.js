import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, "..", "src", "blog", "posts");
const publicDir = join(__dirname, "..", "public");
const outputPath = join(publicDir, "llms.txt");

const files = readdirSync(postsDir)
  .filter(f => f.endsWith(".md") && !f.startsWith("."));

const posts = files.map(file => {
  const slug = file.replace(".md", "");
  const content = readFileSync(join(postsDir, file), "utf-8");
  const { data } = matter(content);
  return { slug, title: data.title, description: data.description };
});

posts.sort((a, b) => {
  const fileA = files.find(f => f.startsWith(a.slug));
  const fileB = files.find(f => f.startsWith(b.slug));
  return fileA && fileB ? fileA.localeCompare(fileB) : 0;
});

const lines = [
  "# kostyuchenok.com",
  "",
  "> Thoughts on FinTech, AI, and building resilient systems by Igor Kostyuchenok.",
  "",
  "## Blog Posts",
  "",
];

for (const post of posts) {
  const desc = post.description
    ? post.description.replace(/"/g, "").trim()
    : "";
  lines.push(
    `- [${post.title}](https://kostyuchenok.com/blog/${post.slug}): ${desc}`
  );
}

lines.push("");
writeFileSync(outputPath, lines.join("\n"), "utf-8");
console.log(`Generated llms.txt with ${posts.length} posts`);
