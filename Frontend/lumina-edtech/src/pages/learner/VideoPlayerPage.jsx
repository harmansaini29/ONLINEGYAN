import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, Settings, Maximize, 
  ChevronLeft, CheckCircle, Lock, FileText, MessageSquare, 
  ChevronDown, Star, Share2, Bookmark
} from "lucide-react";

// --- Mock Data ---
const COURSE_CONTENT = [
  {
    title: "Module 1: Fundamentals of UX",
    duration: "45 min",
    lessons: [
      { id: 1, title: "Introduction to User Experience", duration: "10:05", completed: true },
      { id: 2, title: "The Psychology of Design", duration: "15:20", completed: true },
      { id: 3, title: "User Research Methods", duration: "12:45", completed: false, current: true },
    ]
  },
  {
    title: "Module 2: Visual Hierarchy",
    duration: "1h 20min",
    lessons: [
      { id: 4, title: "Typography Mastery", duration: "18:30", completed: false, locked: true },
      { id: 5, title: "Color Theory in Depth", duration: "22:15", completed: false, locked: true },
    ]
  }
];

export default function VideoPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedModule, setExpandedModule] = useState(0);

  return (
    <div className="h-screen bg-[#0B0C15] flex flex-col text-white overflow-hidden">
      
      {/* --- NAV BAR --- */}
      <nav className="h-16 border-b border-white/5 bg-[#0B0C15] flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-white">Advanced Product Design</h1>
            <p className="text-xs text-gray-500">Lesson 3: User Research Methods</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[35%] h-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            </div>
            <span>35% Complete</span>
          </div>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
            Share
          </button>
        </div>
      </nav>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: Video Area (Flexible width) */}
        <main className="flex-1 flex flex-col bg-black relative">
          <div className="flex-1 relative flex items-center justify-center group">
            {/* Video Background (Simulated) */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
               <img 
                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600" 
                 className="w-full h-full object-cover opacity-50" 
                 alt="Video Thumbnail"
               />
            </div>
            
            {/* Big Play Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
            </motion.button>

            {/* Custom Controls Bar (Shows on Hover) */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent px-6 flex flex-col justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {/* Progress Line */}
               <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer relative group/timeline">
                 <div className="absolute top-0 left-0 h-full w-[24%] bg-indigo-500 rounded-full" />
                 <div className="absolute top-1/2 -translate-y-1/2 left-[24%] w-3 h-3 bg-white rounded-full opacity-0 group-hover/timeline:opacity-100 transition-opacity" />
               </div>
               
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause size={20} /> : <Play size={20} />}</button>
                   <span className="text-xs font-medium">04:20 / 12:45</span>
                   <Volume2 size={20} className="text-gray-400 hover:text-white" />
                 </div>
                 <div className="flex items-center gap-4">
                   <span className="px-2 py-1 rounded bg-black/50 text-xs font-bold border border-white/10">HD</span>
                   <Settings size={20} className="text-gray-400 hover:text-white" />
                   <Maximize size={20} className="text-gray-400 hover:text-white" />
                 </div>
               </div>
            </div>
          </div>
        </main>

        {/* RIGHT: Course Sidebar (Fixed width) */}
        <aside className="w-[400px] border-l border-white/5 bg-[#0B0C15] flex flex-col hidden lg:flex">
          
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {["Overview", "Curriculum", "Notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                  ? "border-indigo-500 text-white" 
                  : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            
            {/* Overview Tab Content */}
            {activeTab === "Overview" && (
              <div className="p-6 animate-in fade-in duration-300">
                <h2 className="text-xl font-bold mb-2">User Research Methods</h2>
                <div className="flex items-center gap-2 mb-6">
                   <div className="flex text-yellow-500">
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                   </div>
                   <span className="text-xs text-gray-400">(4.9/5)</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  In this lesson, we break down the fundamental methodologies of user research, including qualitative vs quantitative data, user interviews, and usability testing protocols.
                </p>
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FileText size={16} className="text-indigo-400" />
                    <span>Resources (3)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MessageSquare size={16} className="text-indigo-400" />
                    <span>Q&A (128)</span>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-500">Instructor</h3>
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full border border-white/10" alt="Instructor" />
                  <div>
                    <div className="text-sm font-bold text-white">Alex Morgan</div>
                    <div className="text-xs text-gray-400">Senior Product Designer @ Google</div>
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum Tab Content */}
            {activeTab === "Curriculum" && (
              <div className="animate-in fade-in duration-300">
                {COURSE_CONTENT.map((module, idx) => (
                  <div key={idx} className="border-b border-white/5 last:border-0">
                    <button 
                      onClick={() => setExpandedModule(expandedModule === idx ? -1 : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-left">
                         <h4 className="text-sm font-semibold text-white">{module.title}</h4>
                         <p className="text-xs text-gray-500 mt-1">{module.lessons.length} Lessons • {module.duration}</p>
                      </div>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform ${expandedModule === idx ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedModule === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {module.lessons.map((lesson) => (
                            <div 
                              key={lesson.id} 
                              className={`px-6 py-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors border-l-2 ${
                                lesson.current ? "border-indigo-500 bg-white/5" : "border-transparent"
                              }`}
                            >
                              <div className="mt-0.5">
                                {lesson.completed ? (
                                  <CheckCircle size={16} className="text-emerald-500" />
                                ) : lesson.locked ? (
                                  <Lock size={16} className="text-gray-600" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${lesson.current ? "text-indigo-400 font-medium" : "text-gray-300"}`}>
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{lesson.duration}</p>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Notes Tab Content */}
            {activeTab === "Notes" && (
               <div className="p-6 flex flex-col items-center justify-center h-64 text-center animate-in fade-in duration-300">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-500">
                   <Bookmark size={20} />
                 </div>
                 <h3 className="text-white font-medium mb-1">No Notes Yet</h3>
                 <p className="text-gray-500 text-sm mb-4">Click the bookmark icon at any timestamp to add a note.</p>
                 <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium">Create Note</button>
               </div>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
}