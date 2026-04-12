import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Nav({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen">
      <header>
        <div className="nav-container">
          <Link to="/">
            <div className="logo">Igor Kostyuchenok</div>
          </Link>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/slides/ai-state-2026" className={path.startsWith('/slides') ? 'active' : ''}>Slides</Link>
            <Link to="/store" className={path === '/store' ? 'active' : ''}>Store</Link>
            <Link to="/blog" className={path.startsWith('/blog') ? 'active' : ''}>Blog</Link>
            <Link to="/shorts" className={path === '/shorts' ? 'active' : ''}>Shorts</Link>
            <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      {children}

      <footer>
        <p>© {new Date().getFullYear()} Igor Kostyuchenok. All rights reserved.</p>
      </footer>
    </div>
  );
}