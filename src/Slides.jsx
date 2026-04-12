import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import slideContent from './data/slides/ai-state-2026.md?raw';
import SoftwareMeltdown from './data/slides/SoftwareMeltdown.jpeg';
import DarioSam from './data/slides/DarioSam.webp';

const images = {
  'SoftwareMeltdown.jpeg': SoftwareMeltdown,
  'DarioSam.webp': DarioSam
};

const parseSlides = (md) => {
  return md.split(/^---$/m).map(s => s.trim()).filter(s => s);
};

const simpleMarkdown = (text) => {
  let html = text;

  // Handle images first (not anchored to line start)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const filename = src.replace('./', '');
    const img = images[filename];
    return img ? `<div style="display:flex; justify-content:center; align-items:center; height:100%;"><img src="${img}" alt="${alt}" style="max-width:80%; max-height:80%; object-fit:contain;" /></div>` : match;
  });

  // Then handle headers
  html = html
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^- (.+)$/gm, '<li>$1</li>');

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li>[\s\S]*?<\/li>)(\s*<li>[\s\S]*?<\/li>)*/g, '<ul>$&</ul>');

  // Wrap <ul> in <div> for better spacing
  html = html.replace(/(<ul>[\s\S]*?<\/ul>)/g, '<div class="list">$1</div>');

  return html;
};

export default function Slides() {
  const { slug } = useParams();
  const deckRef = useRef(null);
  const ready = useRef(false);

  const slidesBySlug = {
    'ai-state-2026': slideContent
  };

  const rawContent = slidesBySlug[slug] || '';
  const slides = parseSlides(rawContent);

  useEffect(() => {
    if (slides.length > 0 && window.Reveal && !ready.current) {
      ready.current = true;

      const deck = new window.Reveal(deckRef.current, {
        hash: true,
        embedded: true,
        keyboard: true,
        transition: 'slide',
        margin: 0,
        padding: 0,
        center: false
      });

      deck.initialize().then(() => {
        deck.layout();
      });
    }
  }, [slides.length]);

  if (slides.length === 0) {
    return <div style={{ padding: 50, color: '#fff' }}>Slides not found: {slug}</div>;
  }

  return (
    <div ref={deckRef} className="reveal" style={{ height: '100vh' }}>
      <div className="slides">
        {slides.map((slide, i) => (
          <section key={i} dangerouslySetInnerHTML={{ __html: simpleMarkdown(slide) }} />
        ))}
      </div>
      <style>{`
        .reveal .slides {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .reveal .slides > section {
          padding: 0 !important;
          width: 100% !important;
        }
        .reveal h1 { font-size: 2.5em; margin-bottom: 0.5em; }
        .reveal h2 { font-size: 1.8em; margin-bottom: 0.5em; }
        .reveal h3 { font-size: 1.3em; }
        .reveal ul { margin: 10px 0; }
        .reveal li { margin: 8px 0; }
      `}</style>
    </div>
  );
}
