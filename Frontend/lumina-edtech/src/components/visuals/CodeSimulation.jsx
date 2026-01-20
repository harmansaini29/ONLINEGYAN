import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CodeSimulation() {
    const [lines, setLines] = useState([
        "import { AI } from '@onlinegyan/core';",
        "const user = await AI.analyzeLearningStyle();",
        "// Generating personalized curriculum...",
    ]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLines(prev => [...prev, "const path = user.generatePath('React Advanced');"]);
        }, 1500);
        const timeout2 = setTimeout(() => {
            setLines(prev => [...prev, "await path.start(); // 🚀 Ready for liftoff"]);
        }, 3000);
        return () => { clearTimeout(timeout); clearTimeout(timeout2); };
    }, []);

    return (
        <div className="w-full bg-[#0F1117] rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden shadow-2xl relative">
            <div className="flex gap-2 mb-4 opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2 relative z-10">
                {lines.map((line, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="text-gray-400"
                    >
                        <span className="text-gray-600 mr-4">{i + 1}</span>
                        <span className={line.includes('//') ? 'text-green-400/70' : line.includes('import') || line.includes('const') ? 'text-purple-400' : 'text-blue-300'}>
                            {line}
                        </span>
                    </motion.div>
                ))}
                <motion.div 
                    animate={{ opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-indigo-500 ml-8"
                />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px]" />
        </div>
    );
}