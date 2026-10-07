import { QuizFlow } from '@/components/quiz-flow';
import { quizCopy } from '@/data/quiz';
import { pageMetadata } from '@/lib/metadata';
import { PageMotion } from '@/components/page-motion';
export const metadata = pageMetadata('Kuis Minat', quizCopy.introduction, '/kuis');
export default function QuizPage() {
  return (
    <PageMotion className="container page-space quiz-page">
      <QuizFlow />
    </PageMotion>
  );
}
