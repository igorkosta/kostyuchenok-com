import { useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "./index";
import { getReadingTime, formatMonthYear } from "./utils";
import Layout from "../Layout";

export default function BlogList() {
  useEffect(() => {
    document.title = "Writing — Igor Kostyuchenok";
  }, []);

  return (
    <Layout>
      <div className="container page">
        <header className="page-head">
          <p className="label">Writing</p>
          <h1>Essays on fintech, AI and resilient systems.</h1>
          <p className="page-lede">
            Long-form notes on banking infrastructure, technology strategy and the
            decisions that make or break financial institutions.
          </p>
        </header>

        <div className="writing-list">
          {posts.map((post, index) => (
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
      </div>
    </Layout>
  );
}
