import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { COURSES } from '../../data/mockData';
import CourseCard from '../../components/cards/CourseCard';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  
  // Detect if we are in Public View or Dashboard View
  const location = useLocation();
  const isPublicView = location.pathname === '/marketplace';

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // Dynamic Padding: pt-32 for Public (to clear Navbar), pt-8 for Dashboard
    <div className={`pb-20 ${isPublicView ? 'pt-32 px-6 max-w-7xl mx-auto' : 'pt-8'}`}>
        
        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
             <h2 className="text-3xl font-bold text-white">Explore Courses</h2>
             <p className="text-gray-400 text-sm mt-1">Discover new skills to level up your career.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80 group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A1B26] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
            <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
                className="p-3 rounded-xl border border-white/10 bg-[#1A1B26] text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Clear Filters"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Design', 'Development', 'Marketing'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-[#1A1B26]/50 rounded-2xl border border-white/5">
            <p>No courses found matching your criteria.</p>
            <button onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="text-indigo-400 text-sm mt-2 hover:underline">Clear filters</button>
          </div>
        )}
    </div>
  );
}