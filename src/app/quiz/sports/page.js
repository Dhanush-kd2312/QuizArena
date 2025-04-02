'use client';

import dynamic from 'next/dynamic';
import AiQuizData from './SportsQuizData'; // Import the new component

const AIQuizPage = dynamic(() => import('./SportsQuizPage'), {
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