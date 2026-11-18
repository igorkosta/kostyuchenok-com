import { useEffect, useRef, useState } from "react";
import bakedVideos from "./data/videos.json";
import videoCategories from "./data/video-categories.json";

const PLAYLIST_FEED =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf";

const CATEGORY_LABELS = {
  talk: "Talk",
  interview: "Interview",
  moderated: "Moderated",
};

const CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "talk", label: "Talks" },
  { key: "interview", label: "Interviews" },
  { key: "moderated", label: "Moderated" },
];

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

function splitTalk(title) {
  const parts = title.split("|").map((part) => part.trim());
  const name = parts[0];
  const venue = parts.slice(1).join(" · ");
  const year = title.match(/20\d{2}/)?.[0] || "";
  return { name, venue, year };
}

export default function Talks() {
  const [videos, setVideos] = useState(bakedVideos);
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const closeRef = useRef(null);
  const lastTrigger = useRef(null);

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastTrigger.current?.focus();
    };
  }, [activeVideo]);

  const openVideo = (event, video) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    lastTrigger.current = event.currentTarget;
    setSelectedId(video.id);
    setActiveVideo(video);
  };

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(PLAYLIST_FEED)}`)
      .then((response) => {
        if (!response.ok) throw new Error("fetch failed");
        return response.text();
      })
      .then(parsePlaylist)
      .then((list) => {
        if (!cancelled && list.length) setVideos(list);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!videos.length) {
    return (
      <a
        className="text-link"
        href="https://www.youtube.com/playlist?list=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch the talks on YouTube &#8599;
      </a>
    );
  }

  const items = videos.map((video) => {
    const category = videoCategories[video.id] || "talk";
    return {
      ...video,
      category,
      categoryLabel: CATEGORY_LABELS[category],
      meta: splitTalk(video.title),
    };
  });
  const visibleItems =
    filter === "all" ? items : items.filter((video) => video.category === filter);
  const featured =
    visibleItems.find((video) => video.id === selectedId) || visibleItems[0];

  return (
    <>
      <div className="talk-filters" role="group" aria-label="Filter videos by category">
        {CATEGORY_FILTERS.map((item) => {
          const count =
            item.key === "all"
              ? items.length
              : items.filter((video) => video.category === item.key).length;
          return (
            <button
              key={item.key}
              type="button"
              className={filter === item.key ? "active" : ""}
              aria-pressed={filter === item.key}
              onClick={() => {
                setFilter(item.key);
                setSelectedId(null);
              }}
            >
              {item.label}
              <span className="talk-filter-count">{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {featured ? (
        <div className="talks-grid">
          <a
            className="featured-talk"
            href={`https://www.youtube.com/watch?v=${featured.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => openVideo(event, featured)}
          >
            <div className="thumb">
              <img src={featured.thumb} alt="" loading="lazy" />
              <span className="play" aria-hidden="true">
                <span className="play-ring">
                  <span className="play-tri"></span>
                </span>
              </span>
            </div>
            <div className="talk-caption">
              <h3>{featured.meta.name}</h3>
              <span>
                <span className="talk-type">{featured.categoryLabel}</span>
                {featured.meta.venue ? <> &middot; {featured.meta.venue}</> : null}
              </span>
            </div>
          </a>

          <div className="talk-list-wrap">
            <div className="talk-rows">
              {visibleItems.map((video) => {
                const isActive = video.id === featured.id;
                return (
                  <a
                    key={video.id}
                    className={`talk-row${isActive ? " active" : ""}`}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => openVideo(event, video)}
                  >
                    <span className="talk-year">{video.meta.year || "—"}</span>
                    <span>
                      <span className="talk-title">{video.meta.name}</span>
                      <span className="talk-venue">
                        <span className="talk-type">{video.categoryLabel}</span>
                        {video.meta.venue ? <> &middot; {video.meta.venue}</> : null}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="talk-empty">No videos in this category yet.</p>
      )}

      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveVideo(null);
          }}
        >
          <div className="video-modal-inner">
            <div className="video-modal-head">
              <p>{activeVideo.title}</p>
              <button
                ref={closeRef}
                type="button"
                className="video-close"
                onClick={() => setActiveVideo(null)}
              >
                Close <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&playsinline=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="video-modal-foot">
              <span>Playing on kostyuchenok.com</span>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
