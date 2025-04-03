"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';

export default function TestPage() {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <p>Category: {searchParams.get("category")}</p>
      </div>
    </Suspense>
  );
}
