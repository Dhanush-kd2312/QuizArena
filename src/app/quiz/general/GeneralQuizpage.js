'use client'
import { useState, useRef,useEffect } from 'react';
import { FaQuestionCircle, FaCertificate, FaFire } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../../../../components/navbar';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


const allQuestions = [
  {
    "question": "Which country is known as the Land of the Pharaohs?",
    "answers": [
      { "text": "Egypt", "correct": true, "explanation": "Egypt is called the Land of the Pharaohs due to its ancient civilization and rulers." },
      { "text": "Greece", "correct": false, "explanation": "Greece is known for its philosophers and mythology, not pharaohs." },
      { "text": "Italy", "correct": false, "explanation": "Italy is famous for the Roman Empire, not pharaohs." },
      { "text": "China", "correct": false, "explanation": "China is known for its dynasties, not pharaohs." }
    ]
  },
  {
    "question": "Which ocean is the largest by surface area?",
    "answers": [
      { "text": "Pacific Ocean", "correct": true, "explanation": "The Pacific Ocean is the largest ocean, covering about 63 million square miles." },
      { "text": "Atlantic Ocean", "correct": false, "explanation": "The Atlantic Ocean is the second-largest." },
      { "text": "Indian Ocean", "correct": false, "explanation": "The Indian Ocean is smaller than the Pacific and Atlantic." },
      { "text": "Arctic Ocean", "correct": false, "explanation": "The Arctic Ocean is the smallest of the major oceans." }
    ]
  },
  {
    "question": "Which scientist discovered penicillin?",
    "answers": [
      { "text": "Alexander Fleming", "correct": true, "explanation": "Fleming discovered penicillin in 1928, revolutionizing medicine." },
      { "text": "Louis Pasteur", "correct": false, "explanation": "Pasteur developed vaccines but did not discover penicillin." },
      { "text": "Marie Curie", "correct": false, "explanation": "Curie discovered radium and polonium, not penicillin." },
      { "text": "Jonas Salk", "correct": false, "explanation": "Salk developed the polio vaccine, not penicillin." }
    ]
  },
  {
    "question": "What is the longest river in the world?",
    "answers": [
      { "text": "Nile River", "correct": true, "explanation": "The Nile River is the longest river in the world, stretching about 6,650 km." },
      { "text": "Amazon River", "correct": false, "explanation": "The Amazon is the largest by volume but not the longest." },
      { "text": "Mississippi River", "correct": false, "explanation": "The Mississippi is long but not the longest in the world." },
      { "text": "Yangtze River", "correct": false, "explanation": "The Yangtze is the longest river in Asia but not the world." }
    ]
  },
  {
    "question": "Which planet has the most extensive ring system?",
    "answers": [
      { "text": "Saturn", "correct": true, "explanation": "Saturn has the most extensive and visible ring system in the solar system." },
      { "text": "Jupiter", "correct": false, "explanation": "Jupiter has rings, but they are faint and not as prominent as Saturn’s." },
      { "text": "Neptune", "correct": false, "explanation": "Neptune has rings, but they are much fainter than Saturn’s." },
      { "text": "Uranus", "correct": false, "explanation": "Uranus has rings, but they are not as extensive as Saturn’s." }
    ]
  },
  {
    "question": "What is the capital of France?",
    "answers": [
      { "text": "Paris", "correct": true, "explanation": "Paris is the capital and largest city of France." },
      { "text": "Rome", "correct": false, "explanation": "Rome is the capital of Italy, not France." },
      { "text": "Madrid", "correct": false, "explanation": "Madrid is the capital of Spain, not France." },
      { "text": "Berlin", "correct": false, "explanation": "Berlin is the capital of Germany, not France." }
    ]
  },
  {
    "question": "Which gas do plants use for photosynthesis?",
    "answers": [
      { "text": "Carbon dioxide", "correct": true, "explanation": "Plants use carbon dioxide during photosynthesis to produce oxygen and glucose." },
      { "text": "Oxygen", "correct": false, "explanation": "Oxygen is released as a byproduct, not used in photosynthesis." },
      { "text": "Nitrogen", "correct": false, "explanation": "Nitrogen is essential for plant growth but not used in photosynthesis." },
      { "text": "Helium", "correct": false, "explanation": "Helium is an inert gas and has no role in photosynthesis." }
    ]
  },
  {
    "question": "Which city is known as the Big Apple?",
    "answers": [
      { "text": "New York City", "correct": true, "explanation": "New York City is popularly known as the Big Apple." },
      { "text": "Los Angeles", "correct": false, "explanation": "Los Angeles is known as the City of Angels, not the Big Apple." },
      { "text": "Chicago", "correct": false, "explanation": "Chicago is known as the Windy City, not the Big Apple." },
      { "text": "San Francisco", "correct": false, "explanation": "San Francisco is famous for the Golden Gate Bridge, not the Big Apple." }
    ]
  },
  {
    "question": "Which country invented paper?",
    "answers": [
      { "text": "China", "correct": true, "explanation": "Paper was first invented in China during the Han Dynasty." },
      { "text": "Egypt", "correct": false, "explanation": "Egyptians used papyrus, but modern paper was invented in China." },
      { "text": "Greece", "correct": false, "explanation": "Greece made many scientific contributions, but not paper." },
      { "text": "India", "correct": false, "explanation": "India made advances in mathematics but did not invent paper." }
    ]
  },
  {
    "question": "Which is the smallest planet in our solar system?",
    "answers": [
      { "text": "Mercury", "correct": true, "explanation": "Mercury is the smallest planet in our solar system." },
      { "text": "Pluto", "correct": false, "explanation": "Pluto is now classified as a dwarf planet." },
      { "text": "Mars", "correct": false, "explanation": "Mars is larger than Mercury." },
      { "text": "Venus", "correct": false, "explanation": "Venus is larger than Mercury." }
    ]
  },
  {
    "question": "Which scientist is known for developing the theory of evolution?",
    "answers": [
      { "text": "Charles Darwin", "correct": true, "explanation": "Darwin proposed the theory of natural selection in his book 'On the Origin of Species'." },
      { "text": "Gregor Mendel", "correct": false, "explanation": "Mendel is known for his work on genetics." },
      { "text": "Isaac Newton", "correct": false, "explanation": "Newton is famous for his laws of motion and gravity." },
      { "text": "Albert Einstein", "correct": false, "explanation": "Einstein developed the theory of relativity, not evolution." }
    ]
  },
  {
    "question": "Which planet in our solar system has the most moons?",
    "answers": [
      { "text": "Saturn", "correct": true, "explanation": "Saturn has the most confirmed moons, surpassing Jupiter." },
      { "text": "Jupiter", "correct": false, "explanation": "Jupiter has many moons, but Saturn has more." },
      { "text": "Mars", "correct": false, "explanation": "Mars has only two moons, Phobos and Deimos." },
      { "text": "Neptune", "correct": false, "explanation": "Neptune has a few moons, but far fewer than Saturn or Jupiter." }
    ]
  },
  {
    "question": "Which blood type is considered the universal donor?",
    "answers": [
      { "text": "O negative", "correct": true, "explanation": "O negative blood can be transfused to any blood type." },
      { "text": "AB positive", "correct": false, "explanation": "AB positive is the universal recipient, not donor." },
      { "text": "A positive", "correct": false, "explanation": "A positive can only donate to A and AB groups." },
      { "text": "B negative", "correct": false, "explanation": "B negative is not a universal donor." }
    ]
  },
  {
    "question": "Who painted the Mona Lisa?",
    "answers": [
      { "text": "Leonardo da Vinci", "correct": true, "explanation": "The Mona Lisa is one of Leonardo da Vinci's most famous works." },
      { "text": "Vincent van Gogh", "correct": false, "explanation": "Van Gogh painted 'Starry Night'." },
      { "text": "Pablo Picasso", "correct": false, "explanation": "Picasso is known for cubism, not the Mona Lisa." },
      { "text": "Michelangelo", "correct": false, "explanation": "Michelangelo was a sculptor and painter but did not create the Mona Lisa." }
    ]
  },
  {
    "question": "What is the capital of Japan?",
    "answers": [
      { "text": "Tokyo", "correct": true, "explanation": "Tokyo is the capital and largest city of Japan." },
      { "text": "Kyoto", "correct": false, "explanation": "Kyoto was the former capital of Japan." },
      { "text": "Osaka", "correct": false, "explanation": "Osaka is a major city but not the capital." },
      { "text": "Hiroshima", "correct": false, "explanation": "Hiroshima is known for its history but is not the capital." }
    ]
  },
  {
    "question": "What is the largest bone in the human body?",
    "answers": [
      { "text": "Femur", "correct": true, "explanation": "The femur, or thigh bone, is the longest and strongest bone in the human body." },
      { "text": "Humerus", "correct": false, "explanation": "The humerus is in the arm and is not the largest." },
      { "text": "Tibia", "correct": false, "explanation": "The tibia is a large leg bone but smaller than the femur." },
      { "text": "Spine", "correct": false, "explanation": "The spine is made of multiple vertebrae, not a single bone." }
    ]
  },
  {
    "question": "Which element is represented by the symbol 'O' on the periodic table?",
    "answers": [
      { "text": "Oxygen", "correct": true, "explanation": "The symbol 'O' represents oxygen, essential for life." },
      { "text": "Osmium", "correct": false, "explanation": "Osmium's symbol is 'Os'." },
      { "text": "Oganesson", "correct": false, "explanation": "Oganesson is a synthetic element with the symbol 'Og'." },
      { "text": "Gold", "correct": false, "explanation": "Gold's chemical symbol is 'Au'." }
    ]
  },
  {
    "question": "What is the smallest unit of life?",
    "answers": [
      { "text": "Cell", "correct": true, "explanation": "The cell is the basic structural and functional unit of life." },
      { "text": "Atom", "correct": false, "explanation": "Atoms make up molecules, but they are not alive." },
      { "text": "Molecule", "correct": false, "explanation": "Molecules form cells, but they are not the smallest unit of life." },
      { "text": "Organ", "correct": false, "explanation": "Organs are composed of many cells." }
    ]
  },
  {
    "question": "Which continent is known as the Land of the Rising Sun?",
    "answers": [
      { "text": "Asia", "correct": true, "explanation": "Japan, in Asia, is called the Land of the Rising Sun." },
      { "text": "Europe", "correct": false, "explanation": "Europe is not known by this title." },
      { "text": "Australia", "correct": false, "explanation": "Australia is a continent but not associated with this name." },
      { "text": "South America", "correct": false, "explanation": "South America has no relation to this title." }
    ]
  },
  {
    "question": "Which gas makes up the majority of Earth's atmosphere?",
    "answers": [
      { "text": "Nitrogen", "correct": true, "explanation": "Nitrogen makes up about 78% of Earth's atmosphere." },
      { "text": "Oxygen", "correct": false, "explanation": "Oxygen is essential but only makes up about 21% of the atmosphere." },
      { "text": "Carbon dioxide", "correct": false, "explanation": "Carbon dioxide is a trace gas in the atmosphere." },
      { "text": "Argon", "correct": false, "explanation": "Argon makes up about 0.93% of the atmosphere." }
    ]
  },
  {
    "question": "Which instrument is used to measure atmospheric pressure?",
    "answers": [
      { "text": "Barometer", "correct": true, "explanation": "A barometer is used to measure atmospheric pressure." },
      { "text": "Thermometer", "correct": false, "explanation": "A thermometer measures temperature, not pressure." },
      { "text": "Hygrometer", "correct": false, "explanation": "A hygrometer measures humidity, not pressure." },
      { "text": "Anemometer", "correct": false, "explanation": "An anemometer measures wind speed, not pressure." }
    ]
  },
  {
    "question": "What is the chemical formula for water?",
    "answers": [
      { "text": "H₂O", "correct": true, "explanation": "Water consists of two hydrogen atoms and one oxygen atom." },
      { "text": "CO₂", "correct": false, "explanation": "CO₂ is carbon dioxide, not water." },
      { "text": "O₂", "correct": false, "explanation": "O₂ represents oxygen gas, not water." },
      { "text": "H₂O₂", "correct": false, "explanation": "H₂O₂ is hydrogen peroxide, not water." }
    ]
  },
  {
    "question": "Which continent has the most countries?",
    "answers": [
      { "text": "Africa", "correct": true, "explanation": "Africa has 54 recognized countries, the most of any continent." },
      { "text": "Asia", "correct": false, "explanation": "Asia has fewer countries than Africa." },
      { "text": "Europe", "correct": false, "explanation": "Europe has fewer countries than Africa." },
      { "text": "South America", "correct": false, "explanation": "South America has only 12 countries." }
    ]
  },
  {
    "question": "What is the hardest natural substance on Earth?",
    "answers": [
      { "text": "Diamond", "correct": true, "explanation": "Diamond is the hardest naturally occurring material." },
      { "text": "Gold", "correct": false, "explanation": "Gold is soft compared to diamond." },
      { "text": "Iron", "correct": false, "explanation": "Iron is strong but not the hardest natural material." },
      { "text": "Granite", "correct": false, "explanation": "Granite is hard, but not as hard as diamond." }
    ]
  },
  {
    "question": "What is the capital of Canada?",
    "answers": [
      { "text": "Ottawa", "correct": true, "explanation": "Ottawa is the capital city of Canada." },
      { "text": "Toronto", "correct": false, "explanation": "Toronto is the largest city, but not the capital." },
      { "text": "Vancouver", "correct": false, "explanation": "Vancouver is a major city but not the capital." },
      { "text": "Montreal", "correct": false, "explanation": "Montreal is the second-largest city in Canada but not the capital." }
    ]
  },
  {
    "question": "Which element has the atomic number 1?",
    "answers": [
      { "text": "Hydrogen", "correct": true, "explanation": "Hydrogen is the first element on the periodic table with atomic number 1." },
      { "text": "Oxygen", "correct": false, "explanation": "Oxygen has an atomic number of 8." },
      { "text": "Helium", "correct": false, "explanation": "Helium has an atomic number of 2." },
      { "text": "Carbon", "correct": false, "explanation": "Carbon has an atomic number of 6." }
    ]
  },
  {
    "question": "Which is the largest mammal in the world?",
    "answers": [
      { "text": "Blue whale", "correct": true, "explanation": "The blue whale is the largest mammal on Earth." },
      { "text": "Elephant", "correct": false, "explanation": "Elephants are the largest land mammals, but blue whales are larger." },
      { "text": "Giraffe", "correct": false, "explanation": "Giraffes are the tallest land animals but not the largest mammals." },
      { "text": "Hippopotamus", "correct": false, "explanation": "Hippos are large but much smaller than blue whales." }
    ]
  },
  {
    "question": "Which language has the most native speakers?",
    "answers": [
      { "text": "Mandarin Chinese", "correct": true, "explanation": "Mandarin Chinese has the highest number of native speakers in the world." },
      { "text": "English", "correct": false, "explanation": "English has fewer native speakers than Mandarin but is widely spoken globally." },
      { "text": "Spanish", "correct": false, "explanation": "Spanish is widely spoken but has fewer native speakers than Mandarin." },
      { "text": "Hindi", "correct": false, "explanation": "Hindi is widely spoken but not as much as Mandarin." }
    ]
  },
  {
    "question": "What is the largest organ in the human body?",
    "answers": [
      { "text": "Skin", "correct": true, "explanation": "The skin is the largest organ, covering the entire body." },
      { "text": "Liver", "correct": false, "explanation": "The liver is the largest internal organ but not the largest overall." },
      { "text": "Heart", "correct": false, "explanation": "The heart is essential but much smaller than the skin." },
      { "text": "Lungs", "correct": false, "explanation": "The lungs are large but smaller than the skin." }
    ]
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "answers": [
      { "text": "Mars", "correct": true, "explanation": "Mars is called the Red Planet because of its reddish appearance due to iron oxide." },
      { "text": "Venus", "correct": false, "explanation": "Venus has a thick atmosphere but is not red." },
      { "text": "Jupiter", "correct": false, "explanation": "Jupiter is a gas giant, not red." },
      { "text": "Mercury", "correct": false, "explanation": "Mercury is gray, not red." }
    ]
  },
  {
    "question": "Who wrote the play 'Romeo and Juliet'?",
    "answers": [
      { "text": "William Shakespeare", "correct": true, "explanation": "Shakespeare wrote 'Romeo and Juliet' in the 16th century." },
      { "text": "Charles Dickens", "correct": false, "explanation": "Dickens was a novelist, not a playwright." },
      { "text": "Jane Austen", "correct": false, "explanation": "Austen wrote novels, not plays." },
      { "text": "Mark Twain", "correct": false, "explanation": "Twain was known for novels like 'The Adventures of Huckleberry Finn'." }
    ]
  },
  {
    "question": "Which metal is liquid at room temperature?",
    "answers": [
      { "text": "Mercury", "correct": true, "explanation": "Mercury is the only metal that remains liquid at room temperature." },
      { "text": "Gold", "correct": false, "explanation": "Gold is a solid metal at room temperature." },
      { "text": "Aluminum", "correct": false, "explanation": "Aluminum is solid at room temperature." },
      { "text": "Lead", "correct": false, "explanation": "Lead is also solid at room temperature." }
    ]
  },
  {
    "question": "Which is the longest mountain range in the world?",
    "answers": [
      { "text": "Andes", "correct": true, "explanation": "The Andes mountain range is the longest, stretching along South America." },
      { "text": "Himalayas", "correct": false, "explanation": "The Himalayas are high but not the longest." },
      { "text": "Rocky Mountains", "correct": false, "explanation": "The Rockies are long but shorter than the Andes." },
      { "text": "Alps", "correct": false, "explanation": "The Alps are a major range but not the longest." }
    ]
  },
  {
    "question": "What is the main ingredient in guacamole?",
    "answers": [
      { "text": "Avocado", "correct": true, "explanation": "Guacamole is primarily made from mashed avocado." },
      { "text": "Tomato", "correct": false, "explanation": "Tomato is an ingredient but not the main one." },
      { "text": "Onion", "correct": false, "explanation": "Onion is often included, but it's not the main ingredient." },
      { "text": "Garlic", "correct": false, "explanation": "Garlic is sometimes used, but it's not the base of guacamole." }
    ]
  },
  {
    "question": "Which is the largest desert in the world?",
    "answers": [
      { "text": "Antarctic Desert", "correct": true, "explanation": "The Antarctic Desert is the largest by area, covering about 14 million square km." },
      { "text": "Sahara Desert", "correct": false, "explanation": "The Sahara is the largest hot desert but not the biggest overall." },
      { "text": "Gobi Desert", "correct": false, "explanation": "The Gobi Desert is large but smaller than the Antarctic." },
      { "text": "Kalahari Desert", "correct": false, "explanation": "The Kalahari is much smaller than the Antarctic Desert." }
    ]
  },
  {
    "question": "Which organ pumps blood throughout the human body?",
    "answers": [
      { "text": "Heart", "correct": true, "explanation": "The heart is responsible for pumping blood to the entire body." },
      { "text": "Liver", "correct": false, "explanation": "The liver filters toxins but does not pump blood." },
      { "text": "Lungs", "correct": false, "explanation": "The lungs help with respiration but do not pump blood." },
      { "text": "Kidneys", "correct": false, "explanation": "Kidneys filter blood but do not pump it." }
    ]
  },
  {
    "question": "Which scientist developed the theory of general relativity?",
    "answers": [
      { "text": "Albert Einstein", "correct": true, "explanation": "Einstein formulated the theory of general relativity in 1915." },
      { "text": "Isaac Newton", "correct": false, "explanation": "Newton formulated classical mechanics, not relativity." },
      { "text": "Galileo Galilei", "correct": false, "explanation": "Galileo contributed to physics but did not develop relativity." },
      { "text": "Nikola Tesla", "correct": false, "explanation": "Tesla worked on electricity and electromagnetism, not relativity." }
    ]
  },
  {
    "question": "What is the national flower of Japan?",
    "answers": [
      { "text": "Cherry Blossom", "correct": true, "explanation": "The cherry blossom, or sakura, is Japan's national flower." },
      { "text": "Lotus", "correct": false, "explanation": "The lotus is significant in Buddhism but is not Japan's national flower." },
      { "text": "Rose", "correct": false, "explanation": "The rose is not Japan's national flower." },
      { "text": "Tulip", "correct": false, "explanation": "Tulips are famous in the Netherlands, not Japan." }
    ]
  },
  {
    "question": "Which planet is closest to the Sun?",
    "answers": [
      { "text": "Mercury", "correct": true, "explanation": "Mercury is the closest planet to the Sun." },
      { "text": "Venus", "correct": false, "explanation": "Venus is the second planet from the Sun." },
      { "text": "Earth", "correct": false, "explanation": "Earth is the third planet from the Sun." },
      { "text": "Mars", "correct": false, "explanation": "Mars is the fourth planet from the Sun." }
    ]
  },
  {
    "question": "Which famous structure is located in India?",
    "answers": [
      { "text": "Taj Mahal", "correct": true, "explanation": "The Taj Mahal is a famous monument located in Agra, India." },
      { "text": "Eiffel Tower", "correct": false, "explanation": "The Eiffel Tower is located in Paris, France." },
      { "text": "Great Wall of China", "correct": false, "explanation": "The Great Wall of China is in China, not India." },
      { "text": "Statue of Liberty", "correct": false, "explanation": "The Statue of Liberty is in the United States, not India." }
    ]
  },
  {
    "question": "Which gas do plants absorb during photosynthesis?",
    "answers": [
      { "text": "Carbon dioxide", "correct": true, "explanation": "Plants absorb carbon dioxide from the air and release oxygen during photosynthesis." },
      { "text": "Oxygen", "correct": false, "explanation": "Plants release oxygen but absorb carbon dioxide." },
      { "text": "Nitrogen", "correct": false, "explanation": "Nitrogen is abundant in the air but not used in photosynthesis." },
      { "text": "Hydrogen", "correct": false, "explanation": "Hydrogen is not a gas absorbed in photosynthesis." }
    ]
  },
  {
    "question": "What is the capital of Australia?",
    "answers": [
      { "text": "Canberra", "correct": true, "explanation": "Canberra is the capital of Australia." },
      { "text": "Sydney", "correct": false, "explanation": "Sydney is the largest city but not the capital." },
      { "text": "Melbourne", "correct": false, "explanation": "Melbourne is a major city but not the capital." },
      { "text": "Perth", "correct": false, "explanation": "Perth is in Western Australia but not the capital." }
    ]
  },
  {
    "question": "Which is the smallest planet in the solar system?",
    "answers": [
      { "text": "Mercury", "correct": true, "explanation": "Mercury is the smallest planet in the solar system." },
      { "text": "Pluto", "correct": false, "explanation": "Pluto is a dwarf planet, not a full planet." },
      { "text": "Mars", "correct": false, "explanation": "Mars is small but larger than Mercury." },
      { "text": "Venus", "correct": false, "explanation": "Venus is larger than Mercury." }
    ]
  },
  {
    "question": "What is the boiling point of water at sea level?",
    "answers": [
      { "text": "100°C", "correct": true, "explanation": "Water boils at 100 degrees Celsius at sea level." },
      { "text": "90°C", "correct": false, "explanation": "90°C is below the boiling point of water." },
      { "text": "120°C", "correct": false, "explanation": "120°C is above the boiling point of water at sea level." },
      { "text": "80°C", "correct": false, "explanation": "80°C is below the boiling point of water." }
    ]
  },
  {
    "question": "Which ocean is the largest by surface area?",
    "answers": [
      { "text": "Pacific Ocean", "correct": true, "explanation": "The Pacific Ocean is the largest, covering more area than all landmasses combined." },
      { "text": "Atlantic Ocean", "correct": false, "explanation": "The Atlantic Ocean is the second-largest ocean." },
      { "text": "Indian Ocean", "correct": false, "explanation": "The Indian Ocean is smaller than the Pacific and Atlantic." },
      { "text": "Arctic Ocean", "correct": false, "explanation": "The Arctic Ocean is the smallest of the five major oceans." }
    ]
  },
  {
    "question": "What is the chemical symbol for gold?",
    "answers": [
      { "text": "Au", "correct": true, "explanation": "The chemical symbol for gold is Au, derived from its Latin name 'Aurum'." },
      { "text": "Ag", "correct": false, "explanation": "Ag is the symbol for silver." },
      { "text": "Pb", "correct": false, "explanation": "Pb is the symbol for lead." },
      { "text": "Fe", "correct": false, "explanation": "Fe is the symbol for iron." }
    ]
  },
  {
    "question": "Which animal is known for its black and white stripes?",
    "answers": [
      { "text": "Zebra", "correct": true, "explanation": "Zebras are known for their distinctive black and white stripes." },
      { "text": "Tiger", "correct": false, "explanation": "Tigers have stripes, but they are orange and black." },
      { "text": "Panda", "correct": false, "explanation": "Pandas have black and white fur, but not stripes." },
      { "text": "Penguin", "correct": false, "explanation": "Penguins are black and white but do not have stripes." }
    ]
  },
  {
    "question": "Which famous scientist developed the three laws of motion?",
    "answers": [
      { "text": "Isaac Newton", "correct": true, "explanation": "Newton formulated the three laws of motion, which are fundamental to physics." },
      { "text": "Albert Einstein", "correct": false, "explanation": "Einstein is known for the theory of relativity, not the laws of motion." },
      { "text": "Galileo Galilei", "correct": false, "explanation": "Galileo made important contributions to physics but did not formulate the three laws of motion." },
      { "text": "Nikola Tesla", "correct": false, "explanation": "Tesla was known for his work in electricity and magnetism." }
    ]
  },
  {
    "question": "What is the most widely spoken language in the world?",
    "answers": [
      { "text": "English", "correct": false, "explanation": "English is widely spoken but has fewer native speakers than Mandarin." },
      { "text": "Spanish", "correct": false, "explanation": "Spanish is widely spoken but not the most spoken language." },
      { "text": "Mandarin Chinese", "correct": true, "explanation": "Mandarin Chinese has the most native speakers worldwide." },
      { "text": "Hindi", "correct": false, "explanation": "Hindi is widely spoken but not as much as Mandarin." }
    ]
  },
  {
    "question": "Which planet has the most moons?",
    "answers": [
      { "text": "Saturn", "correct": true, "explanation": "Saturn has the most confirmed moons, surpassing Jupiter." },
      { "text": "Jupiter", "correct": false, "explanation": "Jupiter has many moons but fewer than Saturn." },
      { "text": "Earth", "correct": false, "explanation": "Earth has only one moon." },
      { "text": "Mars", "correct": false, "explanation": "Mars has two small moons, Phobos and Deimos." }
    ]
  }
];

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const GeneralQuizPage = ({ numQuestions, timeLimit }) => {
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

export default GeneralQuizPage;