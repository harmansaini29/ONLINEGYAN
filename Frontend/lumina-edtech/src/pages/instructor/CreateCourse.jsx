import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, DollarSign, Tag, FileText, ArrowLeft, Loader, Video, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    price: "",
    description: "",
  });
  // File States
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    // Create FormData object for Multipart/Form-Data
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (thumbnailFile) data.append('thumbnail', thumbnailFile);
    if (videoFile) data.append('video', videoFile);

    try {
        const res = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
                // Note: Do NOT set Content-Type to application/json manually for FormData
            },
            body: data
        });

        if (res.ok) {
            navigate('/instructor/dashboard');
        } else {
            alert("Failed to create course");
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="bg-[#13141f] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Course</h1>
        <p className="text-gray-400 mb-8">Upload your video content and publish to the world.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Course Title</label>
                <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="e.g. Advanced React Patterns"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
                    <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <select 
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 pl-12 text-white appearance-none focus:outline-none focus:border-indigo-500"
                        >
                            <option>Development</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Business</option>
                        </select>
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Price ($)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="number" 
                            required
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 pl-12 text-white focus:outline-none focus:border-indigo-500"
                            placeholder="99.00"
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Description</label>
                <div className="relative">
                    <FileText className="absolute left-4 top-4 text-gray-500" size={18} />
                    <textarea 
                        rows="4"
                        required
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 pl-12 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="What will students learn in this course?"
                    />
                </div>
            </div>

            {/* File Uploads Row */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Thumbnail File */}
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Course Thumbnail</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:border-indigo-500/50 transition-colors bg-black/20 cursor-pointer relative">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => setThumbnailFile(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <ImageIcon className="text-gray-500 mb-2" size={32} />
                        <span className="text-xs text-gray-400 text-center">
                            {thumbnailFile ? thumbnailFile.name : "Click to Upload Image"}
                        </span>
                    </div>
                </div>

                {/* Video File */}
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Intro Video</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:border-indigo-500/50 transition-colors bg-black/20 cursor-pointer relative">
                        <input 
                            type="file" 
                            accept="video/*"
                            onChange={e => setVideoFile(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Video className="text-gray-500 mb-2" size={32} />
                        <span className="text-xs text-gray-400 text-center">
                            {videoFile ? videoFile.name : "Click to Upload Video (MP4)"}
                        </span>
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
                {loading ? <><Loader className="animate-spin" /> Uploading...</> : "Publish Course"}
            </button>
        </form>
      </div>
    </div>
  );
}