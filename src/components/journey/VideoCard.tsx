"use client";

import { useState } from "react";
import type { PresentationVideo } from "@/types/journey";
import { withBasePath } from "@/lib/paths";
import { Play } from "lucide-react";
import { MediaPlaceholder } from "./EvidenceMedia";

export function VideoCard({ video }: { video: PresentationVideo }) {
  const [open, setOpen] = useState(false);
  const canPlay = video.videoStatus === "public" && Boolean(video.videoSrc);

  return (
    <article className="journey-video-card">
      <p className="journey-eyebrow">{video.chapter}</p>
      <h3 className="journey-video-card__title">{video.title}</h3>
      <p className="journey-video-card__date">{video.date}</p>

      <div className="journey-video-card__stage">
        {canPlay && open ? (
          <video
            className="journey-video-card__player"
            controls
            preload="metadata"
            playsInline
            src={withBasePath(video.videoSrc)}
          >
            Your browser does not support the video tag.
          </video>
        ) : video.thumbnailStatus === "public" && video.thumbnailSrc ? (
          <button
            type="button"
            className="journey-video-card__thumb-btn"
            onClick={() => (canPlay ? setOpen(true) : undefined)}
            disabled={!canPlay}
            aria-label={canPlay ? `Play ${video.title}` : `${video.title} — video not added yet`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBasePath(video.thumbnailSrc)} alt="" className="journey-video-card__thumb" />
            <span className="journey-video-card__play">
              <Play size={28} fill="currentColor" />
            </span>
          </button>
        ) : (
          <div className="journey-video-card__placeholder-wrap">
            <MediaPlaceholder
              label={`${video.title} thumbnail / video`}
              status={video.videoStatus === "private" ? "private" : "pending"}
              aspect="video"
            />
            {canPlay ? (
              <button
                type="button"
                className="journey-video-card__play journey-video-card__play--overlay"
                onClick={() => setOpen(true)}
                aria-label={`Play ${video.title}`}
              >
                <Play size={28} fill="currentColor" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      <dl className="journey-video-card__meta">
        <div>
          <dt>What I presented</dt>
          <dd>{video.whatPresented}</dd>
        </div>
        <div>
          <dt>What I learned</dt>
          <dd>{video.whatLearned}</dd>
        </div>
        {video.transcriptOrSummary ? (
          <div>
            <dt>Summary</dt>
            <dd>{video.transcriptOrSummary}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
