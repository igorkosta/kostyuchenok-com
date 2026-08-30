import React, { useState, useEffect } from "react";
import profilePic from "./assets/me.jpg";
import Layout from "./Layout";
import Talks from "./Talks";

export default function Landing() {
  const [year, setYear] = useState();
  const currentYear = () =>  setYear(new Date().getFullYear())

  useEffect(() => {
      currentYear();
  }, [])

  const services = [
    {
      title: "CTO / C-Level Advisory",
      description:
        "Embedded guidance for boards and founders on architecture, technology strategy, and engineering leadership."
    },
    {
      title: "AI Strategy, Not an RFP",
      description:
        "Cut through vendor decks and analyst reports to decide what AI your business actually needs — and what it doesn't."
    },
    {
      title: "Core & Platform Modernization",
      description:
        "Move off brittle, patched-together legacy systems toward cloud-native, real-time infrastructure."
    },
    {
      title: "Mentoring for Leaders",
      description:
        "One-on-one executive mentoring for founders and C-level leaders navigating the next wave of banking technology."
    }
  ];

  return (
    <Layout>
      <section id="consulting" className="consulting-hero">
        <div className="consulting-inner">
          <div className="consulting-hero-layout">
            <div className="consulting-hero-heading">
              <span className="eyebrow">Consulting</span>
              <h1 className="consulting-title">
                Driving Digital Transformation & Resilient Infrastructure in Regulated Environments.
              </h1>
            </div>
            <p className="consulting-intro">
              I help banks and FinTechs build technology that survives the next five years —
              AI strategy, core modernization, and real-time infrastructure.{" "}
              <strong>15+ years of shipping FinTech products and services.</strong>
            </p>
          </div>
          <div className="consulting-cta">
            <a
              href="https://calendly.com/igor-kostyuchenok"
              target="_blank"
              rel="noopener noreferrer"
              className="book-button"
            >
              Book a free intro call
            </a>
            <span>or email</span>
            <a href="mailto:igor@kostyuchenok.com" className="consulting-email-link">
              igor@kostyuchenok.com
            </a>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-me">
        <div className="about-me-container">
          <div className="about-me-image">
            <img src={profilePic} alt="Igor" />
          </div>
          <div className="about-me-bio">
            <p>Serial entrepreneur, speaker, and C-Level mentor.</p>
            <p>{year - 2010}+ years of experience in the FinTech industry creating innovative products and services for Banks and FinTechs.</p>
          </div>
        </div>
      </section>

      <Talks />

      <section id="contact-me">
        <h1 className="large-text">Contact Me</h1>
        <h1 className="large-text mail">
          <a href="mailto:igor@kostyuchenok.com">igor@kostyuchenok.com</a>
        </h1>
      </section>
    </Layout>
  );
}
