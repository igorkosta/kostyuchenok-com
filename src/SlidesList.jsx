import { useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    slug: "ai-state-2026",
    title: "Building products with AI",
    description: "A balanced look at AI in 2026 — beyond the hype and fear.",
    date: "2026",
  },
];

export default function SlidesList() {
  useEffect(() => {
    document.title = "Keynotes — Igor Kostyuchenok";
  }, []);

  return (
    <div className="container page">
      <header className="page-head">
        <p className="label">Keynotes</p>
        <h1>Decks from the stage.</h1>
        <p className="page-lede">
          Slides from talks and keynote sessions, published as they are given.
        </p>
      </header>

      <div className="keynotes-grid">
        {slides.map((slide) => (
          <Link key={slide.slug} to={`/slides/${slide.slug}`} className="keynote-card">
            <div>
              <span className="keynote-year">{slide.date}</span>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
            <span className="keynote-open">Open deck &#8599;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
