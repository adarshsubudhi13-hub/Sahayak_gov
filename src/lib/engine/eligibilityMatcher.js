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
  const LANG_CODES = ['en', 'hi', 'te', 'mr', 'kn', 'ta', 'ml', 'gu', 'bn', 'pa', 'or', 'as'];

  return schemes.map(scheme => {
    const schemeRules = rules.filter(r => r.scheme_id === scheme.id);

    if (schemeRules.length === 0) {
      const defaultReasons = {};
      LANG_CODES.forEach(lang => {
        defaultReasons[lang] = [
          `Open to all residents of ${scheme.state || 'India'}.`
        ];
      });
      return {
        scheme,
        is_eligible: true,
        match_reasons: defaultReasons,
        passed_rules_count: 1,
        total_rules_count: 1
      };
    }

    const passedReasonsByLang = {};
    LANG_CODES.forEach(lang => {
      passedReasonsByLang[lang] = [];
    });

    let passedCount = 0;

    for (const rule of schemeRules) {
      if (evaluateRule(rule, profile)) {
        passedCount++;
        const fallbackReason = rule.match_reason_en || rule.match_reason_hi || 'Meets eligibility criteria.';
        
        LANG_CODES.forEach(lang => {
          const reasonForLang = rule[`match_reason_${lang}`] || fallbackReason;
          if (reasonForLang) {
            passedReasonsByLang[lang].push(reasonForLang);
          }
        });
      }
    }

    // Ensure no empty language array
    LANG_CODES.forEach(lang => {
      if (passedReasonsByLang[lang].length === 0) {
        passedReasonsByLang[lang] = [
          passedReasonsByLang['en'][0] || `Meets basic ${scheme.state || ''} residency criteria.`
        ];
      }
    });

    const isEligible = passedCount > 0;

    return {
      scheme,
      is_eligible: isEligible,
      match_reasons: passedReasonsByLang,
      passed_rules_count: passedCount,
      total_rules_count: schemeRules.length
    };
  });
}
