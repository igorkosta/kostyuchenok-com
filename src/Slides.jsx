import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const importImages = import.meta.glob('./data/slides/*/*.png') || {};
const importImagesJpg = import.meta.glob('./data/slides/*/*.jpeg') || {};
const importImagesWebp = import.meta.glob('./data/slides/*/*.webp') || {};

const getImagesForKeynote = (slug) => {
  const images = {};
  
  const allImages = { ...importImages, ...importImagesJpg, ...importImagesWebp };
  
  Object.entries(allImages).forEach(([path, loader]) => {
    if (path.includes(`/${slug}/`)) {
      const filename = path.split('/').pop();
      images[filename] = loader;
    }
  });
  
  return images;
};

const parseSlides = (md) => {
  return md.split(/^---$/m).map(s => {
    const parts = s.split(/^Note:/m);
    const content = parts[0].trim();
    const notes = parts[1] ? parts[1].trim() : '';
    return { content, notes };
  }).filter(s => s.content);
};

const Image = ({ src, alt, images }) => {
  const filename = src?.replace('./', '').split('?')[0] || '';
  const imgLoader = images[filename];
  
  const [imgSrc, setImgSrc] = useState(null);
  
  useEffect(() => {
    if (imgLoader) {
      imgLoader().then((mod) => {
        setImgSrc(mod.default || mod);
      });
    }
  }, [imgLoader]);
  
  if (!imgLoader) return <span>Image not found: {src}</span>;
  
  let width = '80%';
  let height = '80%';
  
  const urlParams = new URLSearchParams(src.split('?')[1] || '');
  const w = urlParams.get('w');
  const h = urlParams.get('h');
  
  if (w) width = w + 'px';
  if (h) height = h + 'px';
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {imgSrc && <img src={imgSrc} alt={alt || ''} style={{ width, height, objectFit: 'contain' }} />}
    </div>
  );
};

const SlideContent = ({ content, images }) => {
  return (
    <ReactMarkdown
      components={{
        img: ({ src, alt }) => <Image src={src} alt={alt} images={images} />,
        h1: ({ children }) => <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em' }}>{children}</h1>,
        h2: ({ children }) => <h2 style={{ fontSize: '1.8em', marginBottom: '0.5em' }}>{children}</h2>,
        h3: ({ children }) => <h3 style={{ fontSize: '1.3em' }}>{children}</h3>,
        ul: ({ children }) => <ul style={{ margin: '10px 0' }}>{children}</ul>,
        li: ({ children }) => <li style={{ margin: '8px 0' }}>{children}</li>
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const slideModules = import.meta.glob('./data/slides/*/*.md', { query: '?raw', import: 'default', eager: true });

export default function Slides() {
  const { slug } = useParams();
  const deckRef = useRef(null);
  const deckInstance = useRef(null);
  const ready = useRef(false);
  const [images, setImages] = useState({});
  
  useEffect(() => {
    const imgs = getImagesForKeynote(slug);
    setImages(imgs);
  }, [slug]);
  
  const rawContent = slideModules[`./data/slides/${slug}/${slug}.md`] || '';
  const slides = parseSlides(rawContent);

  useEffect(() => {
    if (slides.length > 0 && window.Reveal && !ready.current) {
      ready.current = true;

      deckInstance.current = new window.Reveal(deckRef.current, {
        hash: true,
        embedded: false,
        keyboard: true,
        transition: 'slide',
        margin: 0,
        padding: 0,
        center: false,
        touch: true,
        overview: false,
        history: true,
        width: '100%',
        height: '100%',
        responsive: true,
        controls: true,
        controlsTutorial: false,
        controlsLayout: 'bottom-right',
        controlsBackArrows: 'visible'
      });

      deckInstance.current.initialize().then(() => {
        deckInstance.current.layout();
        deckInstance.current.sync();
      });
    }
  }, [slides.length]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeaker, setShowSpeaker] = useState(false);

  useEffect(() => {
    if (deckInstance.current) {
      deckInstance.current.on('slidechanged', event => {
        setCurrentSlide(event.indexh);
      });
    }
  }, []);

  const openSpeakerView = () => {
    setShowSpeaker(!showSpeaker);
  };

  const goNext = () => deckInstance.current?.right();
  const goPrev = () => deckInstance.current?.left();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 's' || e.key === 'S') {
        setShowSpeaker(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (showSpeaker && deckInstance.current) {
      deckInstance.current.layout();
    }
  }, [showSpeaker, slides.length]);

  if (slides.length === 0) {
    return <div style={{ padding: 50, color: '#fff' }}>Slides not found: {slug}</div>;
  }

  return (
      <div>
      {showSpeaker && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: '#1a1a1a',
          color: '#fff',
          padding: '20px',
          zIndex: 9998,
          overflow: 'auto',
          borderTop: '2px solid #333'
        }}>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>SPEAKER NOTES</div>
          <div style={{ fontSize: '16px', whiteSpace: 'pre-wrap' }}>
            {slides[currentSlide]?.notes || 'No notes for this slide'}
          </div>
        </div>
      )}
      
      
      <div ref={deckRef} className="reveal" style={{ height: '100vh' }}>
      <div className="slides">
        {slides.map((slide, i) => (
          <section key={i}>
            <SlideContent content={slide.content} images={images} />
          </section>
        ))}
      </div>
      <style>{`
        .reveal { color: #fff; }
        .reveal .slides > section {
          padding: 0 !important;
        }
        @media (max-width: 768px) {
          .reveal { font-size: 16px !important; }
          .reveal h1 { font-size: 1.5em !important; }
          .reveal h2 { font-size: 1.2em !important; }
          .reveal h3 { font-size: 1em !important; }
          .reveal p, .reveal li { font-size: 0.8em !important; }
          .reveal img { max-width: 100% !important; max-height: 50vh !important; }
        }
      `}</style>
      </div>
    </div>
  );
}
