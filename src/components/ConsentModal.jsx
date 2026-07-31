/**
 * ConsentModal – DPDP Act 2023 informed consent gate.
 *
 * Design rules (per UI/UX Brief + DPDP Act):
 * - Plain language, no dark patterns
 * - Full summary of what is collected and why
 * - Clear "I Agree" and "Decline" (exit without consent)
 * - Links to full Privacy Policy and Terms
 * - Cannot be dismissed by clicking outside (must make explicit choice)
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X, CheckCircle2, ExternalLink } from 'lucide-react';
import { useConsent } from '../context/ConsentContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function ConsentModal({ onDecline }) {
  const { giveConsent } = useConsent();
  const { userId } = useAuth();
  const [accepting, setAccepting] = useState(false);

  const handleAccept = async () => {
    setAccepting(true);
    await giveConsent(userId);
    setAccepting(false);
  };

  return (
    // Backdrop — pointer-events none means clicks pass through, but modal itself catches them
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-t-3xl p-6 text-white space-y-1">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            DPDP Act 2023 — Informed Consent
          </div>
          <h2 id="consent-title" className="text-xl font-extrabold">
            Before we begin — what Sahayak collects
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            To match you to government welfare schemes and power the AI assistant,
            Sahayak needs to collect and process a small amount of personal information.
          </p>

          {/* What we collect */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">What we collect:</p>
            <ul className="space-y-2">
              {[
                ['Verified mobile number', 'OTP-based authentication only — no passwords.'],
                ['Age, gender, state, income band', 'To run the eligibility engine.'],
                ['Social category, occupation', 'To match state-specific scheme criteria.'],
                ['AI questions you ask', 'Sent to OpenAI to generate grounded answers.'],
                ['Usage events (schemes viewed, applied)', 'Aggregated for B2G analytics only.'],
              ].map(([item, reason]) => (
                <li key={item} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-gray-900">{item}</span>
                    <span className="text-gray-500"> — {reason}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* What we never collect */}
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-800">
            <span className="font-bold">We never collect:</span>{' '}
            Aadhaar, PAN, passport, bank account numbers, or any government-issued ID.
          </div>

          {/* Rights summary */}
          <p className="text-xs text-gray-500 leading-relaxed">
            You can withdraw consent and delete your data at any time from your profile settings.
            Your data is used exclusively to serve you — never sold.
          </p>

          {/* Policy links */}
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/privacy"
              target="_blank"
              className="text-teal-700 hover:underline font-semibold flex items-center gap-1"
            >
              Privacy Policy <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/terms"
              target="_blank"
              className="text-teal-700 hover:underline font-semibold flex items-center gap-1"
            >
              Terms of Service <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="flex-1 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-70 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            {accepting ? 'Saving…' : 'I Agree — Continue to Sahayak'}
          </button>
          <button
            onClick={onDecline}
            className="sm:w-auto px-5 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Decline
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-400 pb-5 px-6">
          By agreeing, you confirm you are 18 or older (or have parental consent).
          Consent version: 1.0 · {new Date().toLocaleDateString('en-IN')}
        </p>
      </div>
    </div>
  );
}
