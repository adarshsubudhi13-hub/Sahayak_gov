export function evaluateRule(rule, profile) {
  const profileVal = profile[rule.field_key];

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
  schemes = []
) {
  return schemes.map(scheme => {
    const schemeRules = scheme.rules || [];

    if (schemeRules.length === 0) {
      return {
        scheme,
        is_eligible: true,
        match_reasons: {
          en: ['Open to all residents.'],
          hi: ['सभी निवासियों के लिए खुला है।'],
          te: ['పౌరులందరికీ అందుబాటులో ఉంది.']
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
        passedReasonsEn.push(rule.match_reason_default);
        passedReasonsHi.push(rule.translations?.hi?.match_reason || rule.match_reason_default);
        passedReasonsTe.push(rule.translations?.te?.match_reason || rule.match_reason_default);
      }
    }

    const isEligible = passedCount > 0 && passedCount >= schemeRules.filter(r => r.is_mandatory).length;

    return {
      scheme,
      is_eligible: isEligible,
      match_reasons: {
        en: passedReasonsEn.length > 0 ? passedReasonsEn : ['Meets basic criteria.'],
        hi: passedReasonsHi.length > 0 ? passedReasonsHi : ['बुनियादी मानदंडों को पूरा करता है।'],
        te: passedReasonsTe.length > 0 ? passedReasonsTe : ['ప్రాథమిక సూత్రాలకు కట్టుబడి ఉంది.']
      },
      passed_rules_count: passedCount,
      total_rules_count: schemeRules.length
    };
  });
}
