import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Calendar, Briefcase, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MENTORS } from '../../data/mockData';

// Simple Navbar for this page
const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between py-6 px-8 bg-[#0B0C15] border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Find a Mentor</h1>
      </div>
      <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white text-sm font-semibold hover:bg-indigo-500">
        Become a Mentor
      </button>
    </nav>
  );
};

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans">
      <Nav />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Master your craft with the best.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Book 1-on-1 sessions with industry leaders from top companies like Google, Meta, and Netflix.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full border-2 border-indigo-500/30" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                    <p className="text-sm text-gray-400">{mentor.role}</p>
                    <p className="text-xs text-indigo-400 font-medium mt-1">{mentor.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold">{mentor.rating}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mentor.expertise.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Area */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div>
                  <span className="text-xl font-bold text-white">{mentor.hourlyRate}</span>
                  <span className="text-xs text-gray-500"> / hour</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                    <MessageCircle size={20} />
                  </button>
                  <button 
                    disabled={!mentor.available}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                      mentor.available 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Calendar size={16} />
                    {mentor.available ? "Book Now" : "Fully Booked"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}