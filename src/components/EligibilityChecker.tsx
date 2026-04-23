"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    age: "",
    citizenship: "",
    residency: "",
    state: "",
  });

  const [result, setResult] = useState<{ status: "eligible" | "not_eligible"; reason: string; nextStep: string } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    const age = parseInt(formData.age);
    const isCitizen = formData.citizenship === "yes";
    const residencyYears = parseInt(formData.residency);

    if (!isCitizen) {
      setResult({
        status: "not_eligible",
        reason: "Voting requires active citizenship status.",
        nextStep: "Learn about the naturalization process if you plan to become a citizen.",
      });
      return;
    }

    if (age < 18) {
      setResult({
        status: "not_eligible",
        reason: `You must be 18 to vote. You are currently ${age}.`,
        nextStep: "You may be able to pre-register depending on your state! Check local guidelines.",
      });
      return;
    }

    if (residencyYears < 1) {
      setResult({
        status: "not_eligible",
        reason: "Most states require you to be a resident for a certain period before voting.",
        nextStep: "Verify the specific residency duration requirement for your state.",
      });
      return;
    }

    setResult({
      status: "eligible",
      reason: "You meet all basic Federal requirements to vote!",
      nextStep: "Proceed to voter registration or verify your current registration status.",
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quick <span className="text-cyan-400">Eligibility</span> Check
          </h2>
          <p className="text-gray-400">Not sure if you can vote? Find out in 10 seconds.</p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <form onSubmit={handleCheck} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-[#020c1b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State of Residence</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-[#020c1b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="e.g. Texas"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Are you a Citizen?</label>
                <select
                  required
                  value={formData.citizenship}
                  onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                  className="w-full bg-[#020c1b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 appearance-none"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Residency</label>
                <input
                  type="number"
                  required
                  value={formData.residency}
                  onChange={(e) => setFormData({ ...formData, residency: e.target.value })}
                  className="w-full bg-[#020c1b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Years lived in state"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0a192f] border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all"
            >
              Check Eligibility
            </button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                {result.status === "eligible" ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500/20 rounded-full shrink-0">
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-green-400 mb-1">You Are Eligible!</h4>
                        <p className="text-gray-300 mb-4">{result.reason}</p>
                        <div className="bg-[#020c1b]/50 p-4 rounded-xl">
                          <p className="text-sm text-cyan-300 font-semibold mb-1">Recommended Next Step:</p>
                          <p className="text-sm text-gray-300 flex items-center gap-2">
                            {result.nextStep} <ArrowRight className="w-4 h-4" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-yellow-500/20 rounded-full shrink-0">
                        <AlertTriangle className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-yellow-400 mb-1">Currently Not Eligible</h4>
                        <p className="text-gray-300 mb-4">{result.reason}</p>
                        <div className="bg-[#020c1b]/50 p-4 rounded-xl">
                          <p className="text-sm text-yellow-300 font-semibold mb-1">What you can do:</p>
                          <p className="text-sm text-gray-300 flex items-center gap-2">
                            {result.nextStep} <ArrowRight className="w-4 h-4" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
