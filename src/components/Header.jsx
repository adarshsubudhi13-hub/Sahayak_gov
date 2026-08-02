import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { StateSelectorModal } from './StateSelectorModal.jsx';
import {
  ShieldCheck,
  Languages,
  UserCheck,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  ListFilter,
  ChevronDown,
  ClipboardList,
  FileCheck,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export function Header({ currentRole = 'citizen', onRoleToggle }) {
  const { language, setLanguage, t, languages } = useLanguage();
  const { selectedState } = useStateContext();
  const { isAuthenticated, signOut, toggleRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLocalLangCode = selectedState.localLangCode;
  const quickLangCodes = Array.from(new Set(['en', 'hi', currentLocalLangCode]));

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth', { replace: true });
  };

  const handleRoleToggle = () => {
    const newRole = currentRole === 'citizen' ? 'admin' : 'citizen';
    if (toggleRole) toggleRole(newRole);
    if (onRoleToggle) onRoleToggle(newRole);
    if (newRole === 'admin') navigate('/admin/analytics');
    else navigate('/schemes');
  };

  const navLinks = [
    { to: '/schemes',      label: t('navSchemes'),   icon: ListFilter,   roles: ['citizen', 'admin'] },
    { to: '/chat',         label: t('navChat'),       icon: MessageSquare, roles: ['citizen', 'admin'] },
    { to: '/dashboard',    label: t('navDashboard'),  icon: LayoutDashboard, roles: ['citizen'] },
    { to: '/vault',        label: 'Doc Vault',        icon: FileCheck,    roles: ['citizen'] },
    { to: '/applications', label: 'Applications',     icon: ClipboardList, roles: ['citizen'] },
    { to: '/admin/analytics',    label: t('navAdmin'),       icon: BarChart3,    roles: ['admin'] },
    { to: '/admin/review-queue', label: t('navReviewQueue'), icon: null,         roles: ['admin'] },
  ].filter(l => l.roles.includes(currentRole));

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo + State Badge */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    {t('appName')}
                  </span>
                  <p className="text-[11px] text-gray-500">AI Government Scheme Navigator</p>
                </div>
              </Link>

              <button
                onClick={() => setIsStateModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs transition-all shadow-2xs group"
              >
                <span>{selectedState.emoji}</span>
                <span className="font-bold">{selectedState.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-700 group-hover:translate-y-0.5 transition-transform ml-0.5" />
              </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === link.to
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">

              {/* Language Switcher */}
              <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                <Languages className="w-4 h-4 text-gray-500 ml-1.5 mr-1" />
                {quickLangCodes.map(code => {
                  const langObj = languages.find(l => l.code === code) || { nativeName: code };
                  return (
                    <button
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        language === code
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                      }`}
                    >
                      {langObj.nativeName}
                    </button>
                  );
                })}
              </div>

              {/* Role Switcher */}
              {isAuthenticated && (
                <button
                  onClick={handleRoleToggle}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    currentRole === 'admin'
                      ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                      : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="capitalize font-bold">{currentRole}</span>
                </button>
              )}

              {/* Sign out */}
              {isAuthenticated && (
                <button
                  onClick={handleSignOut}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
              {quickLangCodes.map(code => {
                const langObj = languages.find(l => l.code === code) || { nativeName: code };
                return (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                      language === code
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {langObj.nativeName}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <StateSelectorModal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
      />
    </>
  );
}
