import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('learner'); // 'learner' | 'instructor'
  const [focused, setFocused] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl h-[600px] bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl flex overflow-hidden z-10"
      >
        
        {/* Left: Visual Anchor */}
        <div className="hidden lg:flex w-1/2 bg-slate-800/50 relative flex-col justify-between p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" 
            alt="Abstract Art" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Lumina.</h1>
            <p className="text-slate-400">Master your craft with the world's best.</p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>Access to 5,000+ Premium Courses</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>Industry Standard Certification</span>
            </div>
          </div>
        </div>

        {/* Right: Interaction Zone */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
          
          {/* Role Toggle */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl w-fit mb-8 self-center backdrop-blur-md">
            {['learner', 'instructor'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  role === r 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
          <p className="text-slate-400 text-center mb-8">Enter your details to access your account.</p>

          <form className="space-y-6">
            {/* Email Input */}
            <div 
              className={`relative group bg-slate-800/50 rounded-xl border transition-all duration-300 ${
                focused === 'email' ? 'border-indigo-500 shadow-indigo-500/20 shadow-lg' : 'border-slate-700'
              }`}
            >
              <div className="absolute left-4 top-3.5 text-slate-500">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email"
                placeholder="Email Address"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent p-3 pl-12 text-white placeholder-slate-500 focus:outline-none rounded-xl"
              />
            </div>

            {/* Password Input */}
            <div 
              className={`relative group bg-slate-800/50 rounded-xl border transition-all duration-300 ${
                focused === 'password' ? 'border-indigo-500 shadow-indigo-500/20 shadow-lg' : 'border-slate-700'
              }`}
            >
              <div className="absolute left-4 top-3.5 text-slate-500">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password"
                placeholder="Password"
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent p-3 pl-12 text-white placeholder-slate-500 focus:outline-none rounded-xl"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-300">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-offset-0" />
                Remember me
              </label>
              <a href="#" className="text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account? <a href="#" className="text-white font-medium hover:underline">Sign up</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;