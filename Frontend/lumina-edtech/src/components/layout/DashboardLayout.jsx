// src/components/layout/DashboardLayout.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, BookOpen, Users, DollarSign, Settings, LogOut, 
  Bell, Search, Menu, X
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/instructor/dashboard" },
  { icon: BookOpen, label: "My Courses", path: "/instructor/courses" },
  { icon: Users, label: "Students", path: "/instructor/students" },
  { icon: DollarSign, label: "Earnings", path: "/instructor/earnings" },
  { icon: Settings, label: "Settings", path: "/instructor/settings" },
];

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans flex overflow-hidden">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0C15] flex-col hidden lg:flex relative z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white mr-3">L</div>
           <span className="text-xl font-bold tracking-tight">Lumina</span>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group ${
                  isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#0B0C15]/80 backdrop-blur-md sticky top-0 z-10">
          <button className="lg:hidden text-gray-400" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="hidden md:flex flex-1 max-w-xl mx-auto relative px-4">
             <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
             <input 
               type="text" 
               placeholder="Search..." 
               className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50"
             />
          </div>

          <div className="flex items-center gap-4 ml-auto">
             <button className="relative p-2 text-gray-400 hover:text-white">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
             </button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/20" />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}