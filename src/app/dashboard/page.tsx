"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReminderCard from "@/components/ReminderCard";
import { MapPin, MessageSquare, CheckCircle, Globe, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Dashboard() {
  const { user, login, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const progress = 65; // Mock progress percentage

  useEffect(() => {
    if (!user) login();
  }, [user, login]);

  useEffect(() => {
    const history = localStorage.getItem("votepath_chat");
    if (history) {
      const parsed = JSON.parse(history);
      const userQuestions = parsed.filter((m: {role: string, content: string}) => m.role === "user").slice(-3);
      setChatHistory(userQuestions);
    }
  }, []);

  if (!user) return <div className="min-h-screen bg-[#020c1b] flex justify-center items-center text-white">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#020c1b] pt-24 px-4 pb-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {user.name}</h1>
            <p className="text-cyan-300 mt-1 font-medium">Your personalized election command center.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#0a192f] border border-cyan-500/30 rounded-full px-4 py-2">
              <Globe className="w-4 h-4 text-cyan-400 mr-2" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "gu")}
                className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
              >
                <option className="bg-[#0a192f]" value="en">English</option>
                <option className="bg-[#0a192f]" value="hi">Hindi</option>
                <option className="bg-[#0a192f]" value="gu">Gujarati</option>
              </select>
            </div>
            <button 
              onClick={() => { logout(); router.push("/"); }}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Progress & Registration Status */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-8 border border-cyan-500/20 bg-gradient-to-br from-[#0a192f] to-[#020c1b] flex flex-col md:flex-row items-center gap-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-cyan-500/40 transition-colors"
            >
              {/* Circular Progress */}
              <div className="relative w-32 h-32 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 1000" }}
                    animate={{ strokeDasharray: `${(progress / 100) * 351.8} 1000` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    className="text-cyan-400" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">{progress}%</span>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider">Ready</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">Voter Status</h2>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                    Verified
                  </span>
                </div>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Your registration is active. You have completed the essential steps, but you should verify your polling location before Election Day.
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/#chat">
                  <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group cursor-pointer h-full">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-white font-semibold">Ask Assistant</h3>
                    <p className="text-xs text-gray-400 mt-2">Get instant answers via text or voice.</p>
                  </motion.div>
                </Link>
                <Link href="/#eligibility">
                  <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group cursor-pointer h-full">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold">Check Eligibility</h3>
                    <p className="text-xs text-gray-400 mt-2">Verify requirements for your state.</p>
                  </motion.div>
                </Link>
                <Link href="/#polling">
                  <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group cursor-pointer h-full">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-white font-semibold">Find Polling Booth</h3>
                    <p className="text-xs text-gray-400 mt-2">Locate your nearest voting center.</p>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Recent Activity / Chat History */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <h2 className="text-xl font-bold text-white mb-6">Saved Conversations</h2>
              {chatHistory.length > 0 ? (
                <ul className="space-y-4">
                  {chatHistory.map((chat, idx) => (
                    <li key={idx} className="bg-[#020c1b]/80 p-4 rounded-xl border border-white/5 flex gap-4 hover:border-cyan-500/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-gray-300 text-sm mt-1 italic">&quot;{chat.content}&quot;</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">No recent questions asked. Try asking the assistant!</p>
                </div>
              )}
            </motion.div>
            
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-8">
            <ReminderCard />
          </div>

        </div>
      </div>
    </div>
  );
}
