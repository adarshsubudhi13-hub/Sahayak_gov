import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { SchemeCard } from '../components/SchemeCard.jsx';
import { matchProfileAgainstSchemes } from '../lib/engine/eligibilityMatcher.js';
import {
  fetchSavedSchemeIds, fetchApplications,
  saveScheme, unsaveScheme
} from '../lib/supabase/db.js';
import { LayoutDashboard, RefreshCw, ClipboardList, BookmarkCheck, Target } from 'lucide-react';

const STATUS_CONFIG = {
  submitted:    { label: 'Submitted',    color: 'bg-blue-100 text-blue-800 border-blue-200' },
  under_review: { label: 'Under Review', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  approved:     { label: 'Approved',     color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  rejected:     { label: 'Rejected',     color: 'bg-red-100 text-red-800 border-red-200' },
  withdrawn:    { label: 'Withdrawn',    color: 'bg-gray-100 text-gray-700 border-gray-200' },
};

export function DashboardPage() {
  const { t } = useLanguage();
  const { stateSchemes, stateRules, selectedStateId } = useStateContext();
  const { userId, isSupabaseConfigured } = useAuth();

  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('matched');
  const [loading, setLoading] = useState(true);

  // ── Bootstrap: profile, matching, saved, applications ────────
  useEffect(() => {
    async function load() {
      setLoading(true);

      // Profile from localStorage
      const savedProf = localStorage.getItem('sahayak_user_profile');
      let currentProfile = {
        id: userId || 'demo-user-1',
        role: 'citizen',
        full_name: 'Citizen',
        age: 25,
        gender: 'female',
        state: 'Telangana',
        district: 'Warangal',
        occupation: 'Student',
        annual_income_band: '1L_2L',
        education_level: 'Undergraduate (BA/BSc/BCom/BTech)',
        social_category: 'SC',
        disability_status: false,
        preferred_language: 'en',
      };
      if (savedProf) {
        try { currentProfile = JSON.parse(savedProf); } catch (e) { /* ignore */ }
      }
      setProfile(currentProfile);
      setMatches(matchProfileAgainstSchemes(currentProfile, stateSchemes, stateRules));

      // Saved schemes
      if (isSupabaseConfigured && userId) {
        const dbSaved = await fetchSavedSchemeIds(userId);
        if (dbSaved) {
          setSavedIds(dbSaved);
        } else {
          loadSavedFromStorage();
        }
      } else {
        loadSavedFromStorage();
      }

      // Applications
      if (isSupabaseConfigured && userId) {
        const dbApps = await fetchApplications(userId);
        if (dbApps) {
          setApplications(dbApps);
        } else {
          loadApplicationsFromStorage();
        }
      } else {
        loadApplicationsFromStorage();
      }

      setLoading(false);
    }

    function loadSavedFromStorage() {
      const saved = localStorage.getItem('sahayak_saved_schemes');
      if (saved) {
        try { setSavedIds(JSON.parse(saved)); } catch (e) { /* ignore */ }
      }
    }

    function loadApplicationsFromStorage() {
      const saved = localStorage.getItem('sahayak_applications');
      if (saved) {
        try { setApplications(JSON.parse(saved)); } catch (e) { /* ignore */ }
      }
    }

    load();
  }, [stateSchemes, stateRules, userId, isSupabaseConfigured]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveScheme = useCallback(async (schemeId) => {
    const isSaved = savedIds.includes(schemeId);
    const updated = isSaved
      ? savedIds.filter(id => id !== schemeId)
      : [...savedIds, schemeId];
    setSavedIds(updated);
    localStorage.setItem('sahayak_saved_schemes', JSON.stringify(updated));

    if (isSupabaseConfigured && userId) {
      if (isSaved) await unsaveScheme(userId, schemeId);
      else await saveScheme(userId, schemeId, selectedStateId);
    }
  }, [savedIds, userId, isSupabaseConfigured, selectedStateId]);

  const eligibleMatches = matches.filter(m => m.is_eligible);
  const savedMatches = matches.filter(m => savedIds.includes(m.scheme.id));

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Header card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700">
            <LayoutDashboard className="w-4 h-4" />
            {t('dashboardTitle')}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile?.full_name || 'Citizen'}!
          </h1>
          <p className="text-xs text-gray-500">
            Track your matched schemes, saved bookmarks, and application status.
          </p>
        </div>
        <Link
          to="/profile"
          className="px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all shrink-0"
        >
          Update Profile
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
        {[
          { key: 'matched', label: `${t('tabMatched')} (${eligibleMatches.length})`, icon: Target },
          { key: 'saved',   label: `${t('tabSaved')} (${savedMatches.length})`,     icon: BookmarkCheck },
          { key: 'tracker', label: `Applications (${applications.length})`,          icon: ClipboardList },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === tab.key
                ? 'bg-teal-700 text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Matched */}
      {activeTab === 'matched' && (
        eligibleMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleMatches.map(m => (
              <SchemeCard
                key={m.scheme.id}
                matchResult={m}
                onSave={handleSaveScheme}
                isSaved={savedIds.includes(m.scheme.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-xs text-gray-500 border border-gray-200">
            No matched schemes yet.{' '}
            <Link to="/profile" className="text-teal-700 font-bold hover:underline">
              Complete your profile
            </Link>{' '}
            to see eligible schemes.
          </div>
        )
      )}

      {/* Tab: Saved */}
      {activeTab === 'saved' && (
        savedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedMatches.map(m => (
              <SchemeCard
                key={m.scheme.id}
                matchResult={m}
                onSave={handleSaveScheme}
                isSaved={savedIds.includes(m.scheme.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-xs text-gray-500 border border-gray-200">
            No saved schemes yet. Bookmark schemes while browsing to track them here.
          </div>
        )
      )}

      {/* Tab: Application Tracker */}
      {activeTab === 'tracker' && (
        applications.length > 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Application Status Tracker</h2>
            <div className="divide-y divide-gray-100">
              {applications.map(app => {
                const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.submitted;
                return (
                  <div key={app.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {app.scheme_name || app.scheme_id}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {app.state_name} •{' '}
                        {new Date(app.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <Link
                        to={`/schemes/${app.scheme_id}`}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Scheme
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-xs text-gray-500 border border-gray-200 space-y-3">
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-gray-700">No applications yet.</p>
            <p>Browse matched schemes and click <strong>Apply</strong> to get started.</p>
            <Link
              to="/schemes"
              className="inline-block px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold shadow hover:bg-teal-800 transition-all"
            >
              Browse Schemes
            </Link>
          </div>
        )
      )}
    </div>
  );
}
