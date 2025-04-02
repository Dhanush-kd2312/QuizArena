'use client'
import { useState, useRef,useEffect } from 'react';
import { FaQuestionCircle, FaCertificate, FaFire } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../../../../components/navbar';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


const allQuestions = [
  {
    "question": "Which country has won the most FIFA World Cup titles?",
    "answers": [
      { "text": "Brazil", "correct": true, "explanation": "Brazil has won the most FIFA World Cup titles, with a record five championships." },
      { "text": "Germany", "correct": false, "explanation": "Germany has won four World Cups, fewer than Brazil." },
      { "text": "Argentina", "correct": false, "explanation": "Argentina has won multiple World Cups but not the most." },
      { "text": "Italy", "correct": false, "explanation": "Italy has also won four World Cups, but Brazil has more." }
    ]
  },
  {
    "question": "What is the maximum score possible in a single frame of bowling?",
    "answers": [
      { "text": "30", "correct": true, "explanation": "A perfect frame consists of three consecutive strikes, totaling 30 points." },
      { "text": "20", "correct": false, "explanation": "20 points is not the maximum score for a frame." },
      { "text": "40", "correct": false, "explanation": "40 points is above the possible maximum." },
      { "text": "25", "correct": false, "explanation": "25 is an incorrect maximum frame score." }
    ]
  },
  {
    "question": "Which sport is played on the largest field in terms of total area?",
    "answers": [
      { "text": "Polo", "correct": true, "explanation": "Polo fields are the largest, measuring up to 300 yards long and 160 yards wide." },
      { "text": "Soccer", "correct": false, "explanation": "Soccer fields are large but not the biggest in sports." },
      { "text": "American Football", "correct": false, "explanation": "A football field is smaller than a polo field." },
      { "text": "Rugby", "correct": false, "explanation": "Rugby fields are big but not the largest." }
    ]
  },
  {
    "question": "In which year did Michael Jordan first retire from basketball?",
    "answers": [
      { "text": "1993", "correct": true, "explanation": "Michael Jordan retired for the first time in 1993 after his father's passing." },
      { "text": "1995", "correct": false, "explanation": "Jordan returned to basketball in 1995, not his first retirement year." },
      { "text": "1998", "correct": false, "explanation": "Jordan retired again in 1999, but his first retirement was in 1993." },
      { "text": "2003", "correct": false, "explanation": "Jordan's final retirement was in 2003, but not his first." }
    ]
  },
  {
    "question": "Which country is known for inventing the sport of golf?",
    "answers": [
      { "text": "Scotland", "correct": true, "explanation": "Golf originated in Scotland during the 15th century." },
      { "text": "England", "correct": false, "explanation": "England popularized golf but did not invent it." },
      { "text": "USA", "correct": false, "explanation": "Golf was brought to the USA but was not invented there." },
      { "text": "Ireland", "correct": false, "explanation": "Ireland has a strong golf tradition, but Scotland invented the sport." }
    ]
  },
  {
    "question": "How long is an Olympic swimming pool?",
    "answers": [
      { "text": "50 meters", "correct": true, "explanation": "Olympic swimming pools are 50 meters long." },
      { "text": "25 meters", "correct": false, "explanation": "25-meter pools are used in short-course events, not the Olympics." },
      { "text": "100 meters", "correct": false, "explanation": "No Olympic pool is 100 meters long." },
      { "text": "75 meters", "correct": false, "explanation": "75 meters is an incorrect pool length." }
    ]
  },
  {
    "question": "Which player has won the most Grand Slam titles in men's tennis?",
    "answers": [
      { "text": "Novak Djokovic", "correct": true, "explanation": "Djokovic holds the record for most Grand Slam titles in men's tennis." },
      { "text": "Roger Federer", "correct": false, "explanation": "Federer has won many titles but not the most." },
      { "text": "Rafael Nadal", "correct": false, "explanation": "Nadal is among the top but has fewer than Djokovic." },
      { "text": "Pete Sampras", "correct": false, "explanation": "Sampras was dominant but does not hold the record." }
    ]
  },
  {
    "question": "What is the standard number of players on a soccer team?",
    "answers": [
      { "text": "11", "correct": true, "explanation": "Each soccer team has 11 players on the field at one time." },
      { "text": "9", "correct": false, "explanation": "9 players is incorrect for standard soccer teams." },
      { "text": "12", "correct": false, "explanation": "12 players exceed the standard team size." },
      { "text": "10", "correct": false, "explanation": "10 players are fewer than required in standard soccer." }
    ]
  },
  {
    "question": "Which country hosted the first modern Olympic Games?",
    "answers": [
      { "text": "Greece", "correct": true, "explanation": "The first modern Olympics were held in Athens, Greece, in 1896." },
      { "text": "France", "correct": false, "explanation": "France was involved in reviving the Olympics but did not host the first." },
      { "text": "USA", "correct": false, "explanation": "The USA hosted later Olympics but not the first modern games." },
      { "text": "Germany", "correct": false, "explanation": "Germany did not host the first modern Olympics." }
    ]
  },
  {
    "question": "Which athlete holds the record for the most Olympic gold medals?",
    "answers": [
      { "text": "Michael Phelps", "correct": true, "explanation": "Michael Phelps has won the most Olympic gold medals in history." },
      { "text": "Usain Bolt", "correct": false, "explanation": "Bolt has multiple golds but fewer than Phelps." },
      { "text": "Carl Lewis", "correct": false, "explanation": "Lewis was a great Olympian but does not hold the record." },
      { "text": "Simone Biles", "correct": false, "explanation": "Biles is a top gymnast but does not hold the record for most golds." }
    ]
  },
  {
    "question": "Which team has won the most NBA championships?",
    "answers": [
      { "text": "Boston Celtics", "correct": false, "explanation": "The Boston Celtics have won many championships but not the most." },
      { "text": "Los Angeles Lakers", "correct": false, "explanation": "The Lakers are tied with the Celtics but do not hold the sole record." },
      { "text": "Golden State Warriors", "correct": false, "explanation": "The Warriors have won multiple titles but not the most." },
      { "text": "Boston Celtics & Los Angeles Lakers", "correct": true, "explanation": "The Celtics and Lakers are tied for the most NBA championships." }
    ]
  },
  {
    "question": "Who was the first player to score 100 points in a single NBA game?",
    "answers": [
      { "text": "Wilt Chamberlain", "correct": true, "explanation": "Wilt Chamberlain scored 100 points in a game on March 2, 1962." },
      { "text": "Michael Jordan", "correct": false, "explanation": "Jordan never scored 100 points in a single game." },
      { "text": "Kobe Bryant", "correct": false, "explanation": "Kobe Bryant scored 81 points, the second-highest ever." },
      { "text": "LeBron James", "correct": false, "explanation": "LeBron has never reached 100 points in a game." }
    ]
  },
  {
    "question": "Which country won the first ever FIFA World Cup in 1930?",
    "answers": [
      { "text": "Uruguay", "correct": true, "explanation": "Uruguay won the inaugural FIFA World Cup in 1930, hosted in Uruguay." },
      { "text": "Brazil", "correct": false, "explanation": "Brazil is successful but did not win the first World Cup." },
      { "text": "Argentina", "correct": false, "explanation": "Argentina was the runner-up in the 1930 World Cup." },
      { "text": "Germany", "correct": false, "explanation": "Germany did not win the first World Cup." }
    ]
  },
  {
    "question": "In which year did Roger Federer win his first Wimbledon title?",
    "answers": [
      { "text": "2003", "correct": true, "explanation": "Roger Federer won his first Wimbledon title in 2003." },
      { "text": "2001", "correct": false, "explanation": "Federer defeated Sampras in 2001 but did not win Wimbledon." },
      { "text": "2005", "correct": false, "explanation": "By 2005, Federer had already won multiple Wimbledons." },
      { "text": "1999", "correct": false, "explanation": "Federer was still a young player in 1999." }
    ]
  },
  {
    "question": "Which race is known as 'The Most Exciting Two Minutes in Sports'?",
    "answers": [
      { "text": "Kentucky Derby", "correct": true, "explanation": "The Kentucky Derby is a famous horse race nicknamed 'The Most Exciting Two Minutes in Sports'." },
      { "text": "Tour de France", "correct": false, "explanation": "The Tour de France is a long cycling race, not two minutes." },
      { "text": "Monaco Grand Prix", "correct": false, "explanation": "The Monaco Grand Prix lasts longer than two minutes." },
      { "text": "Boston Marathon", "correct": false, "explanation": "The Boston Marathon is a long-distance running event." }
    ]
  },
  {
    "question": "What is the national sport of Canada?",
    "answers": [
      { "text": "Lacrosse", "correct": true, "explanation": "Lacrosse is the national summer sport of Canada." },
      { "text": "Ice Hockey", "correct": false, "explanation": "Ice Hockey is very popular but is the official winter sport." },
      { "text": "Baseball", "correct": false, "explanation": "Baseball is not the national sport of Canada." },
      { "text": "Basketball", "correct": false, "explanation": "Basketball was invented by a Canadian but is not the national sport." }
    ]
  },
  {
    "question": "Which Formula 1 driver has won the most World Championships?",
    "answers": [
      { "text": "Lewis Hamilton", "correct": false, "explanation": "Hamilton has won multiple titles but is tied with Schumacher." },
      { "text": "Michael Schumacher", "correct": false, "explanation": "Schumacher shares the record with Hamilton." },
      { "text": "Ayrton Senna", "correct": false, "explanation": "Senna won multiple titles but not the most." },
      { "text": "Lewis Hamilton & Michael Schumacher", "correct": true, "explanation": "Both Schumacher and Hamilton have won 7 titles each." }
    ]
  },
  {
    "question": "Which American football team has won the most Super Bowls?",
    "answers": [
      { "text": "New England Patriots", "correct": false, "explanation": "The Patriots have won many Super Bowls but are tied with the Steelers." },
      { "text": "Pittsburgh Steelers", "correct": false, "explanation": "The Steelers have won multiple Super Bowls but are tied with the Patriots." },
      { "text": "San Francisco 49ers", "correct": false, "explanation": "The 49ers have a strong history but not the most wins." },
      { "text": "New England Patriots & Pittsburgh Steelers", "correct": true, "explanation": "Both teams have won 6 Super Bowls, the most in NFL history." }
    ]
  },
  {
    "question": "Who was the first boxer to defeat Muhammad Ali in a professional fight?",
    "answers": [
      { "text": "Joe Frazier", "correct": true, "explanation": "Joe Frazier defeated Muhammad Ali in the 'Fight of the Century' in 1971." },
      { "text": "George Foreman", "correct": false, "explanation": "Foreman lost to Ali in the 'Rumble in the Jungle'." },
      { "text": "Sonny Liston", "correct": false, "explanation": "Ali defeated Liston to become champion, not the other way around." },
      { "text": "Larry Holmes", "correct": false, "explanation": "Holmes beat an older Ali but was not his first loss." }
    ]
  },
  {
    "question": "Which country has won the most Cricket World Cups?",
    "answers": [
      { "text": "Australia", "correct": true, "explanation": "Australia has won the most ICC Cricket World Cups." },
      { "text": "India", "correct": false, "explanation": "India has won multiple World Cups but fewer than Australia." },
      { "text": "West Indies", "correct": false, "explanation": "The West Indies dominated early but do not have the most titles." },
      { "text": "England", "correct": false, "explanation": "England won their first World Cup in 2019 but do not hold the record." }
    ]
  },
  {
    "question": "Which country has won the most gold medals in the Summer Olympics?",
    "answers": [
      { "text": "United States", "correct": true, "explanation": "The United States has won the most gold medals in Summer Olympic history." },
      { "text": "China", "correct": false, "explanation": "China has won many gold medals but not the most overall." },
      { "text": "Russia", "correct": false, "explanation": "Russia has had success but fewer golds than the USA." },
      { "text": "Great Britain", "correct": false, "explanation": "Great Britain has been successful but does not hold the record." }
    ]
  },
  {
    "question": "Which golfer has won the most major championships in history?",
    "answers": [
      { "text": "Jack Nicklaus", "correct": true, "explanation": "Jack Nicklaus holds the record with 18 major titles." },
      { "text": "Tiger Woods", "correct": false, "explanation": "Tiger Woods has 15 major titles, second to Nicklaus." },
      { "text": "Arnold Palmer", "correct": false, "explanation": "Arnold Palmer was great but did not win the most majors." },
      { "text": "Phil Mickelson", "correct": false, "explanation": "Mickelson has multiple majors but not the most." }
    ]
  },
  {
    "question": "Which country has won the most Rugby World Cups?",
    "answers": [
      { "text": "New Zealand", "correct": false, "explanation": "New Zealand has won multiple World Cups but not the most." },
      { "text": "South Africa", "correct": false, "explanation": "South Africa has won several but not the most." },
      { "text": "England", "correct": false, "explanation": "England has won only one Rugby World Cup." },
      { "text": "New Zealand & South Africa", "correct": true, "explanation": "Both New Zealand and South Africa have won the most Rugby World Cups, with four each." }
    ]
  },
  {
    "question": "Which team won the first-ever Premier League title in 1992-93?",
    "answers": [
      { "text": "Manchester United", "correct": true, "explanation": "Manchester United won the first Premier League title under Sir Alex Ferguson." },
      { "text": "Arsenal", "correct": false, "explanation": "Arsenal did not win the inaugural Premier League." },
      { "text": "Liverpool", "correct": false, "explanation": "Liverpool has a strong history but did not win the first title." },
      { "text": "Chelsea", "correct": false, "explanation": "Chelsea did not win the first Premier League season." }
    ]
  },
  {
    "question": "Which city has hosted the most Summer Olympic Games?",
    "answers": [
      { "text": "London", "correct": true, "explanation": "London has hosted the Summer Olympics three times (1908, 1948, and 2012)." },
      { "text": "Paris", "correct": false, "explanation": "Paris has hosted twice but will host a third time in 2024." },
      { "text": "Los Angeles", "correct": false, "explanation": "Los Angeles has hosted twice and will host again in 2028." },
      { "text": "Athens", "correct": false, "explanation": "Athens has hosted twice, but not the most times." }
    ]
  },
  {
    "question": "Which tennis tournament is played on a clay surface?",
    "answers": [
      { "text": "French Open", "correct": true, "explanation": "The French Open is played on clay courts." },
      { "text": "Wimbledon", "correct": false, "explanation": "Wimbledon is played on grass courts." },
      { "text": "US Open", "correct": false, "explanation": "The US Open is played on hard courts." },
      { "text": "Australian Open", "correct": false, "explanation": "The Australian Open is also played on hard courts." }
    ]
  },
  {
    "question": "Which country has won the most FIFA Women's World Cup titles?",
    "answers": [
      { "text": "United States", "correct": true, "explanation": "The United States has won the most Women's World Cup titles." },
      { "text": "Germany", "correct": false, "explanation": "Germany has won multiple times but not the most." },
      { "text": "Brazil", "correct": false, "explanation": "Brazil has been a strong competitor but has not won the most titles." },
      { "text": "Japan", "correct": false, "explanation": "Japan won in 2011 but does not hold the record." }
    ]
  },
  {
    "question": "Which legendary boxer was known as 'The Greatest'?",
    "answers": [
      { "text": "Muhammad Ali", "correct": true, "explanation": "Muhammad Ali was widely known as 'The Greatest' in boxing history." },
      { "text": "Mike Tyson", "correct": false, "explanation": "Tyson was dominant but was not called 'The Greatest'." },
      { "text": "Sugar Ray Leonard", "correct": false, "explanation": "Sugar Ray Leonard was a great fighter but not 'The Greatest'." },
      { "text": "Floyd Mayweather", "correct": false, "explanation": "Mayweather is undefeated but not known as 'The Greatest'." }
    ]
  },
  {
    "question": "Which sport is known as 'The Gentleman's Game'?",
    "answers": [
      { "text": "Cricket", "correct": true, "explanation": "Cricket is traditionally known as 'The Gentleman's Game'." },
      { "text": "Golf", "correct": false, "explanation": "Golf is a respected sport but is not called 'The Gentleman's Game'." },
      { "text": "Tennis", "correct": false, "explanation": "Tennis has etiquette rules but is not called 'The Gentleman's Game'." },
      { "text": "Polo", "correct": false, "explanation": "Polo is an elite sport but does not carry this nickname." }
    ]
  },
  {
    "question": "Who holds the record for the fastest 100m sprint?",
    "answers": [
      { "text": "Usain Bolt", "correct": true, "explanation": "Usain Bolt set the world record of 9.58 seconds in 2009." },
      { "text": "Carl Lewis", "correct": false, "explanation": "Carl Lewis was a great sprinter but did not hold the fastest time." },
      { "text": "Yohan Blake", "correct": false, "explanation": "Yohan Blake has run fast times but not the record." },
      { "text": "Tyson Gay", "correct": false, "explanation": "Tyson Gay was fast but not the record holder." }
    ]
  },
  {
    "question": "Which athlete has won the most Olympic gold medals in history?",
    "answers": [
      { "text": "Michael Phelps", "correct": true, "explanation": "Michael Phelps holds the record with 23 Olympic gold medals." },
      { "text": "Usain Bolt", "correct": false, "explanation": "Usain Bolt has won 8 Olympic gold medals." },
      { "text": "Carl Lewis", "correct": false, "explanation": "Carl Lewis won 9 Olympic gold medals." },
      { "text": "Simone Biles", "correct": false, "explanation": "Simone Biles is a highly decorated gymnast but does not hold the most gold medals." }
    ]
  },
  {
    "question": "Which country won the first-ever FIFA World Cup in 1930?",
    "answers": [
      { "text": "Uruguay", "correct": true, "explanation": "Uruguay hosted and won the first FIFA World Cup in 1930." },
      { "text": "Brazil", "correct": false, "explanation": "Brazil did not win their first World Cup until 1958." },
      { "text": "Germany", "correct": false, "explanation": "Germany's first World Cup victory was in 1954." },
      { "text": "Argentina", "correct": false, "explanation": "Argentina reached the 1930 final but lost to Uruguay." }
    ]
  },
  {
    "question": "How many players are there on a standard baseball team lineup?",
    "answers": [
      { "text": "9", "correct": true, "explanation": "A standard baseball lineup consists of 9 players." },
      { "text": "11", "correct": false, "explanation": "Football (soccer) has 11 players per team, not baseball." },
      { "text": "7", "correct": false, "explanation": "Seven players are too few for a baseball lineup." },
      { "text": "10", "correct": false, "explanation": "Some leagues use a designated hitter, but the lineup remains 9 players." }
    ]
  },
  {
    "question": "Which city hosted the 2012 Summer Olympics?",
    "answers": [
      { "text": "London", "correct": true, "explanation": "London hosted the 2012 Summer Olympics." },
      { "text": "Beijing", "correct": false, "explanation": "Beijing hosted the 2008 Olympics." },
      { "text": "Rio de Janeiro", "correct": false, "explanation": "Rio hosted the 2016 Olympics." },
      { "text": "Athens", "correct": false, "explanation": "Athens hosted the 2004 Olympics." }
    ]
  },
  {
    "question": "Which sport uses terms like 'bogey' and 'eagle'?",
    "answers": [
      { "text": "Golf", "correct": true, "explanation": "Golf uses terms like bogey (one over par) and eagle (two under par)." },
      { "text": "Tennis", "correct": false, "explanation": "Tennis uses terms like love, deuce, and advantage." },
      { "text": "Basketball", "correct": false, "explanation": "Basketball does not use 'bogey' or 'eagle'." },
      { "text": "Baseball", "correct": false, "explanation": "Baseball does not have bogeys or eagles." }
    ]
  },
  {
    "question": "What is the national sport of Canada?",
    "answers": [
      { "text": "Lacrosse", "correct": true, "explanation": "Lacrosse is Canada's national sport, while ice hockey is the most popular." },
      { "text": "Ice Hockey", "correct": false, "explanation": "Hockey is Canada's most popular sport but not its official national sport." },
      { "text": "Baseball", "correct": false, "explanation": "Baseball is not Canada's national sport." },
      { "text": "Soccer", "correct": false, "explanation": "Soccer is widely played but not Canada's national sport." }
    ]
  },
  {
    "question": "In which sport would you find a pommel horse?",
    "answers": [
      { "text": "Gymnastics", "correct": true, "explanation": "The pommel horse is an apparatus used in men's gymnastics." },
      { "text": "Equestrian", "correct": false, "explanation": "Equestrian events involve real horses, not a pommel horse." },
      { "text": "Wrestling", "correct": false, "explanation": "Wrestling does not use a pommel horse." },
      { "text": "Track and Field", "correct": false, "explanation": "Track and Field events do not involve a pommel horse." }
    ]
  },
  {
    "question": "Which Grand Slam tennis tournament is played on grass courts?",
    "answers": [
      { "text": "Wimbledon", "correct": true, "explanation": "Wimbledon is the only Grand Slam played on grass courts." },
      { "text": "US Open", "correct": false, "explanation": "The US Open is played on hard courts." },
      { "text": "French Open", "correct": false, "explanation": "The French Open is played on clay courts." },
      { "text": "Australian Open", "correct": false, "explanation": "The Australian Open is played on hard courts." }
    ]
  },
  {
    "question": "What is the diameter of a standard basketball hoop?",
    "answers": [
      { "text": "18 inches", "correct": true, "explanation": "A regulation basketball hoop has a diameter of 18 inches." },
      { "text": "20 inches", "correct": false, "explanation": "The hoop diameter is slightly smaller than 20 inches." },
      { "text": "22 inches", "correct": false, "explanation": "22 inches is too large for a standard basketball hoop." },
      { "text": "16 inches", "correct": false, "explanation": "16 inches is too small for a regulation hoop." }
    ]
  },
  {
    "question": "Which famous boxing match was called the 'Rumble in the Jungle'?",
    "answers": [
      { "text": "Muhammad Ali vs. George Foreman", "correct": true, "explanation": "Ali defeated Foreman in the 'Rumble in the Jungle' in 1974." },
      { "text": "Mike Tyson vs. Evander Holyfield", "correct": false, "explanation": "Tyson vs. Holyfield was known for the infamous ear-biting incident." },
      { "text": "Floyd Mayweather vs. Manny Pacquiao", "correct": false, "explanation": "Mayweather vs. Pacquiao was a highly anticipated fight, but not the 'Rumble in the Jungle'." },
      { "text": "Joe Frazier vs. Muhammad Ali", "correct": false, "explanation": "Ali and Frazier fought in the 'Thrilla in Manila'." }
    ]
  },
  {
    "question": "Which country has won the most FIFA World Cup titles?",
    "answers": [
      { "text": "Brazil", "correct": true, "explanation": "Brazil has won the FIFA World Cup a record 5 times." },
      { "text": "Germany", "correct": false, "explanation": "Germany has won the World Cup 4 times." },
      { "text": "Italy", "correct": false, "explanation": "Italy has also won the World Cup 4 times." },
      { "text": "Argentina", "correct": false, "explanation": "Argentina has won the World Cup 3 times." }
    ]
  },
  {
    "question": "What is the maximum score possible in a single break in snooker?",
    "answers": [
      { "text": "147", "correct": true, "explanation": "147 is the maximum score possible in a standard snooker break." },
      { "text": "155", "correct": false, "explanation": "155 is possible only if a free ball is given." },
      { "text": "100", "correct": false, "explanation": "A 100 break is a century but not the maximum possible." },
      { "text": "120", "correct": false, "explanation": "120 is below the standard maximum break of 147." }
    ]
  },
  {
    "question": "Which player has won the most NBA championships?",
    "answers": [
      { "text": "Bill Russell", "correct": true, "explanation": "Bill Russell won 11 NBA championships with the Boston Celtics." },
      { "text": "Michael Jordan", "correct": false, "explanation": "Michael Jordan won 6 NBA championships." },
      { "text": "LeBron James", "correct": false, "explanation": "LeBron James has won multiple championships but not the most." },
      { "text": "Kobe Bryant", "correct": false, "explanation": "Kobe Bryant won 5 NBA championships." }
    ]
  },
  {
    "question": "What is the standard length of a marathon race?",
    "answers": [
      { "text": "42.195 kilometers", "correct": true, "explanation": "A marathon is officially 42.195 km (26.2 miles) long." },
      { "text": "40 kilometers", "correct": false, "explanation": "A marathon is slightly longer than 40 kilometers." },
      { "text": "50 kilometers", "correct": false, "explanation": "A marathon is shorter than 50 kilometers." },
      { "text": "26 kilometers", "correct": false, "explanation": "A marathon is 26.2 miles, not 26 km." }
    ]
  },
  {
    "question": "Which country is famous for inventing the sport of cricket?",
    "answers": [
      { "text": "England", "correct": true, "explanation": "Cricket originated in England in the 16th century." },
      { "text": "India", "correct": false, "explanation": "India is passionate about cricket but did not invent it." },
      { "text": "Australia", "correct": false, "explanation": "Australia has a strong cricket history but did not invent the sport." },
      { "text": "South Africa", "correct": false, "explanation": "Cricket was introduced to South Africa by England." }
    ]
  },
  {
    "question": "Which sport is played at the 'Wimbledon' tournament?",
    "answers": [
      { "text": "Tennis", "correct": true, "explanation": "Wimbledon is the most prestigious tennis tournament in the world." },
      { "text": "Badminton", "correct": false, "explanation": "Badminton is not played at Wimbledon." },
      { "text": "Golf", "correct": false, "explanation": "Wimbledon is not related to golf." },
      { "text": "Rugby", "correct": false, "explanation": "Wimbledon is a tennis event, not a rugby tournament." }
    ]
  },
  {
    "question": "What is the term for three consecutive strikes in bowling?",
    "answers": [
      { "text": "Turkey", "correct": true, "explanation": "Three consecutive strikes in bowling are called a 'turkey'." },
      { "text": "Eagle", "correct": false, "explanation": "Eagle is a term used in golf, not bowling." },
      { "text": "Hat-trick", "correct": false, "explanation": "Hat-trick is used in football and cricket, not bowling." },
      { "text": "Strikeout", "correct": false, "explanation": "Strikeout is a baseball term, not a bowling term." }
    ]
  },
  {
    "question": "In Formula 1, what color flag is waved to signal the end of a race?",
    "answers": [
      { "text": "Checkered flag", "correct": true, "explanation": "A checkered flag is waved to signal the end of an F1 race." },
      { "text": "Red flag", "correct": false, "explanation": "A red flag signals that the race has been stopped." },
      { "text": "Yellow flag", "correct": false, "explanation": "A yellow flag indicates caution, not the end of a race." },
      { "text": "Green flag", "correct": false, "explanation": "A green flag signals the start or resumption of a race." }
    ]
  },
  {
    "question": "Which sport is known as 'the beautiful game'?",
    "answers": [
      { "text": "Football (Soccer)", "correct": true, "explanation": "Football (Soccer) is often called 'the beautiful game'." },
      { "text": "Basketball", "correct": false, "explanation": "Basketball is not typically referred to as 'the beautiful game'." },
      { "text": "Tennis", "correct": false, "explanation": "Tennis is not known by that nickname." },
      { "text": "Rugby", "correct": false, "explanation": "Rugby has a different nickname but is not called 'the beautiful game'." }
    ]
  },
  {
    "question": "Which U.S. city is home to the Green Bay Packers?",
    "answers": [
      { "text": "Green Bay, Wisconsin", "correct": true, "explanation": "The Green Bay Packers are based in Green Bay, Wisconsin." },
      { "text": "Chicago, Illinois", "correct": false, "explanation": "Chicago is home to the Bears, not the Packers." },
      { "text": "Dallas, Texas", "correct": false, "explanation": "Dallas is home to the Cowboys, not the Packers." },
      { "text": "New York City, New York", "correct": false, "explanation": "New York City has teams like the Giants and Jets, not the Packers." }
    ]
  }
];  

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const SportsQuizPage = ({ numQuestions, timeLimit }) => {
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

export default SportsQuizPage;