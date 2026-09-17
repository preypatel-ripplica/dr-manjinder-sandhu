"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  patientName?: string;
  procedureTag?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  patientName,
  procedureTag,
  videoUrl,
  thumbnailUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="card-surface" style={{ overflow: "hidden", position: "relative" }}>
      {/* Video Container */}
      <div style={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // 16:9 Aspect Ratio
        backgroundColor: "var(--secondary)"
      }}>
        {isPlaying ? (
          <iframe
            src={`${videoUrl}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0
            }}
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: thumbnailUrl
                ? `linear-gradient(rgba(26,37,48,0.4), rgba(26,37,48,0.7)), url(${thumbnailUrl}) center/cover no-repeat`
                : "linear-gradient(135deg, var(--secondary) 0%, #0f172a 100%)"
            }}
          >
            {/* Play Button Icon */}
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 25px rgba(230, 35, 52, 0.4)",
              transition: "transform 0.2s ease"
            }}>
              <Play size={26} fill="#ffffff" style={{ marginLeft: "4px" }} />
            </div>
          </div>
        )}
      </div>

      {/* Video Description Info */}
      <div style={{ padding: "1.25rem" }}>
        {procedureTag && (
          <span className="eyebrow-pill" style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}>
            {procedureTag}
          </span>
        )}
        <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginTop: "0.25rem", lineHeight: 1.3 }}>
          {title}
        </h4>
        {patientName && (
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Patient Review • {patientName}
          </p>
        )}
      </div>
    </div>
  );
};
