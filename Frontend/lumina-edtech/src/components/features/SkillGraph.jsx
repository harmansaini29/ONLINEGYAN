import React from 'react';
import { motion } from 'framer-motion';

export default function SkillGraph() {
  const skills = [
    { id: 1, name: "React", x: 20, y: 50, color: "bg-blue-500" },
    { id: 2, name: "JavaScript", x: 50, y: 20, color: "bg-yellow-500" },
    { id: 3, name: "Node.js", x: 80, y: 50, color: "bg-green-500" },
    { id: 4, name: "Next.js", x: 50, y: 80, color: "bg-white" },
  ];

  return (
    <div className="relative w-full h-64 bg-[#13141f] rounded-3xl border border-white/5 overflow-hidden">
       <div className="absolute top-4 left-4 z-10">
          <h3 className="text-sm font-bold text-white">Your Knowledge Graph</h3>
          <p className="text-xs text-gray-500">Live Skill Connections</p>
       </div>
       
       {/* Connections (SVG Lines) */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="20%" y1="50%" x2="50%" y2="20%" stroke="white" strokeWidth="2" />
          <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="white" strokeWidth="2" />
          <line x1="20%" y1="50%" x2="50%" y2="80%" stroke="white" strokeWidth="2" />
          <line x1="50%" y1="80%" x2="80%" y2="50%" stroke="white" strokeWidth="2" />
       </svg>

       {/* Nodes */}
       {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`absolute w-12 h-12 rounded-full ${skill.color} shadow-lg flex items-center justify-center text-[10px] font-bold text-black cursor-pointer hover:scale-110 transition-transform`}
            style={{ left: `${skill.x}%`, top: `${skill.y}%`, transform: 'translate(-50%, -50%)' }}
          >
             {skill.name}
          </motion.div>
       ))}
    </div>
  );
}