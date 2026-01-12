import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/marketing/LandingPage'; //
import AuthPage from './pages/auth/AuthPage'; //
import InstructorDashboard from './pages/instructor/InstructorDashboard'; //
import DashboardLayout from './components/layout/DashboardLayout'; //

// --- FIXED IMPORTS HERE ---
// The file is located in 'src/pages/learner/', so we must include 'pages' in the path.
import Marketplace from './pages/learner/MarketPlace'; 
import VideoPlayerPage from './pages/learner/VideoPlayerPage'; 

// Simple placeholder for pages we haven't built yet
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p>This feature is currently under development.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout/>}>
          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/courses" element={<ComingSoon title="My Courses" />} />
          <Route path="/instructor/students" element={<ComingSoon title="Student Analytics" />} />
          <Route path="/instructor/earnings" element={<ComingSoon title="Earnings Report" />} />
          <Route path="/instructor/settings" element={<ComingSoon title="Instructor Settings" />} />
          <Route path="/instructor/create-course" element={<ComingSoon title="Create New Course" />} />
          
          {/* Learner Routes */}
          <Route path="/learner/dashboard" element={<Marketplace />} />
          <Route path="/learner/marketplace" element={<Marketplace />} />
          <Route path="/learner/my-learning" element={<ComingSoon title="My Enrolled Courses" />} />
          <Route path="/learner/settings" element={<ComingSoon title="Learner Settings" />} />
        </Route>

        {/* Video Player */}
        <Route path="/course/watch/:courseId" element={<VideoPlayerPage />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;