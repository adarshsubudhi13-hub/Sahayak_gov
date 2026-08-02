/**
 * AuthContext – OTP-based mobile authentication via Supabase.
 *
 * When Supabase is not configured (no env vars) the context operates in
 * "demo mode": it exposes a fake session derived from localStorage so
 * existing demo flows continue to work unchanged.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase/client.js';

const AuthContext = createContext(null);

// ── Demo-mode session shape ──────────────────────────────────────────────────
function buildDemoSession(role = 'citizen') {
  return {
    user: {
      id: 'demo-user-1',
      phone: '+910000000000',
      user_metadata: { role },
    },
    role,
    isDemo: true,
  };
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children, onRoleChange }) {
  const [session, setSession] = useState(null);   // Supabase session or demo object
  const [role, setRole] = useState('citizen');
  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState(null);

  // ── Bootstrap ──────────────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Demo mode: restore role from localStorage
      const savedRole = localStorage.getItem('sahayak_user_role') || 'citizen';
      setRole(savedRole);
      const hasDemoSession = localStorage.getItem('sahayak_demo_session') === 'true';
      if (hasDemoSession) {
        setSession(buildDemoSession(savedRole));
      }
      setLoading(false);
      return;
    }

    // Real Supabase mode
    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      if (existing) {
        const r = existing.user?.user_metadata?.role || 'citizen';
        setRole(r);
        if (onRoleChange) onRoleChange(r);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        const r = newSession.user?.user_metadata?.role || 'citizen';
        setRole(r);
        if (onRoleChange) onRoleChange(r);
      } else {
        setRole('citizen');
      }
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── OTP request ────────────────────────────────────────────
  const requestOtp = useCallback(async (phoneNumber) => {
    setAuthError(null);

    if (!isSupabaseConfigured) {
      // Demo fallback: simulate OTP send
      setOtpSent(true);
      return { error: null };
    }

    // Normalize: ensure E.164 format
    const normalized = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
    if (error) {
      setAuthError(error.message);
      return { error };
    }
    setOtpSent(true);
    return { error: null };
  }, []);

  // ── OTP verify ─────────────────────────────────────────────
  const verifyOtp = useCallback(async (phoneNumber, token) => {
    setAuthError(null);

    if (!isSupabaseConfigured) {
      // Demo fallback: any 6-digit token accepted
      if (/^\d{6}$/.test(token)) {
        const savedRole = localStorage.getItem('sahayak_user_role') || 'citizen';
        const demo = buildDemoSession(savedRole);
        setSession(demo);
        setRole(savedRole);
        localStorage.setItem('sahayak_demo_session', 'true');
        if (onRoleChange) onRoleChange(savedRole);
        return { error: null };
      }
      const err = { message: 'Invalid OTP. Use any 6-digit code in demo mode.' };
      setAuthError(err.message);
      return { error: err };
    }

    const normalized = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    const { error } = await supabase.auth.verifyOtp({
      phone: normalized,
      token,
      type: 'sms',
    });
    if (error) {
      setAuthError(error.message);
      return { error };
    }
    return { error: null };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Demo quick-login (kept for hackathon judges) ────────────
  const demoLogin = useCallback((demoRole = 'citizen') => {
    const demo = buildDemoSession(demoRole);
    setSession(demo);
    setRole(demoRole);
    localStorage.setItem('sahayak_user_role', demoRole);
    localStorage.setItem('sahayak_demo_session', 'true');
    if (onRoleChange) onRoleChange(demoRole);
  }, [onRoleChange]);

  // ── Sign out ────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setRole('citizen');
    setOtpSent(false);
    localStorage.removeItem('sahayak_demo_session');
    localStorage.removeItem('sahayak_user_role');
    if (onRoleChange) onRoleChange('citizen');
  }, [onRoleChange]);

  // ── Role toggle (admin ↔ citizen, demo mode only) ───────────
  const toggleRole = useCallback((newRole) => {
    setRole(newRole);
    localStorage.setItem('sahayak_user_role', newRole);
    if (session?.isDemo) {
      setSession(buildDemoSession(newRole));
    }
    if (onRoleChange) onRoleChange(newRole);
  }, [session, onRoleChange]);

  const resetOtp = useCallback(() => {
    setOtpSent(false);
    setAuthError(null);
  }, []);

  const isAuthenticated = Boolean(session);
  const userId = session?.user?.id ?? null;

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      userId,
      role,
      isAuthenticated,
      isDemo: session?.isDemo ?? false,
      loading,
      otpSent,
      authError,
      setAuthError,
      requestOtp,
      verifyOtp,
      resetOtp,
      demoLogin,
      signOut,
      toggleRole,
      isSupabaseConfigured,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
