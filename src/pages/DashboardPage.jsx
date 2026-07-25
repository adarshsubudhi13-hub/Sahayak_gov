import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { SchemeCard } from '../components/SchemeCard.jsx';
import { matchProfileAgainstSchemes } from '../lib/engine/eligibilityMatcher.js';
import { LayoutDashboard } from 'lucide-react';

export function DashboardPage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('matched');
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    let currentProfile = {
      id: 'demo-user-1',
      role: 'citizen',
      full_name: 'Rani Kumari',
      age: 20,
      gender: 'female',
      state: 'Telangana',
      district: 'Warangal',
      occupation: 'Student',
      annual_income_band: '1L_2L',
      education_level: 'Undergraduate (BA/BSc/BCom/BTech)',
      social_category: 'SC',
      disability_status: false,
      preferred_language: 'en'
    };

    const savedProf = localStorage.getItem('sahayak_user_profile');
    if (savedProf) {
      try { currentProfile = JSON.parse(savedProf); } catch (e) {}
    }
    setProfile(currentProfile);

    const results = matchProfileAgainstSchemes(currentProfile);
    setMatches(results);

    const saved = localStorage.getItem('sahayak_saved_schemes');
    if (saved) {
      try { setSavedIds(JSON.parse(saved)); } catch (e) {}
    }

    const savedStatus = localStorage.getItem('sahayak_app_statuses');
    if (savedStatus) {
      try { setStatuses(JSON.parse(savedStatus)); } catch (e) {}
    }
  }, []);

  const handleStatusChange = (schemeId, status) => {
    const updated = { ...statuses, [schemeId]: status };
    setStatuses(updated);
    localStorage.setItem('sahayak_app_statuses', JSON.stringify(updated));
  };

  const eligibleMatches = matches.filter(m => m.is_eligible);
  const savedMatches = matches.filter(m => savedIds.includes(m.scheme.id));

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
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
            Track your matched schemes, saved bookmarks, and document readiness.
          </p>
        </div>

        <Link
          to="/profile"
          className="px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all shrink-0"
        >
          Update Profile Criteria
        </Link>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
        <button
          onClick={() => setActiveTab('matched')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'matched'
              ? 'bg-teal-700 text-white shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('tabMatched')} ({eligibleMatches.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-teal-700 text-white shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('tabSaved')} ({savedMatches.length})
        </button>

        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tracker'
              ? 'bg-teal-700 text-white shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('tabTracker')}
        </button>
      </div>

      {activeTab === 'matched' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eligibleMatches.map(m => (
            <SchemeCard key={m.scheme.id} matchResult={m} />
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        savedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedMatches.map(m => (
              <SchemeCard key={m.scheme.id} matchResult={m} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-xs text-gray-500 border border-gray-200">
            No saved schemes yet. Bookmark schemes while browsing to track them here!
          </div>
        )
      )}

      {activeTab === 'tracker' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Application Status Tracker
          </h2>

          <div className="divide-y divide-gray-100">
            {eligibleMatches.map(m => {
              const currentStatus = statuses[m.scheme.id] || 'not_started';
              return (
                <div key={m.scheme.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{m.scheme.name_en}</h3>
                    <p className="text-xs text-gray-500">{m.scheme.issuing_department}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {['not_started', 'in_progress', 'applied'].map(st => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(m.scheme.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          currentStatus === st
                            ? st === 'applied'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : st === 'in_progress'
                              ? 'bg-amber-500 text-slate-950 border-amber-500'
                              : 'bg-slate-700 text-white border-slate-700'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {st.replace('_', ' ').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
