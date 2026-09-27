"use client";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
interface VideoCardProps {
  title: string;
  patientName?: string;
  procedureTag?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}
export function VideoCard({
  title,
  patientName,
  procedureTag,
  videoUrl,
  thumbnailUrl,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoId = videoUrl.match(/embed\/([\w-]+)/)?.[1];
  return (
    <article className="video-card">
      <div className="video-media">
        {playing ? (
          <iframe
            src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="video-preview"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${title}`}
          >
            <img
              src={
                thumbnailUrl ||
                `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              }
              alt=""
              loading="lazy"
            />
            <span className="video-play">
              <Play size={23} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <div className="video-caption">
        {procedureTag && <span className="eyebrow-pill">{procedureTag}</span>}
        <h3>{title}</h3>
        {patientName && <p>{patientName}</p>}
        {videoId && (
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Watch on YouTube <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
