import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../config'; // ✅ Import Config

const PACKAGES = [
  { amount: 100, price: 100, label: "Starter" },
  { amount: 500, price: 500, label: "Pro" },
  { amount: 1000, price: 1000, label: "Business" },
  { amount: 5000, price: 5000, label: "Enterprise" },
];

export default function RefillCredits() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [msg, setMsg] = useState("");

  const handlePayment = async () => {
    if (!selectedAmount) return;
    setLoading(true);
    setStatus("idle");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first");

      // ✅ FIXED: Use API_BASE_URL + Correct Endpoint
      const res = await fetch(`${API_BASE_URL}/wallet/refill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: selectedAmount })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Payment Failed");

      setStatus("success");
      setMsg(`Successfully added $${selectedAmount} to wallet!`);
      
      // ✅ FIXED: Navigate to the correct Learner Dashboard (Marketplace)
      // Wait 2 seconds so user sees the success message, then redirect
      setTimeout(() => {
         navigate('/learner/marketplace'); 
      }, 2000);

    } catch (err) {
      console.error(err);
      setStatus("error");
      setMsg(err.message || "Transaction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] p-6 md:p-12 text-white font-sans flex items-center justify-center relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />

       <div className="relative z-10 w-full max-w-2xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} /> Back
          </button>

          <div className="bg-[#0F1016]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-indigo-500/10 rounded-2xl mb-4 text-indigo-400">
                      <CreditCard size={32} />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Top Up Wallet</h1>
                  <p className="text-gray-400">Secure simulated payment gateway</p>
              </div>

              {/* Status Messages */}
              {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                      <AlertCircle size={20} /> {msg}
                  </motion.div>
              )}
              {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400">
                      <CheckCircle size={20} /> {msg}
                  </motion.div>
              )}

              {/* Credit Packages */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                  {PACKAGES.map((pkg) => (
                      <button
                          key={pkg.amount}
                          onClick={() => setSelectedAmount(pkg.amount)}
                          className={`p-4 rounded-xl border transition-all text-left group relative overflow-hidden
                              ${selectedAmount === pkg.amount 
                                  ? "bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/20" 
                                  : "bg-[#1A1B26] border-white/5 hover:border-white/20"}
                          `}
                      >
                          <p className={`text-sm font-medium mb-1 ${selectedAmount === pkg.amount ? "text-indigo-200" : "text-gray-400"}`}>{pkg.label}</p>
                          <p className="text-2xl font-bold">${pkg.amount}</p>
                          {selectedAmount === pkg.amount && <div className="absolute top-2 right-2 text-white"><CheckCircle size={16} /></div>}
                      </button>
                  ))}
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-xl mb-8 flex items-start gap-3">
                   <AlertCircle size={18} className="text-yellow-500 mt-0.5 shrink-0" />
                   <p className="text-xs text-yellow-500/80 leading-relaxed">
                       <strong>Demo Mode:</strong> This is a simulation. No real money will be deducted from your bank account. The selected amount will be added to your virtual wallet immediately.
                   </p>
              </div>

              {/* Action Button */}
              <button 
                  onClick={handlePayment}
                  disabled={!selectedAmount || loading || status === 'success'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {loading ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : "Confirm Payment"}
              </button>
          </div>
       </div>
    </div>
  );
}