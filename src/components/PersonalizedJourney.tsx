"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, User, MapPin, Calendar, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PersonalizedJourney() {
  const [step, setStep] = useState(0);
  const { setLanguage } = useLanguage();
  
  const [formData, setFormData] = useState({
    age: "",
    state: "",
    firstTime: "",
    registered: "",
    lang: "en",
  });

  const handleNext = () => setStep((prev) => prev + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLanguage(formData.lang as "en" | "hi" | "gu");
    setStep(2); // Move to results
  };

  const getRecommendations = () => {
    const isUnderage = parseInt(formData.age) < 18;
    const isRegistered = formData.registered === "yes";

    if (isUnderage) {
      return {
        status: "Future Voter",
        action: "Pre-register if your state allows it, and learn about the process.",
        progress: 20,
      };
    }
    if (!isRegistered) {
      return {
        status: "Action Required",
        action: `Register to vote immediately in ${formData.state || "your state"}.`,
        progress: 40,
      };
    }
    return {
      status: "Ready to Vote",
      action: "Check your polling location and set a calendar reminder for Election Day.",
      progress: 80,
    };
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Personalize Your <span className="text-cyan-400">Journey</span>
          </h2>
          <p className="text-gray-400">Let us guide you step-by-step based on your unique profile.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-10 border border-cyan-500/20 relative overflow-hidden bg-gradient-to-br from-[#0a192f] to-[#020c1b]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
          
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Build Your Voting Profile</h3>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  Take a 30-second quiz to get a customized roadmap for the upcoming election.
                </p>
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 mx-auto"
                >
                  Start Journey <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                onSubmit={handleSubmit}
                className="space-y-6 max-w-xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-400"/> Age</label>
                    <input
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-[#020c1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="e.g. 18"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400"/> State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#020c1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="e.g. California"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First-time voter?</label>
                    <select
                      value={formData.firstTime}
                      onChange={(e) => setFormData({ ...formData, firstTime: e.target.value })}
                      className="w-full bg-[#020c1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Already Registered?</label>
                    <select
                      value={formData.registered}
                      onChange={(e) => setFormData({ ...formData, registered: e.target.value })}
                      className="w-full bg-[#020c1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"><Globe className="w-4 h-4 text-cyan-400"/> Preferred Language</label>
                  <select
                    value={formData.lang}
                    onChange={(e) => setFormData({ ...formData, lang: e.target.value })}
                    className="w-full bg-[#020c1b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 appearance-none"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="gu">Gujarati</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!formData.age || !formData.state}
                  className="w-full bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cyan-500 transition-colors disabled:opacity-50"
                >
                  Generate Roadmap
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Your Election Journey</h3>
                  <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold border border-cyan-500/30">
                    {getRecommendations().status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Preparation</span>
                    <span>Ready</span>
                  </div>
                  <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getRecommendations().progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 blur-sm animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                <div className="bg-[#020c1b]/80 border border-white/10 p-6 rounded-2xl mb-8">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" /> Recommended Action
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {getRecommendations().action}
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => setStep(0)}
                    className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    Go to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
