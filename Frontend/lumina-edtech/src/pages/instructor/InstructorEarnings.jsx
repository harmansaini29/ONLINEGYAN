import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Download } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { API_BASE_URL } from '../../config';

export default function InstructorEarnings() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch User Profile to get Balance
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setBalance(data.wallet_balance);
            // Mock transactions for now (Backend table created, but endpoint needs to be made if you want real history)
            setTransactions([
                { id: 1, desc: "Course Sale: React Masterclass", amount: "+$99.00", date: "Today" },
                { id: 2, desc: "Course Sale: Node.js Pro", amount: "+$49.00", date: "Yesterday" }
            ]);
        };
        fetchData();
    }, []);

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-white">Earnings & Wallet</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
                <SpotlightCard className="p-8 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
                    <div className="p-4 bg-emerald-500/20 rounded-full mb-4 text-emerald-400">
                        <DollarSign size={32} />
                    </div>
                    <p className="text-gray-400 mb-1">Total Available Balance</p>
                    <h2 className="text-5xl font-bold text-white">${balance}</h2>
                    <button className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-lg hover:scale-105 transition-transform">
                        Withdraw Funds
                    </button>
                </SpotlightCard>
                
                <SpotlightCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white">Recent Transactions</h3>
                        <button className="text-xs text-indigo-400 flex items-center gap-1"><Download size={12}/> Export CSV</button>
                    </div>
                    <div className="space-y-4">
                        {transactions.map(t => (
                            <div key={t.id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/10 text-green-500 rounded-lg"><TrendingUp size={16}/></div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{t.desc}</p>
                                        <p className="text-xs text-gray-500">{t.date}</p>
                                    </div>
                                </div>
                                <span className="text-emerald-400 font-bold">{t.amount}</span>
                            </div>
                        ))}
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}