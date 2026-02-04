import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { posts } from "./index";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <div className="p-6">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        {post.date.toISOString().slice(0, 10)}
      </p>

      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
