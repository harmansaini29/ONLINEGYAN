import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="flex items-center justify-between py-6 px-8 bg-transparent absolute top-0 w-full z-50">
            <div className="text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>Lumina Enterprise</div>
            <button onClick={() => navigate('/auth')} className="text-white font-medium hover:text-indigo-400">Login</button>
        </nav>
    )
}

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase mb-4 block">For Teams</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Upskill your workforce <br/>at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">warp speed.</span></h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Give your team access to world-class courses, mentors, and certifications. Track progress and ROI in real-time.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25">
              Book a Demo
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trusted By */}
      <section className="py-10 border-y border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                {['Microsoft', 'Airbnb', 'Uber', 'Dropbox', 'Slack'].map(logo => (
                    <span key={logo} className="text-2xl font-bold">{logo}</span>
                ))}
            </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
            { icon: Shield, title: "Enterprise Security", desc: "SSO, SOC2 compliance, and advanced data encryption." },
            { icon: Zap, title: "Instant Deployment", desc: "Onboard your entire team in minutes via CSV or API." },
            { icon: Users, title: "Role-Based Learning", desc: "Assign custom learning paths for Engineering, Sales, and Design." }
        ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                <feature.icon className="w-10 h-10 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
            </div>
        ))}
      </section>
    </div>
  );
}