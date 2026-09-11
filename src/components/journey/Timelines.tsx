"use client";

import { useState } from "react";
import type { StoryPhase, TimelineWeek } from "@/types/journey";
import { withBasePath } from "@/lib/paths";
import { EvidenceCard } from "./EvidenceMedia";
import { ChevronDown } from "lucide-react";

export function InteractiveStoryTimeline({ phases }: { phases: StoryPhase[] }) {
  const [active, setActive] = useState(phases[0]?.id ?? "");

  const current = phases.find((p) => p.id === active) ?? phases[0];

  return (
    <div className="journey-story-timeline">
      <ol className="journey-story-timeline__track" role="list">
        {phases.map((phase, index) => {
          const isActive = phase.id === active;
          return (
            <li key={phase.id}>
              <button
                type="button"
                className={`journey-story-timeline__node${isActive ? " is-active" : ""}`}
                onClick={() => setActive(phase.id)}
                aria-pressed={isActive}
              >
                <span className="journey-story-timeline__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="journey-story-timeline__label">{phase.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {current ? (
        <div className="journey-story-timeline__panel" aria-live="polite">
          <h3>{current.label}</h3>
          <p>{current.summary}</p>
        </div>
      ) : null}
    </div>
  );
}

export function InternshipTimeline({ weeks }: { weeks: TimelineWeek[] }) {
  const [openId, setOpenId] = useState<string | null>(weeks[0]?.id ?? null);

  return (
    <ol className="journey-weeks" role="list">
      {weeks.map((week, index) => {
        const open = openId === week.id;
        return (
          <li key={week.id} className={`journey-week${open ? " is-open" : ""}`}>
            <button
              type="button"
              className="journey-week__header"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : week.id)}
            >
              <span className="journey-week__marker">
                {week.weekLogoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={withBasePath(week.weekLogoSrc)} alt="" className="journey-week__logo" aria-hidden />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <span className="journey-week__meta">
                <span className="journey-week__date">{week.dateOrWeek}</span>
                <span className="journey-week__task">{week.task}</span>
              </span>
              <ChevronDown className="journey-week__chevron" aria-hidden size={18} />
            </button>
            <div className="journey-week__body" hidden={!open}>
              <div className="journey-evidence-grid journey-evidence-grid--logbook">
                {week.evidence.map((item) => (
                  <EvidenceCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
