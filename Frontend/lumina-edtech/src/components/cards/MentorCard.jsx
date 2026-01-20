import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Briefcase, MessageCircle, Calendar } from 'lucide-react';

export default function MentorCard({ mentor, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-[#13141f] border border-white/5 hover:border-indigo-500/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] flex flex-col h-full"
    >
      {/* Availability Badge */}
      <div className="absolute top-6 right-6 z-10">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold backdrop-blur-md ${
              mentor.available 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${mentor.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              {mentor.available ? 'Available' : 'Booked'}
          </div>
      </div>

      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-indigo-500/50 transition-colors">
              <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#0B0C15] p-1 rounded-lg border border-white/5">
               <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center text-[10px] font-bold">
                  {mentor.rating}
               </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
              {mentor.name}
              {mentor.rating >= 4.9 && <BadgeCheck size={16} className="text-blue-400" />}
          </h3>
          <p className="text-sm text-gray-400 font-medium">{mentor.role}</p>
          <div className="flex items-center gap-1 text-xs text-indigo-400 mt-1 font-medium">
               <Briefcase size={12} />
               {mentor.company}
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mentor.expertise.slice(0, 3).map((skill) => (
          <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 font-medium group-hover:bg-white/10 transition-colors">
            {skill}
          </span>
        ))}
        {mentor.expertise.length > 3 && (
            <span className="px-2 py-1.5 text-xs text-gray-500">+ {mentor.expertise.length - 3}</span>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6">
          <div className="text-center border-r border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rate</p>
              <p className="text-white font-bold">{mentor.hourlyRate}<span className="text-gray-600 text-xs font-normal">/hr</span></p>
          </div>
          <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reviews</p>
              <p className="text-white font-bold flex items-center justify-center gap-1">
                  {mentor.reviews} 
                  <span className="text-gray-600 text-xs font-normal">total</span>
              </p>
          </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex gap-3">
         <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5">
           <MessageCircle size={18} />
         </button>
         <button 
           disabled={!mentor.available}
           className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
             mentor.available 
               ? "bg-white text-black hover:bg-indigo-50 hover:scale-[1.02] shadow-lg shadow-white/5" 
               : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
           }`}
         >
           <Calendar size={16} />
           {mentor.available ? "Book Session" : "Waitlist"}
         </button>
      </div>
    </motion.div>
  );
}