// src/components/ui/Input.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({ label, type = "text", icon: Icon, id, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mb-5 group">
      {Icon && (
        <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
          <Icon size={20} />
        </div>
      )}
      
      <input 
        type={inputType}
        id={id}
        className={`w-full bg-black/20 border border-white/10 rounded-xl py-4 pr-12 text-white placeholder-transparent focus:outline-none focus:border-indigo-500/50 focus:bg-black/40 transition-all peer ${Icon ? "pl-12" : "pl-4"}`}
        placeholder={label}
        {...props}
      />
      
      <label 
        htmlFor={id}
        className={`absolute top-4 text-gray-500 text-sm transition-all 
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-400 peer-focus:bg-[#0B0C15] peer-focus:px-2 pointer-events-none
          ${Icon ? "left-12 peer-placeholder-shown:left-12" : "left-4 peer-placeholder-shown:left-4"}`}
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
}