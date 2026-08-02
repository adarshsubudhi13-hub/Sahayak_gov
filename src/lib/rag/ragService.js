/**
 * Sahayak RAG Service – Phase 2
 *
 * Changes from Phase 1:
 *  - Accepts stateId parameter and loads the correct state-specific RAG corpus
 *  - All 11 states + central schemes now have document corpora
 *  - Per-state embedding cache (keyed by stateId)
 *  - isRealAI and hasCorpus flags in response for UI labelling
 */
import { TELANGANA_RAG_DOCUMENTS, TELANGANA_SCHEMES } from '../seed/telanganaSchemes.js';
import { MAHARASHTRA_RAG_DOCUMENTS, MAHARASHTRA_SCHEMES } from '../seed/maharashtraSchemes.js';
import { KARNATAKA_RAG_DOCUMENTS, KARNATAKA_SCHEMES } from '../seed/karnatakaSchemes.js';
import { TAMILNADU_RAG_DOCUMENTS, TAMILNADU_SCHEMES } from '../seed/tamilnaduSchemes.js';
import { KERALA_RAG_DOCUMENTS, KERALA_SCHEMES } from '../seed/keralaSchemes.js';
import { UP_RAG_DOCUMENTS, UP_SCHEMES } from '../seed/upSchemes.js';
import { BIHAR_RAG_DOCUMENTS, BIHAR_SCHEMES } from '../seed/biharSchemes.js';
import { RAJASTHAN_RAG_DOCUMENTS, RAJASTHAN_SCHEMES } from '../seed/rajasthanSchemes.js';
import { GUJARAT_RAG_DOCUMENTS, GUJARAT_SCHEMES } from '../seed/gujaratSchemes.js';
import { WESTBENGAL_RAG_DOCUMENTS, WESTBENGAL_SCHEMES } from '../seed/westbengalSchemes.js';
import { MP_RAG_DOCUMENTS, MP_SCHEMES } from '../seed/mpSchemes.js';
import { AP_RAG_DOCUMENTS, AP_SCHEMES } from '../seed/andhraPradeshSchemes.js';
import { PUNJAB_RAG_DOCUMENTS, PUNJAB_SCHEMES } from '../seed/punjabSchemes.js';
import { ODISHA_RAG_DOCUMENTS, ODISHA_SCHEMES } from '../seed/odishaSchemes.js';
import { ASSAM_RAG_DOCUMENTS, ASSAM_SCHEMES } from '../seed/assamSchemes.js';
import { CENTRAL_RAG_DOCUMENTS, CENTRAL_SCHEMES } from '../seed/centralSchemes.js';

// ── Config ─────────────────────────────────────────────────────────────────────
export const CONFIDENCE_THRESHOLD = parseFloat(
  import.meta.env.VITE_CONFIDENCE_THRESHOLD || '0.72'
);
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const isOpenAIConfigured =
  Boolean(OPENAI_API_KEY) && !OPENAI_API_KEY.startsWith('sk-...your');
const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHAT_MODEL = 'gpt-4o-mini';
const TOP_K = 3;

// ── State corpus registry ─────────────────────────────────────────────────────
const STATE_CORPUS_MAP = {
  telangana:      { docs: TELANGANA_RAG_DOCUMENTS,  schemes: TELANGANA_SCHEMES  },
  maharashtra:    { docs: MAHARASHTRA_RAG_DOCUMENTS, schemes: MAHARASHTRA_SCHEMES },
  karnataka:      { docs: KARNATAKA_RAG_DOCUMENTS,  schemes: KARNATAKA_SCHEMES  },
  tamil_nadu:     { docs: TAMILNADU_RAG_DOCUMENTS,  schemes: TAMILNADU_SCHEMES  },
  kerala:         { docs: KERALA_RAG_DOCUMENTS,     schemes: KERALA_SCHEMES     },
  uttar_pradesh:  { docs: UP_RAG_DOCUMENTS,          schemes: UP_SCHEMES         },
  bihar:          { docs: BIHAR_RAG_DOCUMENTS,       schemes: BIHAR_SCHEMES      },
  rajasthan:      { docs: RAJASTHAN_RAG_DOCUMENTS,   schemes: RAJASTHAN_SCHEMES  },
  gujarat:        { docs: GUJARAT_RAG_DOCUMENTS,     schemes: GUJARAT_SCHEMES    },
  west_bengal:    { docs: WESTBENGAL_RAG_DOCUMENTS,  schemes: WESTBENGAL_SCHEMES },
  madhya_pradesh: { docs: MP_RAG_DOCUMENTS,          schemes: MP_SCHEMES         },
  andhra_pradesh: { docs: AP_RAG_DOCUMENTS,          schemes: AP_SCHEMES         },
  punjab:         { docs: PUNJAB_RAG_DOCUMENTS,      schemes: PUNJAB_SCHEMES     },
  odisha:         { docs: ODISHA_RAG_DOCUMENTS,      schemes: ODISHA_SCHEMES     },
  assam:          { docs: ASSAM_RAG_DOCUMENTS,       schemes: ASSAM_SCHEMES      },
  central:        { docs: CENTRAL_RAG_DOCUMENTS,     schemes: CENTRAL_SCHEMES    },
};

/** States that have a full clause-level document corpus */
export const STATES_WITH_RAG_CORPUS = new Set(Object.keys(STATE_CORPUS_MAP));

/** Get documents and schemes for a given stateId, with central always merged in */
function getCorpus(stateId) {
  const state = STATE_CORPUS_MAP[stateId];
  const central = STATE_CORPUS_MAP.central;
  if (!state) {
    return { docs: central.docs, schemes: central.schemes, hasCorpus: true };
  }
  return {
    docs: [...state.docs, ...central.docs],
    schemes: [...state.schemes, ...central.schemes],
    hasCorpus: true,
  };
}

// ── Per-state embedding cache (Map<stateId, Array<{doc, embedding}>>)  ─────────
const _embeddingCache = new Map();

// ── Utility: cosine similarity ─────────────────────────────────────────────────
function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot   += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// ── OpenAI: single embedding ───────────────────────────────────────────────────
async function createEmbedding(text) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: text.slice(0, 8192) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`OpenAI Embeddings error ${res.status}: ${err?.error?.message || 'unknown'}`);
  }
  return (await res.json()).data[0].embedding;
}

// ── OpenAI: batch embed all docs for a state ──────────────────────────────────
async function ensureStateEmbeddings(stateId, docs) {
  if (_embeddingCache.has(stateId)) return _embeddingCache.get(stateId);

  const texts = docs.map(d => `${d.clause_label}: ${d.content}`.slice(0, 8192));
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: texts }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`OpenAI batch embed error ${res.status}: ${err?.error?.message || 'unknown'}`);
  }
  const data = await res.json();
  const cached = docs.map((doc, i) => ({ doc, embedding: data.data[i].embedding }));
  _embeddingCache.set(stateId, cached);
  return cached;
}

// ── OpenAI: grounded answer generation ───────────────────────────────────────
const LANG_INSTRUCTIONS = {
  en: 'Respond in English.',
  hi: 'Respond in Hindi (हिंदी).',
  te: 'Respond in Telugu (తెలుగు).',
  mr: 'Respond in Marathi (मराठी).',
  kn: 'Respond in Kannada (ಕನ್ನಡ).',
  ta: 'Respond in Tamil (தமிழ்).',
  ml: 'Respond in Malayalam (മലയാളം).',
  gu: 'Respond in Gujarati (ગુજરાતી).',
  bn: 'Respond in Bengali (বাংলা).',
  pa: 'Respond in Punjabi (ਪੰਜਾਬੀ).',
  or: 'Respond in Odia (ଓଡ଼ିଆ).',
  as: 'Respond in Assamese (অসমীয়া).',
};

async function generateAnswer(query, retrievedClauses, language = 'en') {
  const context = retrievedClauses
    .map((c, i) => `[Clause ${i + 1} — ${c.clause_label}]\n${c.content}`)
    .join('\n\n');

  const systemPrompt = `You are Sahayak, an AI assistant that helps Indian citizens understand government welfare schemes.
Rules:
- Ground every answer strictly in the provided clause excerpts below.
- Use plain language accessible to first-time readers.
- If the clauses do not fully answer the question, say so honestly.
- Never invent eligibility criteria, amounts, or deadlines not present in the context.
${LANG_INSTRUCTIONS[language] || LANG_INSTRUCTIONS.en}

Official Government Clauses:
${context}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: query }],
      temperature: 0.2,
      max_tokens: 500,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`OpenAI Chat error ${res.status}: ${err?.error?.message || 'unknown'}`);
  }
  return (await res.json()).choices[0].message.content.trim();
}

// ── Keyword-matching fallback ─────────────────────────────────────────────────
function keywordScore(query, text) {
  const qTokens = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const tTokens = new Set(text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  if (!qTokens.length || !tTokens.size) return 0;
  let matches = 0;
  for (const t of qTokens) {
    if (tTokens.has(t) || [...tTokens].some(s => s.includes(t) || t.includes(s))) matches++;
  }
  return Math.min(0.95, (matches / qTokens.length) * 1.1);
}

function fallbackText(scheme, score, language) {
  const link = scheme?.official_link || 'https://india.gov.in/topics/social-welfare';
  const pct = Math.round(score * 100);
  const msgs = {
    en: `Based on the retrieved official clauses, I am not fully certain about this query (confidence: ${pct}%). For accurate information please visit: ${link}`,
    hi: `आधिकारिक धाराओं के आधार पर, मैं इस प्रश्न के बारे में पूरी तरह आश्वस्त नहीं हूँ (विश्वास: ${pct}%)। कृपया आधिकारिक पोर्टल पर जाएँ: ${link}`,
    te: `అధికారిక నిబంధనల ఆధారంగా ఈ ప్రశ్నకు ఖచ్చితంగా సమాధానం ఇవ్వలేకపోతోంది (నమ్మకం: ${pct}%). దయచేసి సందర్శించండి: ${link}`,
  };
  return msgs[language] || msgs.en;
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function processGroundedRAGQuery(query, schemeId, language = 'en', stateId = 'telangana') {
  const { docs: allDocs, schemes, hasCorpus } = getCorpus(stateId);
  const documents = allDocs.filter(doc => !schemeId || doc.scheme_id === schemeId);
  const targetScheme = schemes.find(s => s.id === schemeId) || schemes[0];

  // ── Path A: Real OpenAI RAG ────────────────────────────────────────────────
  if (isOpenAIConfigured) {
    try {
      const [queryEmbedding, docEmbeddings] = await Promise.all([
        createEmbedding(query),
        ensureStateEmbeddings(stateId, documents.length > 0 ? documents : allDocs),
      ]);

      // Filter cached embeddings to only docs relevant to this query scope
      const relevantEmbeddings = documents.length > 0
        ? docEmbeddings.filter(({ doc }) => !schemeId || doc.scheme_id === schemeId)
        : docEmbeddings;

      const scored = relevantEmbeddings
        .map(({ doc, embedding }) => ({ doc, score: cosineSimilarity(queryEmbedding, embedding) }))
        .sort((a, b) => b.score - a.score);

      const topScore = scored[0]?.score ?? 0;

      if (topScore < CONFIDENCE_THRESHOLD || !scored[0]) {
        return {
          responseText: fallbackText(targetScheme, topScore, language),
          citations: scored[0] ? [{
            source_id: scored[0].doc.id,
            clause_label: scored[0].doc.clause_label,
            last_verified_at: scored[0].doc.last_verified_at,
            content_snippet: scored[0].doc.content.substring(0, 160) + '...',
          }] : [],
          confidenceScore: topScore,
          wasLowConfidence: true,
          retrievedDocs: scored[0] ? [scored[0].doc] : [],
          isRealAI: true,
          hasCorpus,
        };
      }

      const topK = scored.slice(0, TOP_K);
      const responseText = await generateAnswer(query, topK.map(x => x.doc), language);

      return {
        responseText,
        citations: topK.map(({ doc }) => ({
          source_id: doc.id,
          clause_label: doc.clause_label,
          last_verified_at: doc.last_verified_at,
          content_snippet: doc.content,
        })),
        confidenceScore: topScore,
        wasLowConfidence: false,
        retrievedDocs: topK.map(x => x.doc),
        isRealAI: true,
        hasCorpus,
      };
    } catch (err) {
      console.error('[RAG] OpenAI error, falling back to keyword matching:', err.message);
    }
  }

  // ── Path B: Keyword fallback ──────────────────────────────────────────────
  const docsToSearch = documents.length > 0 ? documents : allDocs;
  const scoredKw = docsToSearch
    .map(doc => ({ doc, score: keywordScore(query, `${doc.clause_label} ${doc.content}`) }))
    .sort((a, b) => b.score - a.score);

  const topKw = scoredKw[0];
  const topScore = topKw?.score ?? 0;

  if (topScore < CONFIDENCE_THRESHOLD || !topKw) {
    return {
      responseText: fallbackText(targetScheme, topScore, language),
      citations: topKw ? [{
        source_id: topKw.doc.id,
        clause_label: topKw.doc.clause_label,
        last_verified_at: topKw.doc.last_verified_at,
        content_snippet: topKw.doc.content.substring(0, 120) + '...',
      }] : [],
      confidenceScore: topScore,
      wasLowConfidence: true,
      retrievedDocs: topKw ? [topKw.doc] : [],
      isRealAI: false,
      hasCorpus,
    };
  }

  const top2 = scoredKw.slice(0, 2).map(x => x.doc);
  const msgs = {
    hi: `आधिकारिक दिशा-निर्देशों के अनुसार (${top2[0].clause_label}): ${top2[0].content}`,
    te: `అధికారిక నిబంధనల ప్రకారం (${top2[0].clause_label}): ${top2[0].content}`,
  };

  return {
    responseText: msgs[language] || `According to official guidelines (${top2[0].clause_label}): ${top2[0].content}`,
    citations: top2.map(doc => ({
      source_id: doc.id,
      clause_label: doc.clause_label,
      last_verified_at: doc.last_verified_at,
      content_snippet: doc.content,
    })),
    confidenceScore: topScore,
    wasLowConfidence: false,
    retrievedDocs: top2,
    isRealAI: false,
    hasCorpus,
  };
}

/** Clear per-state embedding cache (call when user switches state) */
export function clearEmbeddingCache(stateId) {
  if (stateId) _embeddingCache.delete(stateId);
  else _embeddingCache.clear();
}
