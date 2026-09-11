"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { JourneyData } from "@/types/journey";
import { JourneyHero, JourneySections } from "./JourneySections";
import { BookOpen, Printer, X } from "lucide-react";

const CHAPTERS = [
  {
    id: "opening",
    label: "Opening",
    sections: [
      { id: "cover", label: "Cover" },
      { id: "story", label: "My Story" },
      { id: "before-clock", label: "Before the Clock" },
      { id: "meet", label: "Meet ScholAfrik" },
    ],
  },
  {
    id: "craft",
    label: "The Work",
    sections: [
      { id: "toolkit", label: "Developer Toolkit" },
      { id: "timeline", label: "Internship Timeline" },
      { id: "built", label: "What I Built" },
    ],
  },
  {
    id: "voice",
    label: "Process",
    sections: [
      { id: "workflow", label: "Behind the Code" },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    sections: [
      { id: "challenges", label: "Challenges" },
      { id: "feedback", label: "Feedback" },
      { id: "quality", label: "Product Quality" },
      { id: "transformation", label: "Transformation" },
      { id: "wins", label: "Biggest Wins" },
      { id: "beyond", label: "Beyond Coding" },
    ],
  },
  {
    id: "closing",
    label: "Closing",
    sections: [
      { id: "reflection", label: "Reflection" },
      { id: "next", label: "What's Next" },
      { id: "finale", label: "Finale" },
    ],
  },
] as const;

function chapterForSection(sectionId: string) {
  return CHAPTERS.find((chapter) => chapter.sections.some((s) => s.id === sectionId)) ?? CHAPTERS[0];
}

export function JourneyShell({ data }: { data: JourneyData }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("cover");
  const [tocOpen, setTocOpen] = useState(false);

  const activeChapter = useMemo(() => chapterForSection(active), [active]);
  const chapterIndex = CHAPTERS.findIndex((c) => c.id === activeChapter.id);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-journey-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".journey-reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tocOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTocOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tocOpen]);

  return (
    <div className="journey-root">
      <div className="journey-progress" aria-hidden>
        <div className="journey-progress__bar" style={{ width: `${progress}%` }} />
      </div>

      <header className="journey-chrome print-hide">
        <div className="journey-chrome__inner">
          <button type="button" className="journey-chrome__brand" onClick={() => scrollToId("cover")}>
            {data.meta.title}
          </button>

          <p className="journey-chrome__chapter" aria-live="polite">
            <span className="journey-chrome__chapter-num">
              {String(chapterIndex + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
            </span>
            <span className="journey-chrome__chapter-name">{activeChapter.label}</span>
          </p>

          <div className="journey-chrome__actions">
            <button
              type="button"
              className="journey-chrome__icon"
              onClick={() => setTocOpen(true)}
              aria-expanded={tocOpen}
              aria-controls="journey-toc"
            >
              <BookOpen size={18} aria-hidden />
              <span>Contents</span>
            </button>
            <button
              type="button"
              className="journey-chrome__icon journey-chrome__icon--ghost"
              onClick={() => window.print()}
              aria-label="Print or save PDF"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>
      </header>

      {tocOpen ? (
        <div className="journey-toc print-hide" role="dialog" aria-modal="true" aria-labelledby="journey-toc-title">
          <button type="button" className="journey-toc__backdrop" aria-label="Close contents" onClick={() => setTocOpen(false)} />
          <div id="journey-toc" className="journey-toc__panel">
            <div className="journey-toc__head">
              <div>
                <p className="journey-eyebrow">Digital book</p>
                <h2 id="journey-toc-title">Contents</h2>
              </div>
              <button type="button" className="journey-chrome__icon" onClick={() => setTocOpen(false)} aria-label="Close contents">
                <X size={18} />
              </button>
            </div>

            <nav className="journey-toc__chapters" aria-label="Journey chapters">
              {CHAPTERS.map((chapter, index) => (
                <div key={chapter.id} className="journey-toc__group">
                  <button
                    type="button"
                    className={`journey-toc__chapter-btn${activeChapter.id === chapter.id ? " is-active" : ""}`}
                    onClick={() => scrollToId(chapter.sections[0].id)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {chapter.label}
                  </button>
                  <ul>
                    {chapter.sections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          className={active === section.id ? "is-active" : undefined}
                          onClick={() => scrollToId(section.id)}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <nav className="journey-rail print-hide" aria-label="Chapter progress">
        {CHAPTERS.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            className={`journey-rail__dot${activeChapter.id === chapter.id ? " is-active" : ""}`}
            aria-label={`${chapter.label} (chapter ${index + 1})`}
            aria-current={activeChapter.id === chapter.id ? "true" : undefined}
            onClick={() => scrollToId(chapter.sections[0].id)}
            title={chapter.label}
          />
        ))}
      </nav>

      <main>
        <JourneyHero data={data} onEnter={() => scrollToId("story")} />
        <JourneySections data={data} />
      </main>
    </div>
  );
}
