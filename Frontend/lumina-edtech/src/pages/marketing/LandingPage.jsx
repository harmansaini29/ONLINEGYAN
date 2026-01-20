import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Zap, Globe, Shield, Cpu, Code, BarChart3, Mic, Layers, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Components
import HeroTiltCard from '../../components/ui/HeroTiltCard';
import CodeSimulation from '../../components/visuals/CodeSimulation';
import LogoMarquee from '../../components/ui/LogoMarquee';

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 500], [0, 100]);
  const [activeTab, setActiveTab] = useState('learners');

  return (
    <>
      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden perspective-1000">
        
        {/* Animated 3D Floor - Subtle Grid Movement */}
        <motion.div 
            style={{ y: gridY, rotateX: "60deg", scale: 2.5 }}
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </motion.div>

        {/* Cinematic Spotlights */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Typography */}
            <div className="text-center lg:text-left">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-[10px] font-bold tracking-widest uppercase mb-6 backdrop-blur-xl shadow-lg shadow-indigo-500/10">
                      <Zap size={10} fill="currentColor" /> ONLINEGYAN SYSTEM 
                   </div>

                   <h1 className="text-6xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
                      <span className="block text-white drop-shadow-2xl">Learn at</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200 animate-gradient-x">
                        Warp Speed.
                      </span>
                   </h1>
                   
                   <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                      The all-in-one ecosystem for the next generation of builders. 
                      Interactive labs, AI mentorship, and global certification in one platform.
                   </p>

                   <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button onClick={() => navigate('/auth')} className="px-8 py-4 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
                         Start Learning Free <ArrowRight size={16} />
                      </button>
                      <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all text-white flex items-center justify-center gap-2 backdrop-blur-md">
                         <Play size={16} fill="white" /> Instructor Demo
                      </button>
                   </div>
                </motion.div>
            </div>

            {/* Visual */}
            <div className="hidden lg:block relative perspective-1000">
               <HeroTiltCard className="w-full relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] -z-10" />
                  <div className="bg-[#0B0C15]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 relative">
                      <div className="flex justify-between items-center mb-8">
                         <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                         </div>
                         <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> LIVE
                         </div>
                      </div>
                      <CodeSimulation />
                      <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-[#0F1115]/90 border border-white/10 shadow-2xl w-64 backdrop-blur-xl"
                      >
                         <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                               <Sparkles size={16} className="text-white" />
                            </div>
                            <div className="text-sm font-bold">ONLINEGYAN AI</div>
                         </div>
                         <div className="text-xs text-gray-400 bg-black/40 p-3 rounded-lg">
                            "Great job using the useEffect hook! You've optimized the rendering cycle by 40%."
                         </div>
                      </motion.div>
                  </div>
               </HeroTiltCard>
            </div>
        </div>
      </section>

      {/* --- SECTION 2: MARQUEE --- */}
      <LogoMarquee title="Empowering Teams At" />

      {/* --- SECTION 3: FEATURES --- */}
      <section className="py-32 px-6 bg-transparent">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold mb-8">One Platform. <span className="text-indigo-400">Infinite Possibilities.</span></h2>
               <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md relative">
                  <div className={`absolute inset-y-1 rounded-full bg-indigo-600 transition-all duration-300 shadow-lg ${activeTab === 'learners' ? 'left-1 w-[140px]' : 'left-[145px] w-[140px]'}`} />
                  <button onClick={() => setActiveTab('learners')} className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors w-[140px] ${activeTab === 'learners' ? 'text-white' : 'text-gray-400'}`}>For Learners</button>
                  <button onClick={() => setActiveTab('creators')} className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors w-[140px] ${activeTab === 'creators' ? 'text-white' : 'text-gray-400'}`}>For Creators</button>
               </div>
            </div>

            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'learners' ? (
                        <motion.div key="learners" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-indigo-500/50 transition-all group relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-32 bg-indigo-600/10 rounded-full blur-[60px] group-hover:bg-indigo-600/20 transition-all" />
                                <Cpu size={40} className="text-indigo-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Adaptive AI Paths</h3>
                                <p className="text-gray-400">No more generic courses. Our neural engine adapts the curriculum to your learning speed and goals.</p>
                            </div>
                            <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden flex flex-col justify-center shadow-2xl">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <Code size={40} className="text-green-400 mb-6" />
                                        <h3 className="text-2xl font-bold mb-4">Cloud-Based IDE</h3>
                                        <p className="text-gray-400 mb-6">Spin up full-stack React, Node, and Python environments in your browser. Instant deploy to production.</p>
                                    </div>
                                    <div className="bg-black/50 rounded-xl p-4 border border-white/10 font-mono text-xs text-gray-300">
                                        <div className="flex gap-1.5 mb-3"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /></div>
                                        <p><span className="text-pink-400">npm</span> install ONLINEGYAN-sdk</p>
                                        <p className="text-green-400">✓ Added 14 packages</p>
                                        <p className="animate-pulse">_</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all group shadow-2xl">
                                <Globe size={40} className="text-purple-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Global Hives</h3>
                                <p className="text-gray-400">Join micro-communities based on your timezone and skill level.</p>
                            </div>
                            <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 transition-all group flex items-center gap-8 shadow-2xl">
                                <div>
                                    <Shield size={40} className="text-blue-400 mb-6" />
                                    <h3 className="text-2xl font-bold mb-4">Verified Credentials</h3>
                                    <p className="text-gray-400">Blockchain-backed certificates that employers actually trust.</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="creators" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden shadow-2xl">
                                <BarChart3 size={40} className="text-indigo-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Instructor Analytics Pro</h3>
                                <p className="text-gray-400 max-w-lg mb-6">Real-time revenue tracking and student engagement heatmaps.</p>
                                <div className="h-32 flex items-end gap-2 opacity-50">
                                    {[30, 50, 45, 80, 60, 90, 75, 100, 85].map((h, i) => (
                                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05 }} className="flex-1 bg-indigo-500 rounded-t-sm" />
                                    ))}
                                </div>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-pink-500/50 transition-all shadow-2xl">
                                <Mic size={40} className="text-pink-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Studio Mode</h3>
                                <p className="text-gray-400">Browser-based recording, AI subtitle generation, and noise cancellation.</p>
                            </div>
                            <div className="md:col-span-3 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-2xl">
                                <div>
                                    <Layers size={40} className="text-orange-400 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Revenue Splitting</h3>
                                    <p className="text-gray-400">Automated payouts to co-instructors and guest speakers.</p>
                                </div>
                                <button className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform">Apply as Instructor</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
         </div>
      </section>

      {/* --- SECTION 4: CTA --- */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="p-16 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 relative z-10 tracking-tight text-white">
                    Unlock your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Full Potential.</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
                    Join 100,000+ developers, designers, and founders shipping better products, faster.
                    </p>
                    <div className="flex justify-center gap-4 relative z-10">
                        <button onClick={() => navigate('/auth')} className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-500 hover:scale-105 transition-all shadow-[0_0_50px_rgba(99,102,241,0.4)]">Get Full Access</button>
                        <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">View Pricing</button>
                    </div>
                </motion.div>
            </div>
         </div>
      </section>
    </>
  );
}