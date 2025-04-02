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
    "question": "What is the chemical symbol for gold?",
    "answers": [
      { "text": "Au", "correct": true, "explanation": "Gold's symbol comes from the Latin word 'Aurum'." },
      { "text": "Ag", "correct": false, "explanation": "Ag is the symbol for silver." },
      { "text": "Pb", "correct": false, "explanation": "Pb is the symbol for lead." },
      { "text": "Fe", "correct": false, "explanation": "Fe is the symbol for iron." }
    ]
  },
  {
    "question": "What planet is known as the Red Planet?",
    "answers": [
      { "text": "Mars", "correct": true, "explanation": "Mars appears red due to iron oxide (rust) on its surface." },
      { "text": "Venus", "correct": false, "explanation": "Venus is known as Earth's sister planet." },
      { "text": "Jupiter", "correct": false, "explanation": "Jupiter is a gas giant." },
      { "text": "Saturn", "correct": false, "explanation": "Saturn is famous for its rings." }
    ]
  },
  {
    "question": "What gas do plants absorb from the atmosphere?",
    "answers": [
      { "text": "Oxygen", "correct": false, "explanation": "Plants release oxygen but absorb carbon dioxide." },
      { "text": "Nitrogen", "correct": false, "explanation": "Nitrogen is the most abundant gas but not absorbed by plants." },
      { "text": "Carbon dioxide", "correct": true, "explanation": "Plants use carbon dioxide for photosynthesis." },
      { "text": "Hydrogen", "correct": false, "explanation": "Hydrogen is not absorbed directly by plants." }
    ]
  },
  {
    "question": "What is the hardest natural substance on Earth?",
    "answers": [
      { "text": "Diamond", "correct": true, "explanation": "Diamond ranks highest on the Mohs hardness scale." },
      { "text": "Gold", "correct": false, "explanation": "Gold is a soft metal." },
      { "text": "Iron", "correct": false, "explanation": "Iron is strong but not the hardest." },
      { "text": "Quartz", "correct": false, "explanation": "Quartz is hard but not the hardest." }
    ]
  },
  {
    "question": "Which organ in the human body produces insulin?",
    "answers": [
      { "text": "Liver", "correct": false, "explanation": "The liver regulates glucose but does not produce insulin." },
      { "text": "Pancreas", "correct": true, "explanation": "The pancreas produces insulin to regulate blood sugar levels." },
      { "text": "Heart", "correct": false, "explanation": "The heart pumps blood but does not produce insulin." },
      { "text": "Kidneys", "correct": false, "explanation": "Kidneys filter blood but do not produce insulin." }
    ]
  },
  {
    "question": "What is the powerhouse of the cell?",
    "answers": [
      { "text": "Nucleus", "correct": false, "explanation": "The nucleus contains genetic material." },
      { "text": "Ribosome", "correct": false, "explanation": "Ribosomes synthesize proteins." },
      { "text": "Mitochondria", "correct": true, "explanation": "Mitochondria generate energy in the form of ATP." },
      { "text": "Golgi apparatus", "correct": false, "explanation": "The Golgi apparatus processes proteins." }
    ]
  },
  {
    "question": "Which element is needed for strong bones and teeth?",
    "answers": [
      { "text": "Iron", "correct": false, "explanation": "Iron is important for blood, not bones." },
      { "text": "Calcium", "correct": true, "explanation": "Calcium strengthens bones and teeth." },
      { "text": "Magnesium", "correct": false, "explanation": "Magnesium is essential but not the primary element for bones." },
      { "text": "Sodium", "correct": false, "explanation": "Sodium is important for nerve function, not bone strength." }
    ]
  },
  {
    "question": "What part of the plant is responsible for photosynthesis?",
    "answers": [
      { "text": "Roots", "correct": false, "explanation": "Roots absorb water but do not perform photosynthesis." },
      { "text": "Stem", "correct": false, "explanation": "The stem supports the plant but does not perform photosynthesis." },
      { "text": "Leaves", "correct": true, "explanation": "Leaves contain chlorophyll for photosynthesis." },
      { "text": "Flowers", "correct": false, "explanation": "Flowers are for reproduction, not photosynthesis." }
    ]
  },
  {
    "question": "Which planet has the most moons?",
    "answers": [
      { "text": "Mars", "correct": false, "explanation": "Mars has only two moons: Phobos and Deimos." },
      { "text": "Jupiter", "correct": false, "explanation": "Jupiter has many moons but not the most." },
      { "text": "Saturn", "correct": true, "explanation": "Saturn has the most confirmed moons." },
      { "text": "Uranus", "correct": false, "explanation": "Uranus has moons but fewer than Saturn." }
    ]
  },
  {
    "question": "What is the chemical formula for table salt?",
    "answers": [
      { "text": "NaCl", "correct": true, "explanation": "Table salt consists of sodium (Na) and chloride (Cl)." },
      { "text": "KCl", "correct": false, "explanation": "KCl is potassium chloride." },
      { "text": "NaOH", "correct": false, "explanation": "NaOH is sodium hydroxide, a strong base." },
      { "text": "HCl", "correct": false, "explanation": "HCl is hydrochloric acid." }
    ]
  },
      
      {
        "question": "What is the chemical symbol for gold?",
        "answers": [
          { "text": "Au", "correct": true, "explanation": "Gold's symbol comes from the Latin word 'Aurum'." },
          { "text": "Ag", "correct": false, "explanation": "Ag is the symbol for silver." },
          { "text": "Pb", "correct": false, "explanation": "Pb is the symbol for lead." },
          { "text": "Fe", "correct": false, "explanation": "Fe is the symbol for iron." }
        ]
      },
      {
        "question": "What planet is known as the Red Planet?",
        "answers": [
          { "text": "Mars", "correct": true, "explanation": "Mars appears red due to iron oxide (rust) on its surface." },
          { "text": "Venus", "correct": false, "explanation": "Venus is often called Earth's sister planet but is not red." },
          { "text": "Jupiter", "correct": false, "explanation": "Jupiter is a gas giant with a Great Red Spot but is not the Red Planet." },
          { "text": "Saturn", "correct": false, "explanation": "Saturn is famous for its rings, not its color." }
        ]
      },
      {
        "question": "What gas do plants absorb from the atmosphere during photosynthesis?",
        "answers": [
          { "text": "Carbon dioxide", "correct": true, "explanation": "Plants use carbon dioxide (CO₂) to produce oxygen and glucose through photosynthesis." },
          { "text": "Oxygen", "correct": false, "explanation": "Oxygen is released as a byproduct of photosynthesis." },
          { "text": "Nitrogen", "correct": false, "explanation": "Nitrogen is essential for plants but is absorbed through soil, not photosynthesis." },
          { "text": "Hydrogen", "correct": false, "explanation": "Hydrogen is not directly absorbed from the atmosphere for photosynthesis." }
        ]
      },
      {
        "question": "What is the largest organ in the human body?",
        "answers": [
          { "text": "Skin", "correct": true, "explanation": "The skin is the body's largest organ, protecting internal structures." },
          { "text": "Liver", "correct": false, "explanation": "The liver is the largest internal organ, but not overall." },
          { "text": "Heart", "correct": false, "explanation": "The heart is a crucial organ but not the largest." },
          { "text": "Lungs", "correct": false, "explanation": "The lungs are large but not as extensive as the skin." }
        ]
      },
      {
        "question": "What is the powerhouse of the cell?",
        "answers": [
          { "text": "Mitochondria", "correct": true, "explanation": "Mitochondria generate ATP, the cell's energy source." },
          { "text": "Nucleus", "correct": false, "explanation": "The nucleus stores genetic material but does not generate energy." },
          { "text": "Ribosome", "correct": false, "explanation": "Ribosomes synthesize proteins, not energy." },
          { "text": "Golgi apparatus", "correct": false, "explanation": "The Golgi apparatus packages proteins, but does not produce energy." }
        ]
      },
      {
        "question": "What force keeps planets in orbit around the sun?",
        "answers": [
          { "text": "Gravity", "correct": true, "explanation": "Gravity is the force that attracts planets toward the sun and keeps them in orbit." },
          { "text": "Magnetism", "correct": false, "explanation": "Magnetism does not influence planetary orbits." },
          { "text": "Friction", "correct": false, "explanation": "Friction does not act in space as it does on Earth." },
          { "text": "Centripetal force", "correct": false, "explanation": "Centripetal force plays a role, but gravity is the fundamental force." }
        ]
      },
      {
        "question": "Which part of the atom has no electric charge?",
        "answers": [
          { "text": "Neutron", "correct": true, "explanation": "Neutrons are neutral particles found in the atomic nucleus." },
          { "text": "Proton", "correct": false, "explanation": "Protons have a positive charge." },
          { "text": "Electron", "correct": false, "explanation": "Electrons have a negative charge." },
          { "text": "Nucleus", "correct": false, "explanation": "The nucleus contains both protons and neutrons." }
        ]
      },
      {
        "question": "What is the most abundant gas in Earth's atmosphere?",
        "answers": [
          { "text": "Nitrogen", "correct": true, "explanation": "Nitrogen makes up about 78% of Earth's atmosphere." },
          { "text": "Oxygen", "correct": false, "explanation": "Oxygen comprises about 21% of Earth's atmosphere." },
          { "text": "Carbon dioxide", "correct": false, "explanation": "Carbon dioxide is only about 0.04% of Earth's atmosphere." },
          { "text": "Argon", "correct": false, "explanation": "Argon is the third most abundant gas at 0.93%." }
        ]
      },
      {
        "question": "Which planet has the most extensive ring system?",
        "answers": [
          { "text": "Saturn", "correct": true, "explanation": "Saturn has the most prominent and extensive ring system in our solar system." },
          { "text": "Jupiter", "correct": false, "explanation": "Jupiter has rings, but they are faint compared to Saturn's." },
          { "text": "Uranus", "correct": false, "explanation": "Uranus has rings, but they are much fainter than Saturn's." },
          { "text": "Neptune", "correct": false, "explanation": "Neptune also has rings, but they are not as visible as Saturn's." }
        ]
      },
      {
        "question": "What is the chemical formula for water?",
        "answers": [
          { "text": "H₂O", "correct": true, "explanation": "Water consists of two hydrogen atoms and one oxygen atom." },
          { "text": "CO₂", "correct": false, "explanation": "CO₂ is the chemical formula for carbon dioxide." },
          { "text": "O₂", "correct": false, "explanation": "O₂ represents molecular oxygen, not water." },
          { "text": "H₂SO₄", "correct": false, "explanation": "H₂SO₄ is the chemical formula for sulfuric acid." }
        ]
      },
      {
        "question": "What is the hardest naturally occurring mineral on Earth?",
        "answers": [
          { "text": "Diamond", "correct": true, "explanation": "Diamond ranks highest on the Mohs hardness scale." },
          { "text": "Quartz", "correct": false, "explanation": "Quartz is hard but not the hardest." },
          { "text": "Gold", "correct": false, "explanation": "Gold is soft and malleable, not hard." },
          { "text": "Topaz", "correct": false, "explanation": "Topaz is hard but still softer than diamond." }
        ]
      },
      {
        "question": "Which part of the human brain controls balance and coordination?",
        "answers": [
          { "text": "Cerebellum", "correct": true, "explanation": "The cerebellum helps coordinate movement and maintain balance." },
          { "text": "Cerebrum", "correct": false, "explanation": "The cerebrum controls voluntary actions and thinking." },
          { "text": "Medulla", "correct": false, "explanation": "The medulla controls involuntary functions like breathing." },
          { "text": "Hypothalamus", "correct": false, "explanation": "The hypothalamus regulates hormones and body temperature." }
        ]
      },
      {
        "question": "Which gas is responsible for the greenhouse effect?",
        "answers": [
          { "text": "Carbon dioxide", "correct": true, "explanation": "CO₂ traps heat in the Earth's atmosphere, contributing to global warming." },
          { "text": "Oxygen", "correct": false, "explanation": "Oxygen is vital for respiration but does not cause the greenhouse effect." },
          { "text": "Nitrogen", "correct": false, "explanation": "Nitrogen makes up most of the atmosphere but does not trap heat." },
          { "text": "Helium", "correct": false, "explanation": "Helium is an inert gas that does not contribute to the greenhouse effect." }
        ]
      },
      {
        "question": "What type of energy is stored in food?",
        "answers": [
          { "text": "Chemical energy", "correct": true, "explanation": "Food stores chemical energy, which the body converts into usable energy." },
          { "text": "Kinetic energy", "correct": false, "explanation": "Kinetic energy is energy of motion, not stored in food." },
          { "text": "Thermal energy", "correct": false, "explanation": "Thermal energy is related to heat, not the storage of food energy." },
          { "text": "Electrical energy", "correct": false, "explanation": "Electrical energy is used in circuits, not stored in food." }
        ]
      },
      {
        "question": "Which planet rotates on its side, unlike the others?",
        "answers": [
          { "text": "Uranus", "correct": true, "explanation": "Uranus has a unique tilt of about 98 degrees, causing it to rotate on its side." },
          { "text": "Neptune", "correct": false, "explanation": "Neptune is tilted but does not rotate on its side." },
          { "text": "Mars", "correct": false, "explanation": "Mars has a similar axial tilt to Earth." },
          { "text": "Venus", "correct": false, "explanation": "Venus rotates in the opposite direction but not on its side." }
        ]
      },
      {
        "question": "What is the boiling point of water at sea level?",
        "answers": [
          { "text": "100°C", "correct": true, "explanation": "Water boils at 100°C (212°F) at sea level." },
          { "text": "50°C", "correct": false, "explanation": "50°C is much lower than the boiling point of water." },
          { "text": "150°C", "correct": false, "explanation": "150°C is too high for the boiling point of water." },
          { "text": "90°C", "correct": false, "explanation": "Water boils at 100°C at sea level, not 90°C." }
        ]
      },
      {
        "question": "Which vitamin is produced by the body when exposed to sunlight?",
        "answers": [
          { "text": "Vitamin D", "correct": true, "explanation": "The skin produces Vitamin D when exposed to UV rays from the sun." },
          { "text": "Vitamin C", "correct": false, "explanation": "Vitamin C must be obtained from food, not sunlight." },
          { "text": "Vitamin A", "correct": false, "explanation": "Vitamin A comes from food sources like carrots and liver." },
          { "text": "Vitamin B12", "correct": false, "explanation": "Vitamin B12 is found in animal products, not produced by sunlight." }
        ]
      },
      {
        "question": "What is the most abundant element in the universe?",
        "answers": [
          { "text": "Hydrogen", "correct": true, "explanation": "Hydrogen makes up about 75% of the universe's elemental mass." },
          { "text": "Oxygen", "correct": false, "explanation": "Oxygen is abundant but not the most abundant element." },
          { "text": "Carbon", "correct": false, "explanation": "Carbon is essential for life but is not the most abundant element." },
          { "text": "Helium", "correct": false, "explanation": "Helium is the second most abundant element after hydrogen." }
        ]
      },
      {
        "question": "What is the process by which plants lose water through their leaves?",
        "answers": [
          { "text": "Transpiration", "correct": true, "explanation": "Transpiration is the loss of water vapor from plant leaves." },
          { "text": "Photosynthesis", "correct": false, "explanation": "Photosynthesis is how plants produce energy, not water loss." },
          { "text": "Respiration", "correct": false, "explanation": "Respiration is the process of converting glucose into energy." },
          { "text": "Condensation", "correct": false, "explanation": "Condensation is when water vapor turns into liquid, not when plants lose water." }
        ]
      },
      {
        "question": "What part of the eye controls the amount of light entering?",
        "answers": [
          { "text": "Iris", "correct": true, "explanation": "The iris adjusts the pupil's size to control the amount of light entering the eye." },
          { "text": "Pupil", "correct": false, "explanation": "The pupil is the opening, but the iris controls its size." },
          { "text": "Cornea", "correct": false, "explanation": "The cornea focuses light but does not control its entry." },
          { "text": "Retina", "correct": false, "explanation": "The retina detects light but does not regulate its entry." }
        ]
      },
      {
        "question": "Which blood type is known as the universal donor?",
        "answers": [
          { "text": "O-", "correct": true, "explanation": "O-negative blood can be given to any blood type because it lacks A, B, and Rh antigens." },
          { "text": "A+", "correct": false, "explanation": "A+ blood can only be donated to specific blood types." },
          { "text": "B-", "correct": false, "explanation": "B- blood is not universal as it contains B antigens." },
          { "text": "AB+", "correct": false, "explanation": "AB+ is the universal recipient, not the universal donor." }
        ]
      },
      {
        "question": "What is the smallest unit of matter?",
        "answers": [
          { "text": "Atom", "correct": true, "explanation": "Atoms are the fundamental building blocks of all matter." },
          { "text": "Molecule", "correct": false, "explanation": "Molecules are composed of multiple atoms." },
          { "text": "Electron", "correct": false, "explanation": "Electrons are subatomic particles, not complete units of matter." },
          { "text": "Cell", "correct": false, "explanation": "Cells are the smallest unit of life, not matter." }
        ]
      },
      {
        "question": "Which organ in the human body produces insulin?",
        "answers": [
          { "text": "Pancreas", "correct": true, "explanation": "The pancreas produces insulin to regulate blood sugar levels." },
          { "text": "Liver", "correct": false, "explanation": "The liver stores glucose but does not produce insulin." },
          { "text": "Kidney", "correct": false, "explanation": "The kidney filters blood but does not produce insulin." },
          { "text": "Heart", "correct": false, "explanation": "The heart pumps blood but does not produce insulin." }
        ]
      },
      {
        "question": "What gas do humans exhale?",
        "answers": [
          { "text": "Carbon dioxide", "correct": true, "explanation": "Humans exhale CO₂ as a waste product of respiration." },
          { "text": "Oxygen", "correct": false, "explanation": "Oxygen is inhaled, not exhaled." },
          { "text": "Hydrogen", "correct": false, "explanation": "Hydrogen is not a significant component of exhaled air." },
          { "text": "Nitrogen", "correct": false, "explanation": "Nitrogen is present in air but is not a metabolic waste gas." }
        ]
      },
      {
        "question": "Which planet has the highest surface temperature in the solar system?",
        "answers": [
          { "text": "Venus", "correct": true, "explanation": "Venus has a thick CO₂ atmosphere that traps heat, making it the hottest planet." },
          { "text": "Mercury", "correct": false, "explanation": "Mercury is closest to the Sun but lacks an atmosphere to retain heat." },
          { "text": "Jupiter", "correct": false, "explanation": "Jupiter is a gas giant and does not have a solid surface." },
          { "text": "Mars", "correct": false, "explanation": "Mars is cold due to its thin atmosphere." }
        ]
      },
      {
        "question": "What type of rock is formed from cooled lava?",
        "answers": [
          { "text": "Igneous rock", "correct": true, "explanation": "Igneous rocks form when molten lava cools and solidifies." },
          { "text": "Sedimentary rock", "correct": false, "explanation": "Sedimentary rocks form from compressed sediments." },
          { "text": "Metamorphic rock", "correct": false, "explanation": "Metamorphic rocks form under heat and pressure, not from lava cooling." },
          { "text": "Fossil rock", "correct": false, "explanation": "Fossils are found in sedimentary rocks, not igneous rocks." }
        ]
      },
      {
        "question": "What is the main function of red blood cells?",
        "answers": [
          { "text": "Transport oxygen", "correct": true, "explanation": "Red blood cells contain hemoglobin, which carries oxygen to tissues." },
          { "text": "Fight infections", "correct": false, "explanation": "White blood cells fight infections." },
          { "text": "Digest food", "correct": false, "explanation": "Digestion is done by the stomach and intestines." },
          { "text": "Filter blood", "correct": false, "explanation": "The kidneys filter blood, not red blood cells." }
        ]
      },
      {
        "question": "What is the Earth's core primarily made of?",
        "answers": [
          { "text": "Iron and nickel", "correct": true, "explanation": "The Earth's core consists mainly of iron and nickel." },
          { "text": "Gold and silver", "correct": false, "explanation": "Gold and silver are rare in Earth's core." },
          { "text": "Carbon and oxygen", "correct": false, "explanation": "Carbon and oxygen are not the primary elements in the core." },
          { "text": "Silicon and magnesium", "correct": false, "explanation": "Silicon and magnesium are found in the Earth's crust, not the core." }
        ]
      },
      {
        "question": "Which gas do fire extinguishers often contain to put out fires?",
        "answers": [
          { "text": "Carbon dioxide", "correct": true, "explanation": "CO₂ displaces oxygen and cools flames to put out fires." },
          { "text": "Oxygen", "correct": false, "explanation": "Oxygen fuels fire rather than extinguishing it." },
          { "text": "Helium", "correct": false, "explanation": "Helium is an inert gas but is not used in fire extinguishers." },
          { "text": "Hydrogen", "correct": false, "explanation": "Hydrogen is highly flammable and would worsen a fire." }
        ]
      },
      {
        "question": "What is the main function of the human lungs?",
        "answers": [
          { "text": "Gas exchange", "correct": true, "explanation": "The lungs facilitate oxygen intake and carbon dioxide removal." },
          { "text": "Pump blood", "correct": false, "explanation": "The heart pumps blood, not the lungs." },
          { "text": "Digest food", "correct": false, "explanation": "Digestion occurs in the stomach and intestines." },
          { "text": "Produce red blood cells", "correct": false, "explanation": "Red blood cells are produced in bone marrow, not the lungs." }
        ]
      }
];

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const ScienceQuizPage = () => {
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

export default ScienceQuizPage;