import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ChevronLeft, Github, Chrome, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

const InputField = ({ label, type, icon: Icon, id, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mb-5 group">
      <div className={`absolute left-4 top-4 transition-colors duration-300 ${isFocused ? "text-indigo-400" : "text-gray-500"}`}>
        <Icon size={20} />
      </div>

      <input
        type={inputType}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={`w-full bg-[#1A1B26] border rounded-xl py-4 pl-12 pr-12 text-white placeholder-transparent focus:outline-none transition-all duration-300
            ${isFocused ? "border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]" : "border-white/10 hover:border-white/20"}
        `}
        placeholder={label}
        required
        {...props}
      />

      <label
        htmlFor={id}
        className={`absolute left-12 transition-all duration-300 pointer-events-none
          ${isFocused || hasValue ? "-top-2.5 text-xs bg-[#0B0C15] px-2 text-indigo-400" : "top-4 text-gray-500"}
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

const SocialButton = ({ icon: Icon, label }) => (
    <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-gray-300 hover:text-white group">
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
        {label}
    </button>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("learner"); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = JSON.parse(localStorage.getItem("role"));
    if (user) {
      if (role === "instructor") navigate('/instructor/dashboard');
      else navigate('/learner/marketplace');
    }
  }, [navigate]);

  const handleAuth = (e) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
        const mockUser = {
            name: isLogin ? "Demo User" : "New User",
            email: "user@onlinegyan.com",
            avatar: "https://i.pravatar.cc/150?img=12",
        };
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("role", JSON.stringify(userType));

        // Redirect to where they came from OR their dashboard
        const from = location.state?.from?.pathname;
        if (from) {
             navigate(from);
        } else {
             if (userType === "learner") navigate('/learner/marketplace');
             else navigate('/instructor/dashboard');
        }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] flex text-white font-sans overflow-hidden">
      
      {/* --- LEFT PANEL --- */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden bg-[#0F1016] p-12 border-r border-white/5"
      >
         <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.15),transparent_50%)]" />
             <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.15),transparent_50%)]" />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         </div>

         <div className="relative z-10 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">O</div>
             <span className="text-2xl font-bold tracking-tight">OnlineGyan.</span>
         </div>

         <div className="relative z-10">
             <div className="mb-8">
                <h1 className="text-5xl font-bold mb-4 leading-tight">
                    Start your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Evolution.</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-md">Join the world's most advanced learning ecosystem. Master skills 10x faster with AI.</p>
             </div>

             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                 <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Sparkles key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                 </div>
                 <p className="text-lg font-medium italic mb-6">"OnlineGyan completely changed how I learn. The AI mentorship is like having a senior engineer by your side 24/7."</p>
                 <div className="flex items-center gap-4">
                     <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-10 h-10 rounded-full border-2 border-indigo-500/50" />
                     <div>
                         <p className="font-bold text-sm">Elena Rodriguez</p>
                         <p className="text-xs text-gray-500">Senior Frontend Dev @ Vercel</p>
                     </div>
                 </div>
             </div>
         </div>

         <div className="relative z-10 text-xs text-gray-500">
             © 2026 OnlineGyan Inc.
         </div>
      </motion.div>

      {/* --- RIGHT PANEL --- */}
      <div className="flex-1 flex flex-col relative bg-[#0B0C15]">
         <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
             <button 
                onClick={() => navigate('/')} 
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-gray-400 hover:text-white"
             >
                 <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                 Back to Home
             </button>
             
             <div className="text-sm text-gray-500">
                 {isLogin ? "New here?" : "Already a member?"}
                 <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                     {isLogin ? "Create Account" : "Sign In"}
                 </button>
             </div>
         </div>

         <div className="flex-1 flex items-center justify-center p-6">
             <motion.div 
                key={isLogin ? "login-container" : "signup-container"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-md"
             >
                 <div className="text-center mb-8">
                     <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                     <p className="text-gray-400">{isLogin ? "Enter your credentials to access your workspace." : "Get started with your free 14-day trial."}</p>
                 </div>

                 {/* Role Switcher */}
                 <div className="bg-[#1A1B26] p-1 rounded-xl flex mb-8 border border-white/5 relative">
                    <motion.div
                        className="absolute top-1 bottom-1 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/25"
                        initial={false}
                        animate={{ left: userType === "learner" ? "4px" : "50%", width: "calc(50% - 4px)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <button onClick={() => setUserType("learner")} className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${userType === "learner" ? "text-white" : "text-gray-400 hover:text-white"}`}>
                        Learner
                    </button>
                    <button onClick={() => setUserType("instructor")} className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${userType === "instructor" ? "text-white" : "text-gray-400 hover:text-white"}`}>
                        Instructor
                    </button>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <InputField id="name" label="Full Name" type="text" icon={User} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <InputField id="email" label="Email Address" type="email" icon={Mail} />
                    <InputField id="password" label="Password" type="password" icon={Lock} />

                    {isLogin && (
                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-gray-400 hover:text-indigo-400 transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        {isLogin ? "Sign In" : "Get Started"}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0B0C15] px-2 text-gray-500">Or continue with</span></div>
                </div>

                <div className="flex gap-4">
                    <SocialButton icon={Chrome} label="Google" />
                    <SocialButton icon={Github} label="GitHub" />
                </div>
             </motion.div>
         </div>
      </div>
    </div>
  );
}