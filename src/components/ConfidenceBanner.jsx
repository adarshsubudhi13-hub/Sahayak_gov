/**
 * ConfidenceBanner – shown when RAG confidence is below threshold.
 *
 * Design Brief rules:
 * - Styled with Alert Saffron (amber/orange) — NOT red (red is for blocking errors only)
 * - Clear icon + plain-language label
 * - Framed as "here is the best official source" not as a failure message
 * - Extracts the official link from message text and renders it as a real anchor
 */
import React from 'react';
import { AlertTriangle, ExternalLink, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

function extractLink(text) {
  const match = text?.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
}

export function ConfidenceBanner({ message }) {
  const { t } = useLanguage();
  const officialLink = extractLink(message);
  // Strip the raw URL from the display text — we render it as a proper anchor
  const displayText = message?.replace(/https?:\/\/[^\s]+/, '').replace(/:\s*$/, '.').trim();

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
            {t('lowConfidenceNotice')}
          </h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            {displayText}
          </p>
        </div>
      </div>

      {/* Official source CTA — framed as helpful, not as failure */}
      {officialLink && (
        <div className="bg-white rounded-lg border border-amber-200 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-amber-900">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium">Best official source for this scheme:</span>
          </div>
          <a
            href={officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shrink-0"
          >
            Visit Portal
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}
