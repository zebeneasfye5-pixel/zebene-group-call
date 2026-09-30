import React from 'react';
import { TabType, Currency, ParticipantProfile } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Building2, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  Receipt, 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  Landmark,
  ArrowRight,
  Video,
  Fingerprint,
  Eye,
  QrCode
} from 'lucide-react';

interface HeroOverviewProps {
  setActiveTab: (tab: TabType) => void;
  currency: Currency;
  onOpenTradeModal: () => void;
  totalTradingVolumeUSD: number;
  totalTaxRemittedUSD: number;
  totalOwnerRevenueUSD: number;
  currentParticipant: ParticipantProfile;
  onOpenBiometricsModal: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  setActiveTab,
  currency,
  onOpenTradeModal,
  totalTradingVolumeUSD,
  totalTaxRemittedUSD,
  totalOwnerRevenueUSD,
  currentParticipant,
  onOpenBiometricsModal
}) => {
  const modules = [
    {
      id: 'video-voice' as TabType,
      title: 'Group Video & Voice Conferencing (ZegoCloud)',
      desc: 'Real-time multi-party teleconferencing powered by ZegoCloud Prebuilt UI Kit with multi-participant grid view layout, mic/camera toggles, and native screen sharing.',
      icon: Video,
      highlight: 'ZegoCloud Prebuilt & Screen Share'
    },
    {
      id: 'information' as TabType,
      title: 'Information Exchange & Control',
      desc: 'Secure dispatch of economic advisories, trade circulars, and governmental bulletins with cryptographic SHA-256 integrity verification.',
      icon: Layers,
      highlight: '4 Access Security Tiers'
    },
    {
      id: 'ideas-game' as TabType,
      title: 'Generational Idea & Gift Gaming',
      desc: 'Civic educational games rewarding generational ideas on clean water, renewable energy, and agricultural innovation with gift tokens.',
      icon: Sparkles,
      highlight: 'Interactive Quiz & Gift Box'
    },
    {
      id: 'trading' as TabType,
      title: 'International Product Trading',
      desc: 'Institutional marketplace for high-grade Arabica coffee, solar modules, sesame seeds, and electrolytic copper with escrow protection.',
      icon: TrendingUp,
      highlight: 'Verified Export Commodities'
    },
    {
      id: 'expense-income' as TabType,
      title: 'Expense-to-Income Engine',
      desc: 'Algorithmic liquidity routing converting operational shipping, storage, and transaction expenses into residual institutional yield offsets.',
      icon: Layers,
      highlight: '6.8% Cashflow Offset Vault'
    },
    {
      id: 'banking' as TabType,
      title: 'Global Bank Clearinghouse',
      desc: 'Direct electronic interconnectivity with Commercial Bank of Ethiopia (CBE), AfDB, Standard Chartered, and Fedwire ISO 20022 rails.',
      icon: Landmark,
      highlight: '$762.9M Verified Liquidity'
    },
    {
      id: 'procedure-guide' as TabType,
      title: 'Zeben Standard Operating Procedures',
      desc: 'Comprehensive step-by-step procedures and knowledge manual for navigating every feature and trade protocol of the application.',
      icon: BookOpen,
      highlight: '7-Step Official SOP'
    },
    {
      id: 'tax-clearance' as TabType,
      title: 'Government & Bank Tax Portal',
      desc: 'Automated VAT (15%), customs tariffs, withholding taxes, and bank stamp duties calculation with direct remittance to public treasuries.',
      icon: Receipt,
      highlight: 'Zero-Evasion Audit Trails'
    },
    {
      id: 'owner-revenue' as TabType,
      title: 'Owner Revenue & Treasury Governance',
      desc: 'Transparent institutional financial model detailing owner platform revenues (commissions & licensing) alongside strict non-dividend member rules.',
      icon: Building2,
      highlight: 'Institutional Founder Treasury'
    },
    {
      id: 'legal-compliance' as TabType,
      title: 'International Ethical & Financial Laws',
      desc: 'Rigorous compliance with FATF AML/CFT standards, Basel III capital ratios, AfCFTA trade rules of origin, and UN SDG ethical charters.',
      icon: Scale,
      highlight: '100% Verified Jurisprudence'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Visual Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="relative h-96 w-full sm:h-[460px]">
          <img
            src="/images/hero_banner.jpg"
            alt="Zebene Asfye International Communication Headquarters"
            className="h-full w-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/zebene_hero_banner_1790671643764.jpg';
            }}
          />
          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span>Biometric Registered Protocol</span>
                <span aria-hidden="true">·</span>
                <span>Zebene Asfye Global Telecommunications</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Right Thumb & Eye Verified
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                Zebene Asfye International Communication
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Advanced global telecommunication platform combining verified biometric thumb and retinal identity, direct video and voice communication, universal speech translation, generational civic idea gaming, international commodity trading, and automated tax compliance under sovereign governance.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('video-voice')}
                  className="rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Video className="h-4 w-4" />
                  <span>Start Direct Video Call</span>
                </button>
                <button
                  onClick={onOpenBiometricsModal}
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Fingerprint className="h-4 w-4" />
                  <span>View Biometric Code #{currentParticipant.codeNumber}</span>
                </button>
                <button
                  onClick={() => setActiveTab('trading')}
                  className="rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  Execute Commodity Trade
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabular Numerical Vital Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 border-t border-slate-800 bg-slate-950/90 p-4 sm:p-6 text-slate-300">
          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Global Trade Executed</span>
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white tabular-nums">
              {formatCurrency(totalTradingVolumeUSD, currency)}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Escrow secured commodities</span>
          </div>

          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Connected Bank Liquidity</span>
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-emerald-400 tabular-nums">
              {formatCurrency(762900000, currency)}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Across CBE, AfDB & International rails</span>
          </div>

          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Government Taxes Remitted</span>
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-cyan-400 tabular-nums">
              {formatCurrency(totalTaxRemittedUSD, currency)}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Automated VAT, custom & stamp duty</span>
          </div>

          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1">Platform Owner Revenue</span>
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-amber-400 tabular-nums">
              {formatCurrency(totalOwnerRevenueUSD, currency)}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Institutional commissions & royalties</span>
          </div>
        </div>
      </section>

      {/* Participant Biometric Passport Spotlight Card */}
      <section className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Registered Participant Passport & Biometric Key</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Participant Code: <span className="font-mono text-amber-400 tracking-wider">{currentParticipant.codeNumber}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Every participant on Zebene Asfye International Communication is assigned a unique cryptographic code number upon scanning the <strong>thumb of their right hand</strong> and the <strong>retinal print of their right eye</strong>. This verifies non-reputable authenticity for direct video calls, banking settlements, and international trade.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Fingerprint className="h-3.5 w-3.5" />
                <span>Right Thumb: Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Eye className="h-3.5 w-3.5" />
                <span>Right Eye: Verified</span>
              </div>
            </div>

            <button
              onClick={onOpenBiometricsModal}
              className="rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
            >
              Verify / Update Biometrics
            </button>
          </div>
        </div>
      </section>

      {/* Founder & Governance Architecture Statement */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-amber-500/30 bg-slate-800">
            <img
              src="/images/avatar_director.jpg"
              alt="Director Zebene Asfye Executive Office"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/avatar_director_zebene_1790671691311.jpg';
              }}
            />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <span>Executive Charter & Sovereign Integrity</span>
              <span aria-hidden="true">·</span>
              <span>Founder Zebene Asfye Protocol</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Institutional Economic Model & Member Stewardship
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Zebene Asfye International Communication operates under a clear, lawful separation of platform economics: the system generates high-volume platform income for the owner (via standardized trade commissions, bank settlement fees, and institutional telecommunication licensing) while maintaining zero-dividend status for members. Members access uncompromised transactional utility, direct video & voice communication, global bank clearing, and generational gift gaming free from speculative manipulation.
            </p>
          </div>
          <div className="shrink-0 flex gap-2">
            <button
              onClick={() => setActiveTab('owner-revenue')}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              Inspect Economics
            </button>
          </div>
        </div>
      </section>

      {/* Core Operational Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Ecosystem Modules</h2>
            <p className="text-xs text-slate-400">Integrated suite of cross-border communication and operational technologies</p>
          </div>
          <div className="text-xs text-slate-500">
            10 Operational Pillars Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-5 hover:border-amber-500/40 hover:bg-slate-900 transition-all cursor-pointer shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      {m.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-amber-400 transition-colors">
                  <span>Open Module</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
