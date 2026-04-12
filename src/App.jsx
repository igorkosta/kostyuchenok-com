import { Routes, Route } from "react-router-dom";
import Landing from "./Landing.jsx";
import BlogList from "./blog/List";
import BlogPost from "./blog/Post";
import Shorts from "./blog/Shorts";
import Store from "./Store.jsx";
import Slides from "./Slides.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/store" element={<Store />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/shorts" element={<Shorts />} />
      <Route path="/slides/:slug" element={<Slides />} />
    </Routes>
  )
}
