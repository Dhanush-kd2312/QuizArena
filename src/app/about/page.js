'use client';
import Navbar from "../../../components/navbar";
import { FaShieldAlt, FaMicrophone, FaChartLine, FaBrain, FaUserGraduate } from "react-icons/fa";

const About = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.hero}>
        <h1 style={styles.heroText}>Welcome to <span style={styles.highlight}>Quiz Arena</span></h1>
      </div>
      
      <div style={styles.content}>
        <h2 style={styles.title}>Revolutionizing Assessments with AI</h2>
        <p style={styles.description}>
          <strong>Quiz Arena</strong> is an AI-powered platform that enhances learning through intelligent quiz generation, fraud monitoring, and voice analysis.
          Our system leverages cutting-edge AI tools to ensure **fairness, engagement, and accuracy**, providing an innovative way to evaluate knowledge.
        </p>
        
        <h2 style={styles.subtitle}>🌟 Our Impact</h2>
        <p style={styles.description}>
          We integrate AI technologies to transform **e-learning and competitive assessments**.
          Our solutions promote **transparency**, reduce **cheating** using AI-based fraud detection, and offer **personalized feedback**.
          We also support **multilingual learning** and **adaptive difficulty levels**.
        </p>

        <h2 style={styles.subtitle}>🚀 AI-Powered Features</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}><FaShieldAlt style={styles.icon} /> Fraud Detection System</li>
          <li style={styles.listItem}><FaMicrophone style={styles.icon} /> Voice and Emotion Analysis</li>
          <li style={styles.listItem}><FaChartLine style={styles.icon} /> Real-time Quiz Adaptation</li>
          <li style={styles.listItem}><FaBrain style={styles.icon} /> Intelligent Performance Insights</li>
          <li style={styles.listItem}><FaUserGraduate style={styles.icon} /> Personalized Learning Paths</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to bottom, #1e1e1e, #2a2a2a)", 
    minHeight: "100vh",
    paddingTop: "60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  hero: {
    position: "relative",
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backdropFilter: "blur(8px)", 
    background: "rgba(0, 0, 0, 0.3)",
    borderBottom: "2px solid #444",
  },
  heroText: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
  },
  highlight: {
    color: "#ffd700",
  },
  content: {
    maxWidth: "900px",
    marginTop: "50px",
    padding: "30px",
    background: "#222",
    boxShadow: "0 8px 16px rgba(255, 215, 0, 0.2)",
    borderRadius: "12px",
    border: "2px solid rgba(255, 215, 0, 0.5)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "24px",
    color: "#ddd",
    marginTop: "20px",
    textDecoration: "underline",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#bbb",
    marginBottom: "15px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    color: "#ddd",
    marginBottom: "10px",
  },
  icon: {
    color: "#ffd700",
    fontSize: "24px",
    marginRight: "10px",
  },
};

export default About;
