import { useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { sendEnquiry } from "./utils/contact";

const ENGAGEMENTS = [
  {
    name: "Technology advisory",
    note: "For boards and CTOs who need a second opinion that has shipped.",
    who: "Boards, CTOs, founders",
    outcome:
      "A standing second opinion on architecture, hiring, vendor decisions and AI priorities.",
    format: "Monthly retainer",
  },
  {
    name: "Architecture & AI sprint",
    note: "A decision memo and target architecture, built with your engineers.",
    who: "Banks mid-decision",
    outcome:
      "One clear decision, the trade-offs behind it, and a plan your team can defend.",
    format: "Fixed scope · 2–6 weeks",
  },
  {
    name: "Executive mentoring",
    note: "Private guidance for the job nobody prepared you for.",
    who: "New CTOs, founders",
    outcome:
      "A confidential sounding board for the decisions you cannot take to your board.",
    format: "90 min · monthly",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Operator",
    text: "Fifteen years building the systems, not advising from the sidelines.",
  },
  {
    num: "02",
    title: "Scope",
    text: "You know what you are buying, and what it costs, before we start.",
  },
  {
    num: "03",
    title: "Decision",
    text: "One decision per engagement. If we cannot name it, we should not begin.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Intro call",
    text: "You describe the decision. I tell you honestly whether I can help.",
    time: "30 minutes",
  },
  {
    num: "02",
    title: "Scope",
    text: "One page: the question, the deliverables, the dates, the fee.",
    time: "1 week",
  },
  {
    num: "03",
    title: "Work",
    text: "Interviews, architecture and documents — with your team, not around it.",
    time: "2–6 weeks",
  },
  {
    num: "04",
    title: "Handoff",
    text: "A decision your team can defend without me in the room.",
    time: "1 week",
  },
];

const TRACK_RECORD = [
  {
    label: "Mbanq",
    text: "Co-founded and helped build a banking-as-a-service platform used by banks and fintechs.",
  },
  {
    label: "Worked with",
    text: "Mbanq, Salmon Group and Hawk AI.",
  },
  {
    label: "Advisory",
    text: "Worked with banks and fintechs on core modernisation, platform teams and AI strategy.",
  },
  {
    label: "Writing",
    text: "Author of FinTech 101 and Startup, Please; essays on fintech, AI and resilient systems.",
  },
  {
    label: "Speaking",
    text: "UNCHAIN Festival, Baltic Fintech Days, Rocket Conf, Tech’o’Space and Andersen Labs.",
  },
];

const GOOD_FIT = [
  "You are choosing a core, a platform or an AI direction, and the cost of being wrong is high.",
  "Your CTO is new, overloaded, or fighting a committee that has never shipped.",
  "You want an operator who has built the thing, not a maturity model with a logo.",
  "Your team will be in the room. You want capability left behind, not dependency.",
];

const NOT_FIT = [
  "You need staff augmentation or a delivery team to execute a plan.",
  "You want a vendor selection rubber-stamped after the decision is made.",
  "You need someone to run the programme for two years.",
  "You are looking for the cheapest opinion available.",
];

const FAQ = [
  {
    q: "Do you sign NDAs?",
    a: "Yes. A mutual NDA before anything sensitive. I am happy to use your template.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. I am based in Germany and work across time zones. I travel for workshops and board sessions when being in the room actually matters.",
  },
  {
    q: "Can you work with our existing team and vendors?",
    a: "That is the point. I work with in-house engineers, architects and vendors, not around them. If the honest answer is to replace everyone, I will say so before you hire me.",
  },
  {
    q: "Do you have a conflict of interest with Mbanq?",
    a: "I am a co-founder of Mbanq. If an engagement overlaps with Mbanq’s business, I will tell you before we start and decline if it is not clean.",
  },
  {
    q: "How do you price?",
    a: "Fixed scope for sprints, and a monthly retainer for advisory and mentoring. No hourly billing, no surprise invoices. Fees are agreed in writing before work begins.",
  },
  {
    q: "How soon can you start?",
    a: "One advisory slot opens in Q1 2027. Sprints can usually begin within a few weeks of a scoped intro call.",
  },
  {
    q: "What does “AI strategy” actually mean here?",
    a: "Deciding what to build, what to buy and what to ignore — including the data, platform and people work that has to happen first. Not an RFP with a chatbot attached.",
  },
];

export default function Consulting() {
  const startedAt = useRef(Date.now());
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    document.title = "Work with me — Igor Kostyuchenok";
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form));

    if (data.website) return;

    if (Date.now() - startedAt.current < 2500) {
      setStatus({
        type: "error",
        message: "Please take a moment to complete the form, then submit again.",
      });
      return;
    }

    setSending(true);
    setStatus({ type: "sending", message: "Sending your enquiry…" });

    try {
      const method = await sendEnquiry(data);

      if (method === "email") {
        form.reset();
        setStatus({
          type: "sent",
          message:
            "Thank you. Your enquiry is on its way — I read every note myself and reply within two working days.",
        });
      } else {
        setStatus({
          type: "mailto",
          message:
            "Your email app should open with the details. If it doesn’t, email igor@kostyuchenok.com directly.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          "Something went wrong. Please email igor@kostyuchenok.com directly and I will pick it up from there.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <Layout>
      <section className="page-hero container">
        <div className="page-hero-grid">
          <div>
            <p className="kicker">Consulting &middot; Co-founder, Mbanq</p>
            <h1>Bring me in when the decision is expensive.</h1>
            <p className="lede">
              I help banks and fintechs decide what to build, what to kill, and how to ship
              it without an eighteen-month committee. Fixed scope, direct access, no layers.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://calendly.com/igor-kostyuchenok"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an intro call <span aria-hidden="true">&#8599;</span>
              </a>
              <a className="btn btn-ghost" href="mailto:igor@kostyuchenok.com">
                Email me
              </a>
            </div>
          </div>

          <aside className="availability" aria-label="Availability">
            <div className="avail-row">
              <p className="avail-k">Availability</p>
              <p className="avail-v">
                <b>1 advisory slot</b> &middot; Q1 2027
              </p>
            </div>
            <div className="avail-row">
              <p className="avail-k">Engagements</p>
              <p className="avail-v">Retainer &middot; Sprint &middot; 1:1</p>
            </div>
            <div className="avail-row">
              <p className="avail-k">Based</p>
              <p className="avail-v">Germany &middot; CET</p>
            </div>
          </aside>
        </div>

        <div className="principles">
          {PRINCIPLES.map((principle) => (
            <div className="principle" key={principle.num}>
              <p className="p-k">
                {principle.num} &mdash; {principle.title}
              </p>
              <p>{principle.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="engagements">
        <div className="section-head">
          <p className="label">
            <b>01</b> Engagements
          </p>
          <a className="text-link" href="#contact">
            Start a conversation &#8599;
          </a>
        </div>

        <div className="eng">
          <div className="eng-head">
            <span>Engagement</span>
            <span>For</span>
            <span>Outcome</span>
            <span>Format</span>
            <span></span>
          </div>

          {ENGAGEMENTS.map((engagement) => (
            <a className="eng-row" href="#contact" key={engagement.name}>
              <span className="eng-name">
                {engagement.name}
                <small>{engagement.note}</small>
              </span>
              <span className="eng-cell">
                <span className="eng-k">For</span>
                {engagement.who}
              </span>
              <span className="eng-cell">
                <span className="eng-k">Outcome</span>
                {engagement.outcome}
              </span>
              <span className="eng-cell">
                <span className="eng-k">Format</span>
                {engagement.format}
              </span>
              <span className="eng-arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
          ))}
        </div>

        <p className="table-note">
          Every engagement starts with a 30-minute intro call. Fees are agreed in writing
          before any work begins.
        </p>
      </section>

      <section className="section container" id="process">
        <div className="section-head">
          <p className="label">
            <b>02</b> How it works
          </p>
          <span className="text-link">No discovery theatre</span>
        </div>

        <div className="process">
          {PROCESS.map((step) => (
            <div className="step" key={step.num}>
              <p className="step-n">{step.num}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <time>{step.time}</time>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="track-record">
        <div className="section-head">
          <p className="label">
            <b>03</b> Track record
          </p>
          <a className="text-link" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            CV (PDF) &#8599;
          </a>
        </div>

        <div className="proof">
          <div className="quote-slot">
            <p className="q-label">How I work</p>
            <p>
              &ldquo;Every engagement ends with a decision your team can defend without
              me.&rdquo;
            </p>
            <p className="q-note">Igor Kostyuchenok</p>
          </div>

          <div className="track">
            {TRACK_RECORD.map((row) => (
              <div className="track-row" key={row.label}>
                <span>{row.label}</span>
                <span>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" id="fit">
        <div className="section-head">
          <p className="label">
            <b>04</b> Fit
          </p>
          <span className="text-link">Be honest with yourself</span>
        </div>

        <div className="fit">
          <div className="fit-col fit-yes">
            <h3>Good fit</h3>
            <ul>
              {GOOD_FIT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fit-col fit-no">
            <h3>Probably not</h3>
            <ul>
              {NOT_FIT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section container" id="faq">
        <div className="section-head">
          <p className="label">
            <b>05</b> Questions
          </p>
          <a className="text-link" href="mailto:igor@kostyuchenok.com">
            Ask another &#8599;
          </a>
        </div>

        <div className="faq">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span className="plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="faq-body">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section container" id="contact">
        <div className="section-head">
          <p className="label">
            <b>06</b> Start a conversation
          </p>
          <span className="text-link">Reply within two working days</span>
        </div>

        <div className="form-wrap">
          <div className="form-intro">
            <p>
              Tell me what you are deciding. I read every note myself and reply within two
              working days. If it is not a fit, I will say so.
            </p>
            <a
              className="text-link"
              href="https://calendly.com/igor-kostyuchenok"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prefer to book a call? &#8599;
            </a>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="startedAt" value={startedAt.current} />
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
            </div>

            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="role">Role</label>
              <input id="role" name="role" type="text" autoComplete="organization-title" />
            </div>
            <div className="field full">
              <label htmlFor="decision">What are you deciding?</label>
              <textarea id="decision" name="decision" required></textarea>
            </div>
            <div className="field">
              <label htmlFor="timeline">Timeline</label>
              <select id="timeline" name="timeline" defaultValue="">
                <option value="">Select</option>
                <option>Next 30 days</option>
                <option>This quarter</option>
                <option>Next quarter</option>
                <option>Exploring</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="budget">Budget (optional)</label>
              <select id="budget" name="budget" defaultValue="">
                <option value="">Prefer not to say</option>
                <option>Under €10k</option>
                <option>€10–25k</option>
                <option>€25–50k</option>
                <option>€50k+</option>
              </select>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send enquiry"}{" "}
                <span aria-hidden="true">&#8594;</span>
              </button>
              <p className="form-note">
                No newsletter. No CRM sequence. Your note goes to me.
              </p>
            </div>

            <div
              className={status.type === "idle" ? "form-status" : "form-status show"}
              role="status"
              aria-live="polite"
            >
              {status.type === "sent" || status.type === "mailto" ? (
                <>
                  <b>Thank you.</b> {status.message}
                </>
              ) : (
                status.message
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
