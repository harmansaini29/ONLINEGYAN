import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020305] pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center font-bold text-white shadow-lg">O</div>
          <div>
            <span className="text-xl font-bold text-white block">OnlineGyan</span>
            <span className="text-xs text-gray-500">Education Reimagined</span>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          © 2026 OnlineGyan Inc. All rights reserved.
        </div>
        <div className="flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Discord</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}