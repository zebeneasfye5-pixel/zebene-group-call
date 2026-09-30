import React, { useState } from 'react';
import { TabType, Currency, MemberProfile } from '../types';
import { CURRENCY_RATES } from '../utils/formatters';
import { 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  Crown, 
  KeyRound, 
  Sparkles,
  Coins,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  currentMember: MemberProfile;
  isMasterUnlocked: boolean;
  onOpenMasterKeyPrompt: () => void;
  onLockMember: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  currentMember,
  isMasterUnlocked,
  onOpenMasterKeyPrompt,
  onLockMember
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: TabType; label: string; icon?: any }[] = [
    { id: 'studio', label: 'Golden Chair Studio' },
    { id: 'conference', label: 'Group Conference (Zoom/Hala)' },
    { id: 'thrones', label: '3 World Thrones & Awards' },
    { id: 'lottery', label: 'Annual Lottery (House/Car/Phones)' },
    { id: 'aid-donations', label: 'Bank Aid & Donations' },
    { id: 'tasks', label: 'Workforce & Tasks' },
    { id: 'trade', label: 'Commodity Trade' },
    { id: 'chat-exchange', label: 'Live Global Chat' },
    { id: 'taxes', label: '15% VAT & Taxes' },
    ...(isMasterUnlocked ? [{ id: 'master-control' as TabType, label: 'Master Console (1224)' }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Wordmark & Golden Chair VIP Seal */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('studio')} 
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold shadow-md gold-glow">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold font-display tracking-tight text-white group-hover:text-amber-300 transition-colors block leading-tight">
                Zebene Asfye International Communication
              </span>
              <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                <span>The Golden Chair Studio</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">Biometric Authenticated</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === item.id 
                  ? item.id === 'master-control'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'hover:text-white hover:bg-slate-900 text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Member 4-Digit Passcode Badge, Master Key 1224 Button, Currency Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Master Key 1224 Button */}
          <button
            onClick={() => {
              if (isMasterUnlocked) {
                setActiveTab('master-control');
              } else {
                onOpenMasterKeyPrompt();
              }
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              isMasterUnlocked
                ? 'bg-amber-500 text-slate-950 border border-amber-400 shadow-md'
                : 'border border-amber-500/30 bg-slate-900 text-amber-400 hover:border-amber-500'
            }`}
            title="Secret Master Builder Key (1224)"
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span className="font-mono text-[11px]">
              {isMasterUnlocked ? 'Console (1224)' : 'Key: 1224'}
            </span>
          </button>

          {/* Member 4-Digit Passcode Pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <div className="text-left leading-none">
              <span className="text-[9px] text-slate-400 block">4-DIGIT CODE:</span>
              <span className="font-bold text-amber-300">#{currentMember.fourDigitCode}</span>
            </div>
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="appearance-none rounded-xl border border-slate-800 bg-slate-900 pl-2.5 pr-7 py-1.5 text-xs font-mono font-bold text-amber-300 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              {(Object.keys(CURRENCY_RATES) as Currency[]).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 font-mono block">YOUR MEMBER PASSCODE:</span>
              <span className="text-sm font-bold text-amber-300 font-mono">#{currentMember.fourDigitCode}</span>
              <span className="text-xs text-white block">{currentMember.fullName} ({currentMember.country})</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
              Biometrics Cleared
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={() => {
                onOpenMasterKeyPrompt();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>Unlock Secret Key 1224</span>
            </button>
            <button
              onClick={() => {
                onLockMember();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-rose-400 underline"
            >
              Exit / Lock Screen
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
