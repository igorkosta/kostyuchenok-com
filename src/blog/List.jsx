import { Link } from "react-router-dom";
import { posts } from "./index";

export default function BlogList() {
  return (
    <div className="min-h-screen flex justify-center px-4">
      {/* Centered column taking 80% of screen */}
      <div className="w-[80%] max-w-4xl py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Blog
        </h1>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="
                block
                text-center
                py-5
                px-6
                rounded-xl
                border border-gray-200
                hover:bg-gray-50
                transition
                active:scale-[0.98]
              "
            >
              <div className="text-lg md:text-xl font-semibold text-gray-900">
                {post.title}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {post.date.toISOString().slice(0, 10)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
