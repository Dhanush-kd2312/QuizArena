// ai/page.js
'use client';

import dynamic from 'next/dynamic';
import AiQuizData from './DbmsQuizData'; // Import the new component

const AIQuizPage = dynamic(() => import('./DbmsQuizpage'), {
  ssr: false,
});

export default function AiQuizPageWrapper() {
  return (
    <AiQuizData>
      {({ numQuestions, timeLimit }) => (
        <AIQuizPage numQuestions={numQuestions} timeLimit={timeLimit} />
      )}
    </AiQuizData>
  );
}