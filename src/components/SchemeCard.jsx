import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { VerifiedBadge } from './VerifiedBadge.jsx';
import {
  CheckCircle2, ChevronRight, Building2,
  BookmarkPlus, Sparkles, MapPin, ClipboardCheck
} from 'lucide-react';

export function SchemeCard({ matchResult, onSave, isSaved }) {
  const { language, t } = useLanguage();
  const { scheme, match_reasons, is_eligible, passed_rules_count, total_rules_count } = matchResult;

  const schemeName    = scheme[`name_${language}`]        || scheme.name_hi        || scheme.name_en;
  const description   = scheme[`description_${language}`] || scheme.description_hi || scheme.description_en;
  const reasons       = match_reasons?.[language]         || match_reasons?.['en'] || [];

  // Eligibility match strength (for "why you matched" progress indicator)
  const matchStrength = total_rules_count > 0
    ? Math.round((passed_rules_count / total_rules_count) * 100)
    : is_eligible ? 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden">

      <div>
        {/* Top badges row */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
            <Sparkles className="w-3 h-3 mr-1 text-teal-600" />
            {scheme.category ? scheme.category.replace(/_/g, ' ').toUpperCase() : 'GENERAL'}
          </span>
          <span className="text-xs text-blue-700 font-medium flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            <MapPin className="w-3 h-3 text-blue-500" />
            {scheme.state}
          </span>
        </div>

        {/* Scheme name */}
        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-teal-700 transition-colors mb-1.5">
          {schemeName}
        </h3>

        {/* Department + verified badge */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="line-clamp-1">{scheme.issuing_department}</span>
          </p>
          {scheme.last_verified_at && (
            <VerifiedBadge date={scheme.last_verified_at} />
          )}
        </div>

        {/* Why you matched */}
        {is_eligible && reasons.length > 0 && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {t('matchReasonHeader')}
              </p>
              {/* Match strength bar */}
              <span className="text-[10px] font-bold text-emerald-700">{matchStrength}% match</span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-1.5 mb-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${matchStrength}%` }}
              />
            </div>
            <ul className="space-y-0.5 pl-4 list-disc text-xs text-emerald-800 font-medium">
              {reasons.slice(0, 2).map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer actions */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        {onSave && (
          <button
            onClick={() => onSave(scheme.id)}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <BookmarkPlus className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-600' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        )}

        <Link
          to={`/schemes/${scheme.id}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5"
        >
          {t('viewDetails')}
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          to={`/apply/${scheme.id}`}
          className="py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 shrink-0"
          title="Apply for this scheme"
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          Apply
        </Link>
      </div>

    </div>
  );
}
