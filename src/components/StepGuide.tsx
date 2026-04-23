"use client";

import { motion } from "framer-motion";
import { UserCheck, FileSignature, FileSearch, MapPin, CheckSquare } from "lucide-react";

const steps = [
  { id: 1, title: "Check eligibility", icon: UserCheck, desc: "Verify you meet age and citizenship requirements." },
  { id: 2, title: "Register", icon: FileSignature, desc: "Complete your voter registration online or via mail." },
  { id: 3, title: "Verify details", icon: FileSearch, desc: "Confirm your information matches your ID exactly." },
  { id: 4, title: "Find polling station", icon: MapPin, desc: "Locate your assigned voting center before election day." },
  { id: 5, title: "Cast vote", icon: CheckSquare, desc: "Show up, verify ID, and make your voice heard." },
];

export default function StepGuide() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How to <span className="text-blue-400">Vote</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A simple 5-step guide to ensure your registration is valid and your vote is counted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-[#0a192f] border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Step {step.id}</h3>
                <h4 className="text-cyan-300 font-medium mb-3">{step.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
