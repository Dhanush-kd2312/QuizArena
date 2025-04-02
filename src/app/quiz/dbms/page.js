'use client'
import { useState, useRef,useEffect } from 'react';
import { FaQuestionCircle, FaCertificate, FaFire } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../../../../components/navbar';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

const allQuestions = [
    {
        "questions": [
    {
        "question": "Which component of an RDBMS is responsible for managing data storage?",
        "choices": {
          "A": "Query Processor",
          "B": "Storage Engine",
          "C": "User Interface",
          "D": "Transaction Manager"
        },
        "answer": "B",
        "explanation": "The Storage Engine is responsible for managing how data is stored and retrieved in an RDBMS."
      },
      {
        "question": "Which SQL clause is used to define a condition on aggregated results?",
        "choices": {
          "A": "WHERE",
          "B": "HAVING",
          "C": "ORDER BY",
          "D": "GROUP BY"
        },
        "answer": "B",
        "explanation": "HAVING is used to filter grouped records after an aggregate function is applied."
      },
      {
        "question": "Which command is used to add a new column to an existing table?",
        "choices": {
          "A": "MODIFY",
          "B": "CHANGE",
          "C": "ALTER",
          "D": "UPDATE"
        },
        "answer": "C",
        "explanation": "The ALTER TABLE command is used to add, delete, or modify columns in an existing table."
      },
      {
        "question": "Which database object is used to enforce data integrity by restricting the values allowed in a column?",
        "choices": {
          "A": "View",
          "B": "Index",
          "C": "Constraint",
          "D": "Trigger"
        },
        "answer": "C",
        "explanation": "Constraints are used to enforce rules on data in a database, ensuring data integrity."
      },
      {
        "question": "Which type of JOIN returns all records from both tables when there is a match, and NULL values where there is no match?",
        "choices": {
          "A": "INNER JOIN",
          "B": "LEFT JOIN",
          "C": "RIGHT JOIN",
          "D": "FULL OUTER JOIN"
        },
        "answer": "D",
        "explanation": "FULL OUTER JOIN returns all records from both tables, filling unmatched columns with NULL values."
      },
      {
        "question": "Which index type stores data in a sorted order to speed up retrieval operations?",
        "choices": {
          "A": "Clustered Index",
          "B": "Non-Clustered Index",
          "C": "Unique Index",
          "D": "Hash Index"
        },
        "answer": "A",
        "explanation": "A Clustered Index stores data in a sorted order, helping improve query performance."
      },
      {
        "question": "What is the purpose of a foreign key constraint?",
        "choices": {
          "A": "To enforce referential integrity between tables",
          "B": "To uniquely identify each row",
          "C": "To improve query performance",
          "D": "To prevent NULL values in a column"
        },
        "answer": "A",
        "explanation": "A foreign key constraint enforces referential integrity by linking one table’s column to another table’s primary key."
      },
      {
        "question": "What is a stored procedure?",
        "choices": {
          "A": "A temporary table",
          "B": "A precompiled SQL statement stored in the database",
          "C": "A constraint for enforcing data integrity",
          "D": "A type of index"
        },
        "answer": "B",
        "explanation": "A stored procedure is a precompiled SQL statement stored in the database, which can be executed repeatedly."
      },
      {
        "question": "Which of the following operations is NOT part of the ACID properties?",
        "choices": {
          "A": "Atomicity",
          "B": "Concurrency",
          "C": "Isolation",
          "D": "Durability"
        },
        "answer": "B",
        "explanation": "ACID properties include Atomicity, Consistency, Isolation, and Durability; Concurrency is a related concept but not part of ACID."
      },
      {
        "question": "What is the purpose of the COMMIT statement in SQL?",
        "choices": {
          "A": "To execute a query",
          "B": "To save changes made during a transaction",
          "C": "To remove all records from a table",
          "D": "To close a database connection"
        },
        "answer": "B",
        "explanation": "The COMMIT statement saves all changes made in the current transaction to the database."
      },
      {
        "question": "Which of the following is an example of a NoSQL database?",
        "choices": {
          "A": "MySQL",
          "B": "PostgreSQL",
          "C": "MongoDB",
          "D": "SQL Server"
        },
        "answer": "C",
        "explanation": "MongoDB is a NoSQL database, whereas MySQL, PostgreSQL, and SQL Server are relational databases."
      },
      {
        "question": "Which SQL statement is used to remove a specific record from a table?",
        "choices": {
          "A": "DELETE",
          "B": "DROP",
          "C": "TRUNCATE",
          "D": "CLEAR"
        },
        "answer": "A",
        "explanation": "The DELETE statement removes specific records from a table while keeping the table structure intact."
      },
      {
        "question": "Which function returns the highest value in a column?",
        "choices": {
          "A": "MIN()",
          "B": "MAX()",
          "C": "AVG()",
          "D": "COUNT()"
        },
        "answer": "B",
        "explanation": "The MAX() function returns the highest value in a specified column."
      },
      {
        "question": "Which SQL command is used to create a backup of a database?",
        "choices": {
          "A": "BACKUP DATABASE",
          "B": "EXPORT DATABASE",
          "C": "SAVE DATABASE",
          "D": "COPY DATABASE"
        },
        "answer": "A",
        "explanation": "The BACKUP DATABASE command is used to create a backup copy of a database."
      },
      {
        "question": "What is a trigger in a database?",
        "choices": {
          "A": "A query that retrieves data",
          "B": "A predefined action executed in response to an event",
          "C": "A table that stores temporary data",
          "D": "A key used for indexing"
        },
        "answer": "B",
        "explanation": "A trigger is a predefined action that automatically executes in response to an event in a database."
      },
      {
        "question": "Which command is used to rename an existing table?",
        "choices": {
          "A": "CHANGE TABLE",
          "B": "MODIFY TABLE",
          "C": "ALTER TABLE",
          "D": "RENAME TABLE"
        },
        "answer": "D",
        "explanation": "The RENAME TABLE command is used to rename an existing table."
      },
      {
        "question": "Which SQL statement is used to retrieve the first five records from a table?",
        "choices": {
          "A": "LIMIT 5",
          "B": "TOP 5",
          "C": "FETCH 5",
          "D": "SELECT FIRST 5"
        },
        "answer": "A",
        "explanation": "LIMIT 5 is used in SQL to retrieve the first five records from a table."
      },
      {
        "question": "Which of the following database models does an RDBMS follow?",
        "choices": {
          "A": "Hierarchical Model",
          "B": "Network Model",
          "C": "Relational Model",
          "D": "Document-Oriented Model"
        },
        "answer": "C",
        "explanation": "An RDBMS follows the Relational Model, which organizes data into tables with relationships."
      },
      {
        "question": "Which type of join includes all records from the left table and only matching records from the right table?",
        "choices": {
          "A": "INNER JOIN",
          "B": "LEFT JOIN",
          "C": "RIGHT JOIN",
          "D": "FULL OUTER JOIN"
        },
        "answer": "B",
        "explanation": "A LEFT JOIN returns all records from the left table and only matching records from the right table."
      },
      {
        "question": "Which SQL keyword is used to specify a condition in an aggregate function?",
        "choices": {
          "A": "WHERE",
          "B": "GROUP BY",
          "C": "HAVING",
          "D": "ORDER BY"
        },
        "answer": "C",
        "explanation": "HAVING is used to filter aggregated results, unlike WHERE, which filters individual rows."
      },
      {
        "question": "Which SQL keyword is used to retrieve unique values from a column?",
        "choices": {
          "A": "UNIQUE",
          "B": "DISTINCT",
          "C": "FILTER",
          "D": "SEPARATE"
        },
        "answer": "B",
        "explanation": "The DISTINCT keyword is used in SQL to return only unique values from a column."
      },
      {
        "question": "What is a composite key in an RDBMS?",
        "choices": {
          "A": "A key that is made up of multiple columns",
          "B": "A key that is automatically generated",
          "C": "A key that allows NULL values",
          "D": "A key that is used as a foreign key in another table"
        },
        "answer": "A",
        "explanation": "A composite key consists of two or more columns used together to uniquely identify a record."
      },
      {
        "question": "Which SQL command is used to remove all rows from a table while keeping the structure intact?",
        "choices": {
          "A": "DROP",
          "B": "DELETE",
          "C": "TRUNCATE",
          "D": "REMOVE"
        },
        "answer": "C",
        "explanation": "The TRUNCATE command removes all records from a table but keeps its structure intact."
      },
      {
        "question": "Which of the following best describes the purpose of an Entity-Relationship Diagram (ERD)?",
        "choices": {
          "A": "To visualize relationships between tables in a database",
          "B": "To execute SQL queries",
          "C": "To create a backup of a database",
          "D": "To optimize database performance"
        },
        "answer": "A",
        "explanation": "An ERD (Entity-Relationship Diagram) visually represents entities, attributes, and relationships in a database."
      },
      {
        "question": "Which SQL constraint ensures that a column’s values are unique across all rows?",
        "choices": {
          "A": "PRIMARY KEY",
          "B": "UNIQUE",
          "C": "FOREIGN KEY",
          "D": "CHECK"
        },
        "answer": "B",
        "explanation": "The UNIQUE constraint ensures that all values in a column are distinct."
      },
      {
        "question": "What is the role of the CHECK constraint in SQL?",
        "choices": {
          "A": "To enforce referential integrity",
          "B": "To restrict values in a column based on a condition",
          "C": "To ensure uniqueness of values",
          "D": "To prevent NULL values"
        },
        "answer": "B",
        "explanation": "The CHECK constraint ensures that values in a column meet a specific condition."
      },
      {
        "question": "Which of the following is NOT a type of SQL index?",
        "choices": {
          "A": "Clustered Index",
          "B": "Non-Clustered Index",
          "C": "Full-Text Index",
          "D": "Transaction Index"
        },
        "answer": "D",
        "explanation": "There is no such thing as a Transaction Index; valid SQL index types include Clustered, Non-Clustered, and Full-Text indexes."
      },
      {
        "question": "What is the primary purpose of the SQL GROUP BY clause?",
        "choices": {
          "A": "To sort query results",
          "B": "To filter data before applying aggregate functions",
          "C": "To group rows based on common column values",
          "D": "To remove duplicate rows"
        },
        "answer": "C",
        "explanation": "The GROUP BY clause groups rows that have the same values in specified columns and is often used with aggregate functions."
      },
      {
        "question": "Which of the following statements about database transactions is TRUE?",
        "choices": {
          "A": "A transaction is always automatically committed",
          "B": "A transaction consists of multiple operations that must be executed as a unit",
          "C": "Transactions cannot be rolled back",
          "D": "A transaction only affects one row at a time"
        },
        "answer": "B",
        "explanation": "A transaction is a sequence of operations that must be completed as a unit to ensure data consistency."
      },
      {
        "question": "Which of the following is used to store the execution plan of a SQL query for optimization?",
        "choices": {
          "A": "Trigger",
          "B": "Stored Procedure",
          "C": "Execution Plan Cache",
          "D": "Database View"
        },
        "answer": "C",
        "explanation": "The Execution Plan Cache stores query execution plans to optimize SQL query performance by reusing previously generated plans."
      },
      {
        "question": "What does RDBMS stand for?",
        "choices": {
          "A": "Relational Database Management System",
          "B": "Random Data Backup Management System",
          "C": "Rapid Data Building and Management System",
          "D": "Remote Database Management Software"
        },
        "answer": "A",
        "explanation": "RDBMS stands for Relational Database Management System, which is used to store, manage, and retrieve data in a structured format using relationships."
      },
      {
        "question": "Which language is primarily used to interact with RDBMS?",
        "choices": {
          "A": "HTML",
          "B": "SQL",
          "C": "Python",
          "D": "C++"
        },
        "answer": "B",
        "explanation": "SQL (Structured Query Language) is used to interact with RDBMS for data retrieval and manipulation."
      },
      {
        "question": "Which of the following is NOT an RDBMS?",
        "choices": {
          "A": "MySQL",
          "B": "MongoDB",
          "C": "PostgreSQL",
          "D": "Oracle"
        },
        "answer": "B",
        "explanation": "MongoDB is a NoSQL database, while MySQL, PostgreSQL, and Oracle are RDBMS."
      },
      {
        "question": "Which SQL command is used to remove all records from a table without removing its structure?",
        "choices": {
          "A": "DELETE",
          "B": "DROP",
          "C": "TRUNCATE",
          "D": "REMOVE"
        },
        "answer": "C",
        "explanation": "The TRUNCATE command removes all rows from a table but retains its structure for future use."
      },
      {
        "question": "Which constraint ensures that a column cannot have NULL values?",
        "choices": {
          "A": "PRIMARY KEY",
          "B": "UNIQUE",
          "C": "NOT NULL",
          "D": "CHECK"
        },
        "answer": "C",
        "explanation": "The NOT NULL constraint ensures that a column must always have a value."
      },
      {
        "question": "What is the primary function of a PRIMARY KEY in a table?",
        "choices": {
          "A": "To allow duplicate values",
          "B": "To ensure unique identification of each record",
          "C": "To store only numeric data",
          "D": "To increase query performance"
        },
        "answer": "B",
        "explanation": "A PRIMARY KEY uniquely identifies each record in a table."
      },
      {
        "question": "Which SQL clause is used to filter records?",
        "choices": {
          "A": "ORDER BY",
          "B": "GROUP BY",
          "C": "WHERE",
          "D": "HAVING"
        },
        "answer": "C",
        "explanation": "The WHERE clause is used to filter records based on specific conditions."
      },
      {
        "question": "Which JOIN type returns only matching records from both tables?",
        "choices": {
          "A": "LEFT JOIN",
          "B": "RIGHT JOIN",
          "C": "FULL JOIN",
          "D": "INNER JOIN"
        },
        "answer": "D",
        "explanation": "INNER JOIN returns only the records that have matching values in both tables."
      },
      {
        "question": "Which of the following is a DDL command?",
        "choices": {
          "A": "INSERT",
          "B": "UPDATE",
          "C": "CREATE",
          "D": "SELECT"
        },
        "answer": "C",
        "explanation": "CREATE is a DDL (Data Definition Language) command used to define database structures."
      },
      {
        "question": "What is normalization in databases?",
        "choices": {
          "A": "A process of storing data in a single table",
          "B": "A process of reducing redundancy and dependency",
          "C": "A process of making queries faster",
          "D": "A process of encrypting data"
        },
        "answer": "B",
        "explanation": "Normalization is a process of structuring a database to reduce redundancy and dependency."
      },
      {
        "question": "Which normal form eliminates partial dependencies?",
        "choices": {
          "A": "1NF",
          "B": "2NF",
          "C": "3NF",
          "D": "BCNF"
        },
        "answer": "B",
        "explanation": "Second Normal Form (2NF) eliminates partial dependencies by ensuring that non-key attributes depend on the whole primary key."
      },
      {
        "question": "Which key is used to establish a relationship between two tables?",
        "choices": {
          "A": "Primary Key",
          "B": "Foreign Key",
          "C": "Unique Key",
          "D": "Super Key"
        },
        "answer": "B",
        "explanation": "A Foreign Key is used to establish a relationship between two tables by referencing the Primary Key of another table."
      },
      {
        "question": "What is the purpose of an index in a database?",
        "choices": {
          "A": "To store records in sequential order",
          "B": "To improve query performance",
          "C": "To allow duplicate values",
          "D": "To store only numeric values"
        },
        "answer": "B",
        "explanation": "Indexes improve query performance by allowing faster retrieval of data."
      },
      {
        "question": "Which SQL statement is used to change existing data in a table?",
        "choices": {
          "A": "INSERT",
          "B": "UPDATE",
          "C": "ALTER",
          "D": "DELETE"
        },
        "answer": "B",
        "explanation": "The UPDATE statement modifies existing records in a table."
      },
      {
        "question": "Which command is used to remove a table from a database?",
        "choices": {
          "A": "DELETE",
          "B": "DROP",
          "C": "REMOVE",
          "D": "TRUNCATE"
        },
        "answer": "B",
        "explanation": "The DROP command removes a table along with its structure from the database."
      },
      {
        "question": "Which SQL function is used to count the number of rows in a table?",
        "choices": {
          "A": "SUM()",
          "B": "AVG()",
          "C": "COUNT()",
          "D": "TOTAL()"
        },
        "answer": "C",
        "explanation": "COUNT() function returns the number of rows in a table."
      },
      {
        "question": "Which clause is used to group records based on a specific column?",
        "choices": {
          "A": "ORDER BY",
          "B": "WHERE",
          "C": "GROUP BY",
          "D": "HAVING"
        },
        "answer": "C",
        "explanation": "The GROUP BY clause groups records based on a specified column."
      },
      {
        "question": "What does ACID stand for in databases?",
        "choices": {
          "A": "Atomicity, Consistency, Isolation, Durability",
          "B": "Accuracy, Control, Integration, Dependability",
          "C": "Automated, Centralized, Indexed, Distributed",
          "D": "Access, Configuration, Implementation, Data"
        },
        "answer": "A",
        "explanation": "ACID properties ensure reliable transactions: Atomicity, Consistency, Isolation, and Durability."
      },
      {
        "question": "Which SQL statement is used to retrieve unique records?",
        "choices": {
          "A": "DISTINCT",
          "B": "UNIQUE",
          "C": "EXISTS",
          "D": "FILTER"
        },
        "answer": "A",
        "explanation": "The DISTINCT keyword retrieves unique records from a result set."
      },
      {
        "question": "What is the purpose of the HAVING clause?",
        "choices": {
          "A": "To filter records before grouping",
          "B": "To filter groups after aggregation",
          "C": "To join multiple tables",
          "D": "To modify existing records"
        },
        "answer": "B",
        "explanation": "HAVING is used to filter groups after aggregation, unlike WHERE, which filters individual records."
      }
    ]
   }
];

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const DBMSQuizPage = () => {
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

export default DBMSQuizPage;