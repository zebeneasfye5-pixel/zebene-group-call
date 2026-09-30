import React, { useState } from 'react';
import { Currency } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  Lock, 
  Scale, 
  Award,
  Wallet
} from 'lucide-react';

interface OwnerRevenueAnalyticsProps {
  currency: Currency;
  totalOwnerRevenueUSD: number;
}

export const OwnerRevenueAnalytics: React.FC<OwnerRevenueAnalyticsProps> = ({
  currency,
  totalOwnerRevenueUSD
}) => {
  const [projectedMonthlyVolume, setProjectedMonthlyVolume] = useState<number>(50000000); // 50M USD
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fee model rates
  const tradeFeeRate = 0.0185; // 1.85%
  const bankRoutingRate = 0.0045; // 0.45%
  const taxAdminRate = 0.0025; // 0.25%

  const ownerTradeRevenueUSD = projectedMonthlyVolume * tradeFeeRate;
  const ownerBankRoutingUSD = projectedMonthlyVolume * bankRoutingRate;
  const ownerTaxAdminUSD = projectedMonthlyVolume * taxAdminRate;
  const enterpriseLicensesUSD = 180 * 2500; // 180 enterprise partners @ 2500
  const monthlyTotalOwnerIncomeUSD = ownerTradeRevenueUSD + ownerBankRoutingUSD + ownerTaxAdminUSD + (enterpriseLicensesUSD / 12);
  const annualTotalOwnerIncomeUSD = monthlyTotalOwnerIncomeUSD * 12;

  const handleDownloadReport = () => {
    setToastMessage('Sovereign Owner Treasury Audited Income Statement exported.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Sovereign Corporate Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Platform Economics & Treasury</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Owner Revenue & Treasury Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Institutional financial framework detailing platform owner income streams (trade commissions, interbank clearing spreads, enterprise licensing) alongside the lawful non-dividend utility policy for members.
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Award className="h-4 w-4" />
          <span>Download Owner Treasury Audit</span>
        </button>
      </div>

      {/* Mandatory Regulatory Policy Statement: Owner vs Member */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Owner Side */}
        <div className="rounded-xl border border-amber-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Building2 className="h-4 w-4" />
            <span>Platform Owner Financial Model (High Income Yield)</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Comprehensive Institutional Platform Monetization
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The platform generates substantial, compounding enterprise revenue exclusively for the Application Owner and Sovereign Treasury. Every transaction across trade contracts, interbank settlements, tax clearance, and enterprise access generates guaranteed royalty percentages without speculative risk.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-amber-300">
            <span className="bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">1.85% Trade Commission</span>
            <span className="bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">0.45% Bank Routing</span>
            <span className="bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">$2,500/yr Partner License</span>
          </div>
        </div>

        {/* Member Side */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Lock className="h-4 w-4 text-slate-400" />
            <span>Member Participation Charter (Strict Utility Access)</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Zero Dividend Distribution to Members
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Members participate strictly as utility and transaction operators. The application explicitly does <strong className="text-slate-200">not generate dividends, equity, or passive investment income for its members</strong>. This institutional structure guarantees compliance with international securities laws and protects users from speculative bubbles.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">100% Escrow Protection</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Direct Bank Clearing</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Zero Speculative Dividends</span>
          </div>
        </div>
      </div>

      {/* Owner Revenue Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Cumulative Owner Gross Revenue</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400 tabular-nums">
            {formatCurrency(totalOwnerRevenueUSD + 42800000, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">From launch to Q3 2026</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Owner Net Retained Profit</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tabular-nums">
            {formatCurrency(28620000, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">After infrastructure & auditing expenses</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Bank Partnership Royalties</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tabular-nums">
            {formatCurrency(6230000, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">SWIFT & CBE transaction shares</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Sovereign Capital Reserves</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
            {formatCurrency(125000000, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">Held in central bank vaults</span>
        </div>
      </div>

      {/* Interactive Owner Revenue Projection Simulator */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">
              Owner Monthly Revenue Projection Engine
            </h2>
            <p className="text-xs text-slate-400">
              Simulate platform owner cashflow based on global marketplace trade and banking volumes
            </p>
          </div>
          <span className="font-mono text-xs text-amber-400">Owner Take-Rate: ~2.55% Combined</span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
              <span>Simulated Monthly Platform Trading & Settlement Volume:</span>
              <span className="font-mono text-white font-bold">{formatCurrency(projectedMonthlyVolume, currency)}/mo</span>
            </div>
            <input
              type="range"
              min="10000000"
              max="200000000"
              step="5000000"
              value={projectedMonthlyVolume}
              onChange={(e) => setProjectedMonthlyVolume(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Product Trade Commissions (1.85%):</span>
              <span className="text-white font-bold text-base tabular-nums">
                {formatCurrency(ownerTradeRevenueUSD, currency)}/mo
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Bank Gateway Spread (0.45%):</span>
              <span className="text-cyan-400 font-bold text-base tabular-nums">
                {formatCurrency(ownerBankRoutingUSD, currency)}/mo
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block">Tax Remittance Processing (0.25%):</span>
              <span className="text-emerald-400 font-bold text-base tabular-nums">
                {formatCurrency(ownerTaxAdminUSD, currency)}/mo
              </span>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-300 block">
                Total Projected Annual Revenue to Platform Owner
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                {formatCurrency(annualTotalOwnerIncomeUSD, currency)}
              </span>
            </div>

            <div className="text-right text-xs text-slate-400 font-mono">
              <span className="block text-slate-300">100% Platform Retained</span>
              <span>Zero member dividend obligation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
