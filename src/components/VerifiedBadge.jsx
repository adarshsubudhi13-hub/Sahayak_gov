/**
 * VerifiedBadge – shows the "last verified" date with a staleness indicator.
 *
 * Colour coding per UI/UX Design Brief:
 *   Green  (Verified Teal)  → verified within 30 days
 *   Amber  (Alert Saffron)  → 30–90 days ago
 *   Red    (Critical Red)   → more than 90 days ago (stale)
 */
import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

function getDaysSince(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function VerifiedBadge({ date, className = '' }) {
  const days = getDaysSince(date);

  if (days === null) return null;

  let icon, label, colorClass;

  if (days <= 30) {
    icon = <CheckCircle2 className="w-3 h-3" />;
    label = `Verified ${days === 0 ? 'today' : `${days}d ago`}`;
    colorClass = 'bg-teal-50 text-teal-700 border-teal-200';
  } else if (days <= 90) {
    icon = <Clock className="w-3 h-3" />;
    label = `Verified ${days}d ago`;
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
  } else {
    icon = <AlertTriangle className="w-3 h-3" />;
    label = `Last verified ${days}d ago — verify before applying`;
    colorClass = 'bg-red-50 text-red-700 border-red-200';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${colorClass} ${className}`}
      title={`Last verified on ${date}`}
    >
      {icon}
      {label}
    </span>
  );
}
