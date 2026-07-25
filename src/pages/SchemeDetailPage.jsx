import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { fetchSchemesAndRules } from '../lib/api.js';
import { 
  Building2, Calendar, Clock, ExternalLink, 
  FileText, MessageSquare, ArrowLeft, BookmarkPlus, Sparkles, Loader2 
} from 'lucide-react';

export function SchemeDetailPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [scheme, setScheme] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScheme() {
      try {
        const response = await fetchSchemesAndRules();
        const found = response.data.schemes.find(s => s.id === id);
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
      } catch (error) {
        console.error("Error loading scheme:", error);
      } finally {
        setLoading(false);
      }
    }
    loadScheme();
  }, [id]);

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
  const description = scheme.translations?.[language]?.description || scheme.description_default;
  // Fallback for missing benefits in mock payload
  const benefits = scheme.translations?.[language]?.description || scheme.description_default;

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
          {t('issuingDept')} <span className="text-gray-900 font-bold">{scheme.department}</span>
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
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            {t('documentsHeader')}
          </h2>
          <ul className="space-y-3">
            {scheme.required_documents.map(doc => {
              const docName = doc.translations?.[language]?.name || doc.translations?.en?.name;
              return (
                <li key={doc.key_name} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <p className="text-xs font-bold text-gray-900 flex items-center justify-between">
                    <span>{docName}</span>
                    {doc.issuing_authority && (
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {doc.issuing_authority}
                      </span>
                    )}
                  </p>
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
