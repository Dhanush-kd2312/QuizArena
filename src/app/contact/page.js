'use client';
import React from 'react';
import Navbar from '../../../components/navbar';
import { FaEnvelope, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.hero}>
        <h1 style={styles.heroText}>Get in <span style={styles.highlight}>Touch</span></h1>
      </div>

      <div style={styles.content}>
        <div style={styles.leftSection}>
          <h2 style={styles.title}>✉️ Contact Form</h2>
          <form style={styles.form}>
            <input type="text" placeholder="Your Name" style={styles.input} />
            <input type="email" placeholder="Your Email" style={styles.input} />
            <textarea placeholder="Your Message" style={styles.textarea}></textarea>
            <button type="submit" style={styles.button}>Send Message</button>
          </form>
        </div>

        <div style={styles.rightSection}>
          <h2 style={styles.title}>📩 Contact Info</h2>
          <p style={styles.contactItem}>
            <FaEnvelope style={styles.icon} /> support@quizarena.com
          </p>

          <h2 style={styles.subtitle}>🌍 Social Media</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}><FaTwitter style={styles.icon} /> Twitter: @QuizArena</li>
            <li style={styles.listItem}><FaLinkedin style={styles.icon} /> LinkedIn: Quiz Arena Official</li>
            <li style={styles.listItem}><FaFacebook style={styles.icon} /> Facebook: Quiz Arena</li>
          </ul>
        </div>
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
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "900px",
    width: "100%",
    marginTop: "50px",
    padding: "30px",
    background: "#222",
    boxShadow: "0 8px 16px rgba(255, 215, 0, 0.2)",
    borderRadius: "12px",
    border: "2px solid rgba(255, 215, 0, 0.5)",
  },
  leftSection: {
    flex: 1,
    paddingRight: "20px",
  },
  rightSection: {
    flex: 1,
    paddingLeft: "20px",
    borderLeft: "2px solid rgba(255, 215, 0, 0.5)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "20px",
    color: "#ffd700",
    marginTop: "20px",
    marginBottom:"20px",
  },
  contactItem: {
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    color: "#ddd",
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
    fontSize: "22px",
    marginRight: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "5px",
    border: "2px solid rgba(255, 215, 0, 0.5)",
    background: "#111",
    color: "#fff",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    height: "120px",
    borderRadius: "5px",
    border: "2px solid rgba(255, 215, 0, 0.5)",
    background: "#111",
    color: "#fff",
  },
  button: {
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#ffd700",
    color: "#000",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Contact;
