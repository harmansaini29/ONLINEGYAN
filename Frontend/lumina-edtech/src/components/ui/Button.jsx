// src/components/ui/Button.jsx
import React from "react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon, 
  isLoading, 
  className, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-transparent rounded-xl",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl backdrop-blur-md",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white rounded-lg",
    outline: "bg-transparent border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 rounded-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "p-2.5"
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], sizes[size], className)} 
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className={children ? "mr-2 h-4 w-4" : "h-5 w-5"} />
      ) : null}
      {children}
    </button>
  );
}