export const UP_SCHEMES = [
  {
    id: 'up-kanya-sumangala',
    name_en: 'Mukhyamantri Kanya Sumangala Yojana',
    name_hi: 'मुख्यमंत्री कन्या सुमंगला योजना',
    description_en: 'Financial assistance of ₹15,000 for girl child across 6 milestones of education and health, from birth to graduation.',
    description_hi: 'बालिकाओं के लिए जन्म से लेकर स्नातक तक शिक्षा और स्वास्थ्य के 6 चरणों में ₹15,000 की वित्तीय सहायता।',
    category: 'womens_welfare',
    issuing_department: 'Women and Child Development Department, UP',
    benefits_en: 'Total ₹15,000 provided in 6 installments at different milestones of a girl child’s life.',
    benefits_hi: 'बालिका के जीवन के विभिन्न चरणों में 6 किश्तों में कुल ₹15,000 प्रदान किए जाते हैं।',
    official_link: 'https://mksy.up.gov.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'Aadhaar of parents/guardian.',
        helper_text_hi: 'माता-पिता/अभिभावक का आधार।',
        issuing_authority: 'UIDAI'
      },
      {
        key: 'birth_cert',
        name_en: 'Birth Certificate',
        name_hi: 'जन्म प्रमाण पत्र',
        helper_text_en: 'Birth certificate of the girl child.',
        helper_text_hi: 'बालिका का जन्म प्रमाण पत्र।',
        issuing_authority: 'Municipal Corporation / Gram Panchayat'
      }
    ]
  },
  {
    id: 'up-samajwadi-pension',
    name_en: 'UP Old Age/Widow/Disabled Pension',
    name_hi: 'यूपी वृद्धावस्था/विधवा/दिव्यांग पेंशन',
    description_en: 'Monthly financial assistance to the elderly, widows, and persons with disabilities to support their livelihood.',
    description_hi: 'बुजुर्गों, विधवाओं और विकलांग व्यक्तियों को उनकी आजीविका में सहायता के लिए मासिक वित्तीय सहायता।',
    category: 'pension',
    issuing_department: 'Social Welfare Department, UP',
    benefits_en: '₹1,000 per month credited directly to the beneficiary’s bank account.',
    benefits_hi: 'लाभार्थी के बैंक खाते में सीधे ₹1,000 प्रति माह जमा किए जाते हैं।',
    official_link: 'https://sspy-up.gov.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'For demographic verification.',
        helper_text_hi: 'जनसांख्यिकी सत्यापन के लिए।',
        issuing_authority: 'UIDAI'
      },
      {
        key: 'income_cert',
        name_en: 'Income Certificate',
        name_hi: 'आय प्रमाण पत्र',
        helper_text_en: 'Family income certificate issued by Tahsildar.',
        helper_text_hi: 'तहसीलदार द्वारा जारी पारिवारिक आय प्रमाण पत्र।',
        issuing_authority: 'Revenue Department'
      }
    ]
  },
  {
    id: 'up-scholarship-pre-matric',
    name_en: 'UP Pre-Matric Scholarship',
    name_hi: 'यूपी प्री-मैट्रिक छात्रवृत्ति',
    description_en: 'Scholarship scheme for students belonging to SC/ST/OBC and General categories studying in class 9 and 10.',
    description_hi: 'कक्षा 9 और 10 में पढ़ने वाले एससी/एसटी/ओबीसी और सामान्य वर्ग के छात्रों के लिए छात्रवृत्ति योजना।',
    category: 'scholarship',
    issuing_department: 'Social Welfare Department, UP',
    benefits_en: 'Financial assistance for tuition fees and other expenses for Pre-Matric education.',
    benefits_hi: 'प्री-मैट्रिक शिक्षा के लिए शिक्षण शुल्क और अन्य खर्चों के लिए वित्तीय सहायता।',
    official_link: 'https://scholarship.up.gov.in/',
    deadline: '2026-12-31',
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'caste_cert',
        name_en: 'Caste Certificate',
        name_hi: 'जाति प्रमाण पत्र',
        helper_text_en: 'Issued by competent authority.',
        helper_text_hi: 'सक्षम प्राधिकारी द्वारा जारी।',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'mark_sheet',
        name_en: 'Previous Year Marksheet',
        name_hi: 'पिछले वर्ष की मार्कशीट',
        helper_text_en: 'Class 8 or 9 marksheet.',
        helper_text_hi: 'कक्षा 8 या 9 की मार्कशीट।',
        issuing_authority: 'Educational Institution'
      }
    ]
  },
  {
    id: 'up-kisan-karj-mafi',
    name_en: 'UP Kisan Karj Rahat',
    name_hi: 'यूपी किसान कर्ज राहत योजना',
    description_en: 'Debt waiver scheme for small and marginal farmers to relieve them from agricultural loan burdens.',
    description_hi: 'छोटे और सीमांत किसानों को कृषि ऋण के बोझ से मुक्त करने के लिए कर्ज माफी योजना।',
    category: 'farmer_subsidy',
    issuing_department: 'Agriculture Department, UP',
    benefits_en: 'Waiver of crop loans up to ₹1 Lakh for eligible farmers.',
    benefits_hi: 'पात्र किसानों के लिए ₹1 लाख तक के कृषि ऋण की माफी।',
    official_link: 'https://upkisankarjrahat.upsdc.gov.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'Farmer Aadhaar linked with bank account.',
        helper_text_hi: 'बैंक खाते से जुड़ा किसान का आधार।',
        issuing_authority: 'UIDAI'
      },
      {
        key: 'kisan_credit_card',
        name_en: 'Kisan Credit Card / Loan Documents',
        name_hi: 'किसान क्रेडिट कार्ड / ऋण दस्तावेज़',
        helper_text_en: 'Details of the loan taken.',
        helper_text_hi: 'लिए गए ऋण का विवरण।',
        issuing_authority: 'Bank'
      }
    ]
  },
  {
    id: 'up-one-district-one-product',
    name_en: 'One District One Product (ODOP)',
    name_hi: 'एक जनपद एक उत्पाद (ओडीओपी)',
    description_en: 'Promoting specialized products and crafts of each district by providing financial assistance, training, and marketing support to MSMEs and artisans.',
    description_hi: 'एमएसएमई और कारीगरों को वित्तीय सहायता, प्रशिक्षण और विपणन सहायता प्रदान करके प्रत्येक जिले के विशिष्ट उत्पादों और शिल्पों को बढ़ावा देना।',
    category: 'startup_funding',
    issuing_department: 'Department of MSME and Export Promotion, UP',
    benefits_en: 'Margin money subsidy up to 25% of project cost, training, and toolkit distribution.',
    benefits_hi: 'परियोजना लागत के 25% तक मार्जिन मनी सब्सिडी, प्रशिक्षण और टूलकिट वितरण।',
    official_link: 'http://odopup.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'project_report',
        name_en: 'Project Report',
        name_hi: 'परियोजना रिपोर्ट',
        helper_text_en: 'Detailed project report of the proposed business.',
        helper_text_hi: 'प्रस्तावित व्यवसाय की विस्तृत परियोजना रिपोर्ट।',
        issuing_authority: 'Self/CA'
      },
      {
        key: 'domicile_cert',
        name_en: 'Domicile Certificate',
        name_hi: 'मूल निवास प्रमाण पत्र',
        helper_text_en: 'Proof of residence in UP.',
        helper_text_hi: 'यूपी में निवास का प्रमाण।',
        issuing_authority: 'Revenue Department'
      }
    ]
  },
  {
    id: 'up-mukhyamantri-awas',
    name_en: 'CM Awas Yojana (Urban)',
    name_hi: 'मुख्यमंत्री आवास योजना (शहरी)',
    description_en: 'Housing scheme providing affordable pucca houses to the urban poor and economically weaker sections.',
    description_hi: 'शहरी गरीबों और आर्थिक रूप से कमजोर वर्गों को किफायती पक्के घर उपलब्ध कराने वाली आवास योजना।',
    category: 'housing',
    issuing_department: 'Urban Employment & Poverty Alleviation Department, UP',
    benefits_en: 'Financial assistance for the construction of a new house or enhancement of an existing one.',
    benefits_hi: 'नया घर बनाने या मौजूदा घर के विस्तार के लिए वित्तीय सहायता।',
    official_link: 'https://sud.up.nic.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'land_documents',
        name_en: 'Land Ownership Documents',
        name_hi: 'भूमि स्वामित्व दस्तावेज',
        helper_text_en: 'Proof of owning land for house construction.',
        helper_text_hi: 'घर निर्माण के लिए भूमि के स्वामित्व का प्रमाण।',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'income_cert',
        name_en: 'Income Certificate',
        name_hi: 'आय प्रमाण पत्र',
        helper_text_en: 'Proof of falling under EWS/LIG category.',
        helper_text_hi: 'ईडब्ल्यूएस/एलआईजी श्रेणी के अंतर्गत आने का प्रमाण।',
        issuing_authority: 'Revenue Department'
      }
    ]
  },
  {
    id: 'up-mahila-samarthya',
    name_en: 'Mahila Samarthya Yojana',
    name_hi: 'महिला सामर्थ्य योजना',
    description_en: 'Empowering women by supporting Women Self Help Groups (SHGs) to set up micro-enterprises and improving their standard of living.',
    description_hi: 'महिला स्वयं सहायता समूहों (एसएचजी) को सूक्ष्म उद्यम स्थापित करने और उनके जीवन स्तर में सुधार करने में सहायता करके महिलाओं को सशक्त बनाना।',
    category: 'womens_welfare',
    issuing_department: 'Rural Development Department, UP',
    benefits_en: 'Financial assistance, training, and market access for women SHGs.',
    benefits_hi: 'महिला एसएचजी के लिए वित्तीय सहायता, प्रशिक्षण और बाजार तक पहुंच।',
    official_link: 'https://uplm.up.gov.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'shg_registration',
        name_en: 'SHG Registration Certificate',
        name_hi: 'एसएचजी पंजीकरण प्रमाण पत्र',
        helper_text_en: 'Valid registration of the Self Help Group.',
        helper_text_hi: 'स्वयं सहायता समूह का वैध पंजीकरण।',
        issuing_authority: 'NRLM/SRLM'
      },
      {
        key: 'bank_account',
        name_en: 'SHG Bank Account',
        name_hi: 'एसएचजी बैंक खाता',
        helper_text_en: 'Joint bank account of the SHG.',
        helper_text_hi: 'एसएचजी का संयुक्त बैंक खाता।',
        issuing_authority: 'Bank'
      }
    ]
  },
  {
    id: 'up-viklang-pension',
    name_en: 'UP Divyang Pension',
    name_hi: 'यूपी दिव्यांग पेंशन योजना',
    description_en: 'Financial assistance for Persons with Disabilities (PwD) to help them lead a dignified life.',
    description_hi: 'विकलांग व्यक्तियों (दिव्यांगों) को सम्मानजनक जीवन जीने में मदद करने के लिए वित्तीय सहायता।',
    category: 'pension',
    issuing_department: 'Divyangjan Sashaktikaran Department, UP',
    benefits_en: 'Monthly pension of ₹1,000 for persons with minimum 40% disability.',
    benefits_hi: 'न्यूनतम 40% विकलांगता वाले व्यक्तियों के लिए ₹1,000 की मासिक पेंशन।',
    official_link: 'https://sspy-up.gov.in/',
    deadline: null,
    state: 'UP',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'disability_cert',
        name_en: 'Disability Certificate',
        name_hi: 'विकलांगता प्रमाण पत्र',
        helper_text_en: 'Minimum 40% disability certificate.',
        helper_text_hi: 'न्यूनतम 40% विकलांगता प्रमाण पत्र।',
        issuing_authority: 'Chief Medical Officer (CMO)'
      },
      {
        key: 'bank_passbook',
        name_en: 'Bank Passbook',
        name_hi: 'बैंक पासबुक',
        helper_text_en: 'Aadhaar seeded bank account.',
        helper_text_hi: 'आधार सीडेड बैंक खाता।',
        issuing_authority: 'Bank'
      }
    ]
  }
];

export const UP_ELIGIBILITY_RULES = [
  {
    id: 'rule-up-kanya-gender',
    scheme_id: 'up-kanya-sumangala',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Mukhyamantri Kanya Sumangala Yojana is specifically for the girl child.',
    match_reason_hi: 'मुख्यमंत्री कन्या सुमंगला योजना विशेष रूप से बालिकाओं के लिए है।'
  },
  {
    id: 'rule-up-samajwadi-income',
    scheme_id: 'up-samajwadi-pension',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L'],
    match_reason_en: 'Family income is within the eligible limit for social security pension.',
    match_reason_hi: 'पारिवारिक आय सामाजिक सुरक्षा पेंशन के लिए योग्य सीमा के भीतर है।'
  },
  {
    id: 'rule-up-prematric-edu',
    scheme_id: 'up-scholarship-pre-matric',
    field: 'education_level',
    operator: 'in',
    value: ['Class 9', 'Class 10'],
    match_reason_en: 'Your education level qualifies for Pre-Matric Scholarship.',
    match_reason_hi: 'आपका शिक्षा स्तर प्री-मैट्रिक छात्रवृत्ति के लिए योग्य है।'
  },
  {
    id: 'rule-up-karj-occ',
    scheme_id: 'up-kisan-karj-mafi',
    field: 'occupation',
    operator: 'in',
    value: ['Farmer / Agriculturist'],
    match_reason_en: 'Your occupation as a Farmer qualifies for the debt waiver scheme.',
    match_reason_hi: 'किसान के रूप में आपका व्यवसाय कर्ज माफी योजना के लिए योग्य है।'
  },
  {
    id: 'rule-up-odop-occ',
    scheme_id: 'up-one-district-one-product',
    field: 'occupation',
    operator: 'in',
    value: ['Artisan', 'Self Employed / Business', 'MSME'],
    match_reason_en: 'You are eligible to apply for ODOP scheme support.',
    match_reason_hi: 'आप ओडीओपी योजना सहायता के लिए आवेदन करने के पात्र हैं।'
  },
  {
    id: 'rule-up-awas-income',
    scheme_id: 'up-mukhyamantri-awas',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L', '2L_5L'],
    match_reason_en: 'You meet the EWS/LIG income criteria for housing subsidy.',
    match_reason_hi: 'आप आवास सब्सिडी के लिए ईडब्ल्यूएस/एलआईजी आय मानदंडों को पूरा करते हैं।'
  },
  {
    id: 'rule-up-mahila-gender',
    scheme_id: 'up-mahila-samarthya',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'The scheme is meant to empower women and women-led SHGs.',
    match_reason_hi: 'यह योजना महिलाओं और महिलाओं के नेतृत्व वाले स्वयं सहायता समूहों को सशक्त बनाने के लिए है।'
  },
  {
    id: 'rule-up-viklang-disability',
    scheme_id: 'up-viklang-pension',
    field: 'is_differently_abled',
    operator: 'equals',
    value: true,
    match_reason_en: 'You are eligible for the Divyang pension based on disability criteria.',
    match_reason_hi: 'आप विकलांगता मानदंडों के आधार पर दिव्यांग पेंशन के पात्र हैं।'
  }
];


export const UP_RAG_DOCUMENTS = [
  {
    id: 'doc-up-kanya-sumangala-clause-1',
    scheme_id: 'up-kanya-sumangala',
    clause_label: 'Kanya Sumangala Yojana — Six Milestones & Installment Amounts',
    content: 'Mukhyamantri Kanya Sumangala Yojana provides ₹15,000 across six installments: ₹2,000 at birth, ₹1,000 at 1-year vaccination, ₹2,000 on Class 1 admission, ₹2,000 on Class 6 admission, ₹3,000 on Class 9 admission, and ₹5,000 on Class 12 or higher admission. Family annual income must not exceed ₹3,00,000 and the family must have maximum two children.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-up-kanya-sumangala-clause-2',
    scheme_id: 'up-kanya-sumangala',
    clause_label: 'Kanya Sumangala — Application Process & Required Documents',
    content: 'Applications for Kanya Sumangala are submitted online through the MKSY portal (mksy.up.gov.in) or offline through the Block Development Officer. Required documents include Aadhaar of parent/guardian, birth certificate of girl child, income certificate from Tehsildar, bank passbook, and for education installments, bonafide certificate from school.',
    language: 'en',
    last_verified_at: '2026-07-25'
  },
  {
    id: 'doc-up-pension-clause-1',
    scheme_id: 'up-old-age-pension',
    clause_label: 'UP Old Age Pension — Eligibility & Monthly Benefit Amount',
    content: 'Citizens aged 60 years and above domiciled in Uttar Pradesh with BPL status are eligible for Vridha Avasta Pension of ₹1,000 per month (₹500 from state + ₹500 from centre under IGNOAPS). Applications are submitted through the integrated pension portal. Aadhaar-linked bank account mandatory for DBT.',
    language: 'en',
    last_verified_at: '2026-07-25'
  }
];
