import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { fetchSchemesAndRules } from '../lib/api.js';
import { FileText, CheckCircle2, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';

export function ChecklistPage() {
  const { schemeId } = useParams();
  const { language, t } = useLanguage();
  const [scheme, setScheme] = useState(null);
  const [collectedKeys, setCollectedKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScheme() {
      try {
        const response = await fetchSchemesAndRules();
        const found = response.data.schemes.find(s => s.id === schemeId);
        if (found) {
          setScheme(found);
        }

        const savedState = localStorage.getItem(`sahayak_checklist_${schemeId}`);
        if (savedState) {
          try {
            setCollectedKeys(JSON.parse(savedState));
          } catch (e) {}
        }
      } catch (error) {
        console.error("Error loading checklist:", error);
      } finally {
        setLoading(false);
      }
    }
    loadScheme();
  }, [schemeId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-500">Scheme not found.</p>
      </div>
    );
  }

  const schemeName = scheme.translations?.[language]?.name || scheme.name_default;

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
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500 rounded"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to {schemeName}
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <header>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
            Document Readiness Checklist
          </span>
          <h1 id="checklist-title" className="text-2xl font-bold text-gray-900 mt-1 focus:outline-none" tabIndex="-1">
            {schemeName}
          </h1>
        </header>

        <div 
          className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex items-center justify-between text-xs font-bold text-teal-950">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
              {t('checklistProgress')}: {collectedCount} of {total} collected ({progressPercent}%)
            </span>
            {collectedCount === total && total > 0 && (
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                {t('checklistCompleted')}
              </span>
            )}
          </div>

          <div className="w-full bg-teal-200/70 h-2.5 rounded-full overflow-hidden" aria-hidden="true">
            <div
              className="bg-teal-700 h-full transition-all duration-300 rounded-full contrast-more:bg-black"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <fieldset className="space-y-3 pt-2">
          <legend className="sr-only">Required Documents for {schemeName}</legend>
          {scheme.required_documents.map(doc => {
            const docName = doc.translations?.[language]?.name || doc.translations?.en?.name;
            const helper = doc.translations?.[language]?.helper || doc.translations?.en?.helper;
            const isChecked = collectedKeys.includes(doc.key_name);
            const checkboxId = `doc-${doc.key_name}`;

            return (
              <div
                key={doc.key_name}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isChecked
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-white border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={isChecked}
                  onChange={() => toggleCheck(doc.key_name)}
                  className="w-5 h-5 text-teal-700 border-gray-400 rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500 mt-0.5 cursor-pointer contrast-more:border-black"
                />
                <label htmlFor={checkboxId} className="flex-1 space-y-1 cursor-pointer">
                  <p className={`text-sm font-bold ${isChecked ? 'line-through text-emerald-800' : 'text-gray-900'}`}>
                    {docName}
                  </p>
                  {helper && (
                    <p className="text-xs text-gray-500 contrast-more:text-black">{helper}</p>
                  )}
                  {doc.issuing_authority && (
                    <span className="inline-block text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded mt-1">
                      Issuing Authority: {doc.issuing_authority}
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </fieldset>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            When ready, apply on the official government website.
          </span>
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold shadow hover:bg-teal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500 transition-all contrast-more:bg-black contrast-more:text-yellow-400"
          >
            {t('officialLinkBtn')}
          </a>
        </div>

      </div>
    </div>
  );
}
