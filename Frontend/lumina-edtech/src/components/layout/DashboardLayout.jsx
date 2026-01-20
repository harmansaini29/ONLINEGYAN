import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, LogOut } from "lucide-react";
import { INSTRUCTOR_SIDEBAR, LEARNER_SIDEBAR, CURRENT_USER } from "../../data/mockData"; 

export default function DashboardLayout() {
  const navigate = useNavigate();
  const storedRole = JSON.parse(localStorage.getItem("role"));
  const role = storedRole || CURRENT_USER.role;
  
  // Interface Logic: Different Sidebar for Instructor vs Learner
  const sidebarItems = role === 'instructor' ? INSTRUCTOR_SIDEBAR : LEARNER_SIDEBAR;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate('/');
  };

  return (
    // Changed bg-[#0B0C15] to bg-transparent
    <div className="min-h-screen bg-transparent text-white font-sans flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* Sidebar - Added subtle backdrop blur */}
      <aside className="w-72 border-r border-white/5 bg-[#030014]/50 backdrop-blur-xl flex-col hidden lg:flex relative z-20">
        <div className="h-24 flex items-center px-8 cursor-pointer" onClick={() => navigate('/')}>
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <span className="font-bold text-xl">G</span>
             </div>
             <span className="text-xl font-bold tracking-tight">ONLINEGYAN</span>
           </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {sidebarItems.map((item) => (
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
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-4"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-transparent">
        {/* Header - Transparent with blur */}
        <header className="h-24 flex items-center justify-end px-8 z-10 border-b border-white/5 bg-[#030014]/30 backdrop-blur-sm">
          <div className="flex items-center gap-6">
             <button className="relative text-gray-400 hover:text-white transition-colors">
               <Bell size={20} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0B0C15]" />
             </button>
             
             <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                <div className="text-right hidden md:block">
                   <p className="text-sm font-bold text-white">{CURRENT_USER.name}</p>
                   <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                   <img src={CURRENT_USER.avatar} alt="User" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </div>
  );
}