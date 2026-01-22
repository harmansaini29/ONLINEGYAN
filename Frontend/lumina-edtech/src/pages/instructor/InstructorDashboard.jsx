import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, BookOpen, Plus, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../../components/ui/SpotlightCard";

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

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ revenue: 0, students: 0, rating: 0 });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // Get Name

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:9000/api/dashboard/instructor-stats", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if(!res.ok) throw new Error("Failed to fetch stats");
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8"><Loader className="animate-spin text-white" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user?.name}. Here's your daily breakdown.</p>
        </div>
        <button 
          onClick={() => navigate('/instructor/create-course')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          <Plus size={18} />
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget title="Total Revenue" value={`$${stats.revenue}`} change="+12.5%" icon={DollarSign} color="text-emerald-400" />
        <StatWidget title="Active Students" value={stats.students} change="+8.2%" icon={Users} color="text-blue-400" />
        <StatWidget title="Total Sales" value={stats.students} change="+3.1%" icon={BookOpen} color="text-purple-400" />
        <StatWidget title="Avg. Rating" value={stats.rating} change="+0.0%" icon={Users} color="text-yellow-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <SpotlightCard className="lg:col-span-2 p-6 min-h-[300px] flex flex-col justify-center items-center relative">
           <div className="absolute top-6 left-6 z-10">
             <h3 className="font-semibold text-white">Revenue Analytics</h3>
           </div>
           <div className="w-full h-48 flex items-end justify-between gap-2 px-4 mt-8">
              {/* This graph is still visual-only for now, but uses stats.revenue to scale vaguely if you wanted */}
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full bg-indigo-500/20 rounded-t-lg hover:bg-indigo-500 transition-all duration-300 relative group"
                />
              ))}
           </div>
           <div className="flex justify-between w-full px-4 mt-4 text-xs text-gray-500 uppercase font-medium">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
           </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 h-full">
            <h3 className="font-semibold text-white mb-6">Recent Courses</h3>
            {/* You can add a fetch for Recent Courses here later if you want */}
            <div className="text-gray-500 text-sm">Loading recent activity...</div>
        </SpotlightCard>
      </div>
    </div>
  );
}