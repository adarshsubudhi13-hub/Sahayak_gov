/**
 * Master registry of all 28 Indian States + 8 UTs
 * Each entry contains: id, name, localLangCode, localLangName, capital, emoji, districts[]
 */
export const INDIA_STATES = [
  {
    id: 'telangana',
    name: 'Telangana',
    localLangCode: 'te',
    localLangName: 'తెలుగు',
    capital: 'Hyderabad',
    emoji: '🏛️',
    region: 'South',
    districts: [
      'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
      'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar',
      'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar',
      'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nalgonda',
      'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla',
      'Ranga Reddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad',
      'Wanaparthy', 'Warangal', 'Hanamkonda', 'Yadadri Bhuvanagiri'
    ]
  },
  {
    id: 'andhra_pradesh',
    name: 'Andhra Pradesh',
    localLangCode: 'te',
    localLangName: 'తెలుగు',
    capital: 'Amaravati',
    emoji: '🌊',
    region: 'South',
    districts: [
      'Alluri Sitharama Raju', 'Anakapalli', 'Annamayya', 'Bapatla', 'Chittoor',
      'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Konaseema',
      'Krishna', 'Kurnool', 'Manyam', 'NTR', 'Nandyal',
      'Nellore', 'Palnadu', 'Prakasam', 'Sri Balaji', 'Sri Sathya Sai',
      'Srikakulam', 'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari',
      'YSR Kadapa'
    ]
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    localLangCode: 'mr',
    localLangName: 'मराठी',
    capital: 'Mumbai',
    emoji: '🏙️',
    region: 'West',
    districts: [
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed',
      'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli',
      'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur',
      'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded',
      'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani',
      'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
      'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ]
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    localLangCode: 'kn',
    localLangName: 'ಕನ್ನಡ',
    capital: 'Bengaluru',
    emoji: '🌿',
    region: 'South',
    districts: [
      'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
      'Bidar', 'Chamarajanagar', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga',
      'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan',
      'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal',
      'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga',
      'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'
    ]
  },
  {
    id: 'tamil_nadu',
    name: 'Tamil Nadu',
    localLangCode: 'ta',
    localLangName: 'தமிழ்',
    capital: 'Chennai',
    emoji: '🎭',
    region: 'South',
    districts: [
      'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
      'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram',
      'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
      'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
      'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
      'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
      'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
      'Vellore', 'Viluppuram', 'Virudhunagar'
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    localLangCode: 'ml',
    localLangName: 'മലയാളം',
    capital: 'Thiruvananthapuram',
    emoji: '🌴',
    region: 'South',
    districts: [
      'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
      'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
      'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
    ]
  },
  {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Lucknow',
    emoji: '🕌',
    region: 'North',
    districts: [
      'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha',
      'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia',
      'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti',
      'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli',
      'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Ayodhya',
      'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad',
      'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur',
      'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi',
      'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi',
      'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj',
      'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut',
      'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
      'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal',
      'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar',
      'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'
    ]
  },
  {
    id: 'bihar',
    name: 'Bihar',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Patna',
    emoji: '🏺',
    region: 'East',
    districts: [
      'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai',
      'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran',
      'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur',
      'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura',
      'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada',
      'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur',
      'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan',
      'Supaul', 'Vaishali', 'West Champaran'
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Jaipur',
    emoji: '🏰',
    region: 'North',
    districts: [
      'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer',
      'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh',
      'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh',
      'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu',
      'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali',
      'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi',
      'Sri Ganganagar', 'Tonk', 'Udaipur'
    ]
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    localLangCode: 'gu',
    localLangName: 'ગુજરાતી',
    capital: 'Gandhinagar',
    emoji: '🦁',
    region: 'West',
    districts: [
      'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
      'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod',
      'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar',
      'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana',
      'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan',
      'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
      'Tapi', 'Vadodara', 'Valsad'
    ]
  },
  {
    id: 'west_bengal',
    name: 'West Bengal',
    localLangCode: 'bn',
    localLangName: 'বাংলা',
    capital: 'Kolkata',
    emoji: '🐯',
    region: 'East',
    districts: [
      'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
      'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram',
      'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia',
      'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur',
      'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
    ]
  },
  {
    id: 'madhya_pradesh',
    name: 'Madhya Pradesh',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Bhopal',
    emoji: '🐆',
    region: 'Central',
    districts: [
      'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat',
      'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur',
      'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas',
      'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda',
      'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni',
      'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena',
      'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen',
      'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna',
      'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur',
      'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain',
      'Umaria', 'Vidisha'
    ]
  },
  {
    id: 'punjab',
    name: 'Punjab',
    localLangCode: 'pa',
    localLangName: 'ਪੰਜਾਬੀ',
    capital: 'Chandigarh',
    emoji: '🌾',
    region: 'North',
    districts: [
      'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib',
      'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar',
      'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Mohali',
      'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar',
      'Sangrur', 'Tarn Taran'
    ]
  },
  {
    id: 'odisha',
    name: 'Odisha',
    localLangCode: 'or',
    localLangName: 'ଓଡ଼ିଆ',
    capital: 'Bhubaneswar',
    emoji: '🏯',
    region: 'East',
    districts: [
      'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak',
      'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati',
      'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi',
      'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput',
      'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada',
      'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'
    ]
  },
  {
    id: 'assam',
    name: 'Assam',
    localLangCode: 'as',
    localLangName: 'অসমীয়া',
    capital: 'Dispur',
    emoji: '🦏',
    region: 'Northeast',
    districts: [
      'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar',
      'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri',
      'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi',
      'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong',
      'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon',
      'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar',
      'Tinsukia', 'Udalguri', 'West Karbi Anglong'
    ]
  },
  // ── Remaining states / UTs (English + Hindi stubs) ──
  {
    id: 'haryana',
    name: 'Haryana',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Chandigarh',
    emoji: '🌻',
    region: 'North',
    districts: [
      'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad',
      'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal',
      'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal',
      'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa',
      'Sonipat', 'Yamunanagar'
    ]
  },
  {
    id: 'himachal_pradesh',
    name: 'Himachal Pradesh',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Shimla',
    emoji: '🏔️',
    region: 'North',
    districts: [
      'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur',
      'Kullu', 'Lahaul & Spiti', 'Mandi', 'Shimla', 'Sirmaur',
      'Solan', 'Una'
    ]
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Dehradun',
    emoji: '⛰️',
    region: 'North',
    districts: [
      'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun',
      'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag',
      'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'
    ]
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Ranchi',
    emoji: '🌲',
    region: 'East',
    districts: [
      'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka',
      'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla',
      'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar',
      'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi',
      'Sahebganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'
    ]
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Raipur',
    emoji: '🌿',
    region: 'Central',
    districts: [
      'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara',
      'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg',
      'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham',
      'Kanker', 'Khairagarh', 'Kondagaon', 'Korba', 'Koriya',
      'Mahasamund', 'Manendragarh', 'Mohla-Manpur', 'Mungeli', 'Narayanpur',
      'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh-Bilaigarh', 'Sukma',
      'Surajpur', 'Surguja'
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    localLangCode: 'hi',
    localLangName: 'Konkani',
    capital: 'Panaji',
    emoji: '🏖️',
    region: 'West',
    districts: ['North Goa', 'South Goa']
  },
  {
    id: 'manipur',
    name: 'Manipur',
    localLangCode: 'hi',
    localLangName: 'Meitei',
    capital: 'Imphal',
    emoji: '🌺',
    region: 'Northeast',
    districts: [
      'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West',
      'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney',
      'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'
    ]
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    localLangCode: 'hi',
    localLangName: 'Khasi',
    capital: 'Shillong',
    emoji: '🌧️',
    region: 'Northeast',
    districts: [
      'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'Eastern West Khasi Hills',
      'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills',
      'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'
    ]
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    localLangCode: 'hi',
    localLangName: 'Mizo',
    capital: 'Aizawl',
    emoji: '🏞️',
    region: 'Northeast',
    districts: [
      'Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib',
      'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual',
      'Serchhip'
    ]
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    localLangCode: 'hi',
    localLangName: 'Nagamese',
    capital: 'Kohima',
    emoji: '🦅',
    region: 'Northeast',
    districts: [
      'Chumoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng',
      'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren',
      'Phek', 'Shamator', 'Tseminyu', 'Tuensang', 'Wokha', 'Zunheboto'
    ]
  },
  {
    id: 'tripura',
    name: 'Tripura',
    localLangCode: 'bn',
    localLangName: 'বাংলা',
    capital: 'Agartala',
    emoji: '🌸',
    region: 'Northeast',
    districts: [
      'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala',
      'South Tripura', 'Unakoti', 'West Tripura'
    ]
  },
  {
    id: 'arunachal_pradesh',
    name: 'Arunachal Pradesh',
    localLangCode: 'hi',
    localLangName: 'Nyishi',
    capital: 'Itanagar',
    emoji: '🏔️',
    region: 'Northeast',
    districts: [
      'Anjaw', 'Capital Complex Itanagar', 'Changlang', 'Dibang Valley', 'East Kameng',
      'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada',
      'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri',
      'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang',
      'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng',
      'West Siang'
    ]
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    localLangCode: 'hi',
    localLangName: 'Nepali',
    capital: 'Gangtok',
    emoji: '🏔️',
    region: 'Northeast',
    districts: ['East Sikkim', 'North Sikkim', 'Pakyong', 'Soreng', 'South Sikkim', 'West Sikkim']
  },
  // ── Union Territories ──
  {
    id: 'delhi',
    name: 'Delhi (NCT)',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'New Delhi',
    emoji: '🏛️',
    region: 'UT',
    districts: [
      'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi',
      'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi',
      'South West Delhi', 'West Delhi'
    ]
  },
  {
    id: 'jammu_kashmir',
    name: 'Jammu & Kashmir',
    localLangCode: 'hi',
    localLangName: 'Kashmiri',
    capital: 'Srinagar / Jammu',
    emoji: '❄️',
    region: 'UT',
    districts: [
      'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda',
      'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam',
      'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban',
      'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    localLangCode: 'hi',
    localLangName: 'Ladakhi',
    capital: 'Leh',
    emoji: '🏔️',
    region: 'UT',
    districts: ['Kargil', 'Leh']
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Chandigarh',
    emoji: '🌹',
    region: 'UT',
    districts: ['Chandigarh']
  },
  {
    id: 'puducherry',
    name: 'Puducherry',
    localLangCode: 'ta',
    localLangName: 'தமிழ்',
    capital: 'Puducherry',
    emoji: '🏛️',
    region: 'UT',
    districts: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
  },
  {
    id: 'andaman_nicobar',
    name: 'Andaman & Nicobar Islands',
    localLangCode: 'hi',
    localLangName: 'हिंदी',
    capital: 'Port Blair',
    emoji: '🏝️',
    region: 'UT',
    districts: ['Nicobar', 'North & Middle Andaman', 'South Andaman']
  },
  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    localLangCode: 'ml',
    localLangName: 'മലയാളം',
    capital: 'Kavaratti',
    emoji: '🐠',
    region: 'UT',
    districts: ['Lakshadweep']
  },
  {
    id: 'dadra_nagar_haveli',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    localLangCode: 'gu',
    localLangName: 'ગુજરાતી',
    capital: 'Daman',
    emoji: '🌊',
    region: 'UT',
    districts: ['Dadra & Nagar Haveli', 'Daman', 'Diu']
  }
];

/** Helper: get a state by its id */
export function getStateById(id) {
  return INDIA_STATES.find(s => s.id === id) || INDIA_STATES[0];
}

/** Helper: all region groups for the state picker */
export const INDIA_REGIONS = ['South', 'North', 'East', 'West', 'Central', 'Northeast', 'UT'];
