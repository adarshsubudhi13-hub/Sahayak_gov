import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { SchemeCard } from '../components/SchemeCard.jsx';
import { matchProfileAgainstSchemes } from '../lib/engine/eligibilityMatcher.js';
import {
  fetchSavedSchemeIds, saveScheme, unsaveScheme, logTelemetryEvent
} from '../lib/supabase/db.js';
import { Filter, Sparkles, UserCheck, MapPin, ListFilter } from 'lucide-react';

export function SchemesPage() {
  const { t } = useLanguage();
  const { selectedState, selectedStateId, stateSchemes, stateRules } = useStateContext();
  const { userId, isSupabaseConfigured } = useAuth();

  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllSchemes, setShowAllSchemes] = useState(false);
  const [savedSchemeIds, setSavedSchemeIds] = useState([]);

  // ── Load profile + run matching ───────────────────────────────
  useEffect(() => {
    const fallback = {
      id: userId || 'demo-user-1',
      role: 'citizen',
      full_name: 'Citizen',
      age: 25,
      gender: 'female',
      state: selectedState.name,
      district: selectedState.districts[0] || '',
      occupation: 'Student',
      annual_income_band: '1L_2L',
      education_level: 'Undergraduate (BA/BSc/BCom/BTech)',
      social_category: 'SC',
      disability_status: false,
      preferred_language: 'en',
    };

    const savedProf = localStorage.getItem('sahayak_user_profile');
    let currentProfile = fallback;
    if (savedProf) {
      try { currentProfile = JSON.parse(savedProf); } catch (e) { /* ignore */ }
    }
    setProfile(currentProfile);

    const results = matchProfileAgainstSchemes(currentProfile, stateSchemes, stateRules);
    setMatches(results);

    // Log "matched" telemetry events for eligible schemes
    if (isSupabaseConfigured) {
      const eligibleIds = results.filter(r => r.is_eligible).map(r => r.scheme.id);
      eligibleIds.slice(0, 10).forEach(schemeId => {
        logTelemetryEvent(
          userId, schemeId, 'matched',
          selectedStateId, currentProfile.district
        );
      });
    }
  }, [selectedState, stateSchemes, stateRules, userId, selectedStateId, isSupabaseConfigured]);

  // ── Load saved scheme IDs ─────────────────────────────────────
  useEffect(() => {
    async function loadSaved() {
      if (isSupabaseConfigured && userId) {
        const ids = await fetchSavedSchemeIds(userId);
        if (ids) { setSavedSchemeIds(ids); return; }
      }
      // localStorage fallback
      const saved = localStorage.getItem('sahayak_saved_schemes');
      if (saved) {
        try { setSavedSchemeIds(JSON.parse(saved)); } catch (e) { /* ignore */ }
      }
    }
    loadSaved();
  }, [userId, isSupabaseConfigured]);

  // ── Save / unsave handler ─────────────────────────────────────
  const handleSaveScheme = useCallback(async (schemeId) => {
    const isSaved = savedSchemeIds.includes(schemeId);
    const updated = isSaved
      ? savedSchemeIds.filter(id => id !== schemeId)
      : [...savedSchemeIds, schemeId];

    setSavedSchemeIds(updated);
    localStorage.setItem('sahayak_saved_schemes', JSON.stringify(updated));

    if (isSupabaseConfigured && userId) {
      if (isSaved) {
        await unsaveScheme(userId, schemeId);
      } else {
        await saveScheme(userId, schemeId, selectedStateId);
        logTelemetryEvent(userId, schemeId, 'saved', selectedStateId, profile?.district);
      }
    }
  }, [savedSchemeIds, userId, isSupabaseConfigured, selectedStateId, profile]);

  const eligibleMatches = matches.filter(m => m.is_eligible);
  const targetMatches = showAllSchemes || eligibleMatches.length === 0
    ? matches
    : eligibleMatches;

  const filteredMatches = selectedCategory === 'all'
    ? targetMatches
    : targetMatches.filter(m => m.scheme.category === selectedCategory);

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Scholarships', value: 'scholarship' },
    { label: 'Women Welfare', value: 'womens_welfare' },
    { label: 'Farmer Support', value: 'farmer_subsidy' },
    { label: 'Pensions', value: 'pension' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Housing / Power', value: 'housing' },
    { label: 'Startup & Grants', value: 'startup_funding' },
  ];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

      {profile && (
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-teal-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Matching for {profile.full_name} •{' '}
              <span className="text-amber-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {selectedState.name}
              </span>
            </div>
            <h2 className="text-xl font-bold">
              {showAllSchemes
                ? `All Schemes in ${selectedState.name}`
                : t('matchedSchemesTitle')}{' '}
              ({targetMatches.length} Available)
            </h2>
            <p className="text-xs text-teal-100/80">
              {profile.district || selectedState.name} • Income:{' '}
              {profile.annual_income_band?.replace('_', '-')} • Category:{' '}
              {profile.social_category} • {profile.occupation}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllSchemes(!showAllSchemes)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                showAllSchemes
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-teal-800 text-white border-teal-600 hover:bg-teal-700'
              }`}
            >
              {showAllSchemes ? 'Showing All Schemes' : 'Show All State Schemes'}
            </button>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-teal-900 hover:bg-teal-800 text-teal-200 text-xs font-semibold border border-teal-700 transition-all shrink-0"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <button
            onClick={() => setShowAllSchemes(false)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              !showAllSchemes ? 'bg-teal-100 text-teal-800 font-bold' : 'hover:bg-gray-100'
            }`}
          >
            Eligible ({eligibleMatches.length})
          </button>
          <button
            onClick={() => setShowAllSchemes(true)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              showAllSchemes ? 'bg-teal-100 text-teal-800 font-bold' : 'hover:bg-gray-100'
            }`}
          >
            All ({matches.length})
          </button>
        </div>
      </div>

      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map(m => (
            <SchemeCard
              key={m.scheme.id}
              matchResult={m}
              onSave={handleSaveScheme}
              isSaved={savedSchemeIds.includes(m.scheme.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4 max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">{t('noMatchesTitle')}</h3>
          <p className="text-xs text-gray-500">{t('noMatchesSubtitle')}</p>
          <button
            onClick={() => setShowAllSchemes(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow hover:bg-slate-800 transition-all"
          >
            <ListFilter className="w-4 h-4 text-amber-400" />
            Browse All Schemes in {selectedState.name}
          </button>
        </div>
      )}
    </div>
  );
}
