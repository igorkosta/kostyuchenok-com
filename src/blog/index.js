import matter from "gray-matter";

// Vite version (recommended)
const modules = import.meta.glob("./posts/*.md", { as: "raw", eager: true });

export const posts = Object.entries(modules).map(([path, content]) => {
  const slug = path.split("/").pop().replace(".md", "");
  const { data, content: markdown } = matter(content);

  return {
    slug,
    ...data,
    content: markdown,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));
