import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { FileText, CheckCircle2, ArrowLeft, Sparkles, MapPin } from 'lucide-react';

export function ChecklistPage() {
  const { schemeId } = useParams();
  const { language, t } = useLanguage();
  const { stateSchemes } = useStateContext();
  const [scheme, setScheme] = useState(null);
  const [collectedKeys, setCollectedKeys] = useState([]);

  useEffect(() => {
    const found = stateSchemes.find(s => s.id === schemeId);
    setScheme(found || stateSchemes[0]);

    const savedState = localStorage.getItem(`sahayak_checklist_${schemeId}`);
    if (savedState) {
      try {
        setCollectedKeys(JSON.parse(savedState));
      } catch (e) {}
    }
  }, [schemeId, stateSchemes]);

  if (!scheme) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-sm text-gray-500">Loading checklist...</p>
      </div>
    );
  }

  const schemeName = scheme[`name_${language}`] || scheme.name_hi || scheme.name_en;

  const toggleCheck = (key) => {
    let updated;
    if (collectedKeys.includes(key)) {
      updated = collectedKeys.filter(k => k !== key);
    } else {
      updated = [...collectedKeys, key];
    }
    setCollectedKeys(updated);
    localStorage.setItem(`sahayak_checklist_${schemeId}`, JSON.stringify(updated));
  };

  const docs = scheme.required_documents || [];
  const totalCount = docs.length;
  const collectedCount = collectedKeys.length;
  const progressPct = totalCount > 0 ? Math.round((collectedCount / totalCount) * 100) : 0;

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      <Link
        to={`/schemes/${scheme.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Scheme Details
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              {t('viewChecklist')}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <MapPin className="w-3 h-3 text-blue-600" />
              {scheme.state}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {schemeName}
          </h1>

          <p className="text-xs text-gray-500">
            Track certificate readiness for smooth MeeSeva / e-District application.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-900">
            <span>{t('checklistProgress')}: {collectedCount} of {totalCount} collected</span>
            <span className="text-teal-700">{progressPct}%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {progressPct === 100 && (
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t('checklistCompleted')}
            </p>
          )}
        </div>

        {/* Document Items */}
        <div className="space-y-4">
          {docs.map((doc) => {
            const isChecked = collectedKeys.includes(doc.key);
            const docName = doc[`name_${language}`] || doc.name_hi || doc.name_en;
            const helper = doc[`helper_text_${language}`] || doc.helper_text_hi || doc.helper_text_en;

            return (
              <div
                key={doc.key}
                onClick={() => toggleCheck(doc.key)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  isChecked
                    ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs'
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-teal-700 uppercase bg-teal-100/60 px-2 py-0.5 rounded-md">
                      {doc.issuing_authority}
                    </span>
                    {isChecked && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Ready
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through' : 'text-gray-900'}`}>
                    {docName}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {helper}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
