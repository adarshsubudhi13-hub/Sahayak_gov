import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchProfile, upsertProfile } from '../lib/supabase/db.js';
import { ShieldCheck, ArrowRight, Lock, User, MapPin, Briefcase, GraduationCap, Users, RefreshCw, CheckCircle2 } from 'lucide-react';

const DEFAULT_PROFILE = {
  role: 'citizen',
  full_name: '',
  age: 25,
  gender: 'female',
  occupation: 'Student',
  annual_income_band: '1L_2L',
  education_level: 'Undergraduate (BA/BSc/BCom/BTech)',
  social_category: 'SC',
  disability_status: false,
  preferred_language: 'en',
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { selectedState, setSelectedState } = useStateContext();
  const { userId, isSupabaseConfigured } = useAuth();

  const [profile, setProfile] = useState({
    ...DEFAULT_PROFILE,
    state: selectedState.name,
    state_id: selectedState.id,
    district: selectedState.districts[0] || '',
    preferred_language: language,
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Load profile from Supabase or localStorage fallback ──────
  useEffect(() => {
    async function load() {
      setLoadingProfile(true);

      // Try Supabase first
      if (isSupabaseConfigured && userId) {
        const dbProfile = await fetchProfile(userId);
        if (dbProfile) {
          setProfile(p => ({ ...p, ...dbProfile }));
          // Sync state context if the saved profile has a state_id
          if (dbProfile.state_id) setSelectedState(dbProfile.state_id);
          setLoadingProfile(false);
          return;
        }
      }

      // Fallback: localStorage
      const saved = localStorage.getItem('sahayak_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile(p => ({ ...p, ...parsed }));
          if (parsed.state_id) setSelectedState(parsed.state_id);
        } catch (e) { /* ignore parse errors */ }
      }
      setLoadingProfile(false);
    }
    load();
  }, [userId, isSupabaseConfigured]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keep state & district in sync with state context ─────────
  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      state: selectedState.name,
      state_id: selectedState.id,
      district: selectedState.districts.includes(prev.district)
        ? prev.district
        : selectedState.districts[0] || '',
    }));
  }, [selectedState]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const profilePayload = {
      ...profile,
      state: selectedState.name,
      state_id: selectedState.id,
      preferred_language: language,
    };

    // Persist to Supabase
    if (isSupabaseConfigured && userId) {
      await upsertProfile(userId, profilePayload);
    }

    // Always persist to localStorage as offline fallback
    localStorage.setItem('sahayak_user_profile', JSON.stringify(profilePayload));

    setSaving(false);
    setSaved(true);

    setTimeout(() => navigate('/schemes'), 600);
  }, [profile, selectedState, language, userId, isSupabaseConfigured, navigate]);

  if (loadingProfile) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-8">

        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Step 1 of 2 • Deterministic Eligibility Calculation
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('profileTitle')}
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t('profileSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {t('fullNameLabel')}
              </label>
              <input
                type="text"
                required
                value={profile.full_name}
                onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('ageLabel')}
              </label>
              <input
                type="number"
                required
                min={1}
                max={120}
                value={profile.age}
                onChange={e => setProfile({ ...profile, age: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('genderLabel')}
              </label>
              <select
                value={profile.gender}
                onChange={e => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other / Transgender</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {t('districtLabel')} ({selectedState.name})
              </label>
              <select
                value={profile.district}
                onChange={e => setProfile({ ...profile, district: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
              >
                {selectedState.districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                {t('occupationLabel')}
              </label>
              <select
                value={profile.occupation}
                onChange={e => setProfile({ ...profile, occupation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
              >
                <option value="Student">Student</option>
                <option value="Farmer / Agriculturist">Farmer / Agriculturist</option>
                <option value="Agricultural Worker / Tenant Farmer">Agricultural Worker / Tenant Farmer</option>
                <option value="Unemployed Youth">Unemployed Youth</option>
                <option value="Self-Employed / Artisan">Self-Employed / Artisan</option>
                <option value="Private Sector Employee">Private Sector Employee</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Homemaker">Homemaker</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('incomeBandLabel')}
              </label>
              <select
                value={profile.annual_income_band}
                onChange={e => setProfile({ ...profile, annual_income_band: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
              >
                <option value="below_1L">{t('below_1L')}</option>
                <option value="1L_2L">{t('1L_2L')}</option>
                <option value="2L_5L">{t('2L_5L')}</option>
                <option value="above_5L">{t('above_5L')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                {t('educationLabel')}
              </label>
              <select
                value={profile.education_level}
                onChange={e => setProfile({ ...profile, education_level: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
              >
                <option value="10th Pass or below">10th Pass or below</option>
                <option value="Intermediate">Intermediate (10+2)</option>
                <option value="Diploma / ITI">Diploma / ITI</option>
                <option value="Undergraduate (BA/BSc/BCom/BTech)">Undergraduate (BA/BSc/BCom/BTech)</option>
                <option value="Postgraduate (MA/MSc/MBA/MTech)">Postgraduate (MA/MSc/MBA/MTech)</option>
                <option value="Doctorate / PhD">Doctorate / PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                {t('socialCategoryLabel')}
              </label>
              <select
                value={profile.social_category}
                onChange={e => setProfile({ ...profile, social_category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
              >
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="OBC">OBC / BC (Backward Class)</option>
                <option value="General">General / EBC</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="pwd"
              checked={profile.disability_status}
              onChange={e => setProfile({ ...profile, disability_status: e.target.checked })}
              className="w-4 h-4 text-teal-700 border-gray-300 rounded focus:ring-teal-600"
            />
            <label htmlFor="pwd" className="text-xs font-medium text-gray-700 cursor-pointer">
              {t('disabilityLabel')}
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-70 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  Profile Saved!
                </>
              ) : (
                <>
                  {t('saveProfileBtn')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-500" />
            {t('privacyNote')}
          </p>
        </form>
      </div>
    </div>
  );
}
