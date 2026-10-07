'use client';
import { useSyncExternalStore } from 'react';
import type { QuizState } from '@/types';
import { initialQuizState, parseQuizState, QUIZ_STORAGE_KEY } from './quiz';
let cachedRaw: string | null = null;
let cachedState: QuizState = initialQuizState;
let storageUnavailable = false;
const eventName = 'kawan-kampus-quiz-change';
function snapshot() {
  if (storageUnavailable) return cachedState;
  try {
    const raw = window.sessionStorage.getItem(QUIZ_STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedState = parseQuizState(raw);
    }
  } catch {
    storageUnavailable = true;
  }
  return cachedState;
}
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener('storage', callback);
  };
}
export function saveQuizState(state: QuizState) {
  cachedState = state;
  cachedRaw = JSON.stringify(state);
  try {
    window.sessionStorage.setItem(QUIZ_STORAGE_KEY, cachedRaw);
  } catch {
    storageUnavailable = true;
  }
  window.dispatchEvent(new Event(eventName));
}
export function resetQuiz() {
  saveQuizState({ ...initialQuizState, answers: [null, null, null, null], tieChoices: [] });
}
export function useQuizSession() {
  return useSyncExternalStore(subscribe, snapshot, () => initialQuizState);
}
