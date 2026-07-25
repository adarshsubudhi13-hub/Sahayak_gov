import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  AlertTriangle, CheckCircle2, Clock, MessageSquare,
  ShieldCheck, ChevronDown, ChevronUp
} from 'lucide-react';

export function AdminReviewQueuePage() {
  const { t } = useLanguage();
  const [queue, setQueue] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState({});

  useEffect(() => {
    const savedQueue = localStorage.getItem('sahayak_review_queue');
    if (savedQueue) {
      try {
        setQueue(JSON.parse(savedQueue));
      } catch (e) {}
    }

    // Seed demo items if queue is empty
    if (!savedQueue || JSON.parse(savedQueue).length === 0) {
      const demoQueue = [
        {
          id: 'flag-demo-1',
          chat_log_id: 'log-demo-1',
          query_text: 'Can I get Rythu Bandhu if I lease land from my uncle?',
          response_text: 'Under Rythu Bandhu, every land-owning pattadar farmer registered on Dharani portal is provided ₹5,000 per acre per crop season. Tenant farmers and lease-holders may not directly qualify under pattadar criteria.',
          confidence_score: 0.65,
          flag_reason: 'user_flagged',
          status: 'pending',
          created_at: '2026-07-24T10:30:00.000Z'
        },
        {
          id: 'flag-demo-2',
          chat_log_id: 'log-demo-2',
          query_text: 'Is Kalyana Lakshmi available for inter-caste marriages?',
          response_text: 'Kalyana Lakshmi provides ₹1,00,116 for brides of SC, ST, BC, EBC or Minority community. Inter-caste marriages may have separate additional incentive schemes.',
          confidence_score: 0.58,
          flag_reason: 'low_confidence',
          status: 'pending',
          created_at: '2026-07-24T14:15:00.000Z'
        },
        {
          id: 'flag-demo-3',
          chat_log_id: 'log-demo-3',
          query_text: 'What if my income certificate is from last year — will ePASS still accept it?',
          response_text: 'Fee reimbursement requires income certificate issued after April 1st of the current financial year. Last year certificates are not accepted per GO Ms No. 45.',
          confidence_score: 0.82,
          flag_reason: 'user_flagged',
          status: 'pending',
          created_at: '2026-07-25T08:00:00.000Z'
        }
      ];
      setQueue(demoQueue);
      localStorage.setItem('sahayak_review_queue', JSON.stringify(demoQueue));
    }
  }, []);

  const handleResolve = (itemId) => {
    const updated = queue.map(item =>
      item.id === itemId
        ? { ...item, status: 'resolved', resolution_note: resolutionNotes[itemId] || '' }
        : item
    );
    setQueue(updated);
    localStorage.setItem('sahayak_review_queue', JSON.stringify(updated));
  };

  const pendingItems = queue.filter(i => i.status === 'pending');
  const resolvedItems = queue.filter(i => i.status === 'resolved');

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 text-xs text-amber-200 font-bold mb-1">
          <ShieldCheck className="w-4 h-4" />
          Government Review Panel
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t('reviewQueueTitle')}
        </h1>
        <p className="text-xs text-amber-100/90 mt-1">
          Review flagged citizen AI answers and low-confidence responses. Ensure grounded accuracy.
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-amber-800">
            {pendingItems.length} Pending
          </span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-800">
            {resolvedItems.length} Resolved
          </span>
        </div>
      </div>

      {/* Pending Items */}
      {pendingItems.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">All Clear!</h3>
          <p className="text-xs text-gray-500">No pending items in the review queue. All flagged responses have been addressed.</p>
        </div>
      )}

      <div className="space-y-4">
        {pendingItems.map(item => {
          const isExpanded = expandedId === item.id;
          const confidenceColor = item.confidence_score < 0.6
            ? 'text-red-600 bg-red-50 border-red-200'
            : item.confidence_score < 0.72
            ? 'text-amber-700 bg-amber-50 border-amber-200'
            : 'text-teal-700 bg-teal-50 border-teal-200';

          return (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow">
              {/* Summary Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    item.flag_reason === 'user_flagged' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {item.flag_reason === 'user_flagged'
                      ? <AlertTriangle className="w-4 h-4" />
                      : <MessageSquare className="w-4 h-4" />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{item.query_text}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.flag_reason === 'user_flagged' ? '🚩 Citizen flagged' : '⚠️ Low confidence auto-flag'}
                      {' • '}
                      {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${confidenceColor}`}>
                    {Math.round(item.confidence_score * 100)}% confidence
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">Citizen's Question</h4>
                    <p className="text-xs text-gray-800 bg-teal-50 p-3 rounded-xl border border-teal-100">
                      {item.query_text}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">AI Response (Under Review)</h4>
                    <p className="text-xs text-gray-800 bg-amber-50 p-3 rounded-xl border border-amber-100">
                      {item.response_text}
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                      Resolution Note
                    </label>
                    <textarea
                      value={resolutionNotes[item.id] || ''}
                      onChange={e => setResolutionNotes({ ...resolutionNotes, [item.id]: e.target.value })}
                      placeholder={t('resolutionNotePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none resize-none h-20"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleResolve(item.id)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {t('markResolvedBtn')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resolved Items */}
      {resolvedItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
            Resolved ({resolvedItems.length})
          </h3>
          {resolvedItems.map(item => (
            <div key={item.id} className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-3 flex items-center justify-between gap-4 opacity-70">
              <div className="min-w-0">
                <p className="text-xs text-gray-600 truncate">{item.query_text}</p>
                {item.resolution_note && (
                  <p className="text-[11px] text-emerald-700 mt-0.5 italic">
                    Resolution: {item.resolution_note}
                  </p>
                )}
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
