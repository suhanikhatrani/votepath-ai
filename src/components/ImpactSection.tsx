"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, UserPlus, HeartHandshake } from "lucide-react";

export default function ImpactSection() {
  const impacts = [
    {
      icon: <Lightbulb className="w-8 h-8 text-cyan-400" />,
      title: "Reduces Voter Confusion",
      desc: "Breaks down complex election processes into clear, actionable steps.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Improves Civic Participation",
      desc: "Empowers citizens to exercise their right to vote with confidence.",
    },
    {
      icon: <UserPlus className="w-8 h-8 text-indigo-400" />,
      title: "Supports First-Time Voters",
      desc: "Provides a personalized roadmap specifically designed for beginners.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-purple-400" />,
      title: "Accessible for All Citizens",
      desc: "Multilingual, voice-enabled, and designed with high contrast for everyone.",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#020c1b]">
      {/* Glow Effects */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">VotePath AI</span> Matters
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            We are on a mission to democratize election information and make voting frictionless.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
