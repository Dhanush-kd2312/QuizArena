'use client'
import { useState, useRef,useEffect } from 'react';
import { FaQuestionCircle, FaCertificate, FaFire } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../../../../components/navbar';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


const allQuestions = [
    {
        "questions": [
    {
        "question": "What is the primary goal of artificial intelligence?",
        "choices": {
          "A": "To mimic human intelligence",
          "B": "To replace human workers",
          "C": "To perform only arithmetic calculations",
          "D": "To eliminate human intervention in all tasks"
        },
        "answer": "A",
        "explanation": "The primary goal of AI is to develop systems that can mimic human intelligence, including learning, problem-solving, and decision-making."
      },
      {
        "question": "Which of the following is a type of AI that can learn from data and improve its performance?",
        "choices": {
          "A": "Rule-based AI",
          "B": "Machine Learning",
          "C": "Hardcoded AI",
          "D": "Symbolic AI"
        },
        "answer": "B",
        "explanation": "Machine Learning enables AI systems to learn from data and improve their performance without explicit programming."
      },
      {
        "question": "What does NLP stand for in AI?",
        "choices": {
          "A": "Natural Learning Process",
          "B": "Neural Language Processing",
          "C": "Natural Language Processing",
          "D": "Network Language Protocol"
        },
        "answer": "C",
        "explanation": "Natural Language Processing (NLP) is a field of AI that enables computers to understand, interpret, and generate human language."
      },
      {
        "question": "Which AI approach mimics the way human neurons work?",
        "choices": {
          "A": "Genetic Algorithms",
          "B": "Expert Systems",
          "C": "Neural Networks",
          "D": "Fuzzy Logic"
        },
        "answer": "C",
        "explanation": "Neural Networks are inspired by the structure and function of the human brain's neurons and are widely used in deep learning."
      },
      {
        "question": "Which machine learning technique is used when labeled data is unavailable?",
        "choices": {
          "A": "Supervised Learning",
          "B": "Unsupervised Learning",
          "C": "Reinforcement Learning",
          "D": "Semi-Supervised Learning"
        },
        "answer": "B",
        "explanation": "Unsupervised Learning is used when labeled data is unavailable and aims to identify patterns and structures in the data."
      },
      {
        "question": "What is the primary purpose of reinforcement learning in AI?",
        "choices": {
          "A": "To analyze historical data",
          "B": "To classify data into predefined categories",
          "C": "To learn optimal actions through rewards and punishments",
          "D": "To store large amounts of data efficiently"
        },
        "answer": "C",
        "explanation": "Reinforcement Learning enables AI to learn by interacting with an environment, receiving rewards for good actions and penalties for bad actions."
      },
      {
        "question": "Which AI model is commonly used for image recognition?",
        "choices": {
          "A": "Support Vector Machine",
          "B": "Recurrent Neural Network",
          "C": "Convolutional Neural Network",
          "D": "Decision Tree"
        },
        "answer": "C",
        "explanation": "Convolutional Neural Networks (CNNs) are specifically designed for image recognition and processing."
      },
      {
        "question": "What is the term for an AI system that can perform any intellectual task a human can do?",
        "choices": {
          "A": "Narrow AI",
          "B": "General AI",
          "C": "Reactive AI",
          "D": "Weak AI"
        },
        "answer": "B",
        "explanation": "General AI (AGI) refers to an AI system that can perform any intellectual task a human can do, unlike narrow AI, which is task-specific."
      },
      {
        "question": "Which technique is used to reduce the dimensionality of large datasets in AI?",
        "choices": {
          "A": "Data Augmentation",
          "B": "Principal Component Analysis",
          "C": "Hyperparameter Tuning",
          "D": "Overfitting"
        },
        "answer": "B",
        "explanation": "Principal Component Analysis (PCA) is a technique used to reduce the dimensionality of large datasets while preserving important information."
      },
      {
        "question": "What is an example of a generative AI model?",
        "choices": {
          "A": "Logistic Regression",
          "B": "Generative Adversarial Networks",
          "C": "Support Vector Machines",
          "D": "Random Forest"
        },
        "answer": "B",
        "explanation": "Generative Adversarial Networks (GANs) are a type of AI model that generate new data similar to a given dataset."
      },
      {
        "question": "Which component is essential for training deep learning models?",
        "choices": {
          "A": "Low computational power",
          "B": "Large labeled datasets",
          "C": "Rule-based programming",
          "D": "Manually defined decision trees"
        },
        "answer": "B",
        "explanation": "Deep learning models require large labeled datasets to learn complex patterns and improve accuracy."
      },
      {
        "question": "Which AI technique is used in self-driving cars to detect objects?",
        "choices": {
          "A": "Decision Trees",
          "B": "Convolutional Neural Networks",
          "C": "Naïve Bayes Classifier",
          "D": "Linear Regression"
        },
        "answer": "B",
        "explanation": "Self-driving cars use Convolutional Neural Networks (CNNs) for object detection and recognition."
      },
      {
        "question": "Which AI method is used for sequential data, such as speech recognition?",
        "choices": {
          "A": "Random Forest",
          "B": "Recurrent Neural Networks",
          "C": "K-Means Clustering",
          "D": "Logistic Regression"
        },
        "answer": "B",
        "explanation": "Recurrent Neural Networks (RNNs) are designed to handle sequential data, making them ideal for speech recognition tasks."
      },
      {
        "question": "Which AI model is commonly used for generating human-like text?",
        "choices": {
          "A": "GANs",
          "B": "Transformer Models",
          "C": "K-Means Clustering",
          "D": "Principal Component Analysis"
        },
        "answer": "B",
        "explanation": "Transformer models, like GPT, are widely used for generating human-like text in AI applications."
      },
      {
        "question": "Which AI paradigm focuses on reasoning with symbols and logical rules?",
        "choices": {
          "A": "Neural Networks",
          "B": "Symbolic AI",
          "C": "Evolutionary Algorithms",
          "D": "Reinforcement Learning"
        },
        "answer": "B",
        "explanation": "Symbolic AI is based on representing knowledge with symbols and rules, enabling logical reasoning."
      },
      {
        "question": "Which algorithm is commonly used for AI-powered recommendation systems?",
        "choices": {
          "A": "K-Means Clustering",
          "B": "Collaborative Filtering",
          "C": "Gradient Boosting",
          "D": "Linear Regression"
        },
        "answer": "B",
        "explanation": "Collaborative Filtering is widely used in recommendation systems to suggest items based on user preferences."
      },
      {
        "question": "What is the purpose of a loss function in machine learning?",
        "choices": {
          "A": "To measure the accuracy of the final model",
          "B": "To determine how well the model's predictions match the actual values",
          "C": "To increase the computational efficiency of training",
          "D": "To convert categorical data into numerical values"
        },
        "answer": "B",
        "explanation": "A loss function measures the difference between predicted values and actual values, guiding model optimization."
      },
      {
        "question": "Which AI subfield focuses on enabling machines to perceive and interpret visual information?",
        "choices": {
          "A": "Natural Language Processing",
          "B": "Computer Vision",
          "C": "Reinforcement Learning",
          "D": "Swarm Intelligence"
        },
        "answer": "B",
        "explanation": "Computer Vision allows machines to interpret and process visual information from the world."
      },
      {
        "question": "What does the 'bias' term represent in a machine learning model?",
        "choices": {
          "A": "The tendency of a model to overfit training data",
          "B": "A constant added to the model to shift predictions",
          "C": "The model's reliance on irrelevant features",
          "D": "The number of layers in a deep neural network"
        },
        "answer": "B",
        "explanation": "Bias is a constant term added to machine learning models to adjust predictions and improve accuracy."
      },
      {
        "question": "Which AI technique is used to generate synthetic images?",
        "choices": {
          "A": "Support Vector Machines",
          "B": "Decision Trees",
          "C": "Generative Adversarial Networks",
          "D": "K-Nearest Neighbors"
        },
        "answer": "C",
        "explanation": "Generative Adversarial Networks (GANs) are used to create synthetic images by training two competing neural networks."
      },
      {
        "question": "Which optimization algorithm is commonly used to train neural networks?",
        "choices": {
          "A": "Gradient Descent",
          "B": "K-Means Clustering",
          "C": "Apriori Algorithm",
          "D": "Naïve Bayes"
        },
        "answer": "A",
        "explanation": "Gradient Descent is a widely used optimization algorithm for training neural networks by minimizing the loss function."
      },
      {
        "question": "Which term describes an AI system that can learn from new experiences without human intervention?",
        "choices": {
          "A": "Static AI",
          "B": "Autonomous AI",
          "C": "Supervised Learning",
          "D": "Symbolic AI"
        },
        "answer": "B",
        "explanation": "Autonomous AI can learn and adapt to new experiences without human intervention, improving its performance over time."
      },
      {
        "question": "Which AI technique is used in fraud detection systems?",
        "choices": {
          "A": "K-Means Clustering",
          "B": "Anomaly Detection",
          "C": "Linear Regression",
          "D": "Apriori Algorithm"
        },
        "answer": "B",
        "explanation": "Anomaly Detection is used in fraud detection to identify unusual patterns that deviate from normal behavior."
      },
      {
        "question": "What is a key challenge in training AI models?",
        "choices": {
          "A": "Access to unlimited computational resources",
          "B": "Overfitting to the training data",
          "C": "Lack of pre-existing algorithms",
          "D": "AI models always perform optimally without tuning"
        },
        "answer": "B",
        "explanation": "Overfitting occurs when an AI model learns patterns too specifically from training data, reducing its performance on new data."
      },
      {
        "question": "Which AI model architecture is commonly used in chatbots?",
        "choices": {
          "A": "Decision Trees",
          "B": "Recurrent Neural Networks",
          "C": "Random Forest",
          "D": "Support Vector Machines"
        },
        "answer": "B",
        "explanation": "Recurrent Neural Networks (RNNs) are commonly used in chatbots to handle sequential data, such as conversations."
      },
      {
        "question": "Which AI method is used for real-time object detection in videos?",
        "choices": {
          "A": "YOLO (You Only Look Once)",
          "B": "Linear Regression",
          "C": "K-Means Clustering",
          "D": "Decision Trees"
        },
        "answer": "A",
        "explanation": "YOLO (You Only Look Once) is an AI model designed for real-time object detection in videos."
      },
      {
        "question": "Which deep learning architecture is primarily used for text generation?",
        "choices": {
          "A": "CNN",
          "B": "RNN",
          "C": "GAN",
          "D": "SVM"
        },
        "answer": "B",
        "explanation": "Recurrent Neural Networks (RNNs) and their variants, like LSTMs and Transformers, are commonly used for text generation."
      },
      {
        "question": "Which factor is crucial for the success of AI models?",
        "choices": {
          "A": "More computational power than needed",
          "B": "High-quality labeled data",
          "C": "Manual feature selection only",
          "D": "Avoiding any form of model evaluation"
        },
        "answer": "B",
        "explanation": "High-quality labeled data is essential for training AI models effectively and improving accuracy."
      },
      {
        "question": "Which type of AI model is used in voice assistants like Siri and Alexa?",
        "choices": {
          "A": "Decision Trees",
          "B": "Transformer Models",
          "C": "Support Vector Machines",
          "D": "Random Forests"
        },
        "answer": "B",
        "explanation": "Transformer models, such as GPT and BERT, are used in voice assistants to process and generate human-like responses."
      },
      {
        "question": "Which AI technique is used for image segmentation?",
        "choices": {
          "A": "K-Means Clustering",
          "B": "U-Net",
          "C": "Logistic Regression",
          "D": "Decision Trees"
        },
        "answer": "B",
        "explanation": "U-Net is a deep learning architecture specifically designed for image segmentation tasks."
      },
      {
        "question": "Which AI method is used in automatic speech recognition (ASR)?",
        "choices": {
          "A": "Convolutional Neural Networks",
          "B": "Hidden Markov Models",
          "C": "Principal Component Analysis",
          "D": "K-Means Clustering"
        },
        "answer": "B",
        "explanation": "Hidden Markov Models (HMMs) are commonly used in automatic speech recognition (ASR) systems."
      },
      {
        "question": "Which AI concept refers to the ability of a model to generalize well to unseen data?",
        "choices": {
          "A": "Overfitting",
          "B": "Underfitting",
          "C": "Generalization",
          "D": "Regularization"
        },
        "answer": "C",
        "explanation": "Generalization refers to an AI model's ability to perform well on unseen data by capturing the underlying patterns rather than memorizing training data."
      },
      {
        "question": "Which AI framework is widely used for deep learning applications?",
        "choices": {
          "A": "TensorFlow",
          "B": "Hadoop",
          "C": "SQL",
          "D": "Kafka"
        },
        "answer": "A",
        "explanation": "TensorFlow is a popular open-source AI framework widely used for deep learning applications."
      },
      {
        "question": "What is the purpose of dropout in neural networks?",
        "choices": {
          "A": "To reduce the size of the dataset",
          "B": "To randomly deactivate neurons during training",
          "C": "To increase the learning rate",
          "D": "To prevent model evaluation"
        },
        "answer": "B",
        "explanation": "Dropout is a regularization technique that deactivates random neurons during training to prevent overfitting."
      },
      {
        "question": "Which technique is used to fine-tune a pre-trained AI model?",
        "choices": {
          "A": "Transfer Learning",
          "B": "Feature Scaling",
          "C": "Data Augmentation",
          "D": "Clustering"
        },
        "answer": "A",
        "explanation": "Transfer Learning allows AI models to be fine-tuned for new tasks by leveraging knowledge from pre-trained models."
      },
      {
        "question": "Which AI approach is inspired by Darwin’s theory of evolution?",
        "choices": {
          "A": "Neural Networks",
          "B": "Genetic Algorithms",
          "C": "Support Vector Machines",
          "D": "Decision Trees"
        },
        "answer": "B",
        "explanation": "Genetic Algorithms are inspired by Darwin’s theory of evolution and use selection, mutation, and crossover to find optimal solutions."
      },
      {
        "question": "Which AI technique is used for detecting fake news?",
        "choices": {
          "A": "Natural Language Processing",
          "B": "Convolutional Neural Networks",
          "C": "K-Means Clustering",
          "D": "Apriori Algorithm"
        },
        "answer": "A",
        "explanation": "Natural Language Processing (NLP) techniques are used to analyze text and detect fake news by identifying misleading patterns."
      },
      {
        "question": "Which AI concept refers to an AI system explaining its decisions in a human-understandable way?",
        "choices": {
          "A": "Explainable AI (XAI)",
          "B": "Black Box AI",
          "C": "Reinforcement Learning",
          "D": "Data Imputation"
        },
        "answer": "A",
        "explanation": "Explainable AI (XAI) focuses on making AI models interpretable so humans can understand their decision-making process."
      },
      {
        "question": "Which neural network architecture is best suited for processing sequential data?",
        "choices": {
          "A": "Feedforward Neural Network",
          "B": "Recurrent Neural Network",
          "C": "Convolutional Neural Network",
          "D": "Decision Tree"
        },
        "answer": "B",
        "explanation": "Recurrent Neural Networks (RNNs) are designed for processing sequential data, such as time series and natural language."
      },
      {
        "question": "Which AI model is commonly used for autonomous robotics and decision-making?",
        "choices": {
          "A": "Deep Q-Network (DQN)",
          "B": "K-Means Clustering",
          "C": "Random Forest",
          "D": "Support Vector Machines"
        },
        "answer": "A",
        "explanation": "Deep Q-Networks (DQNs) are commonly used in reinforcement learning for decision-making in autonomous robotics."
      },
      {
        "question": "Which term describes an AI model that mimics human creativity to generate new content?",
        "choices": {
          "A": "Discriminative Model",
          "B": "Generative AI",
          "C": "Deterministic Algorithm",
          "D": "Gradient Descent"
        },
        "answer": "B",
        "explanation": "Generative AI refers to AI models that can create new content, such as images, text, and music, mimicking human creativity."
      }
    ]
}
];

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const AIQuizPage = ({ numQuestions, timeLimit }) => {
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

export default AIQuizPage;