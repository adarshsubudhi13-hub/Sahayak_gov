/**
 * ApplicationsPage – citizen's full application history and status tracker.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchApplications } from '../lib/supabase/db.js';
import {
  ClipboardList, RefreshCw, CheckCircle2, Clock,
  XCircle, FileSearch, ArrowRight, Building2
} from 'lucide-react';

const STATUS_CONFIG = {
  submitted:    { label: 'Submitted',    icon: Clock,          color: 'text-blue-700   bg-blue-50   border-blue-200' },
  under_review: { label: 'Under Review', icon: FileSearch,     color: 'text-amber-700  bg-amber-50  border-amber-200' },
  approved:     { label: 'Approved',     icon: CheckCircle2,   color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  rejected:     { label: 'Rejected',     icon: XCircle,        color: 'text-red-700    bg-red-50    border-red-200' },
  withdrawn:    { label: 'Withdrawn',    icon: XCircle,        color: 'text-gray-600   bg-gray-50   border-gray-200' },
};

export function ApplicationsPage() {
  const { userId, isSupabaseConfigured } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      if (isSupabaseConfigured && userId) {
        const dbApps = await fetchApplications(userId);
        if (dbApps !== null) {
          setApplications(dbApps);
          setLoading(false);
          return;
        }
      }

      // Fallback: localStorage
      const saved = localStorage.getItem('sahayak_applications');
      if (saved) {
        try { setApplications(JSON.parse(saved)); } catch (e) { /* ignore */ }
      }
      setLoading(false);
    }
    load();
  }, [userId, isSupabaseConfigured]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto py-8 px-4 sm:px-6 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-teal-700" />
            My Applications
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track all your scheme application records
          </p>
        </div>
        <Link
          to="/schemes"
          className="px-4 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-all flex items-center gap-1.5"
        >
          Browse Schemes
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4 shadow-sm">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">No applications yet</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            When you apply to a scheme from the scheme detail page, your application will appear here.
          </p>
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold shadow hover:bg-teal-800 transition-all"
          >
            View Eligible Schemes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => {
            const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.submitted;
            const StatusIcon = cfg.icon;

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {app.scheme_name || app.scheme_id}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        {app.state_name || '–'}
                      </span>
                      <span>
                        Applied:{' '}
                        {new Date(app.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                      {app.applicant_name && (
                        <span>Applicant: {app.applicant_name}</span>
                      )}
                    </div>
                    {app.notes && (
                      <p className="text-xs text-gray-400 italic mt-1 line-clamp-2">
                        "{app.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${cfg.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
