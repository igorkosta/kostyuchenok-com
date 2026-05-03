import { Link } from "react-router-dom";
import { posts } from "./index";
import { getReadingTime, formatDate } from "./utils";
import Layout from "../Layout";

export default function BlogList() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <Layout>
      <div className="blog-list-page">
        <div className="blog-list-header">
          <h1>Blog</h1>
          <p>Thoughts on FinTech, AI, and building resilient systems.</p>
        </div>

        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="featured-post"
          >
            <div className="featured-content">
              <span className="featured-label">Featured</span>
              <h2>{featured.title}</h2>
              <p className="featured-excerpt">{featured.description}</p>
              <div className="featured-meta">
                <time>{formatDate(featured.date)}</time>
                <span>{getReadingTime(featured.content)}</span>
              </div>
            </div>
          </Link>
        )}

        <div className="posts-grid">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="post-card"
            >
              <div className="post-card-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <div className="post-card-meta">
                <time>{formatDate(post.date)}</time>
                <span>{getReadingTime(post.content)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
