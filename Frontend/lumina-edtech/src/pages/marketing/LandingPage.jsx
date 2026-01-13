import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Star, Zap, Globe, Shield, Users, Layers, TrendingUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// --- COMPONENTS ---

// 1. Premium Navbar with Scroll Effect (FIXED LINKS)
const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Courses", path: "/auth" }, 
    { name: "Mentors", path: "/mentors" },
    { name: "Enterprise", path: "/enterprise" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0B0C15]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">L</div>
          <span className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">Lumina.</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button 
              key={item.name} 
              onClick={() => navigate(item.path)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth')} className="text-sm font-medium text-white hover:text-indigo-300 transition-colors">Log In</button>
          <button onClick={() => navigate('/auth')} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

// ... (Keep the rest of the file EXACTLY as it was, no changes needed below this point)
// 2. Infinite Logo Marquee
const LogoMarquee = () => {
  const logos = ["Google", "Microsoft", "Spotify", "Amazon", "Netflix", "Adobe", "Meta"];
  return (
    <div className="w-full py-10 border-y border-white/5 bg-black/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C15] via-transparent to-[#0B0C15] z-10 pointer-events-none" />
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-16 w-max opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
      >
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-2xl font-black text-white/40 tracking-tighter uppercase">{logo}</span>
        ))}
      </motion.div>
    </div>
  );
};

// 3. Bento Grid Item
const BentoItem = ({ title, desc, icon: Icon, className, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 transition-all group relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const handleStartLearning = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = JSON.parse(localStorage.getItem("role"));
    if (user && role === "learner") navigate('/learner/marketplace');
    else if (user && role === "instructor") navigate('/instructor/dashboard');
    else navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Hero Copy */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-wide uppercase mb-8 hover:bg-indigo-500/20 transition-colors cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_#818cf8]" />
              Lumina Intelligence v2.0
            </motion.div>
            
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
              Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                Learning.
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Join the elite network of creators and learners. AI-powered curriculum, cinema-quality video, and global certification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={handleStartLearning}
                className="group relative px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative flex items-center gap-2">Start Learning Free <ArrowRight size={20} /></span>
              </button>
              
              <button className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 text-white font-semibold flex items-center gap-3 transition-all group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={14} fill="white" />
                </div>
                See How It Works
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0B0C15] bg-gray-800 overflow-hidden relative z-0 hover:z-10 hover:scale-110 transition-all">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-400"><span className="text-white font-bold">4.9/5</span> from 10k+ reviews</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div style={{ y: y2 }} className="relative hidden lg:block perspective-1000">
             {/* Main Card */}
             <motion.div 
               initial={{ rotateY: 15, rotateX: 5, opacity: 0 }}
               animate={{ rotateY: -5, rotateX: 5, opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="relative z-20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#13141f]"
             >
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="relative group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop" className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Dashboard" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
                      <Play fill="white" size={24} />
                    </button>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4 bg-[#13141f]">
                   <div className="col-span-2 space-y-2">
                      <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-3 w-1/2 bg-white/10 rounded-full" />
                   </div>
                   <div className="h-10 bg-indigo-600/20 rounded-lg border border-indigo-500/20" />
                </div>
             </motion.div>

             {/* Floating Elements */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute -top-12 -right-12 z-30 p-4 rounded-2xl bg-[#1A1B26]/90 backdrop-blur-xl border border-white/10 shadow-xl"
             >
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><TrendingUp size={20} /></div>
                 <div>
                   <p className="text-xs text-gray-400">Weekly Growth</p>
                   <p className="text-lg font-bold text-white">+24.5%</p>
                 </div>
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-8 -left-12 z-30 p-4 rounded-2xl bg-[#1A1B26]/90 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-3"
             >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-[#1A1B26]" />
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#1A1B26]" />
                  <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-[#1A1B26]" />
                </div>
                <p className="text-xs font-bold text-white">100+ Mentors</p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <LogoMarquee />

      {/* --- BENTO FEATURES --- */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the <span className="text-indigo-400">Obsessed.</span></h2>
             <p className="text-gray-400 text-lg">We've stripped away the noise. What's left is a pure, high-performance learning engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Item */}
            <BentoItem 
              title="Global Infrastructure"
              desc="Edge-cached video delivery ensures your content loads instantly, anywhere on Earth."
              icon={Globe}
              className="md:col-span-2"
              delay={0.1}
            />
            {/* Standard Item */}
            <BentoItem 
              title="AI Personalization"
              desc="Our neural engine adapts the curriculum to your learning speed."
              icon={Zap}
              className=""
              delay={0.2}
            />
            {/* Standard Item */}
            <BentoItem 
              title="Enterprise Security"
              desc="Bank-grade encryption for your data and payments."
              icon={Shield}
              className=""
              delay={0.3}
            />
             {/* Large Item */}
            <BentoItem 
              title="Community Hives"
              desc="Join micro-communities of learners who share your specific goals and timezone."
              icon={Users}
              className="md:col-span-2"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Active Learners", value: "2.4M+" },
            { label: "Hours Watched", value: "150M+" },
            { label: "Instructors", value: "850+" },
            { label: "Countries", value: "140" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-indigo-400 font-medium tracking-wide uppercase text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="p-12 rounded-[3rem] bg-gradient-to-b from-[#1A1B26] to-[#0B0C15] border border-white/10 shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Ready to break the ceiling?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Get unlimited access to 3,000+ world-class courses, projects, and certifications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/auth')} className="px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-500/25 transform hover:-translate-y-1">
                Join Lumina Pro
              </button>
              <button className="px-10 py-5 rounded-2xl bg-transparent border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">
                View Pricing
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#05060A] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">L</div>
              <span className="text-xl font-bold text-white">Lumina.</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Lumina is the world's leading destination for digital skills. We are on a mission to unlock the potential of 1 billion people.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Browse Courses</li>
              <li className="hover:text-white cursor-pointer transition-colors">Mentorship</li>
              <li className="hover:text-white cursor-pointer transition-colors">For Enterprise</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Legal</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2024 Lumina Education Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}