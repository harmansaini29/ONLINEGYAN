import React from 'react';

const LOGOS = ['Google', 'Meta', 'Netflix', 'Vercel', 'Stripe', 'Airbnb', 'Amazon', 'Microsoft', 'Uber', 'Spotify'];

export default function LogoMarquee({ title }) {
  return (
    <section className="py-12 border-y border-white/5 bg-[#08090F] relative overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#08090F] to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#08090F] to-transparent z-10" />
        
        {title && (
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center relative z-20">
             <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] glow-text">{title}</p>
          </div>
        )}
        
        <div className="flex gap-24 animate-marquee whitespace-nowrap opacity-50 grayscale hover:grayscale-0 transition-all duration-700 hover:opacity-100">
           {LOGOS.map((logo, i) => (
               <span key={i} className="text-3xl font-black text-white/80 tracking-tighter uppercase drop-shadow-lg cursor-default">{logo}</span>
           ))}
           {/* Duplicate for seamless loop */}
           {LOGOS.map((logo, i) => (
               <span key={`dup-${i}`} className="text-3xl font-black text-white/80 tracking-tighter uppercase drop-shadow-lg cursor-default">{logo}</span>
           ))}
        </div>
    </section>
  );
}