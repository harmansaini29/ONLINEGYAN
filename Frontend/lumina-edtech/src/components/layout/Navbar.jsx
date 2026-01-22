import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wallet, User } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function Navbar({ showBack = false, title = "OnlineGyan." }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

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
    .catch(err => console.error("Failed to fetch balance:", err));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Load User & Initial Balance
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
        fetchBalance();
    }

    // 🔥 LISTEN for the update event from RefillCredits
    window.addEventListener("walletUpdated", fetchBalance);

    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("walletUpdated", fetchBalance);
    };
  }, []);

  const handleDashboardClick = () => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role === 'instructor') navigate('/instructor/dashboard');
    else navigate('/learner/marketplace');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? "bg-[#05060A]/90 backdrop-blur-xl border-white/5 py-3" : "bg-transparent border-transparent py-6"}`}>
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
          <span className="text-xl font-bold text-white tracking-tight hidden sm:block">{title}</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {[{ name: "Marketplace", path: "/marketplace" }, { name: "Mentors", path: "/mentors" }, { name: "Enterprise", path: "/enterprise" }].map((item) => (
            <button key={item.name} onClick={() => navigate(item.path)} className="px-6 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
             <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#13141f] border border-white/10 rounded-xl shadow-inner">
                    <div className="p-1 bg-emerald-500/20 rounded-md"><Wallet size={14} className="text-emerald-400" /></div>
                    <span className="text-sm text-white font-bold">${balance}</span>
                </div>

                <button onClick={handleDashboardClick} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
                    <User size={16} /> <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </button>
             </>
          ) : (
             <>
               <button onClick={() => navigate('/auth')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block">Sign In</button>
               <button onClick={() => navigate('/auth')} className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
                  Get Started
               </button>
             </>
          )}
        </div>
      </div>
    </nav>
  );
}