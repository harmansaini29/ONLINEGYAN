import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, BookOpen, Video, Plus } from "lucide-react";
import SpotlightCard from "../../components/ui/SpotlightCard";
import { COURSES, CURRENT_USER } from "../../data/mockData";

// --- Sub-Components ---
const StatWidget = ({ title, value, change, icon: Icon, color }) => (
  <SpotlightCard className="p-6">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
        <Icon size={22} />
      </div>
      <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
        <TrendingUp size={12} /> {change}
      </span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium relative z-10">{title}</h3>
    <p className="text-3xl font-bold text-white mt-1 tracking-tight relative z-10">{value}</p>
  </SpotlightCard>
);

const RecentCourseRow = ({ course }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5"
  >
    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
      <img src={course.thumbnail} alt="" className="w-full h-full object-cover rounded-lg opacity-80" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-white truncate">{course.title}</h4>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
        <span className={`w-2 h-2 rounded-full ${course.status === 'Published' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
        {course.sales} Sales
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-bold text-white">{course.earnings}</div>
    </div>
  </motion.div>
);

export default function InstructorDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">Welcome back, {CURRENT_USER.name}. Here's your daily breakdown.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
          <Plus size={18} />
          Create New Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget title="Total Revenue" value={CURRENT_USER.stats.revenue} change="+12.5%" icon={DollarSign} color="text-emerald-400" />
        <StatWidget title="Active Students" value={CURRENT_USER.stats.students} change="+8.2%" icon={Users} color="text-blue-400" />
        <StatWidget title="Total Sales" value="1,234" change="+3.1%" icon={BookOpen} color="text-purple-400" />
        <StatWidget title="Avg. Rating" value={CURRENT_USER.stats.rating} change="+1.2%" icon={Users} color="text-yellow-400" />
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <SpotlightCard className="lg:col-span-2 p-6 min-h-[300px] flex flex-col justify-center items-center relative">
           <div className="absolute top-6 left-6 z-10">
             <h3 className="font-semibold text-white">Revenue Analytics</h3>
           </div>
           {/* Placeholder for complex chart - Using CSS to simulate for performance */}
           <div className="w-full h-48 flex items-end justify-between gap-2 px-4 mt-8">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full bg-indigo-500/20 rounded-t-lg hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h}k
                  </div>
                </motion.div>
              ))}
           </div>
           <div className="flex justify-between w-full px-4 mt-4 text-xs text-gray-500 uppercase font-medium">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
           </div>
        </SpotlightCard>

        {/* Recent Activity */}
        <div className="space-y-6">
          <SpotlightCard className="p-6 h-full">
            <h3 className="font-semibold text-white mb-6">Recent Courses</h3>
            <div className="space-y-2">
              {COURSES.slice(0, 3).map((course) => (
                <RecentCourseRow key={course.id} course={course} />
              ))}
            </div>
            <button className="w-full py-3 mt-6 text-xs font-medium text-gray-400 hover:text-white border border-dashed border-white/10 hover:border-white/20 rounded-xl transition-all">
              View All Analytics
            </button>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}