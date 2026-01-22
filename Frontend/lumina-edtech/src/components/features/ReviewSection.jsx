import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';

export default function ReviewSection({ courseId }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9000/api/reviews/${courseId}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [courseId]);

    const submitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        
        await fetch('http://localhost:9000/api/reviews', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ courseId, rating, comment })
        });
        
        setLoading(false);
        setComment("");
        // Refresh reviews
        const res = await fetch(`http://localhost:9000/api/reviews/${courseId}`);
        const data = await res.json();
        setReviews(data);
    };

    return (
        <div className="mt-12 bg-[#13141f] p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="text-indigo-400" /> Student Feedback
            </h3>

            {/* Review Form */}
            <form onSubmit={submitReview} className="mb-8 p-6 bg-black/20 rounded-xl">
                <div className="flex gap-2 mb-4">
                    {[1,2,3,4,5].map(star => (
                        <button key={star} type="button" onClick={() => setRating(star)}>
                            <Star size={24} className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} />
                        </button>
                    ))}
                </div>
                <textarea 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="w-full bg-[#0F1016] border border-white/10 rounded-lg p-3 text-white mb-4 focus:border-indigo-500 outline-none"
                    placeholder="Write your review here..."
                    rows="3"
                />
                <button disabled={loading} className="px-6 py-2 bg-indigo-600 rounded-lg text-white font-bold hover:bg-indigo-500">
                    {loading ? "Posting..." : "Post Review"}
                </button>
            </form>

            {/* List */}
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="border-b border-white/5 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                                {review.user_name ? review.user_name[0] : "U"}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{review.user_name || "Student"}</h4>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}