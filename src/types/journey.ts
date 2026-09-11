export type EvidenceStatus = "private" | "public" | "pending";

export type EvidenceItem = {
  id: string;
  label: string;
  description: string;
  status: EvidenceStatus;
  /** Path under /public when status is "public", e.g. "/journey/evidence/early-1.png" */
  src?: string;
  /** Optional walkthrough or demo video shown below image evidence */
  videoSrc?: string;
  /** Decorative cover shown above PDF logbook viewers */
  coverSrc?: string;
  href?: string;
};

export type MediaItem = {
  id: string;
  alt: string;
  caption?: string;
  status: EvidenceStatus;
  src?: string;
};

export type StoryPhase = {
  id: string;
  label: string;
  summary: string;
};

export type SkillItem = {
  id: string;
  name: string;
  howUsed: string;
  whatLearned: string;
  confidenceBefore: number;
  confidenceNow: number;
  logoSrc?: string;
};

export type TimelineWeek = {
  id: string;
  dateOrWeek: string;
  task: string;
  whatIDid: string;
  whatILearned: string;
  challenge: string;
  result: string;
  evidence: EvidenceItem[];
  /** Primary tool logo for the week (from logbook skills) */
  weekLogoSrc?: string;
};

export type FeatureCase = {
  id: string;
  name: string;
  problem: string;
  contribution: string;
  technology: string[];
  challenge: string;
  solution: string;
  result: string;
  reflection: string;
  screenshots: MediaItem[];
  videoSrc?: string;
  videoStatus: EvidenceStatus;
};

export type PresentationVideo = {
  id: string;
  chapter: string;
  title: string;
  date: string;
  whatPresented: string;
  whatLearned: string;
  transcriptOrSummary: string;
  thumbnailStatus: EvidenceStatus;
  thumbnailSrc?: string;
  videoSrc?: string;
  videoStatus: EvidenceStatus;
};

export type WorkflowStep = {
  id: string;
  label: string;
  note: string;
};

export type ChallengeItem = {
  id: string;
  problem: string;
  action: string;
  result: string;
  lesson: string;
};

export type FeedbackItem = {
  id: string;
  feedback: string;
  action: string;
  improvement: string;
  lesson: string;
  source: string;
};

export type QualityPillar = {
  id: string;
  title: string;
  frontEndLink: string;
};

export type WinItem = {
  id: string;
  category: string;
  title: string;
  detail: string;
  date: string;
};

export type SoftSkill = {
  id: string;
  title: string;
  note: string;
};

export type GoalItem = {
  id: string;
  title: string;
  detail: string;
};

export type ReflectionPrompt = {
  id: string;
  prompt: string;
  answer: string;
};

export type JourneyMeta = {
  title: string;
  subtitle: string;
  name: string;
  role: string;
  year: string;
  organization: string;
};

export type JourneyData = {
  meta: JourneyMeta;
  heroTagline: string;
  storyIntro: string[];
  storyPhases: StoryPhase[];
  beforeClock: {
    title: string;
    intro: string;
    expected: string;
    alreadyKnew: string;
    wantedToLearn: string;
    earlyExperience: string;
    evidence: EvidenceItem[];
  };
  meetScholAfrik: {
    about: string;
    roleSummary: string;
    supervisor: string;
    program: string;
    responsibilities: string[];
    collaboration: string;
    technologies: string[];
    purpose: string;
  };
  skills: SkillItem[];
  timeline: TimelineWeek[];
  features: FeatureCase[];
  presentations: PresentationVideo[];
  workflow: WorkflowStep[];
  workflowPractices: { title: string; note: string }[];
  challenges: ChallengeItem[];
  feedback: FeedbackItem[];
  productQuality: {
    message: string;
    pillars: QualityPillar[];
    connections: string[];
  };
  transformation: {
    before: string[];
    now: string[];
  };
  wins: WinItem[];
  softSkills: SoftSkill[];
  reflection: {
    quoteBefore: string;
    quoteNow: string;
    prompts: ReflectionPrompt[];
  };
  nextChapter: {
    intro: string;
    goals: GoalItem[];
  };
  finale: {
    title: string;
    paragraphs: string[];
    arc: string[];
  };
  nav: { id: string; label: string }[];
};
