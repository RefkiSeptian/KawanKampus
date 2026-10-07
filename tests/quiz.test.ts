import { describe, it, expect } from 'vitest';
import {
  analyzeQuiz,
  calculateScores,
  resolveQuiz,
  parseQuizState,
  initialQuizState,
  scoredCodes,
} from '@/lib/quiz';
import type { AnswerCode } from '@/types';
describe('quiz scoring specified by PRD', () => {
  it('scores each answer once and never scores unknown', () => {
    expect(calculateScores(['O', 'L', 'I', 'K', '0', null])).toEqual({ O: 1, L: 1, I: 1, K: 1 });
  });
  it('returns a single positive winner', () =>
    expect(resolveQuiz(['K', 'K', '0', 'K'])).toEqual(['K']));
  it('returns two positive winners without a needless tie-break', () => {
    expect(resolveQuiz(['L', 'L', 'O', 'O'])).toEqual(['O', 'L']);
    expect(resolveQuiz(['O', 'O', 'O', 'L'])).toEqual(['O', 'L']);
  });
  it('does not force a category for all unknown', () => {
    expect(analyzeQuiz(['0', '0', '0', '0']).unknown).toBe(true);
    expect(resolveQuiz(['0', '0', '0', '0'])).toEqual([]);
  });
  it('asks for two choices if four categories are tied', () => {
    const result = analyzeQuiz(['O', 'L', 'I', 'K']);
    expect(result).toMatchObject({ fixed: [], tied: ['O', 'L', 'I', 'K'], slots: 2 });
    expect(resolveQuiz(['O', 'L', 'I', 'K'])).toBeNull();
    expect(resolveQuiz(['O', 'L', 'I', 'K'], ['I', 'K'])).toEqual(['I', 'K']);
  });
  it('keeps the stronger category and asks for only one remaining slot', () => {
    expect(analyzeQuiz(['O', 'O', 'I', 'K'])).toMatchObject({
      fixed: ['O'],
      tied: ['I', 'K'],
      slots: 1,
    });
    expect(resolveQuiz(['O', 'O', 'I', 'K'], ['K'])).toEqual(['O', 'K']);
    expect(resolveQuiz(['O', 'O', 'I', 'K'], ['O'])).toBeNull();
  });
  it('rejects incomplete answers, duplicate and extra tie choices', () => {
    expect(resolveQuiz(['O', null, '0', '0'])).toBeNull();
    expect(resolveQuiz(['O', 'L', 'I', 'K'], ['O', 'O'])).toBeNull();
    expect(resolveQuiz(['O', 'L', 'I', 'K'], ['O', 'L', 'I'])).toBeNull();
  });
  it('covers all 625 four-answer combinations and boundary ties', () => {
    const answers: AnswerCode[] = ['O', 'L', 'I', 'K', '0'];
    for (const a of answers)
      for (const b of answers)
        for (const c of answers)
          for (const d of answers) {
            const selection = [a, b, c, d],
              analysis = analyzeQuiz(selection),
              scores = calculateScores(selection);
            const positive = scoredCodes.filter((code) => scores[code] > 0);
            const resolved = resolveQuiz(selection, analysis.tied.slice(0, analysis.slots));
            expect(resolved).not.toBeNull();
            expect(resolved).toHaveLength(Math.min(2, positive.length));
            expect(new Set(resolved!).size).toBe(resolved!.length);
            for (const chosen of resolved!) expect(scores[chosen]).toBeGreaterThan(0);
            for (const excluded of positive.filter((code) => !resolved!.includes(code)))
              for (const chosen of resolved!)
                expect(scores[chosen]).toBeGreaterThanOrEqual(scores[excluded]);
            expect(analysis.tied.length > 0).toBe(
              positive.length > 2 &&
                [...positive]
                  .sort((x, y) => scores[y] - scores[x])
                  .map((code) => scores[code])[1] ===
                  [...positive]
                    .sort((x, y) => scores[y] - scores[x])
                    .map((code) => scores[code])[2],
            );
          }
  });
});
describe('stored session validation', () => {
  it('restores the current question and selections', () => {
    const state = {
      version: 1,
      step: 2,
      answers: ['O', 'L', null, null],
      phase: 'questions',
      tieChoices: [],
    };
    expect(parseQuizState(JSON.stringify(state))).toEqual(state);
  });
  it('restores partial tie selection', () => {
    const state = {
      version: 1,
      step: 3,
      answers: ['O', 'L', 'I', 'K'],
      phase: 'tie',
      tieChoices: ['K'],
    };
    expect(parseQuizState(JSON.stringify(state))).toEqual(state);
  });
  it.each([
    null,
    '{bad',
    JSON.stringify({ version: 5 }),
    JSON.stringify({ ...initialQuizState, step: 19 }),
    JSON.stringify({ ...initialQuizState, answers: ['X', '0', '0', '0'] }),
    JSON.stringify({ ...initialQuizState, phase: 'complete' }),
    JSON.stringify({
      ...initialQuizState,
      answers: ['O', 'O', 'I', 'K'],
      phase: 'tie',
      tieChoices: ['O'],
    }),
  ])('handles malformed or stale stored state: %s', (raw) =>
    expect(parseQuizState(raw)).toEqual(initialQuizState),
  );
});
