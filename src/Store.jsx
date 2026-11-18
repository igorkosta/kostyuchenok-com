import { useEffect } from "react";
import { books } from "./data/books";
import Layout from "./Layout";

export default function Store() {
  useEffect(() => {
    document.title = "Books — Igor Kostyuchenok";
  }, []);

  return (
    <Layout>
      <div className="container page">
        <header className="page-head">
          <p className="label">Books</p>
          <h1>Two short books about building.</h1>
          <p className="page-lede">
            Plain-language introductions to the worlds of fintech and startups, written for
            people who would rather understand the terrain before they commit.
          </p>
        </header>

        <div className="store-list">
          {books.map((book) => (
            <article className="store-item" key={book.id}>
              <img
                className="store-cover"
                src={book.cover}
                alt={`Cover of ${book.title}`}
                loading="lazy"
              />
              <div>
                <h2 className="store-title">{book.title}</h2>
                <p className="store-meta">
                  {book.language} &middot; {book.price} USD
                </p>
                <p className="store-desc">{book.description}</p>
                <div className="store-actions">
                  <a
                    className="btn btn-primary"
                    href={book.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy on Amazon <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
