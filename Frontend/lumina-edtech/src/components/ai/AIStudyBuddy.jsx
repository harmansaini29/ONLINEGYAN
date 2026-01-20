import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot } from 'lucide-react';

export default function AIStudyBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Namaste! I'm Gyan AI. I'm analyzing this video. Ask me to summarize the key points or explain a concept!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "That's a great question. Based on the current timestamp, the instructor is explaining the core concept of State Management." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 bg-[#1A1B26]/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-white" size={20} />
                <span className="font-bold text-white text-sm">Gyan AI Tutor</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={16} />
              </button>
            </div>
            {/* Chat Area & Input (Same as before) */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-black/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this lesson..."
                className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
                <Send size={14} className="text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-all ${
          isOpen ? 'bg-gray-700 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
        }`}
      >
        <Sparkles size={24} className={isOpen ? "" : "animate-pulse"} />
      </motion.button>
    </div>
  );
}