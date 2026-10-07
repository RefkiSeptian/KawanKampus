import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { QuizFlow, QuizResult } from '@/components/quiz-flow';
import { QUIZ_STORAGE_KEY } from '@/lib/quiz';
const mocks = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mocks.push }) }));
describe('quiz component and session behavior', () => {
  it('restores a completed quiz and gives the route a primary heading', () => {
    window.sessionStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        step: 3,
        answers: ['K', 'K', 'K', 'K'],
        phase: 'complete',
        tieChoices: [],
      }),
    );
    render(<QuizFlow />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Kuis kamu sudah selesai.' }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Lihat Hasil' })).toHaveAttribute(
      'href',
      '/kuis/hasil',
    );
  });
  it('restores saved question and answer from sessionStorage', async () => {
    window.sessionStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        step: 1,
        answers: ['L', 'I', null, null],
        phase: 'questions',
        tieChoices: [],
      }),
    );
    render(<QuizFlow />);
    await waitFor(() => expect(screen.getByText('2 dari 4')).toBeVisible());
    expect(
      screen.getByRole('radio', { name: 'Pernah belajar di lingkungan lintas budaya.' }),
    ).toBeChecked();
  });
  it('asks for an answer before advancing and persists it after selection', async () => {
    const user = userEvent.setup();
    render(<QuizFlow />);
    await user.click(screen.getByRole('button', { name: 'Lanjut' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Pilih satu jawaban');
    await user.click(screen.getByRole('radio', { name: 'Belum tahu.' }));
    await user.click(screen.getByRole('button', { name: 'Lanjut' }));
    expect(screen.getByText('2 dari 4')).toBeVisible();
    expect(JSON.parse(window.sessionStorage.getItem(QUIZ_STORAGE_KEY)!).answers[0]).toBe('0');
  });
  it('shows only the categories tied for the remaining slot', async () => {
    window.sessionStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        step: 3,
        answers: ['O', 'O', 'I', 'K'],
        phase: 'tie',
        tieChoices: [],
      }),
    );
    const user = userEvent.setup();
    render(<QuizFlow />);
    expect(
      screen.queryByRole('radio', { name: 'Organisasi & Kepemimpinan' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    await user.click(screen.getByRole('radio', { name: 'Magang & Kenali Dunia Kerja' }));
    await user.click(screen.getByRole('button', { name: 'Lihat Hasil' }));
    expect(mocks.push).toHaveBeenCalledWith('/kuis/hasil');
  });
  it('supports keyboard radio selection', async () => {
    const user = userEvent.setup();
    render(<QuizFlow />);
    const radio = screen.getByRole('radio', { name: 'Membantu tim menyiapkan kegiatan bersama.' });
    radio.focus();
    await user.keyboard('[Space]');
    expect(radio).toBeChecked();
  });
  it('renders the scholarship complement for all-unknown results', () => {
    window.sessionStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        step: 3,
        answers: ['0', '0', '0', '0'],
        phase: 'complete',
        tieChoices: [],
      }),
    );
    render(<QuizResult />);
    expect(screen.getByRole('heading', { name: 'Masih ingin mencoba berbagai hal' })).toBeVisible();
    expect(screen.getByRole('link', { name: /Jelajahi Beasiswa/ })).toHaveAttribute(
      'href',
      '/peluang/beasiswa-bantuan-kuliah',
    );
    expect(screen.queryByRole('region', { name: 'Rekomendasi kategori' })).not.toBeInTheDocument();
  });
  it('handles a direct result visit without an active completed quiz', () => {
    render(<QuizResult />);
    expect(screen.getByRole('heading', { name: 'Selesaikan kuis dulu, yuk.' })).toBeVisible();
  });
});
