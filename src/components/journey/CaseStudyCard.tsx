import type { FeatureCase } from "@/types/journey";
import { withBasePath } from "@/lib/paths";
import { MediaGallery } from "./EvidenceMedia";

export function CaseStudyCard({ feature }: { feature: FeatureCase }) {
  return (
    <article className="journey-case">
      <header className="journey-case__header">
        <h3>{feature.name}</h3>
        <ul className="journey-tech-pills">
          {feature.technology.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </header>

      <dl className="journey-def-grid">
        <div>
          <dt>Problem</dt>
          <dd>{feature.problem}</dd>
        </div>
        <div>
          <dt>My contribution</dt>
          <dd>{feature.contribution}</dd>
        </div>
        <div>
          <dt>Challenge</dt>
          <dd>{feature.challenge}</dd>
        </div>
        <div>
          <dt>Solution</dt>
          <dd>{feature.solution}</dd>
        </div>
        <div>
          <dt>Result</dt>
          <dd>{feature.result}</dd>
        </div>
        <div>
          <dt>Reflection</dt>
          <dd>{feature.reflection}</dd>
        </div>
      </dl>

      {feature.screenshots.some((shot) => shot.status === "public" && shot.src) ? (
        <MediaGallery items={feature.screenshots.filter((shot) => shot.status === "public" && shot.src)} />
      ) : null}

      {feature.videoStatus === "public" && feature.videoSrc ? (
        <video className="journey-case__video" controls preload="none" playsInline src={withBasePath(feature.videoSrc)}>
          Your browser does not support the video tag.
        </video>
      ) : null}
    </article>
  );
}
