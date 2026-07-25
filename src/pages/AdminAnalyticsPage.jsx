import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { matchProfileAgainstSchemes } from '../lib/engine/eligibilityMatcher.js';
import { TELANGANA_SCHEMES } from '../lib/seed/telanganaSchemes.js';
import {
  BarChart3, Users, TrendingUp, AlertTriangle, MapPin,
  ShieldCheck, Eye, ArrowUpRight, Activity
} from 'lucide-react';

const DEMO_DISTRICTS = [
  { name: 'Hyderabad', queries: 1842, matches: 1456, applications: 312, color: 'bg-teal-600' },
  { name: 'Warangal', queries: 923, matches: 678, applications: 189, color: 'bg-teal-500' },
  { name: 'Karimnagar', queries: 712, matches: 534, applications: 134, color: 'bg-teal-400' },
  { name: 'Nizamabad', queries: 543, matches: 387, applications: 98, color: 'bg-emerald-500' },
  { name: 'Khammam', queries: 478, matches: 321, applications: 87, color: 'bg-emerald-400' },
  { name: 'Medak', queries: 367, matches: 245, applications: 56, color: 'bg-sky-500' },
  { name: 'Rangareddy', queries: 821, matches: 612, applications: 234, color: 'bg-sky-400' },
  { name: 'Adilabad', queries: 289, matches: 167, applications: 34, color: 'bg-amber-500' },
  { name: 'Mahbubnagar', queries: 401, matches: 289, applications: 67, color: 'bg-amber-400' },
  { name: 'Nalgonda', queries: 534, matches: 398, applications: 112, color: 'bg-purple-500' },
];

export function AdminAnalyticsPage() {
  const { t } = useLanguage();
  const [reviewQueue, setReviewQueue] = useState([]);
  const [schemeStats, setSchemeStats] = useState([]);

  useEffect(() => {
    const savedQueue = localStorage.getItem('sahayak_review_queue');
    if (savedQueue) {
      try { setReviewQueue(JSON.parse(savedQueue)); } catch (e) {}
    }

    const demoProfile = {
      id: 'demo-user-1', role: 'citizen', full_name: 'Demo Citizen',
      age: 20, gender: 'female', state: 'Telangana', district: 'Warangal',
      occupation: 'Student', annual_income_band: '1L_2L',
      education_level: 'Undergraduate (BA/BSc/BCom/BTech)',
      social_category: 'SC', disability_status: false, preferred_language: 'en'
    };
    const results = matchProfileAgainstSchemes(demoProfile);

    const stats = TELANGANA_SCHEMES.map(scheme => {
      const match = results.find(r => r.scheme.id === scheme.id);
      return {
        id: scheme.id,
        name: scheme.name_en,
        department: scheme.issuing_department,
        category: scheme.category,
        totalSearches: Math.floor(Math.random() * 900) + 200,
        totalMatches: Math.floor(Math.random() * 600) + 100,
        totalApplications: Math.floor(Math.random() * 200) + 30,
        isEligible: match ? match.is_eligible : false,
      };
    }).sort((a, b) => b.totalSearches - a.totalSearches);

    setSchemeStats(stats);
  }, []);

  const totalProfiles = 6823;
  const totalMatches = schemeStats.reduce((sum, s) => sum + s.totalMatches, 0);
  const totalQueries = 4217;
  const pendingReviews = reviewQueue.filter(r => r.status === 'pending').length;

  const maxSearches = Math.max(...schemeStats.map(s => s.totalSearches), 1);
  const maxDistrictQueries = Math.max(...DEMO_DISTRICTS.map(d => d.queries), 1);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 text-xs text-amber-200 font-bold mb-1">
          <ShieldCheck className="w-4 h-4" />
          Universal e-Governance Analytics Dashboard (Pan-India)
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t('adminTitle')}
        </h1>
        <p className="text-xs text-amber-100/90 mt-1 max-w-2xl">
          {t('adminSubtitle')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-teal-700">
            <Users className="w-5 h-5" />
            <span className="text-xs font-semibold text-gray-500">{t('statProfiles')}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{totalProfiles.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12.3% this month
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-semibold text-gray-500">{t('statMatches')}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{totalMatches.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +8.7% this month
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-blue-600">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-semibold text-gray-500">{t('statQueries')}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{totalQueries.toLocaleString()}</p>
          <p className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +15.2% this month
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-semibold text-gray-500">{t('statFlagged')}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{pendingReviews}</p>
          <Link to="/admin/review-queue" className="text-[11px] text-amber-700 hover:underline font-semibold">
            Open Review Queue →
          </Link>
        </div>
      </div>

      {/* Top Schemes Chart */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-teal-700" />
          <h2 className="text-lg font-bold text-gray-900">{t('topSchemesChart')}</h2>
        </div>

        <div className="space-y-3">
          {schemeStats.slice(0, 8).map((scheme, idx) => {
            const barWidth = Math.max(5, (scheme.totalSearches / maxSearches) * 100);
            const matchRate = Math.round((scheme.totalMatches / scheme.totalSearches) * 100);
            const appRate = Math.round((scheme.totalApplications / scheme.totalMatches) * 100);

            return (
              <div key={scheme.id} className="flex items-center gap-4">
                <span className="text-[11px] font-mono text-gray-400 w-5 text-right shrink-0">
                  #{idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="text-xs font-bold text-gray-800 hover:text-teal-700 truncate"
                    >
                      {scheme.name}
                    </Link>
                    <div className="flex items-center gap-3 text-[11px] shrink-0">
                      <span className="text-gray-500">
                        <Eye className="w-3 h-3 inline mr-0.5" />
                        {scheme.totalSearches}
                      </span>
                      <span className="text-emerald-600 font-semibold">{matchRate}% match</span>
                      <span className={`font-bold ${appRate < 30 ? 'text-amber-600' : 'text-teal-700'}`}>
                        {appRate}% applied
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-700"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* District Heatmap */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-teal-700" />
          <h2 className="text-lg font-bold text-gray-900">{t('districtChart')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_DISTRICTS.map((dist) => {
            const barW = Math.max(8, (dist.queries / maxDistrictQueries) * 100);
            const gapPercent = dist.queries > 0
              ? Math.round(((dist.queries - dist.applications) / dist.queries) * 100)
              : 0;

            return (
              <div key={dist.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-teal-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800">{dist.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    gapPercent > 85 ? 'bg-red-100 text-red-700' :
                    gapPercent > 70 ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {gapPercent}% gap
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                  <div className={`h-full rounded-full ${dist.color} transition-all duration-700`} style={{ width: `${barW}%` }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span>{dist.queries} queries</span>
                  <span>{dist.matches} matched</span>
                  <span className="font-semibold text-teal-700">{dist.applications} applied</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Awareness-to-Action Gap */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold text-gray-900">{t('gapChart')}</h2>
        </div>

        <div className="space-y-3">
          {schemeStats.slice(0, 6).map(scheme => {
            const appRate = scheme.totalMatches > 0
              ? Math.round((scheme.totalApplications / scheme.totalMatches) * 100)
              : 0;
            const gapWidth = 100 - appRate;

            return (
              <div key={scheme.id + '-gap'} className="flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-700 w-40 truncate shrink-0">
                  {scheme.name.split('(')[0].trim()}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden relative">
                  <div
                    className="h-full rounded-l-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
                    style={{ width: `${appRate}%` }}
                  />
                  <div
                    className="absolute top-0 right-0 h-full bg-red-100 rounded-r-full"
                    style={{ width: `${gapWidth}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-800">
                    {appRate}% applied • {gapWidth}% gap
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-400 mt-4 italic">
          ⚠ High gap indicates citizens are aware of the scheme but face barriers to application (documentation, access, or process complexity).
        </p>
      </div>

    </div>
  );
}
