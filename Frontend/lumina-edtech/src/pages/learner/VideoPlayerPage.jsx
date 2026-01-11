import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, Settings, Maximize, 
  ChevronLeft, CheckCircle, Lock, FileText, MessageSquare, 
  ChevronDown, Star, Bookmark, MoreVertical 
} from "lucide-react";
import AIStudyBuddy from "../../components/ai/AIStudyBuddy"; // Integrating our AI
import { COURSES } from "../../data/mockData"; // Assuming data is centralized

// --- Sub-Component: Video Controls ---
const VideoControls = ({ isPlaying, onPlayPause }) => (
  <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
    {/* Progress Bar */}
    <div className="group/timeline relative w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer hover:h-2 transition-all">
      <div className="absolute top-0 left-0 h-full w-[35%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      <div className="absolute top-1/2 -translate-y-1/2 left-[35%] w-3 h-3 bg-white rounded-full opacity-0 group-hover/timeline:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button 
          onClick={onPlayPause}
          className="text-white hover:text-indigo-400 transition-colors"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
        <div className="flex items-center gap-2 group/vol">
          <Volume2 size={20} className="text-gray-300 group-hover/vol:text-white" />
          <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
            <div className="w-16 h-1 bg-white/30 rounded-full ml-2">
              <div className="w-1/2 h-full bg-white rounded-full" />
            </div>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-300">04:20 / 12:45</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors"><Settings size={20} /></button>
        <button className="text-gray-400 hover:text-white transition-colors"><Maximize size={20} /></button>
      </div>
    </div>
  </div>
);

// --- Sub-Component: Sidebar Tabs ---
const TabButton = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all relative ${
      active ? "border-indigo-500 text-white" : "border-transparent text-gray-500 hover:text-gray-300"
    }`}
  >
    {label}
    {active && (
      <motion.div 
        layoutId="activeTab" 
        className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent" 
      />
    )}
  </button>
);

export default function VideoPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [expandedModule, setExpandedModule] = useState(0);

  // Mock Data injected directly for now, but should come from props/context
  const currentCourse = {
    title: "Advanced Product Design",
    lesson: "Lesson 3: User Research Methods",
    modules: [
      {
        title: "Module 1: Fundamentals",
        lessons: [
          { id: 1, title: "Intro to UX", duration: "10:05", completed: true },
          { id: 2, title: "Design Psychology", duration: "15:20", completed: true },
          { id: 3, title: "User Research Methods", duration: "12:45", current: true },
        ]
      },
      {
        title: "Module 2: Visual Hierarchy",
        lessons: [
          { id: 4, title: "Typography Mastery", duration: "18:30", locked: true },
          { id: 5, title: "Color Theory", duration: "22:15", locked: true },
        ]
      }
    ]
  };

  return (
    <div className="h-screen bg-[#0B0C15] flex flex-col text-white overflow-hidden selection:bg-indigo-500/30 font-sans">
      
      {/* --- Header --- */}
      <nav className="h-16 bg-[#0B0C15]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <ChevronLeft className="text-gray-400 group-hover:text-white transition-colors" size={20} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">{currentCourse.title}</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <p className="text-xs text-gray-400">{currentCourse.lesson}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-medium text-gray-300 mb-1">35% Complete</span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "35%" }} 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
              />
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Theater Stage */}
        <main className="flex-1 bg-black relative flex flex-col items-center justify-center group overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-indigo-900/20 blur-[100px] pointer-events-none opacity-50" />
          
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
            alt="Video"
          />

          {/* Big Central Play Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-[0_0_60px_rgba(99,102,241,0.3)] group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300"
          >
            {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-2" />}
          </motion.button>

          <VideoControls isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
          
          {/* AI COMPANION OVERLAY */}
          <AIStudyBuddy />
        </main>

        {/* Right: Smart Sidebar */}
        <aside className="w-96 bg-[#0B0C15] border-l border-white/5 flex flex-col z-10">
          
          <div className="flex border-b border-white/5 bg-[#0B0C15]/50 backdrop-blur-sm">
            {["Overview", "Curriculum", "Notes"].map((tab) => (
              <TabButton 
                key={tab} 
                label={tab} 
                active={activeTab === tab} 
                onClick={() => setActiveTab(tab)} 
              />
            ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-0">
            <AnimatePresence mode="wait">
              
              {/* --- CURRICULUM TAB --- */}
              {activeTab === "Curriculum" && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="pb-20"
                >
                  {currentCourse.modules.map((module, idx) => (
                    <div key={idx} className="border-b border-white/5 last:border-0">
                      <button 
                        onClick={() => setExpandedModule(expandedModule === idx ? -1 : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-[#13141f] hover:bg-[#1A1B26] transition-colors sticky top-0 z-10 border-y border-black/20"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-gray-200">{module.title}</h4>
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">{module.lessons.length} Lessons</p>
                        </div>
                        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${expandedModule === idx ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {expandedModule === idx && (
                          <motion.div 
                            initial={{ height: 0 }} 
                            animate={{ height: "auto" }} 
                            exit={{ height: 0 }} 
                            className="overflow-hidden bg-[#0B0C15]"
                          >
                            {module.lessons.map((lesson) => (
                              <div 
                                key={lesson.id} 
                                className={`relative px-6 py-4 flex items-start gap-4 hover:bg-white/5 cursor-pointer transition-all border-l-[3px] ${
                                  lesson.current 
                                    ? "border-indigo-500 bg-indigo-500/5" 
                                    : "border-transparent opacity-80 hover:opacity-100"
                                }`}
                              >
                                <div className="mt-1">
                                  {lesson.completed ? (
                                    <div className="bg-emerald-500/10 p-1 rounded-full"><CheckCircle size={14} className="text-emerald-500" /></div>
                                  ) : lesson.locked ? (
                                    <Lock size={16} className="text-gray-600" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-indigo-500 mt-1" />
                                  )}
                                </div>
                                <div>
                                  <p className={`text-sm font-medium leading-tight ${lesson.current ? "text-indigo-300" : "text-gray-300"}`}>
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                                    {lesson.current && <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20">Playing</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* --- OVERVIEW TAB --- */}
              {activeTab === "Overview" && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="p-6 space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white mb-2">About this lesson</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Deep dive into qualitative vs. quantitative research methods. We will explore how to conduct unbiased user interviews and synthesize data into actionable personas.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Resources</h3>
                    <div className="flex items-center gap-3 text-sm text-indigo-300 hover:text-white cursor-pointer transition-colors">
                      <FileText size={16} />
                      <span>Research_Template.fig</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-indigo-300 hover:text-white cursor-pointer transition-colors">
                      <FileText size={16} />
                      <span>Interview_Script.pdf</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </div>
  );
}