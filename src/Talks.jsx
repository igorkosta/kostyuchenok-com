import { useEffect, useState } from "react";
import bakedVideos from "./data/videos.json";

const PLAYLIST_FEED =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=PLZ-bmETADhY9f_Scgaeu3aZT7bE6iCmSf";

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
  return { name, venue: venue || "Talk", year };
}

export default function Talks() {
  const [videos, setVideos] = useState(bakedVideos);

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

  const [featured, ...others] = videos;
  const featuredMeta = splitTalk(featured.title);

  return (
    <div className="talks-grid">
      <a
        className="featured-talk"
        href={`https://youtu.be/${featured.id}`}
        target="_blank"
        rel="noopener noreferrer"
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
          <h3>{featuredMeta.name}</h3>
          <span>{featuredMeta.venue}</span>
        </div>
      </a>

      <div className="talk-rows">
        {others.slice(0, 4).map((video) => {
          const meta = splitTalk(video.title);
          return (
            <a
              key={video.id}
              className="talk-row"
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="talk-year">{meta.year || "Talk"}</span>
              <span>
                <span className="talk-title">{meta.name}</span>
                <span className="talk-venue">{meta.venue}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
