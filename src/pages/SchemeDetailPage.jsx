import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { logTelemetryEvent } from '../lib/supabase/db.js';
import { VerifiedBadge } from '../components/VerifiedBadge.jsx';
import {
  Building2, Calendar, Clock, ExternalLink,
  FileText, MessageSquare, ArrowLeft, BookmarkPlus, Sparkles, MapPin,
  ClipboardCheck
} from 'lucide-react';

export function SchemeDetailPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { stateSchemes, selectedStateId } = useStateContext();
  const { userId, isSupabaseConfigured } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = stateSchemes.find(s => s.id === id);
    setScheme(found || stateSchemes[0]);

    const saved = localStorage.getItem('sahayak_saved_schemes');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        if (id && list.includes(id)) setIsSaved(true);
      } catch (e) { /* ignore */ }
    }

    // Log "viewed" telemetry event
    if (id && isSupabaseConfigured) {
      const rawProfile = localStorage.getItem('sahayak_user_profile');
      const district = rawProfile ? JSON.parse(rawProfile)?.district : undefined;
      logTelemetryEvent(userId, id, 'viewed', selectedStateId, district);
    }
  }, [id, stateSchemes, userId, selectedStateId, isSupabaseConfigured]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!scheme) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-500">Loading scheme details...</p>
      </div>
    );
  }

  const schemeName = scheme[`name_${language}`] || scheme.name_hi || scheme.name_en;
  const description = scheme[`description_${language}`] || scheme.description_hi || scheme.description_en;
  const benefits = scheme[`benefits_${language}`] || scheme.benefits_hi || scheme.benefits_en;

  const toggleSave = () => {
    const saved = localStorage.getItem('sahayak_saved_schemes');
    let list = saved ? JSON.parse(saved) : [];
    if (list.includes(scheme.id)) {
      list = list.filter(sId => sId !== scheme.id);
      setIsSaved(false);
    } else {
      list.push(scheme.id);
      setIsSaved(true);
    }
    localStorage.setItem('sahayak_saved_schemes', JSON.stringify(list));
  };

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto py-8 px-4 sm:px-6 space-y-8">

      <Link
        to="/schemes"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Eligible Schemes
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-8">

        {/* Header Section */}
        <div className="space-y-4 border-b border-gray-100 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-600" />
                {scheme.category ? scheme.category.replace('_', ' ').toUpperCase() : 'GENERAL'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                <MapPin className="w-3.5 h-3.5 mr-1 text-blue-600" />
                {scheme.state}
              </span>
            </div>

            <button
              onClick={toggleSave}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookmarkPlus className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-600' : ''}`} />
              {isSaved ? 'Saved to Dashboard' : t('saveSchemeBtn')}
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {schemeName}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              {scheme.issuing_department}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              {t('verifiedOn')} {scheme.last_verified_at}
            </span>
            <VerifiedBadge date={scheme.last_verified_at} />
            {scheme.deadline && (
              <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Calendar className="w-4 h-4 text-amber-600" />
                {t('deadlineHeader')}: {scheme.deadline}
              </span>
            )}
          </div>
        </div>

        {/* Description & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide text-teal-900">
              Scheme Overview
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="space-y-3 bg-amber-50/60 rounded-2xl p-5 border border-amber-200/80">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
              {t('benefitsHeader')}
            </h3>
            <p className="text-xs text-amber-950 font-medium leading-relaxed">
              {benefits}
            </p>
          </div>
        </div>

        {/* Documents Required */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-700" />
              {t('documentsHeader')} ({scheme.required_documents ? scheme.required_documents.length : 0})
            </h3>

            <Link
              to={`/checklist/${scheme.id}`}
              className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-teal-600" />
              {t('viewChecklist')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scheme.required_documents && scheme.required_documents.map((doc, idx) => {
              const docName = doc[`name_${language}`] || doc.name_hi || doc.name_en;
              const helper = doc[`helper_text_${language}`] || doc.helper_text_hi || doc.helper_text_en;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-1.5 hover:border-teal-300 transition-all shadow-2xs">
                  <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md">
                    {doc.issuing_authority}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900">{docName}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{helper}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Primary CTA: Apply */}
          <Link
            to={`/apply/${scheme.id}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ClipboardCheck className="w-4 h-4" />
            Apply for This Scheme
          </Link>

          {/* AI chat */}
          <Link
            to={`/chat?schemeId=${scheme.id}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            {t('askAiAboutThis')}
          </Link>

          {/* Secondary: Official portal */}
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs border border-gray-200 transition-all flex items-center justify-center gap-2"
          >
            {t('officialLinkBtn')}
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>

      </div>

    </div>
  );
}
