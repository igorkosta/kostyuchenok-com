import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo, useState } from "react";
import { posts } from "./index";
import { getReadingTime, formatMonthYear, extractHeadings } from "./utils";
import Layout from "../Layout";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    document.title = post
      ? `${post.title} — Igor Kostyuchenok`
      : "Post not found — Igor Kostyuchenok";
  }, [post]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleTocClick = (event, id) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!post) {
    return (
      <Layout>
        <div className="container page">
          <header className="page-head">
            <p className="label">Writing</p>
            <h1>Post not found.</h1>
            <p className="page-lede">
              <Link className="text-link" to="/blog">
                Back to all writing &#8599;
              </Link>
            </p>
          </header>
        </div>
      </Layout>
    );
  }

  const relatedPosts = posts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <Layout>
      <article className="container post">
        <header className="post-header">
          <p className="label">Essay</p>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <time>{formatMonthYear(post.date)}</time>
            <span>{getReadingTime(post.content)}</span>
          </div>
        </header>

        <hr className="post-rule" />

        <div className="post-layout">
          {headings.length > 0 && (
            <aside className="post-toc">
              <h3>Contents</h3>
              <nav aria-label="Contents">
                <ul>
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={`toc-item toc-level-${heading.level} ${
                        activeHeading === heading.id ? "active" : ""
                      }`}
                    >
                      <a href={`#${heading.id}`} onClick={(event) => handleTocClick(event, heading.id)}>
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <div className="post-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const id = children
                    ?.toString()
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                  return (
                    <h2 id={id} {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const id = children
                    ?.toString()
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                  return (
                    <h3 id={id} {...props}>
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>

            <footer className="post-footer">
              <div className="author-bio">
                <div className="author-info">
                  <h4>Igor Kostyuchenok</h4>
                  <p>
                    Co-founder of Mbanq. Writes about fintech, AI and the systems banks run
                    on.
                  </p>
                </div>
                <div className="author-links">
                  <Link className="text-link" to="/consulting">
                    Work with me &#8599;
                  </Link>
                  <a
                    className="text-link"
                    href="https://newsletter.kostyuchenok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Newsletter &#8599;
                  </a>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>Related writing</h3>
                  <div className="related-grid">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        className="related-card"
                        to={`/blog/${related.slug}`}
                      >
                        <h4>{related.title}</h4>
                        <time>{formatMonthYear(related.date)}</time>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </div>
        </div>
      </article>
    </Layout>
  );
}
