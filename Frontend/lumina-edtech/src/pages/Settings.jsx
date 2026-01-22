import React, { useState, useEffect } from 'react';
import { Save, User } from 'lucide-react';

export default function Settings() {
    const [userData, setUserData] = useState({ name: '', email: '', bio: '' });

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch('http://localhost:9000/api/auth/me', {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setUserData(data));
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        alert("Profile Updated! (Backend integration for UPDATE user required)");
    };

    return (
        <div className="p-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
            
            <div className="bg-[#13141f] border border-white/5 rounded-2xl p-8">
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                        <input 
                            value={userData.name} 
                            onChange={e => setUserData({...userData, name: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input 
                            value={userData.email} 
                            disabled 
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-gray-500 cursor-not-allowed" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Bio</label>
                        <textarea 
                            rows="4"
                            value={userData.bio || ''} 
                            onChange={e => setUserData({...userData, bio: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none" 
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                    <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2">
                        <Save size={18} /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}