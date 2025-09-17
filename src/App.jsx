import React, { useState } from "react";

export default function PersonalSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const talks = [
    {
      title: "New Paradigm in Consumer Lending",
      description: "Panel Discussion at the UNCHAIN FinTech Festival in Oradea, Romania in 2025",
      language: "English",
      videoId: "vBu4ByJGNU4", // another example ID
      href: "https://www.youtube.com/watch?v=vBu4ByJGNU4"
    },
    {
      title: "CLOUD MIGRATION",
      description: "Moderating the Cloud Migraion panel at theUNCHAIN FinTech Festival in Oradea, Romania in 2025",
      language: "English",
      videoId: "Ae4jC65yc78", // another example ID
      href: "https://www.youtube.com/watch?v=Ae4jC65yc78"
    },
    {
      title: "Эволюция Необанков",
      description: "О будущем Финтеха и Эволюции Необанков. Доклад на конференции, Rocket Conf 2024 в Алматы, Казахстан",
      language: "Russian",
      videoId: "iXaRbtYwcUI", // another example ID
      href: "https://www.youtube.com/watch?v=iXaRbtYwcUI"
    },
    {
      title: "Как финтех меняет будущее",
      description: "Панельная дискуссия на конференции, Rocket Conf 2024 в Алматы, Казахстан",
      language: "Russian",
      videoId: "C8_3QDyIr6o", // another example ID
      href: "https://www.youtube.com/watch?v=C8_3QDyIr6o"
    }
  ];
  const papers = [
    { title: "How I built X", date: "Sep 2025", href: "#" },
    { title: "Design notes: Y", date: "Jul 2025", href: "#" }
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "#" },
    { name: "Telegram", href: "https://t.me/kostyuchenok" },
    { name: "WhatsApp", href: "https://wa.me/4917661508419" },
    { name: "Email", href: "#" }
  ];

  return (
    <div>
      <header>
        <div className="nav-container">
          <a href="/">
            <div className="logo">Igor Kostyuchenok</div>
          </a>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#talks">/ Talks</a>
            <a href="#research">/ Research</a>
            <a href="#contact-me">/ Contact Me</a>
          </nav>

          {/* Hamburger Button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      <div className="bio">
        <h1 className="hero-text">FinTech Entrepreneur, Speaker, and Investor</h1>
      </div>

      <section id="showcase">
        <div className="showcase-video">
          <iframe
            src="https://www.youtube.com/embed/fh3rALh4BRY"
            title="Showcase Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section id="talks">
        <h2>Talks</h2>
        {talks.map((p) => (
          <div key={p.title} className="talk-section">
            <div className="talk">
              <div className="description">
                <div>
                  <span className="title">{p.title}</span>
                  <span className="language-pill">{p.language}</span>
                </div>
                <p>{p.description}</p>
                <a href={p.href} width="50%" target="_blank">Watch on YouTube</a>
              </div>
              <div className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${p.videoId}`}
                  title={p.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="research">
        <h2>Writing</h2>
        <div className="list">
          {papers.map((post) => (
            <div key={post.title} className="list-item">
              <h3><a href={post.href}>{post.title}</a></h3>
              <p>{post.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact-me">
        <h2>Contact Me</h2>
        <p>
          Reach out at <a href="mailto:you@example.com">you@example.com</a> or
          use the form below.
        </p>
        <form action="mailto:you@example.com" method="GET">
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="body" rows={4} placeholder="Your message..."></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      <footer>
        {socialLinks.map((s, i) => (
          <a key={i} href={s.href}>{s.name}</a>
        ))}
      </footer>
    </div>
  );
}

