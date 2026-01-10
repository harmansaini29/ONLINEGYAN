import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/marketing/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import VideoPlayerPage from './pages/learner/VideoPlayerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Instructor Routes */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        
        {/* Learner Routes */}
        <Route path="/course/watch" element={<VideoPlayerPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;