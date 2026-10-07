'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Compass, RotateCcw, Sparkles } from 'lucide-react';
import { quizCopy, quizQuestions, codeToCategory } from '@/data/quiz';
import { getCategory } from '@/data/categories';
import { analyzeQuiz, resolveQuiz } from '@/lib/quiz';
import { resetQuiz, saveQuizState, useQuizSession } from '@/lib/quiz-session';
import { CategoryIllustration } from './category-illustration';
import { Illustration } from './illustration';
import type { AnswerCode, ScoredCode } from '@/types';

export function QuizFlow() {
  const state = useQuizSession(),
    router = useRouter(),
    heading = useRef<HTMLHeadingElement>(null);
  const [error, setError] = useState('');
  const analysis = analyzeQuiz(state.answers);
  useEffect(() => {
    heading.current?.focus();
  }, [state.step, state.phase]);
  function answer(code: AnswerCode) {
    const answers = [...state.answers];
    answers[state.step] = code;
    saveQuizState({ ...state, answers, tieChoices: [] });
    setError('');
  }
  function advance() {
    if (state.answers[state.step] === null) {
      setError(quizCopy.validation);
      return;
    }
    if (state.step < 3) {
      saveQuizState({ ...state, step: state.step + 1 });
      setError('');
      return;
    }
    if (analysis.tied.length) {
      saveQuizState({ ...state, phase: 'tie', tieChoices: [] });
      setError('');
    } else {
      saveQuizState({ ...state, phase: 'complete', tieChoices: [] });
      router.push('/kuis/hasil');
    }
  }
  function tieAnswer(code: ScoredCode) {
    const chosen =
      analysis.slots === 1
        ? [code]
        : state.tieChoices.includes(code)
          ? state.tieChoices.filter((c) => c !== code)
          : [...state.tieChoices, code];
    if (chosen.length <= analysis.slots) {
      saveQuizState({ ...state, tieChoices: chosen });
      setError('');
    }
  }
  function completeTie() {
    if (resolveQuiz(state.answers, state.tieChoices) === null) {
      setError(`Pilih ${analysis.slots} kategori untuk melanjutkan.`);
      return;
    }
    saveQuizState({ ...state, phase: 'complete' });
    router.push('/kuis/hasil');
  }
  if (state.phase === 'complete')
    return (
      <div className="quiz-completed panel">
        <span className="category-icon">
          <Check />
        </span>
        <h1>Kuis kamu sudah selesai.</h1>
        <p>Hasil eksplorasimu tersimpan selama sesi browser ini.</p>
        <div className="button-row">
          <Link className="button primary" href="/kuis/hasil">
            Lihat Hasil
            <ArrowRight size={18} />
          </Link>
          <button className="button secondary" onClick={resetQuiz}>
            Ulangi Kuis
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    );
  const question = quizQuestions[state.step];
  return (
    <div className="quiz-layout">
      <aside className="quiz-aside">
        <span className="eyebrow">Kenali rasa penasaranmu</span>
        <h1>{quizCopy.title}</h1>
        <p>{quizCopy.introduction}</p>
        <div className="quiz-meta">
          <span>
            <Compass size={16} />4 pertanyaan
          </span>
          <span>Sekitar 1 menit</span>
        </div>
        <Illustration kind="compass" />
        <Link href="/jelajahi-peluang" className="text-link">
          Langsung jelajahi peluang
          <ArrowUpRightIcon />
        </Link>
      </aside>
      <section className="quiz-panel" aria-label="Kuis minat" data-reveal>
        <div className="quiz-progress-heading">
          <span>
            {state.phase === 'tie' ? 'Satu pilihan terakhir' : `${state.step + 1} dari 4`}
          </span>
          <span>
            {state.phase === 'tie' ? 'Kenali lebih dulu' : 'Rasa penasaran, bukan penilaian'}
          </span>
        </div>
        <div
          className="quiz-progress"
          role="progressbar"
          aria-label="Kemajuan kuis"
          aria-valuemin={0}
          aria-valuemax={4}
          aria-valuenow={state.phase === 'tie' ? 4 : state.step + 1}
        >
          <span style={{ width: `${state.phase === 'tie' ? 100 : (state.step + 1) * 25}%` }} />
        </div>
        {state.phase === 'tie' ? (
          <>
            <h2 ref={heading} tabIndex={-1}>
              {quizCopy.tiePrompt}
            </h2>
            <p className="muted">
              Pilih {analysis.slots} kategori. Pilihan yang sama kuatnya ada di bawah ini.
            </p>
            <fieldset className="quiz-options">
              <legend className="sr-only">Pilih {analysis.slots} kategori</legend>
              {analysis.tied.map((code) => {
                const category = getCategory(codeToCategory[code])!;
                return (
                  <label
                    className={`answer-option ${state.tieChoices.includes(code) ? 'selected' : ''}`}
                    key={code}
                  >
                    <input
                      type={analysis.slots === 1 ? 'radio' : 'checkbox'}
                      name="tie-choice"
                      checked={state.tieChoices.includes(code)}
                      onChange={() => tieAnswer(code)}
                      disabled={
                        analysis.slots > 1 &&
                        !state.tieChoices.includes(code) &&
                        state.tieChoices.length >= analysis.slots
                      }
                    />
                    <CategoryIllustration id={category.id} size={44} />
                    <span>{category.name}</span>
                  </label>
                );
              })}
            </fieldset>
            <p role="alert" className="form-error">
              {error}
            </p>
            <div className="quiz-controls">
              <button
                className="button secondary"
                onClick={() => {
                  saveQuizState({ ...state, phase: 'questions', step: 3, tieChoices: [] });
                  setError('');
                }}
              >
                <ArrowLeft size={18} />
                Sebelumnya
              </button>
              <button className="button primary" onClick={completeTie}>
                Lihat Hasil
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 ref={heading} tabIndex={-1}>
              {question.question}?
            </h2>
            <fieldset className="quiz-options">
              <legend className="sr-only">{question.question}</legend>
              {question.options.map((option) => (
                <label
                  className={`answer-option ${state.answers[state.step] === option.code ? 'selected' : ''}`}
                  key={option.code}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={state.answers[state.step] === option.code}
                    onChange={() => answer(option.code)}
                  />
                  <span>{option.label}</span>
                  <Check className="answer-check" size={18} aria-hidden="true" />
                </label>
              ))}
            </fieldset>
            <p role="alert" className="form-error">
              {error}
            </p>
            <div className="quiz-controls">
              <button
                className="button secondary"
                disabled={state.step === 0}
                onClick={() => {
                  saveQuizState({ ...state, step: state.step - 1 });
                  setError('');
                }}
              >
                <ArrowLeft size={18} />
                Sebelumnya
              </button>
              <button className="button primary" onClick={advance}>
                {state.step === 3 ? 'Lihat Hasil' : 'Lanjut'}
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
        <p className="quiz-storage-note">Jawaban tersimpan selama sesi browser.</p>
      </section>
    </div>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={17} aria-hidden="true" />;
}
export function QuizResult() {
  const state = useQuizSession(),
    router = useRouter();
  const codes = state.phase === 'complete' ? resolveQuiz(state.answers, state.tieChoices) : null;
  if (codes === null)
    return (
      <div className="result-empty panel">
        <Compass size={44} aria-hidden="true" />
        <span className="eyebrow">Satu menit untuk mulai mengenal minatmu</span>
        <h1>Selesaikan kuis dulu, yuk.</h1>
        <p>
          Kamu belum punya hasil kuis pada sesi ini. Lanjutkan jawabanmu atau mulai dengan
          menjelajahi peluang.
        </p>
        <div className="button-row">
          <Link className="button primary" href="/kuis">
            Buka Kuis
            <ArrowRight size={18} />
          </Link>
          <Link className="button secondary" href="/jelajahi-peluang">
            Jelajahi Semua Peluang
          </Link>
        </div>
      </div>
    );
  return (
    <>
      <header className="result-heading">
        <span className="eyebrow">
          <Sparkles size={16} />
          Awal eksplorasimu
        </span>
        <h1>{codes.length ? 'Ada peluang yang bisa kamu kenali.' : quizCopy.unknownTitle}</h1>
        <p>{quizCopy.resultIntro}</p>
        {!codes.length && (
          <Link href="/jelajahi-peluang" className="button primary">
            Jelajahi Semua Peluang
            <ArrowRight size={18} />
          </Link>
        )}
      </header>
      {codes.length > 0 && (
        <section className="result-grid" aria-label="Rekomendasi kategori">
          {codes.map((code, i) => {
            const category = getCategory(codeToCategory[code])!;
            return (
              <article key={code} className="result-card">
                <div className="card-top">
                  <span className="category-icon">
                    <CategoryIllustration id={category.id} />
                  </span>
                  <span className="card-index">0{i + 1}</span>
                </div>
                <h2>{category.name}</h2>
                <p>{category.resultDescription}</p>
                <Link href={`/peluang/${category.id}`} className="button secondary">
                  {category.resultCta}
                  <ArrowRight size={18} />
                </Link>
              </article>
            );
          })}
        </section>
      )}
      <aside className="scholarship-banner">
        <span className="category-icon">
          <CategoryIllustration id="beasiswa-bantuan-kuliah" />
        </span>
        <div>
          <span className="eyebrow">Untuk setiap minat</span>
          <h2>{quizCopy.scholarshipTitle}</h2>
          <p>{quizCopy.scholarshipDescription}</p>
          <Link className="text-link" href="/peluang/beasiswa-bantuan-kuliah">
            Jelajahi Beasiswa & Bantuan Kuliah
            <ArrowRight size={18} />
          </Link>
        </div>
      </aside>
      <div className="result-actions">
        <Link className="button secondary" href="/jelajahi-peluang">
          Jelajahi Semua Peluang
          <ArrowRight size={18} />
        </Link>
        <button
          className="text-link"
          onClick={() => {
            resetQuiz();
            router.push('/kuis');
          }}
        >
          <RotateCcw size={17} />
          Ulangi Kuis
        </button>
      </div>
    </>
  );
}
