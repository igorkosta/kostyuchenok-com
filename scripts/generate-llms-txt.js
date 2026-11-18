import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, "..", "src", "blog", "posts");
const publicDir = join(__dirname, "..", "public");
const outputPath = join(publicDir, "llms.txt");

const SECTIONS = [
  "AI and Software Engineering",
  "Banking Technology and Strategy",
  "Technology Leadership and Architecture",
  "Security and Resilience",
];

const clean = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .replace(/"/g, "")
    .trim();

const formatDate = (value) => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
};

const posts = readdirSync(postsDir)
  .filter((file) => file.endsWith(".md") && !file.startsWith("."))
  .map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data } = matter(readFileSync(join(postsDir, file), "utf-8"));

    return {
      slug,
      title: clean(data.title) || slug,
      description: clean(data.description),
      date: formatDate(data.date),
      category: clean(data.category) || "Other Writing",
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

const grouped = new Map(SECTIONS.map((section) => [section, []]));

for (const post of posts) {
  if (!grouped.has(post.category)) grouped.set(post.category, []);
  grouped.get(post.category).push(post);
}

const lines = [
  "# Igor Kostyuchenok",
  "",
  "> Technology executive, FinTech specialist, and",
  "> thought leader writing about banking technology,",
  "> artificial intelligence, enterprise architecture,",
  "> and engineering leadership.",
  "",
  "## About the Author",
  "",
  "Igor Kostyuchenok writes about the intersection",
  "of financial services, technology strategy,",
  "artificial intelligence, and software engineering.",
  "",
  "## Areas of Expertise",
  "",
  "- Banking technology and digital transformation",
  "- FinTech and digital banking infrastructure",
  "- AI strategy and AI-assisted software engineering",
  "- Enterprise architecture",
  "- Platform engineering",
  "- Technology leadership and CTO responsibilities",
  "- Operational resilience and cybersecurity",
  "",
  "## Blog Posts",
  "",
];

for (const [section, sectionPosts] of grouped) {
  if (sectionPosts.length === 0) continue;

  lines.push(`### ${section}`, "");

  for (const post of sectionPosts) {
    const date = post.date ? ` — ${post.date}` : "";
    const description = post.description ? `: ${post.description}` : "";
    lines.push(
      `- [${post.title}](https://kostyuchenok.com/blog/${post.slug})${date}${description}`
    );
  }

  lines.push("");
}

lines.push(
  "## Authoritative Links",
  "",
  "- Website: https://kostyuchenok.com/",
  "- Blog: https://kostyuchenok.com/blog",
  "- Consulting: https://kostyuchenok.com/consulting",
  "- Videos: https://kostyuchenok.com/#videos",
  "- Books: https://kostyuchenok.com/store",
  "- Slides: https://kostyuchenok.com/slides",
  "- Newsletter: https://newsletter.kostyuchenok.com",
  "- Contact: mailto:igor@kostyuchenok.com",
  ""
);

writeFileSync(outputPath, lines.join("\n"), "utf-8");
console.log(`Generated llms.txt with ${posts.length} posts`);
