export type CategoryId =
  | 'organisasi-kepemimpinan'
  | 'lomba-kompetisi'
  | 'beasiswa-bantuan-kuliah'
  | 'pengalaman-internasional'
  | 'dunia-kerja';
export type ScoredCode = 'O' | 'L' | 'I' | 'K';
export type AnswerCode = ScoredCode | '0';
export interface Resource {
  label: string;
  url: string | null;
  example?: boolean;
}
export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  eyebrow: string;
  cardDescription: string;
  introduction: string;
  types: { title: string; description: string }[];
  closing: string;
  resultDescription?: string;
  resultCta?: string;
  resources?: Resource[];
}
export interface Opportunity {
  id: string;
  category: CategoryId;
  name: string;
  type: string;
  description: string;
  timing: string;
  note: string;
  officialUrl: string | null;
  ctaLabel: string;
  sourcePage: number;
  extraLinks?: Resource[];
}
export interface QuizQuestion {
  id: string;
  question: string;
  options: { code: AnswerCode; label: string }[];
}
export interface QuizState {
  version: 1;
  step: number;
  answers: (AnswerCode | null)[];
  phase: 'questions' | 'tie' | 'complete';
  tieChoices: ScoredCode[];
}
