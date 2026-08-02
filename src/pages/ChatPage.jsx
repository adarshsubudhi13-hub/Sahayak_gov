import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { CitationChip } from '../components/CitationChip.jsx';
import { ConfidenceBanner } from '../components/ConfidenceBanner.jsx';
import { VoiceInput, TTSButton } from '../components/VoiceInput.jsx';
import { processGroundedRAGQuery } from '../lib/rag/ragService.js';
import { insertChatLog, insertFlaggedResponse } from '../lib/supabase/db.js';
import { Send, Sparkles, ShieldCheck, Flag, Bot, User, Cpu, BookOpen, AlertTriangle } from 'lucide-react';
import { ragLimiter } from '../lib/rateLimiter.js';
import { validateChatQuery } from '../lib/validation.js';

const WELCOME_MESSAGE = {
  id: 'welcome-msg',
  query_text: '',
  response_text: 'Greetings! I am Sahayak AI. Every answer I provide is strictly grounded in official government scheme clauses. How can I help you today?',
  citations: [],
  confidence_score: 0.95,
  was_low_confidence: false,
  is_real_ai: false,
  language: 'en',
  created_at: new Date().toISOString(),
};

export function ChatPage() {
  const [searchParams] = useSearchParams();
  const schemeIdParam = searchParams.get('schemeId');
  const { language, t } = useLanguage();
  const { userId, isSupabaseConfigured } = useAuth();
  const { selectedStateId, hasRagCorpus, selectedState, stateSchemes } = useStateContext();

  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState(schemeIdParam || '');
  const [flaggedIds, setFlaggedIds] = useState(new Set());
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Update scheme dropdown when schemeId param changes
  useEffect(() => {
    if (schemeIdParam) setSelectedSchemeId(schemeIdParam);
  }, [schemeIdParam]);

  const handleSend = async (queryText) => {
    const userQuery = (queryText || inputQuery).trim();
    if (!userQuery || loading) return;
    setInputQuery('');
    setLoading(true);

    try {
      const ragResult = await processGroundedRAGQuery(
        userQuery,
        selectedSchemeId || undefined,
        language,
        selectedStateId
      );

      const newMsg = {
        id: `msg-${Date.now()}`,
        query_text: userQuery,
        response_text: ragResult.responseText,
        citations: ragResult.citations || [],
        confidence_score: ragResult.confidenceScore,
        was_low_confidence: ragResult.wasLowConfidence,
        is_real_ai: ragResult.isRealAI ?? false,
        ai_model: ragResult.aiModel || null,
        language,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMsg]);

      // Persist to Supabase
      if (isSupabaseConfigured) {
        const dbLog = await insertChatLog(userId, {
          scheme_id: selectedSchemeId || null,
          query_text: userQuery,
          response_text: ragResult.responseText,
          confidence_score: ragResult.confidenceScore,
          was_low_confidence: ragResult.wasLowConfidence,
          is_real_ai: ragResult.isRealAI ?? false,
          language,
        });
        if (dbLog) {
          setMessages(prev =>
            prev.map(m => m.id === newMsg.id ? { ...m, db_id: dbLog.id } : m)
          );
        }
      } else {
        const localLogs = JSON.parse(localStorage.getItem('sahayak_chat_logs') || '[]');
        localLogs.unshift(newMsg);
        localStorage.setItem('sahayak_chat_logs', JSON.stringify(localLogs.slice(0, 100)));
      }
    } catch (err) {
      console.error('[ChatPage] RAG error:', err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        query_text: userQuery,
        response_text: 'Sorry, an error occurred while processing your query. Please try again.',
        citations: [],
        confidence_score: 0,
        was_low_confidence: true,
        is_real_ai: false,
        language,
        created_at: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleVoiceTranscript = (transcript) => {
    setInputQuery(transcript);
    // Auto-send after a short delay so user can see what was transcribed
    setTimeout(() => handleSend(transcript), 400);
  };

  const handleFlagMessage = async (msg) => {
    if (flaggedIds.has(msg.id)) return;
    setFlaggedIds(prev => new Set([...prev, msg.id]));

    const flagData = {
      chat_log_id: msg.db_id || null,
      query_text: msg.query_text,
      response_text: msg.response_text,
      confidence_score: msg.confidence_score,
      flag_reason: 'user_flagged',
    };

    if (isSupabaseConfigured) {
      await insertFlaggedResponse(userId, flagData);
    } else {
      const queue = JSON.parse(localStorage.getItem('sahayak_review_queue') || '[]');
      queue.push({ id: `flag-${Date.now()}`, ...flagData, status: 'pending', created_at: new Date().toISOString() });
      localStorage.setItem('sahayak_review_queue', JSON.stringify(queue));
    }
  };

  // Schemes for dropdown — only state schemes (not all states)
  const stateSchemeOptions = stateSchemes.filter(s => s.state === selectedState?.name);

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto py-6 px-4 flex flex-col" style={{ height: 'calc(100vh - 5rem)' }}>

      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs">
          <ShieldCheck className="w-5 h-5 text-teal-700" />
          <div>
            <span className="font-bold text-gray-900">{t('chatTitle')}</span>
            <span className="text-gray-500 block text-[11px]">
              {selectedState?.name} ·{' '}
              {selectedSchemeId
                ? `Scoped to scheme`
                : 'All Schemes'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Corpus coverage badge */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
            hasRagCorpus
              ? 'bg-teal-50 border-teal-200 text-teal-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            {hasRagCorpus ? (
              <><BookOpen className="w-3 h-3" /> Full Document-Backed AI</>
            ) : (
              <><AlertTriangle className="w-3 h-3" /> Listing Only</>
            )}
          </span>

          <select
            value={selectedSchemeId}
            onChange={e => setSelectedSchemeId(e.target.value)}
            className="text-xs border border-gray-300 rounded-xl px-3 py-1.5 bg-white text-gray-700 font-medium outline-none focus:ring-2 focus:ring-teal-600 max-w-[200px]"
          >
            <option value="">All Schemes</option>
            {stateSchemeOptions.map(s => (
              <option key={s.id} value={s.id}>{s.name_en}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-200 p-5 overflow-y-auto space-y-6 shadow-sm">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="space-y-3">
            {/* User bubble */}
            {msg.id !== 'welcome-msg' && msg.query_text && (
              <div className="flex items-start justify-end gap-2.5">
                <div className="bg-teal-700 text-white rounded-2xl rounded-tr-none px-4 py-3 text-xs max-w-md shadow-xs leading-relaxed font-medium">
                  {msg.query_text}
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* AI bubble */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-800 to-slate-900 text-white flex items-center justify-center shrink-0 shadow">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-4 text-xs text-gray-800 leading-relaxed shadow-xs">

                  {msg.was_low_confidence
                    ? <ConfidenceBanner message={msg.response_text} />
                    : <p className="whitespace-pre-wrap">{msg.response_text}</p>
                  }

                  {msg.citations?.length > 0 && !msg.was_low_confidence && (
                    <div className="pt-2 space-y-1">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                        {t('citationTitle')}
                      </p>
                      {msg.citations.map((cit, cIdx) => (
                        <CitationChip key={cIdx} citation={cit} />
                      ))}
                    </div>
                  )}

                  {/* Real AI badge */}
                  {msg.is_real_ai && (
                    <div className="pt-2 flex items-center gap-1 text-[11px] text-teal-700 font-semibold">
                      <Cpu className="w-3 h-3" />
                      {msg.ai_model || 'GPT-4o-mini'} · Grounded in official clauses
                    </div>
                  )}

                  {/* Footer: TTS + flag */}
                  {msg.id !== 'welcome-msg' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <TTSButton text={msg.response_text} language={msg.language} />
                      {flaggedIds.has(msg.id) ? (
                        <span className="text-[11px] text-amber-700 font-semibold">
                          {t('flaggedSuccess')}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleFlagMessage(msg)}
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
            Retrieving official government scheme clauses and generating answer…
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input row */}
      <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-2">
        <VoiceInput
          onTranscript={handleVoiceTranscript}
          language={language}
          disabled={loading}
        />
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
          className="px-5 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
        >
          <Send className="w-4 h-4 text-amber-300" />
          {t('sendBtn')}
        </button>
      </form>
    </main>
  );
}
