import { TELANGANA_SCHEMES, TELANGANA_ELIGIBILITY_RULES } from '../seed/telanganaSchemes.js';

export function evaluateRule(rule, profile) {
  const profileVal = profile[rule.field];

  if (profileVal === undefined || profileVal === null) {
    return false;
  }

  switch (rule.operator) {
    case 'equals':
      return String(profileVal).toLowerCase() === String(rule.value).toLowerCase();

    case 'in':
      if (Array.isArray(rule.value)) {
        return rule.value.some(val => String(val).toLowerCase() === String(profileVal).toLowerCase());
      }
      return false;

    case 'greater_than':
      return Number(profileVal) > Number(rule.value);

    case 'greater_than_or_equal':
      return Number(profileVal) >= Number(rule.value);

    case 'less_than':
      return Number(profileVal) < Number(rule.value);

    case 'less_than_or_equal':
      return Number(profileVal) <= Number(rule.value);

    default:
      return false;
  }
}

export function matchProfileAgainstSchemes(
  profile,
  schemes = TELANGANA_SCHEMES,
  rules = TELANGANA_ELIGIBILITY_RULES
) {
  return schemes.map(scheme => {
    const schemeRules = rules.filter(r => r.scheme_id === scheme.id);

    if (schemeRules.length === 0) {
      return {
        scheme,
        is_eligible: true,
        match_reasons: {
          en: ['Open to all residents of Telangana.'],
          hi: ['तेलंगाना के सभी निवासियों के लिए खुला है।'],
          te: ['తెలంగాణ పౌరులందరికీ అందుబాటులో ఉంది.']
        },
        passed_rules_count: 1,
        total_rules_count: 1
      };
    }

    const passedReasonsEn = [];
    const passedReasonsHi = [];
    const passedReasonsTe = [];
    let passedCount = 0;

    for (const rule of schemeRules) {
      if (evaluateRule(rule, profile)) {
        passedCount++;
        passedReasonsEn.push(rule.match_reason_en);
        passedReasonsHi.push(rule.match_reason_hi);
        passedReasonsTe.push(rule.match_reason_te);
      }
    }

    const isEligible = passedCount > 0;

    return {
      scheme,
      is_eligible: isEligible,
      match_reasons: {
        en: passedReasonsEn.length > 0 ? passedReasonsEn : ['Meets basic Telangana residency criteria.'],
        hi: passedReasonsHi.length > 0 ? passedReasonsHi : ['बुनियादी तेलंगाना निवास मानदंडों को पूरा करता है।'],
        te: passedReasonsTe.length > 0 ? passedReasonsTe : ['తెలంగాణ స్థానికత సూత్రాలకు కట్టుబడి ఉంది.']
      },
      passed_rules_count: passedCount,
      total_rules_count: schemeRules.length
    };
  });
}
