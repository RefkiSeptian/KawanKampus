import type { AnswerCode, QuizState, ScoredCode } from '@/types';
export const scoredCodes: ScoredCode[] = ['O', 'L', 'I', 'K'];
export const QUIZ_STORAGE_KEY = 'kawan-kampus-quiz-v1';
export const initialQuizState: QuizState = {
  version: 1,
  step: 0,
  answers: [null, null, null, null],
  phase: 'questions',
  tieChoices: [],
};
export function calculateScores(answers: readonly (AnswerCode | null)[]) {
  const scores: Record<ScoredCode, number> = { O: 0, L: 0, I: 0, K: 0 };
  for (const answer of answers) if (answer && answer !== '0') scores[answer]++;
  return scores;
}
export function analyzeQuiz(answers: readonly (AnswerCode | null)[]) {
  const scores = calculateScores(answers);
  const positive = scoredCodes
    .filter((code) => scores[code] > 0)
    .sort((a, b) => scores[b] - scores[a]);
  if (positive.length <= 2)
    return {
      scores,
      fixed: positive,
      tied: [] as ScoredCode[],
      slots: 0,
      unknown: positive.length === 0,
    };
  const cutoff = scores[positive[1]];
  const fixed = positive.filter((code) => scores[code] > cutoff);
  const tied = positive.filter((code) => scores[code] === cutoff);
  const slots = 2 - fixed.length;
  if (tied.length <= slots)
    return {
      scores,
      fixed: [...fixed, ...tied],
      tied: [] as ScoredCode[],
      slots: 0,
      unknown: false,
    };
  return { scores, fixed, tied, slots, unknown: false };
}
export function resolveQuiz(
  answers: readonly (AnswerCode | null)[],
  choices: readonly ScoredCode[] = [],
): ScoredCode[] | null {
  if (answers.length !== 4 || answers.some((answer) => answer === null)) return null;
  const result = analyzeQuiz(answers);
  if (!result.tied.length) return result.fixed;
  if (
    choices.length !== result.slots ||
    new Set(choices).size !== choices.length ||
    choices.some((code) => !result.tied.includes(code))
  )
    return null;
  return [...result.fixed, ...choices];
}
export function parseQuizState(raw: string | null): QuizState {
  if (!raw) return initialQuizState;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return initialQuizState;
    const s = value as Partial<QuizState>;
    if (
      s.version !== 1 ||
      !Number.isInteger(s.step) ||
      s.step! < 0 ||
      s.step! > 3 ||
      !Array.isArray(s.answers) ||
      s.answers.length !== 4 ||
      s.answers.some((a) => a !== null && !['O', 'L', 'I', 'K', '0'].includes(a)) ||
      !['questions', 'tie', 'complete'].includes(s.phase ?? '') ||
      !Array.isArray(s.tieChoices) ||
      s.tieChoices.some((a) => !scoredCodes.includes(a)) ||
      new Set(s.tieChoices).size !== s.tieChoices.length
    )
      return initialQuizState;
    const state = s as QuizState;
    if (state.phase !== 'questions' && state.answers.some((a) => a === null))
      return initialQuizState;
    if (state.phase === 'complete' && resolveQuiz(state.answers, state.tieChoices) === null)
      return initialQuizState;
    if (state.phase === 'tie') {
      const result = analyzeQuiz(state.answers);
      if (
        !result.tied.length ||
        state.tieChoices.length > result.slots ||
        state.tieChoices.some((c) => !result.tied.includes(c))
      )
        return initialQuizState;
    }
    return state;
  } catch {
    return initialQuizState;
  }
}
