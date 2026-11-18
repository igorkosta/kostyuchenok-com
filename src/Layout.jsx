import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Writing", to: "/#writing", hash: "#writing" },
  { label: "Videos", to: "/#videos", hash: "#videos" },
  { label: "Books", to: "/#books", hash: "#books" },
  { label: "About", to: "/#now", hash: "#now" },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { pathname, hash } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="site-shell" id="top">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <Link className="wordmark" to="/">
            Igor Kostyuchenok<em>.</em>
          </Link>

          <button
            ref={menuRef}
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>

          <nav
            className={menuOpen ? "nav open" : "nav"}
            id="primary-nav"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              const active = onHome && hash === item.hash;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={active ? "active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link className="cta" to="/consulting">
              Work with me <span aria-hidden="true">&#8599;</span>
            </Link>
          </nav>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="footer">
        <div className="container">
          <a className="footer-email" href="mailto:igor@kostyuchenok.com">
            igor@kostyuchenok.com
          </a>
          <p className="footer-lede">
            For advisory, press, or a good argument about core banking.
          </p>

          <div className="footer-grid">
            <div className="footer-col">
              <h4>Explore</h4>
              <Link to="/blog">Writing</Link>
              <Link to="/#videos">Videos</Link>
              <Link to="/store">Books</Link>
              <Link to="/slides">Slides</Link>
              <Link to="/consulting">Consulting</Link>
            </div>
            <div className="footer-col">
              <h4>Elsewhere</h4>
              <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">
                Newsletter &#8599;
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube &#8599;
              </a>
              <a href="https://calendly.com/igor-kostyuchenok" target="_blank" rel="noopener noreferrer">
                Calendly &#8599;
              </a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                CV (PDF) &#8599;
              </a>
            </div>
            <div className="footer-col">
              <h4>Based</h4>
              <p>Germany</p>
              <p className="muted">CET &middot; works across time zones</p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Igor Kostyuchenok</span>
            <span>FinTech operator &middot; Author &middot; Advisor</span>
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back to top &#8593;
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
