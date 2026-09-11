"use client";

import type { JourneyData } from "@/types/journey";
import { withBasePath } from "@/lib/paths";
import { JourneySection } from "./JourneySection";
import { EvidenceCard } from "./EvidenceMedia";
import { InteractiveStoryTimeline, InternshipTimeline } from "./Timelines";
import { ToolkitGrid } from "./ToolkitGrid";
import { CaseStudyCard } from "./CaseStudyCard";
import { ArrowDown, ArrowRight } from "lucide-react";

export function JourneyHero({ data, onEnter }: { data: JourneyData; onEnter: () => void }) {
  return (
    <section id="cover" className="journey-hero" data-journey-section="cover" aria-labelledby="cover-title">
      <div className="journey-hero__stage">
        <p className="journey-eyebrow">Digital Internship Experience · {data.meta.year}</p>
        <h1 id="cover-title" className="journey-hero__title">
          {data.meta.title}
        </h1>
        <p className="journey-hero__tagline">{data.heroTagline}</p>
        <figure className="journey-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBasePath("/journey/sylvie-portrait.png?v=6")} alt={data.meta.name} />
        </figure>
        <p className="journey-hero__name">{data.meta.name}</p>
        <p className="journey-hero__role">
          {data.meta.role} · {data.meta.organization}
        </p>
        <button type="button" className="journey-cta" onClick={onEnter}>
          Enter My Journey
          <ArrowDown size={18} aria-hidden />
        </button>
      </div>
    </section>
  );
}

export function JourneySections({ data }: { data: JourneyData }) {
  return (
    <>
      <JourneySection
        id="story"
        tone="paper"
        eyebrow="Chapter 01"
        title="Every Journey Has a Beginning"
        lead={data.meta.subtitle}
      >
        <div className="journey-prose">
          {data.storyIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <InteractiveStoryTimeline phases={data.storyPhases} />
      </JourneySection>

      <JourneySection
        id="before-clock"
        tone="soft"
        eyebrow="Chapter 02"
        title={data.beforeClock.title}
        lead="The chapter that makes this internship story different."
      >
        <p className="journey-prose-single">{data.beforeClock.intro}</p>
        <div className="journey-quad">
          <article>
            <h3>What I expected</h3>
            <p>{data.beforeClock.expected}</p>
          </article>
          <article>
            <h3>What I already knew</h3>
            <p>{data.beforeClock.alreadyKnew}</p>
          </article>
          <article>
            <h3>What I wanted to learn</h3>
            <p>{data.beforeClock.wantedToLearn}</p>
          </article>
          <article>
            <h3>What I experienced early</h3>
            <p>{data.beforeClock.earlyExperience}</p>
          </article>
        </div>
        <h3 className="journey-subhead">Evidence of early work</h3>
        <div className="journey-evidence-grid">
          {data.beforeClock.evidence.map((item) => (
            <EvidenceCard key={item.id} item={item} />
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="meet"
        tone="paper"
        eyebrow="Chapter 03"
        title={`Meet ${data.meta.organization}`}
        lead="Context for the work — keep this editable and accurate."
      >
        <div className="journey-prose">
          <p>{data.meetScholAfrik.about}</p>
          <p>
            <strong>Program:</strong> {data.meetScholAfrik.program}
          </p>
          <p>
            <strong>Supervisor:</strong> {data.meetScholAfrik.supervisor}
          </p>
          <p>{data.meetScholAfrik.roleSummary}</p>
          <p>{data.meetScholAfrik.collaboration}</p>
          <p>{data.meetScholAfrik.purpose}</p>
        </div>
        <div className="journey-two-col">
          <div>
            <h3 className="journey-subhead">Responsibilities</h3>
            <ul className="journey-bullet-list">
              {data.meetScholAfrik.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="journey-subhead">Technologies</h3>
            <ul className="journey-tech-pills">
              {data.meetScholAfrik.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </JourneySection>

      <JourneySection
        id="toolkit"
        tone="soft"
        eyebrow="Chapter 04"
        title="My Developer Toolkit"
        lead="Tools from my logbook — each with the skills I practiced week by week."
      >
        <ToolkitGrid skills={data.skills} />
      </JourneySection>

      <JourneySection
        id="timeline"
        tone="paper"
        eyebrow="Chapter 05"
        title="My Internship Timeline"
        lead="Each week from my Skills Immersion logbook — open a week to see that page."
      >
        <InternshipTimeline weeks={data.timeline} />
      </JourneySection>

      <JourneySection
        id="built"
        tone="soft"
        eyebrow="Chapter 06"
        title="What I Built"
        lead="Features I shipped — open each case to see the work."
      >
        <div className="journey-stack">
          {data.features.map((feature) => (
            <CaseStudyCard key={feature.id} feature={feature} />
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="workflow"
        tone="paper"
        eyebrow="Chapter 07"
        title="Behind the Code"
        lead="How work moved from task to delivery."
      >
        <ol className="journey-workflow" role="list">
          {data.workflow.map((step, index) => (
            <li key={step.id} className="journey-workflow__step">
              <span className="journey-workflow__num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.note}</p>
              </div>
              {index < data.workflow.length - 1 ? (
                <ArrowRight className="journey-workflow__arrow" aria-hidden size={16} />
              ) : null}
            </li>
          ))}
        </ol>
        <div className="journey-practice-grid">
          {data.workflowPractices.map((practice) => (
            <article key={practice.title} className="journey-practice">
              <h3>{practice.title}</h3>
              <p>{practice.note}</p>
            </article>
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="challenges"
        tone="soft"
        eyebrow="Chapter 08"
        title="Things That Didn't Go As Planned"
        lead="Honest problems, real actions, lasting lessons."
      >
        <div className="journey-stack">
          {data.challenges.map((item) => (
            <article key={item.id} className="journey-chain-card">
              <ChainStep label="The problem" text={item.problem} />
              <ChainStep label="What I did" text={item.action} />
              <ChainStep label="The result" text={item.result} />
              <ChainStep label="What I learned" text={item.lesson} last />
            </article>
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="feedback"
        tone="paper"
        eyebrow="Chapter 09"
        title="Feedback → Improvement"
        lead="Professional maturity is visible in how feedback becomes better work."
      >
        <div className="journey-stack">
          {data.feedback.map((item) => (
            <article key={item.id} className="journey-chain-card journey-feedback-card">
              {item.source ? <p className="journey-source">{item.source}</p> : null}
              <div className="journey-feedback-grid">
                <div>
                  <p className="journey-chain-step__label">Feedback</p>
                  <p className="journey-chain-step__text">{item.feedback}</p>
                </div>
                <div>
                  <p className="journey-chain-step__label">Action</p>
                  <p className="journey-chain-step__text">{item.action}</p>
                </div>
                <div>
                  <p className="journey-chain-step__label">Improvement</p>
                  <p className="journey-chain-step__text">{item.improvement}</p>
                </div>
                <div>
                  <p className="journey-chain-step__label">Lesson</p>
                  <p className="journey-chain-step__text">{item.lesson}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="quality"
        tone="soft"
        eyebrow="Chapter 10"
        title="Product Quality"
        lead={data.productQuality.message}
      >
        <ul className="journey-connections" aria-label="What a successful product also needs">
          {data.productQuality.connections.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="journey-pillars">
          {data.productQuality.pillars.map((pillar) => (
            <article key={pillar.id} className="journey-pillar">
              <h3>{pillar.title}</h3>
              <p>{pillar.frontEndLink}</p>
            </article>
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="transformation"
        tone="ink"
        eyebrow="Chapter 11"
        title="My Transformation"
        lead="Who I was learning to be — and who I am becoming."
      >
        <div className="journey-compare">
          <div className="journey-compare__col">
            <h3>Before</h3>
            <ul>
              {data.transformation.before.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="journey-compare__divider" aria-hidden>
            →
          </div>
          <div className="journey-compare__col journey-compare__col--now">
            <h3>Now</h3>
            <ul>
              {data.transformation.now.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </JourneySection>

      <JourneySection
        id="wins"
        tone="paper"
        eyebrow="Chapter 12"
        title="My Biggest Wins"
        lead="Editable achievement slots — fill only what is real."
      >
        <ol className="journey-wins" role="list">
          {data.wins.map((win) => (
            <li key={win.id} className="journey-win">
              <span className="journey-win__category">{win.category}</span>
              <h3>{win.title}</h3>
              <p>{win.detail}</p>
              <time>{win.date}</time>
            </li>
          ))}
        </ol>
      </JourneySection>

      <JourneySection
        id="beyond"
        tone="soft"
        eyebrow="Chapter 13"
        title="Beyond Coding"
        lead="Growth that does not show up in a commit hash."
      >
        <div className="journey-soft-grid">
          {data.softSkills.map((skill) => (
            <article key={skill.id} className="journey-soft">
              <h3>{skill.title}</h3>
              <p>{skill.note}</p>
            </article>
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="reflection"
        tone="paper"
        eyebrow="Chapter 14"
        title="My Reflection"
      >
        <blockquote className="journey-quote">
          <p>
            When I started, I asked: <em>“{data.reflection.quoteBefore}”</em>
          </p>
          <p>
            Now I ask: <em>“{data.reflection.quoteNow}”</em>
          </p>
        </blockquote>
        <div className="journey-prompts">
          {data.reflection.prompts.map((prompt) => (
            <article key={prompt.id}>
              <h3>{prompt.prompt}</h3>
              <p>{prompt.answer}</p>
            </article>
          ))}
        </div>
      </JourneySection>

      <JourneySection
        id="next"
        tone="soft"
        eyebrow="Chapter 15"
        title="The Journey Continues"
        lead={data.nextChapter.intro}
      >
        <div className="journey-goals">
          {data.nextChapter.goals.map((goal) => (
            <article key={goal.id} className="journey-goal">
              <h3>{goal.title}</h3>
              <p>{goal.detail}</p>
            </article>
          ))}
        </div>
      </JourneySection>

      <section
        id="finale"
        className="journey-finale journey-poster-page"
        data-journey-section="finale"
        aria-labelledby="finale-title"
      >
        <div className="journey-hero__stage">
          <p className="journey-eyebrow">Final page</p>
          <h2 id="finale-title" className="journey-hero__title">
            {data.finale.title}
          </h2>
          <p className="journey-hero__name">{data.meta.name}</p>
          <p className="journey-hero__role">
            {data.meta.role} · {data.meta.year}
          </p>
          <a href="#cover" className="journey-cta">
            Back to the beginning
          </a>
        </div>
      </section>
    </>
  );
}

function ChainStep({ label, text, last }: { label: string; text: string; last?: boolean }) {
  return (
    <div className={`journey-chain-step${last ? " is-last" : ""}`}>
      <p className="journey-chain-step__label">{label}</p>
      <p className="journey-chain-step__text">{text}</p>
      {!last ? <span className="journey-chain-step__arrow" aria-hidden>↓</span> : null}
    </div>
  );
}
