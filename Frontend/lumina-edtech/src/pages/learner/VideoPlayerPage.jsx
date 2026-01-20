import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronDown, CheckCircle, Lock, BookOpen, FileText } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import AIStudyBuddy from "../../components/ai/AIStudyBuddy";
import { COURSES } from '../../data/mockData';
import NotesPanel from "../../components/features/NotesPanel"; // Import the new feature

export default function VideoPlayerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedModule, setExpandedModule] = useState(0);
  const [currentCourse, setCurrentCourse] = useState(null);
  
  // NEW: State for sidebar tab
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'notes'

  useEffect(() => {
    const course = COURSES.find(c => c.id === parseInt(courseId));
    if (course) {
      setCurrentCourse(course);
    } else {
      navigate('/learner/marketplace');
    }
  }, [courseId, navigate]);

  if (!currentCourse) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen bg-[#0B0C15] flex flex-col text-white overflow-hidden font-sans">
      {/* Header */}
      <nav className="h-16 bg-[#0B0C15]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <ChevronLeft className="text-gray-400 group-hover:text-white" size={20} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">{currentCourse.title}</h1>
            <p className="text-xs text-gray-400">Now Playing: Lesson 1</p>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Stage */}
        <main className="flex-1 bg-black relative flex flex-col items-center justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-indigo-900/20 blur-[100px] pointer-events-none opacity-50" />
          
          <img 
            src={currentCourse.thumbnail} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-60'}`} 
            alt="Video"
          />

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:bg-indigo-600"
          >
            {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-2" />}
          </motion.button>
          
          <AIStudyBuddy />
        </main>

        {/* Sidebar */}
        <aside className="w-96 bg-[#0B0C15] border-l border-white/5 flex flex-col z-10 overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex border-b border-white/5">
            <button 
                onClick={() => setActiveTab('curriculum')}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'curriculum' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <BookOpen size={16} /> Course
                {activeTab === 'curriculum' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
            </button>
            <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'notes' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <FileText size={16} /> Notes
                {activeTab === 'notes' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
            </button>
          </div>

          {/* Sidebar Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'curriculum' ? (
                <div>
                   {currentCourse.modules ? currentCourse.modules.map((module, idx) => (
                    <div key={idx} className="border-b border-white/5">
                      <button 
                        onClick={() => setExpandedModule(expandedModule === idx ? -1 : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-[#13141f] hover:bg-[#1A1B26] transition-colors"
                      >
                        <h4 className="text-sm font-semibold text-gray-200">{module.title}</h4>
                        <ChevronDown size={16} className={`text-gray-500 transition-transform ${expandedModule === idx ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedModule === idx && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-[#0B0C15]">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="px-6 py-4 flex items-start gap-4 hover:bg-white/5 cursor-pointer">
                                <div className="mt-1">
                                  {lesson.completed ? <CheckCircle size={14} className="text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-indigo-500" />}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-300">{lesson.title}</p>
                                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )) : <div className="p-6 text-gray-500">No content available</div>}
                </div>
            ) : (
                <NotesPanel onSeek={(time) => console.log(`Seeking to ${time}`)} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}