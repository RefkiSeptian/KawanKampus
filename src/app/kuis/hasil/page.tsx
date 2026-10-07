import { QuizResult } from '@/components/quiz-flow';
import { pageMetadata } from '@/lib/metadata';
import { PageMotion } from '@/components/page-motion';
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
    <PageMotion className="container page-space result-page">
      <QuizResult />
    </PageMotion>
  );
}
