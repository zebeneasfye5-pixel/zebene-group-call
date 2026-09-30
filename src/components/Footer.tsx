import React from 'react';
import { TabType } from '../types';
import { Globe, ShieldCheck, Landmark, Scale } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Globe className="h-5 w-5 text-amber-400" />
              <span>Zebene Asfye International Communication</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Global sovereign telecommunication and trade platform integrating biometric thumb and retinal registration, unique participant codes, direct video and voice calling, universal speech translation, generational idea gaming, product trading, expense-to-income generation, bank connectivity, international ethical laws, and automated government tax remittances.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> ISO 20022 Compliant
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Landmark className="h-3.5 w-3.5" /> CBE & AfDB Connected
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Scale className="h-3.5 w-3.5" /> FATF Audited
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] block">
              Core Operations
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('information')} className="hover:text-amber-400 transition-colors">
                  Information Exchange & Control
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ideas-game')} className="hover:text-amber-400 transition-colors">
                  Generational Idea Gaming
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trading')} className="hover:text-amber-400 transition-colors">
                  Product & Commodity Trade
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('expense-income')} className="hover:text-amber-400 transition-colors">
                  Expense-to-Income Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('banking')} className="hover:text-amber-400 transition-colors">
                  Connected Banking Rails
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Zeben SOP */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] block">
              Governance & Manual
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('procedure-guide')} className="hover:text-amber-400 transition-colors">
                  Zeben Operating Procedures (SOP)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tax-clearance')} className="hover:text-amber-400 transition-colors">
                  Government & Bank Taxes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('owner-revenue')} className="hover:text-amber-400 transition-colors">
                  Owner Revenue Architecture
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('legal-compliance')} className="hover:text-amber-400 transition-colors">
                  International Ethical Laws
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Regulatory Notice */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Zebene International Multi-purpose Application. All sovereign and intellectual property rights reserved.
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            Platform monetization accrues exclusively to the application owner. Members operate under strict non-dividend utility terms.
          </div>
        </div>
      </div>
    </footer>
  );
};
