import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, ShieldCheck, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const CreditPackage = ({ amount, bonus, onSelect, loading }) => (
    <motion.button
        whileHover={{ scale: 1.02, translateY: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(amount)}
        disabled={loading}
        className="relative group p-6 rounded-3xl bg-[#13141f] border border-white/10 hover:border-indigo-500/50 transition-all text-left flex flex-col h-full"
    >
        {bonus && (
            <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-[10px] font-bold text-black uppercase tracking-wider shadow-lg">
                {bonus} Bonus
            </div>
        )}
        <div className="mb-4 p-3 bg-white/5 rounded-2xl w-fit group-hover:bg-indigo-500/20 transition-colors">
            <Zap size={24} className="text-indigo-400" />
        </div>
        <div className="mb-1 text-gray-400 text-sm font-medium">Add Credits</div>
        <div className="text-3xl font-bold text-white mb-4">${amount}</div>
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between w-full">
            <span className="text-xs text-gray-500">Instant Transfer</span>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <CreditCard size={12} />
            </div>
        </div>
    </motion.button>
);

export default function RefillCredits() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRefill = async (amount) => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${API_BASE_URL}/wallet/refill`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });

            if (res.ok) {
                // Simulate Payment Gateway Delay
                setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                    // Refresh window to show new balance in Navbar
                    setTimeout(() => {
                        window.location.reload(); 
                    }, 2000);
                }, 1500);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                    <CheckCircle size={48} className="text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-400 mb-8">Your wallet has been recharged. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 pt-12">
            {/* Disclaimer Banner */}
            <div className="mb-10 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-4 text-indigo-300 text-sm">
                <ShieldCheck size={20} />
                <p><strong>Demo Mode:</strong> This is a simulation. No real money will be deducted from your bank account. Use these credits to test the platform.</p>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Top Up Wallet</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Securely add funds to your OnlineGyan wallet to purchase courses instantly.</p>
            </div>

            {loading ? (
                <div className="h-64 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-400 animate-pulse">Processing Secure Transaction...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CreditPackage amount={100} onSelect={handleRefill} loading={loading} />
                    <CreditPackage amount={500} bonus="10%" onSelect={handleRefill} loading={loading} />
                    <CreditPackage amount={1000} bonus="20%" onSelect={handleRefill} loading={loading} />
                    <CreditPackage amount={5000} bonus="Whale" onSelect={handleRefill} loading={loading} />
                </div>
            )}

            <div className="mt-16 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-8" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-8" alt="Mastercard" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-8" alt="Paypal" />
            </div>
        </div>
    );
}