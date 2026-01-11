import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, PlayCircle, Star, Clock, Filter, ChevronRight } from 'lucide-react';
import { courses, currentUser } from '../../data/dummy';

// Reusable Components inside the page for brevity
const Nav = () => (
  <nav className="flex items-center justify-between py-6 px-8 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-12">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Lumina.</h1>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <a href="#" className="text-white">Discover</a>
        <a href="#" className="hover:text-white transition-colors">My Learning</a>
        <a href="#" className="hover:text-white transition-colors">Mentors</a>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="relative hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search courses..." 
          className="bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
        />
      </div>
      <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
      <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-700" />
    </div>
  </nav>
);

const HeroCard = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-12 group"
  >
    <img 
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" 
      alt="Hero" 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
    
    <div className="absolute bottom-0 left-0 p-12 max-w-2xl">
      <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Featured</span>
      <h2 className="text-5xl font-bold text-white mb-4 leading-tight">Mastering 3D Web Experiences</h2>
      <p className="text-slate-300 text-lg mb-8 line-clamp-2">Dive deep into Three.js, React Fiber, and WebGL to create immersive web applications that win awards.</p>
      
      <div className="flex gap-4">
        <button className="bg-white text-slate-950 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
          <PlayCircle className="w-5 h-5" /> Watch Trailer
        </button>
        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
          View Details
        </button>
      </div>
    </div>
  </motion.div>
);

const CourseCard = ({ course, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full"
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
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-white font-medium">{course.rating}</span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
      <p className="text-slate-500 text-sm mb-4">{course.instructor}</p>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
        <span className="text-white font-bold">{course.price}</span>
        <button className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1">
          Preview <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <Nav />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <HeroCard />
        
        {/* Filter Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Popular Courses</h2>
          <div className="flex gap-2">
            {['All', 'Design', 'Development', 'Marketing'].map((cat, i) => (
              <button 
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  i === 0 
                    ? 'bg-white text-slate-950 border-white' 
                    : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
            <button className="p-2 rounded-full border border-slate-800 text-slate-400 hover:text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
          {/* Duplicating for grid effect */}
          {courses.map((course, index) => (
            <CourseCard key={`dup-${course.id}`} course={{...course, id: `dup-${course.id}`}} index={index + 3} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;