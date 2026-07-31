export const KARNATAKA_SCHEMES = [
  {
    id: 'ka-post-matric-scholarship',
    name_en: 'SC/ST Post-Matric Scholarship',
    name_hi: 'एससी/एसटी पोस्ट-मैट्रिक छात्रवृत्ति',
    name_kn: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ / ಪರಿಶಿಷ್ಟ ಪಂಗಡ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ',
    description_en: 'Financial assistance for SC/ST students studying in post-matriculation courses.',
    description_hi: 'पोस्ट-मैट्रिकुलेशन पाठ्यक्रमों में अध्ययनरत एससी/एसटी छात्रों के लिए वित्तीय सहायता।',
    description_kn: 'ಮೆಟ್ರಿಕ್ ನಂತರದ ಕೋರ್ಸ್‌ಗಳಲ್ಲಿ ಓದುತ್ತಿರುವ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆರ್ಥಿಕ ನೆರವು.',
    category: 'scholarship',
    issuing_department: 'Department of Social Welfare',
    benefits_en: 'Reimbursement of compulsory non-refundable fees.',
    benefits_hi: 'अनिवार्य गैर-वापसी योग्य शुल्क की प्रतिपूर्ति।',
    benefits_kn: 'ಕಡ್ಡಾಯ ಮರುಪಾವತಿಸಲಾಗದ ಶುಲ್ಕಗಳ ಮರುಪಾವತಿ.',
    official_link: 'https://ssp.postmatric.karnataka.gov.in/',
    deadline: '2026-12-31',
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'caste_cert',
        name_en: 'Caste Certificate',
        name_hi: 'जाति प्रमाण पत्र',
        name_kn: 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ',
        helper_text_en: 'Issued by Tahsildar.',
        helper_text_hi: 'तहसीलदार द्वारा जारी।',
        helper_text_kn: 'ತಹಶೀಲ್ದಾರ್ ನೀಡಿದ ಪ್ರಮಾಣಪತ್ರ.',
        issuing_authority: 'Revenue Department'
      }
    ]
  },
  {
    id: 'ka-krishi-bhagya',
    name_en: 'Krishi Bhagya Scheme',
    name_hi: 'कृषि भाग्य योजना',
    name_kn: 'ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ',
    description_en: 'Promotes rainwater harvesting and efficient water management for agriculture.',
    description_hi: 'कृषि के लिए वर्षा जल संचयन और कुशल जल प्रबंधन को बढ़ावा देता है।',
    description_kn: 'ಕೃಷಿಗಾಗಿ ಮಳೆನೀರು ಕೊಯ್ಲು ಮತ್ತು ಸಮರ್ಥ ನೀರಿನ ನಿರ್ವಹಣೆಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ.',
    category: 'farmer_subsidy',
    issuing_department: 'Department of Agriculture',
    benefits_en: 'Subsidies for krishi honda (farm ponds), pumps, and micro-irrigation.',
    benefits_hi: 'कृषि होंडा (खेत तालाब), पंप और सूक्ष्म सिंचाई के लिए सब्सिडी।',
    benefits_kn: 'ಕೃಷಿ ಹೊಂಡ, ಪಂಪ್‌ಗಳು ಮತ್ತು ಸೂಕ್ಷ್ಮ ನೀರಾವರಿಗಾಗಿ ಸಬ್ಸಿಡಿಗಳು.',
    official_link: 'https://raitamitra.karnataka.gov.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'rtc_doc',
        name_en: 'RTC (Pahani)',
        name_hi: 'आरटीसी (पहाणी)',
        name_kn: 'ಆರ್.ಟಿ.ಸಿ (ಪಹಣಿ)',
        helper_text_en: 'Record of Rights, Tenancy and Crops.',
        helper_text_hi: 'अधिकार, किरायेदारी और फसलों का रिकॉर्ड।',
        helper_text_kn: 'ಹಕ್ಕುಗಳ ದಾಖಲೆ, ಗೇಣಿದಾರಿಕೆ ಮತ್ತು ಬೆಳೆಗಳು.',
        issuing_authority: 'Revenue Department'
      }
    ]
  },
  {
    id: 'ka-gruha-lakshmi',
    name_en: 'Gruha Lakshmi Scheme',
    name_hi: 'गृह लक्ष्मी योजना',
    name_kn: 'ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ',
    description_en: 'Financial assistance to women head of households in Karnataka.',
    description_hi: 'कर्नाटक में महिला मुखियाओं को वित्तीय सहायता।',
    description_kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಮನೆಯೊಡತಿಯರಿಗೆ ಆರ್ಥಿಕ ನೆರವು.',
    category: 'womens_welfare',
    issuing_department: 'Women and Child Development Department',
    benefits_en: 'Monthly DBT of ₹2000.',
    benefits_hi: '₹2000 का मासिक डीबीटी।',
    benefits_kn: 'ತಿಂಗಳಿಗೆ ₹2000 ಡಿಬಿಟಿ (DBT).',
    official_link: 'https://sevasindhugs.karnataka.gov.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'ration_card',
        name_en: 'Ration Card',
        name_hi: 'राशन कार्ड',
        name_kn: 'ಪಡಿತರ ಚೀಟಿ',
        helper_text_en: 'BPL/APL card showing woman as head.',
        helper_text_hi: 'बीपीएल/एपीएल कार्ड महिला को मुखिया के रूप में दर्शाता है।',
        helper_text_kn: 'ಮಹಿಳೆಯನ್ನು ಮುಖ್ಯಸ್ಥರನ್ನಾಗಿ ತೋರಿಸುವ ಬಿಪಿಎಲ್/ಎಪಿಎಲ್ ಕಾರ್ಡ್.',
        issuing_authority: 'Food & Civil Supplies Department'
      }
    ]
  },
  {
    id: 'ka-anna-bhagya',
    name_en: 'Anna Bhagya Scheme',
    name_hi: 'अन्ना भाग्य योजना',
    name_kn: 'ಅನ್ನ ಭಾಗ್ಯ ಯೋಜನೆ',
    description_en: 'Provides free food grains to BPL families.',
    description_hi: 'बीपीएल परिवारों को मुफ्त खाद्यान्न प्रदान करता है।',
    description_kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬಗಳಿಗೆ ಉಚಿತ ಆಹಾರ ಧಾನ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    category: 'welfare',
    issuing_department: 'Food, Civil Supplies & Consumer Affairs',
    benefits_en: '10kg of rice per person per month for BPL card holders.',
    benefits_hi: 'बीपीएल कार्ड धारकों के लिए प्रति व्यक्ति प्रति माह 10 किलो चावल।',
    benefits_kn: 'ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ದಾರರಿಗೆ ತಲಾ 10 ಕೆಜಿ ಅಕ್ಕಿ ಉಚಿತ.',
    official_link: 'https://ahara.kar.nic.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'ration_card',
        name_en: 'BPL Ration Card',
        name_hi: 'बीपीएल राशन कार्ड',
        name_kn: 'ಬಿಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ',
        helper_text_en: 'Priority Household (PHH) or Antyodaya Anna Yojana (AAY) card.',
        helper_text_hi: 'प्राथमिकता वाले परिवार (पीएचएच) या अंत्योदय अन्न योजना (एएवाई) कार्ड।',
        helper_text_kn: 'ಆದ್ಯತಾ ಕುಟುಂಬ (PHH) ಅಥವಾ ಅಂತ್ಯೋದಯ ಅನ್ನ ಯೋಜನೆ (AAY) ಕಾರ್ಡ್.',
        issuing_authority: 'Food & Civil Supplies Department'
      }
    ]
  },
  {
    id: 'ka-ksrtc-bus-pass',
    name_en: 'Free/Concessional KSRTC Bus Pass',
    name_hi: 'मुफ्त/रियायती केएसआरटीसी बस पास',
    name_kn: 'ಉಚಿತ/ರಿಯಾಯಿತಿ ದರದ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ಪಾಸ್',
    description_en: 'Free or concessional travel passes for students, women, and physically challenged persons.',
    description_hi: 'छात्रों, महिलाओं और विकलांग व्यक्तियों के लिए मुफ्त या रियायती यात्रा पास।',
    description_kn: 'ವಿದ್ಯಾರ್ಥಿಗಳು, ಮಹಿಳೆಯರು ಮತ್ತು ವಿಕಲಚೇತನರಿಗೆ ಉಚಿತ ಅಥವಾ ರಿಯಾಯಿತಿ ದರದ ಪ್ರಯಾಣ ಪಾಸ್‌ಗಳು.',
    category: 'welfare',
    issuing_department: 'KSRTC',
    benefits_en: 'Subsidized or free travel on state transport buses (e.g., Shakti scheme for women).',
    benefits_hi: 'राज्य परिवहन बसों में सब्सिडी वाली या मुफ्त यात्रा (उदा., महिलाओं के लिए शक्ति योजना)।',
    benefits_kn: 'ರಾಜ್ಯ ಸಾರಿಗೆ ಬಸ್‌ಗಳಲ್ಲಿ ಉಚಿತ ಅಥವಾ ರಿಯಾಯಿತಿ ಪ್ರಯಾಣ (ಉದಾ., ಮಹಿಳೆಯರಿಗೆ ಶಕ್ತಿ ಯೋಜನೆ).',
    official_link: 'https://ksrtc.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'id_card',
        name_en: 'Government ID',
        name_hi: 'सरकारी पहचान पत्र',
        name_kn: 'ಸರ್ಕಾರಿ ಗುರುತಿನ ಚೀಟಿ',
        helper_text_en: 'Aadhaar, Voter ID, or Student ID.',
        helper_text_hi: 'आधार, वोटर आईडी या छात्र पहचान पत्र।',
        helper_text_kn: 'ಆಧಾರ್, ವೋಟರ್ ಐಡಿ ಅಥವಾ ವಿದ್ಯಾರ್ಥಿ ಗುರುತಿನ ಚೀಟಿ.',
        issuing_authority: 'Govt of India/Karnataka'
      }
    ]
  },
  {
    id: 'ka-udyoga-mitra',
    name_en: 'Karnataka Udyoga Mitra Scheme',
    name_hi: 'कर्नाटक उद्योग मित्र योजना',
    name_kn: 'ಕರ್ನಾಟಕ ಉದ್ಯೋಗ ಮಿತ್ರ ಯೋಜನೆ',
    description_en: 'Provides skill training and facilitation for youth employment.',
    description_hi: 'युवा रोजगार के लिए कौशल प्रशिक्षण और सुविधा प्रदान करता है।',
    description_kn: 'ಯುವಜನರ ಉದ್ಯೋಗಕ್ಕಾಗಿ ಕೌಶಲ್ಯ ತರಬೇತಿ ಮತ್ತು ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    category: 'startup_funding',
    issuing_department: 'Department of Industries and Commerce',
    benefits_en: 'Training and placement assistance.',
    benefits_hi: 'प्रशिक्षण और प्लेसमेंट सहायता।',
    benefits_kn: 'ತರಬೇತಿ ಮತ್ತು ಉದ್ಯೋಗ ನಿಯೋಜನೆ ನೆರವು.',
    official_link: 'https://kum.karnataka.gov.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'edu_cert',
        name_en: 'Educational Certificates',
        name_hi: 'शैक्षिक प्रमाण पत्र',
        name_kn: 'ಶೈಕ್ಷಣಿಕ ಪ್ರಮಾಣಪತ್ರಗಳು',
        helper_text_en: 'Proof of highest qualification.',
        helper_text_hi: 'उच्चतम योग्यता का प्रमाण।',
        helper_text_kn: 'ಗರಿಷ್ಠ ವಿದ್ಯಾರ್ಹತೆಯ ಪುರಾವೆ.',
        issuing_authority: 'Educational Boards/Universities'
      }
    ]
  },
  {
    id: 'ka-rajiv-yuva-vikasa',
    name_en: 'Rajiv Gandhi Yuva Vikasa Scheme',
    name_hi: 'राजीव गांधी युवा विकास योजना',
    name_kn: 'ರಾಜೀವ್ ಗಾಂಧಿ ಯುವ ವಿಕಾಸ ಯೋಜನೆ',
    description_en: 'Offers loan subsidies for SC/ST entrepreneurs for self-employment.',
    description_hi: 'स्वरोजगार के लिए एससी/एसटी उद्यमियों के लिए ऋण सब्सिडी प्रदान करता है।',
    description_kn: 'ಸ್ವಯಂ ಉದ್ಯೋಗಕ್ಕಾಗಿ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಉದ್ಯಮಿಗಳಿಗೆ ಸಾಲದ ಸಬ್ಸಿಡಿ ನೀಡುತ್ತದೆ.',
    category: 'startup_funding',
    issuing_department: 'Dr. B.R. Ambedkar Development Corporation',
    benefits_en: 'Margin money and interest subsidy on business loans.',
    benefits_hi: 'व्यावसायिक ऋणों पर मार्जिन मनी और ब्याज सब्सिडी।',
    benefits_kn: 'ವ್ಯಾಪಾರ ಸಾಲಗಳ ಮೇಲಿನ ಮಾರ್ಜಿನ್ ಹಣ ಮತ್ತು ಬಡ್ಡಿ ಸಬ್ಸಿಡಿ.',
    official_link: 'https://adcl.karnataka.gov.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'caste_cert',
        name_en: 'SC/ST Certificate',
        name_hi: 'एससी/एसटी प्रमाण पत्र',
        name_kn: 'ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಪ್ರಮಾಣಪತ್ರ',
        helper_text_en: 'Caste proof.',
        helper_text_hi: 'जाति प्रमाण।',
        helper_text_kn: 'ಜಾತಿ ಪುರಾವೆ.',
        issuing_authority: 'Revenue Department'
      }
    ]
  },
  {
    id: 'ka-shrama-shakti',
    name_en: 'Shrama Shakti Loan Scheme',
    name_hi: 'श्रम शक्ति ऋण योजना',
    name_kn: 'ಶ್ರಮ ಶಕ್ತಿ ಸಾಲ ಯೋಜನೆ',
    description_en: 'Financial assistance and skill training for unorganized women workers.',
    description_hi: 'असंगठित महिला श्रमिकों के लिए वित्तीय सहायता और कौशल प्रशिक्षण।',
    description_kn: 'ಅಸಂಘಟಿತ ಮಹಿಳಾ ಕಾರ್ಮಿಕರಿಗೆ ಆರ್ಥಿಕ ನೆರವು ಮತ್ತು ಕೌಶಲ್ಯ ತರಬೇತಿ.',
    category: 'womens_welfare',
    issuing_department: 'Karnataka State Women Development Corporation',
    benefits_en: 'Low-interest loans to start small businesses.',
    benefits_hi: 'छोटे व्यवसाय शुरू करने के लिए कम ब्याज वाले ऋण।',
    benefits_kn: 'ಸಣ್ಣ ವ್ಯಾಪಾರಗಳನ್ನು ಪ್ರಾರಂಭಿಸಲು ಕಡಿಮೆ ಬಡ್ಡಿಯ ಸಾಲಗಳು.',
    official_link: 'https://kswdc.karnataka.gov.in/',
    deadline: null,
    state: 'Karnataka',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'income_cert',
        name_en: 'Income Certificate',
        name_hi: 'आय प्रमाण पत्र',
        name_kn: 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ',
        helper_text_en: 'Proof of belonging to low-income group.',
        helper_text_hi: 'कम आय वर्ग से संबंधित होने का प्रमाण।',
        helper_text_kn: 'ಕಡಿಮೆ ಆದಾಯದ ಗುಂಪಿಗೆ ಸೇರಿದ ಪುರಾವೆ.',
        issuing_authority: 'Revenue Department'
      }
    ]
  }
];

export const KARNATAKA_ELIGIBILITY_RULES = [
  {
    id: 'rule-ka-post-matric',
    scheme_id: 'ka-post-matric-scholarship',
    field: 'social_category',
    operator: 'in',
    value: ['SC', 'ST'],
    match_reason_en: 'Your category is eligible for SC/ST post-matric scholarships.',
    match_reason_hi: 'आपकी श्रेणी एससी/एसटी पोस्ट-मैट्रिक छात्रवृत्ति के लिए पात्र है।',
    match_reason_kn: 'ನಿಮ್ಮ ವರ್ಗವು ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಹವಾಗಿದೆ.'
  },
  {
    id: 'rule-ka-krishi',
    scheme_id: 'ka-krishi-bhagya',
    field: 'occupation',
    operator: 'in',
    value: ['Farmer / Agriculturist'],
    match_reason_en: 'Farmers are eligible for Krishi Bhagya.',
    match_reason_hi: 'किसान कृषि भाग्य के लिए पात्र हैं।',
    match_reason_kn: 'ರೈತರು ಕೃಷಿ ಭಾಗ್ಯಕ್ಕೆ ಅರ್ಹರಾಗಿದ್ದಾರೆ.'
  },
  {
    id: 'rule-ka-gruha',
    scheme_id: 'ka-gruha-lakshmi',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Women head of households are eligible for Gruha Lakshmi.',
    match_reason_hi: 'महिला मुखिया गृह लक्ष्मी के लिए पात्र हैं।',
    match_reason_kn: 'ಮನೆಯೊಡತಿಯರು ಗೃಹ ಲಕ್ಷ್ಮಿಗೆ ಅರ್ಹರು.'
  },
  {
    id: 'rule-ka-anna',
    scheme_id: 'ka-anna-bhagya',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L'],
    match_reason_en: 'BPL families are eligible for Anna Bhagya.',
    match_reason_hi: 'बीपीएल परिवार अन्ना भाग्य के लिए पात्र हैं।',
    match_reason_kn: 'ಬಿಪಿಎಲ್ ಕುಟುಂಬಗಳು ಅನ್ನ ಭಾಗ್ಯಕ್ಕೆ ಅರ್ಹವಾಗಿವೆ.'
  },
  {
    id: 'rule-ka-ksrtc',
    scheme_id: 'ka-ksrtc-bus-pass',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Women can avail free travel under Shakti scheme.',
    match_reason_hi: 'महिलाएं शक्ति योजना के तहत मुफ्त यात्रा का लाभ उठा सकती हैं।',
    match_reason_kn: 'ಮಹಿಳೆಯರು ಶಕ್ತಿ ಯೋಜನೆಯಡಿ ಉಚಿತ ಪ್ರಯಾಣ ಮಾಡಬಹುದು.'
  },
  {
    id: 'rule-ka-udyoga',
    scheme_id: 'ka-udyoga-mitra',
    field: 'age',
    operator: 'less_than_or_equal',
    value: 35,
    match_reason_en: 'Youth are eligible for skill training under this scheme.',
    match_reason_hi: 'युवा इस योजना के तहत कौशल प्रशिक्षण के लिए पात्र हैं।',
    match_reason_kn: 'ಯುವಜನರು ಈ ಯೋಜನೆಯಡಿ ಕೌಶಲ್ಯ ತರಬೇತಿಗೆ ಅರ್ಹರಾಗಿದ್ದಾರೆ.'
  },
  {
    id: 'rule-ka-rajiv-yuva',
    scheme_id: 'ka-rajiv-yuva-vikasa',
    field: 'social_category',
    operator: 'in',
    value: ['SC', 'ST'],
    match_reason_en: 'SC/ST candidates can apply for Rajiv Gandhi Yuva Vikasa.',
    match_reason_hi: 'एससी/एसटी उम्मीदवार राजीव गांधी युवा विकास के लिए आवेदन कर सकते हैं।',
    match_reason_kn: 'ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಅಭ್ಯರ್ಥಿಗಳು ರಾಜೀವ್ ಗಾಂಧಿ ಯುವ ವಿಕಾಸಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.'
  },
  {
    id: 'rule-ka-shrama',
    scheme_id: 'ka-shrama-shakti',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Women workers in unorganized sectors are eligible.',
    match_reason_hi: 'असंगठित क्षेत्रों में महिला कर्मचारी पात्र हैं।',
    match_reason_kn: 'ಅಸಂಘಟಿತ ವಲಯಗಳಲ್ಲಿನ ಮಹಿಳಾ ಕಾರ್ಮಿಕರು ಅರ್ಹರಾಗಿದ್ದಾರೆ.'
  }
];

export const KARNATAKA_RAG_DOCUMENTS = [
  {
    id: 'doc-ka-scholarship-clause-1',
    scheme_id: 'ka-post-matric-scholarship',
    clause_label: 'Karnataka SC/ST Scholarship — SSP Portal Income & Eligibility Rules',
    content: 'SC/ST students domiciled in Karnataka pursuing post-matric courses are eligible for fee reimbursement. Family annual income should not exceed ₹2,50,000. Applications are processed through the State Scholarship Portal (SSP). Students must maintain 75% attendance to be eligible for scholarship disbursement.',
    language: 'en',
    last_verified_at: '2026-07-01'
  },
  {
    id: 'doc-ka-krishibhagya-clause-1',
    scheme_id: 'ka-krishi-bhagya',
    clause_label: 'Krishi Bhagya Scheme — Farm Pond Subsidy & Eligibility',
    content: 'Karnataka Krishi Bhagya scheme provides 90% subsidy for construction of krishi honda (farm ponds) for dryland farmers with land holding up to 5 acres. Beneficiary must have own land with RTC record. Subsidy for drip and sprinkler irrigation up to 75% is also provided under the scheme through district-level agriculture offices.',
    language: 'en',
    last_verified_at: '2026-07-01'
  },
  {
    id: 'doc-ka-grihalakshmi-clause-1',
    scheme_id: 'ka-grihalakshmi',
    clause_label: 'Gruha Lakshmi Guarantee — ₹2,000 Monthly Support for Women Heads',
    content: 'Under Karnataka Gruha Lakshmi guarantee, the woman head of the family who is the ration card holder receives ₹2,000 per month directly into her bank account via DBT. Only one woman per household is eligible. The benefit is linked to the Seva Sindhu portal registration and Aadhaar-seeded bank account.',
    language: 'en',
    last_verified_at: '2026-07-01'
  }
];
