import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { SchemesPage } from './pages/SchemesPage.jsx';
import { SchemeDetailPage } from './pages/SchemeDetailPage.jsx';
import { ChecklistPage } from './pages/ChecklistPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage.jsx';
import { AdminReviewQueuePage } from './pages/AdminReviewQueuePage.jsx';
import { RouteFocusManager } from './components/RouteFocusManager.jsx';

export function App() {
  const [currentRole, setCurrentRole] = useState('citizen');

  useEffect(() => {
    const savedRole = localStorage.getItem('sahayak_user_role');
    if (savedRole === 'admin' || savedRole === 'citizen') {
      setCurrentRole(savedRole);
    }
  }, []);

  const handleRoleToggle = (newRole) => {
    setCurrentRole(newRole);
    localStorage.setItem('sahayak_user_role', newRole);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <RouteFocusManager />
      
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-black focus:text-yellow-400 focus:ring-4 focus:ring-yellow-400"
      >
        Skip to main content
      </a>

      <Header currentRole={currentRole} onRoleToggle={handleRoleToggle} />

      <main id="main-content" className="flex-1 flex flex-col h-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage onRoleChange={handleRoleToggle} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/schemes/:id" element={<SchemeDetailPage />} />
          <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/review-queue" element={<AdminReviewQueuePage />} />
        </Routes>
      </main>
    </div>
  );
}
