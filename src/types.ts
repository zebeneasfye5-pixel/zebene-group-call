export type TabType = 
  | 'overview'
  | 'master-control'
  | 'video-voice'
  | 'information'
  | 'ideas-game'
  | 'trading'
  | 'expense-income'
  | 'banking'
  | 'legal-compliance'
  | 'tax-clearance'
  | 'owner-revenue'
  | 'procedure-guide';

export type Language = 'en' | 'am' | 'om' | 'ti' | 'ar' | 'fr' | 'zh' | 'es';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  voiceLang: string;
}

export interface ParticipantProfile {
  codeNumber: string;
  fullName: string;
  organization: string;
  country: string;
  role: string;
  thumbprintVerified: boolean;
  thumbprintHash: string;
  eyeIrisVerified: boolean;
  eyeIrisHash: string;
  registeredDate: string;
  accessTier: AccessLevel;
  status?: 'Active' | 'Suspended' | 'Frozen';
}

export interface VideoCallSession {
  id: string;
  partnerName: string;
  partnerRole: string;
  partnerCountry: string;
  avatar: string;
  callType: 'video' | 'voice';
  status: 'idle' | 'calling' | 'connected' | 'ended';
  durationSeconds: number;
  isMuted: boolean;
  isVideoEnabled: boolean;
}

export type Currency = 'USD' | 'ETB' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyRate {
  symbol: string;
  rateToUSD: number;
}

export type AccessLevel = 'Public Worldwide' | 'Verified Trade Partners' | 'Commercial Banks Only' | 'Government & Sovereign';

export interface InformationItem {
  id: string;
  title: string;
  category: 'Economic Bulletin' | 'Trade Advisory' | 'Agricultural Intel' | 'Diplomatic & Sovereign' | 'Financial Circular';
  accessLevel: AccessLevel;
  date: string;
  author: string;
  organization: string;
  verificationHash: string;
  content: string;
  tags: string[];
  downloadsCount: number;
}

export interface IdeaItem {
  id: string;
  title: string;
  author: string;
  country: string;
  category: 'Clean Energy & Water' | 'Sustainable Agriculture' | 'Generational Education' | 'Civic Infrastructure' | 'Healthcare Innovation';
  description: string;
  impactScore: number;
  giftTokensReceived: number;
  date: string;
  status: 'Reviewed' | 'Implemented in Pilot' | 'Incubating';
}

export interface GameQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  giftReward: string;
}

export interface TradeProduct {
  id: string;
  name: string;
  category: 'Agricultural Commodity' | 'Clean Tech & Energy' | 'Industrial Metals' | 'Medical Supplies';
  priceUSD: number;
  unit: string;
  change24h: number;
  stockAvailable: number;
  originCountry: string;
  qualityGrade: string;
  image: string;
  minOrderQuantity: number;
  incoterm: 'FOB' | 'CIF' | 'EXW';
  description: string;
}

export interface TradeOrder {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalUSD: number;
  buyer: string;
  seller: string;
  bankPartner: string;
  taxAmountUSD: number;
  ownerFeeUSD: number;
  status: 'Escrow Secured' | 'In Transit' | 'Cleared Customs' | 'Completed';
  date: string;
}

export interface BankConnector {
  id: string;
  name: string;
  shortCode: string;
  type: 'Central / Development Bank' | 'Commercial Bank' | 'International Clearing';
  country: string;
  swiftBic: string;
  connectionStatus: 'Operational' | 'Active Sync' | 'Standby';
  liquidityPoolUSD: number;
  protocols: string[];
  latencyMs: number;
}

export interface ComplianceLaw {
  id: string;
  title: string;
  organization: string;
  scope: 'Financial AML/CFT' | 'Trade Ethics' | 'Environmental & SDG' | 'Banking Adequacy';
  articles: string;
  status: 'Compliant & Verified' | 'Annual Audit Passed';
  enforcementDate: string;
  details: string;
}

export interface TaxRecord {
  id: string;
  taxType: 'Value Added Tax (VAT 15%)' | 'Corporate Income Tax (30%)' | 'Customs & Tariff' | 'Bank Stamp Duty' | 'Withholding Tax (2%)';
  sourceTransaction: string;
  grossAmountUSD: number;
  taxRatePercent: number;
  taxDeductedUSD: number;
  recipientEntity: 'Federal Ministry of Finance' | 'National Bank Revenue Authority' | 'Municipal Commercial Tax';
  status: 'Remitted' | 'Processed & Queued';
  filingNumber: string;
  date: string;
}

export interface SOPProcedure {
  stepNumber: number;
  title: string;
  objective: string;
  prerequisites: string[];
  instructions: string[];
  complianceLaw: string;
  notes: string;
}
