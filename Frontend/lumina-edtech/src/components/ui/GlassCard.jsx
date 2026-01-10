// src/components/ui/GlassCard.jsx
import React from "react";
import { twMerge } from "tailwind-merge";

export default function GlassCard({ children, className, hoverEffect = false }) {
  const baseStyles = "bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl relative overflow-hidden";
  const hoverStyles = hoverEffect ? "transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10" : "";
  
  return (
    <div className={twMerge(baseStyles, hoverStyles, className)}>
      {/* Optional: Subtle inner noise/gradient for texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}