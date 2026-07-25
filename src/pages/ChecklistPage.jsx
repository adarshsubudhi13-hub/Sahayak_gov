import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { TELANGANA_SCHEMES } from '../lib/seed/telanganaSchemes.js';
import { FileText, CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';

export function ChecklistPage() {
  const { schemeId } = useParams();
  const { language, t } = useLanguage();
  const [scheme, setScheme] = useState(null);
  const [collectedKeys, setCollectedKeys] = useState([]);

  useEffect(() => {
    const found = TELANGANA_SCHEMES.find(s => s.id === schemeId);
    if (found) {
      setScheme(found);
    }

    const savedState = localStorage.getItem(`sahayak_checklist_${schemeId}`);
    if (savedState) {
      try {
        setCollectedKeys(JSON.parse(savedState));
      } catch (e) {}
    }
  }, [schemeId]);

  if (!scheme) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-sm text-gray-500">Loading checklist...</p>
      </div>
    );
  }

  const schemeName = language === 'hi' ? scheme.name_hi : language === 'te' ? scheme.name_te : scheme.name_en;

  const toggleCheck = (key) => {
    let updated;
    if (collectedKeys.includes(key)) {
      updated = collectedKeys.filter(k => k !== key);
    } else {
      updated = [...collectedKeys, key];
    }
    setCollectedKeys(updated);
    localStorage.setItem(`sahayak_checklist_${scheme.id}`, JSON.stringify(updated));
  };

  const total = scheme.required_documents.length;
  const collectedCount = collectedKeys.length;
  const progressPercent = total > 0 ? Math.round((collectedCount / total) * 100) : 0;

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      <Link
        to={`/schemes/${scheme.id}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {schemeName}
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
            Document Readiness Checklist
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {schemeName}
          </h1>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-teal-950">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {t('checklistProgress')}: {collectedCount} of {total} collected ({progressPercent}%)
            </span>
            {collectedCount === total && (
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t('checklistCompleted')}
              </span>
            )}
          </div>

          <div className="w-full bg-teal-200/70 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-700 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {scheme.required_documents.map(doc => {
            const docName = language === 'hi' ? doc.name_hi : language === 'te' ? doc.name_te : doc.name_en;
            const helper = language === 'hi' ? doc.helper_text_hi : language === 'te' ? doc.helper_text_te : doc.helper_text_en;
            const isChecked = collectedKeys.includes(doc.key);

            return (
              <div
                key={doc.key}
                onClick={() => toggleCheck(doc.key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-white border-gray-200 hover:border-teal-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-600 mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <p className={`text-sm font-bold ${isChecked ? 'line-through text-emerald-800' : 'text-gray-900'}`}>
                    {docName}
                  </p>
                  {helper && (
                    <p className="text-xs text-gray-500">{helper}</p>
                  )}
                  {doc.issuing_authority && (
                    <span className="inline-block text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded mt-1">
                      Issuing Authority: {doc.issuing_authority}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            When ready, apply on the official government website.
          </span>
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold shadow hover:bg-teal-800 transition-all"
          >
            {t('officialLinkBtn')}
          </a>
        </div>

      </div>
    </div>
  );
}
