"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react';

export default function StartSection() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(150);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "python";

  useEffect(() => {
    setTimeLimit(numQuestions * 30);
  }, [numQuestions]);

  const handleDone = () => {
    localStorage.setItem("quizSettings", JSON.stringify({ numQuestions, timeLimit }));
    router.push(`/quiz/${selectedCategory}?numQuestions=${numQuestions}&timeLimit=${timeLimit}`);
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "black",
    },
    box: {
      backgroundColor: "#1e1e1e",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      width: "350px",
      textAlign: "center",
      border: "1px solid #333",
      color: "white",
    },
    select: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#333",
      color: "white",
      borderRadius: "5px",
      border: "none",
      marginBottom: "15px",
    },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
    },
  };

  return (
    <Suspense fallback={<p>Loading quiz settings...</p>}>
      <div style={styles.container}>
        <div style={styles.box}>
          <h1 style={{ fontSize: "20px", marginBottom: "15px" }}>
            {selectedCategory.toUpperCase()} Quiz Settings
          </h1>
          <label style={{ display: "block", marginBottom: "10px" }}>Select Number of Questions:</label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
            style={styles.select}
          >
            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <p>Time Allocated: {timeLimit / 60} minutes</p>
          <button onClick={handleDone} style={styles.button}>Done</button>
        </div>
      </div>
    </Suspense>
  );
}
