export const TELANGANA_SCHEMES = [
  {
    id: 'ts-epass-postmetric',
    name_en: 'Telangana ePASS Post-Matric Scholarship',
    name_hi: 'तेलंगाना ई-पास पोस्ट-मैट्रिक छात्रवृत्ति',
    name_te: 'తెలంగాణ ePASS పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్',
    description_en: 'Financial assistance for SC, ST, BC, EBC, and PwD students pursuing post-secondary education (Intermediate, Degree, PG, Engineering, Medicine). Covers tuition fee reimbursement and maintenance allowance.',
    description_hi: 'उच्च शिक्षा (इंटरमीडिएट, डिग्री, पीजी, इंजीनियरिंग, मेडिकल) प्राप्त करने वाले एससी, एसटी, बीसी, ईबीसी और दिव्यांग छात्रों के लिए वित्तीय सहायता। शिक्षण शुल्क प्रतिपूर्ति और रख-रखाव भत्ता शामिल है।',
    description_te: 'ఉన్నత విద్య (ఇంటర్మీడియట్, డిగ్రీ, పీజీ, ఇంజనీరింగ్, మెడిసిన్) అభ్యసించే ఎస్సీ, ఎస్టీ, బిసి, ఇబిసి మరియు దివ్యాంగ విద్యార్థులకు ఆర్థిక సహాయం. ట్విషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు నిర్వహణ అలవెన్స్ ఇస్తారు.',
    category: 'scholarship',
    issuing_department: 'Department of Social Welfare, Telangana',
    benefits_en: '100% Tuition Fee Reimbursement up to ₹1,50,000/yr + Monthly Maintenance Allowance of ₹1,200 to ₹1,800 for hostelers/day scholars.',
    benefits_hi: '100% शिक्षण शुल्क प्रतिपूर्ति (₹1,50,000/वर्ष तक) + ₹1,200 से ₹1,800 प्रतिमाह रखरखाव भत्ता।',
    benefits_te: '100% ట్విషన్ ఫీజు రీయింబర్స్‌మెంట్ (రూ. 1,50,000/సంవత్సరం వరకు) + రూ. 1,200 నుండి రూ. 1,800 నెలవారీ నిర్వహణ అలవెన్స్.',
    official_link: 'https://telanganaepass.cgg.gov.in/',
    deadline: '2026-11-30',
    state: 'Telangana',
    last_verified_at: '2026-07-01',
    required_documents: [
      {
        key: 'aadhaar_mock',
        name_en: 'Aadhaar Card (Demographic Verification)',
        name_hi: 'आधार कार्ड (जनसांख्यिकी सत्यापन)',
        name_te: 'ఆధార్ కార్డు (జనాభా ధృవీకరణ)',
        helper_text_en: 'Issued by UIDAI. Name must match SSC certificate.',
        helper_text_hi: 'यूआईडीएआई द्वारा जारी। नाम एसएससी प्रमाणपत्र से मेल खाना चाहिए।',
        helper_text_te: 'యుఐడిఎఐ ద్వారా జారీ చేయబడింది. పేరు ఎస్‌ఎస్‌సి సర్టిఫికేట్‌తో సరిపోలాలి.',
        issuing_authority: 'UIDAI'
      },
      {
        key: 'caste_cert',
        name_en: 'Caste Certificate (MeeSeva / C-DAC)',
        name_hi: 'जाति प्रमाण पत्र (मीसेवा)',
        name_te: 'కుల ధృవీకరణ పత్రం (మీసేవ)',
        helper_text_en: 'Barcoded permanent caste certificate issued by Tahsildar.',
        helper_text_hi: 'तहसीलदार द्वारा जारी बारकोडेड स्थायी जाति प्रमाण पत्र।',
        helper_text_te: 'తహశీల్దార్ జారీ చేసిన బార్‌కోడ్ కుల సర్టిఫికేట్.',
        issuing_authority: 'Revenue Dept (Tahsildar)'
      },
      {
        key: 'income_cert',
        name_en: 'Latest Income Certificate',
        name_hi: 'नवीनतम आय प्रमाण पत्र',
        name_te: 'తాజా ఆదాయ ధృవీకరణ పత్రం',
        helper_text_en: 'Income certificate issued after April 1st of current financial year.',
        helper_text_hi: 'चालू वित्तीय वर्ष की 1 अप्रैल के बाद जारी आय प्रमाण पत्र।',
        helper_text_te: 'ప్రస్తుత ఆర్థిక సంవత్సరం ఏప్రిల్ 1 తర్వాత జారీ చేసిన ఆదాయ సర్టిఫికేట్.',
        issuing_authority: 'Tahsildar'
      },
      {
        key: 'bonafide_cert',
        name_en: 'College Study / Bonafide Certificate',
        name_hi: 'कॉलेज अध्ययन / बोनाफाइड प्रमाण पत्र',
        name_te: 'కళాశాల స్టడీ / బోనాఫైడ్ సర్టిఫికేట్',
        helper_text_en: 'Issued by College Principal indicating current academic course and year.',
        helper_text_hi: 'वर्तमान शैक्षणिक पाठ्यक्रम और वर्ष दर्शाते हुए कॉलेज के प्राचार्य द्वारा जारी।',
        helper_text_te: 'ప్రస్తుత కోర్సు మరియు సంవత్సరాన్ని సూచిస్తూ ప్రిన్సిపాల్ జారీ చేసిన పత్రం.',
        issuing_authority: 'Educational Institution'
      },
      {
        key: 'bank_passbook',
        name_en: 'Bank Account Passbook (Aadhaar Seeded)',
        name_hi: 'बैंक खाता पासबुक (आधार सीडेड)',
        name_te: 'బ్యాంక్ పాస్‌బుక్ (ఆధార్ సీడెడ్)',
        helper_text_en: 'Nationalized bank branch passbook with IFSC code and active NPCI mapping.',
        helper_text_hi: 'आईएफएससी कोड और सक्रिय एनपीसीआई मैपिंग के साथ राष्ट्रीयकृत बैंक पासबुक।',
        helper_text_te: 'IFSC కోడ్ మరియు NPCI మ్యాపింగ్ ఉన్న జాతీయ బ్యాంకు పాస్‌బుక్.',
        issuing_authority: 'Scheduled Commercial Bank'
      }
    ]
  },
  {
    id: 'ts-rythu-bandhu',
    name_en: 'Rythu Bandhu Scheme (Farmer Investment Support)',
    name_hi: 'रैथु बंधु योजना (किसान निवेश सहायता)',
    name_te: 'రైతు బంధు పథకం (వ్యవసాయ పెట్టుబడి సాయం)',
    description_en: 'Direct crop investment grant of ₹10,000 per acre per year (₹5,000 per season) directly credited to land-holding farmers in Telangana prior to Rabi and Kharif seasons.',
    description_hi: 'रबी और खरीफ सीजन से पहले तेलंगाना में भूमिधारक किसानों को सीधे ₹10,00,000 की फसल निवेश सहायता।',
    description_te: 'తెలంగాణలోని భూమి ఉన్న రైతులకు రబీ మరియు ఖరీఫ్ సీజన్లకు ముందు ఎకరానికి రూ. 10,000 (సీజన్‌కు రూ. 5,000) నేరుగా జమ చేసే పెట్టుబడి సహాయ పథకం.',
    category: 'farmer_subsidy',
    issuing_department: 'Department of Agriculture, Telangana',
    benefits_en: '₹5,000 per acre per season (Kharif & Rabi) direct DBT benefit without loan burden.',
    benefits_hi: '₹5,000 प्रति एकड़ प्रति सीजन (खरीफ और रबी) सीधा डीबीटी लाभ।',
    benefits_te: 'ఎకరానికి రూ. 5,000 చొప్పున ఏడాదికి రూ. 10,000 నేరుగా బ్యాంక్ ఖాతాలో జమ.',
    official_link: 'http://rythubandhu.telangana.gov.in/',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-06-15',
    required_documents: [
      {
        key: 'pattadar_passbook',
        name_en: 'Pattadar Dharani Passbook',
        name_hi: 'पट्टादार धरणी पासबुक',
        name_te: 'పట్టాదారు ధరణి పాస్‌బుక్',
        helper_text_en: 'Digital Dharani portal pattadar land title passbook.',
        helper_text_hi: 'डिजिटल धरणी पोर्टल पट्टादार भूमि शीर्षक पासबुक।',
        helper_text_te: 'ధరణి పోర్టల్ ద్వారా జారీ చేసిన డిజిటల్ పట్టాదారు పాస్‌బుక్.',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'bank_account',
        name_en: 'Active Bank Passbook',
        name_hi: 'सक्रिय बैंक पासबुक',
        name_te: 'యాక్టివ్ బ్యాంక్ ఖాతా పాస్‌బుక్',
        helper_text_en: 'Bank account registered with Agriculture Extension Officer (AEO).',
        helper_text_hi: 'कृषि विस्तार अधिकारी (एईओ) के पास पंजीकृत बैंक खाता।',
        helper_text_te: 'వ్యవసాయ విస్తరణాధికారి (AEO) వద్ద నమోదైన బ్యాంక్ ఖాతా.',
        issuing_authority: 'Bank'
      }
    ]
  },
  {
    id: 'ts-kalyana-lakshmi',
    name_en: 'Kalyana Lakshmi / Shaadi Mubarak Scheme',
    name_hi: 'कल्याण लक्ष्मी / शादी मुबारक योजना',
    name_te: 'కళ్యాణ లక్ష్మి / షాదీ ముబారక్ పథకం',
    description_en: 'One-time financial assistance of ₹1,00,116 given at the time of marriage to brides belonging to SC, ST, BC, EBC, and Minority families in Telangana.',
    description_hi: 'तेलंगाना में एससी, एसटी, बीसी, ईबीसी और अल्पसंख्यक परिवारों की दुल्हनों को शादी के समय ₹1,00,116 की एकमुश्त वित्तीय सहायता।',
    description_te: 'తెలంగాణలోని ఎస్సీ, ఎస్టీ, బీసీ, ఈబీసీ మరియు మైనార్టీ కుటుంబాల వధువులకు వివాహ సమయంలో రూ. 1,00,116 ఏకకాల ఆర్థిక సహాయం.',
    category: 'womens_welfare',
    issuing_department: 'Scheduled Castes & Backward Classes Welfare Dept',
    benefits_en: '₹1,00,116 lump sum grant transferred directly to the bride’s mother’s bank account.',
    benefits_hi: '₹1,00,116 एकमुश्त अनुदान सीधे दुल्हन की मां के बैंक खाते में स्थानांतरित।',
    benefits_te: 'వధువు తల్లి బ్యాంక్ ఖాతాలో రూ. 1,00,116 నేరుగా జమ.',
    official_link: 'https://telanganaepass.cgg.gov.in/KalyanLakshmi.do',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-07-10',
    required_documents: [
      {
        key: 'bride_age_proof',
        name_en: 'Bride Age Proof (SSC / Birth Certificate)',
        name_hi: 'दुल्हन की आयु का प्रमाण (एसएससी/जन्म प्रमाण पत्र)',
        name_te: 'వధువు వయస్సు ధృవీకరణ పత్రం (18 ఏళ్లు పూర్తవ్వాలి)',
        helper_text_en: 'Bride must be 18 years or older at marriage date.',
        helper_text_hi: 'विवाह की तिथि पर दुल्हन की आयु 18 वर्ष या उससे अधिक होनी चाहिए।',
        helper_text_te: 'వివాహ తేదీ నాటికి వధువుకు 18 సంవత్సరాలు నిండి ఉండాలి.',
        issuing_authority: 'MRO / Registrar / SSC Board'
      },
      {
        key: 'wedding_card',
        name_en: 'Wedding Card / Marriage Certificate',
        name_hi: 'शादी का कार्ड / विवाह प्रमाण पत्र',
        name_te: 'వివాహ ఆహ్వాన పత్రిక / పెళ్లి సర్టిఫికేట్',
        helper_text_en: 'Wedding card verified by Gram Panchayat Secretary / Ward Officer.',
        helper_text_hi: 'ग्राम पंचायत सचिव/वार्ड अधिकारी द्वारा सत्यापित विवाह कार्ड।',
        helper_text_te: 'గ్రామ పంచాయతీ కార్యదర్శి సమ్మతించిన కళ్యాణ పత్రిక.',
        issuing_authority: 'Gram Panchayat / Ward Office'
      },
      {
        key: 'bride_mother_bank',
        name_en: 'Bride Mother Bank Passbook',
        name_hi: 'दुल्हन की मां की बैंक पासबुक',
        name_te: 'వధువు తల్లి బ్యాంక్ పాస్‌బుక్',
        helper_text_en: 'Direct grant credited exclusively to bride mother account.',
        helper_text_hi: 'प्रत्यक्ष अनुदान विशेष रूप से दुल्हन की मां के खाते में जमा किया जाता है।',
        helper_text_te: 'నేరుగా వధువు తల్లి బ్యాంక్ ఖాతాలోనే జమ చేయబడుతుంది.',
        issuing_authority: 'Bank'
      }
    ]
  },
  {
    id: 'ts-aasara-pension',
    name_en: 'Aasara Pension Scheme',
    name_hi: 'आसरा पेंशन योजना',
    name_te: 'ఆసరా పింఛను పథకం',
    description_en: 'Monthly social security financial pension for senior citizens (aged 57+), widows, disabled persons, weavers, toddy tappers, and single women.',
    description_hi: 'वरिष्ठ नागरिकों (57+ वर्ष), विधवाओं, विकलांगों, बुनकरों, ताड़ी निकालने वालों और एकल महिलाओं के लिए मासिक सामाजिक सुरक्षा पेंशन।',
    description_te: 'వృద్ధులు (57 ఏళ్లు పైబడినవారు), వితంతువులు, దివ్యాంగులు, చేనేత కార్మికులు మరియు ఒంటరి మహిళలకు ప్రతి నెలా ఇచ్చే సామాజిక భద్రతా పింఛను.',
    category: 'pension',
    issuing_department: 'Panchayat Raj & Rural Development Department',
    benefits_en: '₹2,016/month for Elderly, Widows & Weavers; ₹3,016/month for Persons with Disability (PwD).',
    benefits_hi: 'बुजुर्गों और विधवाओं के लिए ₹2,016/माह; विकलांग व्यक्तियों के लिए ₹3,016/माह।',
    benefits_te: 'వృద్ధులు మరియు వితంతువులకు రూ. 2,016/నెల; దివ్యాంగులకు రూ. 3,016/నెల.',
    official_link: 'https://aasara.telangana.gov.in/',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-06-28',
    required_documents: [
      {
        key: 'age_proof',
        name_en: 'Voter ID / Age Certificate (57+ years)',
        name_hi: 'वोटर आईडी / आयु प्रमाण पत्र (57+ वर्ष)',
        name_te: 'ఓటరు కార్డ్ / వయస్సు సర్టిఫికేట్ (57 ఏళ్లు పైబడినవారికి)',
        helper_text_en: 'Official age verification document.',
        helper_text_hi: 'आधिकारिक आयु सत्यापन दस्तावेज़।',
        helper_text_te: 'అధికారిక వయస్సు ధృవీకరణ పత్రం.',
        issuing_authority: 'Election Commission / Health Dept'
      },
      {
        key: 'sadarem_cert',
        name_en: 'SADAREM Disability Certificate (For PwD category)',
        name_hi: 'सदरम विकलांगता प्रमाण पत्र (विकलांग श्रेणी के लिए)',
        name_te: 'సదరం వైకల్య ధృవీకరణ పత్రం (దివ్యాంగులకు మాత్రమే)',
        helper_text_en: 'Minimum 40% disability certified on SADAREM online portal.',
        helper_text_hi: 'सदरम ऑनलाइन पोर्टल पर न्यूनतम 40% विकलांगता प्रमाणित।',
        helper_text_te: 'సదరం పోర్టల్ ద్వారా జారీ చేసిన కనీసం 40% వైకల్య సర్టిఫికేట్.',
        issuing_authority: 'Medical Board (SADAREM)'
      }
    ]
  },
  {
    id: 'ts-dalit-bandhu',
    name_en: 'Telangana Dalit Bandhu Scheme',
    name_hi: 'तेलंगाना दलित बंधु योजना',
    name_te: 'తెలంగాణ దళిత బంధు పథకం',
    description_en: 'Flagship entrepreneurship and economic empowerment grant of ₹10 Lakh per eligible SC family to establish self-selected business enterprises without any bank loan security.',
    description_hi: 'बिना किसी बैंक ऋण सुरक्षा के स्व-चयनित व्यावसायिक उद्यम स्थापित करने के लिए प्रति पात्र एससी परिवार को ₹10 लाख का प्रमुख उद्यमिता अनुदान।',
    description_te: 'ఎస్సీ కుటుంబాలు బ్యాంక్ లింకేజ్ మరియు పూచీకత్తు లేకుండ స్వయంగా వ్యాపారం ప్రారంభించుకోవడానికి రూ. 10 లక్షల ఉచిత ఆర్థిక సాయం.',
    category: 'startup_funding',
    issuing_department: 'Telangana Scheduled Castes Development Corporation',
    benefits_en: '₹10,00,000 (Rupees Ten Lakhs) 100% direct grant for capital investments.',
    benefits_hi: 'पूंजीगत निवेश के लिए ₹10,00,000 (दस लाख रुपये) 100% प्रत्यक्ष अनुदान।',
    benefits_te: 'వ్యాపార మూలధనం కోసం రూ. 10,00,000 గ్రాంట్ (తిరిగి చెల్లించనవసరం లేదు).',
    official_link: 'https://dalitbandhu.telangana.gov.in/',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-07-15',
    required_documents: [
      {
        key: 'sc_caste_cert',
        name_en: 'SC Caste Certificate',
        name_hi: 'एससी जाति प्रमाण पत्र',
        name_te: 'ఎస్సీ కుల ధృవీకరణ పత్రం',
        helper_text_en: 'Scheduled Caste certificate verified by Tahsildar.',
        helper_text_hi: 'तहसीलदार द्वारा सत्यापित अनुसूचित जाति प्रमाण पत्र।',
        helper_text_te: 'తహశీల్దార్ ద్వారా ధృవీకరించబడిన ఎస్సీ కుల సర్టిఫికేట్.',
        issuing_authority: 'Revenue Department'
      },
      {
        key: 'business_plan',
        name_en: 'Business Unit Proposal / DPR',
        name_hi: 'व्यावसायिक इकाई प्रस्ताव / डीपीआर',
        name_te: 'వ్యాపార యూనిట్ ప్రతిపాదన (DPR)',
        helper_text_en: 'Self-selected business project report supported by District SC Corp.',
        helper_text_hi: 'जिला एससी निगम द्वारा समर्थित स्व-चयनित व्यावसायिक परियोजना रिपोर्ट।',
        helper_text_te: 'జిల్లా ఎస్సీ కార్పొరేషన్ ఆమోదించిన వ్యాపార ప్రణాళిక.',
        issuing_authority: 'Self / District SC Corporation'
      }
    ]
  },
  {
    id: 'ts-mahalakshmi',
    name_en: 'Mahalakshmi Scheme (Free Bus Travel & Monthly Grant)',
    name_hi: 'महालक्ष्मी योजना (मुफ्त बस यात्रा एवं मासिक अनुदान)',
    name_te: 'మహాలక్ష్మి పథకం (ఉచిత ఆర్టీసీ బస్సు ప్రయాణం & రూ. 2,500 సాయం)',
    description_en: 'Provides free travel for women and transgender persons in TSRTC Palle Velugu and Express buses across Telangana, plus ₹2,500 monthly financial grant for eligible low-income women heads of family.',
    description_hi: 'तेलंगाना भर में टीएसआरटीसी पल्ले वेलुगु और एक्सप्रेस बसों में महिलाओं के लिए मुफ्त यात्रा, साथ ही कम आय वाली महिला मुखियाओं को ₹2,500 मासिक अनुदान।',
    description_te: 'తెలంగాణవ్యాప్తంగా ఆర్టీసీ పల్లె వెలుగు మరియు ఎక్స్‌ప్రెస్ బస్సులలో మహిళలకు ఉచిత ప్రయాణం, మరియు పేద మహిళలకు నెలకు రూ. 2,500 ఆర్థిక సాయం.',
    category: 'womens_welfare',
    issuing_department: 'Women and Child Development Department, Telangana',
    benefits_en: '100% Free TSRTC bus travel + ₹2,500/month cash assistance + ₹500 LPG Gas Cylinder subsidy.',
    benefits_hi: '100% मुफ्त बस यात्रा + ₹2,500/माह नकद सहायता + ₹500 एलपीजी सिलेंडर।',
    benefits_te: 'ఉచిత RTC బస్సు ప్రయాణం + రూ. 2,500 నెలవారీ భృతి + రూ. 500 లకే గ్యాస్ సిలిండర్.',
    official_link: 'https://prajapalana.telangana.gov.in/',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-07-20',
    required_documents: [
      {
        key: 'residence_proof',
        name_en: 'Telangana Residence Proof / Domicile',
        name_hi: 'तेलंगाना निवास प्रमाण पत्र',
        name_te: 'తెలంగాణ స్థానికత ఆధారము',
        helper_text_en: 'Voter ID / Food Security Card showing Telangana address.',
        helper_text_hi: 'तेलंगाना का पता दर्शाने वाला वोटर आईडी / राशन कार्ड।',
        helper_text_te: 'తెలంగాణ చిరునామా ఉన్న ఓటరు కార్డ్ లేదా రేషన్ కార్డ్.',
        issuing_authority: 'Govt of Telangana'
      },
      {
        key: 'white_ration_card',
        name_en: 'Food Security Card (White Ration Card)',
        name_hi: 'खाद्य सुरक्षा कार्ड (सफेद राशन कार्ड)',
        name_te: 'ఆహార భద్రత కార్డ్ (తెల్ల రేషన్ కార్డ్)',
        helper_text_en: 'BPL family identification card.',
        helper_text_hi: 'बीपीएल परिवार पहचान पत्र।',
        helper_text_te: 'దారిద్ర్యరేఖకు దిగువన ఉన్నట్లు తెలిపే రేషన్ కార్డ్.',
        issuing_authority: 'Civil Supplies Dept'
      }
    ]
  },
  {
    id: 'ts-gruha-jyothi',
    name_en: 'Gruha Jyothi Scheme (200 Units Free Power)',
    name_hi: 'गृह ज्योति योजना (200 यूनिट मुफ्त बिजली)',
    name_te: 'గృహ జ్యోతి పథకం (200 యూనిట్ల ఉచిత విద్యుత్)',
    description_en: 'Zero electricity bill for domestic households consuming up to 200 units of electricity per month in Telangana.',
    description_hi: 'तेलंगाना में प्रति माह 200 यूनिट तक बिजली की खपत करने वाले घरेलू परिवारों के लिए शून्य बिजली बिल।',
    description_te: 'నెలవారీ 200 యూనిట్ల వరకు విద్యుత్ వాడే గృహ వినియోగదారులకు రూపాయి కూడా విద్యుత్ బిల్లు పడదు (ఉచిత విద్యుత్).',
    category: 'housing',
    issuing_department: 'Energy Department (TSSDCL / TSNPDCL)',
    benefits_en: '100% subsidy on monthly electricity charges for usage up to 200 units.',
    benefits_hi: '200 यूनिट तक खपत पर 100% बिजली शुल्क सब्सिडी।',
    benefits_te: '200 యూనిట్ల లోపు వాడకానికి 100% ఉచిత విద్యుత్.',
    official_link: 'https://prajapalana.telangana.gov.in/',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-06-30',
    required_documents: [
      {
        key: 'consumer_usc_number',
        name_en: 'Electricity Bill Unique Service Number (USC)',
        name_hi: 'बिजली बिल यूएससी नंबर',
        name_te: 'కరెంట్ బిల్లు USN / USC సంఖ్య',
        helper_text_en: 'Service Connection Number on monthly DISCOM bill.',
        helper_text_hi: 'मासिक डिस्कॉम बिल पर सर्विस कनेक्शन नंबर।',
        helper_text_te: 'ప్రతి నెలా వచ్చే కరెంట్ బిల్లుపై ఉండే సర్వీస్ నంబరు.',
        issuing_authority: 'TSSPDCL / TSNPDCL'
      },
      {
        key: 'ration_card',
        name_en: 'Telangana Ration Card',
        name_hi: 'तेलंगाना राशन कार्ड',
        name_te: 'తెల్ల రేషన్ కార్డ్',
        helper_text_en: 'Linked to house owner/tenant application.',
        helper_text_hi: 'मकान मालिक/किरायेदार के आवेदन से जुड़ा हुआ।',
        helper_text_te: 'ఆస్తి యజమాని/అద్దెదారు దరఖాస్తుకు జతచేసిన పత్రం.',
        issuing_authority: 'Civil Supplies Dept'
      }
    ]
  },
  {
    id: 'ts-arogyasri',
    name_en: 'Rajiv Aarogyasri Health Insurance Scheme',
    name_hi: 'राजीव आरोग्यश्री स्वास्थ्य बीमा योजना',
    name_te: 'రాజీవ్ ఆరోగ్యశ్రీ ఆరోగ్య భద్రతా పథకం',
    description_en: 'Comprehensive cashless health insurance coverage up to ₹10 Lakh per family per year for catastrophic illness hospitalization in empaneled public and private super-specialty hospitals.',
    description_hi: 'सरकारी और निजी अस्पतालों में गंभीर बीमारी के इलाज के लिए प्रति परिवार प्रति वर्ष ₹10 लाख तक का मुफ्त कैशलेस स्वास्थ्य बीमा।',
    description_te: 'ప్రభుత్వ మరియు ప్రైవేట్ ఆసుపత్రులలో తీవ్రమైన రోగాలకు సంవత్సరానికి రూ. 10 లక్షల ఉచిత నగదు రహిత (Cashless) వైద్యం.',
    category: 'healthcare',
    issuing_department: 'Aarogyasri Health Care Trust, Telangana',
    benefits_en: '₹10,00,000 annual health cover per family covering 1,670+ surgical & medical treatments.',
    benefits_hi: '₹10,00,000 वार्षिक स्वास्थ्य कवर (1,670+ सर्जिकल और चिकित्सा उपचार)।',
    benefits_te: 'కుటుంబానికి రూ. 10,00,000 వార్షిక ఆరోగ్య బీమా (1,670 కంటే ఎక్కువ శస్త్రచికిత్సలు).',
    official_link: 'https://aarogyasri.telangana.gov.in/',
    deadline: null,
    state: 'Telangana',
    last_verified_at: '2026-07-05',
    required_documents: [
      {
        key: 'aarogyasri_card',
        name_en: 'Aarogyasri Card / White Ration Card',
        name_hi: 'आरोग्यश्री कार्ड / सफेद राशन कार्ड',
        name_te: 'ఆరోగ్యశ్రీ కార్డ్ లేదా తెల్ల రేషన్ కార్డ్',
        helper_text_en: 'Eligible BPL card verified at Aarogyasri kiosk in hospital.',
        helper_text_hi: 'अस्पताल में आरोग्यश्री कियोस्क पर सत्यापित बीपीएल कार्ड।',
        helper_text_te: 'ఆసుపత్రిలోని ఆరోగ్యశ్రీ కౌంటర్ వద్ద చూపించాల్సిన కార్డ్.',
        issuing_authority: 'Aarogyasri Health Trust'
      }
    ]
  },
  {
    id: 'pm-kisan',
    name_en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    name_hi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    name_te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
    description_en: 'Central Sector Scheme providing income support of ₹6,000 per year in three equal installments of ₹2,000 directly to landholding farmer families across India.',
    description_hi: 'भारत भर के भूमिधारक किसान परिवारों को ₹2,000 की तीन समान किश्तों में प्रति वर्ष ₹6,000 की आय सहायता प्रदान करने वाली केंद्रीय क्षेत्र योजना।',
    description_te: 'భారతదేశవ్యాప్తంగా ఉన్న రైతు కుటుంబాలకు సంవత్సరానికి రూ. 6,000 ఆదాయ సహాయాన్ని 3 విడతలలో నేరుగా బ్యాంకు ఖాతాలో జమ చేసే కేంద్ర ప్రభుత్వ పథకం.',
    category: 'farmer_subsidy',
    issuing_department: 'Ministry of Agriculture and Farmers Welfare, Govt of India',
    benefits_en: '₹6,00,0 per year direct benefit transfer (DBT) into Aadhaar-seeded bank accounts.',
    benefits_hi: 'आधार से जुड़े बैंक खातों में प्रति वर्ष ₹6,000 का प्रत्यक्ष लाभ हस्तांतरण (डीबीटी)।',
    benefits_te: 'ఆధార్ అనుసంధానిత బ్యాంక్ ఖాతాలలోకి సంవత్సరానికి రూ. 6,000 నేరుగా జమ.',
    official_link: 'https://pmkisan.gov.in/',
    deadline: null,
    state: 'Central / All India',
    last_verified_at: '2026-07-10',
    required_documents: [
      {
        key: 'pm_kisan_aadhaar',
        name_en: 'Aadhaar Card (eKYC Verified)',
        name_hi: 'आधार कार्ड (eKYC सत्यापित)',
        name_te: 'ఆధార్ కార్డ్ (eKYC పూర్తి చేసినది)',
        helper_text_en: 'Mandatory eKYC completed on PM-KISAN portal.',
        helper_text_hi: 'पीएम-किसान पोर्टल पर अनिवार्य ई-केवाईसी पूर्ण।',
        helper_text_te: 'PM-KISAN పోర్టల్‌లో eKYC పూర్తి చేసి ఉండాలి.',
        issuing_authority: 'UIDAI / PM-KISAN Portal'
      }
    ]
  },
  {
    id: 'pm-jay-ayushman',
    name_en: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    name_hi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    name_te: 'ఆయుష్మాన్ భారత్ ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన (PM-JAY)',
    description_en: 'World’s largest health assurance scheme providing a health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families across India.',
    description_hi: 'भारत भर में 12 करोड़ से अधिक गरीब और वंचित परिवारों को द्वितीयक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति वर्ष प्रति परिवार ₹5 लाख का स्वास्थ्य कवर प्रदान करने वाली दुनिया की सबसे बड़ी स्वास्थ्य आश्वासन योजना।',
    description_te: 'భారతదేశవ్యాప్తంగా 12 కోట్లకు పైగా పేద కుటుంబాలకు ఆసుపత్రి వైద్యం కోసం ప్రతి కుటుంబానికి సంవత్సరానికి రూ. 5 లక్షల ఉచిత ఆరోగ్య భద్రత కల్పించే పథకం.',
    category: 'healthcare',
    issuing_department: 'National Health Authority (NHA), Govt of India',
    benefits_en: '₹5,00,000 cashless health insurance per family per year in empaneled hospitals nationwide.',
    benefits_hi: 'देशभर के सूचीबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹5,00,000 का कैशलेस स्वास्थ्य बीमा।',
    benefits_te: 'దేశమంతటా ఎంప్యానెల్ చేయబడిన ఆసుపత్రులలో ఉచిత నగదు రహిత చికిత్స.',
    official_link: 'https://pmjay.gov.in/',
    deadline: null,
    state: 'Central / All India',
    last_verified_at: '2026-07-12',
    required_documents: [
      {
        key: 'ayushman_card',
        name_en: 'Ayushman Bharat Golden Card / SECC Data Verification',
        name_hi: 'आयुष्मान भारत गोल्डन कार्ड / एसईसीसी डेटा सत्यापन',
        name_te: 'ఆయుష్మాన్ భారత్ గోల్డెన్ కార్డ్ / SECC ధృవీకరణ',
        helper_text_en: 'e-Card generated via Ayushman app or Common Service Centre (CSC).',
        helper_text_hi: 'आयुष्मान ऐप या सीएससी के माध्यम से उत्पन्न ई-कार्ड।',
        helper_text_te: 'CSC సెంటర్ లేదా ఆయుష్మాన్ యాప్ ద్వారా పొందిన ఇ-కార్డ్.',
        issuing_authority: 'National Health Authority'
      }
    ]
  }
];

export const TELANGANA_ELIGIBILITY_RULES = [
  {
    id: 'rule-epass-income',
    scheme_id: 'ts-epass-postmetric',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L'],
    match_reason_en: 'Your annual family income is within the ₹2 Lakh threshold for ePASS scholarship.',
    match_reason_hi: 'आपकी वार्षिक पारिवारिक आय ई-पास छात्रवृत्ति के लिए ₹2 लाख की सीमा के भीतर है।',
    match_reason_te: 'మీ కుటుంబ వార్షిక ఆదాయం ePASS స్కాలర్‌షిప్‌కు నిర్ణయించిన రూ. 2 లక్షల పరిమితిలో ఉంది.'
  },
  {
    id: 'rule-epass-edu',
    scheme_id: 'ts-epass-postmetric',
    field: 'education_level',
    operator: 'in',
    value: ['Intermediate', 'Diploma / ITI', 'Undergraduate (BA/BSc/BCom/BTech)', 'Postgraduate (MA/MSc/MBA/MTech)', 'Doctorate / PhD'],
    match_reason_en: 'Your education level qualifies for Post-Matric fee reimbursement.',
    match_reason_hi: 'आपका शिक्षा स्तर पोस्ट-मैट्रिक शुल्क प्रतिपूर्ति के लिए योग्य है।',
    match_reason_te: 'మీ విద్యార్హత పోస్ట్-మెట్రిక్ ఫీజు రీయింబర్స్‌మెంట్‌కు తగినట్లుగా ఉంది.'
  },
  {
    id: 'rule-epass-category',
    scheme_id: 'ts-epass-postmetric',
    field: 'social_category',
    operator: 'in',
    value: ['SC', 'ST', 'OBC', 'General'],
    match_reason_en: 'Your social category is covered under Telangana Welfare Scholarship Guidelines.',
    match_reason_hi: 'आपकी सामाजिक श्रेणी तेलंगाना कल्याण छात्रवृत्ति दिशानिर्देशों के तहत कवर की गई है।',
    match_reason_te: 'మీ సామాజిక వర్గం తెలంగాణ సంక్షేమ మార్గదర్శకాల కింద కవర్ చేయబడింది.'
  },
  {
    id: 'rule-rythu-occ',
    scheme_id: 'ts-rythu-bandhu',
    field: 'occupation',
    operator: 'in',
    value: ['Farmer / Agriculturist', 'Agricultural Worker / Tenant Farmer'],
    match_reason_en: 'Your occupation as a Farmer qualifies for Rythu Bandhu investment support.',
    match_reason_hi: 'किसान के रूप में आपका व्यवसाय रैथु बंधु निवेश सहायता के लिए योग्य है।',
    match_reason_te: 'రైతుగా మీ వృత్తి రైతు బంధు పెట్టుబడి సాయానికి అర్హత పొందింది.'
  },
  {
    id: 'rule-kalyana-gender',
    scheme_id: 'ts-kalyana-lakshmi',
    field: 'gender',
    operator: 'equals',
    value: 'female',
    match_reason_en: 'Kalyana Lakshmi financial grant is specifically targeted to support brides & mothers.',
    match_reason_hi: 'कल्याण लक्ष्मी वित्तीय अनुदान विशेष रूप से दुल्हनों और माताओं के समर्थन के लिए है।',
    match_reason_te: 'కళ్యాణ లక్ష్మి ఆర్థిక సహాయం వధువు మరియు ఆమె తల్లి సహాయార్థం ఉద్దేశించబడింది.'
  },
  {
    id: 'rule-kalyana-income',
    scheme_id: 'ts-kalyana-lakshmi',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L'],
    match_reason_en: 'Family annual income is below ₹2,00,000 limit.',
    match_reason_hi: 'पारिवारिक वार्षिक आय ₹2,00,000 की सीमा से कम है।',
    match_reason_te: 'కుటుంబ వార్షిక ఆదాయం రూ. 2,00,000 పరిమితి కంటే తక్కువగా ఉంది.'
  },
  {
    id: 'rule-aasara-age',
    scheme_id: 'ts-aasara-pension',
    field: 'age',
    operator: 'greater_than_or_equal',
    value: 57,
    match_reason_en: 'Your age (57+ years) satisfies the senior citizen pension qualification criteria.',
    match_reason_hi: 'आपकी आयु (57+ वर्ष) वरिष्ठ नागरिक पेंशन योग्यता मानदंडों को पूरा करती है।',
    match_reason_te: 'మీ వయస్సు (57 సంవత్సరాలు దాటినవారు) వృద్ధాప్య పింఛనుకు అర్హత పొందింది.'
  },
  {
    id: 'rule-aasara-income',
    scheme_id: 'ts-aasara-pension',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L'],
    match_reason_en: 'Income fits BPL rural/urban social security pension guidelines.',
    match_reason_hi: 'आय बीपीएल सामाजिक सुरक्षा पेंशन दिशानिर्देशों के अनुकूल है।',
    match_reason_te: 'ఆదాయం బిపిఎల్ సామాజిక భద్రతా పింఛను నిబంధనలకు లోబడి ఉంది.'
  },
  {
    id: 'rule-dalit-cat',
    scheme_id: 'ts-dalit-bandhu',
    field: 'social_category',
    operator: 'equals',
    value: 'SC',
    match_reason_en: 'Scheduled Caste (SC) category is eligible for ₹10 Lakh direct entrepreneurship grant.',
    match_reason_hi: 'अनुसूचित जाति (एससी) श्रेणी ₹10 लाख प्रत्यक्ष उद्यमिता अनुदान के लिए पात्र है।',
    match_reason_te: 'షెడ్యూల్డ్ కులాల (SC) వర్గం రూ. 10 లక్షల స్వయం ఉపాధి గ్రాంట్‌కు అర్హత పొందింది.'
  },
  {
    id: 'rule-mahalakshmi-gender',
    scheme_id: 'ts-mahalakshmi',
    field: 'gender',
    operator: 'in',
    value: ['female', 'other'],
    match_reason_en: 'Women and Transgender residents qualify for free TSRTC travel & financial assistance.',
    match_reason_hi: 'महिलाएं और ट्रांसजेंडर निवासी मुफ्त बस यात्रा और वित्तीय सहायता के लिए पात्र हैं।',
    match_reason_te: 'మహిళలు ఉచిత ఆర్‌టీసీ బస్సు ప్రయాణం మరియు రూ. 2,500 భృతికి అర్హులు.'
  },
  {
    id: 'rule-gruha-income',
    scheme_id: 'ts-gruha-jyothi',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L', '2L_5L'],
    match_reason_en: 'Domestic household within 200 units threshold qualifies for 100% power subsidy.',
    match_reason_hi: '200 यूनिट की सीमा के भीतर घरेलू परिवार 100% बिजली सब्सिडी के लिए योग्य है।',
    match_reason_te: '200 యూనిట్లలోపు కరెంట్ వాడే గృహ వినియోగదారులు 100% ఉచిత విద్యుత్‌కు అర్హులు.'
  },
  {
    id: 'rule-aarogyasri-income',
    scheme_id: 'ts-arogyasri',
    field: 'annual_income_band',
    operator: 'in',
    value: ['below_1L', '1L_2L', '2L_5L'],
    match_reason_en: 'Eligible for ₹10 Lakh annual cashless super-specialty hospital cover.',
    match_reason_hi: '₹10 लाख वार्षिक कैशलेस सुपर-स्पेशियलिटी अस्पताल कवर के लिए पात्र।',
    match_reason_te: 'సంవత్సరానికి రూ. 10 లక్షల ఉచిత నగదు రహిత సూపర్ స్పెషాలిటీ చికిత్సకు అర్హులు.'
  }
];

export const TELANGANA_RAG_DOCUMENTS = [
  {
    id: 'doc-epass-clause-1',
    scheme_id: 'ts-epass-postmetric',
    clause_label: 'Telangana ePASS GO Ms No. 66 — Income Eligibility & Limits',
    content: 'As per GO Ms No. 66 Social Welfare Dept, students belonging to SC/ST categories with annual family income up to ₹2,00,000 per annum (Urban & Rural) and BC/EBC/Disabled students with income up to ₹1,50,000 (Rural) or ₹2,00,000 (Urban) are entitled to 100% Tuition Fee Reimbursement and quarterly maintenance allowances.',
    language: 'en',
    last_verified_at: '2026-07-01'
  },
  {
    id: 'doc-epass-clause-2',
    scheme_id: 'ts-epass-postmetric',
    clause_label: 'Telangana ePASS GO Ms No. 45 — Attendance & Mandatory Documents',
    content: 'Fee reimbursement disbursement requires minimum 75% biometric attendance in the educational institution. Mandatory documents include barcoded Caste Certificate, current fiscal year Income Certificate issued by Tahsildar, SSC hall ticket number, Bonafide certificate, and NPCI-mapped bank passbook.',
    language: 'en',
    last_verified_at: '2026-07-01'
  },
  {
    id: 'doc-rythu-clause-1',
    scheme_id: 'ts-rythu-bandhu',
    clause_label: 'Rythu Bandhu Guidelines — Agricultural Land Title Criteria',
    content: 'Under Rythu Bandhu, every land-owning pattadar farmer registered on Dharani portal is provided ₹5,000 per acre per crop season (Kharif and Rabi). Commercial land, non-agricultural converted land, and government leased lands are excluded. Tenant farmers are separately assisted under specific agricultural support frameworks.',
    language: 'en',
    last_verified_at: '2026-06-15'
  },
  {
    id: 'doc-kalyana-clause-1',
    scheme_id: 'ts-kalyana-lakshmi',
    clause_label: 'Kalyana Lakshmi GO Ms No. 12 — Grant Amount & Eligibility Criteria',
    content: 'Kalyana Lakshmi / Shaadi Mubarak provides ₹1,00,116 one-time financial grant for unmarried girls attaining 18 years of age at marriage. The bride must belong to SC, ST, BC, EBC or Minority community with family annual income not exceeding ₹2,00,000. Payment is credited directly into the bride’s mother’s bank account.',
    language: 'en',
    last_verified_at: '2026-07-10'
  },
  {
    id: 'doc-aasara-clause-1',
    scheme_id: 'ts-aasara-pension',
    clause_label: 'Aasara Pension Rules — Age Threshold & Disablement Rates',
    content: 'Under Aasara Pension scheme, senior citizen pension age threshold is fixed at 57 years. Senior citizens and widows receive ₹2,016 per month. Differently abled persons certified with minimum 40% disability on SADAREM portal receive enhanced pension of ₹3,016 per month directly deposited via Direct Benefit Transfer.',
    language: 'en',
    last_verified_at: '2026-06-28'
  },
  {
    id: 'doc-dalit-clause-1',
    scheme_id: 'ts-dalit-bandhu',
    clause_label: 'Dalit Bandhu Guidelines — Enterprise Assistance & Non-Refundable Grant',
    content: 'Dalit Bandhu scheme offers ₹10 Lakh 100% direct financial grant per eligible SC family to establish self-selected business ventures (e.g. transport, retail, agriculture machinery, dairy, manufacturing). No bank loan or collateral security is needed. The amount is non-refundable and monitored by District Dalit Bandhu committees.',
    language: 'en',
    last_verified_at: '2026-07-15'
  },
  {
    id: 'doc-mahalakshmi-clause-1',
    scheme_id: 'ts-mahalakshmi',
    clause_label: 'Mahalakshmi Guarantee — Free Bus Travel & Monthly ₹2,500 Assistance',
    content: 'Under Mahalakshmi Guarantee, all women domiciled in Telangana can travel free of charge in TSRTC Palle Velugu and Express buses across the state upon showing any government photo identity card. Eligible low-income female heads of families additionally receive ₹2,500 monthly direct bank transfer.',
    language: 'en',
    last_verified_at: '2026-07-20'
  },
  {
    id: 'doc-gruha-clause-1',
    scheme_id: 'ts-gruha-jyothi',
    clause_label: 'Gruha Jyothi Policy — 200 Units Free Domestic Power',
    content: 'Gruha Jyothi scheme grants 100% subsidy on monthly domestic electricity bills up to 200 units consumption. Consumers holding valid Food Security Cards (White Ration Cards) linked with DISCOM Unique Service Connection (USC) numbers receive zero electricity bills for usage under 200 units.',
    language: 'en',
    last_verified_at: '2026-06-30'
  },
  {
    id: 'doc-arogyasri-clause-1',
    scheme_id: 'ts-arogyasri',
    clause_label: 'Rajiv Aarogyasri Health Coverage — ₹10 Lakh Super Specialty Cashless Cover',
    content: 'Rajiv Aarogyasri health scheme offers cashless inpatient treatment up to ₹10,00,000 per family per year in empaneled government and private super-specialty hospitals. White ration card holders are automatically covered for 1,670 medical and surgical procedures without out-of-pocket expenditure.',
    language: 'en',
    last_verified_at: '2026-07-05'
  },
  {
    id: 'doc-pmkisan-clause-1',
    scheme_id: 'pm-kisan',
    clause_label: 'PM-KISAN Scheme Guidelines — ₹6,000 Annual Direct Income Support',
    content: 'Under PM-KISAN, all landholding farmer families across India are provided financial benefit of ₹6,000 per year in three equal installments of ₹2,000 every four months. Payments are transferred directly into the bank accounts of beneficiaries via Aadhaar-based Direct Benefit Transfer (DBT).',
    language: 'en',
    last_verified_at: '2026-07-10'
  },
  {
    id: 'doc-pmjay-clause-1',
    scheme_id: 'pm-jay-ayushman',
    clause_label: 'Ayushman Bharat (PM-JAY) Guidelines — ₹5 Lakh Cashless Family Cover',
    content: 'Ayushman Bharat PM-JAY provides cashless and paperless health cover of ₹5,00,000 per family per year for secondary and tertiary care hospitalization in empaneled public and private hospitals across India. There is no restriction on family size or age, covering pre and post hospitalization expenses.',
    language: 'en',
    last_verified_at: '2026-07-12'
  }
];
