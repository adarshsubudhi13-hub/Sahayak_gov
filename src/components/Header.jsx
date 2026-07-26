import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, Languages, UserCheck, LayoutDashboard, MessageSquare, BarChart3, ListFilter } from 'lucide-react';

export function Header({ currentRole = 'citizen', onRoleToggle }) {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                {t('appName')}
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-semibold">
                  India
                </span>
              </span>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                AI Government Scheme Navigator
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/schemes"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                pathname === '/schemes' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              {t('navSchemes')}
            </Link>

            <Link
              to="/chat"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                pathname === '/chat' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              {t('navChat')}
            </Link>

            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                pathname === '/dashboard' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              {t('navDashboard')}
            </Link>

            {currentRole === 'admin' && (
              <>
                <Link
                  to="/admin/analytics"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === '/admin/analytics' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  {t('navAdmin')}
                </Link>

                <Link
                  to="/admin/review-queue"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === '/admin/review-queue' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {t('navReviewQueue')}
                </Link>
              </>
            )}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Language Switcher */}
            <div className="relative flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
              <Languages className="w-4 h-4 text-gray-500 ml-1.5 mr-1" />
              {['en', 'hi', 'te'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                    language === lang
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'తెలుగు'}
                </button>
              ))}
            </div>

            {/* Role Switcher */}
            <button
              onClick={() => onRoleToggle && onRoleToggle(currentRole === 'citizen' ? 'admin' : 'citizen')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                currentRole === 'admin'
                  ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                  : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
              }`}
              title="Toggle Demo Role"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Role: <span className="capitalize font-bold">{currentRole}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
