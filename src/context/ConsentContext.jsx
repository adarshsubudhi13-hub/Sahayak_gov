/**
 * ConsentContext – DPDP Act 2023 consent management.
 *
 * Tracks whether the user has given informed consent to data collection.
 * Persists consent record to Supabase (with localStorage fallback).
 * Exposes hasConsented, giveConsent, withdrawConsent.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase/client.js';

const CONSENT_VERSION = '1.0'; // bump when policy materially changes
const LOCAL_KEY = 'sahayak_consent_v1';

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  const [hasConsented, setHasConsented] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Bootstrap: check existing consent ────────────────────────────────────
  useEffect(() => {
    const local = localStorage.getItem(LOCAL_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.version === CONSENT_VERSION && parsed.consented) {
          setHasConsented(true);
          setLoading(false);
          return;
        }
      } catch (e) { /* ignore corrupt data */ }
    }
    setLoading(false);
  }, []);

  // ── Record consent ────────────────────────────────────────────────────────
  const giveConsent = useCallback(async (userId = null) => {
    const record = {
      version: CONSENT_VERSION,
      consented: true,
      consented_at: new Date().toISOString(),
    };

    // Persist locally first (works offline / demo mode)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(record));
    setHasConsented(true);

    // Persist to Supabase if configured and user is logged in
    if (isSupabaseConfigured && userId) {
      try {
        await supabase.from('consent_records').upsert({
          user_id: userId,
          version: CONSENT_VERSION,
          consented: true,
          consented_at: record.consented_at,
          channel: 'web',
        });
      } catch (e) {
        console.warn('[ConsentContext] Supabase write failed — local consent still recorded.', e);
      }
    }
  }, []);

  // ── Withdraw consent ─────────────────────────────────────────────────────
  const withdrawConsent = useCallback(async (userId = null) => {
    localStorage.removeItem(LOCAL_KEY);
    setHasConsented(false);

    if (isSupabaseConfigured && userId) {
      try {
        await supabase.from('consent_records').upsert({
          user_id: userId,
          version: CONSENT_VERSION,
          consented: false,
          withdrawn_at: new Date().toISOString(),
          channel: 'web',
        });
      } catch (e) {
        console.warn('[ConsentContext] Supabase withdraw failed.', e);
      }
    }
  }, []);

  return (
    <ConsentContext.Provider value={{ hasConsented, loading, giveConsent, withdrawConsent, CONSENT_VERSION }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
