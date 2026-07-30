export const RAJASTHAN_SCHEMES = [
  {
    id: 'rj-chiranjeevi-swasthya',
    name_en: 'CM Chiranjeevi Swasthya Bima Yojana',
    name_hi: 'मुख्यमंत्री चिरंजीवी स्वास्थ्य बीमा योजना',
    description_en: 'Universal health insurance scheme providing cashless treatment up to ₹10 lakh per family per year in empaneled hospitals.',
    description_hi: 'सूचीबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹10 लाख तक का मुफ्त इलाज प्रदान करने वाली सार्वभौमिक स्वास्थ्य बीमा योजना।',
    category: 'healthcare',
    issuing_department: 'Medical and Health Department, Rajasthan',
    benefits_en: 'Cashless health insurance coverage up to ₹10 lakh for major diseases and hospitalization.',
    benefits_hi: 'गंभीर बीमारियों और अस्पताल में भर्ती होने के लिए ₹10 लाख तक का कैशलेस स्वास्थ्य बीमा कवर।',
    official_link: 'https://chiranjeevi.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'jan_aadhaar',
        name_en: 'Jan Aadhaar Card',
        name_hi: 'जन आधार कार्ड',
        helper_text_en: 'Primary family identity document in Rajasthan.',
        helper_text_hi: 'राजस्थान में प्राथमिक परिवार पहचान दस्तावेज।',
        issuing_authority: 'Govt. of Rajasthan'
      }
    ]
  },
  {
    id: 'rj-palanhar',
    name_en: 'Palanhar Yojana',
    name_hi: 'पालनहार योजना',
    description_en: 'Financial assistance for the care, upbringing, and education of orphaned or vulnerable children through a guardian (Palanhar).',
    description_hi: 'अनाथ या कमजोर बच्चों की देखभाल, पालन-पोषण और शिक्षा के लिए एक अभिभावक (पालनहार) के माध्यम से वित्तीय सहायता।',
    category: 'child_welfare',
    issuing_department: 'Social Justice and Empowerment Department, Rajasthan',
    benefits_en: '₹1,500/month per child (depending on age) along with an annual grant for clothes/shoes.',
    benefits_hi: 'प्रति बच्चा ₹1,500/माह (आयु के आधार पर) और कपड़े/जूते के लिए वार्षिक अनुदान।',
    official_link: 'https://sje.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'orphan_proof',
        name_en: 'Parents Death Certificate',
        name_hi: 'माता-पिता का मृत्यु प्रमाण पत्र',
        helper_text_en: 'Proof of the child being orphaned.',
        helper_text_hi: 'बच्चे के अनाथ होने का प्रमाण।',
        issuing_authority: 'Municipal Corporation / Panchayat'
      },
      {
        key: 'school_cert',
        name_en: 'School Study Certificate',
        name_hi: 'स्कूल अध्ययन प्रमाण पत्र',
        helper_text_en: 'Proof that the child goes to school/anganwadi.',
        helper_text_hi: 'बच्चे के स्कूल/आंगनवाड़ी जाने का प्रमाण।',
        issuing_authority: 'School Principal'
      }
    ]
  },
  {
    id: 'rj-mukhyamantri-rajshri',
    name_en: 'Mukhyamantri Rajshri Yojana',
    name_hi: 'मुख्यमंत्री राजश्री योजना',
    description_en: 'Scheme promoting the birth and education of girls by providing financial assistance in stages.',
    description_hi: 'चरणबद्ध तरीके से वित्तीय सहायता प्रदान करके लड़कियों के जन्म और शिक्षा को बढ़ावा देने वाली योजना।',
    category: 'womens_welfare',
    issuing_department: 'Women and Child Development Department, Rajasthan',
    benefits_en: '₹50,000 provided to the girl child in 6 installments from birth till Class 12.',
    benefits_hi: 'जन्म से लेकर 12वीं कक्षा तक 6 किस्तों में बालिका को ₹50,000 प्रदान किए जाते हैं।',
    official_link: 'https://wcd.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'bhamashah_jan_aadhaar',
        name_en: 'Jan Aadhaar Card',
        name_hi: 'जन आधार कार्ड',
        helper_text_en: 'Linked mother/family account.',
        helper_text_hi: 'लिंक्ड माता/परिवार खाता।',
        issuing_authority: 'Govt. of Rajasthan'
      },
      {
        key: 'birth_cert',
        name_en: 'Birth Certificate',
        name_hi: 'जन्म प्रमाण पत्र',
        helper_text_en: 'Birth certificate from a Govt hospital.',
        helper_text_hi: 'सरकारी अस्पताल से जन्म प्रमाण पत्र।',
        issuing_authority: 'Hospital / Municipality'
      }
    ]
  },
  {
    id: 'rj-bhamashah-crop-insurance',
    name_en: 'Rajasthan Fasal Bima',
    name_hi: 'राजस्थान फसल बीमा योजना',
    description_en: 'Crop insurance for farmers against natural calamities, pests, and diseases under PMFBY.',
    description_hi: 'पीएमएफबीवाई के तहत प्राकृतिक आपदाओं, कीटों और बीमारियों से बचाव के लिए किसानों का फसल बीमा।',
    category: 'farmer_subsidy',
    issuing_department: 'Agriculture Department, Rajasthan',
    benefits_en: 'Financial cover and compensation for crop failure.',
    benefits_hi: 'फसल खराब होने पर वित्तीय कवर और मुआवजा।',
    official_link: 'https://agriculture.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'jamabandi',
        name_en: 'Jamabandi / Land Records',
        name_hi: 'जमाबंदी / भूमि रिकॉर्ड',
        helper_text_en: 'Proof of land ownership.',
        helper_text_hi: 'भूमि स्वामित्व का प्रमाण।',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'sowing_cert',
        name_en: 'Crop Sowing Proof',
        name_hi: 'फसल बुवाई प्रमाण',
        helper_text_en: 'Document verifying crop sowing.',
        helper_text_hi: 'फसल बुवाई की पुष्टि करने वाला दस्तावेज़।',
        issuing_authority: 'Patwari / Agriculture Dept'
      }
    ]
  },
  {
    id: 'rj-indira-gandhi-shahri-employment',
    name_en: 'Indira Gandhi Shahri Rozgar Guarantee',
    name_hi: 'इंदिरा गांधी शहरी रोजगार गारंटी योजना',
    description_en: 'Urban employment guarantee scheme offering 100 days of guaranteed wage employment to urban families.',
    description_hi: 'शहरी परिवारों को 100 दिनों के गारंटीशुदा मजदूरी रोजगार की पेशकश करने वाली शहरी रोजगार गारंटी योजना।',
    category: 'employment',
    issuing_department: 'Local Self Government Department, Rajasthan',
    benefits_en: '100 days of assured employment per year for urban households.',
    benefits_hi: 'शहरी परिवारों के लिए प्रति वर्ष 100 दिनों का सुनिश्चित रोजगार।',
    official_link: 'https://lsg.urban.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'jan_aadhaar',
        name_en: 'Jan Aadhaar Card',
        name_hi: 'जन आधार कार्ड',
        helper_text_en: 'Must have a valid Jan Aadhaar card.',
        helper_text_hi: 'एक वैध जन आधार कार्ड होना चाहिए।',
        issuing_authority: 'Govt. of Rajasthan'
      },
      {
        key: 'job_card',
        name_en: 'Urban Job Card',
        name_hi: 'शहरी जॉब कार्ड',
        helper_text_en: 'Job card issued by urban local body.',
        helper_text_hi: 'शहरी स्थानीय निकाय द्वारा जारी जॉब कार्ड।',
        issuing_authority: 'Urban Local Body'
      }
    ]
  },
  {
    id: 'rj-free-tablet-scheme',
    name_en: 'Free Tablet/Smartphone for Students',
    name_hi: 'छात्रों के लिए मुफ्त टैबलेट/स्मार्टफोन योजना',
    description_en: 'Free tablets or smartphones distributed to meritorious students in class 8, 10, and 12 of government schools.',
    description_hi: 'सरकारी स्कूलों के कक्षा 8, 10 और 12 के मेधावी छात्रों को मुफ्त टैबलेट या स्मार्टफोन वितरित किए जाते हैं।',
    category: 'education',
    issuing_department: 'Education Department, Rajasthan',
    benefits_en: 'Free digital device with internet connectivity to aid digital learning.',
    benefits_hi: 'डिजिटल शिक्षा में सहायता के लिए इंटरनेट कनेक्टिविटी के साथ मुफ्त डिजिटल उपकरण।',
    official_link: 'https://education.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'marksheet',
        name_en: 'Board Marksheet',
        name_hi: 'बोर्ड की मार्कशीट',
        helper_text_en: 'Proof of securing required marks.',
        helper_text_hi: 'आवश्यक अंक प्राप्त करने का प्रमाण।',
        issuing_authority: 'Board of Secondary Education Rajasthan'
      },
      {
        key: 'school_id',
        name_en: 'Govt School ID',
        name_hi: 'सरकारी स्कूल आईडी',
        helper_text_en: 'Proof of studying in a state govt school.',
        helper_text_hi: 'राज्य के सरकारी स्कूल में पढ़ने का प्रमाण।',
        issuing_authority: 'School Principal'
      }
    ]
  },
  {
    id: 'rj-samajik-suraksha-pension',
    name_en: 'Samajik Suraksha Pension',
    name_hi: 'सामाजिक सुरक्षा पेंशन',
    description_en: 'A unified social security pension scheme combining benefits for the elderly, widows, and specially-abled individuals.',
    description_hi: 'बुजुर्गों, विधवाओं और विशेष रूप से विकलांग व्यक्तियों के लिए लाभों को मिलाने वाली एक एकीकृत सामाजिक सुरक्षा पेंशन योजना।',
    category: 'pension',
    issuing_department: 'Social Justice and Empowerment Department, Rajasthan',
    benefits_en: 'Monthly pension of ₹1,000 to eligible vulnerable groups.',
    benefits_hi: 'पात्र कमजोर समूहों को ₹1,000 की मासिक पेंशन।',
    official_link: 'https://ssp.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'jan_aadhaar',
        name_en: 'Jan Aadhaar Card',
        name_hi: 'जन आधार कार्ड',
        helper_text_en: 'Required for all DBTs in Rajasthan.',
        helper_text_hi: 'राजस्थान में सभी डीबीटी के लिए आवश्यक।',
        issuing_authority: 'Govt. of Rajasthan'
      },
      {
        key: 'eligibility_proof',
        name_en: 'Age/Widow/Disability Proof',
        name_hi: 'आयु/विधवा/विकलांगता प्रमाण',
        helper_text_en: 'Document justifying the pension category.',
        helper_text_hi: 'पेंशन श्रेणी को उचित ठहराने वाला दस्तावेज़।',
        issuing_authority: 'Relevant Competent Authority'
      }
    ]
  },
  {
    id: 'rj-ambedkar-dbt-vochour',
    name_en: 'Ambedkar DBT Voucher',
    name_hi: 'अम्बेडकर डीबीटी वाउचर योजना',
    description_en: 'Direct benefit transfer for college students staying away from home for residential/hostel allowance.',
    description_hi: 'आवासीय/हॉस्टल भत्ते के लिए घर से दूर रहने वाले कॉलेज के छात्रों के लिए प्रत्यक्ष लाभ हस्तांतरण।',
    category: 'scholarship',
    issuing_department: 'Social Justice and Empowerment Department, Rajasthan',
    benefits_en: '₹2,000/month as hostel or residential allowance for SC/ST/OBC/MBC students.',
    benefits_hi: 'एससी/एसटी/ओबीसी/एमबीसी छात्रों के लिए हॉस्टल या आवासीय भत्ते के रूप में ₹2,000/माह।',
    official_link: 'https://sje.rajasthan.gov.in/',
    deadline: null,
    state: 'Rajasthan',
    last_verified_at: '2026-07-25',
    required_documents: [
      {
        key: 'caste_cert',
        name_en: 'Caste Certificate',
        name_hi: 'जाति प्रमाण पत्र',
        helper_text_en: 'Proof of SC/ST/OBC category.',
        helper_text_hi: 'एससी/एसटी/ओबीसी श्रेणी का प्रमाण।',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'rent_agreement',
        name_en: 'Rent Agreement / Hostel Receipt',
        name_hi: 'किराया समझौता / हॉस्टल रसीद',
        helper_text_en: 'Proof of staying in a rented accommodation/hostel.',
        helper_text_hi: 'किराए के आवास/हॉस्टल में रहने का प्रमाण।',
        issuing_authority: 'Landlord / Hostel Warden'
      }
    ]
  }
];

export const RAJASTHAN_ELIGIBILITY_RULES = [
  {
    id: 'rule-rj-chiranjeevi-income',
    scheme_id: 'rj-chiranjeevi-swasthya',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L', '2L_5L', '5L_10L', 'above_10L'],
    match_reason_en: 'Universal scheme covering families in Rajasthan for health insurance.',
    match_reason_hi: 'राजस्थान में स्वास्थ्य बीमा के लिए परिवारों को कवर करने वाली सार्वभौमिक योजना।'
  },
  {
    id: 'rule-rj-palanhar-age',
    scheme_id: 'rj-palanhar',
    field: 'age',
    operator: 'less_than',
    value: 18,
    match_reason_en: 'Orphaned or vulnerable children below 18 years are eligible.',
    match_reason_hi: '18 वर्ष से कम आयु के अनाथ या कमजोर बच्चे पात्र हैं।'
  },
  {
    id: 'rule-rj-rajshri-gender',
    scheme_id: 'rj-mukhyamantri-rajshri',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'The Rajshri scheme provides installments for girl child education and upbringing.',
    match_reason_hi: 'राजश्री योजना बालिका की शिक्षा और पालन-पोषण के लिए किस्तें प्रदान करती है।'
  },
  {
    id: 'rule-rj-fasal-occ',
    scheme_id: 'rj-bhamashah-crop-insurance',
    field: 'occupation',
    operator: 'in',
    value: ['Farmer / Agriculturist'],
    match_reason_en: 'Farmers can avail crop insurance against natural calamities.',
    match_reason_hi: 'किसान प्राकृतिक आपदाओं के खिलाफ फसल बीमा का लाभ उठा सकते हैं।'
  },
  {
    id: 'rule-rj-rozgar-occ',
    scheme_id: 'rj-indira-gandhi-shahri-employment',
    field: 'occupation',
    operator: 'in',
    value: ['Unemployed', 'Laborer', 'Daily Wage Worker'],
    match_reason_en: 'Urban families looking for work are eligible for 100 days employment.',
    match_reason_hi: 'काम की तलाश कर रहे शहरी परिवार 100 दिनों के रोजगार के पात्र हैं।'
  },
  {
    id: 'rule-rj-tablet-edu',
    scheme_id: 'rj-free-tablet-scheme',
    field: 'education_level',
    operator: 'in',
    value: ['Class 8', 'Class 10', 'Class 12'],
    match_reason_en: 'Meritorious students of Class 8, 10, or 12 are eligible for free tablets.',
    match_reason_hi: 'कक्षा 8, 10 या 12 के मेधावी छात्र मुफ्त टैबलेट के पात्र हैं।'
  },
  {
    id: 'rule-rj-pension-age',
    scheme_id: 'rj-samajik-suraksha-pension',
    field: 'age',
    operator: 'greater_than_or_equal',
    value: 55,
    match_reason_en: 'You qualify for the social security pension based on age criteria.',
    match_reason_hi: 'आप आयु मानदंडों के आधार पर सामाजिक सुरक्षा पेंशन के लिए योग्य हैं।'
  },
  {
    id: 'rule-rj-voucher-cat',
    scheme_id: 'rj-ambedkar-dbt-vochour',
    field: 'social_category',
    operator: 'in',
    value: ['SC', 'ST', 'OBC'],
    match_reason_en: 'Reserved category students studying away from home qualify for DBT voucher.',
    match_reason_hi: 'घर से दूर पढ़ने वाले आरक्षित वर्ग के छात्र डीबीटी वाउचर के पात्र हैं।'
  }
];

export const RAJASTHAN_RAG_DOCUMENTS = [];
