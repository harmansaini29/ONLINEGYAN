import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, index }) {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/course/watch/${course.id}`)}
      className="group bg-[#13141f] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">{course.category}</span>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-white font-medium">{course.rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{course.instructor}</p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-white font-bold">{course.price}</span>
          <button className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
            Preview <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}