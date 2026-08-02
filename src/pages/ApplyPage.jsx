/**
 * ApplyPage – Apply & Track v1
 *
 * Pre-fills the application form from the citizen's saved profile.
 * On submission creates an Application record in Supabase (with localStorage
 * fallback) and redirects to /applications.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../context/StateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { submitApplication, logTelemetryEvent, fetchApplicationByScheme } from '../lib/supabase/db.js';
import {
  ArrowLeft, FileText, CheckCircle2, RefreshCw,
  AlertCircle, ExternalLink, Building2, MapPin
} from 'lucide-react';
import { applyLimiter } from '../lib/rateLimiter.js';
import { sanitizeText, validateNotes } from '../lib/validation.js';

export function ApplyPage() {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { stateSchemes, selectedStateId } = useStateContext();
  const { userId, isSupabaseConfigured } = useAuth();

  const [scheme, setScheme] = useState(null);
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingApp, setExistingApp] = useState(null);
  const [error, setError] = useState(null);

  // ── Load scheme and profile ───────────────────────────────────
  useEffect(() => {
    const found = stateSchemes.find(s => s.id === schemeId);
    setScheme(found || null);

    const savedProf = localStorage.getItem('sahayak_user_profile');
    if (savedProf) {
      try { setProfile(JSON.parse(savedProf)); } catch (e) { /* ignore */ }
    }
  }, [schemeId, stateSchemes]);

  // ── Check for existing application ───────────────────────────
  useEffect(() => {
    if (!schemeId || !userId || !isSupabaseConfigured) return;
    fetchApplicationByScheme(userId, schemeId).then(existing => {
      if (existing) setExistingApp(existing);
    });
  }, [schemeId, userId, isSupabaseConfigured]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scheme || !profile) return;
    setError(null);
    setSubmitting(true);

    const applicationData = {
      scheme_id: scheme.id,
      scheme_name: scheme.name_en,
      state_id: selectedStateId,
      state_name: scheme.state,
      applicant_name: profile.full_name,
      applicant_age: profile.age,
      applicant_gender: profile.gender,
      applicant_district: profile.district,
      applicant_income_band: profile.annual_income_band,
      applicant_social_category: profile.social_category,
      applicant_occupation: profile.occupation,
      notes,
      status: 'submitted',
    };

    let savedApp = null;

    if (isSupabaseConfigured && userId) {
      savedApp = await submitApplication(userId, applicationData);
    }

    // Always persist to localStorage as offline fallback / demo mode
    const localApps = JSON.parse(localStorage.getItem('sahayak_applications') || '[]');
    const localEntry = {
      id: savedApp?.id || `local-${Date.now()}`,
      user_id: userId || 'demo-user-1',
      created_at: new Date().toISOString(),
      ...applicationData,
    };
    localApps.unshift(localEntry);
    localStorage.setItem('sahayak_applications', JSON.stringify(localApps));

    // Telemetry
    if (isSupabaseConfigured) {
      logTelemetryEvent(userId, scheme.id, 'applied', selectedStateId, profile?.district);
    }

    setSubmitting(false);
    setSubmitted(true);

    // Redirect after short confirmation delay
    setTimeout(() => navigate('/applications'), 1500);
  };

  if (!scheme) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-500">Scheme not found.</p>
      </div>
    );
  }

  if (existingApp) {
    return (
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4 text-center space-y-5">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900">Already Applied</h2>
        <p className="text-xs text-gray-500">
          You already submitted an application for{' '}
          <strong>{scheme.name_en}</strong> on{' '}
          {new Date(existingApp.created_at).toLocaleDateString('en-IN')}.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/applications"
            className="px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-all"
          >
            View My Applications
          </Link>
          <Link
            to={`/schemes/${scheme.id}`}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Scheme
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto py-8 px-4 sm:px-6 space-y-6">

      <Link
        to={`/schemes/${scheme.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Scheme Details
      </Link>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-10 text-center space-y-4 shadow-lg">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
          <p className="text-xs text-gray-500">
            Your application for <strong>{scheme.name_en}</strong> has been recorded.
            Redirecting to your applications…
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-8">

          {/* Header */}
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200">
                <FileText className="w-3.5 h-3.5" />
                Apply Now
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                <MapPin className="w-3 h-3" />
                {scheme.state}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {scheme.name_en}
            </h1>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              {scheme.issuing_department}
            </p>
          </div>

          {/* Pre-filled applicant details */}
          {profile && (
            <div className="bg-teal-50 rounded-2xl p-5 border border-teal-200 space-y-3">
              <p className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                Pre-filled from your profile
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { label: 'Name',     value: profile.full_name },
                  { label: 'Age',      value: profile.age },
                  { label: 'Gender',   value: profile.gender },
                  { label: 'District', value: profile.district },
                  { label: 'Income',   value: profile.annual_income_band?.replace('_', '-') },
                  { label: 'Category', value: profile.social_category },
                ].map(field => (
                  <div key={field.label} className="bg-white rounded-xl p-3 border border-teal-100">
                    <p className="text-[10px] font-semibold text-teal-700 uppercase tracking-wider">
                      {field.label}
                    </p>
                    <p className="font-bold text-gray-900 mt-0.5 capitalize">{field.value}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/profile"
                className="text-xs text-teal-700 hover:underline font-medium"
              >
                Not correct? Update your profile →
              </Link>
            </div>
          )}

          {/* Required documents reminder */}
          {scheme.required_documents?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                Documents to Attach at the Portal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scheme.required_documents.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{doc.name_en}</p>
                      <p className="text-[11px] text-gray-500">{doc.issuing_authority}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Additional Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any specific circumstances or notes for this application..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Actions */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={submitting || !profile}
              className="flex-1 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Application Record
                </>
              )}
            </button>

            <a
              href={scheme.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-200"
            >
              <ExternalLink className="w-4 h-4" />
              Open Official Portal
            </a>
          </form>

          <p className="text-[11px] text-gray-400 text-center">
            Submitting records your intent to apply. You must still complete the official portal submission for the scheme to be processed by the government.
          </p>
        </div>
      )}
    </div>
  );
}
