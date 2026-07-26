import { TELANGANA_SCHEMES, TELANGANA_ELIGIBILITY_RULES } from './seed/telanganaSchemes.js';

const simulateNetworkDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchDemographicFields() {
  await simulateNetworkDelay();
  
  return {
    status: 'success',
    data: {
      fields: [
        {
          field_key: 'full_name',
          data_type: 'string',
          label_default: 'Full Name',
          translations: { hi: { label: 'पूरा नाम' }, te: { label: 'పూర్తి పేరు' } },
          is_required: true,
          options: null
        },
        {
          field_key: 'age',
          data_type: 'number',
          label_default: 'Age (Years)',
          translations: { hi: { label: 'आयु (वर्ष)' }, te: { label: 'వయస్సు (సంవత్సరాలు)' } },
          is_required: true,
          options: null
        },
        {
          field_key: 'gender',
          data_type: 'enum',
          label_default: 'Gender',
          translations: { hi: { label: 'लिंग' }, te: { label: 'లింగం' } },
          is_required: true,
          options: [
            { value: 'female', translations: { en: 'Female', hi: 'महिला', te: 'స్త్రీ' } },
            { value: 'male', translations: { en: 'Male', hi: 'पुरुष', te: 'పురుషుడు' } },
            { value: 'other', translations: { en: 'Other', hi: 'अन्य', te: 'ఇతర' } }
          ]
        },
        {
          field_key: 'state',
          data_type: 'enum',
          label_default: 'State',
          translations: { hi: { label: 'राज्य' }, te: { label: 'రాష్ట్రం' } },
          is_required: true,
          options: [
            { value: 'Central / All India', translations: { en: 'Central / All India', hi: 'केंद्रीय / संपूर्ण भारत', te: 'కేంద్ర / యావత్ భారతదేశం' } },
            { value: 'Telangana', translations: { en: 'Telangana', hi: 'तेलंगाना', te: 'తెలంగాణ' } },
            { value: 'Maharashtra', translations: { en: 'Maharashtra', hi: 'महाराष्ट्र', te: 'మహారాష్ట్ర' } },
            { value: 'Karnataka', translations: { en: 'Karnataka', hi: 'कर्नाटक', te: 'కర్ణాటక' } },
            { value: 'Uttar Pradesh', translations: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', te: 'ఉత్తరప్రదేశ్' } },
            { value: 'Tamil Nadu', translations: { en: 'Tamil Nadu', hi: 'तमिलनाडु', te: 'తమిళనాడు' } },
            { value: 'Delhi', translations: { en: 'Delhi', hi: 'दिल्ली', te: 'ఢిల్లీ' } }
          ]
        },
        {
          field_key: 'district',
          data_type: 'enum',
          label_default: 'District',
          translations: { hi: { label: 'जिला' }, te: { label: 'జిల్లా' } },
          is_required: true,
          options: [
            { value: 'Hyderabad', translations: { en: 'Hyderabad', hi: 'हैदराबाद', te: 'హైదరాబాద్' } },
            { value: 'Warangal', translations: { en: 'Warangal', hi: 'वारंगल', te: 'వరంగల్' } },
            { value: 'Karimnagar', translations: { en: 'Karimnagar', hi: 'करीमनगर', te: 'కరీంనగర్' } },
            { value: 'Adilabad', translations: { en: 'Adilabad', hi: 'आदिलाबाद', te: 'ఆదిలాబాద్' } }
          ]
        },
        {
          field_key: 'occupation',
          data_type: 'enum',
          label_default: 'Occupation',
          translations: { hi: { label: 'व्यवसाय' }, te: { label: 'వృత్తి' } },
          is_required: true,
          options: [
            { value: 'Student', translations: { en: 'Student', hi: 'छात्र', te: 'విద్యార్థి' } },
            { value: 'Farmer', translations: { en: 'Farmer', hi: 'किसान', te: 'రైతు' } },
            { value: 'Business', translations: { en: 'Business', hi: 'व्यापार', te: 'వ్యాపారం' } },
            { value: 'Unemployed', translations: { en: 'Unemployed', hi: 'बेरोजगार', te: 'నిరుద్యోగి' } }
          ]
        },
        {
          field_key: 'annual_income_band',
          data_type: 'enum',
          label_default: 'Annual Family Income',
          translations: { hi: { label: 'वार्षिक पारिवारिक आय' }, te: { label: 'వార్షిక కుటుంబ ఆదాయం' } },
          is_required: true,
          options: [
            { value: 'under_1L', translations: { en: 'Under ₹1 Lakh', hi: '₹1 लाख से कम', te: '₹1 లక్ష లోపు' } },
            { value: '1L_2L', translations: { en: '₹1 Lakh - ₹2 Lakhs', hi: '₹1 लाख - ₹2 लाख', te: '₹1 లక్ష - ₹2 లక్షలు' } },
            { value: '2L_5L', translations: { en: '₹2 Lakhs - ₹5 Lakhs', hi: '₹2 लाख - ₹5 लाख', te: '₹2 లక్షలు - ₹5 లక్షలు' } },
            { value: 'above_5L', translations: { en: 'Above ₹5 Lakhs', hi: '₹5 लाख से अधिक', te: '₹5 లక్షలకు పైగా' } }
          ]
        },
        {
          field_key: 'education_level',
          data_type: 'enum',
          label_default: 'Education Level',
          translations: { hi: { label: 'शिक्षा स्तर' }, te: { label: 'విద్య స్థాయి' } },
          is_required: true,
          options: [
            { value: '10th Pass or below', translations: { en: '10th Pass or below' } },
            { value: 'Intermediate', translations: { en: 'Intermediate (10+2)' } },
            { value: 'Undergraduate (BA/BSc/BCom/BTech)', translations: { en: 'Undergraduate (BA/BSc/BCom/BTech)' } },
            { value: 'Postgraduate (MA/MSc/MBA/MTech)', translations: { en: 'Postgraduate' } }
          ]
        },
        {
          field_key: 'social_category',
          data_type: 'enum',
          label_default: 'Social Category',
          translations: { hi: { label: 'सामाजिक वर्ग' }, te: { label: 'సామాజిక వర్గం' } },
          is_required: true,
          options: [
            { value: 'General', translations: { en: 'General', hi: 'सामान्य', te: 'జనరల్' } },
            { value: 'OBC', translations: { en: 'OBC', hi: 'ओबीसी', te: 'ఓబీసీ' } },
            { value: 'SC', translations: { en: 'SC', hi: 'एससी', te: 'ఎస్సీ' } },
            { value: 'ST', translations: { en: 'ST', hi: 'एसटी', te: 'ఎస్టీ' } }
          ]
        },
        {
          field_key: 'disability_status',
          data_type: 'boolean',
          label_default: 'I have a recognized disability (PwD)',
          translations: { hi: { label: 'मुझे मान्यता प्राप्त विकलांगता है' }, te: { label: 'నాకు వైకల్యం ఉంది' } },
          is_required: false,
          options: null
        }
      ]
    }
  };
}

export async function fetchSchemesAndRules() {
  await simulateNetworkDelay(500);

  const formattedSchemes = TELANGANA_SCHEMES.map(scheme => {
    const schemeRules = TELANGANA_ELIGIBILITY_RULES.filter(r => r.scheme_id === scheme.id);
    const rules = schemeRules.map(rule => ({
      field_key: rule.field,
      operator: rule.operator,
      value: rule.value,
      match_reason_default: rule.match_reason_en,
      translations: { hi: { match_reason: rule.match_reason_hi }, te: { match_reason: rule.match_reason_te } },
      is_mandatory: true
    }));

    const required_documents = (scheme.required_documents || []).map(docName => {
      const key_name = docName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      return {
        key_name,
        translations: { en: { name: docName }, hi: { name: docName }, te: { name: docName } },
        issuing_authority: docName.toLowerCase().includes('certificate') ? 'MRO / Tahsildar' : 'Respective Authority',
        is_mandatory: true
      };
    });

    return {
      id: scheme.id,
      name_default: scheme.name_en,
      description_default: scheme.description_en,
      translations: {
        hi: { name: scheme.name_hi, description: scheme.description_hi },
        te: { name: scheme.name_te, description: scheme.description_te }
      },
      category: scheme.category,
      department: scheme.issuing_department,
      official_link: scheme.official_link,
      last_verified_at: scheme.last_verified_at,
      rules,
      required_documents
    };
  });

  return { status: 'success', data: { schemes: formattedSchemes } };
}
