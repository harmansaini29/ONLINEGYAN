import React, { useEffect, useState } from 'react';
import { Loader, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function InstructorCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem("token");
            // Note: In a real app, you'd filter this API to only return *my* courses
            // For now, we will filter on the client side or assume the API handles it
            const res = await fetch(`${API_BASE_URL}/courses`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            const user = JSON.parse(localStorage.getItem("user"));
            
            // Client-side filter for safety
            const myCourses = data.filter(c => c.instructor_id === user.id);
            setCourses(myCourses);
            setLoading(false);
        };
        fetchCourses();
    }, []);

    if (loading) return <div className="p-8"><Loader className="animate-spin text-white" /></div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">My Courses</h1>
                <button 
                    onClick={() => navigate('/instructor/create-course')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                    <Plus size={18} /> Create New
                </button>
            </div>

            <div className="grid gap-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-[#13141f] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={course.thumbnail} alt="" className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                                <h3 className="font-bold text-white">{course.title}</h3>
                                <p className="text-sm text-gray-400">${course.price} • {course.category}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400" title="View"><Eye size={18}/></button>
                             <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400" title="Edit"><Edit size={18}/></button>
                             <button className="p-2 hover:bg-white/10 rounded-lg text-red-400" title="Delete"><Trash2 size={18}/></button>
                        </div>
                    </div>
                ))}
                {courses.length === 0 && <p className="text-gray-500">You haven't created any courses yet.</p>}
            </div>
        </div>
    );
}