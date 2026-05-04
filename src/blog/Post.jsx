import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect, useMemo } from "react";
import { posts } from "./index";
import { getReadingTime, formatDate, extractHeadings } from "./utils";
import Layout from "../Layout";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const headings = useMemo(() => post ? extractHeadings(post.content) : [], [post]);
  const [activeHeading, setActiveHeading] = useState("");

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

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!post) return <Layout><div className="p-6">Post not found.</div></Layout>;

  const relatedPosts = posts
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <Layout>
      <article className="blog-post-page">
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <time>{formatDate(post.date)}</time>
            <span>{getReadingTime(post.content)}</span>
          </div>
        </header>

        <div className="blog-post-divider"></div>

        <div className="blog-post-layout">
          <aside className="blog-toc">
            <h3>Contents</h3>
            <nav>
              <ul>
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className={`toc-item toc-level-${h.level} ${activeHeading === h.id ? "active" : ""}`}
                  >
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => handleTocClick(e, h.id)}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="blog-post-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({children, ...props}) => {
                  const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                h3: ({children, ...props}) => {
                  const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return <h3 id={id} {...props}>{children}</h3>;
                },
                blockquote: (props) => (
                  <blockquote {...props} />
                ),
                ul: (props) => <ul {...props} />,
                ol: (props) => <ol {...props} />,
                li: (props) => <li {...props} />,
                p: ({children, ...props}) => (
                  <p {...props}>{children}</p>
                ),
                a: (props) => <a {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>

            <div className="blog-post-footer">
              <div className="author-bio">
                <div className="author-info">
                  <h4>Igor Kostyuchenok</h4>
                  <p>Serial entrepreneur, speaker, and C-Level mentor in FinTech.</p>
                  <a href="https://newsletter.kostyuchenok.com" target="_blank" rel="noopener noreferrer">
                    Subscribe to the newsletter
                  </a>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>Related Posts</h3>
                  <div className="related-posts-grid">
                    {relatedPosts.map(p => (
                      <Link key={p.slug} to={`/blog/${p.slug}`} className="related-post-card">
                        <h4>{p.title}</h4>
                        <time>{formatDate(p.date)}</time>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
