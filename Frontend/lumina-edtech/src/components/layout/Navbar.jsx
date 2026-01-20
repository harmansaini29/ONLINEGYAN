import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Navbar({ showBack = false, title = "OnlineGyan." }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Check for logged in user
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardClick = () => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role === 'instructor') navigate('/instructor/dashboard');
    else navigate('/learner/marketplace');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? "bg-[#05060A]/80 backdrop-blur-xl border-white/5 py-3" : "bg-transparent border-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          {showBack && (
            <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors mr-2">
               <ChevronLeft size={16} className="text-gray-400 group-hover:text-white" />
            </div>
          )}
          <div className="relative w-9 h-9 flex items-center justify-center">
             <div className="absolute inset-0 bg-indigo-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="relative w-full h-full bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center font-bold text-white shadow-inner text-lg">O</div>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">{title}</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {[
            { name: "Marketplace", path: "/marketplace" }, // Points to public browse
            { name: "Mentors", path: "/mentors" },
            { name: "Enterprise", path: "/enterprise" }
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => navigate(item.path)}
              className="px-6 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
             <button onClick={handleDashboardClick} className="group relative px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold overflow-hidden transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Go to Dashboard</span>
             </button>
          ) : (
             <>
               <button onClick={() => navigate('/auth')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</button>
               <button onClick={() => navigate('/auth')} className="group relative px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold overflow-hidden transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">Get Started</span>
               </button>
             </>
          )}
        </div>
      </div>
    </nav>
  );
}