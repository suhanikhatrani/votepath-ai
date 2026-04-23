"use client";

import { useState, useEffect } from "react";
import { Calendar, Trash2, Plus, BellRing, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Reminder = {
  id: string;
  title: string;
  date: string;
  completed?: boolean;
};

export default function ReminderCard() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const suggestedReminders = [
    { title: "Registration Deadline", date: "2026-10-10" },
    { title: "Document Verification", date: "2026-10-20" },
    { title: "Election Day", date: "2026-11-05" },
  ];

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await fetch("/api/reminders");
      const data = await res.json();
      if (data.reminders) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setReminders(data.reminders.map((r: any) => ({ ...r, completed: false })));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addReminder = async (title: string, date: string) => {
    if (!title.trim() || !date) return;

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date })
      });
      const data = await res.json();
      if (data.success && data.reminder) {
        setReminders((prev) => [...prev, { ...data.reminder, completed: false }]);
        setNewTitle("");
        setNewDate("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleComplete = (id: string) => {
    setReminders((prev) => prev.map((r) => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-6 md:p-8 h-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col"
    >
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" /> Upcoming Deadlines
        </h3>
        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full font-bold">
          {reminders.filter(r => !r.completed).length} Pending
        </span>
      </div>

      {isLoading ? (
        <div className="text-gray-400 animate-pulse text-sm">Syncing with Google Calendar...</div>
      ) : (
        <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-3 scrollbar-hide">
          <AnimatePresence>
            {reminders.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                <BellRing className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No upcoming reminders.</p>
              </motion.div>
            ) : (
              reminders.map((reminder) => (
                <motion.div 
                  key={reminder.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`flex items-center justify-between bg-[#020c1b]/60 p-4 rounded-xl border transition-all ${reminder.completed ? 'border-green-500/30 opacity-50' : 'border-white/5 hover:border-cyan-500/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleComplete(reminder.id)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${reminder.completed ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-cyan-400'}`}
                    >
                      {reminder.completed && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <div>
                      <p className={`text-sm font-medium transition-colors ${reminder.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{reminder.title}</p>
                      <p className="text-cyan-400 text-xs mt-0.5 font-medium">{reminder.date}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeReminder(reminder.id)}
                    className="p-2 hover:bg-red-500/20 rounded-full group transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Recommended Reminders Section */}
      <div className="mb-6 pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recommended Reminders</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedReminders.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => addReminder(sug.title, sug.date)}
              className="text-xs bg-white/5 hover:bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> {sug.title}
            </button>
          ))}
        </div>
      </div>

      <form 
        onSubmit={(e) => { e.preventDefault(); addReminder(newTitle, newDate); }} 
        className="mt-auto space-y-3 pt-4 border-t border-white/10"
      >
        <input 
          type="text" 
          placeholder="Custom reminder title" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full bg-[#020c1b]/80 text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <div className="flex gap-2">
          <input 
            type="date" 
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="flex-1 bg-[#020c1b]/80 text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]"
          />
          <button 
            type="submit"
            disabled={!newTitle.trim() || !newDate}
            className="bg-cyan-600 text-white p-3 rounded-xl hover:bg-cyan-500 disabled:opacity-50 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
