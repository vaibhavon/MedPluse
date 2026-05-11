import { useState, useRef, useEffect } from "react";
import { chatReplies } from "./chatData";
import { createAnalytics, updateAnalytics } from "./analytics";
import "./chatbot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 Welcome to Hospital Assistant." },
    { sender: "bot", text: "May I know your name?" }
  ]);

  const [input, setInput] = useState("");
  const [patientName, setPatientName] = useState("");
  const [analytics, setAnalytics] = useState(createAnalytics());

  const messagesEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 get reply
  const getBotReply = (userText) => {
    const text = userText.toLowerCase();

    for (let key in chatReplies) {
      if (text.includes(key)) {
        return chatReplies[key];
      }
    }

    return chatReplies.default;
  };

  // 🔹 send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };

    let botText = "";

    // 🧠 NAME MEMORY LOGIC
    if (!patientName) {
      setPatientName(input);
      botText = `Nice to meet you, ${input} 😊 How can I help you today?`;
    } else {
      botText = getBotReply(input);
    }

    const botMsg = { sender: "bot", text: botText };

    // 📊 update analytics
    let newAnalytics = updateAnalytics({ ...analytics }, "user");
    newAnalytics = updateAnalytics(newAnalytics, "bot");

    setAnalytics(newAnalytics);
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        💬 Hospital Help Bot
        {patientName && (
          <div style={{ fontSize: 12 }}>Patient: {patientName}</div>
        )}
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* 📊 ADMIN MINI PANEL */}
      <div className="chatbot-analytics">
        <div>📊 Total: {analytics.totalMessages}</div>
        <div>👤 User: {analytics.userMessages}</div>
        <div>🤖 Bot: {analytics.botMessages}</div>
        <div>⏱ Last: {analytics.lastActive || "--"}</div>
      </div>
    </div>
  );
}

export default ChatBot;
