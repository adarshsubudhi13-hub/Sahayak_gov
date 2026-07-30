import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export function ConfidenceBanner({ message }) {
  const { t } = useLanguage();

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 my-3 shadow-xs">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
            {t('lowConfidenceNotice')}
          </h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
