import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

// Shared Input Component for consistency
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

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const role = JSON.parse(localStorage.getItem("role"));
      setUserType(role);
    }
    if (userType === "learner" && localStorage.getItem("user")) {
      navigate('/course/watch');
    }
    else if (userType === "instructor" && localStorage.getItem("user")) {
      navigate('/instructor/dashboard');
    }
  }, []);

  const handleLogin = () => {
    console.log("Login Clicked");
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-mesh opacity-30 animate-pulse" />
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-xl mb-4 shadow-lg shadow-indigo-500/30">
            L
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? "Enter your details to access your portal" : "Join the community of creators and learners"}
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="bg-black/30 p-1 rounded-xl flex mb-8 border border-white/5 relative">
          <motion.div
            className="absolute top-1 bottom-1 bg-indigo-600 rounded-lg shadow-md"
            initial={false}
            animate={{
              left: userType === "learner" ? "4px" : "50%",
              width: "calc(50% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setUserType("learner")}
            className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${userType === "learner" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            I'm a Learner
          </button>
          <button
            onClick={() => setUserType("instructor")}
            className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${userType === "instructor" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            I'm an Instructor
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            {/* Fields Wrapper */}
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {!isLogin && (
                <InputField id="name" label="Full Name" type="text" icon={User} />
              )}
              <InputField id="email" label="Email Address" type="email" icon={Mail} />
              <InputField id="password" label="Password" type="password" icon={Lock} />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mb-8 mt-2">
            {isLogin && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-indigo-500 focus:ring-offset-0 focus:ring-0" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
            )}
            <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 ml-auto">
              Forgot password?
            </a>
          </div>

          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={20} onClick={handleLogin} />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white font-medium hover:underline decoration-indigo-500 underline-offset-4"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

      </motion.div>
    </div>
  );
}