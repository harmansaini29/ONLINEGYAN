import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Search, Bell, Menu } from "lucide-react";
import { SIDEBAR_ITEMS, CURRENT_USER } from "../../data/mockData"; // Using centralized data

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#0B0C15] flex-col hidden lg:flex relative z-20">
        <div className="h-24 flex items-center px-8">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <span className="font-bold text-xl">L</span>
             </div>
             <span className="text-xl font-bold tracking-tight">Lumina.</span>
           </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon size={20} className="relative z-10" />
                  <span className="font-medium text-sm relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* User Mini Profile in Sidebar */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5">
          <div className="flex items-center gap-3">
            <img src={CURRENT_USER.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="User" />
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold truncate">{CURRENT_USER.name}</h4>
              <p className="text-xs text-indigo-400 truncate">{CURRENT_USER.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
        
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 z-10">
          <div className="relative w-96 hidden md:block group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
             <input 
               type="text" 
               placeholder="Search anything..." 
               className="w-full bg-[#1A1B26] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
             />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
          <Outlet /> {/* Renders the child route (InstructorDashboard etc) */}
        </div>

      </main>
    </div>
  );
}