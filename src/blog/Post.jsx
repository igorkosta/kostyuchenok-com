import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { posts } from "./index";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  if (!post) return <div className="p-6">Post not found.</div>;

  return (
    <div className="min-h-screen">
      <header>
        <div className="nav-container">
          <Link to="/">
            <div className="logo">Igor Kostyuchenok</div>
          </Link>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/store">Store</Link>
            <Link to="/blog" className="active">Blog</Link>
            <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

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

      <footer>
        <p>© {new Date().getFullYear()} Igor Kostyuchenok. All rights reserved.</p>
      </footer>
    </div>
  );
}
