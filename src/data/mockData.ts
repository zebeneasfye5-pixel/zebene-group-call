import { 
  HumanitarianAidDrive, 
  WorkforceTask, 
  TradeCommodity, 
  TradeTransaction, 
  LiveChatMessage, 
  CountryStatistic,
  MemberProfile,
  ThroneDefinition,
  WorldAward,
  LaureateNominee,
  LotteryPrize,
  LotteryTicket,
  PastLotteryWinner
} from '../types';

export const INITIAL_MEMBERS: MemberProfile[] = [
  {
    id: 'MEM-001',
    fullName: 'Zebene Asfye',
    age: 42,
    gender: 'Male',
    country: 'Ethiopia',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:7B88A0194C3E',
    eyeprintVerified: true,
    eyeprintHash: 'IRIS-RE-SHA256:91CD22EA8801',
    fourDigitCode: '1224', // Builder & Founder master code
    registeredDate: '2026-09-18',
    isGoldenChairMember: true,
    balanceUSD: 245.50,
    tasksCompleted: 14,
    donationsGivenUSD: 120.00,
    avatarUrl: '/images/director_zebene.jpg',
    status: 'VIP Golden Member'
  },
  {
    id: 'MEM-002',
    fullName: 'Selamawit Tadesse',
    age: 29,
    gender: 'Female',
    country: 'Ethiopia',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:4421990ABCC1',
    eyeprintVerified: true,
    eyeprintHash: 'IRIS-RE-SHA256:88991122DDAA',
    fourDigitCode: '4821',
    registeredDate: '2026-09-22',
    isGoldenChairMember: true,
    balanceUSD: 85.00,
    tasksCompleted: 6,
    donationsGivenUSD: 35.00,
    avatarUrl: '/images/director_zebene.jpg',
    status: 'VIP Golden Member'
  },
  {
    id: 'MEM-003',
    fullName: 'Kiprono Koech',
    age: 34,
    gender: 'Male',
    country: 'Kenya',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:55018322CA09',
    eyeprintVerified: true,
    eyeprintHash: 'IRIS-RE-SHA256:1194200AA556',
    fourDigitCode: '7390',
    registeredDate: '2026-09-24',
    isGoldenChairMember: false,
    balanceUSD: 42.50,
    tasksCompleted: 4,
    donationsGivenUSD: 25.00,
    avatarUrl: '/images/director_zebene.jpg',
    status: 'Active'
  },
  {
    id: 'MEM-004',
    fullName: 'Claire Dubois',
    age: 31,
    gender: 'Female',
    country: 'France',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:99881122DDBB',
    eyeprintVerified: true,
    eyeprintHash: 'IRIS-RE-SHA256:77334411FFEE',
    fourDigitCode: '9152',
    registeredDate: '2026-09-26',
    isGoldenChairMember: false,
    balanceUSD: 110.00,
    tasksCompleted: 8,
    donationsGivenUSD: 50.00,
    avatarUrl: '/images/director_zebene.jpg',
    status: 'Active'
  }
];

export const AID_DRIVES: HumanitarianAidDrive[] = [
  {
    id: 'AID-01',
    title: 'Clean Drinking Water Tankers for Rural Boreholes',
    cause: 'Drought Relief & Clean Water',
    region: 'Eastern Lowlands & Somali Corridor',
    targetUSD: 15000,
    collectedUSD: 9420,
    donorCount: 164,
    connectedBank: 'Commercial Bank of Ethiopia (CBE)',
    bankAccountNumber: '1000-2938-4819-20',
    imageUrl: '/images/humanitarian_aid.jpg',
    beneficiariesCount: 2800,
    status: 'Active Collection',
    recentDonations: [
      {
        donorName: 'Anonymous Diaspora Member',
        donorCountry: 'United States',
        amountUSD: 50,
        amountETB: 7750,
        date: '2026-09-29',
        bankReference: 'CBE-AID-9821'
      },
      {
        donorName: 'Zebene Asfye',
        donorCountry: 'Ethiopia',
        amountUSD: 100,
        amountETB: 15500,
        date: '2026-09-28',
        bankReference: 'CBE-AID-9810'
      },
      {
        donorName: 'Amina & Family',
        donorCountry: 'Kenya',
        amountUSD: 25,
        amountETB: 3875,
        date: '2026-09-27',
        bankReference: 'TB-AID-7140'
      }
    ]
  },
  {
    id: 'AID-02',
    title: 'School Nutrition & Learning Books for Primary Children',
    cause: 'School Nutrition & Books',
    region: 'Oromia & Amhara Highland Communities',
    targetUSD: 8000,
    collectedUSD: 5310,
    donorCount: 98,
    connectedBank: 'Telebirr Humanitarian Escrow & Awash Bank',
    bankAccountNumber: '0142-9901-8422-00',
    imageUrl: '/images/humanitarian_aid.jpg',
    beneficiariesCount: 1450,
    status: 'Active Collection',
    recentDonations: [
      {
        donorName: 'Addis Youth Volunteer Circle',
        donorCountry: 'Ethiopia',
        amountUSD: 40,
        amountETB: 6200,
        date: '2026-09-30',
        bankReference: 'AWASH-AID-5510'
      },
      {
        donorName: 'Marcus V.',
        donorCountry: 'United Kingdom',
        amountUSD: 75,
        amountETB: 11625,
        date: '2026-09-28',
        bankReference: 'CBE-AID-9755'
      }
    ]
  },
  {
    id: 'AID-03',
    title: 'Emergency Mobile Clinic Kits & Essential Medicines',
    cause: 'Emergency Medical Supplies',
    region: 'Regional Health Clinics & Maternity Outposts',
    targetUSD: 12000,
    collectedUSD: 7850,
    donorCount: 142,
    connectedBank: 'Bank of Abyssinia & Commercial Bank of Ethiopia',
    bankAccountNumber: 'BOA-2026-7788-11',
    imageUrl: '/images/humanitarian_aid.jpg',
    beneficiariesCount: 3200,
    status: 'Active Collection',
    recentDonations: [
      {
        donorName: 'Global Friends Relief',
        donorCountry: 'Belgium',
        amountUSD: 150,
        amountETB: 23250,
        date: '2026-09-29',
        bankReference: 'BOA-AID-8802'
      }
    ]
  }
];

export const WORKFORCE_TASKS: WorkforceTask[] = [
  {
    id: 'TSK-101',
    title: 'Field Verification of Washed Arabica Coffee Parchment',
    category: 'Agricultural Inspection',
    rewardUSD: 35.00,
    estimatedHours: 3.5,
    difficulty: 'Intermediate',
    employer: 'Sidama Coffee Growers Cooperative Union',
    country: 'Ethiopia',
    availablePositions: 8,
    filledPositions: 5,
    description: 'Physically or digitally verify moisture level and parchment integrity for 20 export bags using calibrated moisture probe checklist.',
    skillsRequired: ['Quality Inspection', 'Mobile Photo Capture', 'Moisture Record']
  },
  {
    id: 'TSK-102',
    title: 'Agricultural Safety Manual Translation (English to Amharic/Oromo)',
    category: 'Language Translation',
    rewardUSD: 45.00,
    estimatedHours: 4.0,
    difficulty: 'Beginner',
    employer: 'Green Valley Irrigation Initiative',
    country: 'Ethiopia',
    availablePositions: 5,
    filledPositions: 3,
    description: 'Translate a 4-page practical guide on solar drip irrigation maintenance into clear native regional language terms.',
    skillsRequired: ['Bilingual Fluency', 'Agricultural Terminology']
  },
  {
    id: 'TSK-103',
    title: 'Digital Verification of Clean Energy Solar Kit Inverters',
    category: 'Trade Verification',
    rewardUSD: 60.00,
    estimatedHours: 5.0,
    difficulty: 'Specialist',
    employer: 'East Africa Clean Electrification Consortium',
    country: 'Kenya / Regional',
    availablePositions: 4,
    filledPositions: 2,
    description: 'Conduct QR code validation, battery discharge test logging, and digital serial ledger signoff for 15 solar units.',
    skillsRequired: ['Electrical Fundamentals', 'Serial Barcode Audit']
  },
  {
    id: 'TSK-104',
    title: 'Local Artisan Woven Textile & Craft Cataloging',
    category: 'Digital Cataloging',
    rewardUSD: 28.00,
    estimatedHours: 2.5,
    difficulty: 'Beginner',
    employer: 'National Heritage Craft Export Desk',
    country: 'Ethiopia',
    availablePositions: 10,
    filledPositions: 7,
    description: 'Upload high-resolution photographs, measure dimensions, and document weaver details for handwoven cotton Gabi textiles.',
    skillsRequired: ['Photography', 'Accurate Measurement']
  }
];

export const TRADE_COMMODITIES: TradeCommodity[] = [
  {
    id: 'COM-01',
    name: 'Washed Arabica Coffee (Specialty Grade 1 Yirgacheffe)',
    category: 'Agricultural Product',
    priceUSD: 480.00,
    unit: '60kg Jute Bag',
    stockAvailable: 240,
    originCountry: 'Ethiopia',
    qualityCertificate: 'ECX Certified Specialty / Q-Grade 88.5',
    imageUrl: '/images/specialty_coffee.jpg',
    minimumOrder: 2,
    description: 'Fair-trade export washed coffee beans featuring fragrant jasmine aroma, sweet bergamot notes, and single-origin traceable cooperatives.'
  },
  {
    id: 'COM-02',
    name: 'Standalone Solar Home Electrification Kit (120W Inverter + 3 Lamps)',
    category: 'Clean Energy',
    priceUSD: 185.00,
    unit: 'Complete Household Unit',
    stockAvailable: 150,
    originCountry: 'Certified Assembly Hub',
    qualityCertificate: 'ISO 9001 / IEC Clean Energy Certified',
    imageUrl: '/images/golden_chair_studio.jpg',
    minimumOrder: 1,
    description: 'Durable lithium iron phosphate battery unit equipped with USB multi-device charging ports and 12-hour high-lumen LED lamps.'
  },
  {
    id: 'COM-03',
    name: 'Pure White Humera Sesame Seeds (Machine Cleaned)',
    category: 'Agricultural Product',
    priceUSD: 980.00,
    unit: '500kg Half-Metric Lot',
    stockAvailable: 85,
    originCountry: 'Ethiopia',
    qualityCertificate: 'Purity 99.8% / Phytosanitary Cleared',
    imageUrl: '/images/specialty_coffee.jpg',
    minimumOrder: 1,
    description: 'Export-grade white sesame seeds renowned worldwide for culinary tahini and cold-pressed organic seed oils.'
  },
  {
    id: 'COM-04',
    name: 'Handcrafted Full-Grain Ethiopian Leather Portfolio Bag',
    category: 'Artisan Craft',
    priceUSD: 75.00,
    unit: 'Handmade Item',
    stockAvailable: 120,
    originCountry: 'Ethiopia',
    qualityCertificate: 'Ethical Tannery Council Approved',
    imageUrl: '/images/golden_chair_studio.jpg',
    minimumOrder: 1,
    description: 'Supple vegetable-tanned leather briefcase hand-stitched by certified Addis craftswomen, supporting fair artisan livelihoods.'
  }
];

export const INITIAL_TRANSACTIONS: TradeTransaction[] = [
  {
    id: 'TXN-2026-4401',
    commodityName: 'Washed Arabica Coffee (Grade 1 Yirgacheffe)',
    buyerName: 'Claire Dubois (France)',
    sellerName: 'Oromia Farmers Union (Ethiopia)',
    quantity: 2,
    unit: '60kg Jute Bag',
    subtotalUSD: 960.00,
    vatTax15USD: 144.00, // 15% VAT
    platformFeeUSD: 17.76, // 1.85% realistic fee
    totalPaidUSD: 1121.76,
    bankRail: 'Commercial Bank of Ethiopia (CBE Birr Escrow)',
    date: '2026-09-28',
    status: 'Delivered & Released'
  },
  {
    id: 'TXN-2026-4402',
    commodityName: 'Standalone Solar Home Electrification Kit (120W)',
    buyerName: 'Kiprono Koech (Kenya)',
    sellerName: 'Addis Clean Energy Distribution',
    quantity: 1,
    unit: 'Complete Household Unit',
    subtotalUSD: 185.00,
    vatTax15USD: 27.75, // 15% VAT
    platformFeeUSD: 3.42,
    totalPaidUSD: 216.17,
    bankRail: 'Telebirr SuperApp Instant Settlement',
    date: '2026-09-29',
    status: 'Escrow Locked'
  },
  {
    id: 'TXN-2026-4403',
    commodityName: 'Handcrafted Full-Grain Leather Portfolio Bag',
    buyerName: 'Sarah V. (Belgium)',
    sellerName: 'Entoto Artisan Cooperative',
    quantity: 2,
    unit: 'Handmade Item',
    subtotalUSD: 150.00,
    vatTax15USD: 22.50,
    platformFeeUSD: 2.78,
    totalPaidUSD: 175.28,
    bankRail: 'Chapa Gateway / Visa Card',
    date: '2026-09-30',
    status: 'Escrow Locked'
  }
];

export const INITIAL_CHAT_MESSAGES: LiveChatMessage[] = [
  {
    id: 'chat-1',
    senderName: 'Director Zebene Asfye',
    senderCountry: 'Ethiopia',
    senderFourDigit: '1224',
    isGoldenChair: true,
    text: 'Welcome all international delegates. Please take your seat at the Golden Chair studio. We are broadcasting live trade clearances and aid allocations.',
    time: '14:15',
    originalLanguage: 'en'
  },
  {
    id: 'chat-2',
    senderName: 'Selamawit T.',
    senderCountry: 'Ethiopia',
    senderFourDigit: '4821',
    isGoldenChair: true,
    text: 'Good afternoon. I have completed the agricultural moisture task for the Yirgacheffe harvest. The report is verified on the ledger.',
    time: '14:18',
    originalLanguage: 'am'
  },
  {
    id: 'chat-3',
    senderName: 'Kiprono Koech',
    senderCountry: 'Kenya',
    senderFourDigit: '7390',
    isGoldenChair: false,
    text: 'Solar home kit received in Nairobi. Working flawlessly. I have also contributed $25 to the Clean Water Boreholes drive.',
    time: '14:20',
    originalLanguage: 'sw'
  },
  {
    id: 'chat-4',
    senderName: 'Claire Dubois',
    senderCountry: 'France',
    senderFourDigit: '9152',
    isGoldenChair: false,
    text: 'Bonjour à tous! The translation feature works seamlessly. Excellent transparency on the 15% VAT filing.',
    time: '14:22',
    originalLanguage: 'fr'
  }
];

export const COUNTRY_DEMOGRAPHICS: CountryStatistic[] = [
  { country: 'Ethiopia', flag: '🇪🇹', memberCount: 1420, percentage: 38 },
  { country: 'Kenya', flag: '🇰🇪', memberCount: 540, percentage: 14 },
  { country: 'United States', flag: '🇺🇸', memberCount: 410, percentage: 11 },
  { country: 'Belgium & EU', flag: '🇪🇺', memberCount: 320, percentage: 9 },
  { country: 'United Arab Emirates', flag: '🇦🇪', memberCount: 290, percentage: 8 },
  { country: 'China', flag: '🇨🇳', memberCount: 260, percentage: 7 },
  { country: 'United Kingdom', flag: '🇬🇧', memberCount: 210, percentage: 6 },
  { country: 'Other Nations (28 Countries)', flag: '🌐', memberCount: 280, percentage: 7 }
];

export const WORLD_THRONES: ThroneDefinition[] = [
  {
    id: 'ideas-peace',
    name: 'The Throne of Visionary Ideas & World Peace',
    amharicTitle: 'የሰላምና የታላላቅ ሃሳቦች ሉዓላዊ ዙፋን',
    subtitle: 'Elevating Human Mindset, Ethical Consciousness & Global Harmony',
    description: 'Conferred upon profound thinkers, peacemakers, philosophers, and reformers whose transcendent ideas resolve hostility, dismantle prejudice, and align humanity toward collective dignity and moral ascension.',
    accentColor: 'from-amber-400 via-amber-500 to-amber-600',
    badgeTheme: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    mandate: 'To instill a universal mindset of reconciliation, shared prosperity, and respectful coexistence across all sovereign territories.',
    currentLaureateId: 'LAUR-001',
    totalLaureatesBestowed: 12,
    totalEndowmentUSD: 120000
  },
  {
    id: 'tech-knowledge',
    name: 'The Throne of Technological Knowledge & Advancement',
    amharicTitle: 'የቴክኖሎጂ እና የሳይንሳዊ ዕውቀት ሉዓላዊ ዙፋን',
    subtitle: 'Empowering Humanity with Sustainable Science, Clean Compute & Digital Equity',
    description: 'Reserved for transcendent engineers, inventors, scientific visionaries, and technologists whose breakthroughs conquer scarcity, accelerate sustainable energy, and democratize knowledge without exploitation.',
    accentColor: 'from-cyan-400 via-teal-500 to-emerald-600',
    badgeTheme: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    mandate: 'To direct supreme scientific intellect toward the flourishing of life, ethical artificial intelligence, clean environmental technology, and global progress.',
    currentLaureateId: 'LAUR-002',
    totalLaureatesBestowed: 9,
    totalEndowmentUSD: 95000
  },
  {
    id: 'charitable-deeds',
    name: 'The Throne of Charitable Deeds & Universal Aid',
    amharicTitle: 'የበጎ አድራጎት እና የርኅራኄ ሉዓላዊ ዙፋን',
    subtitle: 'Healing Suffering, Championing the Vulnerable & Selfless Philanthropy',
    description: 'Dedicated to heroic humanitarians, healthcare pioneers, grassroots altruists, and philanthropists whose selfless devotion feeds the impoverished, shelters disaster victims, and leaves an indelible legacy of kindness.',
    accentColor: 'from-rose-400 via-rose-500 to-amber-500',
    badgeTheme: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    mandate: 'To sanctify pure altruism, connect direct bank relief to those in critical need, and reward those who give without desire for self-aggrandizement.',
    currentLaureateId: 'LAUR-003',
    totalLaureatesBestowed: 16,
    totalEndowmentUSD: 165000
  }
];

export const WORLD_AWARDS: WorldAward[] = [
  {
    id: 'AWD-001',
    name: 'Grand Sovereign Collar of Global Peace & Mindset',
    throneCategory: 'ideas-peace',
    honoraryTitle: 'Sovereign Laureate of World Peace',
    grantAmountUSD: 25000,
    grantAmountETB: 3875000,
    medalDesign: '24K Gold Sunburst with Interlinked Olive Branches & Platinum Inlay',
    decreeSummary: 'Conferred by the High Council of International Communication for dismantling international polarization and fostering enlightenment.'
  },
  {
    id: 'AWD-002',
    name: 'Crystalline Prism of Technological Wisdom',
    throneCategory: 'tech-knowledge',
    honoraryTitle: 'Master Laureate of Scientific Advancement',
    grantAmountUSD: 20000,
    grantAmountETB: 3100000,
    medalDesign: 'Laser-Cut Optical Quartz with Micro-Engraved Mathematical Axioms',
    decreeSummary: 'Conferred for breakthrough open scientific knowledge that empowers low-income agrarian regions and cleans the biosphere.'
  },
  {
    id: 'AWD-003',
    name: 'Golden Laurels of Universal Compassion & Philanthropy',
    throneCategory: 'charitable-deeds',
    honoraryTitle: 'Protector Laureate of Humanity',
    grantAmountUSD: 22500,
    grantAmountETB: 3487500,
    medalDesign: 'Solid Bronze Heart encircled by Gold Laurels & Certified Bank Seal',
    decreeSummary: 'Conferred for sustained, transparent grassroots charity and emergency humanitarian life-saving interventions.'
  },
  {
    id: 'AWD-004',
    name: 'Medal of Civic Innovation & Social Harmony',
    throneCategory: 'ideas-peace',
    honoraryTitle: 'Distinguished Envoy of Cultural Coexistence',
    grantAmountUSD: 15000,
    grantAmountETB: 2325000,
    medalDesign: 'Silver Medallion with Universal Dove and 7-Language Inscription',
    decreeSummary: 'Recognizing community leaders who bridge ethnic and national divisions with sustainable dialogue.'
  }
];

export const INITIAL_LAUREATES: LaureateNominee[] = [
  {
    id: 'LAUR-001',
    name: 'Director General Zebene Asfye',
    title: 'Founder & Architect of Sovereign International Communication',
    country: 'Ethiopia',
    countryFlag: '🇪🇹',
    throneCategory: 'ideas-peace',
    avatarUrl: '/images/director_zebene.jpg',
    biography: 'Pioneer of the 7-language direct translation matrix, biometric thumbprint/iris validation, and the Sovereign Golden Chair Chamber. Dedicated to connecting all nations without intermediate exploitation.',
    keyContribution: 'Conceptualized and built the sovereign international platform uniting global information exchange, bank-verified aid, fair commodity trade, and automated 15% tax compliance.',
    impactMetrics: [
      { metric: 'Nations Connected', value: '35 Sovereign States' },
      { metric: 'Verified Members', value: '4,800+ Biometrically Cleared' },
      { metric: 'Peace Declarations', value: '14 Multilateral Accords' }
    ],
    endorsementsCount: 2480,
    status: 'Seated on Throne',
    conferredAward: 'Grand Sovereign Collar of Global Peace & Mindset',
    grantAmountUSD: 25000,
    grantAmountETB: 3875000,
    awardDate: '2026-09-24',
    fourDigitCode: '1224',
    biometricHash: 'THUMB-RH-SHA256:7B88A0194C3E',
    worldAddressSpeech: 'Peace is not the mere absence of conflict, but the conscious creation of structures where every person has dignity, honest work, verified identity, and direct access to brotherhood across borders.',
    nominatedBy: 'East African Peace & Regional Trade Council'
  },
  {
    id: 'LAUR-002',
    name: 'Dr. Amina Nour',
    title: 'Chief Engineer, Pan-African Solar Hydro & Decentralized Microgrid',
    country: 'Kenya',
    countryFlag: '🇰🇪',
    throneCategory: 'tech-knowledge',
    avatarUrl: '/images/director_zebene_1790803334314.jpg',
    biography: 'Renowned energy scientist and computational engineer. Developer of low-cost IoT irrigation grids and solar desalinators deployed across arid pastoralist corridors in the Great Rift Valley.',
    keyContribution: 'Engineered an open-source solar microgrid algorithm that provides 24/7 continuous clean power to 120 community healthcare clinics and 45 agricultural trade hubs.',
    impactMetrics: [
      { metric: 'Clean Megawatts Generated', value: '18.4 MW Zero-Emission' },
      { metric: 'Rural Clinics Powered', value: '120 Healthcare Units' },
      { metric: 'Water Purified Daily', value: '850,000 Liters' }
    ],
    endorsementsCount: 1910,
    status: 'Seated on Throne',
    conferredAward: 'Crystalline Prism of Technological Wisdom',
    grantAmountUSD: 20000,
    grantAmountETB: 3100000,
    awardDate: '2026-09-21',
    fourDigitCode: '4920',
    biometricHash: 'IRIS-RE-SHA256:A112C789B990',
    worldAddressSpeech: 'Technology reaches its highest moral calling when a solar cell pumps pure drinking water for a child who previously walked ten miles. Science must belong to humanity.',
    nominatedBy: 'Pan-African Scientific & Industrial Academy'
  },
  {
    id: 'LAUR-003',
    name: 'Dr. Tefera Mekonnen',
    title: 'Founder, Horn of Africa Emergency Surgical & Nutrition Vanguard',
    country: 'Ethiopia',
    countryFlag: '🇪🇹',
    throneCategory: 'charitable-deeds',
    avatarUrl: '/images/humanitarian_aid.jpg',
    biography: 'Heroic emergency surgeon and public health champion. Personally performed over 3,400 life-saving surgical operations in drought-stricken regions and oversaw the distribution of clean nutrition to 25,000 children.',
    keyContribution: 'Established mobile hospital convoys that travel to remote nomadic settlements, providing free emergency operations and distributing verified medical supplies linked with local bank escrow.',
    impactMetrics: [
      { metric: 'Free Surgeries Performed', value: '3,420 Procedures' },
      { metric: 'Children Nourished', value: '25,000+ Infants' },
      { metric: 'Emergency Convoys', value: '18 Mobile Units' }
    ],
    endorsementsCount: 3150,
    status: 'Seated on Throne',
    conferredAward: 'Golden Laurels of Universal Compassion & Philanthropy',
    grantAmountUSD: 22500,
    grantAmountETB: 3487500,
    awardDate: '2026-09-15',
    fourDigitCode: '7741',
    biometricHash: 'THUMB-RH-SHA256:0998B12E5F20',
    worldAddressSpeech: 'When you relieve the pain of a fellow human being, you heal the world. Charity is not a transaction; it is our sacred duty to one another.',
    nominatedBy: 'Global Humanitarian Medical Federation'
  },
  {
    id: 'LAUR-004',
    name: 'Hiroshi Tanaka',
    title: 'Lead Architect of Regenerative Agronomy & Climate Resilience',
    country: 'Japan',
    countryFlag: '🇯🇵',
    throneCategory: 'tech-knowledge',
    avatarUrl: '/images/specialty_coffee.jpg',
    biography: 'Environmental data scientist who pioneered biological soil restoration sensors and pest forecasting systems, shared royalty-free with smallholder farmers across developing economies.',
    keyContribution: 'Developed satellite-assisted soil microbiome restoration chips that cut synthetic fertilizer costs by 60% while doubling organic crop yields.',
    impactMetrics: [
      { metric: 'Farmer Cooperatives Supported', value: '320 Farming Guilds' },
      { metric: 'Crop Yield Increase', value: '+42% Organic Output' },
      { metric: 'Chemical Runoff Reduced', value: '-65% Fertilizer Waste' }
    ],
    endorsementsCount: 1420,
    status: 'Distinguished Nominee',
    conferredAward: 'Pending Council Acclamation',
    grantAmountUSD: 15000,
    grantAmountETB: 2325000,
    awardDate: '2026-10-01',
    fourDigitCode: '8832',
    biometricHash: 'IRIS-RE-SHA256:3992C810E234',
    worldAddressSpeech: 'The soil is our collective memory and our future bread. Marrying computational science with natural stewardship ensures peace for the generations yet unborn.',
    nominatedBy: 'Kyoto Institute for Sustainable Earth Sciences'
  },
  {
    id: 'LAUR-005',
    name: 'Elena Rostova',
    title: 'International Peace Treaty Mediator & Civic Restorative Justice Director',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    throneCategory: 'ideas-peace',
    avatarUrl: '/images/golden_chair_studio.jpg',
    biography: 'Diplomatic veteran of over 20 peace negotiations. Specializes in designing cross-border economic treaties that eliminate the financial motives for armed territorial aggression.',
    keyContribution: 'Drafted the "Equitable Water & Mineral Treaty Framework" utilized to de-escalate cross-border resource tensions in three transboundary river basins.',
    impactMetrics: [
      { metric: 'Treaties Facilitated', value: '7 Formal Accords' },
      { metric: 'Communities Reconciled', value: '450,000 Residents' },
      { metric: 'Civilian Observers Trained', value: '1,200 Peace Monitors' }
    ],
    endorsementsCount: 1680,
    status: 'Distinguished Nominee',
    conferredAward: 'Pending Council Acclamation',
    grantAmountUSD: 20000,
    grantAmountETB: 3100000,
    awardDate: '2026-10-05',
    fourDigitCode: '6145',
    biometricHash: 'THUMB-RH-SHA256:5541A709E381',
    worldAddressSpeech: 'Real diplomacy begins when we listen to the fears of the person on the opposite side of the table and design a future where neither side loses their honor.',
    nominatedBy: 'Geneva Academy for Restorative Peace'
  },
  {
    id: 'LAUR-006',
    name: 'Tariq Al-Mansoor',
    title: 'Philanthropist & Desert Green Canopy Foundation Trustee',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    throneCategory: 'charitable-deeds',
    avatarUrl: '/images/specialty_coffee_1790803344457.jpg',
    biography: 'Passionate benefactor of famine relief and arid land reforestation. Donated over $4.2M to grassroots community grain silos and clean water solar boreholes.',
    keyContribution: 'Funded and directed the construction of 85 deep-aquifer solar pumping stations providing permanent potable water to over 180,000 displaced drought survivors.',
    impactMetrics: [
      { metric: 'Solar Wells Built', value: '85 Solar Pumping Plants' },
      { metric: 'Lives Benefited', value: '180,000+ Villagers' },
      { metric: 'Food Reserves Stocked', value: '6,200 Metric Tons' }
    ],
    endorsementsCount: 1850,
    status: 'Distinguished Nominee',
    conferredAward: 'Pending Council Acclamation',
    grantAmountUSD: 18000,
    grantAmountETB: 2790000,
    awardDate: '2026-10-08',
    fourDigitCode: '3319',
    biometricHash: 'IRIS-RE-SHA256:7781A902F113',
    worldAddressSpeech: 'Wealth is a temporary trust granted to us. Its only true nobility is measured by the thirst it quenches and the suffering it lifts from human shoulders.',
    nominatedBy: 'Gulf Humanitarian Relief Council'
  }
];

export const ANNUAL_LOTTERY_PRIZES: LotteryPrize[] = [
  {
    id: 'PRIZE-HOUSE',
    tier: 'house',
    title: 'Smart Sovereign Villa Residence (Grand Prize #1)',
    amharicTitle: 'ዘመናዊ የቪላ መኖሪያ ቤት (የዓመቱ ታላቅ ሽልማት)',
    quantity: 1,
    estimatedValueUSD: 180000,
    estimatedValueETB: 27900000,
    imageUrl: '/images/annual_lottery_prizes.jpg',
    description: 'An architectural masterpiece 3-bedroom luxury modern villa with smart home automation, high-capacity solar battery storage, manicured garden terrace, and dedicated security gates. Freehold legal title deed transferred with 100% tax and stamp duties pre-cleared.',
    specifications: [
      '3 Master Suites with En-Suite Bathrooms',
      '12kW Rooftop Solar Array + Tesla/BYD Energy Storage',
      'High-Speed Optical Fiber Internet Pre-Installed',
      'Private 2-Car Garage with EV Rapid Charger',
      'Prime Capital City Location with Freehold Title Deed'
    ],
    taxStatus: '15% VAT & Title Transfer Tax 100% Covered by Sovereign Escrow'
  },
  {
    id: 'PRIZE-CAR',
    tier: 'car',
    title: '2026 All-Electric Executive SUV (Grand Prize #2)',
    amharicTitle: 'ዘመናዊ የኤሌክትሪክ መኪና (የዓመቱ ሁለተኛ ታላቅ ሽልማት)',
    quantity: 1,
    estimatedValueUSD: 48000,
    estimatedValueETB: 7440000,
    imageUrl: '/images/annual_lottery_prizes.jpg',
    description: 'State-of-the-art zero-emission electric SUV featuring dual-motor all-wheel drive, 520 km range per charge, panoramic glass roof, intelligent autonomous driving assistance, and home fast-charging station installation included.',
    specifications: [
      'Dual Motor AWD with 520 km Driving Range',
      'Zero Emissions & Ultra-Quiet Cabin Acoustic Glass',
      '3-Year Full Manufacturer Warranty & Roadside Assist',
      'Complimentary 22kW Home Wallbox Charger Included',
      '1-Year Comprehensive Insurance & Registration Included'
    ],
    taxStatus: 'Customs Duties & Road Clearance Fully Paid'
  },
  {
    id: 'PRIZE-PHONES',
    tier: 'phones',
    title: 'Flagship 5G Ultra Satellite Smartphones (25 Winners)',
    amharicTitle: 'ዘመናዊ ስማርት ስልኮች (ለ 25 ዕድለኞች)',
    quantity: 25,
    estimatedValueUSD: 1200,
    estimatedValueETB: 186000,
    imageUrl: '/images/annual_lottery_prizes.jpg',
    description: 'The pinnacle of mobile technology: 25 winners receive the titanium flagship smartphone featuring direct satellite emergency connectivity, 200MP pro-grade camera sensor, 1TB ultra-fast storage, and 12-month unlimited worldwide high-speed data eSIM.',
    specifications: [
      'Aerospace Titanium Frame & Ceramic Shield Glass',
      '1TB Storage + 16GB High-Speed RAM',
      'Direct Satellite SOS & Global Mesh Messaging',
      '12 Months Free Worldwide High-Speed Data Plan',
      'Wireless MagSafe Charger & Protective Case Bundle'
    ],
    taxStatus: 'Fully Cleared & Delivered to Winner Address'
  },
  {
    id: 'PRIZE-SPECIAL',
    tier: 'special',
    title: 'Special Annual Empowerment Packages (175 Winners)',
    amharicTitle: 'ልዩ የዓመቱ የማበረታቻ እና የኑሮ ማሻሻያ ጥቅሎች',
    quantity: 175,
    estimatedValueUSD: 850,
    estimatedValueETB: 131750,
    imageUrl: '/images/annual_lottery_prizes.jpg',
    description: 'Special annual community empowerment packages distributed among 175 lucky members to boost productivity and livelihoods: 15 Creator Laptops, 50 Solar Home Generators, 10 Deep Well Agricultural Solar Water Pumps, and 100 Cash Grants of $500 USD.',
    specifications: [
      '15x Pro Laptops for Digital Remote Workforce',
      '50x Solar Microgrid Kits (Lights, TV, USB Charging)',
      '10x Agricultural Solar Pumping Stations for Farmers',
      '100x Cash Grants of $500 USD (77,500 ETB) via Bank Transfer',
      'Direct Bank Settlement to CBE or Telebirr Account'
    ],
    taxStatus: 'Direct Non-Taxable Community Empowerment Benefit'
  }
];

export const INITIAL_USER_TICKETS: LotteryTicket[] = [
  {
    id: 'TCK-001',
    ticketNumber: 'ZAIC-LOTTO-2026-8812',
    memberId: 'MEM-001',
    memberName: 'Zebene Asfye',
    memberCountry: 'Ethiopia',
    purchaseDate: '2026-09-22',
    priceUSD: 10,
    drawDate: '2026-12-31',
    status: 'Active',
    verificationHash: 'LOTTO-SHA256:88F201A94D12'
  },
  {
    id: 'TCK-002',
    ticketNumber: 'ZAIC-LOTTO-2026-4409',
    memberId: 'MEM-001',
    memberName: 'Zebene Asfye',
    memberCountry: 'Ethiopia',
    purchaseDate: '2026-09-25',
    priceUSD: 10,
    drawDate: '2026-12-31',
    status: 'Active',
    verificationHash: 'LOTTO-SHA256:44C890E1128B'
  },
  {
    id: 'TCK-003',
    ticketNumber: 'ZAIC-LOTTO-2026-1224',
    memberId: 'MEM-001',
    memberName: 'Zebene Asfye',
    memberCountry: 'Ethiopia',
    purchaseDate: '2026-09-28',
    priceUSD: 10,
    drawDate: '2026-12-31',
    status: 'Active',
    verificationHash: 'LOTTO-SHA256:1224FF0098A1'
  }
];

export const PAST_LOTTERY_WINNERS: PastLotteryWinner[] = [
  {
    id: 'WIN-2025-01',
    year: 2025,
    winnerName: 'Yohannes Bekele',
    winnerCountry: 'Ethiopia',
    winnerCountryFlag: '🇪🇹',
    ticketNumber: 'ZAIC-LOTTO-2025-3914',
    prizeWon: 'Smart Sovereign Villa Residence (Grand Prize #1)',
    prizeTier: 'house',
    valueUSD: 175000,
    valueETB: 27125000,
    handoverDate: '2025-12-31',
    photoUrl: '/images/director_zebene.jpg',
    bankAuditRef: 'CBE-ESCROW-DEED-882194',
    testimonial: 'Winning the annual house transformed our entire family life. The title deed was handed over at the Commercial Bank of Ethiopia headquarters with zero hidden fees. This platform is 100% honest and blessed.'
  },
  {
    id: 'WIN-2025-02',
    year: 2025,
    winnerName: 'Faith Chebet',
    winnerCountry: 'Kenya',
    winnerCountryFlag: '🇰🇪',
    ticketNumber: 'ZAIC-LOTTO-2025-7720',
    prizeWon: '2025 All-Electric Executive SUV (Grand Prize #2)',
    prizeTier: 'car',
    valueUSD: 46000,
    valueETB: 7130000,
    handoverDate: '2025-12-31',
    photoUrl: '/images/director_zebene_1790803334314.jpg',
    bankAuditRef: 'KCB-INSPECTION-CERT-55912',
    testimonial: 'I bought two tickets while completing translation workforce tasks. When my serial number was drawn live on the screen, I wept with joy. The electric car was delivered right to Nairobi.'
  },
  {
    id: 'WIN-2025-03',
    year: 2025,
    winnerName: 'Tariq Al-Hassan',
    winnerCountry: 'United Arab Emirates',
    winnerCountryFlag: '🇦🇪',
    ticketNumber: 'ZAIC-LOTTO-2025-1108',
    prizeWon: 'Flagship 5G Ultra Titanium Smartphone',
    prizeTier: 'phones',
    valueUSD: 1200,
    valueETB: 186000,
    handoverDate: '2025-12-31',
    photoUrl: '/images/specialty_coffee.jpg',
    bankAuditRef: 'EMIRATES-NBD-COURIER-99120',
    testimonial: 'The satellite smartphone arrived securely sealed via DHL courier with the 1-year data subscription pre-activated. Transparent and authentic lottery.'
  }
];


