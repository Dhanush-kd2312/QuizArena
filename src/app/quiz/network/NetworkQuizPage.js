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
        "question": "Which protocol is used to send email?",
        "choices": {
          "A": "HTTP",
          "B": "SMTP",
          "C": "FTP",
          "D": "SNMP"
        },
        "answer": "B",
        "explanation": "SMTP (Simple Mail Transfer Protocol) is used to send emails over the Internet."
      },
      {
        "question": "Which device is used to connect multiple networks together?",
        "choices": {
          "A": "Switch",
          "B": "Router",
          "C": "Hub",
          "D": "Repeater"
        },
        "answer": "B",
        "explanation": "A router connects multiple networks and forwards data packets between them."
      },
      {
        "question": "Which of the following is a Layer 3 device in the OSI model?",
        "choices": {
          "A": "Switch",
          "B": "Router",
          "C": "Hub",
          "D": "Bridge"
        },
        "answer": "B",
        "explanation": "A router operates at Layer 3 (Network Layer) and determines the best path for data packets."
      },
      {
        "question": "What does DNS stand for?",
        "choices": {
          "A": "Data Network System",
          "B": "Domain Name System",
          "C": "Digital Network Service",
          "D": "Dynamic Naming Structure"
        },
        "answer": "B",
        "explanation": "DNS (Domain Name System) translates domain names to IP addresses."
      },
      {
        "question": "Which port number is used by HTTP?",
        "choices": {
          "A": "21",
          "B": "25",
          "C": "80",
          "D": "443"
        },
        "answer": "C",
        "explanation": "HTTP (Hypertext Transfer Protocol) uses port 80 for communication."
      },
      {
        "question": "Which network topology has a central device to which all other devices are connected?",
        "choices": {
          "A": "Bus",
          "B": "Ring",
          "C": "Star",
          "D": "Mesh"
        },
        "answer": "C",
        "explanation": "In a star topology, all devices are connected to a central hub or switch."
      },
      {
        "question": "Which protocol is used for secure web browsing?",
        "choices": {
          "A": "HTTP",
          "B": "HTTPS",
          "C": "FTP",
          "D": "Telnet"
        },
        "answer": "B",
        "explanation": "HTTPS (Hypertext Transfer Protocol Secure) encrypts communication for secure browsing."
      },
      {
        "question": "What does IP stand for in networking?",
        "choices": {
          "A": "Internet Protocol",
          "B": "Internal Processing",
          "C": "Internet Provider",
          "D": "Information Protocol"
        },
        "answer": "A",
        "explanation": "IP (Internet Protocol) is used to address and route data packets across networks."
      },
      {
        "question": "What is the default subnet mask for a Class C IP address?",
        "choices": {
          "A": "255.0.0.0",
          "B": "255.255.0.0",
          "C": "255.255.255.0",
          "D": "255.255.255.255"
        },
        "answer": "C",
        "explanation": "A Class C network has a default subnet mask of 255.255.255.0."
      },
      {
        "question": "Which of the following is NOT a private IP address range?",
        "choices": {
          "A": "192.168.1.0/24",
          "B": "172.16.0.0/12",
          "C": "10.0.0.0/8",
          "D": "8.8.8.8/32"
        },
        "answer": "D",
        "explanation": "8.8.8.8 is a public IP address owned by Google, used as a public DNS server."
      },
      {
        "question": "Which layer of the OSI model is responsible for encryption and decryption?",
        "choices": {
          "A": "Transport",
          "B": "Session",
          "C": "Presentation",
          "D": "Application"
        },
        "answer": "C",
        "explanation": "The Presentation layer (Layer 6) handles encryption and decryption."
      },
      {
        "question": "What is the purpose of NAT (Network Address Translation)?",
        "choices": {
          "A": "To translate IP addresses between different networks",
          "B": "To assign MAC addresses to devices",
          "C": "To provide security in networking",
          "D": "To store domain names"
        },
        "answer": "A",
        "explanation": "NAT translates private IP addresses to public IP addresses and vice versa."
      },
      {
        "question": "Which protocol is used to transfer files between computers on a network?",
        "choices": {
          "A": "HTTP",
          "B": "SMTP",
          "C": "FTP",
          "D": "SNMP"
        },
        "answer": "C",
        "explanation": "FTP (File Transfer Protocol) is used to transfer files over a network."
      },
      {
        "question": "Which type of network covers the largest geographical area?",
        "choices": {
          "A": "LAN",
          "B": "WAN",
          "C": "MAN",
          "D": "PAN"
        },
        "answer": "B",
        "explanation": "WAN (Wide Area Network) covers the largest geographical area, spanning cities or even countries."
      },
      {
        "question": "What is the loopback IP address?",
        "choices": {
          "A": "192.168.1.1",
          "B": "127.0.0.1",
          "C": "10.0.0.1",
          "D": "255.255.255.255"
        },
        "answer": "B",
        "explanation": "127.0.0.1 is the loopback address used to test local network interfaces."
      },
      {
        "question": "Which protocol is used to automatically assign IP addresses to devices?",
        "choices": {
          "A": "ARP",
          "B": "DHCP",
          "C": "DNS",
          "D": "ICMP"
        },
        "answer": "B",
        "explanation": "DHCP (Dynamic Host Configuration Protocol) dynamically assigns IP addresses to devices."
      },
      {
        "question": "What does MAC stand for in networking?",
        "choices": {
          "A": "Media Access Control",
          "B": "Multiple Access Configuration",
          "C": "Machine Access Communication",
          "D": "Message Authentication Code"
        },
        "answer": "A",
        "explanation": "MAC (Media Access Control) refers to the unique address assigned to network interfaces."
      },
      {
        "question": "Which of the following is a connectionless transport layer protocol?",
        "choices": {
          "A": "TCP",
          "B": "UDP",
          "C": "FTP",
          "D": "ICMP"
        },
        "answer": "B",
        "explanation": "UDP (User Datagram Protocol) is a connectionless protocol used for fast, lightweight communication."
      },
      {
        "question": "Which type of attack involves intercepting network traffic?",
        "choices": {
          "A": "Man-in-the-Middle (MITM)",
          "B": "Denial-of-Service (DoS)",
          "C": "SQL Injection",
          "D": "Phishing"
        },
        "answer": "A",
        "explanation": "MITM attacks involve intercepting and possibly altering communication between two parties."
      },
      {
        "question": "Which protocol is used for remote login and command execution securely?",
        "choices": {
          "A": "Telnet",
          "B": "SSH",
          "C": "FTP",
          "D": "HTTP"
        },
        "answer": "B",
        "explanation": "SSH (Secure Shell) is used for secure remote login and command execution."
      },
      {
        "question": "Which layer of the OSI model is responsible for data compression?",
        "choices": {
          "A": "Network",
          "B": "Transport",
          "C": "Presentation",
          "D": "Application"
        },
        "answer": "C",
        "explanation": "The Presentation layer handles data compression, encryption, and translation."
      },
      {
        "question": "What type of IP address is 169.254.x.x?",
        "choices": {
          "A": "Public IP",
          "B": "Private IP",
          "C": "APIPA (Automatic Private IP Addressing)",
          "D": "Loopback IP"
        },
        "answer": "C",
        "explanation": "APIPA addresses (169.254.x.x) are assigned automatically when no DHCP server is available."
      },
      {
        "question": "Which protocol maps IP addresses to MAC addresses?",
        "choices": {
          "A": "ARP",
          "B": "RARP",
          "C": "DNS",
          "D": "DHCP"
        },
        "answer": "A",
        "explanation": "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses."
      },
      {
        "question": "Which protocol is used for network diagnostics and troubleshooting?",
        "choices": {
          "A": "ICMP",
          "B": "TCP",
          "C": "UDP",
          "D": "SNMP"
        },
        "answer": "A",
        "explanation": "ICMP (Internet Control Message Protocol) is used for network diagnostics, such as with the ping command."
      },
      {
        "question": "What is the primary function of a proxy server?",
        "choices": {
          "A": "To store IP addresses",
          "B": "To filter and forward network requests",
          "C": "To encrypt network traffic",
          "D": "To provide DNS resolution"
        },
        "answer": "B",
        "explanation": "A proxy server acts as an intermediary, filtering and forwarding client requests."
      },
      {
        "question": "Which network topology has each device connected to two other devices, forming a closed loop?",
        "choices": {
          "A": "Bus",
          "B": "Star",
          "C": "Ring",
          "D": "Mesh"
        },
        "answer": "C",
        "explanation": "In a ring topology, each device is connected to exactly two others, forming a circular data path."
      },
      {
        "question": "Which type of cable is commonly used for Ethernet networking?",
        "choices": {
          "A": "Coaxial cable",
          "B": "Fiber optic cable",
          "C": "Twisted pair cable",
          "D": "Parallel cable"
        },
        "answer": "C",
        "explanation": "Twisted pair cables (such as Cat5e and Cat6) are commonly used for Ethernet networking."
      },
      {
        "question": "What is the maximum number of IP addresses that can be assigned in a /24 subnet?",
        "choices": {
          "A": "256",
          "B": "254",
          "C": "512",
          "D": "128"
        },
        "answer": "B",
        "explanation": "A /24 subnet has 256 addresses, but 2 are reserved (network and broadcast), leaving 254 usable IPs."
      },
      {
        "question": "Which of the following network types uses radio waves for communication?",
        "choices": {
          "A": "Wired LAN",
          "B": "Wi-Fi",
          "C": "Fiber Optic Network",
          "D": "Token Ring"
        },
        "answer": "B",
        "explanation": "Wi-Fi networks use radio waves to transmit data wirelessly."
      },
      {
        "question": "What is the purpose of VLANs in networking?",
        "choices": {
          "A": "To encrypt data",
          "B": "To segment networks logically",
          "C": "To assign MAC addresses",
          "D": "To allocate IP addresses"
        },
        "answer": "B",
        "explanation": "VLANs (Virtual Local Area Networks) allow network segmentation without requiring physical separation."
      },
      {
        "question": "What is the default port number for Secure Shell (SSH)?",
        "choices": {
          "A": "22",
          "B": "23",
          "C": "21",
          "D": "443"
        },
        "answer": "A",
        "explanation": "SSH (Secure Shell) uses port 22 for secure remote access."
      },
      {
        "question": "Which type of firewall filters packets based on source and destination IP addresses?",
        "choices": {
          "A": "Application firewall",
          "B": "Packet filtering firewall",
          "C": "Stateful firewall",
          "D": "Proxy firewall"
        },
        "answer": "B",
        "explanation": "A packet filtering firewall allows or blocks packets based on source and destination IP addresses."
      },
      {
        "question": "What is the primary function of SNMP (Simple Network Management Protocol)?",
        "choices": {
          "A": "To transfer files",
          "B": "To manage network devices",
          "C": "To encrypt network traffic",
          "D": "To resolve IP addresses"
        },
        "answer": "B",
        "explanation": "SNMP is used to monitor and manage network devices such as routers and switches."
      },
      {
        "question": "What is the purpose of a subnet mask?",
        "choices": {
          "A": "To encrypt data",
          "B": "To determine the network and host portions of an IP address",
          "C": "To assign MAC addresses",
          "D": "To route packets"
        },
        "answer": "B",
        "explanation": "A subnet mask helps distinguish the network and host portions of an IP address."
      },
      {
        "question": "What is the term for the delay in data transmission over a network?",
        "choices": {
          "A": "Bandwidth",
          "B": "Latency",
          "C": "Throughput",
          "D": "Jitter"
        },
        "answer": "B",
        "explanation": "Latency refers to the delay in data transmission between sender and receiver."
      },
      {
        "question": "Which organization is responsible for managing IP address allocation?",
        "choices": {
          "A": "IEEE",
          "B": "IANA",
          "C": "W3C",
          "D": "ICANN"
        },
        "answer": "B",
        "explanation": "IANA (Internet Assigned Numbers Authority) manages global IP address allocation."
      },
      {
        "question": "What is the primary advantage of IPv6 over IPv4?",
        "choices": {
          "A": "Faster speed",
          "B": "Increased security",
          "C": "Larger address space",
          "D": "Lower latency"
        },
        "answer": "C",
        "explanation": "IPv6 provides a significantly larger address space compared to IPv4."
      },
      {
        "question": "Which type of address is used to send a packet to all devices in a network?",
        "choices": {
          "A": "Unicast",
          "B": "Multicast",
          "C": "Broadcast",
          "D": "Anycast"
        },
        "answer": "C",
        "explanation": "A broadcast address sends a packet to all devices on a network."
      },
      {
        "question": "Which networking device is used to extend the range of a Wi-Fi network?",
        "choices": {
          "A": "Router",
          "B": "Repeater",
          "C": "Switch",
          "D": "Firewall"
        },
        "answer": "B",
        "explanation": "A repeater extends the coverage area of a Wi-Fi network by amplifying signals."
      },
      {
        "question": "Which protocol is used for remote desktop access?",
        "choices": {
          "A": "RDP",
          "B": "SSH",
          "C": "Telnet",
          "D": "VNC"
        },
        "answer": "A",
        "explanation": "RDP (Remote Desktop Protocol) allows users to access and control a remote computer."
      },
      {
        "question": "Which of the following is an example of a connection-oriented protocol?",
        "choices": {
          "A": "UDP",
          "B": "ICMP",
          "C": "TCP",
          "D": "ARP"
        },
        "answer": "C",
        "explanation": "TCP (Transmission Control Protocol) is a connection-oriented protocol that ensures reliable data delivery."
      },
      {
        "question": "Which command is used to check the connectivity between two network devices?",
        "choices": {
          "A": "traceroute",
          "B": "ping",
          "C": "nslookup",
          "D": "netstat"
        },
        "answer": "B",
        "explanation": "The `ping` command tests connectivity by sending ICMP Echo Request messages."
      },
      {
        "question": "What is the maximum data transfer rate of a standard Gigabit Ethernet connection?",
        "choices": {
          "A": "100 Mbps",
          "B": "1 Gbps",
          "C": "10 Gbps",
          "D": "100 Gbps"
        },
        "answer": "B",
        "explanation": "Gigabit Ethernet (IEEE 802.3ab) supports data transfer rates of up to 1 Gbps (1000 Mbps)."
      },
      {
        "question": "Which protocol resolves domain names into IP addresses?",
        "choices": {
          "A": "DNS",
          "B": "DHCP",
          "C": "FTP",
          "D": "SMTP"
        },
        "answer": "A",
        "explanation": "DNS (Domain Name System) translates domain names into corresponding IP addresses."
      },
      {
        "question": "Which wireless encryption standard is considered the most secure?",
        "choices": {
          "A": "WEP",
          "B": "WPA",
          "C": "WPA2",
          "D": "None of the above"
        },
        "answer": "C",
        "explanation": "WPA2 (Wi-Fi Protected Access 2) is currently the most secure encryption standard for wireless networks."
      },
      {
        "question": "Which protocol is commonly used for VoIP (Voice over Internet Protocol) communication?",
        "choices": {
          "A": "HTTP",
          "B": "SIP",
          "C": "FTP",
          "D": "IMAP"
        },
        "answer": "B",
        "explanation": "SIP (Session Initiation Protocol) is widely used to initiate and control VoIP calls."
      },
      {
        "question": "Which of the following is a valid IPv6 address?",
        "choices": {
          "A": "192.168.1.1",
          "B": "2001:0db8:85a3::8a2e:0370:7334",
          "C": "255.255.255.255",
          "D": "10.0.0.256"
        },
        "answer": "B",
        "explanation": "IPv6 addresses are 128-bit and written in hexadecimal notation, such as `2001:0db8:85a3::8a2e:0370:7334`."
      },
      {
        "question": "Which network device operates at both Layer 2 and Layer 3 of the OSI model?",
        "choices": {
          "A": "Switch",
          "B": "Router",
          "C": "Layer 3 Switch",
          "D": "Hub"
        },
        "answer": "C",
        "explanation": "A Layer 3 switch can perform both switching (Layer 2) and routing (Layer 3) functions."
      },
      {
        "question": "What is the main purpose of a firewall in a network?",
        "choices": {
          "A": "To increase network speed",
          "B": "To monitor and control incoming and outgoing traffic",
          "C": "To assign IP addresses",
          "D": "To connect different networks"
        },
        "answer": "B",
        "explanation": "A firewall monitors and filters network traffic based on predefined security rules."
      },
      {
        "question": "What type of attack involves overwhelming a network with excessive traffic?",
        "choices": {
          "A": "Man-in-the-Middle",
          "B": "Denial-of-Service (DoS)",
          "C": "Phishing",
          "D": "Ransomware"
        },
        "answer": "B",
        "explanation": "A DoS (Denial-of-Service) attack floods a network or server with excessive traffic to disrupt services."
      }
    ]
  }
];

const getRandomQuestions = (allQuestions, num) => {
  return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, num);
};

const NetworkingQuizPage = ({ numQuestions, timeLimit }) => {
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

export default NetworkingQuizPage;