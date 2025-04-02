// AiQuizData.js
'use client';

import { useSearchParams } from 'next/navigation';

export default function AiQuizData({ children }) {
  const searchParams = useSearchParams();
  const numQuestions = parseInt(searchParams.get("numQuestions"), 10) || 5;
  const timeLimit = parseInt(searchParams.get("timeLimit"), 10) || 150;

  return children({ numQuestions, timeLimit });
}