"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2, Mic, Volume2, MicOff, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistant() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("Speech recognition is not supported in this browser.");
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = language === "hi" ? "hi-IN" : language === "gu" ? "gu-IN" : "en-US";
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : language === "gu" ? "gu-IN" : "en-US";
    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const saved = localStorage.getItem("votepath_chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: language === "en" ? "Hello! I'm VotePath AI. How can I help you with the election today?" : 
                   language === "hi" ? "नमस्ते! मैं VotePath AI हूँ। मैं चुनाव के साथ आपकी कैसे मदद कर सकता हूँ?" : 
                   "નમસ્તે! હું VotePath AI છું. હું ચૂંટણીમાં તમને કેવી રીતે મદદ કરી શકું?",
        },
      ]);
    }
  }, [language]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("votepath_chat", JSON.stringify(messages));
    }
  }, [messages]);

  const suggestedQuestions = [
    "How do I register?",
    "What documents are needed?",
    "Where do I vote?",
    "When is election day?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, language }),
      });
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ask <span className="text-cyan-400">VotePath AI</span>
          </h2>
          <p className="text-gray-400">Speak or type your election questions for instant, personalized answers.</p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,255,255,0.1)] flex flex-col h-[600px] bg-gradient-to-b from-[#0a192f] to-[#020c1b]">
          {/* Chat Header */}
          <div className="bg-[#0a192f]/80 p-4 border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[1px]">
                <div className="w-full h-full bg-[#0a192f] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold">VotePath AI</h3>
                <p className="text-xs text-cyan-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Intelligent Civic Assistant
                </p>
              </div>
            </div>
            {messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
              <button 
                onClick={() => speakText(messages[messages.length - 1].content)}
                className="flex items-center gap-2 text-xs bg-white/5 hover:bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/30 transition-colors"
                title="Listen to latest answer"
                aria-label="Listen to answer"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                {isSpeaking ? "Stop" : "Listen"}
              </button>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === "user" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-[#0a192f] border border-cyan-500/50"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                </div>
                <div className={`px-4 py-3 text-sm md:text-base rounded-2xl max-w-[80%] shadow-lg ${msg.role === "user" ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none" : "bg-white/5 backdrop-blur-md text-gray-200 border border-white/10 rounded-tl-none"}`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0a192f] border border-cyan-500/50 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md text-gray-200 border border-white/10 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> Analyzing...
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {suggestedQuestions.map((q, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-full transition-all hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-[#0a192f]/90 border-t border-cyan-500/20 backdrop-blur-md">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="relative flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all ${isListening ? "bg-red-500 text-white animate-pulse shadow-[0_0_15px_red]" : "bg-white/5 text-cyan-400 hover:bg-cyan-500/20 border border-white/10"}`}
                aria-label="Speak your question"
                title="Speak your question"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or speak your question..."
                  className="w-full bg-[#020c1b] text-white border border-white/10 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 top-1 p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
