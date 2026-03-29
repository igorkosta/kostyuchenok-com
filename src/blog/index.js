import matter from "gray-matter";

const postModules = import.meta.glob("./posts/*.md", { query: '?raw', import: 'default', eager: true });

export const posts = Object.entries(postModules).map(([path, content]) => {
  const slug = path.split("/").pop().replace(".md", "");
  const { data, content: markdown } = matter(content);

  return {
    slug,
    type: "post",
    ...data,
    content: markdown,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

const shortModules = import.meta.glob("./shorts/*.md", { query: '?raw', import: 'default', eager: true });

export const shorts = Object.entries(shortModules).map(([path, content]) => {
  const slug = path.split("/").pop().replace(".md", "");
  const filename = path.split("/").pop().replace(".md", "");
  const date = new Date(filename);
  
  return {
    slug,
    type: "short",
    date: isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(),
    content: content.trim(),
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));
