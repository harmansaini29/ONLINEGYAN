import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MarketingLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Dynamic Title Logic based on current path
  const getPageTitle = () => {
    switch (pathname) {
      case '/mentors': return 'OnlineGyan Mentorship';
      case '/enterprise': return 'OnlineGyan Enterprise';
      default: return 'OnlineGyan.';
    }
  };

  return (
    // Changed bg-[#05060A] to bg-transparent
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar title={getPageTitle()} showBack={pathname !== '/'} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}