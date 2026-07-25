import { TELANGANA_RAG_DOCUMENTS, TELANGANA_SCHEMES } from '../seed/telanganaSchemes.js';

export const CONFIDENCE_THRESHOLD = 0.72;

function calculateKeywordSimilarity(query, text) {
  const queryTokens = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const textTokens = new Set(text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  
  if (queryTokens.length === 0 || textTokens.size === 0) return 0;
  
  let matches = 0;
  for (const token of queryTokens) {
    if (textTokens.has(token) || Array.from(textTokens).some(t => t.includes(token) || token.includes(t))) {
      matches += 1;
    }
  }
  
  const baseRatio = matches / queryTokens.length;
  return Math.min(0.95, baseRatio * 1.1);
}

export async function processGroundedRAGQuery(
  query,
  schemeId,
  language = 'en'
) {
  const documents = TELANGANA_RAG_DOCUMENTS.filter(doc => !schemeId || doc.scheme_id === schemeId);

  const scoredDocs = documents.map(doc => ({
    doc,
    score: calculateKeywordSimilarity(query, doc.content + ' ' + doc.clause_label)
  })).sort((a, b) => b.score - a.score);

  const topMatch = scoredDocs[0];
  const topScore = topMatch ? topMatch.score : 0;

  const isLowConfidence = topScore < CONFIDENCE_THRESHOLD;

  if (isLowConfidence || !topMatch) {
    const targetScheme = TELANGANA_SCHEMES.find(s => s.id === schemeId) || TELANGANA_SCHEMES[0];
    
    let fallbackText = `I'm not fully certain about this query based on retrieved official clauses. For exact rules, please visit the official portal: ${targetScheme.official_link}`;
    if (language === 'hi') {
      fallbackText = `प्राप्त आधिकारिक धाराओं के आधार पर मैं इस प्रश्न के बारे में पूरी तरह आश्वस्त नहीं हूँ। सटीक नियमों के लिए, कृपया सीधे आधिकारिक पोर्टल पर जाएँ: ${targetScheme.official_link}`;
    } else if (language === 'te') {
      fallbackText = `అధికారిక నిబంధనల ఆధారంగా ఈ ప్రశ్నకు సహాయక్ 100% ఖచ్చితమైన సమాధానం ఇవ్వలేకపోతోంది. దయచేసి నేరుగా పోర్టల్ చూడండి: ${targetScheme.official_link}`;
    }

    return {
      responseText: fallbackText,
      citations: topMatch ? [{
        source_id: topMatch.doc.id,
        clause_label: topMatch.doc.clause_label,
        last_verified_at: topMatch.doc.last_verified_at,
        content_snippet: topMatch.doc.content.substring(0, 120) + '...'
      }] : [],
      confidenceScore: topScore,
      wasLowConfidence: true,
      retrievedDocs: topMatch ? [topMatch.doc] : []
    };
  }

  const retrievedDocs = scoredDocs.slice(0, 2).map(item => item.doc);

  const citations = retrievedDocs.map(doc => ({
    source_id: doc.id,
    clause_label: doc.clause_label,
    last_verified_at: doc.last_verified_at,
    content_snippet: doc.content
  }));

  let responseText = "";
  if (language === 'hi') {
    responseText = `आधिकारिक सरकारी दिशा-निर्देशों के अनुसार (${retrievedDocs[0].clause_label}): ${retrievedDocs[0].content}`;
  } else if (language === 'te') {
    responseText = `అధికారిక ప్రభుత్వ నిబంధనల ప్రకారం (${retrievedDocs[0].clause_label}): ${retrievedDocs[0].content}`;
  } else {
    responseText = `According to official government guidelines (${retrievedDocs[0].clause_label}): ${retrievedDocs[0].content}`;
  }

  return {
    responseText,
    citations,
    confidenceScore: topScore,
    wasLowConfidence: false,
    retrievedDocs
  };
}
