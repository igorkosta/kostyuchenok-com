import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bakedVideos from "./data/videos.json";

const PLAYLIST_FEED =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf";
const PLAYLIST_EMBED =
  "https://www.youtube.com/embed/videoseries?list=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf";

function parsePlaylist(xml) {
  try {
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    if (doc.getElementsByTagName("parsererror").length) return [];
    const entries = doc.getElementsByTagName("entry");
    const list = [];
    for (const entry of entries) {
      const id = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
      if (!id) continue;
      const title = entry.getElementsByTagName("title")[0]?.textContent || "";
      const thumb =
        entry.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url") ||
        `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
      list.push({ id, title, thumb });
    }
    return list;
  } catch {
    return [];
  }
}

export default function Talks() {
  const [videos, setVideos] = useState(bakedVideos);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadFailed, setLoadFailed] = useState(bakedVideos.length === 0);
  const trackRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(PLAYLIST_FEED)}`)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then(parsePlaylist)
      .then((v) => {
        if (v.length) setVideos(v);
        else setLoadFailed(true);
      })
      .catch(() => setLoadFailed(bakedVideos.length === 0));
  }, []);

  useEffect(() => {
    if (!videos.length) return;
    trackRef.current
      ?.querySelector(".carousel-card.active")
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex, videos.length]);

  const goPrev = () => setActiveIndex((i) => (i - 1 + videos.length) % videos.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % videos.length);

  return (
    <section id="talks">
      <h2>Talks</h2>
      <p className="section-subtitle">
        Talks and interviews — new videos appear here automatically.
      </p>
      {loadFailed || videos.length === 0 ? (
        <div className="videoseries-embed">
          <iframe
            src={PLAYLIST_EMBED}
            title="Talks and Interviews"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="talks-carousel">
          <div className="talks-player">
            <iframe
              key={videos[activeIndex].id}
              src={`https://www.youtube-nocookie.com/embed/${videos[activeIndex].id}?playsinline=1`}
              title={videos[activeIndex].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="talks-carousel-bar">
            <button className="carousel-arrow" onClick={goPrev} aria-label="Previous video">
              <ChevronLeft size={28} />
            </button>
            <div className="carousel-track" ref={trackRef}>
              {videos.map((v, i) => (
                <button
                  key={v.id}
                  className={`carousel-card ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <span className="carousel-card-title">{v.title}</span>
                </button>
              ))}
            </div>
            <button className="carousel-arrow" onClick={goNext} aria-label="Next video">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}