import { QuizResult } from '@/components/quiz-flow';
import { pageMetadata } from '@/lib/metadata';
export const metadata = {
  ...pageMetadata(
    'Hasil Kuis',
    'Ide awal eksplorasi berdasarkan rasa penasaranmu saat ini.',
    '/kuis/hasil',
  ),
  robots: { index: false, follow: true },
};
export default function ResultPage() {
  return (
    <div className="container page-space result-page">
      <QuizResult />
    </div>
  );
}
