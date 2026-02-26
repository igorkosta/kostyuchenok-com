import { useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "./index";
import heroImage from "../assets/blog-hero.jpg";

export default function BlogList() {
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
            <Link to="/blog" className="active">Blog</Link>
            <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      <div className="flex justify-center px-4">
        <div className="w-[80%] max-w-4xl py-12">
          <div className="w-full mb-10">
            <img
              src={heroImage}
              alt="Blog"
              className="w-full h-48 md:h-64 object-cover rounded-2xl"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Blog
          </h1>

          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
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
                <div className="text-lg md:text-xl font-semibold text-gray-900">
                  {post.title}
                </div>
                <div className="text-ms">
                  {post.description}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {post.date.toISOString().slice(0, 10)}
                </div>
              </Link>
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
