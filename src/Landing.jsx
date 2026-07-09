import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "./assets/me.jpg";
import { books } from "./data/books";
import locationData from "./data/location.json";
import { MapPin, History } from "lucide-react";
import Layout from "./Layout";
import LocationHistory from "./LocationHistory";

export default function Landing() {
  const [year, setYear] = useState();
  const [location, setLocation] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const currentYear = () =>  setYear(new Date().getFullYear())

  useEffect(() => {
      currentYear();
      if (locationData[0]?.latitude && locationData[0]?.longitude) {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${locationData[0].latitude}&lon=${locationData[0].longitude}&format=json&accept-language=en`)
          .then(res => res.json())
          .then(data => {
            const city = data.address.city || data.address.town || data.address.village || data.address.county;
            const country = data.address.country;
            if (city && country) {
              setLocation(`${city}, ${country}`);
            } else if (country) {
              setLocation(country);
            }
          })
          .catch(() => {});
      }
  }, [])

  const talks = [
    {
      title: "● New Paradigm in Consumer Lending",
      description: "Panel Discussion at the UNCHAIN FinTech Festival in Oradea, Romania in 2025",
      language: "English",
      videoId: "vBu4ByJGNU4",
      href: "//www.youtube.com/embed/vBu4ByJGNU4"
    },
    {
      title: "● CLOUD MIGRATION",
      description: "Moderating the Cloud Migraion panel at theUNCHAIN FinTech Festival in Oradea, Romania in 2025",
      language: "English",
      videoId: "Ae4jC65yc78",
      href: "//www.youtube.com/embed/Ae4jC65yc78"
    },
    {
      title: "● Evolution of Neobanks",
      description: "On the evolution and the future of neobanks and neobanking. Keynote at the Rocket Conf 2024 in Almaty, Kazakhstan",
      language: "Russian",
      videoId: "iXaRbtYwcUI",
      href: "//www.youtube.com/embed/iXaRbtYwcUI"
    },
    {
      title: "● How FinTech changes the Future",
      description: "Panel discussion on the future of FinTech, Payments and Banking. Rocket Conf 2024 in Almaty, Kazakhstan",
      language: "Russian",
      videoId: "C8_3QDyIr6o",
      href: "//www.youtube.com/embed/C8_3QDyIr6o"
    }
  ];

  return (
    <Layout>
      <section id="about-me">
        <div className="about-me-container">
          <div className="about-me-image">
            <img src={profilePic} alt="Igor" />
          </div>
          <div className="about-me-bio">
            <p>Serial entrepreneur, speaker, and C-Level mentor.</p>
            <p>{year - 2010}+ years of experience in the FinTech industry creating innovative products and services for Banks and FinTechs.</p>
            <p className="flex items-center gap-2 flex-wrap">
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ display: "inline-flex" }}
              >
                <MapPin size={24} color="#ef4444" />
              </motion.span>
              Currently in {location || "Europe"}.
              <button
                onClick={() => setHistoryOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors bg-transparent px-2 py-1 rounded-md hover:bg-gray-100"
              >
                <History size={14} />
                history
              </button>
            </p>
          </div>
        </div>
      </section>

      <div className="hero">
        <h1>
          Driving Digital Transformation & Resilient Infrastructure in Regulated Environments.
        </h1>
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

      <section id="books">
        <h2>Books</h2>
        <p className="section-subtitle">
          Buy directly via Gumroad (instant delivery) or on Amazon
        </p>
        <div className="books-cta">
          <a href="/store" className="store-link">View Store →</a>
        </div>
        {books.map((b) => (
          <div key={b.id} className="book-section">
            <div className="talk">
              <div className="description">
                <div>
                  <span className="title">{b.title}</span>
                  <span className="language-pill">{b.language}</span>
                </div>
                <p>{b.description}</p>
                <a href={b.amazonLink} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </div>
              <div className="cover">
                <a href={b.amazonLink} target="_blank" rel="noopener noreferrer">
                  <img src={b.cover} alt={b.title} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="contact-me">
        <h1 className="large-text">Contact Me</h1>
        <h1 className="large-text mail">
          <a href="mailto:igor@kostyuchenok.com">igor@kostyuchenok.com</a>
        </h1>
      </section>
      <LocationHistory
        locations={locationData}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />
    </Layout>
  );
}
