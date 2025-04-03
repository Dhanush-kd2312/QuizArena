'use client';

import dynamic from 'next/dynamic';
import AiQuizData from './NetworkQuizData';
import { Suspense } from 'react'; // Import Suspense

const AIQuizPage = dynamic(() => import('./NetworkQuizPage'), {
  ssr: false,
});

export default function AiQuizPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AiQuizData>
        {({ numQuestions, timeLimit }) => (
          <AIQuizPage numQuestions={numQuestions} timeLimit={timeLimit} />
        )}
      </AiQuizData>
    </Suspense>
  );
}