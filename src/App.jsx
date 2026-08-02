import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { StateSelectorModal } from './components/StateSelectorModal.jsx';

// Phase 3 — compliance & hardening components
import { OfflineBanner } from './components/OfflineBanner.jsx';
import { ConsentModal } from './components/ConsentModal.jsx';
import { AppErrorBoundary, RouteErrorBoundary } from './components/ErrorBoundary.jsx';
import { DemoModeBanner } from './components/DemoModeBanner.jsx';

// Contexts
import { useStateContext } from './context/StateContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ConsentProvider, useConsent } from './context/ConsentContext.jsx';

// Pages — public
import { LandingPage } from './pages/LandingPage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx';
import { TermsOfServicePage } from './pages/TermsOfServicePage.jsx';

// Pages — citizen
import { ProfilePage } from './pages/ProfilePage.jsx';
import { SchemesPage } from './pages/SchemesPage.jsx';
import { SchemeDetailPage } from './pages/SchemeDetailPage.jsx';
import { ChecklistPage } from './pages/ChecklistPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ApplyPage } from './pages/ApplyPage.jsx';
import { ApplicationsPage } from './pages/ApplicationsPage.jsx';

// Pages — admin
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage.jsx';
import { AdminReviewQueuePage } from './pages/AdminReviewQueuePage.jsx';

// ── Protected route wrapper ───────────────────────────────────────────────────
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

// ── Inner app (needs AuthContext + ConsentContext in scope) ───────────────────
function AppInner() {
  const { hasChosenState } = useStateContext();
  const { role, toggleRole, isSupabaseConfigured, isDemo } = useAuth();
  const { hasConsented, loading: consentLoading } = useConsent();

  const [showFirstVisitModal, setShowFirstVisitModal] = useState(
    !hasChosenState && !localStorage.getItem('sahayak_state_chosen')
  );
  const [consentDeclined, setConsentDeclined] = useState(false);

  const currentPath = window.location.pathname;
  const isLegalPage = currentPath === '/privacy' || currentPath === '/terms';

  // Show consent gate for authenticated-context users who haven't consented yet,
  // but never block the legal pages themselves.
  const showConsentGate =
    !consentLoading && !hasConsented && !consentDeclined && !isLegalPage;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

      {/* System banners — always at the very top */}
      <OfflineBanner />
      {(!isSupabaseConfigured || isDemo) && <DemoModeBanner />}

      <Header currentRole={role} onRoleToggle={toggleRole} />

      {/* All routes wrapped in the app-level error boundary */}
      <AppErrorBoundary>
        <Routes>
          {/* ── Public ── */}
          <Route path="/"       element={<RouteErrorBoundary><LandingPage /></RouteErrorBoundary>} />
          <Route path="/auth"   element={<RouteErrorBoundary><AuthPage /></RouteErrorBoundary>} />
          <Route path="/privacy" element={<RouteErrorBoundary><PrivacyPolicyPage /></RouteErrorBoundary>} />
          <Route path="/terms"   element={<RouteErrorBoundary><TermsOfServicePage /></RouteErrorBoundary>} />

          {/* ── Citizen ── */}
          <Route path="/profile"            element={<ProtectedRoute><RouteErrorBoundary><ProfilePage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/schemes"            element={<ProtectedRoute><RouteErrorBoundary><SchemesPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/schemes/:id"        element={<ProtectedRoute><RouteErrorBoundary><SchemeDetailPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/checklist/:schemeId" element={<ProtectedRoute><RouteErrorBoundary><ChecklistPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/chat"               element={<ProtectedRoute><RouteErrorBoundary><ChatPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard"          element={<ProtectedRoute><RouteErrorBoundary><DashboardPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/apply/:schemeId"    element={<ProtectedRoute><RouteErrorBoundary><ApplyPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/applications"       element={<ProtectedRoute><RouteErrorBoundary><ApplicationsPage /></RouteErrorBoundary></ProtectedRoute>} />

          {/* ── Admin ── */}
          <Route path="/admin/analytics"    element={<ProtectedRoute requireAdmin><RouteErrorBoundary><AdminAnalyticsPage /></RouteErrorBoundary></ProtectedRoute>} />
          <Route path="/admin/review-queue" element={<ProtectedRoute requireAdmin><RouteErrorBoundary><AdminReviewQueuePage /></RouteErrorBoundary></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppErrorBoundary>

      <Footer />

      {/* DPDP consent gate — rendered above everything else when needed */}
      {showConsentGate && (
        <ConsentModal onDecline={() => setConsentDeclined(true)} />
      )}

      {/* First-visit state selector */}
      <StateSelectorModal
        isOpen={showFirstVisitModal}
        onClose={() => setShowFirstVisitModal(false)}
      />
    </div>
  );
}

// ── Root: AuthProvider + ConsentProvider wrap everything ─────────────────────
export function App() {
  const [currentRole, setCurrentRole] = useState(
    localStorage.getItem('sahayak_user_role') || 'citizen'
  );

  return (
    <AuthProvider onRoleChange={setCurrentRole}>
      <ConsentProvider>
        <AppInner />
      </ConsentProvider>
    </AuthProvider>
  );
}
