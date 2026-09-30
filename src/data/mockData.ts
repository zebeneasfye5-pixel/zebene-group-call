import {
  Currency,
  CurrencyRate,
  InformationItem,
  IdeaItem,
  GameQuestion,
  TradeProduct,
  TradeOrder,
  BankConnector,
  ComplianceLaw,
  TaxRecord,
  SOPProcedure,
  ParticipantProfile
} from '../types';

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  USD: { symbol: '$', rateToUSD: 1.0 },
  ETB: { symbol: 'ETB ', rateToUSD: 128.5 }, // Market-aligned rate
  EUR: { symbol: '€', rateToUSD: 0.92 },
  GBP: { symbol: '£', rateToUSD: 0.78 },
  AED: { symbol: 'AED ', rateToUSD: 3.67 }
};

export const INITIAL_INFORMATION: InformationItem[] = [
  {
    id: 'INF-2026-001',
    title: 'East African Cross-Border Grain & Coffee Export Clearance Circular',
    category: 'Trade Advisory',
    accessLevel: 'Public Worldwide',
    date: '2026-09-24',
    author: 'Directorate of Foreign Trade',
    organization: 'Ministry of Trade & Regional Integration',
    verificationHash: 'SHA256: 8e91c7a421b03fc2919d7d3b',
    content: 'All certified trading entities under the Zebene framework are authorized for expedited multimodal logistics corridors. Standard Phytosanitary and Origin validation requirements apply with single-window digital stamp clearance.',
    tags: ['Export', 'Coffee', 'Logistics', 'Customs'],
    downloadsCount: 1420
  },
  {
    id: 'INF-2026-002',
    title: 'National Bank Liquidity Harmonization & Foreign Exchange Retention Directive',
    category: 'Financial Circular',
    accessLevel: 'Commercial Banks Only',
    date: '2026-09-26',
    author: 'Governor Directorate',
    organization: 'National Central Banking Consortium',
    verificationHash: 'SHA256: 3a10bf89901efc2005a812da',
    content: 'Interbank electronic clearing settlement via Zebene protocol adheres to ISO 20022 message specifications. Withholding taxes on foreign currency swaps shall be credited automatically to the state treasury account.',
    tags: ['Banking', 'ISO20022', 'Forex', 'Treasury'],
    downloadsCount: 890
  },
  {
    id: 'INF-2026-003',
    title: 'Generational Renewable Infrastructure & Solar Microgrid Roadmap 2026-2030',
    category: 'Economic Bulletin',
    accessLevel: 'Public Worldwide',
    date: '2026-09-27',
    author: 'High Commission for Green Growth',
    organization: 'Sustainable Development Council',
    verificationHash: 'SHA256: b17fa602e1c9d4e51147a789',
    content: 'Prioritizing decentralized mini-grids for agricultural processing stations. Trade tariffs for bifacial crystalline solar modules imported through registered ports are adjusted under renewable incentive codes.',
    tags: ['Renewables', 'Green Economy', 'Solar', 'Generational'],
    downloadsCount: 2310
  },
  {
    id: 'INF-2026-004',
    title: 'Sovereign Sovereign-Level Strategic Mineral Stockpile Protocols',
    category: 'Diplomatic & Sovereign',
    accessLevel: 'Government & Sovereign',
    date: '2026-09-28',
    author: 'Council of Economic Security',
    organization: 'State Ministerial Cabinet',
    verificationHash: 'SHA256: f401c900e23adbb1945c9288',
    content: 'Classified protocol detailing physical reserves of refined copper cathodes and rare earth materials held in designated depository bonded warehouses under electronic multi-sig vault control.',
    tags: ['Sovereign', 'Metals', 'National Reserve', 'Security'],
    downloadsCount: 145
  },
  {
    id: 'INF-2026-005',
    title: 'Organic Sesame & Oilseeds Quality Grading Certification Standards',
    category: 'Agricultural Intel',
    accessLevel: 'Verified Trade Partners',
    date: '2026-09-29',
    author: 'Commodity Quality & Purity Laboratory',
    organization: 'Agricultural Transformation Agency',
    verificationHash: 'SHA256: 77a0bc5516edc8812f009941',
    content: 'Humera and Wollega white sesame lots must conform to minimum 99.5% purity benchmarks with moisture below 6.0%. Laboratory verification certificates are signed onto the Zebene digital ledger.',
    tags: ['Agriculture', 'Sesame', 'Purity', 'Standards'],
    downloadsCount: 1105
  }
];

export const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'IDEA-101',
    title: 'Solar-Powered Drip Irrigation Network for Highland Smallholders',
    author: 'Kaleb Tadesse & Regional AgTech Circle',
    country: 'Ethiopia & East Africa',
    category: 'Sustainable Agriculture',
    description: 'A modular, low-pressure gravity drip irrigation system energized by 250W solar pumps, cutting diesel fuel expenses by 95% and boosting vegetable crop yield across dry seasons.',
    impactScore: 94,
    giftTokensReceived: 480,
    date: '2026-09-22',
    status: 'Implemented in Pilot'
  },
  {
    id: 'IDEA-102',
    title: 'Decentralized Cold-Chain Storage at Rural Farm Cooperative Gates',
    author: 'Amina Nour & Youth Engineering Guild',
    country: 'Kenya / Regional Corridor',
    category: 'Clean Energy & Water',
    description: 'Evaporative cooling and solar-thermal chilling sheds that preserve harvested avocado and leafy crops for up to 21 days without grid electricity, drastically reducing post-harvest waste.',
    impactScore: 91,
    giftTokensReceived: 350,
    date: '2026-09-25',
    status: 'Reviewed'
  },
  {
    id: 'IDEA-103',
    title: 'National Open-Curriculum Digital STEM Kits for Rural Secondary Schools',
    author: 'Dr. Yonas Bekele',
    country: 'Ethiopia',
    category: 'Generational Education',
    description: 'Offline-first, ruggedized microcomputers with preloaded science experiments, vocational coding lessons, and interactive civic engineering tutorials for youth in remote areas.',
    impactScore: 89,
    giftTokensReceived: 510,
    date: '2026-09-27',
    status: 'Incubating'
  },
  {
    id: 'IDEA-104',
    title: 'Biomass Briquette Production from Agricultural Coffee Husk Waste',
    author: 'Green Fuel Youth Cooperative',
    country: 'International / Sub-Saharan',
    category: 'Civic Infrastructure',
    description: 'Converting hundreds of tons of coffee processing husks into clean, smokeless cooking fuel briquettes to halt deforestation and generate employment for young community members.',
    impactScore: 88,
    giftTokensReceived: 420,
    date: '2026-09-28',
    status: 'Reviewed'
  }
];

export const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 1,
    question: 'Which international framework guarantees fair trade, sustainable production, and food security principles across modern generations?',
    category: 'Global Ethics & Sustainability',
    options: [
      'UN Sustainable Development Goals (SDG 2 & SDG 12)',
      'Speculative High-Frequency Arbitrage Protocol',
      'Unrestricted Offshore Deregulation Accord',
      'Short-term Commodity Extraction Doctrine'
    ],
    correctIndex: 0,
    explanation: 'UN SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption & Production) enshrine generational protection and fair market exchange across borders.',
    giftReward: '50 Zebene Impact Tokens + Civic Pioneer Badge'
  },
  {
    id: 2,
    question: 'How does modern high-efficiency agricultural cold-chain logistics impact national economic development?',
    category: 'National Economic Resilience',
    options: [
      'Increases crop transit waste and consumer prices',
      'Preserves harvest value, reduces 40% post-harvest loss, and strengthens foreign exchange earnings',
      'Only benefits non-producer overseas intermediaries',
      'Depletes regional water reserves unnecessarily'
    ],
    correctIndex: 1,
    explanation: 'Preserving perishable commodities guarantees higher export realization, stabilizes domestic food reserves, and directly raises farmer incomes.',
    giftReward: '75 Zebene Impact Tokens + Agricultural Steward Trophy'
  },
  {
    id: 3,
    question: 'What is the primary objective of international Anti-Money Laundering (AML) and FATF standards in digital commerce?',
    category: 'International Financial Laws',
    options: [
      'Slow down legitimate business exchanges arbitrarily',
      'Prevent illicit capital flight, terrorism financing, and ensure verifiable integrity of bank settlements',
      'Eliminate sovereign central banks completely',
      'Impose secret commissions without state audit'
    ],
    correctIndex: 1,
    explanation: 'FATF international recommendations safeguard global financial systems against fraud and corruption while verifying legitimate economic actors.',
    giftReward: '60 Zebene Impact Tokens + Sovereign Compliance Seal'
  },
  {
    id: 4,
    question: 'In the Zebene financial model, how are government business taxes and bank stamp duties handled?',
    category: 'Tax & Fiscal Governance',
    options: [
      'Ignored or concealed in offshore accounts',
      'Deducted automatically at trade execution and remitted directly to the national revenue authority & partner banks with verifiable filing numbers',
      'Paid only if voluntary donations are requested',
      'Transferred into private speculative funds'
    ],
    correctIndex: 1,
    explanation: 'The Zebene system guarantees 100% tax transparency, calculating VAT, business profit tax, and bank stamp duties instantaneously with zero leakage.',
    giftReward: '100 Zebene Impact Tokens + Fiscal Honor Certificate'
  }
];

export const TRADE_PRODUCTS: TradeProduct[] = [
  {
    id: 'PRD-01',
    name: 'Washed Arabica Coffee Beans (Grade 1 Yirgacheffe / Sidama)',
    category: 'Agricultural Commodity',
    priceUSD: 6850,
    unit: 'Metric Ton (1,000 kg)',
    change24h: 2.4,
    stockAvailable: 1250,
    originCountry: 'Ethiopia',
    qualityGrade: 'Grade 1 Specialty / SCA Score 88.5',
    image: '/images/product_coffee.jpg',
    minOrderQuantity: 5,
    incoterm: 'FOB',
    description: 'Premier export-grade washed coffee beans with floral bergamot notes, bright citric acidity, and verified single-origin traceability from certified farmer coops.'
  },
  {
    id: 'PRD-02',
    name: 'Industrial Bifacial Solar Energy Panel Module (650W)',
    category: 'Clean Tech & Energy',
    priceUSD: 142,
    unit: 'Unit Module (Pallet of 30)',
    change24h: -1.2,
    stockAvailable: 8400,
    originCountry: 'International Certified Assembly',
    qualityGrade: 'Tier 1 Photovoltaic / 22.8% Efficiency',
    image: '/images/product_solar.jpg',
    minOrderQuantity: 30,
    incoterm: 'CIF',
    description: 'Heavy-duty dual-glass solar panels engineered for extreme temperatures, high irradiance, and 30-year linear performance warranty for microgrids and industrial plants.'
  },
  {
    id: 'PRD-03',
    name: 'Premium White Humera Sesame Seeds (Machine Cleaned)',
    category: 'Agricultural Commodity',
    priceUSD: 2150,
    unit: 'Metric Ton',
    change24h: 1.8,
    stockAvailable: 3100,
    originCountry: 'Ethiopia',
    qualityGrade: 'Purity 99.8% / Oil Content 54%',
    image: '/images/product_coffee.jpg',
    minOrderQuantity: 15,
    incoterm: 'FOB',
    description: 'Uniform white sesame seeds prized worldwide for tahini and confectionary oils, rigorously tested for aflatoxin compliance with digital phytosanitary ledger.'
  },
  {
    id: 'PRD-04',
    name: 'Electrolytic Copper Cathodes (Grade A Cu-CATH-1)',
    category: 'Industrial Metals',
    priceUSD: 9480,
    unit: 'Metric Ton',
    change24h: 0.6,
    stockAvailable: 680,
    originCountry: 'Central/East African Corridor',
    qualityGrade: 'Purity 99.9935% (LME Approved Standard)',
    image: '/images/product_solar.jpg',
    minOrderQuantity: 10,
    incoterm: 'CIF',
    description: 'High-grade non-ferrous copper cathodes for electrical infrastructure, transformer manufacturing, and clean energy grid transmission lines.'
  }
];

export const INITIAL_ORDERS: TradeOrder[] = [
  {
    id: 'TRD-2026-9901',
    productId: 'PRD-01',
    productName: 'Washed Arabica Coffee Beans (Grade 1)',
    quantity: 18,
    totalUSD: 123300,
    buyer: 'Antwerp Global Coffee Importers NV',
    seller: 'Oromia Coffee Farmers Cooperative Union',
    bankPartner: 'Commercial Bank of Ethiopia',
    taxAmountUSD: 18495, // 15% VAT / Export Tax
    ownerFeeUSD: 2281.05, // 1.85% owner commission
    status: 'Completed',
    date: '2026-09-25'
  },
  {
    id: 'TRD-2026-9902',
    productId: 'PRD-02',
    productName: 'Industrial Bifacial Solar Energy Panel Module',
    quantity: 360,
    totalUSD: 51120,
    buyer: 'Rift Valley Agro-Industrial Energy Consortium',
    seller: 'Sovereign Clean Power Technologies',
    bankPartner: 'African Development Bank',
    taxAmountUSD: 7668,
    ownerFeeUSD: 945.72,
    status: 'In Transit',
    date: '2026-09-27'
  },
  {
    id: 'TRD-2026-9903',
    productId: 'PRD-03',
    productName: 'Premium White Humera Sesame Seeds',
    quantity: 25,
    totalUSD: 53750,
    buyer: 'Middle East Agrico Foods Trading FZCO',
    seller: 'Amhara Regional Farmers Export Federation',
    bankPartner: 'Standard Chartered Global',
    taxAmountUSD: 8062.5,
    ownerFeeUSD: 994.38,
    status: 'Escrow Secured',
    date: '2026-09-28'
  }
];

export const CONNECTED_BANKS: BankConnector[] = [
  {
    id: 'BNK-01',
    name: 'Commercial Bank of Ethiopia (CBE)',
    shortCode: 'CBE',
    type: 'Commercial Bank',
    country: 'Ethiopia',
    swiftBic: 'CBETETAA',
    connectionStatus: 'Operational',
    liquidityPoolUSD: 148500000,
    protocols: ['ISO 20022', 'SWIFT MT103', 'Direct Clearing RTGS'],
    latencyMs: 18
  },
  {
    id: 'BNK-02',
    name: 'African Development Bank (AfDB)',
    shortCode: 'AfDB',
    type: 'Central / Development Bank',
    country: 'Pan-African Sovereign',
    swiftBic: 'AFDBABXX',
    connectionStatus: 'Operational',
    liquidityPoolUSD: 215000000,
    protocols: ['Sovereign Trade Credit Rail', 'Development Loan Escrow'],
    latencyMs: 32
  },
  {
    id: 'BNK-03',
    name: 'Standard Chartered Bank International',
    shortCode: 'SCB',
    type: 'International Clearing',
    country: 'United Kingdom / UAE Hub',
    swiftBic: 'SCBLGB2L',
    connectionStatus: 'Operational',
    liquidityPoolUSD: 89400000,
    protocols: ['SWIFT gpi', 'Cross-Border FX Clearing', 'CHAPS'],
    latencyMs: 24
  },
  {
    id: 'BNK-04',
    name: 'Federal Reserve Fedwire & Euroclear Node',
    shortCode: 'FED-EUR',
    type: 'International Clearing',
    country: 'United States / European Union',
    swiftBic: 'FRNYUS33',
    connectionStatus: 'Operational',
    liquidityPoolUSD: 310000000,
    protocols: ['Fedwire Funds Service', 'Euroclear DVP', 'TARGET2'],
    latencyMs: 41
  }
];

export const COMPLIANCE_LAWS: ComplianceLaw[] = [
  {
    id: 'LAW-01',
    title: 'Financial Action Task Force (FATF) Recommendations on AML/CFT',
    organization: 'FATF Intergovernmental Body',
    scope: 'Financial AML/CFT',
    articles: 'Recommendations 10, 15, and 16 (Customer Due Diligence & Digital Wire Transfers)',
    status: 'Compliant & Verified',
    enforcementDate: 'Enforced Continuously',
    details: 'Mandatory verified identity mapping for every trade participant, sender and beneficiary data transmission on every interbank movement, and automated PEP screening.'
  },
  {
    id: 'LAW-02',
    title: 'Basel Committee on Banking Supervision (Basel III/IV Standards)',
    organization: 'Bank for International Settlements (BIS)',
    scope: 'Banking Adequacy',
    articles: 'Pillar 1 & Pillar 2 Capital Adequacy & Liquidity Coverage Ratio (LCR)',
    status: 'Compliant & Verified',
    enforcementDate: 'Audited Q3 2026',
    details: 'All escrow trade pools held across connected partner banks maintain minimum 100% High-Quality Liquid Assets (HQLA) backing to withstand sovereign systemic stress.'
  },
  {
    id: 'LAW-03',
    title: 'African Continental Free Trade Area (AfCFTA) Rules of Origin & Customs',
    organization: 'African Union Commission',
    scope: 'Trade Ethics',
    articles: 'Protocol on Trade in Goods, Annex 2 Rules of Origin',
    status: 'Compliant & Verified',
    enforcementDate: 'Active Continental Enforcement',
    details: 'Automated value-addition calculation proving local manufacturing threshold (>35%) for preferential tariff treatment and reduction of import duties between signatory states.'
  },
  {
    id: 'LAW-04',
    title: 'United Nations Sustainable Development Goals (SDG 8 & SDG 9 Ethical Charter)',
    organization: 'United Nations General Assembly',
    scope: 'Environmental & SDG',
    articles: 'Target 8.2 (Economic Productivity) & 9.4 (Sustainable Industrial Upgrades)',
    status: 'Compliant & Verified',
    enforcementDate: 'Annual Audit Passed',
    details: 'Commitment to eradicate child labor, mandate fair trade pricing floors for smallholder agricultural goods, and incentivize clean renewable energy technology transfers.'
  }
];

export const INITIAL_TAX_RECORDS: TaxRecord[] = [
  {
    id: 'TAX-2026-8801',
    taxType: 'Value Added Tax (VAT 15%)',
    sourceTransaction: 'TRD-2026-9901 (Coffee Export Batch)',
    grossAmountUSD: 123300,
    taxRatePercent: 15.0,
    taxDeductedUSD: 18495,
    recipientEntity: 'Federal Ministry of Finance',
    status: 'Remitted',
    filingNumber: 'ET-REV-VAT-891024-C',
    date: '2026-09-25'
  },
  {
    id: 'TAX-2026-8802',
    taxType: 'Customs & Tariff',
    sourceTransaction: 'TRD-2026-9902 (Solar Panel Import)',
    grossAmountUSD: 51120,
    taxRatePercent: 8.5,
    taxDeductedUSD: 4345.2,
    recipientEntity: 'Federal Ministry of Finance',
    status: 'Remitted',
    filingNumber: 'CUST-IMP-2026-44019',
    date: '2026-09-27'
  },
  {
    id: 'TAX-2026-8803',
    taxType: 'Bank Stamp Duty',
    sourceTransaction: 'Interbank SWIFT Settlement SCB-CBE',
    grossAmountUSD: 228170,
    taxRatePercent: 0.5,
    taxDeductedUSD: 1140.85,
    recipientEntity: 'National Bank Revenue Authority',
    status: 'Remitted',
    filingNumber: 'BNK-STAMP-99210-ET',
    date: '2026-09-28'
  },
  {
    id: 'TAX-2026-8804',
    taxType: 'Withholding Tax (2%)',
    sourceTransaction: 'TRD-2026-9903 (Sesame Seeds Batch)',
    grossAmountUSD: 53750,
    taxRatePercent: 2.0,
    taxDeductedUSD: 1075,
    recipientEntity: 'Federal Ministry of Finance',
    status: 'Processed & Queued',
    filingNumber: 'WHT-2026-004419',
    date: '2026-09-29'
  }
];

export const ZEBEN_PROCEDURES: SOPProcedure[] = [
  {
    stepNumber: 1,
    title: 'Institutional Verification & Bank Onboarding',
    objective: 'Establish verified enterprise identity with dual-signatory bank credentials.',
    prerequisites: [
      'Official Commercial Registration Certificate or TIN Number',
      'Designated Partner Bank Account (CBE, AfDB, SCB or Fedwire-clearing)',
      'Authorized corporate signatory passport / national biometric ID'
    ],
    instructions: [
      'Navigate to the Banking module and select "Pair Verified Bank Account".',
      'Enter the institution SWIFT BIC and national business registration code.',
      'Authorize the micro-deposit or ISO 20022 digital handshake validation.',
      'Upon clearance, a cryptographically signed Zebene Institutional Key is minted.'
    ],
    complianceLaw: 'FATF Recommendation 10 (Customer Due Diligence) & Basel III Adequacy',
    notes: 'Member accounts are utility-only accounts. They operate as verified transactional participants without equity or dividend claims on the platform foundation.'
  },
  {
    stepNumber: 2,
    title: 'Information Exchange & Access Classification Protocol',
    objective: 'Transmit or retrieve verified market advisories, agricultural bulletins, or legal notices under strict security tiers.',
    prerequisites: [
      'Active Verified Enterprise Identity',
      'Designated classification privilege (Public, Trade Partner, Bank Only, Sovereign)'
    ],
    instructions: [
      'Access the Information Exchange Center from the primary navigation.',
      'Click "Publish Verified Information" and provide title, category, and document body.',
      'Select the appropriate classification level: Public Worldwide, Verified Partners, Commercial Banks, or Sovereign Restricted.',
      'The platform generates a unique cryptographic SHA-256 integrity hash before writing the record to the public ledger.'
    ],
    complianceLaw: 'Global Data Privacy & Transborder Data Flow Ethics Regulations',
    notes: 'Unauthorized leak or misclassification of Sovereign documents triggers automatic temporary suspension of trade clearing privileges.'
  },
  {
    stepNumber: 3,
    title: 'Generational Idea Gaming & Gift Allocation Rules',
    objective: 'Submit transformative solutions for world, national, and generational challenges while participating in educational gift games.',
    prerequisites: [
      'Participant account (free for all global and national citizens)',
      'No financial purchase required to submit ideas'
    ],
    instructions: [
      'Enter the Generational Idea & Gift Gaming Arena.',
      'Select the "Impact Challenge Quiz" to test your knowledge on sustainable development, national economics, and international ethics.',
      'Each correct challenge unlocks instant Zebene Impact Gift Badges and Tokens.',
      'Submit your original generational idea (Clean Energy, Agriculture, Education, Healthcare).',
      'Top-voted ideas receive digital gift grant allocations directly supported by our generational endowment.'
    ],
    complianceLaw: 'UN Sustainable Development Goals (SDG 8 & SDG 9) Civic Engagement Charter',
    notes: 'Gift tokens serve as non-monetary recognition and project milestone rewards. Members do not earn platform equity or dividends.'
  },
  {
    stepNumber: 4,
    title: 'Product Trading, Escrow & International Settlement',
    objective: 'Execute high-value cross-border purchases and sales of agricultural, energy, and industrial commodities with guaranteed escrow.',
    prerequisites: [
      'Pre-cleared Bank Liquidity Line or Deposited Escrow Balance',
      'Phytosanitary or Technical Quality Certificate'
    ],
    instructions: [
      'Browse the Commodity & Product Trading Exchange for listed verified goods.',
      'Review quality benchmarks (e.g. SCA Grade 1 for coffee, Tier 1 for solar modules).',
      'Click "Execute Trade Order" to open the smart escrow contract.',
      'Select the settlement partner bank (e.g. CBE or Standard Chartered).',
      'The buyer funds the neutral bank escrow pool; seller initiates multimodal shipping under specified Incoterms (FOB/CIF).',
      'Upon port customs clearance and inspection sign-off, funds are released to the seller after automated tax and platform commission deductions.'
    ],
    complianceLaw: 'ICC Incoterms 2020 & AfCFTA Protocol on Trade in Goods',
    notes: 'Platform automatically deducts the platform owner transaction commission (1.85%) and routes government taxes directly to state revenue accounts.'
  },
  {
    stepNumber: 5,
    title: 'Expense-to-Income Yield Mechanism Deployment',
    objective: 'Convert operational transaction and logistics expenditures into residual institutional yield and cashflow offsets.',
    prerequisites: [
      'Recorded platform business expenditures (trade commissions, freight, storage, bank fees)'
    ],
    instructions: [
      'Open the Expense-to-Income Engine tab.',
      'Review your verified expenditure ledger across logistics, energy, and interbank transaction charges.',
      'Activate the "Algorithmic Yield Reinvestment Vault".',
      'The engine automatically routes an allocation of platform-held liquidity reserves to generate between 4.2% and 8.5% annual yield offsets.',
      'View real-time expense offset credits applied directly against future administrative fees.'
    ],
    complianceLaw: 'International Capital Preservation & Treasury Management Norms',
    notes: 'Yield generated from expenses acts as operational fee discounts and liquidity cushions, not speculative member profit dividends.'
  },
  {
    stepNumber: 6,
    title: 'Automated Government & Banking Tax Remittance',
    objective: 'Ensure zero-leakage collection and instant direct filing of national VAT, corporate taxes, and bank stamp duties.',
    prerequisites: [
      'Valid Tax Identification Number (TIN) linked to trade profile'
    ],
    instructions: [
      'Open the Tax & Government Portal to inspect real-time fiscal accruals.',
      'For every completed trade order, the system applies the statutory VAT (15%), Customs Tariff, and Bank Stamp Duty (0.5%).',
      'The platform generates an electronic filing number (e.g. ET-REV-VAT-XXXX).',
      'Tax funds are transmitted via direct RTGS interbank clearing to the Federal Ministry of Finance and National Bank revenue accounts.',
      'Download the official stamped Government Tax Clearance Certificate for corporate audit.'
    ],
    complianceLaw: 'National Commercial Tax Code & Interbank Revenue Remittance Directives',
    notes: 'The platform charges an administrative processing spread to the owner, ensuring zero fiscal evasion and complete government compliance.'
  },
  {
    stepNumber: 7,
    title: 'Platform Economics & Owner Revenue Governance',
    objective: 'Understand the sovereign institutional revenue model and member participation rights.',
    prerequisites: [
      'General terms agreement accepted upon initial registration'
    ],
    instructions: [
      'Consult the Owner Revenue & Platform Economics section for full financial disclosure.',
      'The Zebene International Multi-purpose Application is an institutional engine owned and governed by the Platform Founder / Sovereign Entity.',
      'The owner earns platform revenues via: (a) 1.85% transaction fee on product trades, (b) 0.45% bank settlement routing fee, (c) enterprise access licenses, and (d) tax processing administration.',
      'Members operate as utility participants with zero dividend distribution or equity ownership, protecting the platform from speculative member claims and maintaining stability.'
    ],
    complianceLaw: 'International Corporate Governance & Institutional Non-Dividend Utility Charter',
    notes: 'This structural separation guarantees that the platform remains financially solvent, legally sound, and focused on national and global prosperity.'
  }
];

export const INITIAL_PARTICIPANTS: ParticipantProfile[] = [
  {
    codeNumber: 'ZAIC-ET-8942-019',
    fullName: 'Zebene Asfye',
    organization: 'Zebene Asfye International Communication Directorate',
    role: 'Platform Builder & Sovereign Director',
    country: 'Ethiopia',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:7A9F02C1E8B4',
    eyeIrisVerified: true,
    eyeIrisHash: 'IRIS-RE-SHA256:4B1C98E3D7A0',
    registeredDate: '2026-09-29',
    accessTier: 'Government & Sovereign',
    status: 'Active'
  },
  {
    codeNumber: 'ZAIC-ET-3120-441',
    fullName: 'Kaleb Tadesse',
    organization: 'Oromia Coffee Farmers Union Cooperative',
    role: 'Senior Trade Exporter',
    country: 'Ethiopia',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:88BC19A034EF',
    eyeIrisVerified: true,
    eyeIrisHash: 'IRIS-RE-SHA256:6632DDA90123',
    registeredDate: '2026-09-22',
    accessTier: 'Verified Trade Partners',
    status: 'Active'
  },
  {
    codeNumber: 'ZAIC-KE-7712-902',
    fullName: 'Dr. Amina Nour',
    organization: 'Rift Clean Energy & AgTech Labs',
    role: 'Renewable Technology Commissioner',
    country: 'Kenya',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:A1409F338902',
    eyeIrisVerified: true,
    eyeIrisHash: 'IRIS-RE-SHA256:F9027811BC44',
    registeredDate: '2026-09-25',
    accessTier: 'Verified Trade Partners',
    status: 'Active'
  },
  {
    codeNumber: 'ZAIC-ET-5509-318',
    fullName: 'Yohannes Bekele',
    organization: 'Commercial Bank of Ethiopia (CBE)',
    role: 'Senior Settlement Officer & SWIFT Trustee',
    country: 'Ethiopia',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:22019944ABCC',
    eyeIrisVerified: true,
    eyeIrisHash: 'IRIS-RE-SHA256:1194200AA556',
    registeredDate: '2026-09-26',
    accessTier: 'Commercial Banks Only',
    status: 'Active'
  },
  {
    codeNumber: 'ZAIC-BE-1094-825',
    fullName: 'Sarah Van Der Bilt',
    organization: 'Antwerp Global Commodities NV',
    role: 'European Importer Managing Partner',
    country: 'Belgium',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:DD910243E511',
    eyeIrisVerified: true,
    eyeIrisHash: 'IRIS-RE-SHA256:55018322CA09',
    registeredDate: '2026-09-27',
    accessTier: 'Verified Trade Partners',
    status: 'Active'
  },
  {
    codeNumber: 'ZAIC-US-6231-507',
    fullName: 'Marcus Vance',
    organization: 'Fedwire & International Clearing Node',
    role: 'Central Clearinghouse Officer',
    country: 'United States',
    thumbprintVerified: true,
    thumbprintHash: 'THUMB-RH-SHA256:99881122DDBB',
    eyeIrisVerified: true,
    eyeIrisHash: 'IRIS-RE-SHA256:77334411FFEE',
    registeredDate: '2026-09-28',
    accessTier: 'Commercial Banks Only',
    status: 'Active'
  }
];

