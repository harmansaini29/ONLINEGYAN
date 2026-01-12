import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

// Reusable Input Field
const InputField = ({ label, type, icon: Icon, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative mb-5 group">
      <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
        <Icon size={20} />
      </div>
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        id={id}
        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-transparent focus:outline-none focus:border-indigo-500/50 focus:bg-black/40 transition-all peer"
        placeholder={label}
        required
      />
      <label
        htmlFor={id}
        className="absolute left-12 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-400 peer-focus:bg-[#0B0C15] peer-focus:px-2 pointer-events-none"
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

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("learner"); // 'learner' | 'instructor'
  const navigate = useNavigate();

  // Check if already logged in
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
    
    // Simulate API Response / Success
    const mockUser = {
      name: isLogin ? "Demo User" : "New User",
      email: "user@lumina.com",
      avatar: "https://i.pravatar.cc/150?img=12",
    };

    // Save to LocalStorage
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("role", JSON.stringify(userType));

    // Redirect
    if (userType === "learner") {
      navigate('/learner/marketplace');
    } else {
      navigate('/instructor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-xl mb-4 shadow-lg shadow-indigo-500/30">L</div>
          <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-gray-400 text-sm">{isLogin ? "Enter your details to access your portal" : "Join the community of creators"}</p>
        </div>

        {/* User Type Toggle */}
        <div className="bg-black/30 p-1 rounded-xl flex mb-8 border border-white/5 relative">
          <motion.div
            className="absolute top-1 bottom-1 bg-indigo-600 rounded-lg shadow-md"
            initial={false}
            animate={{ left: userType === "learner" ? "4px" : "50%", width: "calc(50% - 4px)" }}
          />
          <button onClick={() => setUserType("learner")} className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${userType === "learner" ? "text-white" : "text-gray-400 hover:text-white"}`}>Learner</button>
          <button onClick={() => setUserType("instructor")} className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${userType === "instructor" ? "text-white" : "text-gray-400 hover:text-white"}`}>Instructor</button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!isLogin && <InputField id="name" label="Full Name" type="text" icon={User} />}
              <InputField id="email" label="Email Address" type="email" icon={Mail} />
              <InputField id="password" label="Password" type="password" icon={Lock} />
            </motion.div>
          </AnimatePresence>

          <button type="submit" className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-white font-medium hover:underline decoration-indigo-500 underline-offset-4">
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}