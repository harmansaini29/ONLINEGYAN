import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Award, MoreHorizontal } from 'lucide-react';
import { ENROLLED_COURSES } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function MyLearning() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Learning</h1>
        <p className="text-gray-400">Track your progress and pick up where you left off.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2 bg-white/20 rounded-lg"><Clock size={20} /></div>
             <span className="text-xs font-medium bg-black/20 px-2 py-1 rounded">Weekly Goal</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">12.5 hrs</h3>
          <p className="text-indigo-100 text-sm">You're crushing your goal!</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A1B26] border border-white/10">
          <div className="flex justify-between items-start mb-4">
             <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Award size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">4</h3>
          <p className="text-gray-400 text-sm">Certificates Earned</p>
        </div>
      </div>

      {/* Course List */}
      <h2 className="text-xl font-bold text-white mb-6">In Progress</h2>
      <div className="space-y-4">
        {ENROLLED_COURSES.map((course) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-[#13141f] border border-white/5 hover:border-indigo-500/30 transition-all"
          >
            {/* Thumbnail */}
            <div className="w-full md:w-48 h-28 rounded-xl overflow-hidden relative shrink-0">
               <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => navigate(`/course/watch/${course.id}`)} className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform">
                   <Play size={20} fill="currentColor" />
                 </button>
               </div>
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                   <p className="text-sm text-gray-500">{course.instructor}</p>
                 </div>
                 <button className="text-gray-500 hover:text-white"><MoreHorizontal size={20} /></button>
               </div>

               {/* Progress Bar */}
               <div className="mt-4">
                 <div className="flex justify-between text-xs mb-2">
                   <span className="text-gray-400">{course.progress}% Complete</span>
                   <span className="text-gray-400">{course.completedLessons}/{course.totalLessons} Lessons</span>
                 </div>
                 <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                     style={{ width: `${course.progress}%` }}
                   />
                 </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}