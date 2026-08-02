export const CENTRAL_SCHEMES = [
  {
    id: 'central-pm-kisan',
    name_en: 'PM Kisan Samman Nidhi',
    name_hi: 'पीएम किसान सम्मान निधि',
    description_en: '₹6000/year for small & marginal farmers.',
    description_hi: 'छोटे और सीमांत किसानों के लिए ₹6000/वर्ष।',
    category: 'farmer_subsidy',
    issuing_department: 'Ministry of Agriculture and Farmers Welfare',
    benefits_en: '₹6000 transferred in three equal installments of ₹2000 each.',
    benefits_hi: '₹2000 की तीन समान किस्तों में ₹6000 हस्तांतरित।',
    official_link: 'https://pmkisan.gov.in/',
    deadline: null,
    state: 'Central Government',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'Issued by UIDAI.',
        helper_text_hi: 'यूआईडीएआई द्वारा जारी।',
        issuing_authority: 'UIDAI'
      },
      {
        key: 'land_records',
        name_en: 'Land Ownership Records',
        name_hi: 'भूमि स्वामित्व रिकॉर्ड',
        helper_text_en: 'Proof of cultivable land holding.',
        helper_text_hi: 'कृषि योग्य भूमि का प्रमाण।',
        issuing_authority: 'Revenue Dept'
      }
    ]
  },
  {
    id: 'central-pmay-gramin',
    name_en: 'PMAY-G (Pradhan Mantri Awas Yojana Gramin)',
    name_hi: 'पीएमएवाई-जी (प्रधान मंत्री आवास योजना ग्रामीण)',
    description_en: 'Housing scheme for the rural poor.',
    description_hi: 'ग्रामीण गरीबों के लिए आवास योजना।',
    category: 'housing',
    issuing_department: 'Ministry of Rural Development',
    benefits_en: 'Financial assistance for construction of pucca houses in rural areas.',
    benefits_hi: 'ग्रामीण क्षेत्रों में पक्के घर के निर्माण के लिए वित्तीय सहायता।',
    official_link: 'https://pmayg.nic.in/',
    deadline: null,
    state: 'Central Government',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'Issued by UIDAI.',
        helper_text_hi: 'यूआईडीएआई द्वारा जारी।',
        issuing_authority: 'UIDAI'
      }
    ]
  },
  {
    id: 'central-pm-jan-arogya',
    name_en: 'PM Jan Arogya Yojana (Ayushman Bharat)',
    name_hi: 'पीएम जन आरोग्य योजना (आयुष्मान भारत)',
    description_en: '₹5 lakh health insurance for BPL families.',
    description_hi: 'बीपीएल परिवारों के लिए ₹5 लाख का स्वास्थ्य बीमा।',
    category: 'healthcare',
    issuing_department: 'National Health Authority',
    benefits_en: 'Cashless healthcare coverage up to ₹5 lakh per family per year.',
    benefits_hi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस स्वास्थ्य सेवा कवरेज।',
    official_link: 'https://pmjay.gov.in/',
    deadline: null,
    state: 'Central Government',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'ration_card',
        name_en: 'Ration Card',
        name_hi: 'राशन कार्ड',
        helper_text_en: 'BPL family proof.',
        helper_text_hi: 'बीपीएल परिवार का प्रमाण।',
        issuing_authority: 'Civil Supplies Dept'
      }
    ]
  },
  {
    id: 'central-pm-ujjwala',
    name_en: 'PM Ujjwala Yojana',
    name_hi: 'पीएम उज्ज्वला योजना',
    description_en: 'Free LPG connection for BPL women.',
    description_hi: 'बीपीएल महिलाओं के लिए मुफ्त एलपीजी कनेक्शन।',
    category: 'womens_welfare',
    issuing_department: 'Ministry of Petroleum and Natural Gas',
    benefits_en: 'Financial support of ₹1600 for LPG connection setup.',
    benefits_hi: 'एलपीजी कनेक्शन सेटअप के लिए ₹1600 की वित्तीय सहायता।',
    official_link: 'https://www.pmuy.gov.in/',
    deadline: null,
    state: 'Central Government',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'Issued by UIDAI.',
        helper_text_hi: 'यूआईडीएआई द्वारा जारी।',
        issuing_authority: 'UIDAI'
      }
    ]
  },
  {
    id: 'central-pm-scholarship',
    name_en: 'PM Scholarship Scheme',
    name_hi: 'पीएम छात्रवृत्ति योजना',
    description_en: 'Scholarship for dependent wards/widows of ex-servicemen & ex-coast guard personnel.',
    description_hi: 'पूर्व सैनिकों और पूर्व तटरक्षक कर्मियों के आश्रित बच्चों/विधवाओं के लिए छात्रवृत्ति।',
    category: 'scholarship',
    issuing_department: 'Ministry of Defence / MHA',
    benefits_en: 'Financial assistance for professional degree courses.',
    benefits_hi: 'व्यावसायिक डिग्री पाठ्यक्रमों के लिए वित्तीय सहायता।',
    official_link: 'https://ksb.gov.in/',
    deadline: null,
    state: 'Central Government',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'discharge_book',
        name_en: 'Discharge Book / PPO',
        name_hi: 'डिस्चार्ज बुक / पीपीओ',
        helper_text_en: 'Service proof of Ex-serviceman.',
        helper_text_hi: 'पूर्व सैनिक का सेवा प्रमाण।',
        issuing_authority: 'Ministry of Defence'
      }
    ]
  }
];

export const CENTRAL_ELIGIBILITY_RULES = [
  {
    id: 'rule-central-pm-kisan',
    scheme_id: 'central-pm-kisan',
    field: 'occupation',
    operator: 'equals',
    value: 'Farmer / Agriculturist',
    match_reason_en: 'Eligible for farmer income support.',
    match_reason_hi: 'किसान आय सहायता के लिए पात्र।'
  },
  {
    id: 'rule-central-pm-ujjwala',
    scheme_id: 'central-pm-ujjwala',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Scheme provides LPG connection to adult women in BPL households.',
    match_reason_hi: 'योजना बीपीएल परिवारों की वयस्क महिलाओं को एलपीजी कनेक्शन प्रदान करती है।'
  },
  {
    id: 'rule-central-pmjay-income',
    scheme_id: 'central-pm-jan-arogya',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L'],
    match_reason_en: 'Income falls within Ayushman Bharat eligibility criteria.',
    match_reason_hi: 'आय आयुष्मान भारत पात्रता मानदंडों के अंतर्गत आती है।'
  }
];

export const CENTRAL_RAG_DOCUMENTS = [
  {
    id: 'doc-pmkisan-clause-1',
    scheme_id: 'central-pm-kisan',
    clause_label: 'PM-KISAN Operational Guidelines — Eligibility & Exclusions',
    content: 'PM-KISAN provides income support of ₹6,000 per year in three equal installments of ₹2,000 to all landholding farmer families with cultivable land as per land records. Institutional landholders, farmers holding constitutional posts, current or former income tax payees, and those with monthly pension above ₹10,000 are excluded.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-pmkisan-clause-2',
    scheme_id: 'central-pm-kisan',
    clause_label: 'PM-KISAN — Registration & Aadhaar Seeding Requirement',
    content: 'Farmer registration must be completed on the PM-KISAN portal (pmkisan.gov.in). Aadhaar number must be seeded with the bank account for Direct Benefit Transfer. New registrations require verification by village-level revenue officials before first installment is released.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-ayushman-clause-1',
    scheme_id: 'central-pm-jan-arogya',
    clause_label: 'Ayushman Bharat PM-JAY — Coverage Scope & Beneficiary Identification',
    content: 'Ayushman Bharat PM-JAY provides cashless health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization. Beneficiary families are identified from SECC 2011 database and State government schemes merged with AB PM-JAY. Beneficiaries can avail treatment at any empanelled public or private hospital across India.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-pmay-clause-1',
    scheme_id: 'central-pmay-gramin',
    clause_label: 'PMAY-G — Financial Assistance & Beneficiary Selection',
    content: 'Under PMAY-Gramin, eligible rural BPL households receive financial assistance of ₹1,20,000 (plain areas) and ₹1,30,000 (hilly/difficult areas) for construction of a pucca house of minimum 25 sqm. Beneficiaries are selected through SECC 2011 data and Gram Sabha verification. MGNREGS wage support of 90-95 days is additionally provided.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-mudra-clause-1',
    scheme_id: 'central-mudra-yojana',
    clause_label: 'PM Mudra Yojana — Three Loan Categories & Eligible Enterprises',
    content: 'PM Mudra Yojana provides collateral-free loans to non-corporate small business segments in three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh). All non-farm micro enterprises engaged in manufacturing, trading, or service activities are eligible including self-employed artisans, vendors, and small shopkeepers.',
    language: 'en',
    last_verified_at: '2026-07-25'
  }
];
