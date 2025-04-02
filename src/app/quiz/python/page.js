'use client'
import { useState, useRef,useEffect } from 'react';
import { FaQuestionCircle, FaCertificate, FaFire } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../../../../components/navbar';
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation"; 

import { useRouter } from "next/navigation";



const allQuestions = [
    {
        "questions": [
          {
            "question": "What is Python?",
            "choices": {
              "A": "A snake",
              "B": "A programming language",
              "C": "A database",
              "D": "An operating system"
            },
            "answer": "B",
            "explanation": "Python is a high-level, interpreted programming language known for its simplicity and readability."
          },
          {
            "question": "Which of the following is NOT a feature of Python?",
            "choices": {
              "A": "Interpreted",
              "B": "Statically typed",
              "C": "Dynamically typed",
              "D": "Open-source"
            },
            "answer": "B",
            "explanation": "Python is dynamically typed, meaning variables do not need explicit type declarations."
          },
          {
            "question": "Which symbol is used for comments in Python?",
            "choices": {
              "A": "//",
              "B": "/* */",
              "C": "#",
              "D": "--"
            },
            "answer": "C",
            "explanation": "In Python, the '#' symbol is used to write comments."
          },
          {
            "question": "Which data type is immutable in Python?",
            "choices": {
              "A": "List",
              "B": "Dictionary",
              "C": "Tuple",
              "D": "Set"
            },
            "answer": "C",
            "explanation": "Tuples are immutable, meaning their values cannot be changed after creation."
          },
          {
            "question": "How do you define a function in Python?",
            "choices": {
              "A": "function myFunc():",
              "B": "def myFunc():",
              "C": "define myFunc():",
              "D": "func myFunc():"
            },
            "answer": "B",
            "explanation": "Functions in Python are defined using the 'def' keyword."
          },
          {
            "question": "Which of the following is used to define a block of code in Python?",
            "choices": {
              "A": "{}",
              "B": "Indentation",
              "C": "[]",
              "D": "()"
            },
            "answer": "B",
            "explanation": "Python uses indentation to define blocks of code instead of curly braces."
          },
          {
            "question": "Which function is used to get user input in Python?",
            "choices": {
              "A": "input()",
              "B": "getInput()",
              "C": "scan()",
              "D": "read()"
            },
            "answer": "A",
            "explanation": "The input() function is used to take user input in Python."
          },
          {
            "question": "Which module is used for working with regular expressions in Python?",
            "choices": {
              "A": "regex",
              "B": "re",
              "C": "regexp",
              "D": "rex"
            },
            "answer": "B",
            "explanation": "The 're' module in Python provides support for regular expressions."
          },
          {
            "question": "What will be the output of print(2 ** 3)?",
            "choices": {
              "A": "5",
              "B": "6",
              "C": "8",
              "D": "9"
            },
            "answer": "C",
            "explanation": "The '**' operator is used for exponentiation, so 2 ** 3 = 8."
          },
          {
            "question": "Which keyword is used to define a class in Python?",
            "choices": {
              "A": "class",
              "B": "define",
              "C": "struct",
              "D": "object"
            },
            "answer": "A",
            "explanation": "Classes in Python are defined using the 'class' keyword."
          },
          {
            "question": "Which method is called automatically when an object is created in Python?",
            "choices": {
              "A": "__start__",
              "B": "__init__",
              "C": "__create__",
              "D": "__object__"
            },
            "answer": "B",
            "explanation": "The '__init__' method is a special constructor method that initializes an object."
          },
          {
            "question": "Which function is used to find the length of a list in Python?",
            "choices": {
              "A": "size()",
              "B": "count()",
              "C": "length()",
              "D": "len()"
            },
            "answer": "D",
            "explanation": "The len() function returns the number of elements in a list."
          },
          {
            "question": "What is the output of print(type([]))?",
            "choices": {
              "A": "<class 'list'>",
              "B": "<class 'tuple'>",
              "C": "<class 'dict'>",
              "D": "<class 'set'>"
            },
            "answer": "A",
            "explanation": "An empty square bracket '[]' represents a list in Python."
          },
          {
            "question": "How do you open a file in read mode in Python?",
            "choices": {
              "A": "open('file.txt', 'w')",
              "B": "open('file.txt', 'r')",
              "C": "open('file.txt', 'a')",
              "D": "open('file.txt', 'x')"
            },
            "answer": "B",
            "explanation": "The 'r' mode is used to open a file in read mode."
          },
          {
            "question": "Which keyword is used to handle exceptions in Python?",
            "choices": {
              "A": "catch",
              "B": "handle",
              "C": "except",
              "D": "try"
            },
            "answer": "C",
            "explanation": "Exceptions in Python are handled using the 'try-except' block."
          },
          {
            "question": "What does the 'break' statement do in a loop?",
            "choices": {
              "A": "Skips one iteration",
              "B": "Terminates the loop",
              "C": "Pauses the loop",
              "D": "Restarts the loop"
            },
            "answer": "B",
            "explanation": "The 'break' statement immediately exits the loop."
          },
          {
            "question": "Which function is used to convert a string into an integer?",
            "choices": {
              "A": "str()",
              "B": "int()",
              "C": "float()",
              "D": "char()"
            },
            "answer": "B",
            "explanation": "The int() function converts a string or float into an integer."
          },
          {
            "question": "What is the output of print(bool(0))?",
            "choices": {
              "A": "True",
              "B": "False",
              "C": "None",
              "D": "Error"
            },
            "answer": "B",
            "explanation": "The boolean value of 0 is False in Python."
          },
          {
            "question": "Which keyword is used to create a loop in Python?",
            "choices": {
              "A": "repeat",
              "B": "loop",
              "C": "for",
              "D": "iterate"
            },
            "answer": "C",
            "explanation": "Python uses 'for' and 'while' loops to iterate over sequences."
          },
          {
            "question": "Which statement is used to exit a function in Python?",
            "choices": {
              "A": "break",
              "B": "continue",
              "C": "return",
              "D": "exit"
            },
            "answer": "C",
            "explanation": "The 'return' statement is used to exit a function and return a value."
          }
        ]
      },
      {
        "questions": [
          {
            "question": "Which method is used to add an element at the end of a list?",
            "choices": {
              "A": "append()",
              "B": "insert()",
              "C": "extend()",
              "D": "add()"
            },
            "answer": "A",
            "explanation": "The append() method adds an element to the end of a list."
          },
          {
            "question": "What will be the output of print(type({}))?",
            "choices": {
              "A": "<class 'set'>",
              "B": "<class 'dict'>",
              "C": "<class 'list'>",
              "D": "<class 'tuple'>"
            },
            "answer": "B",
            "explanation": "An empty '{}' creates a dictionary in Python."
          },
          {
            "question": "Which function is used to find the maximum value in a list?",
            "choices": {
              "A": "max()",
              "B": "highest()",
              "C": "top()",
              "D": "maximum()"
            },
            "answer": "A",
            "explanation": "The max() function returns the highest value in a list."
          },
          {
            "question": "Which of the following loops is used when the number of iterations is unknown?",
            "choices": {
              "A": "for loop",
              "B": "while loop",
              "C": "do-while loop",
              "D": "repeat loop"
            },
            "answer": "B",
            "explanation": "A while loop runs as long as a condition is true, making it suitable when the number of iterations is unknown."
          },
          {
            "question": "Which keyword is used to declare a class in Python?",
            "choices": {
              "A": "define",
              "B": "class",
              "C": "object",
              "D": "struct"
            },
            "answer": "B",
            "explanation": "Python classes are declared using the 'class' keyword."
          },
          {
            "question": "Which operator is used to check if a value exists in a list?",
            "choices": {
              "A": "in",
              "B": "exists",
              "C": "contains",
              "D": "has"
            },
            "answer": "A",
            "explanation": "The 'in' operator checks if a value exists in a sequence (like a list or tuple)."
          },
          {
            "question": "How do you convert a string to a list of characters?",
            "choices": {
              "A": "split()",
              "B": "list()",
              "C": "strtolist()",
              "D": "convert()"
            },
            "answer": "B",
            "explanation": "The list() function can be used to convert a string into a list of characters."
          },
          {
            "question": "What does the zip() function do in Python?",
            "choices": {
              "A": "Compress files",
              "B": "Iterate over multiple lists in parallel",
              "C": "Sort lists",
              "D": "Merge dictionaries"
            },
            "answer": "B",
            "explanation": "The zip() function is used to iterate over multiple sequences in parallel."
          },
          {
            "question": "Which module is used to work with dates in Python?",
            "choices": {
              "A": "datetime",
              "B": "time",
              "C": "calendar",
              "D": "dateutil"
            },
            "answer": "A",
            "explanation": "The datetime module provides functions to work with dates and times."
          },
          {
            "question": "What will be the output of print(bool('False'))?",
            "choices": {
              "A": "True",
              "B": "False",
              "C": "None",
              "D": "Error"
            },
            "answer": "A",
            "explanation": "Any non-empty string, including 'False', evaluates to True in Python."
          },
          {
            "question": "Which of the following is the correct extension of a Python file?",
            "choices": {
              "A": ".py",
              "B": ".python",
              "C": ".p",
              "D": ".pt"
            },
            "answer": "A",
            "explanation": "Python files have the '.py' extension."
          },
          {
            "question": "Which keyword is used to define an anonymous function in Python?",
            "choices": {
              "A": "lambda",
              "B": "def",
              "C": "function",
              "D": "anonymous"
            },
            "answer": "A",
            "explanation": "Lambda functions are small anonymous functions created using the 'lambda' keyword."
          },
          {
            "question": "Which of the following is not a valid variable name in Python?",
            "choices": {
              "A": "my_var",
              "B": "_var",
              "C": "2var",
              "D": "var2"
            },
            "answer": "C",
            "explanation": "Variable names cannot start with a digit in Python."
          },
          {
            "question": "How can you generate random numbers in Python?",
            "choices": {
              "A": "import random",
              "B": "random.number()",
              "C": "generate.random()",
              "D": "rand()"
            },
            "answer": "A",
            "explanation": "The 'random' module in Python allows generating random numbers using functions like random.randint() or random.random()."
          },
          {
            "question": "Which of the following functions converts a string to lowercase?",
            "choices": {
              "A": "lower()",
              "B": "tolower()",
              "C": "uppercase()",
              "D": "downcase()"
            },
            "answer": "A",
            "explanation": "The lower() function converts a string to lowercase in Python."
          },
          {
            "question": "Which function is used to remove an item from a list by value?",
            "choices": {
              "A": "delete()",
              "B": "remove()",
              "C": "pop()",
              "D": "discard()"
            },
            "answer": "B",
            "explanation": "The remove() method removes the first occurrence of a specified value in a list."
          },
          {
            "question": "Which keyword is used to create a generator function?",
            "choices": {
              "A": "yield",
              "B": "return",
              "C": "generate",
              "D": "yield_return"
            },
            "answer": "A",
            "explanation": "The 'yield' keyword is used in Python to create generator functions."
          },
          {
            "question": "Which of the following is not a built-in data type in Python?",
            "choices": {
              "A": "List",
              "B": "Tuple",
              "C": "Array",
              "D": "Dictionary"
            },
            "answer": "C",
            "explanation": "Arrays are not a built-in data type in Python; they are provided by the 'array' module."
          },
          {
            "question": "How do you check the data type of a variable in Python?",
            "choices": {
              "A": "checkType(var)",
              "B": "type(var)",
              "C": "typeof(var)",
              "D": "getType(var)"
            },
            "answer": "B",
            "explanation": "The 'type()' function is used to check the data type of a variable."
          },
          {
            "question": "What will be the output of bool([])?",
            "choices": {
              "A": "True",
              "B": "False",
              "C": "None",
              "D": "Error"
            },
            "answer": "B",
            "explanation": "An empty list is considered False when converted to a boolean in Python."
          },
          {
            "question": "Which method can be used to convert a list into a set?",
            "choices": {
              "A": "list()",
              "B": "set()",
              "C": "tuple()",
              "D": "dict()"
            },
            "answer": "B",
            "explanation": "The set() function converts a list into a set, removing duplicate values."
          },
          {
            "question": "Which operator is used for floor division?",
            "choices": {
              "A": "/",
              "B": "//",
              "C": "%",
              "D": "**"
            },
            "answer": "B",
            "explanation": "The '//' operator performs floor division, returning the largest integer less than or equal to the result."
          },
          {
            "question": "Which of the following is a correct way to define a dictionary?",
            "choices": {
              "A": "{1, 2, 3}",
              "B": "dict = {'key': 'value'}",
              "C": "[1, 2, 3]",
              "D": "set(1, 2, 3)"
            },
            "answer": "B",
            "explanation": "Dictionaries in Python are created using key-value pairs inside curly braces."
          },
          {
            "question": "Which of the following is an immutable data type?",
            "choices": {
              "A": "List",
              "B": "Dictionary",
              "C": "Set",
              "D": "Tuple"
            },
            "answer": "D",
            "explanation": "Tuples are immutable, meaning they cannot be changed after creation."
          },
          {
            "question": "Which function is used to get the ASCII value of a character?",
            "choices": {
              "A": "ord()",
              "B": "ascii()",
              "C": "char()",
              "D": "ordval()"
            },
            "answer": "A",
            "explanation": "The ord() function returns the ASCII value of a given character."
          },
          {
            "question": "What is the output of len({'a': 1, 'b': 2, 'c': 3})?",
            "choices": {
              "A": "3",
              "B": "6",
              "C": "1",
              "D": "Error"
            },
            "answer": "A",
            "explanation": "The len() function returns the number of keys in a dictionary, which is 3 in this case."
          },
          {
            "question": "Which of the following is used to inherit a class in Python?",
            "choices": {
              "A": "inherit()",
              "B": "super()",
              "C": "BaseClass()",
              "D": "class DerivedClass(BaseClass):"
            },
            "answer": "D",
            "explanation": "Python uses class inheritance by specifying the parent class inside parentheses when defining a derived class."
          },
          {
            "question": "Which statement is used to handle exceptions in Python?",
            "choices": {
              "A": "catch",
              "B": "try-except",
              "C": "handle",
              "D": "error"
            },
            "answer": "B",
            "explanation": "Python handles exceptions using 'try' and 'except' blocks."
          },
          {
            "question": "Which function is used to reverse a list in Python?",
            "choices": {
              "A": "reverse()",
              "B": "rev()",
              "C": "flip()",
              "D": "invert()"
            },
            "answer": "A",
            "explanation": "The reverse() method reverses the elements of a list in place."
          },
          {
            "question": "Which Python function is used to iterate over a sequence along with its index?",
            "choices": {
              "A": "enumerate()",
              "B": "iterate()",
              "C": "index()",
              "D": "loop()"
            },
            "answer": "A",
            "explanation": "The enumerate() function adds an index counter while iterating over a sequence."
          }
        ]
      },
];



const getRandomQuestions = (allQuestions, num) => {
    return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
  };
  
  const PythonQuizPage = () => {
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
    const searchParams = useSearchParams();
    const numQuestions = parseInt(searchParams.get("numQuestions"), 10) || 5;
    const timeLimit = parseInt(searchParams.get("timeLimit"), 10) || 150;
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
      // Fetch questions (Replace with actual API call)
      const sampleQuestions = Array.from({ length: numQuestions }, (_, i) => ({
        id: i + 1,
        question: `Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
      }));
      setQuestions(sampleQuestions);
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
        setQuestions(getRandomQuestions(allQuestions.flatMap(q => q.questions), 5));
    }, []);
  
    const handleAnswerClick = (selectedOption) => {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.answer;
  
      setSelectedAnswers((prev) => [
          ...prev, 
          { 
              question: currentQuestion.question, 
              selected: selectedOption, 
              correct: isCorrect 
          }
      ]);
  
      // Show hint button **only if the answer is correct**
      if (isCorrect) setScore(score + 1);
    
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  
   
  const toggleHint = (questionText) => {
    setShowHints((prev) => ({
        ...prev,
        [questionText]: !prev[questionText]
    }));
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
                const correctAnswerText = question.choices[question.answer];
                return (
                  <li key={index} style={styles.resultBox(userAnswer?.correct)}>
                    <strong>{question.question}</strong><br />
                    Your Answer: {userAnswer ? question.choices[userAnswer.selected] : "No answer"}

                    {userAnswer?.correct && (
                      <>
                        <button onClick={() => toggleHint(question.question)} style={styles.hintButton}>
                          <FaQuestionCircle /> Hint
                        </button>
                        {showHints[question.question] && (
                          <p style={styles.hintBox}>🧐 {question.explanation}</p>
                        )}
                      </>
                    )}
                    
                    {!userAnswer?.correct && (
                      <p style={styles.correctAnswerText}>
                        ✅ Correct Answer: {correctAnswerText} <br />
                        🧐 {question.explanation}
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
            <motion.div>
              <h2>{questions[currentQuestionIndex]?.question}</h2>
            </motion.div>
            <div style={styles.answerSection}>
              <p>Time Left: {Math.floor(timeLeft / 60)} min {timeLeft % 60} sec</p>
              {Object.entries(questions[currentQuestionIndex]?.choices || {}).map(([key, text]) => (
                <button key={key} onClick={() => handleAnswerClick(key)}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.answerButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.answerButton.backgroundColor}
                onMouseDown={(e) => e.target.style.backgroundColor = styles.answerButtonActive.backgroundColor}
                onMouseUp={(e) => e.target.style.backgroundColor = styles.answerButton.backgroundColor}
                style={styles.answerButton} >
                  {text}
                </button>
              ))}
            </div>
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
  
  export default PythonQuizPage;