/**
 * Sahayak RAG Service – Phase 1
 *
 * Architecture:
 *   1. Embed the user query with OpenAI text-embedding-3-small
 *   2. Compute cosine similarity against pre-embedded Telangana RAG documents
 *   3. Pass top-k retrieved clauses + user query to GPT-4o-mini for answer generation
 *   4. Apply the 0.72 confidence threshold: below it, fall back to the official portal
 *
 * When VITE_OPENAI_API_KEY is not set the service falls back to the original
 * keyword-matching implementation so the app stays functional in demo mode.
 */
import { TELANGANA_RAG_DOCUMENTS, TELANGANA_SCHEMES } from '../seed/telanganaSchemes.js';

// ── Config ────────────────────────────────────────────────────────────────────
export const CONFIDENCE_THRESHOLD = parseFloat(
  import.meta.env.VITE_CONFIDENCE_THRESHOLD || '0.72'
);

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const isOpenAIConfigured =
  Boolean(OPENAI_API_KEY) && !OPENAI_API_KEY.startsWith('sk-...your');

const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHAT_MODEL = 'gpt-4o-mini';
const TOP_K = 3; // number of top clauses to pass to the LLM

// ── In-memory embedding cache ─────────────────────────────────────────────────
// Documents are embedded once per session and cached to avoid repeated API calls.
let _documentEmbeddingCache = null; // Array<{ doc, embedding: number[] }>

// ── Utility: cosine similarity ────────────────────────────────────────────────
function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// ── OpenAI: create embedding ──────────────────────────────────────────────────
async function createEmbedding(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text.slice(0, 8192), // max token guard
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI Embeddings API error: ${response.status} – ${err?.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// ── OpenAI: generate grounded answer ─────────────────────────────────────────
async function generateAnswer(query, retrievedClauses, language = 'en') {
  const langInstructions = {
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

  const context = retrievedClauses
    .map((c, i) => `[Clause ${i + 1} — ${c.clause_label}]\n${c.content}`)
    .join('\n\n');

  const systemPrompt = `You are Sahayak, an AI assistant that helps Indian citizens understand government welfare schemes.
Your answers must be:
- Strictly grounded in the provided official government clause excerpts below.
- Concise and in plain language accessible to a first-time reader.
- Honest about uncertainty: if the clauses do not fully answer the question, say so.
- Free of hallucination: do not invent eligibility criteria, amounts, or deadlines not present in the context.
${langInstructions[language] || langInstructions.en}

Official Government Clauses:
${context}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query },
      ],
      temperature: 0.2,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI Chat API error: ${response.status} – ${err?.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// ── Ensure document embeddings are loaded ─────────────────────────────────────
async function ensureDocumentEmbeddings(documents) {
  if (_documentEmbeddingCache) return _documentEmbeddingCache;

  // Embed all documents in a single batch request
  const texts = documents.map(doc => `${doc.clause_label}: ${doc.content}`);

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: texts.map(t => t.slice(0, 8192)),
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI batch embedding error: ${response.status} – ${err?.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  _documentEmbeddingCache = documents.map((doc, i) => ({
    doc,
    embedding: data.data[i].embedding,
  }));

  return _documentEmbeddingCache;
}

// ── Fallback: keyword matching (original implementation) ──────────────────────
function calculateKeywordSimilarity(query, text) {
  const queryTokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const textTokens = new Set(
    text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean)
  );

  if (queryTokens.length === 0 || textTokens.size === 0) return 0;

  let matches = 0;
  for (const token of queryTokens) {
    if (
      textTokens.has(token) ||
      Array.from(textTokens).some(t => t.includes(token) || token.includes(t))
    ) {
      matches += 1;
    }
  }

  return Math.min(0.95, (matches / queryTokens.length) * 1.1);
}

function buildFallbackText(targetScheme, topScore, language) {
  const link = targetScheme?.official_link || 'https://tsschemes.gov.in';
  const templates = {
    en: `Based on the retrieved official clauses, I am not fully certain about this query (confidence: ${Math.round(topScore * 100)}%). For accurate and up-to-date information please visit the official portal: ${link}`,
    hi: `आधिकारिक धाराओं के आधार पर, मैं इस प्रश्न के बारे में पूरी तरह आश्वस्त नहीं हूँ (विश्वास: ${Math.round(topScore * 100)}%)। सटीक जानकारी के लिए कृपया आधिकारिक पोर्टल पर जाएँ: ${link}`,
    te: `అధికారిక నిబంధనల ఆధారంగా ఈ ప్రశ్నకు సహాయక్ ఖచ్చితంగా సమాధానం ఇవ్వలేకపోతోంది (నమ్మకం: ${Math.round(topScore * 100)}%). దయచేసి అధికారిక పోర్టల్ సందర్శించండి: ${link}`,
  };
  return templates[language] || templates.en;
}

// ── Main export: processGroundedRAGQuery ──────────────────────────────────────
export async function processGroundedRAGQuery(query, schemeId, language = 'en') {
  const documents = TELANGANA_RAG_DOCUMENTS.filter(
    doc => !schemeId || doc.scheme_id === schemeId
  );

  const targetScheme =
    TELANGANA_SCHEMES.find(s => s.id === schemeId) || TELANGANA_SCHEMES[0];

  // ── Path A: Real OpenAI RAG ──────────────────────────────────
  if (isOpenAIConfigured) {
    try {
      const [queryEmbedding, docEmbeddings] = await Promise.all([
        createEmbedding(query),
        ensureDocumentEmbeddings(documents),
      ]);

      const scored = docEmbeddings.map(({ doc, embedding }) => ({
        doc,
        score: cosineSimilarity(queryEmbedding, embedding),
      })).sort((a, b) => b.score - a.score);

      const topScore = scored[0]?.score ?? 0;
      const isLowConfidence = topScore < CONFIDENCE_THRESHOLD;

      if (isLowConfidence || !scored[0]) {
        return {
          responseText: buildFallbackText(targetScheme, topScore, language),
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
        };
      }

      const topK = scored.slice(0, TOP_K);
      const responseText = await generateAnswer(
        query,
        topK.map(({ doc }) => doc),
        language
      );

      const citations = topK.map(({ doc }) => ({
        source_id: doc.id,
        clause_label: doc.clause_label,
        last_verified_at: doc.last_verified_at,
        content_snippet: doc.content,
      }));

      return {
        responseText,
        citations,
        confidenceScore: topScore,
        wasLowConfidence: false,
        retrievedDocs: topK.map(({ doc }) => doc),
        isRealAI: true,
      };
    } catch (err) {
      console.error('[RAG] OpenAI error, falling back to keyword matching:', err.message);
      // Fall through to keyword-matching fallback below
    }
  }

  // ── Path B: Keyword-matching fallback (no API key / API error) ──
  const scoredDocs = documents.map(doc => ({
    doc,
    score: calculateKeywordSimilarity(
      query,
      `${doc.clause_label} ${doc.content}`
    ),
  })).sort((a, b) => b.score - a.score);

  const topMatch = scoredDocs[0];
  const topScore = topMatch?.score ?? 0;
  const isLowConfidence = topScore < CONFIDENCE_THRESHOLD;

  if (isLowConfidence || !topMatch) {
    return {
      responseText: buildFallbackText(targetScheme, topScore, language),
      citations: topMatch ? [{
        source_id: topMatch.doc.id,
        clause_label: topMatch.doc.clause_label,
        last_verified_at: topMatch.doc.last_verified_at,
        content_snippet: topMatch.doc.content.substring(0, 120) + '...',
      }] : [],
      confidenceScore: topScore,
      wasLowConfidence: true,
      retrievedDocs: topMatch ? [topMatch.doc] : [],
      isRealAI: false,
    };
  }

  const retrievedDocs = scoredDocs.slice(0, 2).map(item => item.doc);
  const citations = retrievedDocs.map(doc => ({
    source_id: doc.id,
    clause_label: doc.clause_label,
    last_verified_at: doc.last_verified_at,
    content_snippet: doc.content,
  }));

  const templates = {
    hi: `आधिकारिक सरकारी दिशा-निर्देशों के अनुसार (${retrievedDocs[0].clause_label}): ${retrievedDocs[0].content}`,
    te: `అధికారిక ప్రభుత్వ నిబంధనల ప్రకారం (${retrievedDocs[0].clause_label}): ${retrievedDocs[0].content}`,
  };

  return {
    responseText:
      templates[language] ||
      `According to official government guidelines (${retrievedDocs[0].clause_label}): ${retrievedDocs[0].content}`,
    citations,
    confidenceScore: topScore,
    wasLowConfidence: false,
    retrievedDocs,
    isRealAI: false,
  };
}

/** Clear the cached document embeddings (e.g. when switching state corpus) */
export function clearEmbeddingCache() {
  _documentEmbeddingCache = null;
}
