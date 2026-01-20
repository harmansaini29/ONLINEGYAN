import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, CheckCircle, ArrowRight, BarChart, Globe, Layers } from 'lucide-react';
import LogoMarquee from '../../components/ui/LogoMarquee';

// --- Components ---
const StatCard = ({ label, value, subtext, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-colors"
    >
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</h3>
        <p className="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-2">{label}</p>
        <p className="text-gray-500 text-sm">{subtext}</p>
    </motion.div>
);

const FeatureRow = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4 items-start">
        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default function EnterprisePage() {
  return (
    <div className="min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Cleaned up background to let global mesh show */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                OnlineGyan for Enterprise
             </div>
             
             <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                Scale your team's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                    Intelligence.
                </span>
             </h1>
             
             <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                The all-in-one learning ecosystem for modern teams. Assign paths, track ROI, and certify your workforce with bank-grade security.
             </p>
             
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                  Book a Demo
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group">
                  Contact Sales <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- LOGO MARQUEE --- */}
      <LogoMarquee title="Trusted by the world's most innovative teams" />

      {/* --- ROI STATS --- */}
      <section className="py-24 px-6 border-b border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
                <StatCard value="2.5x" label="Faster Onboarding" subtext="Reduce ramp-up time for new engineering hires with curated paths." delay={0.1} />
                <StatCard value="40%" label="Higher Retention" subtext="Employees who learn on the job are 40% less likely to leave." delay={0.2} />
                <StatCard value="12h" label="Saved Per Week" subtext="Senior engineers save 12+ hours on mentorship by using OnlineGyan AI." delay={0.3} />
            </div>
         </div>
      </section>

      {/* --- BENTO FEATURES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-grade <span className="text-indigo-400">Power.</span></h2>
            <p className="text-gray-400 max-w-2xl text-lg">Built for scale, security, and seamless integration into your existing workflow.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[#13141f]/80 to-[#0B0C15]/80 backdrop-blur-md border border-white/10 relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6"><BarChart size={24} /></div>
                    <h3 className="text-2xl font-bold mb-4">Deep Learning Analytics</h3>
                    <p className="text-gray-400 max-w-md mb-8">Visualize skill gaps in real-time. Track completion rates and assessment scores.</p>
                    <div className="h-48 w-full bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-6 pb-4 gap-2 opacity-50">
                            {[40, 70, 45, 90, 60, 80, 50, 75, 60, 95].map((h, i) => (<div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500 rounded-t-sm" />))}
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-[#13141f]/80 backdrop-blur-md border border-white/10 flex flex-col relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6"><Shield size={24} /></div>
                <h3 className="text-2xl font-bold mb-4">Bank-Grade Security</h3>
                <ul className="space-y-4 text-gray-400 text-sm mt-2 flex-1">
                    <li className="flex items-center gap-3"><CheckCircle size={16} className="text-emerald-500" /> SOC2 Type II Certified</li>
                    <li className="flex items-center gap-3"><CheckCircle size={16} className="text-emerald-500" /> SSO (Okta, OneLogin)</li>
                </ul>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="lg:col-span-3 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden">
                 <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6"><Layers size={24} /></div>
                        <h3 className="text-2xl font-bold mb-4">Seamless Integrations</h3>
                        <p className="text-gray-400">OnlineGyan integrates directly with Slack, Jira, and Workday.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FeatureRow icon={Zap} title="Instant Deployment" desc="Upload CSV to onboard 1000+ employees in seconds." />
                        <FeatureRow icon={Globe} title="LMS Export" desc="SCORM/xAPI compatible with Workday and Degreed." />
                    </div>
                 </div>
            </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="relative z-10 p-12 rounded-[2.5rem] bg-[#13141f]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                <h2 className="text-4xl font-bold mb-6">Ready to transform your workforce?</h2>
                <div className="flex justify-center gap-4">
                     <button className="px-8 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25">Schedule Consultation</button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}