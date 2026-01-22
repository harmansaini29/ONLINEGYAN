import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Star, ChevronRight, Lock, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function CourseCard({ course, index }) {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false); 

  // Check if user is logged in
  const token = localStorage.getItem("token");

  // 1. Check Enrollment Status on Load
  useEffect(() => {
    if (token) {
        fetch(`${API_BASE_URL}/enrollments/check/${course.id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setIsEnrolled(data.isEnrolled))
        .catch(err => console.error(err));
    }
  }, [course.id, token]);

  // 2. Handle Click (Buy or Watch)
  const handleAction = async (e) => {
    e.stopPropagation(); // Prevent clicking the card container

    if (!token) {
        navigate('/auth'); // Force Login
        return;
    }

    if (isEnrolled) {
        navigate(`/course/watch/${course.id}`); // Already owned? Watch it.
    } else {
        // BUY LOGIC
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/enrollments`, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ courseId: course.id })
            });
            
            if (res.ok) {
                setIsEnrolled(true); // Update UI instantly
                alert(`Successfully enrolled in ${course.title}!`);
            }
        } catch (err) {
            alert("Enrollment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-[#13141f] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {isEnrolled ? (
              <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
          ) : (
              <Lock className="w-12 h-12 text-white/80 drop-shadow-lg" />
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">{course.category || "General"}</span>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-white font-medium">{course.rating || 4.5}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{course.instructor_name || "Unknown Instructor"}</p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-white font-bold">${course.price || "Free"}</span>
          
          <button 
            onClick={handleAction}
            disabled={loading}
            className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                isEnrolled 
                ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" 
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? <Loader size={16} className="animate-spin" /> : (
                isEnrolled ? (
                    <>Watch <PlayCircle size={16} /></>
                ) : (
                    <>Enroll <ChevronRight size={16} /></>
                )
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}