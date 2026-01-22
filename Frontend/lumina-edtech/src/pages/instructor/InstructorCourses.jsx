import React, { useEffect, useState } from 'react';
import { Loader, Edit, Trash2, Plus, Eye, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function InstructorCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/courses`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            const user = JSON.parse(localStorage.getItem("user"));
            
            // Filter only courses belonging to this instructor
            const myCourses = data.filter(c => c.instructor_id === user.id);
            setCourses(myCourses);
        } catch (err) {
            console.error("Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete");
            }

            // Remove from UI immediately
            setCourses(prev => prev.filter(c => c.id !== courseId));
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(""), 3000); // Clear error after 3s
        }
    };

    if (loading) return <div className="p-8"><Loader className="animate-spin text-white" /></div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">My Courses</h1>
                <button 
                    onClick={() => navigate('/instructor/create-course')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Create New
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-2">
                    <AlertCircle size={20} /> {error}
                </div>
            )}

            <div className="grid gap-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-[#13141f] p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <img src={course.thumbnail} alt="" className="w-16 h-16 rounded-lg object-cover bg-gray-800" />
                            <div>
                                <h3 className="font-bold text-white">{course.title}</h3>
                                <p className="text-sm text-gray-400">${course.price} • {course.category}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <button 
                                onClick={() => navigate(`/course/${course.id}`)}
                                className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" 
                                title="View"
                             >
                                <Eye size={18}/>
                             </button>
                             <button 
                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors" 
                                title="Edit (Coming Soon)"
                             >
                                <Edit size={18}/>
                             </button>
                             <button 
                                onClick={() => handleDelete(course.id)}
                                className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors" 
                                title="Delete"
                             >
                                <Trash2 size={18}/>
                             </button>
                        </div>
                    </div>
                ))}
                {courses.length === 0 && (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-white/5 border-dashed">
                        <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
                        <button 
                            onClick={() => navigate('/instructor/create-course')}
                            className="text-indigo-400 hover:text-indigo-300 text-sm font-bold"
                        >
                            Start your first course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}