import { useState } from "react";
import { Link } from "react-router-dom";
import { books } from "./data/books";

export default function Store() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="store-page">
      <header>
        <div className="nav-container">
          <Link to="/">
            <div className="logo">Igor Kostyuchenok</div>
          </Link>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/store" className="active">Store</Link>
            <Link to="/blog">Blog</Link>
            <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">Newsletter</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      <div className="store-container">
        <div className="store-header">
          <h1>Bookstore</h1>
        </div>

        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-item">
              <div className="book-cover-small">
                <img src={book.cover} alt={book.title} />
              </div>
              <div className="book-details">
                <h3>{book.title}</h3>
                <span className="language-pill">{book.language}</span>
                <p className="book-desc">{book.description}</p>
                <div className="book-price">${book.price} USD</div>
                <div className="book-actions">
                  <a
                    href={book.amazonLink}
                    className="buy-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy on Amazon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="store-footer">
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Igor Kostyuchenok. All rights reserved.</p>
      </footer>
    </div>
  );
}
