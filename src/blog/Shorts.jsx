import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { shorts } from "./index";
import { formatShortDate } from "./utils";
import Layout from "../Layout";

export default function Shorts() {
  return (
    <Layout>
      <div className="shorts-page">
        <header className="shorts-header">
          <h1>Shorts</h1>
          <p>Quick thoughts and observations.</p>
        </header>

        <div className="shorts-feed">
          {shorts.map((short) => (
            <article
              key={short.slug}
              className="short-card"
            >
              <div className="short-meta">
                <time>{formatShortDate(short.date)}</time>
              </div>
              <div className="short-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {short.content}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
