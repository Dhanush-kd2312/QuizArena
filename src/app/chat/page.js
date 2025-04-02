"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/textarea";
import { ScrollArea } from "../../../components/ui/scroll-area";
import Navbar from "../../../components/navbar";
import { motion } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, msg: input }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      let receivedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedText += new TextDecoder().decode(value);

        setMessages([...newMessages, { role: "assistant", content: receivedText }]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Styling Constants
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "black",
      color: "white",
      paddingTop: "70px", // Ensures space for the navbar
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chatBox: {
      width: "70%",
      maxWidth: "800px",
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#1E1E1E",
      borderRadius: "16px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    chatTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "16px",
      marginTop: "10px",
    },
    scrollArea: {
      height: "400px",
      overflowY: "auto",
      padding: "16px",
      backgroundColor: "#2D2D2D",
      borderRadius: "8px",
    },
    userMessage: {
      padding: "12px",
      margin: "8px 0",
      maxWidth: "80%",
      border: "1px solid #3B82F6",
      backgroundColor: "#2563EB",
      color: "white",
      alignSelf: "flex-end",
      marginLeft: "auto",
      borderRadius: "8px",
    },
    aiMessage: {
      padding: "12px",
      margin: "8px 0",
      maxWidth: "80%",
      border: "1px solid #6B7280",
      backgroundColor: "#374151",
      color: "white",
      alignSelf: "flex-start",
      borderRadius: "8px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "16px",
      backgroundColor: "#2D2D2D",
      padding: "12px",
      borderRadius: "8px",
    },
    inputArea: {
      flex: "1",
      color: "white",
      backgroundColor: "#1E1E1E",
      border: "1px solid #4B5563",
      borderRadius: "8px",
      padding: "8px",
      outline: "none",
    },
    sendButton: {
      backgroundColor: "#3B82F6",
      color: "white",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    sendButtonHover: {
      backgroundColor: "#2563EB",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar />

      {/* Chat Container */}
      <motion.div
        style={styles.chatBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={styles.chatTitle}>💬 AI Chatbot</h1>

        {/* Chat Area */}
        <ScrollArea style={styles.scrollArea}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              style={msg.role === "user" ? styles.userMessage : styles.aiMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className="text-sm">{line}</p>
              ))}
            </motion.div>
          ))}
          <div ref={chatRef} />
        </ScrollArea>

        {/* Input Area */}
        <Card style={styles.inputContainer}>
          <CardContent style={{ display: "flex", gap: "10px", width: "100%" }}>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={styles.inputArea}
            />
            <Button
              onClick={sendMessage}
              disabled={loading}
              style={{
                ...styles.sendButton,
                ...(loading ? styles.sendButtonHover : {}),
              }}
            >
              {loading ? "..." : "Send"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
