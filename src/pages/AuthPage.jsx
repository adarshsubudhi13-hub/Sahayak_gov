import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  ShieldCheck, ArrowRight, Lock, Sparkles,
  Phone, KeyRound, RefreshCw, CheckCircle2, AlertCircle, ChevronLeft
} from 'lucide-react';

// OTP digit input component
function OtpInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (index, char) => {
    const digit = char.replace(/\D/g, '').slice(-1);
    const arr = value.split('');
    arr[index] = digit;
    const next = arr.join('');
    onChange(next);
    if (digit && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, ''));
    if (pasted.length > 0) {
      inputs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          className="w-11 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none transition-all bg-white"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const {
    requestOtp, verifyOtp, demoLogin,
    otpSent, authError, setAuthError,
    isAuthenticated, isSupabaseConfigured,
  } = useAuth();

  const from = location.state?.from?.pathname || '/profile';

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setSuccessMsg('');

    const cleaned = phone.replace(/\s+/g, '').replace(/^0+/, '');
    if (!/^\d{10}$/.test(cleaned) && !/^\+\d{10,15}$/.test(phone)) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLocalLoading(true);
    const { error } = await requestOtp(cleaned);
    setLocalLoading(false);

    if (!error) {
      setResendCooldown(30);
      setSuccessMsg(
        isSupabaseConfigured
          ? 'OTP sent to your mobile number.'
          : 'Demo mode: enter any 6-digit code to continue.'
      );
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (otp.replace(/\D/g, '').length < 6) {
      setAuthError('Please enter the complete 6-digit OTP.');
      return;
    }
    setLocalLoading(true);
    const { error } = await verifyOtp(phone, otp);
    setLocalLoading(false);
    if (!error) navigate(from, { replace: true });
  };

  const handleDemoLogin = (role) => {
    demoLogin(role);
    if (role === 'admin') {
      navigate('/admin/analytics', { replace: true });
    } else {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">

        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {otpSent ? 'Verify OTP' : 'Sign In / Sign Up'}
          </h2>
          <p className="text-xs text-gray-500">
            {otpSent
              ? `We sent a 6-digit code to +91 ${phone}`
              : 'Enter your mobile number to receive a one-time password.'}
          </p>
        </div>

        {/* Demo Shortcuts */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
            <Sparkles className="w-4 h-4 text-teal-600" />
            Hackathon Demo — instant login:
          </div>
          <button
            onClick={() => handleDemoLogin('citizen')}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-all flex items-center justify-between"
          >
            <span>{t('demoCitizenLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDemoLogin('admin')}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all flex items-center justify-between"
          >
            <span>{t('demoAdminLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-gray-400 font-medium">
              or use mobile OTP
            </span>
          </div>
        </div>

        {/* Step 1: Phone input */}
        {!otpSent && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-xs font-semibold select-none">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                  inputMode="tel"
                  className="flex-1 px-4 py-3 rounded-r-xl border border-gray-300 text-sm focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {isSupabaseConfigured
                  ? 'An OTP will be sent via SMS.'
                  : 'Demo mode — no real SMS will be sent.'}
              </p>
            </div>

            {authError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={localLoading || phone.length < 10}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 disabled:opacity-50 transition-all shadow flex items-center justify-center gap-2"
            >
              {localLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Send OTP
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP verification */}
        {otpSent && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            {successMsg && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5 text-xs text-emerald-700">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {successMsg}
              </div>
            )}

            <OtpInput value={otp} onChange={setOtp} />

            {authError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={localLoading || otp.replace(/\D/g, '').length < 6}
              className="w-full py-3 rounded-xl bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 disabled:opacity-50 transition-all shadow flex items-center justify-center gap-2"
            >
              {localLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Verify OTP
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setOtp('');
                  // reset otpSent via parent – call requestOtp again resets flag
                }}
                className="flex items-center gap-1 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Change number
              </button>

              {resendCooldown > 0 ? (
                <span className="text-gray-400">Resend in {resendCooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={localLoading}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1 pt-2">
          <Lock className="w-3 h-3 text-emerald-500" />
          Zero Aadhaar or National ID collected.
        </p>
      </div>
    </div>
  );
}
