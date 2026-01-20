import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { MENTORS } from '../../data/mockData';
import MentorCard from '../../components/cards/MentorCard';

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

  const allSkills = useMemo(() => {
      const skills = new Set(MENTORS.flatMap(m => m.expertise));
      return ["All", ...Array.from(skills)];
  }, []);

  const filteredMentors = useMemo(() => {
    let result = MENTORS.filter(mentor => {
        const matchesSearch = 
            mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSkill = selectedSkill === "All" || mentor.expertise.includes(selectedSkill);
        return matchesSearch && matchesSkill;
    });

    return result.sort((a, b) => {
        if (sortBy === "popularity") return b.reviews - a.reviews;
        const priceA = parseInt(a.hourlyRate.replace('$', '').replace(',', ''));
        const priceB = parseInt(b.hourlyRate.replace('$', '').replace(',', ''));
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        return 0;
    });
  }, [searchQuery, selectedSkill, sortBy]);

  return (
    <div className="min-h-screen">      
      {/* Hero Search Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Master your craft with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Industry Legends.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book 1-on-1 video sessions with engineers, founders, and leaders from the world's top companies.
            </p>

            <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-[#13141f] border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
                    <Search className="ml-4 text-gray-400" size={20} />
                    <input 
                        type="text"
                        placeholder="Search by skill (e.g. React), name, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-gray-500 text-sm md:text-base"
                    />
                    <div className="hidden md:flex gap-2 pr-2">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white/5 text-xs font-medium text-gray-300 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:bg-white/10 cursor-pointer hover:text-white"
                        >
                            <option value="popularity">🔥 Popular</option>
                            <option value="price-low">💰 Price: Low</option>
                            <option value="price-high">💎 Price: High</option>
                        </select>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sticky top-20 z-40 py-4 bg-[#05060A]/95 backdrop-blur">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                <div className="p-2 bg-white/5 rounded-lg mr-2">
                    <Filter size={16} className="text-gray-400" />
                </div>
                {allSkills.slice(0, 6).map((skill) => (
                    <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                            selectedSkill === skill
                            ? "bg-white text-black shadow-lg shadow-white/10"
                            : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {skill}
                    </button>
                ))}
            </div>
            
            <p className="text-sm text-gray-500">
                Showing <span className="text-white font-bold">{filteredMentors.length}</span> mentors
            </p>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMentors.map((mentor, index) => (
               <MentorCard key={mentor.id} mentor={mentor} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}