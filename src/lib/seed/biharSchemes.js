export const BIHAR_SCHEMES = [
  {
    id: 'br-mukhyamantri-kanya-utthan',
    name_en: 'Mukhyamantri Kanya Utthan Yojana',
    name_hi: 'मुख्यमंत्री कन्या उत्थान योजना',
    description_en: 'Financial assistance to empower girls through education and stop female infanticide. ₹50,000 provided at graduation.',
    description_hi: 'शिक्षा के माध्यम से बालिकाओं को सशक्त बनाने और कन्या भ्रूण हत्या को रोकने के लिए वित्तीय सहायता। स्नातक होने पर ₹50,000 प्रदान किए जाते हैं।',
    category: 'womens_welfare',
    issuing_department: 'Social Welfare Department, Bihar',
    benefits_en: '₹50,000 lump sum for girls who complete their graduation.',
    benefits_hi: 'स्नातक पूरा करने वाली लड़कियों के लिए ₹50,000 की एकमुश्त राशि।',
    official_link: 'http://edudbt.bih.nic.in/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'For identity verification.',
        helper_text_hi: 'पहचान सत्यापन के लिए।',
        issuing_authority: 'UIDAI'
      },
      {
        key: 'degree_cert',
        name_en: 'Graduation Degree / Marksheet',
        name_hi: 'स्नातक की डिग्री / मार्कशीट',
        helper_text_en: 'Proof of completing graduation from a recognized university in Bihar.',
        helper_text_hi: 'बिहार में मान्यता प्राप्त विश्वविद्यालय से स्नातक पूरा करने का प्रमाण।',
        issuing_authority: 'University'
      }
    ]
  },
  {
    id: 'br-kabir-antyeshti',
    name_en: 'Kabir Antyeshti Anudan',
    name_hi: 'कबीर अंत्येष्टि अनुदान योजना',
    description_en: 'Financial assistance provided to BPL families to meet the cremation/funeral expenses of a deceased family member.',
    description_hi: 'बीपीएल परिवारों को परिवार के किसी मृत सदस्य के अंतिम संस्कार के खर्च को पूरा करने के लिए वित्तीय सहायता प्रदान की जाती है।',
    category: 'social_security',
    issuing_department: 'Social Welfare Department, Bihar',
    benefits_en: 'One-time grant of ₹3,000 for funeral expenses.',
    benefits_hi: 'अंतिम संस्कार के खर्च के लिए ₹3,000 का एकमुश्त अनुदान।',
    official_link: 'https://state.bihar.gov.in/socialwelfare/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'death_cert',
        name_en: 'Death Certificate',
        name_hi: 'मृत्यु प्रमाण पत्र',
        helper_text_en: 'Death certificate of the deceased.',
        helper_text_hi: 'मृतक का मृत्यु प्रमाण पत्र।',
        issuing_authority: 'Gram Panchayat / Municipality'
      },
      {
        key: 'bpl_card',
        name_en: 'BPL Ration Card',
        name_hi: 'बीपीएल राशन कार्ड',
        helper_text_en: 'Proof of BPL status.',
        helper_text_hi: 'बीपीएल स्थिति का प्रमाण।',
        issuing_authority: 'Civil Supplies Dept'
      }
    ]
  },
  {
    id: 'br-bicycle-scheme',
    name_en: 'Bihar Mukhyamantri Cycle Yojana',
    name_hi: 'बिहार मुख्यमंत्री बालक/बालिका साइकिल योजना',
    description_en: 'Free bicycle scheme for class 9 students (boys and girls) to reduce school dropout rates.',
    description_hi: 'स्कूल ड्रॉपआउट दर को कम करने के लिए कक्षा 9 के छात्रों (लड़कों और लड़कियों) के लिए मुफ्त साइकिल योजना।',
    category: 'education',
    issuing_department: 'Education Department, Bihar',
    benefits_en: 'Amount transferred for purchasing a bicycle for students enrolled in Class 9.',
    benefits_hi: 'कक्षा 9 में नामांकित छात्रों के लिए साइकिल खरीदने के लिए राशि हस्तांतरित की जाती है।',
    official_link: 'http://educationbihar.gov.in/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'school_id',
        name_en: 'School ID / Bonafide Certificate',
        name_hi: 'स्कूल आईडी / बोनाफाइड प्रमाण पत्र',
        helper_text_en: 'Proof of admission in Class 9.',
        helper_text_hi: 'कक्षा 9 में प्रवेश का प्रमाण।',
        issuing_authority: 'School Principal'
      },
      {
        key: 'receipt',
        name_en: 'Bicycle Purchase Receipt',
        name_hi: 'साइकिल खरीद रसीद',
        helper_text_en: 'Valid receipt for purchasing the bicycle.',
        helper_text_hi: 'साइकिल खरीदने की वैध रसीद।',
        issuing_authority: 'Vendor'
      }
    ]
  },
  {
    id: 'br-baal-sahayata',
    name_en: 'Bal Sahayata Yojana',
    name_hi: 'बाल सहायता योजना',
    description_en: 'Financial support for orphaned children, especially those who lost parents due to COVID-19 or other reasons.',
    description_hi: 'अनाथ बच्चों के लिए वित्तीय सहायता, विशेष रूप से उन बच्चों के लिए जिन्होंने कोविड-19 या अन्य कारणों से अपने माता-पिता को खो दिया है।',
    category: 'child_welfare',
    issuing_department: 'Social Welfare Department, Bihar',
    benefits_en: '₹1,500 per month till the age of 18 years.',
    benefits_hi: '18 वर्ष की आयु तक ₹1,500 प्रति माह।',
    official_link: 'https://state.bihar.gov.in/socialwelfare/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'death_cert_parents',
        name_en: 'Parents Death Certificates',
        name_hi: 'माता-पिता का मृत्यु प्रमाण पत्र',
        helper_text_en: 'Death certificates of both parents.',
        helper_text_hi: 'माता-पिता दोनों का मृत्यु प्रमाण पत्र।',
        issuing_authority: 'Municipal Corporation / Panchayat'
      },
      {
        key: 'birth_cert_child',
        name_en: 'Child Birth Certificate',
        name_hi: 'बच्चे का जन्म प्रमाण पत्र',
        helper_text_en: 'Proof of age of the child.',
        helper_text_hi: 'बच्चे की आयु का प्रमाण।',
        issuing_authority: 'Municipal Corporation / Panchayat'
      }
    ]
  },
  {
    id: 'br-student-credit-card',
    name_en: 'Bihar Student Credit Card Scheme',
    name_hi: 'बिहार स्टूडेंट क्रेडिट कार्ड योजना',
    description_en: 'Educational loan provided to students for pursuing higher education after class 12th.',
    description_hi: 'कक्षा 12वीं के बाद उच्च शिक्षा प्राप्त करने के लिए छात्रों को शैक्षिक ऋण प्रदान किया जाता है।',
    category: 'education',
    issuing_department: 'Education Department, Bihar',
    benefits_en: 'Education loan up to ₹4 lakh at a nominal interest rate of 4% (1% for girls/divyang).',
    benefits_hi: '4% (लड़कियों/दिव्यांगों के लिए 1%) की मामूली ब्याज दर पर ₹4 लाख तक का शिक्षा ऋण।',
    official_link: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'admission_proof',
        name_en: 'Admission Proof',
        name_hi: 'प्रवेश प्रमाण',
        helper_text_en: 'Proof of admission in a recognized higher education institute.',
        helper_text_hi: 'मान्यता प्राप्त उच्च शिक्षा संस्थान में प्रवेश का प्रमाण।',
        issuing_authority: 'Educational Institution'
      },
      {
        key: 'fee_structure',
        name_en: 'Course Fee Structure',
        name_hi: 'पाठ्यक्रम शुल्क संरचना',
        helper_text_en: 'Detailed fee structure of the course.',
        helper_text_hi: 'पाठ्यक्रम की विस्तृत शुल्क संरचना।',
        issuing_authority: 'Educational Institution'
      }
    ]
  },
  {
    id: 'br-mukhyamantri-vriddhavastha',
    name_en: 'CM Vriddhavastha Pension',
    name_hi: 'मुख्यमंत्री वृद्धजन पेंशन योजना',
    description_en: 'Universal old age pension scheme for all senior citizens above 60 years in the state.',
    description_hi: 'राज्य में 60 वर्ष से अधिक आयु के सभी वरिष्ठ नागरिकों के लिए सार्वभौमिक वृद्धावस्था पेंशन योजना।',
    category: 'pension',
    issuing_department: 'Social Welfare Department, Bihar',
    benefits_en: '₹400/month for elderly (60-79 years) and ₹500/month for those above 80 years.',
    benefits_hi: 'बुजुर्गों (60-79 वर्ष) के लिए ₹400/माह और 80 वर्ष से अधिक उम्र वालों के लिए ₹500/माह।',
    official_link: 'https://sspmis.bihar.gov.in/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'aadhaar_card',
        name_en: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        helper_text_en: 'Proof of age and identity.',
        helper_text_hi: 'आयु और पहचान का प्रमाण।',
        issuing_authority: 'UIDAI'
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
  },
  {
    id: 'br-saur-kranti',
    name_en: 'Har Ghar Bijli',
    name_hi: 'हर घर बिजली योजना',
    description_en: 'Scheme to ensure free electricity connections to all un-electrified households in rural and urban areas.',
    description_hi: 'ग्रामीण और शहरी क्षेत्रों में सभी गैर-विद्युतीकृत घरों में मुफ्त बिजली कनेक्शन सुनिश्चित करने की योजना।',
    category: 'infrastructure',
    issuing_department: 'Energy Department, Bihar',
    benefits_en: 'Free electricity connection for BPL families.',
    benefits_hi: 'बीपीएल परिवारों के लिए मुफ्त बिजली कनेक्शन।',
    official_link: 'https://hargharbijli.bsphcl.co.in/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'bpl_card',
        name_en: 'BPL Ration Card',
        name_hi: 'बीपीएल राशन कार्ड',
        helper_text_en: 'Proof of BPL status.',
        helper_text_hi: 'बीपीएल स्थिति का प्रमाण।',
        issuing_authority: 'Civil Supplies Dept'
      },
      {
        key: 'identity_proof',
        name_en: 'Identity Proof',
        name_hi: 'पहचान प्रमाण',
        helper_text_en: 'Voter ID or Aadhaar Card.',
        helper_text_hi: 'वोटर आईडी या आधार कार्ड।',
        issuing_authority: 'Govt. of India / Election Commission'
      }
    ]
  },
  {
    id: 'br-fasal-sahayata',
    name_en: 'Bihar Rajya Fasal Sahayata',
    name_hi: 'बिहार राज्य फसल सहायता योजना',
    description_en: 'Crop insurance scheme providing compensation to farmers in case of crop damage due to natural calamities.',
    description_hi: 'प्राकृतिक आपदाओं के कारण फसल के नुकसान की स्थिति में किसानों को मुआवजा प्रदान करने वाली फसल बीमा योजना।',
    category: 'farmer_subsidy',
    issuing_department: 'Cooperative Department, Bihar',
    benefits_en: 'Financial compensation for crop damage at a fixed rate per hectare.',
    benefits_hi: 'प्रति हेक्टेयर निश्चित दर पर फसल के नुकसान के लिए वित्तीय मुआवजा।',
    official_link: 'https://pacsonline.bih.nic.in/fsy/',
    deadline: null,
    state: 'Bihar',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'lpc',
        name_en: 'Land Possession Certificate (LPC)',
        name_hi: 'भूमि कब्जा प्रमाण पत्र (एलपीसी)',
        helper_text_en: 'Proof of land ownership or farming.',
        helper_text_hi: 'भूमि स्वामित्व या खेती का प्रमाण।',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'crop_sowing_cert',
        name_en: 'Crop Sowing Certificate',
        name_hi: 'फसल बुवाई प्रमाण पत्र',
        helper_text_en: 'Certificate of crop sowing verified by Panchayat/Kisan Advisor.',
        helper_text_hi: 'पंचायत/किसान सलाहकार द्वारा सत्यापित फसल बुवाई का प्रमाण पत्र।',
        issuing_authority: 'Panchayat / Agriculture Dept'
      }
    ]
  }
];

export const BIHAR_ELIGIBILITY_RULES = [
  {
    id: 'rule-br-kanya-gender',
    scheme_id: 'br-mukhyamantri-kanya-utthan',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'This scheme empowers female students who have completed graduation.',
    match_reason_hi: 'यह योजना उन छात्राओं को सशक्त बनाती है जिन्होंने स्नातक पूरा कर लिया है।'
  },
  {
    id: 'rule-br-kabir-income',
    scheme_id: 'br-kabir-antyeshti',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L'],
    match_reason_en: 'BPL families are eligible for funeral assistance.',
    match_reason_hi: 'बीपीएल परिवार अंतिम संस्कार सहायता के लिए पात्र हैं।'
  },
  {
    id: 'rule-br-cycle-edu',
    scheme_id: 'br-bicycle-scheme',
    field: 'education_level',
    operator: 'in',
    value: ['Class 9'],
    match_reason_en: 'Students enrolled in Class 9 are eligible for the cycle scheme.',
    match_reason_hi: 'कक्षा 9 में नामांकित छात्र साइकिल योजना के लिए पात्र हैं।'
  },
  {
    id: 'rule-br-credit-edu',
    scheme_id: 'br-student-credit-card',
    field: 'education_level',
    operator: 'in',
    value: ['Undergraduate (BA/BSc/BCom/BTech)', 'Postgraduate (MA/MSc/MBA/MTech)', 'Diploma / ITI'],
    match_reason_en: 'You can avail a student credit card loan for higher education.',
    match_reason_hi: 'आप उच्च शिक्षा के लिए स्टूडेंट क्रेडिट कार्ड ऋण का लाभ उठा सकते हैं।'
  },
  {
    id: 'rule-br-pension-age',
    scheme_id: 'br-mukhyamantri-vriddhavastha',
    field: 'age',
    operator: 'greater_than_or_equal',
    value: 60,
    match_reason_en: 'Senior citizens above 60 years are eligible for old age pension.',
    match_reason_hi: '60 वर्ष से अधिक आयु के वरिष्ठ नागरिक वृद्धावस्था पेंशन के पात्र हैं।'
  },
  {
    id: 'rule-br-bijli-income',
    scheme_id: 'br-saur-kranti',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L'],
    match_reason_en: 'BPL households are eligible for a free electricity connection.',
    match_reason_hi: 'बीपीएल परिवार मुफ्त बिजली कनेक्शन के लिए पात्र हैं।'
  },
  {
    id: 'rule-br-fasal-occ',
    scheme_id: 'br-fasal-sahayata',
    field: 'occupation',
    operator: 'in',
    value: ['Farmer / Agriculturist'],
    match_reason_en: 'Farmers are eligible for crop damage compensation.',
    match_reason_hi: 'किसान फसल नुकसान मुआवजे के लिए पात्र हैं।'
  }
];

export const BIHAR_RAG_DOCUMENTS = [];
