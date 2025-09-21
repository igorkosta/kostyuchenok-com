import React, { useState, useEffect } from "react";
import profilePic from "./assets/me.jpg";

export default function PersonalSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [year, setYear] = useState();
  const currentYear = () =>  setYear(new Date().getFullYear())

  useEffect(() => {
      currentYear();
  }, [])

  const talks = [
    {
      title: "● New Paradigm in Consumer Lending",
      description: "Panel Discussion at the UNCHAIN FinTech Festival in Oradea, Romania in 2025",
      language: "English",
      videoId: "vBu4ByJGNU4", // another example ID
      href: "//www.youtube.com/embed/vBu4ByJGNU4"
    },
    {
      title: "● CLOUD MIGRATION",
      description: "Moderating the Cloud Migraion panel at theUNCHAIN FinTech Festival in Oradea, Romania in 2025",
      language: "English",
      videoId: "Ae4jC65yc78", // another example ID
      href: "//www.youtube.com/embed/Ae4jC65yc78"
    },
    {
      title: "● Evolution of Neobanks",
      description: "On the evolution and the future of neobanks and neobanking. Keynote at the Rocket Conf 2024 in Almaty, Kazakhstan",
      language: "Russian",
      videoId: "iXaRbtYwcUI", // another example ID
      href: "//www.youtube.com/embed/iXaRbtYwcUI"
    },
    {
      title: "● How FinTech changes the Future",
      description: "Panel discussion on the future of FinTech, Payments and Banking. Rocket Conf 2024 in Almaty, Kazakhstan",
      language: "Russian",
      videoId: "C8_3QDyIr6o", // another example ID
      href: "//www.youtube.com/embed/C8_3QDyIr6o"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/igorkostyuchenok/" },
    { name: "Telegram", href: "https://t.me/kostyuchenok" },
    { name: "WhatsApp", href: "https://wa.me/4917661508419" },
    { name: "Email", href: "mailto:igor@kostyuchenok.com" }
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
            {/* <a href="#research">/ Research</a> */}
            <a href="#about-me">/ About Me</a>
            <a href="#contact-me">/ Contact</a>
          </nav>

          {/* Hamburger Button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      <div className="bio">
        <h1 className="hero-text">FinTech Entrepreneur, Speaker, and Author</h1>
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
              </div>
              <div className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${p.videoId}`}
                  title={p.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="about-me">
        <div className="about-me-container">
          <div className="about-me-image">
            <img src={profilePic} alt="Your Name" />
          </div>
          <div className="about-me-bio">
            <p>Serial entrepreneur, speaker, and C-Level mentor.</p>
            <p>{year - 2010}+ years of experience in the FinTech industry creating innovative products and services for Banks and FinTechs.</p>
            <p>Based in Europe.</p>
          </div>
        </div>
      </section>

      <section id="contact-me">
        <h1 className="hero-text">Contact Me</h1>
        <h1 className="hero-text mail">
          <a href="mailto:igor@kostyuchenok.com">igor@kostyuchenok.com</a>
        </h1>
      </section>

      <footer>
        {socialLinks.map((s, i) => (
          <a key={i} href={s.href}>{s.name}</a>
        ))}
      </footer>
    </div>
  );
}

