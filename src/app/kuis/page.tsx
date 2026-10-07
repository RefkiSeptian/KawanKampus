import { QuizFlow } from '@/components/quiz-flow';
import { quizCopy } from '@/data/quiz';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Kuis Minat', quizCopy.introduction, '/kuis');
export default function QuizPage() {
  return (
    <div className="container page-space quiz-page">
      <QuizFlow />
    </div>
  );
}
