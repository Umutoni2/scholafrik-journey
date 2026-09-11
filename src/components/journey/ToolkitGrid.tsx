"use client";

import { useState } from "react";
import type { SkillItem } from "@/types/journey";
import { withBasePath } from "@/lib/paths";

export function ToolkitGrid({ skills }: { skills: SkillItem[] }) {
  const [active, setActive] = useState(skills[0]?.id ?? "");
  const current = skills.find((s) => s.id === active) ?? skills[0];

  return (
    <div className="journey-toolkit">
      <div className="journey-toolkit__list" role="tablist" aria-label="Developer toolkit">
        {skills.map((skill) => {
          const selected = skill.id === active;
          return (
            <button
              key={skill.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`journey-toolkit__tab${selected ? " is-active" : ""}`}
              onClick={() => setActive(skill.id)}
            >
              {skill.logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={withBasePath(skill.logoSrc)} alt="" className="journey-toolkit__logo" aria-hidden />
              ) : null}
              {skill.name}
            </button>
          );
        })}
      </div>

      {current ? (
        <div className="journey-toolkit__panel" role="tabpanel">
          <div className="journey-toolkit__panel-head">
            {current.logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withBasePath(current.logoSrc)} alt="" className="journey-toolkit__panel-logo" aria-hidden />
            ) : null}
            <h3>{current.name}</h3>
          </div>
          <dl className="journey-def-grid">
            <div>
              <dt>How I used it</dt>
              <dd>{current.howUsed}</dd>
            </div>
            <div>
              <dt>What I learned</dt>
              <dd>{current.whatLearned}</dd>
            </div>
          </dl>
          <div className="journey-confidence">
            <ConfidenceBar label="Confidence before" value={current.confidenceBefore} />
            <ConfidenceBar label="Confidence now" value={current.confidenceNow} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ConfidenceBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="journey-confidence__row">
      <div className="journey-confidence__labels">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <div className="journey-confidence__track" aria-hidden>
        <div className="journey-confidence__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
