import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import MarketingLayout from './components/layout/MarketingLayout';

// Pages
import LandingPage from './pages/marketing/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import MentorsPage from './pages/marketing/MentorsPage';
import EnterprisePage from './pages/marketing/EnterprisePage';

// Learner Pages
import Marketplace from './pages/learner/Marketplace'; 
import MyLearning from './pages/learner/MyLearning';
import VideoPlayerPage from './pages/learner/VideoPlayerPage';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';

// Placeholder
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-in fade-in">
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p>This feature is currently under development.</p>
  </div>
);

// --- PROTECTED ROUTE COMPONENT ---
const RequireAuth = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = JSON.parse(localStorage.getItem("role"));
  const location = useLocation();

  if (!user) {
    // Redirect them to the /auth page, but save the current location they were trying to go to
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role mismatch? Send them to their appropriate dashboard
    return <Navigate to={role === 'instructor' ? '/instructor/dashboard' : '/learner/marketplace'} replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES (Accessible to everyone) --- */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<Marketplace />} /> {/* Public Browse */}
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
        </Route>

        {/* --- AUTH --- */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* --- INSTRUCTOR ROUTES (Protected) --- */}
        <Route element={
          <RequireAuth allowedRoles={['instructor']}>
            <DashboardLayout />
          </RequireAuth>
        }>
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/courses" element={<ComingSoon title="My Courses" />} />
          <Route path="/instructor/students" element={<ComingSoon title="Student Analytics" />} />
          <Route path="/instructor/earnings" element={<ComingSoon title="Earnings Report" />} />
          <Route path="/instructor/settings" element={<ComingSoon title="Instructor Settings" />} />
          <Route path="/instructor/create-course" element={<ComingSoon title="Create New Course" />} />
        </Route>

        {/* --- LEARNER ROUTES (Protected) --- */}
        <Route element={
          <RequireAuth allowedRoles={['learner']}>
            <DashboardLayout />
          </RequireAuth>
        }>
          <Route path="/learner/dashboard" element={<Navigate to="/learner/marketplace" replace />} />
          <Route path="/learner/marketplace" element={<Marketplace />} /> {/* Private Enroll View */}
          <Route path="/learner/my-learning" element={<MyLearning />} /> 
          <Route path="/learner/settings" element={<ComingSoon title="Learner Settings" />} />
        </Route>

        {/* --- STANDALONE PROTECTED ROUTES --- */}
        <Route path="/course/watch/:courseId" element={
          <RequireAuth allowedRoles={['learner', 'instructor']}>
            <VideoPlayerPage />
          </RequireAuth>
        } />
        
        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;