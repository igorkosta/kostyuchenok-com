import { Routes, Route } from "react-router-dom";
import Landing from "./Landing.jsx";
import BlogList from "./blog/List";
import BlogPost from "./blog/Post";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}
