import React, { useState } from 'react';
import { TabType, Currency, ParticipantProfile } from '../types';
import { CURRENCY_RATES } from '../data/mockData';
import { 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  Coins,
  Video,
  Fingerprint,
  Eye,
  KeyRound
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenTradeModal: () => void;
  currentParticipant: ParticipantProfile;
  onOpenBiometricsModal: () => void;
  isMasterUnlocked: boolean;
  onOpenMasterKeyPrompt: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  onOpenTradeModal,
  currentParticipant,
  onOpenBiometricsModal,
  isMasterUnlocked,
  onOpenMasterKeyPrompt
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseNavLinks: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    ...(isMasterUnlocked ? [{ id: 'master-control' as TabType, label: 'Master Console (1224)' }] : []),
    { id: 'video-voice', label: 'Group Conferencing (ZegoCloud)' },
    { id: 'information', label: 'Information' },
    { id: 'ideas-game', label: 'Idea Gaming' },
    { id: 'trading', label: 'Commodity Trade' },
    { id: 'expense-income', label: 'Expense Engine' },
    { id: 'banking', label: 'Banking Rails' },
    { id: 'procedure-guide', label: 'Zeben SOP Guide' },
    { id: 'tax-clearance', label: 'Gov Taxes' },
    { id: 'owner-revenue', label: 'Owner Treasury' },
    { id: 'legal-compliance', label: 'Ethics & Laws' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('overview')} 
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:border-amber-400/60 transition-colors">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                Zebene Asfye International Communication
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links with subtle underlines */}
        <nav className="hidden xl:flex items-center gap-4 text-sm font-medium text-slate-300">
          {baseNavLinks.slice(0, 7).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative py-1 text-xs uppercase tracking-wider transition-colors hover:text-white whitespace-nowrap cursor-pointer ${
                activeTab === item.id 
                  ? item.id === 'master-control' ? 'text-amber-300 font-bold bg-amber-500/10 px-2 rounded border border-amber-500/30' : 'text-amber-400 font-semibold' 
                  : item.id === 'master-control' ? 'text-amber-400 font-bold' : 'text-slate-400'
              }`}
            >
              {item.label}
              {activeTab === item.id && item.id !== 'master-control' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          ))}
          
          {/* Secondary tabs dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 py-1 text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer">
              <span>More</span>
              <span className="text-[10px] text-slate-500">▼</span>
            </button>
            <div className="absolute right-0 mt-2 hidden w-48 rounded-lg border border-slate-800 bg-slate-900 p-1.5 shadow-xl group-hover:block">
              {baseNavLinks.slice(7).map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => setActiveTab(subItem.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors cursor-pointer ${
                    activeTab === subItem.id ? 'bg-amber-500/10 text-amber-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {subItem.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Zone 3: Master Key 1224 Button, Participant Biometric Code Badge & Currency Switcher */}
        <div className="flex items-center gap-2">
          {/* Master Key 1224 Button */}
          <button
            onClick={() => {
              if (isMasterUnlocked) {
                setActiveTab('master-control');
              } else {
                onOpenMasterKeyPrompt();
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              isMasterUnlocked
                ? 'bg-amber-500 text-slate-950 font-bold border border-amber-400 shadow-md'
                : 'border border-amber-500/30 bg-slate-900/90 text-amber-400 hover:border-amber-500 hover:bg-slate-800'
            }`}
            title={isMasterUnlocked ? 'Master Builder Console Active' : 'Enter Master Key (1224) to command systems'}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-mono text-[11px]">
              {isMasterUnlocked ? 'Console (1224)' : 'Key: 1224'}
            </span>
          </button>

          {/* Participant Code & Biometric Badge */}
          <button
            onClick={onOpenBiometricsModal}
            className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
            title="Click to view or verify Right Thumb & Right Eye Biometric Identity"
          >
            <div className="flex items-center gap-1 text-emerald-400">
              <Fingerprint className="h-3.5 w-3.5" />
              <Eye className="h-3.5 w-3.5" />
            </div>
            <div className="hidden sm:block text-left font-mono">
              <span className="text-[9px] uppercase tracking-wider text-amber-400 block leading-tight">Code No:</span>
              <span className="text-white font-bold text-[11px] leading-tight">{currentParticipant.codeNumber}</span>
            </div>
          </button>

          {/* Currency Selector */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs">
            <Coins className="h-3.5 w-3.5 text-amber-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-slate-200 text-xs font-mono font-medium focus:outline-none cursor-pointer"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-200">
                  {c} ({CURRENCY_RATES[c as Currency].symbol.trim()})
                </option>
              ))}
            </select>
          </div>

          {/* Direct Video Connection Shortcut */}
          <button
            onClick={() => setActiveTab('video-voice')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap cursor-pointer ${
              activeTab === 'video-voice' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <Video className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Direct Video</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span>Navigation Modules</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Biometrics Verified
            </span>
          </div>

          {/* Master Key button in mobile drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (isMasterUnlocked) {
                setActiveTab('master-control');
              } else {
                onOpenMasterKeyPrompt();
              }
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-xs text-amber-300 font-bold"
          >
            <span className="flex items-center gap-1.5">
              <KeyRound className="h-4 w-4" />
              <span>{isMasterUnlocked ? 'Master Builder Console Active (1224)' : 'Unlock Master Builder Key (1224)'}</span>
            </span>
            <span className="font-mono text-[10px] text-amber-400">1224</span>
          </button>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-400 font-mono block">Your Participant Code:</span>
              <span className="font-mono font-bold text-white text-xs">{currentParticipant.codeNumber}</span>
            </div>
            <button
              onClick={() => {
                onOpenBiometricsModal();
                setMobileMenuOpen(false);
              }}
              className="text-[11px] text-amber-300 font-semibold underline"
            >
              Biometrics
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {baseNavLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors ${
                  activeTab === item.id 
                    ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30' 
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
