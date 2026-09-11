import type { ReactNode } from "react";

type JourneySectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "paper" | "ink" | "soft";
  children: ReactNode;
};

export function JourneySection({
  id,
  eyebrow,
  title,
  lead,
  tone = "paper",
  children,
}: JourneySectionProps) {
  return (
    <section
      id={id}
      className={`journey-section journey-section--${tone}`}
      data-journey-section={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="journey-container">
        <header className="journey-section__header">
          {eyebrow ? <p className="journey-eyebrow">{eyebrow}</p> : null}
          <h2 id={`${id}-title`} className="journey-section__title">
            {title}
          </h2>
          {lead ? <p className="journey-section__lead">{lead}</p> : null}
        </header>
        <div className="journey-section__body journey-reveal">{children}</div>
      </div>
    </section>
  );
}
