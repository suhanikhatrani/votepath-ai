"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const timelineEvents = [
  { id: 1, title: "Registration Opens", date: "Jan 15", completed: true },
  { id: 2, title: "Registration Deadline", date: "Oct 10", completed: true },
  { id: 3, title: "Candidate Announcement", date: "Oct 15", completed: false },
  { id: 4, title: "Early Voting", date: "Oct 25 - Nov 2", completed: false },
  { id: 5, title: "Election Day", date: "Nov 5", completed: false },
  { id: 6, title: "Results", date: "Nov 6", completed: false },
];

export default function ElectionTimeline() {
  return (
    <section className="py-20 px-4 bg-[#0a192f]/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Election <span className="text-cyan-400">Timeline</span>
        </h2>
        
        <div className="relative">
          {/* Main Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "35%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex md:flex-col items-center gap-4 md:w-1/6 group"
              >
                {/* Vertical Line for Mobile */}
                <div className="md:hidden absolute left-[15px] top-10 bottom-[-40px] w-0.5 bg-gray-800 z-0"></div>

                <div className="relative z-10 bg-[#0a192f] p-1 rounded-full">
                  {event.completed ? (
                    <CheckCircle2 className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                
                <div className="glass-card p-4 rounded-xl text-center w-full transform transition-transform group-hover:-translate-y-2">
                  <h3 className="font-semibold text-white text-sm md:text-base mb-1">{event.title}</h3>
                  <p className="text-xs text-cyan-300 font-medium">{event.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
