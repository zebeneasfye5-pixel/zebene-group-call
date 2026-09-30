import React from 'react';
import { TabType } from '../types';
import { Crown, Globe, ShieldCheck, Landmark, Scale, HeartHandshake } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenMasterKeyPrompt: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenMasterKeyPrompt }) => {
  return (
    <footer className="border-t border-amber-500/20 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-display font-bold text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold shadow-md gold-glow">
                <Crown className="h-4 w-4" />
              </div>
              <span>Zebene Asfye International Communication</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Global multi-purpose platform connecting live golden chair studio broadcasting, bank-direct humanitarian aid, workforce task earnings, and fair-value commodity trade.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('studio')}
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Golden Chair Studio
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setActiveTab('aid-donations')}
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Bank Aid & Donations
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Workforce Tasks
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setActiveTab('trade')}
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Commodity Trade
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenMasterKeyPrompt}
              className="text-amber-400 hover:text-amber-300 font-mono font-bold transition-colors"
            >
              Master Key (1224)
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Biometric Right Thumb & Eyeprint Passcode Enforced · 15% VAT Statutory Remittance</span>
          </div>

          <div className="text-slate-400">
            © 2026 Zebene Asfye International Communication. All Sovereign Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
