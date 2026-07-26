import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { CheckCircle2, ChevronRight, Clock, Building2, BookmarkPlus, Sparkles } from 'lucide-react';

export function SchemeCard({ matchResult, onSave, isSaved }) {
  const { language, t } = useLanguage();
  const { scheme, match_reasons } = matchResult;

  const schemeName = scheme.translations?.[language]?.name || scheme.name_default;
  const description = scheme.translations?.[language]?.description || scheme.description_default;
  const reasons = match_reasons[language] || match_reasons['en'];

  return (
    <article 
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between transition-all contrast-more:border-black contrast-more:border-2"
      aria-labelledby={`scheme-title-${scheme.id}`}
    >
      
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
            <Sparkles className="w-3 h-3 mr-1 text-teal-600" aria-hidden="true" />
            <span className="sr-only">Category:</span>
            {scheme.category.replace('_', ' ').toUpperCase()}
          </span>

          <span className="text-xs text-trust-600 font-medium flex items-center gap-1 bg-trust-50 px-2.5 py-1 rounded-full border border-blue-100">
            <Clock className="w-3 h-3" aria-hidden="true" />
            <span className="sr-only">Verified on</span>
            {scheme.last_verified_at}
          </span>
        </div>

        <h3 id={`scheme-title-${scheme.id}`} className="text-xl font-bold text-gray-900 leading-snug mb-2 contrast-more:text-black">
          {schemeName}
        </h3>

        <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-4">
          <Building2 className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Issuing Department:</span>
          <span className="text-gray-700">{scheme.department}</span>
        </p>

        <section className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 mb-4" aria-labelledby={`eligibility-reason-${scheme.id}`}>
          <h4 id={`eligibility-reason-${scheme.id}`} className="text-xs font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            {t('matchReasonHeader')}
          </h4>
          <ul className="space-y-1 pl-5 list-disc text-xs text-emerald-800 font-medium">
            {reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed contrast-more:text-black">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        {onSave && (
          <button
            onClick={() => onSave(scheme.id)}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Remove ${schemeName} from saved` : `Save ${schemeName}`}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 transition-all ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BookmarkPlus className="w-4 h-4 text-amber-600" aria-hidden="true" />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        )}

        <Link
          to={`/schemes/${scheme.id}`}
          aria-label={`View details for ${schemeName}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold shadow hover:bg-teal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500 transition-all text-center contrast-more:bg-black contrast-more:text-yellow-400"
        >
          {t('viewDetails')}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

    </article>
  );
}
