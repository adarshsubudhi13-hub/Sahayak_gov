import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export function CitationChip({ citation }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="inline-block mt-2">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-trust-50 border border-blue-200 text-trust-700 text-xs font-medium cursor-pointer hover:bg-blue-100 transition-all shadow-xs"
      >
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="font-semibold">{citation.clause_label}</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </div>

      {expanded && (
        <div className="mt-2 p-3 bg-white rounded-xl border border-blue-200 shadow-md text-xs text-gray-700 max-w-lg space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-[11px] text-gray-500 pb-1.5 border-b border-gray-100 font-semibold">
            <span>Verified Official Government Clause</span>
            <span className="flex items-center gap-1 text-trust-600">
              <Calendar className="w-3 h-3" />
              {citation.last_verified_at}
            </span>
          </div>
          <p className="italic text-gray-800 leading-relaxed font-sans">
            "{citation.content_snippet}"
          </p>
        </div>
      )}
    </div>
  );
}
