import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { CitationChip } from '../components/CitationChip.jsx';
import { ConfidenceBanner } from '../components/ConfidenceBanner.jsx';
import { processGroundedRAGQuery } from '../lib/rag/ragService.js';
import { TELANGANA_SCHEMES } from '../lib/seed/telanganaSchemes.js';
import { Send, Sparkles, ShieldCheck, Flag, Bot, User } from 'lucide-react';

export function ChatPage() {
  const [searchParams] = useSearchParams();
  const schemeIdParam = searchParams.get('schemeId');
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      query_text: 'Hello Sahayak!',
      response_text: 'Greetings! I am your Sahayak AI assistant. Every answer I provide is strictly grounded in official Indian Central and State government scheme clauses. How can I help you today?',
      retrieved_source_ids: [],
      confidence_score: 0.95,
      was_low_confidence: false,
      language: 'en',
      created_at: new Date().toISOString()
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState(schemeIdParam || '');
  const [flaggedIds, setFlaggedIds] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || loading) return;

    const userQuery = inputQuery;
    setInputQuery('');
    setLoading(true);

    try {
      const ragResult = await processGroundedRAGQuery(
        userQuery,
        selectedSchemeId || undefined,
        language
      );

      const newLog = {
        id: 'log-' + Date.now(),
        query_text: userQuery,
        response_text: ragResult.responseText,
        citations: ragResult.citations,
        confidence_score: ragResult.confidenceScore,
        was_low_confidence: ragResult.wasLowConfidence,
        retrieved_source_ids: ragResult.citations ? ragResult.citations.map(c => c.source_id) : [],
        language,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, newLog]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFlagMessage = (msgId) => {
    setFlaggedIds(prev => [...prev, msgId]);
    const savedQueue = localStorage.getItem('sahayak_review_queue') || '[]';
    const queue = JSON.parse(savedQueue);
    const msg = messages.find(m => m.id === msgId);
    if (msg) {
      queue.push({
        id: 'flag-' + Date.now(),
        chat_log_id: msgId,
        query_text: msg.query_text,
        response_text: msg.response_text,
        confidence_score: msg.confidence_score,
        flag_reason: 'user_flagged',
        status: 'pending',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('sahayak_review_queue', JSON.stringify(queue));
    }
  };

  const selectedSchemeObj = TELANGANA_SCHEMES.find(s => s.id === selectedSchemeId);

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto py-6 px-4 flex flex-col h-[calc(100vh-5rem)]">
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <ShieldCheck className="w-5 h-5 text-teal-700" />
          <div>
            <span className="font-bold text-gray-900">{t('chatTitle')}</span>
            <span className="text-gray-500 block text-[11px]">
              {selectedSchemeObj 
                ? `Scoped to: ${selectedSchemeObj.name_en}`
                : 'Searching all Central & State Schemes'}
            </span>
          </div>
        </div>

        <select
          value={selectedSchemeId}
          onChange={e => setSelectedSchemeId(e.target.value)}
          className="text-xs border border-gray-300 rounded-xl px-3 py-1.5 bg-white text-gray-700 font-medium outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="">All Schemes (General Chat)</option>
          {TELANGANA_SCHEMES.map(s => (
            <option key={s.id} value={s.id}>{s.name_en}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-gray-200 p-6 overflow-y-auto space-y-6 shadow-sm">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="space-y-3">
            {msg.id !== 'welcome-msg' && (
              <div className="flex items-start justify-end gap-2.5">
                <div className="bg-teal-700 text-white rounded-2xl rounded-tr-none px-4 py-3 text-xs max-w-md shadow-xs leading-relaxed font-medium">
                  {msg.query_text}
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-800 to-slate-900 text-white flex items-center justify-center shrink-0 shadow">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-4 text-xs text-gray-800 leading-relaxed shadow-xs">
                  {msg.was_low_confidence && (
                    <ConfidenceBanner message={msg.response_text} />
                  )}

                  {!msg.was_low_confidence && (
                    <p>{msg.response_text}</p>
                  )}

                  {msg.citations && msg.citations.length > 0 && !msg.was_low_confidence && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                        {t('citationTitle')}
                      </p>
                      {msg.citations.map((cit, cIdx) => (
                        <CitationChip key={cIdx} citation={cit} />
                      ))}
                    </div>
                  )}

                  {msg.id !== 'welcome-msg' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                      {flaggedIds.includes(msg.id) ? (
                        <span className="text-[11px] text-amber-700 font-semibold">
                          {t('flaggedSuccess')}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleFlagMessage(msg.id)}
                          className="text-[11px] text-gray-400 hover:text-amber-700 flex items-center gap-1 font-medium transition-colors"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          {t('flagButton')}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-teal-700 font-semibold p-4 bg-teal-50/60 rounded-2xl animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            Retrieving official Central and State government scheme clauses...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder={t('chatPlaceholder')}
          className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white shadow-xs"
        />
        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
        >
          <span>{t('sendBtn')}</span>
          <Send className="w-4 h-4 text-amber-300" />
        </button>
      </form>
    </main>
  );
}
