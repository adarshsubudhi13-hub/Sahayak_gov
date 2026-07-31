export const MP_SCHEMES = [
  {
    id: 'mp-ladli-behna',
    name_en: 'Ladli Behna Yojana',
    name_hi: 'लाडली बहना योजना',
    description_en: '₹1250/month for married women in Madhya Pradesh.',
    description_hi: 'मध्य प्रदेश में विवाहित महिलाओं के लिए ₹1250/माह।',
    category: 'womens_welfare',
    issuing_department: 'Women and Child Development, MP',
    benefits_en: 'Monthly financial assistance directly to bank account.',
    benefits_hi: 'सीधे बैंक खाते में मासिक वित्तीय सहायता।',
    official_link: 'https://cmladlibahna.mp.gov.in/',
    deadline: null,
    state: 'Madhya Pradesh',
    last_verified_at: '2026-07-25',
    required_documents: []
  },
  {
    id: 'mp-mukhyamantri-tirath-darshan',
    name_en: 'CM Teerth Darshan Yojana',
    name_hi: 'मुख्यमंत्री तीर्थ दर्शन योजना',
    description_en: 'Free pilgrimage for senior citizens of Madhya Pradesh.',
    description_hi: 'मध्य प्रदेश के वरिष्ठ नागरिकों के लिए मुफ्त तीर्थयात्रा।',
    category: 'social_welfare',
    issuing_department: 'Religious Trusts and Endowments, MP',
    benefits_en: 'Travel expenses covered for notified pilgrimage sites.',
    benefits_hi: 'अधिसूचित तीर्थ स्थलों के लिए यात्रा व्यय कवर।',
    official_link: 'http://tirthdarshan.mp.gov.in/',
    deadline: null,
    state: 'Madhya Pradesh',
    last_verified_at: '2026-07-25',
    required_documents: []
  },
  {
    id: 'mp-kisan-kalyan',
    name_en: 'Mukhyamantri Kisan Kalyan Yojana',
    name_hi: 'मुख्यमंत्री किसान कल्याण योजना',
    description_en: '₹4000/year direct benefit for farmers.',
    description_hi: 'किसानों के लिए ₹4000/वर्ष का सीधा लाभ।',
    category: 'farmer_subsidy',
    issuing_department: 'Agriculture Dept, MP',
    benefits_en: 'Financial support in two installments of ₹2000.',
    benefits_hi: '₹2000 की दो किस्तों में वित्तीय सहायता।',
    official_link: 'https://saara.mp.gov.in/',
    deadline: null,
    state: 'Madhya Pradesh',
    last_verified_at: '2026-07-25',
    required_documents: []
  },
  {
    id: 'mp-gaon-ki-beti',
    name_en: 'Gaon Ki Beti Yojana',
    name_hi: 'गांव की बेटी योजना',
    description_en: '₹500/month scholarship for girls from rural areas scoring 60%+ in 12th.',
    description_hi: '12वीं में 60%+ अंक लाने वाली ग्रामीण लड़कियों के लिए ₹500/माह छात्रवृत्ति।',
    category: 'scholarship',
    issuing_department: 'Higher Education Dept, MP',
    benefits_en: 'Monthly scholarship for 10 months.',
    benefits_hi: '10 महीने के लिए मासिक छात्रवृत्ति।',
    official_link: 'http://scholarshipportal.mp.nic.in/',
    deadline: null,
    state: 'Madhya Pradesh',
    last_verified_at: '2026-07-25',
    required_documents: []
  },
  {
    id: 'mp-bal-ashirwad',
    name_en: 'Bal Ashirwad Yojana',
    name_hi: 'बाल आशीर्वाद योजना',
    description_en: '₹4000-5000/month for orphaned children.',
    description_hi: 'अनाथ बच्चों के लिए ₹4000-5000/माह।',
    category: 'social_welfare',
    issuing_department: 'Women and Child Development, MP',
    benefits_en: 'Financial assistance and support for orphaned kids.',
    benefits_hi: 'अनाथ बच्चों के लिए वित्तीय सहायता और समर्थन।',
    official_link: 'https://mp.gov.in/',
    deadline: null,
    state: 'Madhya Pradesh',
    last_verified_at: '2026-07-25',
    required_documents: []
  },
  {
    id: 'mp-udyam-kranti',
    name_en: 'Mukhyamantri Udyam Kranti Yojana',
    name_hi: 'मुख्यमंत्री उद्यम क्रांति योजना',
    description_en: 'Subsidized loan for youth self-employment.',
    description_hi: 'युवा स्वरोजगार के लिए सब्सिडी वाला ऋण।',
    category: 'business',
    issuing_department: 'MSME Dept, MP',
    benefits_en: 'Interest subsidy on loans for starting businesses.',
    benefits_hi: 'व्यवसाय शुरू करने के लिए ऋण पर ब्याज सब्सिडी।',
    official_link: 'https://samast.mponline.gov.in/',
    deadline: null,
    state: 'Madhya Pradesh',
    last_verified_at: '2026-07-25',
    required_documents: []
  }
];

export const MP_ELIGIBILITY_RULES = [
  {
    id: 'rule-mp-ladli-behna',
    scheme_id: 'mp-ladli-behna',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Scheme is for married women.',
    match_reason_hi: 'योजना विवाहित महिलाओं के लिए है।'
  },
  {
    id: 'rule-mp-kisan',
    scheme_id: 'mp-kisan-kalyan',
    field: 'occupation',
    operator: 'equals',
    value: 'Farmer / Agriculturist',
    match_reason_en: 'Farmers are eligible for this grant.',
    match_reason_hi: 'किसान इस अनुदान के पात्र हैं।'
  }
];

export const MP_RAG_DOCUMENTS = [
  {
    id: 'doc-mp-ladli-laxmi-clause-1',
    scheme_id: 'mp-ladli-laxmi',
    clause_label: 'Ladli Laxmi Yojana — Certificate Amount & Installment Structure',
    content: 'Ladli Laxmi Yojana provides ₹1,43,000 in total benefit across multiple milestones. ₹6,000 is invested in NSC annually for five years. Educational grants of ₹2,000 on Class 6, ₹4,000 on Class 9, ₹6,000 on Class 11 and ₹6,000 on Class 12 admissions are provided. A final ₹1,00,000 lump sum is given at marriage after 21 years or on completion of Class 12 examination.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-mp-sambal-clause-1',
    scheme_id: 'mp-mukhyamantri-jan-kalyan-sambal',
    clause_label: 'Sambal Yojana — Unorganised Worker Benefits & Registration',
    content: 'MP Mukhyamantri Jan Kalyan (Sambal) Yojana covers unorganised sector workers below the poverty line registered on the Sambal portal. Benefits include: free medical treatment, education support (₹5,000 to ₹12,000 per student per year), accident relief (₹2 lakh), and funeral assistance (₹5,000). Registration is done at Gram Panchayat or Jan Seva Kendra with Aadhaar.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-mp-kisan-anudan-clause-1',
    scheme_id: 'mp-kisan-anudan',
    clause_label: 'MP Kisan Anudan — Agricultural Equipment Subsidy Rates',
    content: 'MP Kisan Anudan scheme provides subsidies of 40-50% for general farmers and 50-60% for SC/ST and women farmers on purchase of agricultural equipment including power tillers, reapers, seed drills, and rotavators. Application must be submitted through MP Kisan App or Gram Panchayat before purchasing equipment. Subsidy is directly transferred after purchase verification.',
    language: 'en',
    last_verified_at: '2026-07-25'
  }
];
