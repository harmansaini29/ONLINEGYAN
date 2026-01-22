import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import DashboardLayout from './components/layout/DashboardLayout';
import MarketingLayout from './components/layout/MarketingLayout';

import LandingPage from './pages/marketing/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import MentorsPage from './pages/marketing/MentorsPage';
import EnterprisePage from './pages/marketing/EnterprisePage';

import Marketplace from './pages/learner/Marketplace'; 
import MyLearning from './pages/learner/MyLearning';
import VideoPlayerPage from './pages/learner/VideoPlayerPage';
import RefillCredits from './pages/learner/RefillCredits';

import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import InstructorCourses from './pages/instructor/InstructorCourses';
import InstructorEarnings from './pages/instructor/InstructorEarnings';

import Settings from './pages/Settings';

const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-in fade-in">
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p>This feature is currently under development.</p>
  </div>
);

const RequireAuth = ({ children, allowedRoles }) => {
  const user = localStorage.getItem("user");
  const storedRole = localStorage.getItem("role");
  const location = useLocation();

  // 1. Not Logged In? -> Go to Auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  let role = null;
  try {
    role = JSON.parse(storedRole);
  } catch (e) {
    role = storedRole;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    
    if (role === 'instructor') {
        if (location.pathname.startsWith('/instructor')) {
            return children; 
        }
        return <Navigate to="/instructor/dashboard" replace />;
    }

    if (role === 'learner') {
        if (location.pathname.startsWith('/learner')) {
            return children; 
        }
        return <Navigate to="/learner/marketplace" replace />;
    }
    
    localStorage.clear();
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />
        
        <Route element={
          <RequireAuth allowedRoles={['instructor']}>
            <DashboardLayout />
          </RequireAuth>
        }>
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/create-course" element={<CreateCourse />} />
          <Route path="/instructor/courses" element={<InstructorCourses />} />
          <Route path="/instructor/earnings" element={<InstructorEarnings />} />
          <Route path="/instructor/students" element={<ComingSoon title="Student Analytics" />} />
          <Route path="/instructor/settings" element={<Settings />} />
        </Route>

        <Route element={
          <RequireAuth allowedRoles={['learner']}>
            <DashboardLayout />
          </RequireAuth>
        }>
          <Route path="/learner/dashboard" element={<Navigate to="/learner/marketplace" replace />} />
          <Route path="/learner/marketplace" element={<Marketplace />} />
          <Route path="/learner/my-learning" element={<MyLearning />} /> 
          <Route path="/learner/refill" element={<RefillCredits />} />
          <Route path="/learner/settings" element={<Settings />} />
        </Route>

        <Route path="/course/watch/:courseId" element={
          <RequireAuth allowedRoles={['learner', 'instructor']}>
            <VideoPlayerPage />
          </RequireAuth>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;