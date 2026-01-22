import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, LogOut, Menu, Wallet } from "lucide-react";
import { INSTRUCTOR_SIDEBAR, LEARNER_SIDEBAR } from "../../data/mockData"; 
import { API_BASE_URL } from '../../config';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", role: "learner", avatar: "" });
  const [balance, setBalance] = useState(0); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 Helper to fetch fresh balance
  const fetchBalance = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE_URL}/auth/me`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.wallet_balance !== undefined) setBalance(data.wallet_balance);
    })
    .catch(console.error);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
        fetchBalance();
    }

    // 🔥 LISTEN for update event
    window.addEventListener("walletUpdated", fetchBalance);

    return () => {
        window.removeEventListener("walletUpdated", fetchBalance);
    };
  }, []);

  const role = user.role || 'learner';
  const sidebarItems = role === 'instructor' ? INSTRUCTOR_SIDEBAR : LEARNER_SIDEBAR;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // ... (SidebarContent component stays the same)
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
        <div className="h-24 flex items-center px-8 cursor-pointer" onClick={() => navigate('/')}>
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <span className="font-bold text-xl text-white">G</span>
             </div>
             <span className="text-xl font-bold tracking-tight text-white">ONLINEGYAN</span>
           </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
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
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-4">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* Desktop Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#030014]/50 backdrop-blur-xl hidden lg:flex flex-col relative z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                />
                <motion.aside 
                    initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="fixed inset-y-0 left-0 w-64 bg-[#0B0C15] border-r border-white/10 z-50 lg:hidden"
                >
                    <SidebarContent />
                </motion.aside>
            </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-transparent">
        <header className="h-20 flex items-center justify-between px-6 z-10 border-b border-white/5 bg-[#030014]/30 backdrop-blur-sm">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-end w-full gap-4 sm:gap-6">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-[#13141f] border border-white/10 rounded-xl shadow-inner">
                <div className="p-1 bg-emerald-500/20 rounded-md"><Wallet size={14} className="text-emerald-400" /></div>
                <span className="text-sm text-white font-bold">${balance}</span>
             </div>

             <button className="relative text-gray-400 hover:text-white transition-colors">
               <Bell size={20} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0B0C15]" />
             </button>
             
             <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                <div className="text-right hidden md:block">
                   <p className="text-sm font-bold text-white">{user.name}</p>
                   <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-indigo-600 flex items-center justify-center">
                   {user.avatar ? (
                       <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                   ) : (
                       <span className="font-bold text-white text-lg">{user.name.charAt(0)}</span>
                   )}
                </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </div>
  );
}