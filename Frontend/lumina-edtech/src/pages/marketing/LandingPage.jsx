import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// 1. Functional Navbar Component
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0C15]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Click to refresh/home */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white">L</div>
          <span className="text-xl font-bold text-white tracking-tight">Lumina</span>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => navigate('/learner/marketplace')} className="hover:text-white transition-colors">Courses</button>
          <button onClick={() => navigate('/mentors')} className="hover:text-white transition-colors">Mentors</button>
          <button onClick={() => navigate('/pricing')} className="hover:text-white transition-colors">Pricing</button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/auth')}
            className="text-sm font-medium text-white hover:text-indigo-300 transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/auth')} 
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Join Free
          </button>
        </div>
      </div>
    </nav>
  );
};

// 2. Simple Feature Card
const FeatureCard = ({ title, desc, icon: Icon }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all group hover:-translate-y-1">
    <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/30 transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

// 3. Main Page Logic
export default function LandingPage() {
  const navigate = useNavigate();

  // Smart Redirection Logic
  const handleStartLearning = () => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem("user"));
    const role = JSON.parse(localStorage.getItem("role")); // "learner" or "instructor"

    if (user && role === "learner") {
      navigate('/learner/marketplace'); // Student goes to course catalog
    } else if (user && role === "instructor") {
      navigate('/instructor/dashboard'); // Teacher goes to dashboard
    } else {
      navigate('/auth'); // New user goes to login/signup
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Mesh */}
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-indigo-900/20 to-transparent opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              New Platform v2.0
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Master your craft <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                with the elite.
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Experience a learning platform designed for the modern era.
              Cinema-quality courses, interactive mentorship, and a community of high-performers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStartLearning}
                className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-[0_0_40px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2"
              >
                Start Learning <ArrowRight size={18} />
              </button>
              
              <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 text-white font-semibold transition-all flex items-center justify-center gap-2 group">
                <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
                Watch Trailer
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0B0C15] bg-gray-700 flex items-center justify-center overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Joined by 10,000+ creators this week</p>
            </div>
          </motion.div>

          {/* Right Visual (3D Tilt Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl rotate-y-12 rotate-x-6 transform transition-transform duration-500 hover:rotate-0">
              {/* Mock UI Header */}
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="h-2 w-20 bg-white/10 rounded-full" />
              </div>

              {/* Mock Video Player */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-800 to-black relative overflow-hidden mb-4 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
                  alt="Course"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play size={24} className="fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Mock Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="h-2 w-12 bg-indigo-500/50 rounded-full mb-2" />
                  <div className="h-4 w-24 bg-white/20 rounded-full" />
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="h-2 w-12 bg-purple-500/50 rounded-full mb-2" />
                  <div className="h-4 w-24 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-[#0B0C15] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Top Creators Choose Lumina</h2>
            <p className="text-gray-400">Everything you need to build, sell, and manage your knowledge empire.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Crystal Clear Video"
              desc="Adaptive streaming up to 4K HDR. Your content deserves the best presentation possible."
              icon={Play}
            />
            <FeatureCard
              title="Interactive Notes"
              desc="Learners can take time-stamped notes, highlight transcripts, and ask AI for summaries."
              icon={CheckCircle}
            />
            <FeatureCard
              title="Global Payments"
              desc="Accept payments in 135+ currencies with instant payouts. No hidden transaction fees."
              icon={Star}
            />
          </div>
        </div>
      </section>
    </div>
  );
}