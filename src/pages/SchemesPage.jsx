import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { SchemeCard } from '../components/SchemeCard.jsx';
import { matchProfileAgainstSchemes } from '../lib/engine/eligibilityMatcher.js';
import { fetchSchemesAndRules } from '../lib/api.js';
import { Filter, Sparkles, UserCheck, MessageSquare, Loader2 } from 'lucide-react';

export function SchemesPage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedSchemeIds, setSavedSchemeIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
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
          try {
            currentProfile = JSON.parse(savedProf);
          } catch (e) {}
        }
        setProfile(currentProfile);

        // Fetch schemes from simulated API
        const response = await fetchSchemesAndRules();
        const schemesFromApi = response.data.schemes;

        const results = matchProfileAgainstSchemes(currentProfile, schemesFromApi);
        setMatches(results);

        const savedList = localStorage.getItem('sahayak_saved_schemes');
        if (savedList) {
          try {
            setSavedSchemeIds(JSON.parse(savedList));
          } catch (e) {}
        }
      } catch (error) {
        console.error("Error loading schemes:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveScheme = (schemeId) => {
    let updated;
    if (savedSchemeIds.includes(schemeId)) {
      updated = savedSchemeIds.filter(id => id !== schemeId);
    } else {
      updated = [...savedSchemeIds, schemeId];
    }
    setSavedSchemeIds(updated);
    localStorage.setItem('sahayak_saved_schemes', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
      </div>
    );
  }

  const eligibleMatches = matches.filter(m => m.is_eligible);
  const filteredMatches = selectedCategory === 'all' 
    ? eligibleMatches 
    : eligibleMatches.filter(m => m.scheme.category === selectedCategory);

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
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Active Matching Context for {profile.full_name}
            </div>
            <h2 className="text-xl font-bold">
              {t('matchedSchemesTitle')} ({eligibleMatches.length} Schemes Matched)
            </h2>
            <p className="text-xs text-teal-100/80">
              {profile.district} • Category: {profile.social_category} • {profile.occupation}
            </p>
          </div>

          <Link
            to="/profile"
            className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold border border-teal-600 transition-all shrink-0"
          >
            Edit Profile
          </Link>
        </div>
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold shadow hover:bg-teal-800 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            Ask Sahayak AI Assistant
          </Link>
        </div>
      )}

    </div>
  );
}
