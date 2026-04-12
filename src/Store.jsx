import { books } from "./data/books";
import Layout from "./Layout";

export default function Store() {
  return (
    <Layout>
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
    </Layout>
  );
}
