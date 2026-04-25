import { Link } from 'react-router-dom';

const slides = [
  {
    slug: 'ai-state-2026',
    title: 'Building AI products with AI',
    description: 'A balanced look at AI in 2026 - beyond the hype and fear.',
    date: '2026'
  }
];

export default function SlidesList() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 30 }}>Keynotes</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24
      }}>
        {slides.map(slide => (
          <Link
            key={slide.slug}
            to={`/slides/${slide.slug}`}
            style={{
              display: 'block',
              background: '#1a1a1a',
              borderRadius: 12,
              padding: 24,
              textDecoration: 'none',
              color: '#fff',
              border: '1px solid #333',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            <h2 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{slide.title}</h2>
            <p style={{ color: '#888', marginBottom: 12 }}>{slide.description}</p>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>{slide.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
