"use client";

import { motion } from "framer-motion";
import { Globe2, Mic, UserCheck, BellRing, Server } from "lucide-react";

export default function InnovationSection() {
  const innovations = [
    {
      icon: <Globe2 className="w-6 h-6 text-indigo-400" />,
      title: "Multilingual Accessibility",
      desc: "Built-in language support ensures diverse populations can navigate the election process.",
    },
    {
      icon: <Mic className="w-6 h-6 text-blue-400" />,
      title: "Voice Interaction",
      desc: "Web Speech API integration provides an inclusive, hands-free civic assistant experience.",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-400" />,
      title: "Personalized Onboarding",
      desc: "Dynamically generates user journeys based on state laws, age, and voter history.",
    },
    {
      icon: <BellRing className="w-6 h-6 text-yellow-400" />,
      title: "Smart Reminders",
      desc: "Proactively suggests critical deadlines tailored to the user's specific election timeline.",
    },
    {
      icon: <Server className="w-6 h-6 text-red-400" />,
      title: "Scalable Architecture",
      desc: "Built on Next.js 14 App Router with Prisma, designed for high traffic and enterprise scale.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#020c1b] to-[#0a192f]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            What Makes <span className="text-indigo-400">VotePath AI</span> Different
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A technical showcase of features designed to impress users and judges alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#020c1b] border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
