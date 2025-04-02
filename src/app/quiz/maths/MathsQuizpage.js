'use client'
import { useState, useRef,useEffect } from 'react';
import { FaQuestionCircle, FaCertificate, FaFire } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../../../../components/navbar';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


const allQuestions = [
  {
    "question": "What is the value of π (pi) to two decimal places?",
    "answers": [
      { "text": "3.14", "correct": true, "explanation": "Pi (π) is approximately 3.14159, which rounds to 3.14." },
      { "text": "3.41", "correct": false, "explanation": "3.41 is an incorrect approximation of π." },
      { "text": "2.71", "correct": false, "explanation": "2.71 is the approximate value of Euler’s number (e), not π." },
      { "text": "4.13", "correct": false, "explanation": "4.13 is not related to the value of π." }
    ]
  },
  {
    "question": "What is 25% of 200?",
    "answers": [
      { "text": "50", "correct": true, "explanation": "25% of 200 is (25/100) × 200 = 50." },
      { "text": "40", "correct": false, "explanation": "40 is 20% of 200, not 25%." },
      { "text": "25", "correct": false, "explanation": "25 is 12.5% of 200, not 25%." },
      { "text": "75", "correct": false, "explanation": "75 is 37.5% of 200, not 25%." }
    ]
  },
  {
    "question": "What is the square root of 144?",
    "answers": [
      { "text": "12", "correct": true, "explanation": "The square root of 144 is 12, since 12 × 12 = 144." },
      { "text": "14", "correct": false, "explanation": "14 × 14 = 196, not 144." },
      { "text": "10", "correct": false, "explanation": "10 × 10 = 100, not 144." },
      { "text": "16", "correct": false, "explanation": "16 × 16 = 256, not 144." }
    ]
  },
  {
    "question": "If a triangle has angles measuring 40° and 90°, what is the measure of the third angle?",
    "answers": [
      { "text": "50°", "correct": true, "explanation": "The sum of a triangle’s angles is always 180°. 180° - (90° + 40°) = 50°." },
      { "text": "60°", "correct": false, "explanation": "A 60° angle would form an equilateral triangle, but one angle is already 90°." },
      { "text": "30°", "correct": false, "explanation": "30° would result in a total sum less than 180°." },
      { "text": "70°", "correct": false, "explanation": "70° would make the sum exceed 180°." }
    ]
  },
  {
    "question": "What is 8³ (8 raised to the power of 3)?",
    "answers": [
      { "text": "512", "correct": true, "explanation": "8³ = 8 × 8 × 8 = 512." },
      { "text": "64", "correct": false, "explanation": "64 is 8², not 8³." },
      { "text": "256", "correct": false, "explanation": "256 is 4⁴, not 8³." },
      { "text": "1000", "correct": false, "explanation": "1000 is 10³, not 8³." }
    ]
  },
  {
    "question": "What is the sum of the angles in a quadrilateral?",
    "answers": [
      { "text": "360°", "correct": true, "explanation": "The sum of a quadrilateral’s angles is always 360°." },
      { "text": "180°", "correct": false, "explanation": "180° is the sum of angles in a triangle, not a quadrilateral." },
      { "text": "270°", "correct": false, "explanation": "270° is incorrect; the sum of four angles in a quadrilateral is 360°." },
      { "text": "450°", "correct": false, "explanation": "450° is greater than the sum of any quadrilateral’s angles." }
    ]
  },
  {
    "question": "What is the value of 5! (5 factorial)?",
    "answers": [
      { "text": "120", "correct": true, "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120." },
      { "text": "25", "correct": false, "explanation": "5 × 5 = 25, but this is not factorial." },
      { "text": "100", "correct": false, "explanation": "100 is unrelated to 5!." },
      { "text": "150", "correct": false, "explanation": "150 is incorrect for 5!." }
    ]
  },
  {
    "question": "A right-angled triangle follows which theorem?",
    "answers": [
      { "text": "Pythagorean theorem", "correct": true, "explanation": "The Pythagorean theorem states that a² + b² = c² for right-angled triangles." },
      { "text": "Fermat’s theorem", "correct": false, "explanation": "Fermat’s theorem is related to number theory, not triangles." },
      { "text": "Binomial theorem", "correct": false, "explanation": "The Binomial theorem is used in algebra, not geometry." },
      { "text": "Tangent theorem", "correct": false, "explanation": "Tangent theorem is related to circles, not right-angled triangles." }
    ]
  },
  {
    "question": "What is the next prime number after 7?",
    "answers": [
      { "text": "11", "correct": true, "explanation": "The prime numbers after 7 are 11, 13, 17, etc." },
      { "text": "9", "correct": false, "explanation": "9 is not prime since it is divisible by 3." },
      { "text": "13", "correct": false, "explanation": "13 is prime but comes after 11." },
      { "text": "10", "correct": false, "explanation": "10 is even and not prime." }
    ]
  },
  {
    "question": "What is the perimeter of a square with side length 5 cm?",
    "answers": [
      { "text": "20 cm", "correct": true, "explanation": "Perimeter of a square = 4 × side = 4 × 5 = 20 cm." },
      { "text": "10 cm", "correct": false, "explanation": "10 cm is the sum of two sides, not the perimeter." },
      { "text": "25 cm", "correct": false, "explanation": "25 cm is incorrect for the perimeter of this square." },
      { "text": "15 cm", "correct": false, "explanation": "15 cm is incorrect for a square with side 5 cm." }
    ]
  },
  {
    "question": "What is the value of 7 × 8?",
    "answers": [
      { "text": "56", "correct": true, "explanation": "7 × 8 = 56." },
      { "text": "64", "correct": false, "explanation": "64 is the square of 8, not 7 × 8." },
      { "text": "49", "correct": false, "explanation": "49 is 7 × 7, not 7 × 8." },
      { "text": "63", "correct": false, "explanation": "63 is 7 × 9, not 7 × 8." }
    ]
  },
  {
    "question": "If a = 5 and b = 3, what is the value of a² + b²?",
    "answers": [
      { "text": "34", "correct": true, "explanation": "5² + 3² = 25 + 9 = 34." },
      { "text": "25", "correct": false, "explanation": "25 is 5², but it does not include b²." },
      { "text": "16", "correct": false, "explanation": "16 is 4², unrelated to a and b." },
      { "text": "30", "correct": false, "explanation": "30 is incorrect; the correct sum is 34." }
    ]
  },
  {
    "question": "What is the sum of the first 10 natural numbers?",
    "answers": [
      { "text": "55", "correct": true, "explanation": "The sum of the first n natural numbers is given by n(n+1)/2. Here, 10(10+1)/2 = 55." },
      { "text": "50", "correct": false, "explanation": "50 is close but incorrect; 55 is the right answer." },
      { "text": "60", "correct": false, "explanation": "60 is incorrect; the correct sum is 55." },
      { "text": "45", "correct": false, "explanation": "45 is the sum of the first 9 natural numbers, not 10." }
    ]
  },
  {
    "question": "How many degrees are there in a straight angle?",
    "answers": [
      { "text": "180°", "correct": true, "explanation": "A straight angle measures exactly 180°." },
      { "text": "90°", "correct": false, "explanation": "90° is a right angle, not a straight angle." },
      { "text": "270°", "correct": false, "explanation": "270° is a reflex angle, not a straight angle." },
      { "text": "360°", "correct": false, "explanation": "360° is a full circle, not a straight angle." }
    ]
  },
  {
    "question": "What is 4 to the power of 0?",
    "answers": [
      { "text": "1", "correct": true, "explanation": "Any nonzero number raised to the power of 0 is always 1." },
      { "text": "0", "correct": false, "explanation": "0^0 is undefined, but any nonzero number raised to 0 is 1." },
      { "text": "4", "correct": false, "explanation": "4^1 is 4, not 4^0." },
      { "text": "Infinity", "correct": false, "explanation": "4^0 is a finite value, not infinity." }
    ]
  },
  {
    "question": "If the perimeter of a square is 40 cm, what is the length of one side?",
    "answers": [
      { "text": "10 cm", "correct": true, "explanation": "The perimeter of a square is 4 × side length. Thus, side = 40/4 = 10 cm." },
      { "text": "8 cm", "correct": false, "explanation": "8 cm would result in a perimeter of 32 cm, not 40 cm." },
      { "text": "12 cm", "correct": false, "explanation": "12 cm would result in a perimeter of 48 cm, not 40 cm." },
      { "text": "15 cm", "correct": false, "explanation": "15 cm would result in a perimeter of 60 cm, not 40 cm." }
    ]
  },
  {
    "question": "What is the median of the numbers 3, 5, 7, 9, and 11?",
    "answers": [
      { "text": "7", "correct": true, "explanation": "The median is the middle value in an ordered set, which is 7 in this case." },
      { "text": "6", "correct": false, "explanation": "6 is not in the dataset; the correct median is 7." },
      { "text": "8", "correct": false, "explanation": "8 is not the middle value; the correct median is 7." },
      { "text": "5", "correct": false, "explanation": "5 is an element in the set but not the median." }
    ]
  },
  {
    "question": "What is the reciprocal of 3/4?",
    "answers": [
      { "text": "4/3", "correct": true, "explanation": "The reciprocal of a fraction is obtained by swapping the numerator and denominator." },
      { "text": "3/4", "correct": false, "explanation": "3/4 is the original fraction, not its reciprocal." },
      { "text": "1/3", "correct": false, "explanation": "1/3 is unrelated to 3/4's reciprocal." },
      { "text": "1/4", "correct": false, "explanation": "1/4 is the reciprocal of 4, not 3/4." }
    ]
  },
  {
    "question": "Which number is a prime number?",
    "answers": [
      { "text": "23", "correct": true, "explanation": "23 has only two factors: 1 and itself, making it a prime number." },
      { "text": "15", "correct": false, "explanation": "15 is divisible by 3 and 5, so it is not prime." },
      { "text": "21", "correct": false, "explanation": "21 is divisible by 3 and 7, so it is not prime." },
      { "text": "27", "correct": false, "explanation": "27 is divisible by 3 and 9, so it is not prime." }
    ]
  },
  {
    "question": "What is the greatest common divisor (GCD) of 24 and 36?",
    "answers": [
      { "text": "12", "correct": true, "explanation": "The GCD of 24 and 36 is 12, as 12 is the largest number that divides both evenly." },
      { "text": "6", "correct": false, "explanation": "6 is a common divisor, but not the greatest." },
      { "text": "18", "correct": false, "explanation": "18 is a multiple of 6 but not the GCD of 24 and 36." },
      { "text": "24", "correct": false, "explanation": "24 is a multiple of 24 but is not a divisor of 36." }
    ]
  },
  {
    "question": "What is the sum of the interior angles of a pentagon?",
    "answers": [
      { "text": "540°", "correct": true, "explanation": "The sum of the interior angles of an n-sided polygon is (n-2) × 180°. For a pentagon: (5-2) × 180° = 540°." },
      { "text": "360°", "correct": false, "explanation": "360° is the sum of the interior angles of a quadrilateral, not a pentagon." },
      { "text": "720°", "correct": false, "explanation": "720° is the sum of the interior angles of a hexagon, not a pentagon." },
      { "text": "600°", "correct": false, "explanation": "600° is incorrect for a pentagon." }
    ]
  },
  {
    "question": "What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, ?",
    "answers": [
      { "text": "13", "correct": true, "explanation": "In the Fibonacci sequence, each number is the sum of the two preceding ones. 8 + 5 = 13." },
      { "text": "11", "correct": false, "explanation": "11 is not part of the Fibonacci sequence." },
      { "text": "15", "correct": false, "explanation": "15 does not follow the Fibonacci pattern." },
      { "text": "10", "correct": false, "explanation": "10 is incorrect; the next number is 13." }
    ]
  },
  {
    "question": "If the circumference of a circle is 31.4 cm, what is its approximate diameter? (Use π ≈ 3.14)",
    "answers": [
      { "text": "10 cm", "correct": true, "explanation": "Circumference = π × diameter. So, 31.4 ÷ 3.14 = 10 cm." },
      { "text": "15 cm", "correct": false, "explanation": "15 cm would result in a circumference greater than 31.4 cm." },
      { "text": "5 cm", "correct": false, "explanation": "5 cm is too small for the given circumference." },
      { "text": "12 cm", "correct": false, "explanation": "12 cm does not satisfy the formula C = πd." }
    ]
  },
  {
    "question": "Which of the following is an example of an irrational number?",
    "answers": [
      { "text": "√2", "correct": true, "explanation": "Irrational numbers cannot be expressed as fractions, and √2 is a non-repeating, non-terminating decimal." },
      { "text": "1/3", "correct": false, "explanation": "1/3 is a rational number because it can be written as a fraction." },
      { "text": "4", "correct": false, "explanation": "4 is a whole number, which is rational." },
      { "text": "0.75", "correct": false, "explanation": "0.75 is rational because it can be written as 3/4." }
    ]
  },
  {
    "question": "What is the cube root of 27?",
    "answers": [
      { "text": "3", "correct": true, "explanation": "3³ = 27, so the cube root of 27 is 3." },
      { "text": "9", "correct": false, "explanation": "9 is incorrect; 9³ = 729, not 27." },
      { "text": "6", "correct": false, "explanation": "6³ = 216, not 27." },
      { "text": "4", "correct": false, "explanation": "4³ = 64, not 27." }
    ]
  },
  {
    "question": "What is the greatest common divisor (GCD) of 18 and 24?",
    "answers": [
      { "text": "6", "correct": true, "explanation": "The GCD of 18 and 24 is 6, as it is the largest number that divides both evenly." },
      { "text": "12", "correct": false, "explanation": "12 is a common multiple but not the greatest divisor." },
      { "text": "9", "correct": false, "explanation": "9 is a factor of 18 but not of 24." },
      { "text": "3", "correct": false, "explanation": "3 is a common divisor, but 6 is the greatest common divisor." }
    ]
  },
  {
    "question": "What is the area of a rectangle with length 7 cm and width 4 cm?",
    "answers": [
      { "text": "28 cm²", "correct": true, "explanation": "The area of a rectangle is given by length × width. 7 × 4 = 28 cm²." },
      { "text": "14 cm²", "correct": false, "explanation": "14 cm² would be the perimeter divided by 2, not the area." },
      { "text": "35 cm²", "correct": false, "explanation": "35 cm² would be the area of a 7 × 5 rectangle, not 7 × 4." },
      { "text": "21 cm²", "correct": false, "explanation": "21 cm² is incorrect; the correct area is 28 cm²." }
    ]
  },
  {
    "question": "What is the smallest prime number?",
    "answers": [
      { "text": "2", "correct": true, "explanation": "2 is the smallest and only even prime number." },
      { "text": "1", "correct": false, "explanation": "1 is not a prime number as it only has one factor (itself)." },
      { "text": "3", "correct": false, "explanation": "3 is a prime number but not the smallest." },
      { "text": "5", "correct": false, "explanation": "5 is a prime number but larger than 2." }
    ]
  },
  {
    "question": "If x = 4 and y = 2, what is the value of 2x + 3y?",
    "answers": [
      { "text": "14", "correct": true, "explanation": "2(4) + 3(2) = 8 + 6 = 14." },
      { "text": "12", "correct": false, "explanation": "12 is incorrect; check the coefficients." },
      { "text": "16", "correct": false, "explanation": "16 results from a miscalculation." },
      { "text": "10", "correct": false, "explanation": "10 is incorrect; the correct answer is 14." }
    ]
  },
  {
    "question": "Which shape has exactly one pair of parallel sides?",
    "answers": [
      { "text": "Trapezium", "correct": true, "explanation": "A trapezium (trapezoid) has one pair of parallel sides." },
      { "text": "Rectangle", "correct": false, "explanation": "A rectangle has two pairs of parallel sides." },
      { "text": "Parallelogram", "correct": false, "explanation": "A parallelogram has two pairs of parallel sides." },
      { "text": "Triangle", "correct": false, "explanation": "A triangle has no parallel sides." }
    ]
  }
];

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const MathsQuizPage = ({ numQuestions, timeLimit }) => {
  const router = typeof window !== "undefined" ? useRouter() : null;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showHints, setShowHints] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const certificateRef = useRef(null);
  const canvasRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [cheating, setCheating] = useState(false);


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheating(true);
        setShowScore(true); // Force exit the test
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
  
  useEffect(() => {
    const handleBlur = () => {
      setCheating(true);
      setShowScore(true); // End the test immediately
    };
  
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowScore(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log("Questions before setting:", allQuestions);
    setQuestions(getRandomQuestions(allQuestions, numQuestions));
    console.log("Questions after setting:", questions);
}, [numQuestions]);


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }, []);

    useEffect(() => {
      setQuestions(getRandomQuestions(allQuestions, numQuestions)); 
    }, [numQuestions]);
    
     
    const toggleHint = (questionText) => {
      setShowHints((prev) => ({
          ...prev,
          [questionText]: !prev[questionText]
      }));
    };
    

    const handleAnswerClick = (selectedText) => {
      const currentQuestion = questions[currentQuestionIndex];
      const correctAnswer = currentQuestion.answers.find(ans => ans.correct).text;
      
      const isCorrect = selectedText === correctAnswer;
  
      setSelectedAnswers((prev) => [
          ...prev, 
          { 
              question: currentQuestion.question, 
              selected: selectedText, 
              correct: isCorrect 
          }
      ]);
  
      if (isCorrect) setScore(score + 1);
  
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
          setCurrentQuestionIndex(nextQuestion);
      } else {
          setShowScore(true);
      }
  };  


  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers([]);
    setTimeLeft(300);
    setCheating(false);
  };

  const handleDownloadCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = '/certificate.jpg';
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';

      ctx.font = '30px Arial';
      ctx.fillText('Certificate of Achievement', canvas.width / 2, 150);
      ctx.font = '20px Arial';
      ctx.fillText('This certifies that', canvas.width / 2, 220);
      ctx.font = '25px Arial';
      ctx.fillText(userName || 'Name Surname', canvas.width / 2, 270);
      ctx.font = '20px Arial';
      ctx.fillText('has successfully completed the quiz', canvas.width / 2, 320);
      ctx.fillText(`with a score of ${score} out of ${numQuestions} (${((score / numQuestions) * 100).toFixed(2)}%).`, canvas.width / 2, 370);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'certificate.png';
      link.click();
    };
  };


  const percentage = ((score / numQuestions) * 100).toFixed(2);

  return (
    <div>
    <Navbar />
    <div style={styles.container}>
      {cheating && !showScore ?(
        // 🚨 Cheating detected: Show warning
        <div style={styles.cheatingWarning}>
          <h2>⚠️ Cheating Detected! Quiz Invalidated ⚠️</h2>
          <p>You cannot continue the quiz.</p>
          <motion.button 
            onClick={handleRetakeQuiz} 
            style={styles.retakeButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            Retake Quiz
          </motion.button>
        </div>
      ) : showScore ? (
        // ✅ Show score after completing quiz
        <motion.div 
          style={styles.scoreSection}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}>
          <h2>Your Score: {score} / {questions.length}</h2>

          {percentage >= 80 && (
            <motion.div style={styles.fireStreak}>
              <FaFire size={50} color="orange" /> <h2>🔥 Perfect Score! 🔥</h2>
            </motion.div>
          )}

          {percentage >= 80 && (
            <motion.div style={styles.certificate}>
              <div ref={certificateRef} style={styles.certificate}>
                <h2>🎓 Certificate of Completion 🎓</h2>
                <p>Congratulations on achieving a perfect score!</p>
              </div>
              <button onClick={handleDownloadCertificate} style={styles.certificateButton}>
                Download Certificate
              </button>
            </motion.div>
          )}

          {/* 🎨 Hidden Canvas for Certificate Generation */}
          <canvas ref={canvasRef} width={800} height={600} style={{ display: "none" }} />

          <h3>Review Your Answers:</h3>
          <ol style={styles.resultList}>
          {questions.map((question, index) => {
  const userAnswer = selectedAnswers.find(ans => ans.question === question.question);
  const correctAnswer = question.answers.find(ans => ans.correct);
  
  return (
    <li key={index} style={styles.resultBox(userAnswer?.correct)}>
      <strong>{question.question}</strong><br />
      Your Answer: {userAnswer ? userAnswer.selected : "No answer"}

      {userAnswer?.correct && (
        <>
          <button onClick={() => toggleHint(question.question)} style={styles.hintButton}>
            <FaQuestionCircle /> Hint
          </button>
          {showHints[question.question] && (
            <p style={styles.hintBox}>🧐 {correctAnswer.explanation}</p>
          )}
        </>
      )}

      {!userAnswer?.correct && (
        <p style={styles.correctAnswerText}>
          ✅ Correct Answer: {correctAnswer.text} <br />
          🧐 {correctAnswer.explanation}
        </p>
      )}
    </li>
  );
})}
          </ol>

          <motion.button onClick={handleRetakeQuiz} style={styles.retakeButton}>
            Retake Quiz
          </motion.button>
        </motion.div>
      ) : (
        // 🎯 Quiz in progress
        <div style={styles.questionSection}>
          {questions.length > 0 && (
  <div>
    <h2>{questions[currentQuestionIndex]?.question}</h2>
    <div>
      {questions[currentQuestionIndex]?.answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswerClick(answer.text)}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.answerButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.answerButton.backgroundColor}
                onMouseDown={(e) => e.target.style.backgroundColor = styles.answerButtonActive.backgroundColor}
                onMouseUp={(e) => e.target.style.backgroundColor = styles.answerButton.backgroundColor}
                style={styles.answerButton} >
          {answer.text}
        </button>
      ))}
    </div>
  </div>
)}

        </div>
      )}
    </div>
  </div>
);
};

const styles = {
  answerButton: {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  answerButtonHover: {
    backgroundColor: 'gray',
    boxShadow: '0px 0px 10px 2px white', // White glow effect
  },
  
  answerButtonActive: {
    backgroundColor: 'darkgreen',
    color: 'white',
    boxShadow: '0px 0px 12px 3px lightgreen', // Green glow effect when active
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    padding: '20px',
  },

  scoreSection: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '600px',
  },

  answerSection: {  
    display: 'flex',  
    flexDirection: 'column',  
    alignItems: 'center',  
    marginTop: '20px',  
  },

  fireStreak: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'orange',
    marginBottom: '10px',
  },

  certificate: {
    backgroundColor: '#e6f7ff',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '15px',
    textAlign: 'center',
    border: '2px solid #007BFF',
  },

  certificateButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  resultList: {
    listStyleType: 'none',
    padding: '0',
  },

  resultBox: (isCorrect) => ({
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '10px',
    marginTop: '20px',
    backgroundColor: isCorrect ? '#4CAF50' : '#ff4c4c',
    color: '#fff',
    position: 'relative',
  }),

  correctAnswerText: {
    marginTop: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },

  hintButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  hintBox: {
    marginTop: '5px',
    padding: '10px',
    backgroundColor: '#2196F3',
    color: 'white',
    borderRadius: '5px',
  },

  retakeButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MathsQuizPage;