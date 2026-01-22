import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ChevronLeft, Github, Chrome, CheckCircle, AlertCircle, Loader2, GraduationCap, Presentation } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = "http://localhost:9000/api"; 

// --- COMPONENTS ---
const InputField = ({ label, type, icon: Icon, id, error, ...props }) => {
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
        className={`w-full bg-[#0F1016]/60 border rounded-xl py-4 pl-12 pr-12 text-white placeholder-transparent focus:outline-none transition-all duration-300 backdrop-blur-sm
            ${error ? "border-red-500/50 focus:border-red-500" : isFocused ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "border-white/10 hover:border-white/20"}
        `}
        placeholder={label}
        required
        {...props}
      />

      <label
        htmlFor={id}
        className={`absolute left-12 transition-all duration-300 pointer-events-none font-medium
          ${isFocused || hasValue ? "-top-2.5 text-xs bg-[#0F1016] px-2 text-indigo-400 rounded-full border border-indigo-500/20" : "top-4 text-gray-500"}
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

const RoleCard = ({ role, icon: Icon, title, desc, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02, translateY: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex-1 bg-[#12141C]/80 border border-white/10 p-8 rounded-3xl hover:border-indigo-500/50 hover:bg-[#1A1B26] transition-all group text-left relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <Icon size={32} className="text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        <div className="mt-8 flex items-center gap-2 text-indigo-400 font-bold text-sm">
            Select Role <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
    </motion.button>
);

// --- MAIN PAGE ---
export default function AuthPage() {
  const [view, setView] = useState('selection'); // 'selection' | 'form'
  const [userType, setUserType] = useState(null); // 'learner' | 'instructor'
  const [isLogin, setIsLogin] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // --- REDIRECT LOGIC ---
  const handleRedirect = (role) => {
      const from = location.state?.from?.pathname;
      if (from) {
          navigate(from);
          return;
      }
      if (role === 'instructor') navigate('/instructor/dashboard');
      else navigate('/learner/marketplace');
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const roleString = localStorage.getItem("role");
    if (user && roleString) {
        let role = roleString;
        try { role = JSON.parse(roleString); } catch (e) {}
        handleRedirect(role);
    }
  }, [navigate]);

  const handleRoleSelect = (role) => {
      setUserType(role);
      setView('form');
      setError("");
  };

  const handleBackToSelection = () => {
      setView('selection');
      setUserType(null);
      setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if(error) setError(""); 
  };

  const processLoginSuccess = (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", JSON.stringify(data.user.role));
      handleRedirect(data.user.role);
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    await new Promise(r => setTimeout(r, 800)); 

    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password, role: userType };

    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Authentication failed");

        if (isLogin) {
            // Check if role matches selected panel
            if (data.user.role !== userType) {
                // If they logged in as Instructor but clicked Learner panel
                if(!confirm(`You are registered as a ${data.user.role}, but you are on the ${userType} login page. Do you want to continue to your ${data.user.role} dashboard?`)) {
                     throw new Error("Login cancelled. Please choose the correct role.");
                }
            }
            processLoginSuccess(data);
        } else {
            setIsLogin(true);
            setSuccess(`Welcome ${userType}! Account created. Please log in.`);
            setFormData({ ...formData, password: "" }); 
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] flex text-white font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* --- LEFT PANEL --- */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden bg-[#0F1016] p-12 border-r border-white/5"
      >
         <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
             <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
         </div>

         <div className="relative z-10 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">O</div>
             <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">OnlineGyan.</span>
         </div>

         <div className="relative z-10 pl-4 border-l-2 border-indigo-500/30">
             <h1 className="text-5xl font-bold mb-6 leading-tight">
                {view === 'selection' ? "Choose your" : (userType === 'learner' ? "Start Learning" : "Start Teaching")} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {view === 'selection' ? "Path." : (userType === 'learner' ? "Without Limits." : "The Future.")}
                </span>
             </h1>
             <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-12">
                {view === 'selection' 
                    ? "Join the ecosystem where industry experts and curious minds converge." 
                    : "Access your dashboard to manage courses, track progress, and grow."}
             </p>
         </div>
         <div className="relative z-10 text-xs text-gray-600">© 2026 OnlineGyan Inc.</div>
      </motion.div>

      {/* --- RIGHT PANEL --- */}
      <div className="flex-1 flex flex-col relative bg-[#05060A]">
         <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
             <button onClick={() => view === 'form' ? handleBackToSelection() : navigate('/')} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                 <ChevronLeft size={16} /> {view === 'form' ? "Change Role" : "Back Home"}
             </button>
         </div>

         <div className="flex-1 flex items-center justify-center p-6 relative z-10">
             <AnimatePresence mode="wait">
                 {view === 'selection' ? (
                     // --- ROLE SELECTION VIEW ---
                     <motion.div 
                        key="selection"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-3xl grid md:grid-cols-2 gap-6"
                     >
                        <RoleCard 
                            role="learner"
                            icon={GraduationCap}
                            title="I am a Learner"
                            desc="I want to browse courses, learn new skills, and earn certificates."
                            onClick={() => handleRoleSelect('learner')}
                        />
                        <RoleCard 
                            role="instructor"
                            icon={Presentation}
                            title="I am an Instructor"
                            desc="I want to upload courses, manage students, and earn revenue."
                            onClick={() => handleRoleSelect('instructor')}
                        />
                     </motion.div>
                 ) : (
                     // --- LOGIN FORM VIEW ---
                     <motion.div 
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-md"
                     >
                         <div className="text-center mb-8">
                             <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
                                 {userType} Portal
                             </div>
                             <h2 className="text-4xl font-bold text-white mb-3">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                         </div>

                         <div className="bg-[#12141C]/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                            {/* Alerts */}
                            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}
                            {success && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg flex items-center gap-2"><CheckCircle size={16} /> {success}</div>}

                            <form onSubmit={handleAuth} className="space-y-1">
                                {!isLogin && <InputField id="name" label="Full Name" type="text" icon={User} onChange={handleChange} />}
                                <InputField id="email" label="Email Address" type="email" icon={Mail} onChange={handleChange} />
                                <InputField id="password" label="Password" type="password" icon={Lock} onChange={handleChange} />

                                <button type="submit" disabled={loading} className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                    {loading ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <>{isLogin ? "Log In" : "Sign Up"} <ArrowRight size={20} /></>}
                                </button>
                            </form>
                            
                            <div className="mt-6 text-center text-sm text-gray-500">
                                {isLogin ? "New here?" : "Already have an account?"}
                                <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="ml-2 text-indigo-400 font-bold hover:underline">
                                    {isLogin ? "Create Account" : "Sign In"}
                                </button>
                            </div>
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>
         </div>
      </div>
    </div>
  );
}