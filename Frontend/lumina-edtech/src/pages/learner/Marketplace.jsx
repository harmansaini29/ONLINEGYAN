import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, PlayCircle, Star, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COURSES, CURRENT_USER } from '../../data/mockData';

// --- 1. Navbar Component (Updated for White-Pinkish Theme & Functional Links) ---
const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between py-6 px-8 sticky top-0 z-50 bg-pink-50/90 backdrop-blur-md border-b border-pink-200/50 shadow-sm">
      <div className="flex items-center gap-12">
        {/* Logo Text - Click to go home */}
        <h1 
          onClick={() => navigate('/')}
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
        >
          Lumina.
        </h1>
        
        {/* Navigation Links - FIXED */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <button onClick={() => navigate('/learner/marketplace')} className="text-slate-900 font-semibold">Discover</button>
          <button onClick={() => navigate('/learner/my-learning')} className="hover:text-indigo-600 transition-colors">My Learning</button>
          <button onClick={() => navigate('/mentors')} className="hover:text-indigo-600 transition-colors">Mentors</button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="bg-white border border-pink-200 rounded-full py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 w-64 shadow-sm"
          />
        </div>
        
        {/* Icons */}
        <Bell className="w-5 h-5 text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors" />
        
        <img src={CURRENT_USER.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" />
      </div>
    </nav>
  );
};

// --- 2. Course Card Component ---
const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/course/watch/${course.id}`)}
      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full cursor-pointer"
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
};

// --- 3. Main Marketplace Page ---
export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <Nav />
      <main className="max-w-7xl mx-auto px-8 py-8">
        
        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-white">Explore Courses</h2>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button className="p-2 rounded-full border border-slate-800 text-slate-400 hover:text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Design', 'Development', 'Marketing'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-white text-slate-950 border-white' 
                  : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            No courses found matching your criteria.
          </div>
        )}
      </main>
    </div>
  );
}