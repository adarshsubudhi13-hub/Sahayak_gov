import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchApplications } from '../lib/supabase/db.js';
import { ClipboardList, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, MessageSquare, Search, ShieldCheck } from 'lucide-react';

const DEMO_APPLICATIONS = [
  {
    id: 'app-101',
    tracking_id: 'SHK-2026-89412',
    scheme_id: 'post_matric_scholarship',
    scheme_name: 'Telangana Post-Matric Scholarship (ePASS)',
    department: 'Scheduled Caste Development Department',
    applied_date: '15-Jan-2026',
    status: 'under_verification', // submitted, under_verification, approved, disbursed
    current_stage: 'Verified by College Principal. Pending Revenue Sanction.',
    benefit_amount: '₹20,000 / year (Tuition + Maintenance)',
    timeline: [
      { stage: 'Application Submitted', date: '15-Jan-2026', completed: true },
      { stage: 'College Principal Verification', date: '22-Jan-2026', completed: true },
      { stage: 'MRO / Revenue Verification', date: 'In Progress', completed: false, active: true },
      { stage: 'Sanction & Direct Benefit Transfer (DBT)', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'app-102',
    tracking_id: 'SHK-2026-34190',
    scheme_id: 'kalyana_lakshmi',
    scheme_name: 'Kalyana Lakshmi / Shaadi Mubarak Scheme',
    department: 'Minorities & Backward Classes Welfare',
    applied_date: '02-Dec-2025',
    status: 'disbursed',
    current_stage: 'Financial Grant Disbursed to Bank Account.',
    benefit_amount: '₹1,00,116 (One-time Assistance)',
    timeline: [
      { stage: 'Application Submitted', date: '02-Dec-2025', completed: true },
      { stage: 'Mandal Revenue Verification', date: '10-Dec-2025', completed: true },
      { stage: 'District Collectorate Sanction', date: '20-Dec-2025', completed: true },
      { stage: 'Direct Benefit Transfer (DBT)', date: '05-Jan-2026', completed: true },
    ],
  },
];

function formatSubmittedAppToTracker(app) {
  const dateStr = new Date(app.created_at || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  const shortHash = String(app.id || '').replace(/\D/g, '').slice(-5) || Math.floor(10000 + Math.random() * 90000);
  return {
    id: app.id,
    tracking_id: `SHK-2026-${shortHash}`,
    scheme_id: app.scheme_id,
    scheme_name: app.scheme_name || app.scheme_id,
    department: `${app.state_name || 'State'} Welfare & Revenue Department`,
    applied_date: dateStr,
    status: app.status || 'submitted',
    current_stage: 'Application Submitted. Under Initial Mandal Level Verification.',
    benefit_amount: 'Direct Benefit Transfer (DBT) Eligible',
    timeline: [
      { stage: 'Application Submitted', date: dateStr, completed: true },
      { stage: 'Mandal Level Document Verification', date: 'In Progress', completed: false, active: true },
      { stage: 'District Revenue Sanction', date: 'Pending', completed: false },
      { stage: 'Direct Benefit Transfer (DBT)', date: 'Pending', completed: false },
    ],
  };
}

export function ApplicationTrackerPage() {
  const { userId, isSupabaseConfigured } = useAuth();
  const [applications, setApplications] = useState(DEMO_APPLICATIONS);
  const [searchTrackingId, setSearchTrackingId] = useState('');

  useEffect(() => {
    async function loadUserApps() {
      let rawUserApps = [];
      if (isSupabaseConfigured && userId) {
        const dbApps = await fetchApplications(userId);
        if (dbApps && dbApps.length > 0) rawUserApps = dbApps;
      }
      if (rawUserApps.length === 0) {
        const local = localStorage.getItem('sahayak_applications');
        if (local) {
          try { rawUserApps = JSON.parse(local); } catch (e) {}
        }
      }
      if (rawUserApps.length > 0) {
        const formattedUserApps = rawUserApps.map(formatSubmittedAppToTracker);
        // Avoid duplicates if demo apps already match IDs
        setApplications([...formattedUserApps, ...DEMO_APPLICATIONS]);
      }
    }
    loadUserApps();
  }, [userId, isSupabaseConfigured]);

  const filteredApps = applications.filter(app => {
    if (!searchTrackingId.trim()) return true;
    const q = searchTrackingId.toLowerCase();
    return (
      app.tracking_id.toLowerCase().includes(q) ||
      app.scheme_name.toLowerCase().includes(q)
    );
  });

  return (
    <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-teal-300 font-bold uppercase tracking-wider">
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            e-Governance Application Lifecycle Tracking
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Scheme Applications & Tracking Status 📊
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl leading-relaxed">
            Monitor real-time application processing, departmental verification stages, and direct benefit transfers across all government schemes.
          </p>
        </div>

        {/* Search Tracking ID */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 w-full md:w-80 space-y-2">
          <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
            Track Application ID
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-teal-300 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTrackingId}
              onChange={e => setSearchTrackingId(e.target.value)}
              placeholder="e.g. SHK-2026-89412"
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/20 text-white placeholder-teal-200/70 text-xs font-mono outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApps.map(app => (
          <div
            key={app.id}
            className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                    {app.tracking_id}
                  </span>
                  <span className="text-xs text-gray-500">• Applied on {app.applied_date}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">{app.scheme_name}</h3>
                <p className="text-xs text-gray-500">{app.department}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  {app.benefit_amount}
                </span>
                <Link
                  to={`/chat?schemeId=${app.scheme_id}`}
                  className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Ask AI About Status
                </Link>
              </div>
            </div>

            {/* Current Stage */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                  Current Processing Stage
                </span>
                <p className="text-xs font-bold text-slate-800">{app.current_stage}</p>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Verification Lifecycle Timeline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {app.timeline.map((step, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-3 border text-xs space-y-1 ${
                      step.completed
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : step.active
                        ? 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-400/50'
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase">Step {idx + 1}</span>
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : step.active ? (
                        <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                    <p className="font-bold leading-snug">{step.stage}</p>
                    <p className="text-[10px] opacity-80">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
