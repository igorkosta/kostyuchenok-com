import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { shorts } from "./index";

export default function Shorts() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

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
            <Link to="/blog">Blog</Link>
            <Link to="/shorts" className="active">Shorts</Link>
            <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      <div className="flex justify-center px-4">
        <div className="w-[80%] max-w-4xl py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Shorts
          </h1>

          <div className="flex flex-col gap-6">
            {shorts.map((short) => (
              <article
                key={short.slug}
                className="
                  block
                  py-5
                  px-6
                  rounded-xl
                  border border-gray-200
                  hover:bg-gray-50
                  transition
                  active:scale-[0.98]
                "
              >
                <time className="text-sm text-gray-500">
                  {new Date(short.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <div className="mt-2 prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {short.content}
                  </ReactMarkdown>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Igor Kostyuchenok. All rights reserved.</p>
      </footer>
    </div>
  );
}
