import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Bell, 
  TrendingUp, 
  Star, 
  MoreVertical,
  Video
} from "lucide-react";

// --- Mock Data ---
const RECENT_COURSES = [
  { id: 1, title: "Advanced React Patterns", status: "Published", sales: 1240, rating: 4.9, earnings: "$12,400" },
  { id: 2, title: "UI/UX Design Masterclass", status: "Draft", sales: 0, rating: 0, earnings: "$0" },
  { id: 3, title: "Node.js Microservices", status: "Published", sales: 856, rating: 4.7, earnings: "$8,560" },
];

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" 
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`}
  >
    <Icon size={20} className={active ? "text-white" : "text-gray-500 group-hover:text-white transition-colors"} />
    <span className="font-medium text-sm">{label}</span>
    {active && <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />}
  </button>
);

const StatCard = ({ title, value, change, icon: Icon, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative p-6 rounded-2xl bg-white/5 border border-white/5 overflow-hidden backdrop-blur-sm"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${colorClass}`} />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl bg-white/5 ${colorClass.replace('bg-', 'text-')}`}>
          <Icon size={22} />
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
          <TrendingUp size={12} /> {change}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl lg:text-3xl font-bold text-white mt-1 tracking-tight">{value}</p>
    </div>
  </motion.div>
);

// Lightweight SVG Chart Component
const RevenueChart = () => (
  <div className="w-full h-64 relative">
    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid Lines */}
      {[0, 25, 50, 75, 100].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}
      {/* The Line */}
      <path 
        d="M0,80 C20,70 30,90 50,40 S80,20 100,10" 
        fill="none" 
        stroke="#6366f1" 
        strokeWidth="2" 
        vectorEffect="non-scaling-stroke"
      />
      {/* The Fill Area */}
      <path 
        d="M0,80 C20,70 30,90 50,40 S80,20 100,10 V100 H0 Z" 
        fill="url(#chartGradient)" 
        className="opacity-50"
      />
    </svg>
    
    {/* Tooltip Overlay (Mock) */}
    <div className="absolute top-[10%] left-[80%] bg-[#1A1B26] border border-white/10 px-3 py-2 rounded-lg shadow-xl transform -translate-x-1/2">
      <div className="text-xs text-gray-400">Today</div>
      <div className="text-sm font-bold text-indigo-400">$2,450</div>
    </div>
  </div>
);

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans flex overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0C15] flex-col hidden lg:flex relative z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white mr-3">L</div>
          <span className="text-xl font-bold tracking-tight">Lumina <span className="text-xs text-indigo-400 font-normal ml-1">Creator</span></span>
        </div>

        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-4">Main</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
          <SidebarItem icon={BookOpen} label="My Courses" active={activeTab === "Courses"} onClick={() => setActiveTab("Courses")} />
          <SidebarItem icon={Users} label="Students" active={activeTab === "Students"} onClick={() => setActiveTab("Students")} />
          <SidebarItem icon={DollarSign} label="Earnings" active={activeTab === "Earnings"} onClick={() => setActiveTab("Earnings")} />
          
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-8">System</div>
          <SidebarItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
        </div>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none" />

        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 lg:px-8 bg-[#0B0C15]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile Menu Trigger (Mock) */}
            <div className="w-8 h-8 bg-white/10 rounded-md" />
          </div>

          <div className="flex-1 max-w-xl mx-auto hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search courses, students, or analytics..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0C15]" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-white">Alex Morgan</div>
                <div className="text-xs text-gray-400">Senior Instructor</div>
              </div>
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-9 h-9 rounded-full border border-white/10" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 text-sm">Here's what's happening with your courses today.</p>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                <Plus size={18} />
                Create New Course
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard title="Total Revenue" value="$128,430" change="+12.5%" icon={DollarSign} colorClass="bg-emerald-500" />
              <StatCard title="Active Students" value="4,892" change="+8.2%" icon={Users} colorClass="bg-blue-500" />
              <StatCard title="Total Sales" value="12,234" change="+3.1%" icon={BookOpen} colorClass="bg-purple-500" />
              <StatCard title="Avg. Rating" value="4.9" change="+1.2%" icon={Star} colorClass="bg-yellow-500" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Earnings Chart Section */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white">Revenue Analytics</h3>
                  <select className="bg-black/30 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                <RevenueChart />
              </div>

              {/* Popular Courses / Activity */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="font-semibold text-white mb-6">Recent Courses</h3>
                <div className="space-y-4">
                  {RECENT_COURSES.map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                        <Video size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate group-hover:text-indigo-400 transition-colors">{course.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${course.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {course.status}
                          </span>
                          <span>• {course.sales} Sales</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">{course.earnings}</div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 mt-2 text-xs font-medium text-gray-400 hover:text-white border border-dashed border-white/10 hover:border-white/20 rounded-xl transition-all">
                    View All Courses
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}