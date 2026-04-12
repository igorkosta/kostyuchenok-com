import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { shorts } from "./index";
import Layout from "../Layout";

export default function Shorts() {
  return (
    <Layout>
      <div className="flex justify-center px-4">
        <div className="w-[80%] max-w-4xl py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Shorts
          </h1>

          <div className="flex flex-col gap-6">
            {shorts.map((short) => (
              <article
                key={short.slug}
                className="
                  block
                  py-5
                  px-6
                  rounded-xl
                  border border-gray-200
                  hover:bg-gray-50
                  transition
                  active:scale-[0.98]
                "
              >
                <time className="text-sm text-gray-500">
                  {new Date(short.date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  {short.id && <span className="ml-2 text-xs text-gray-400">id:{short.id}</span>}
                </time>
                <div className="mt-2 prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {short.content}
                  </ReactMarkdown>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
