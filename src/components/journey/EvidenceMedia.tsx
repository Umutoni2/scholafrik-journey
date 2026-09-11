import type { EvidenceItem, EvidenceStatus } from "@/types/journey";
import { withBasePath } from "@/lib/paths";
import { FileLock2, ImageIcon, Link2 } from "lucide-react";

const STATUS_LABEL: Record<EvidenceStatus, string> = {
  private: "Private Evidence — Available for Academic Review",
  pending: "Media placeholder — add your file when ready",
  public: "Approved evidence",
};

export function MediaPlaceholder({
  label,
  status,
  caption,
  aspect = "landscape",
}: {
  label: string;
  status: EvidenceStatus;
  caption?: string;
  aspect?: "landscape" | "video" | "square";
}) {
  return (
    <figure className={`journey-media journey-media--${aspect} journey-media--${status}`}>
      <div className="journey-media__frame" role="img" aria-label={label}>
        {status === "private" ? (
          <FileLock2 aria-hidden className="journey-media__icon" />
        ) : (
          <ImageIcon aria-hidden className="journey-media__icon" />
        )}
        <p className="journey-media__status">{STATUS_LABEL[status]}</p>
        <p className="journey-media__label">{label}</p>
      </div>
      {caption ? <figcaption className="journey-media__caption">{caption}</figcaption> : null}
    </figure>
  );
}

export function EvidenceCard({ item }: { item: EvidenceItem }) {
  const isPdfSrc = item.src?.match(/\.pdf(\?|$)/i);
  const isVideoSrc = item.src?.match(/\.(mp4|webm|ogg)(\?|$)/i);
  const isImageSrc = item.src && !isVideoSrc && !isPdfSrc;
  const showImage = item.status === "public" && isImageSrc;
  const showInlineVideo = item.status === "public" && isVideoSrc;
  const showPdf = item.status === "public" && isPdfSrc;
  const showWalkthroughVideo = item.status === "public" && item.videoSrc;
  const showCover = item.status === "public" && item.coverSrc;
  const showMedia = showImage || showInlineVideo || showPdf || showWalkthroughVideo || showCover;
  const linkLabel = item.href?.match(/\.pdf(\?|$)/i)
    ? "Open logbook PDF"
    : item.href?.match(/github\.com/i)
      ? "View on GitHub"
      : "Open evidence";

  const content = (
    <>
      {!showMedia ? (
        <div className="journey-evidence__icon" aria-hidden>
          {item.status === "private" ? <FileLock2 size={18} /> : item.href ? <Link2 size={18} /> : <ImageIcon size={18} />}
        </div>
      ) : null}
      <div className="journey-evidence__body">
        <h3 className="journey-evidence__title">{item.label}</h3>
        {showCover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBasePath(item.coverSrc)} alt="" className="journey-evidence__cover" aria-hidden />
        ) : null}
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBasePath(item.src)} alt={item.label} className="journey-evidence__img" />
        ) : null}
        {showPdf ? (
          <iframe
            className="journey-evidence__pdf"
            src={withBasePath(item.src)}
            title={item.label}
          />
        ) : null}
        {showInlineVideo ? (
          <video
            className="journey-evidence__video"
            controls
            preload="metadata"
            playsInline
            src={withBasePath(item.src)}
          >
            Your browser does not support the video tag.
          </video>
        ) : null}
        {showWalkthroughVideo ? (
          <video
            className="journey-evidence__video"
            controls
            preload="metadata"
            playsInline
            src={withBasePath(item.videoSrc)}
          >
            Your browser does not support the video tag.
          </video>
        ) : null}
        <p className="journey-evidence__desc">
          {item.status === "private"
            ? "Private Evidence — Available for Academic Review"
            : item.description}
        </p>
        {item.status === "public" && item.href ? (
          <a className="journey-evidence__link" href={withBasePath(item.href)} target="_blank" rel="noreferrer">
            {linkLabel}
          </a>
        ) : null}
        <span className={`journey-badge journey-badge--${item.status}`}>{item.status}</span>
      </div>
    </>
  );

  return <article className="journey-evidence">{content}</article>;
}

export function MediaGallery({
  items,
}: {
  items: { id: string; alt: string; caption?: string; status: EvidenceStatus; src?: string }[];
}) {
  return (
    <div className="journey-gallery">
      {items.map((item) =>
        item.status === "public" && item.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <figure key={item.id} className="journey-gallery__item">
            <img src={withBasePath(item.src)} alt={item.alt} className="journey-gallery__img" />
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        ) : (
          <MediaPlaceholder
            key={item.id}
            label={item.alt}
            status={item.status}
            caption={item.caption}
          />
        ),
      )}
    </div>
  );
}
