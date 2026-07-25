import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { TELANGANA_SCHEMES } from '../lib/seed/telanganaSchemes.js';
import { 
  Building2, Calendar, Clock, ExternalLink, 
  FileText, MessageSquare, ArrowLeft, BookmarkPlus, Sparkles 
} from 'lucide-react';

export function SchemeDetailPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [scheme, setScheme] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = TELANGANA_SCHEMES.find(s => s.id === id);
    if (found) {
      setScheme(found);
    }

    const saved = localStorage.getItem('sahayak_saved_schemes');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        if (id && list.includes(id)) {
          setIsSaved(true);
        }
      } catch (e) {}
    }
  }, [id]);

  if (!scheme) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-500">Loading scheme details...</p>
      </div>
    );
  }

  const schemeName = language === 'hi' ? scheme.name_hi : language === 'te' ? scheme.name_te : scheme.name_en;
  const description = language === 'hi' ? scheme.description_hi : language === 'te' ? scheme.description_te : scheme.description_en;
  const benefits = language === 'hi' ? scheme.benefits_hi : language === 'te' ? scheme.benefits_te : scheme.benefits_en;

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
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Eligible Schemes
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wide">
            {scheme.category.replace('_', ' ')}
          </span>

          <span className="text-xs text-trust-600 font-semibold flex items-center gap-1 bg-trust-50 px-3 py-1 rounded-full border border-blue-100">
            <Clock className="w-3.5 h-3.5" />
            {t('verifiedOn')} {scheme.last_verified_at}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          {schemeName}
        </h1>

        <p className="text-xs font-semibold text-gray-500 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-600" />
          {t('issuingDept')} <span className="text-gray-900 font-bold">{scheme.issuing_department}</span>
        </p>

        <p className="text-sm text-gray-700 leading-relaxed pt-2 border-t border-gray-100">
          {description}
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-3">
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow transition-all flex items-center gap-2"
          >
            {t('officialLinkBtn')}
            <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            to={`/checklist/${scheme.id}`}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {t('viewChecklist')}
          </Link>

          <button
            onClick={toggleSave}
            className={`px-5 py-3 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BookmarkPlus className="w-4 h-4 text-amber-600" />
            {isSaved ? 'Saved in Dashboard' : t('saveSchemeBtn')}
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t('benefitsHeader')}
          </h2>
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs font-medium text-amber-950 leading-relaxed">
            {benefits}
          </div>
          {scheme.deadline && (
            <p className="text-xs text-gray-500 flex items-center gap-1.5 font-semibold pt-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {t('deadlineHeader')}: <span className="text-gray-900 font-bold">{scheme.deadline}</span>
            </p>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            {t('documentsHeader')}
          </h2>
          <ul className="space-y-3">
            {scheme.required_documents.map(doc => {
              const docName = language === 'hi' ? doc.name_hi : language === 'te' ? doc.name_te : doc.name_en;
              const helper = language === 'hi' ? doc.helper_text_hi : language === 'te' ? doc.helper_text_te : doc.helper_text_en;
              return (
                <li key={doc.key} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <p className="text-xs font-bold text-gray-900 flex items-center justify-between">
                    <span>{docName}</span>
                    {doc.issuing_authority && (
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {doc.issuing_authority}
                      </span>
                    )}
                  </p>
                  {helper && (
                    <p className="text-[11px] text-gray-500 leading-snug">{helper}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      <div className="bg-gradient-to-r from-teal-900 via-teal-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold flex items-center gap-2 justify-center sm:justify-start">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            Have Questions About {schemeName}?
          </h3>
          <p className="text-xs text-teal-100/80">
            Ask Sahayak AI assistant for source-grounded answers citing exact clause numbers.
          </p>
        </div>

        <Link
          to={`/chat?schemeId=${scheme.id}`}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow transition-all shrink-0"
        >
          {t('askAiAboutThis')}
        </Link>
      </div>

    </div>
  );
}
