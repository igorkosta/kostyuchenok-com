import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Talks from "./Talks";
import { posts } from "./blog";
import { getReadingTime, formatMonthYear } from "./blog/utils";
import { books } from "./data/books";

const CONSULTING_ROWS = [
  {
    num: "01",
    name: "Technology advisory",
    description: "For boards and CTOs who need a second opinion that has shipped.",
    format: "Monthly retainer",
  },
  {
    num: "02",
    name: "Architecture sprint",
    description: "A decision memo and target architecture in two to six weeks.",
    format: "Fixed scope",
  },
  {
    num: "03",
    name: "Executive mentoring",
    description: "One-to-one for new CTOs and founders, 90 minutes a month.",
    format: "1:1",
  },
];

export default function Landing() {
  useEffect(() => {
    document.title = "Igor Kostyuchenok — Fintech operator, author, advisor";
  }, []);

  const latest = posts[0];
  const writing = posts.slice(0, 5);
  const latestTitle = latest ? latest.title.split(".")[0] : "New essay";

  return (
    <Layout>
      <section className="hero container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Co-founder, Mbanq &middot; Fintech operator &middot; Author</p>
            <h1 className="hero-title">I build the infrastructure banks compete on.</h1>
            <p className="hero-follow">Then I write about the ones that can&rsquo;t.</p>
            <p className="hero-lede">
              Fifteen years shipping banking products that survive regulators, audits and
              scale &mdash; first as a builder, now as an advisor to the teams trying to do
              the same.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/consulting">
                Work with me <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                className="btn btn-ghost"
                to={latest ? `/blog/${latest.slug}` : "/blog"}
              >
                Read the latest essay
              </Link>
            </div>
          </div>

          <figure className="hero-figure">
            <div className="frame">
              <img
                src="/img/turtleneck-me.png"
                alt="Portrait of Igor Kostyuchenok"
                width="690"
                height="714"
              />
              <span className="fig-tag">Fig. 01</span>
            </div>
            <figcaption className="figcaption">
              <span>Igor Kostyuchenok, co-founder of Mbanq</span>
              <span>Germany &middot; 2026</span>
            </figcaption>
          </figure>
        </div>

        <div className="status" aria-label="Current status">
          <div className="status-grid">
            <div className="status-item">
              <p className="status-k">Now</p>
              <p className="status-v">
                <a
                  className="status-link"
                  href="https://www.mbanq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Co-founder at <b>Mbanq</b>
                </a>
              </p>
            </div>
            <div className="status-item">
              <p className="status-k">Writing</p>
              <p className="status-v">
                <Link className="status-link" to={latest ? `/blog/${latest.slug}` : "/blog"}>
                  {latestTitle}
                </Link>
              </p>
            </div>
            <div className="status-item">
              <p className="status-k">Next</p>
              <p className="status-v">
                <a
                  className="status-link"
                  href="https://unchainfestival.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UNCHAIN Festival &middot; Main Stage
                </a>
              </p>
            </div>
            <div className="status-item">
              <p className="status-k">Advisory</p>
              <p className="status-v">
                <Link className="status-link" to="/consulting#contact">
                  <b>1 slot open</b> &middot; Q1 2027
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="now">
        <div className="section-head">
          <p className="label">
            <b>01</b> Now
          </p>
          <a className="text-link" href="mailto:igor@kostyuchenok.com">
            Get in touch &#8599;
          </a>
        </div>

        <div className="now-grid">
          <div className="now-lead">
            <h2 className="display">
              Banks don&rsquo;t have technology problems. They have decision problems.
            </h2>
          </div>

          <div className="now-body">
            <p>
              Most banks I walk into don&rsquo;t lack engineers, vendors or budget. They
              lack a clear answer to what they are actually building, who owns it, and what
              they will stop doing. The technology follows.
            </p>
            <p>
              At Mbanq I spent fifteen years building the rails that fintechs and banks run
              on. Now I advise the teams on the other side of that decision &mdash; and write
              about why so many get it wrong.
            </p>
          </div>

          <aside className="facts" aria-label="At a glance">
            <div className="fact">
              <span className="fact-n">15+</span>
              <span className="fact-l">years shipping fintech products</span>
            </div>
            <div className="fact">
              <span className="fact-n">2</span>
              <span className="fact-l">books on fintech and startups</span>
            </div>
            <div className="fact">
              <span className="fact-n">1</span>
              <span className="fact-l">BaaS platform, built from the inside</span>
            </div>
          </aside>
        </div>

        <div className="featured">
          <span className="featured-k">Worked with</span>
          <a href="https://www.mbanq.com" target="_blank" rel="noopener noreferrer">
            Mbanq
          </a>
          <a href="https://salmon.group/" target="_blank" rel="noopener noreferrer">
            Salmon Group
          </a>
          <a href="https://hawk.ai/" target="_blank" rel="noopener noreferrer">
            Hawk AI
          </a>
        </div>
        <div className="featured featured-sub">
          <span className="featured-k">Spoke at</span>
          <a href="https://unchainfestival.com/" target="_blank" rel="noopener noreferrer">
            UNCHAIN Festival
          </a>
          <a href="https://balticfintechdays.com/" target="_blank" rel="noopener noreferrer">
            Baltic Fintech Days
          </a>
          <span className="featured-item">Rocket Conf</span>
          <span className="featured-item">Tech&rsquo;o&rsquo;Space</span>
          <a
            href="https://ki-in-produkt-treffen.andersenlab.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andersen Labs
          </a>
        </div>
      </section>

      <section className="section container" id="writing">
        <div className="section-head">
          <p className="label">
            <b>02</b> Selected writing
          </p>
          <Link className="text-link" to="/blog">
            All writing &#8599;
          </Link>
        </div>

        <div className="writing-list">
          {writing.map((post, index) => (
            <Link key={post.slug} className="writing-row" to={`/blog/${post.slug}`}>
              <span className="w-index">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="w-title">{post.title}</span>
                {post.description ? <span className="w-dek">{post.description}</span> : null}
              </span>
              <span className="w-meta">
                {formatMonthYear(post.date)}
                <br />
                Essay &middot; {getReadingTime(post.content)}
              </span>
              <span className="w-arrow" aria-hidden="true">
                &#8599;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" id="videos">
        <div className="section-head">
          <p className="label">
            <b>03</b> Videos
          </p>
          <a
            className="text-link"
            href="https://www.youtube.com/playlist?list=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Archive &#8599;
          </a>
        </div>

        <Talks />
      </section>

      <section className="section container" id="books">
        <div className="section-head">
          <p className="label">
            <b>04</b> Books
          </p>
          <Link className="text-link" to="/store">
            Bookstore &#8599;
          </Link>
        </div>

        <div className="books-grid">
          {books.map((book, index) => (
            <div className="book" key={book.id}>
              <img
                className="book-cover"
                src={book.cover}
                alt={`Cover of ${book.title}`}
                loading="lazy"
              />
              <div>
                <p className="book-num">Book {String(index + 1).padStart(2, "0")}</p>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <a
                  className="text-link"
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy on Amazon &#8599;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="consult" id="consulting">
        <div className="container">
          <p className="label">
            <b>05</b> Consulting
          </p>

          <div className="consult-head">
            <h2>Bring me in when the decision is expensive.</h2>
            <p className="consult-lede">
              Architecture, AI strategy and core modernisation for banks and fintechs.
              Operator judgment, not a slide deck.
            </p>
          </div>

          <div className="consult-list">
            {CONSULTING_ROWS.map((row) => (
              <Link
                key={row.num}
                className="consult-row"
                to="/consulting#engagements"
              >
                <span className="c-num">{row.num}</span>
                <span className="c-name">{row.name}</span>
                <span className="c-desc">{row.description}</span>
                <span className="c-format">{row.format}</span>
                <span className="c-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </Link>
            ))}
          </div>

          <div className="consult-cta">
            <Link className="btn btn-invert" to="/consulting">
              Work with me <span aria-hidden="true">&#8594;</span>
            </Link>
            <p className="consult-note">One advisory slot open &middot; Q1 2027</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
