export type TabType = 
  | 'studio'
  | 'conference'
  | 'thrones'
  | 'lottery'
  | 'trade'
  | 'tasks'
  | 'aid-donations'
  | 'chat-exchange'
  | 'gifts'
  | 'taxes'
  | 'guide'
  | 'master-control';

export type Currency = 'USD' | 'ETB' | 'EUR' | 'GBP' | 'KES' | 'AED' | 'CNY';

export type Language = 
  | 'en' // English
  | 'am' // Amharic
  | 'om' // Oromo
  | 'ti' // Tigrinya
  | 'ar' // Arabic
  | 'fr' // French
  | 'es' // Spanish
  | 'zh' // Chinese
  | 'sw' // Swahili
  | 'de'; // German

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  voiceLang: string;
}

export interface MemberProfile {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  country: string;
  thumbprintVerified: boolean;
  thumbprintHash: string;
  eyeprintVerified: boolean;
  eyeprintHash: string;
  fourDigitCode: string; // The 4-digit secret passcode (e.g. "5831")
  registeredDate: string;
  isGoldenChairMember: boolean;
  balanceUSD: number;
  tasksCompleted: number;
  donationsGivenUSD: number;
  avatarUrl?: string;
  status: 'Active' | 'VIP Golden Member' | 'Under Review';
}

export interface HumanitarianAidDrive {
  id: string;
  title: string;
  cause: 'Drought Relief & Clean Water' | 'School Nutrition & Books' | 'Emergency Medical Supplies' | 'Farmer Micro-Grants';
  region: string;
  targetUSD: number;
  collectedUSD: number;
  donorCount: number;
  connectedBank: string;
  bankAccountNumber: string;
  imageUrl: string;
  beneficiariesCount: number;
  status: 'Active Collection' | 'Fully Disbursed';
  recentDonations: {
    donorName: string;
    donorCountry: string;
    amountUSD: number;
    amountETB: number;
    date: string;
    bankReference: string;
  }[];
}

export interface WorkforceTask {
  id: string;
  title: string;
  category: 'Agricultural Inspection' | 'Language Translation' | 'Trade Verification' | 'Digital Cataloging' | 'Community Outreach';
  rewardUSD: number;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Specialist';
  employer: string;
  country: string;
  availablePositions: number;
  filledPositions: number;
  description: string;
  skillsRequired: string[];
}

export interface TradeCommodity {
  id: string;
  name: string;
  category: 'Agricultural Product' | 'Clean Energy' | 'Artisan Craft' | 'Mineral Commodity';
  priceUSD: number; // Reasonable, non-exaggerated
  unit: string;
  stockAvailable: number;
  originCountry: string;
  qualityCertificate: string;
  imageUrl: string;
  minimumOrder: number;
  description: string;
}

export interface TradeTransaction {
  id: string;
  commodityName: string;
  buyerName: string;
  sellerName: string;
  quantity: number;
  unit: string;
  subtotalUSD: number;
  vatTax15USD: number; // 15% VAT
  platformFeeUSD: number; // 1.85% realistic platform fee
  totalPaidUSD: number;
  bankRail: string;
  date: string;
  status: 'Escrow Locked' | 'Delivered & Released';
}

export interface LiveChatMessage {
  id: string;
  senderName: string;
  senderCountry: string;
  senderFourDigit: string;
  isGoldenChair: boolean;
  text: string;
  time: string;
  originalLanguage: string;
}

export interface CountryStatistic {
  country: string;
  flag: string;
  memberCount: number;
  percentage: number;
}

export type ThroneCategory = 'ideas-peace' | 'tech-knowledge' | 'charitable-deeds';

export interface WorldAward {
  id: string;
  name: string;
  throneCategory: ThroneCategory;
  honoraryTitle: string;
  grantAmountUSD: number;
  grantAmountETB: number;
  medalDesign: string;
  decreeSummary: string;
}

export interface LaureateNominee {
  id: string;
  name: string;
  title: string;
  country: string;
  countryFlag: string;
  throneCategory: ThroneCategory;
  avatarUrl: string;
  biography: string;
  keyContribution: string;
  impactMetrics: {
    metric: string;
    value: string;
  }[];
  endorsementsCount: number;
  status: 'Seated on Throne' | 'Distinguished Nominee' | 'Laureate Emeritus';
  conferredAward: string;
  grantAmountUSD: number;
  grantAmountETB: number;
  awardDate: string;
  fourDigitCode: string;
  biometricHash: string;
  worldAddressSpeech: string;
  nominatedBy: string;
}

export interface ThroneDefinition {
  id: ThroneCategory;
  name: string;
  amharicTitle: string;
  subtitle: string;
  description: string;
  accentColor: string;
  badgeTheme: string;
  mandate: string;
  currentLaureateId: string;
  totalLaureatesBestowed: number;
  totalEndowmentUSD: number;
}

export type LotteryPrizeTier = 'house' | 'car' | 'phones' | 'special';

export interface LotteryPrize {
  id: string;
  tier: LotteryPrizeTier;
  title: string;
  amharicTitle: string;
  quantity: number;
  estimatedValueUSD: number;
  estimatedValueETB: number;
  imageUrl: string;
  description: string;
  specifications: string[];
  taxStatus: string;
}

export interface LotteryTicket {
  id: string;
  ticketNumber: string;
  memberId: string;
  memberName: string;
  memberCountry: string;
  purchaseDate: string;
  priceUSD: number;
  drawDate: string;
  status: 'Active' | 'Drawn - Winner' | 'Drawn - Non-Winning';
  wonPrize?: string;
  verificationHash: string;
}

export interface PastLotteryWinner {
  id: string;
  year: number;
  winnerName: string;
  winnerCountry: string;
  winnerCountryFlag: string;
  ticketNumber: string;
  prizeWon: string;
  prizeTier: LotteryPrizeTier;
  valueUSD: number;
  valueETB: number;
  handoverDate: string;
  photoUrl: string;
  bankAuditRef: string;
  testimonial: string;
}
