"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Answer a few questions",
      desc: "Tell us your age, state, and voting history in a quick 30-second onboarding.",
    },
    {
      num: "02",
      title: "Get Personalized Guidance",
      desc: "Receive a tailored roadmap with exact deadlines and requirements for your state.",
    },
    {
      num: "03",
      title: "Complete Your Journey",
      desc: "Use our tools to register, find your polling station, and cast your ballot.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#0a192f]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            How It <span className="text-cyan-400">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to go from confused to confident voter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-[#020c1b] border-4 border-[#0a192f] shadow-[0_0_30px_rgba(6,182,212,0.15)] flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 group-hover:border-cyan-500/50">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600">
                  {step.num}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
