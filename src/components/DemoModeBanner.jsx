/**
 * DemoModeBanner – shown when Supabase / OpenAI are not configured.
 * Makes it immediately clear to anyone reviewing the code that the
 * product is in demo mode, not misrepresenting its own capability.
 */
import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-300 px-4 py-2 flex items-center justify-between gap-3 z-50">
      <div className="flex items-center gap-2 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Demo Mode:</strong> Supabase and/or OpenAI are not configured.
          Data is stored in your browser only. Add{' '}
          <code className="bg-amber-100 px-1 rounded font-mono">VITE_SUPABASE_URL</code>,{' '}
          <code className="bg-amber-100 px-1 rounded font-mono">VITE_SUPABASE_ANON_KEY</code>, and{' '}
          <code className="bg-amber-100 px-1 rounded font-mono">VITE_OPENAI_API_KEY</code> in{' '}
          <code className="bg-amber-100 px-1 rounded font-mono">.env</code> to enable real backend and AI.
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded hover:bg-amber-100 text-amber-700 shrink-0 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
