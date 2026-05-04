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
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`menu-toggle-line ${menuOpen ? 'line-open' : ''}`}></span>
            <span className={`menu-toggle-line ${menuOpen ? 'line-open' : ''}`}></span>
          </button>
        </div>
      </header>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/store" className={path === '/store' ? 'active' : ''}>Store</Link>
        <Link to="/slides" className={path.startsWith('/slides') ? 'active' : ''}>Slides</Link>
        <Link to="/blog" className={path.startsWith('/blog') ? 'active' : ''}>Blog</Link>
        <Link to="/shorts" className={path === '/shorts' ? 'active' : ''}>Shorts</Link>
        <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
      </nav>

      {children}

      <footer>
        <p>© {new Date().getFullYear()} Igor Kostyuchenok. All rights reserved.</p>
      </footer>
    </div>
  );
}
