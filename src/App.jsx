import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { StateSelectorModal } from './components/StateSelectorModal.jsx';
import { useStateContext } from './context/StateContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { DemoModeBanner } from './components/DemoModeBanner.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { SchemesPage } from './pages/SchemesPage.jsx';
import { SchemeDetailPage } from './pages/SchemeDetailPage.jsx';
import { ChecklistPage } from './pages/ChecklistPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ApplyPage } from './pages/ApplyPage.jsx';
import { ApplicationsPage } from './pages/ApplicationsPage.jsx';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage.jsx';
import { AdminReviewQueuePage } from './pages/AdminReviewQueuePage.jsx';

// ── Protected route wrapper ────────────────────────────────────────────────────
function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/schemes" replace />;
  }

  return children;
}

// ── Inner app (needs AuthContext in scope) ────────────────────────────────────
function AppInner() {
  const { hasChosenState } = useStateContext();
  const { role, toggleRole, isSupabaseConfigured, isDemo } = useAuth();
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(
    !hasChosenState && !localStorage.getItem('sahayak_state_chosen')
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Banner when running in demo / unconfigured mode */}
      {(!isSupabaseConfigured || isDemo) && <DemoModeBanner />}

      <Header currentRole={role} onRoleToggle={toggleRole} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Citizen routes */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/schemes" element={<ProtectedRoute><SchemesPage /></ProtectedRoute>} />
        <Route path="/schemes/:id" element={<ProtectedRoute><SchemeDetailPage /></ProtectedRoute>} />
        <Route path="/checklist/:schemeId" element={<ProtectedRoute><ChecklistPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/apply/:schemeId" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminAnalyticsPage /></ProtectedRoute>} />
        <Route path="/admin/review-queue" element={<ProtectedRoute requireAdmin><AdminReviewQueuePage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <StateSelectorModal
        isOpen={showFirstVisitModal}
        onClose={() => setShowFirstVisitModal(false)}
      />
    </div>
  );
}

// ── Root: AuthProvider wraps everything ───────────────────────────────────────
export function App() {
  // We need a role state at this level so Header can receive it before
  // AuthProvider's context is fully loaded.
  const [currentRole, setCurrentRole] = useState(
    localStorage.getItem('sahayak_user_role') || 'citizen'
  );

  return (
    <AuthProvider onRoleChange={setCurrentRole}>
      <AppInner />
    </AuthProvider>
  );
}
