import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';

export function AuthPage({ onRoleChange }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleCustomAuth = (e) => {
    e.preventDefault();
    localStorage.setItem('sahayak_user_role', 'citizen');
    if (onRoleChange) onRoleChange('citizen');
    navigate('/profile');
  };

  const handleQuickDemo = (role) => {
    localStorage.setItem('sahayak_user_role', role);
    if (onRoleChange) onRoleChange(role);
    if (role === 'admin') {
      navigate('/admin/analytics');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? t('login') : t('signup')}
          </h2>
          <p className="text-xs text-gray-500">
            Access personalized scheme matching & grounded AI assistance
          </p>
        </div>

        {/* Demo Shortcuts */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Instant Hackathon Demo Login:</span>
          </div>
          
          <button
            onClick={() => handleQuickDemo('citizen')}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-all flex items-center justify-between"
          >
            <span>{t('demoCitizenLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleQuickDemo('admin')}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all flex items-center justify-between"
          >
            <span>{t('demoAdminLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCustomAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="citizen@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow"
          >
            {isLogin ? t('login') : t('signup')}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-teal-700 hover:underline font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already registered? Log In'}
          </button>
        </div>

        <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-emerald-500" />
          Zero Aadhaar or National ID collected.
        </p>

      </div>
    </div>
  );
}
