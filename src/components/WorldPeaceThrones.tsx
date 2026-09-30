import React, { useState } from 'react';
import { 
  MemberProfile, 
  Currency, 
  ThroneCategory, 
  ThroneDefinition, 
  LaureateNominee, 
  WorldAward 
} from '../types';
import { 
  WORLD_THRONES, 
  WORLD_AWARDS, 
  INITIAL_LAUREATES 
} from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { 
  Crown, 
  Award, 
  Medal, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Heart, 
  Cpu, 
  Lightbulb, 
  Globe, 
  Users, 
  Share2, 
  Send, 
  ThumbsUp, 
  Check, 
  FileText, 
  Coins, 
  Fingerprint, 
  Radio, 
  ArrowUpRight, 
  Plus, 
  ExternalLink 
} from 'lucide-react';

interface WorldPeaceThronesProps {
  currentMember: MemberProfile;
  currency: Currency;
  isMasterUnlocked?: boolean;
}

export const WorldPeaceThrones: React.FC<WorldPeaceThronesProps> = ({
  currentMember,
  currency,
  isMasterUnlocked = false
}) => {
  // Active selected throne
  const [selectedThroneId, setSelectedThroneId] = useState<ThroneCategory>('ideas-peace');
  const [nominees, setNominees] = useState<LaureateNominee[]>(INITIAL_LAUREATES);
  const [awards] = useState<WorldAward[]>(WORLD_AWARDS);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | ThroneCategory>('all');
  
  // Interactive Modals
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false);
  const [selectedLaureateForDecree, setSelectedLaureateForDecree] = useState<LaureateNominee | null>(null);
  
  // Text-To-Speech audio player state
  const [isPlayingSpeechId, setIsPlayingSpeechId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Nomination form state
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeTitle, setNomineeTitle] = useState('');
  const [nomineeCountry, setNomineeCountry] = useState('Ethiopia');
  const [nomineeCategory, setNomineeCategory] = useState<ThroneCategory>('ideas-peace');
  const [nomineeContribution, setNomineeContribution] = useState('');
  const [nomineeSpeech, setNomineeSpeech] = useState('');

  // Active throne definition
  const currentThrone = WORLD_THRONES.find(t => t.id === selectedThroneId) || WORLD_THRONES[0];
  
  // Currently seated laureate for active throne
  const seatedLaureate = nominees.find(
    n => n.throneCategory === selectedThroneId && n.status === 'Seated on Throne'
  ) || nominees.find(n => n.throneCategory === selectedThroneId);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Play Speech Handler using Web Speech Synthesis
  const handlePlaySpeech = (laureate: LaureateNominee) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Audio speech synthesizer not supported on this browser.');
      return;
    }

    if (isPlayingSpeechId === laureate.id) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeechId(null);
      showToast('Speech playback paused.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(laureate.worldAddressSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingSpeechId(null);
    };

    utterance.onerror = () => {
      setIsPlayingSpeechId(null);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingSpeechId(laureate.id);
    showToast(`Broadcasting speech by ${laureate.name}...`);
  };

  // Endorse candidate
  const handleEndorseNominee = (id: string, name: string) => {
    setNominees(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, endorsementsCount: n.endorsementsCount + 1 };
      }
      return n;
    }));
    showToast(`Your sovereign endorsement has been recorded for ${name}!`);
  };

  // Confer Award & Seat on Throne
  const handleConferAward = (laureateId: string, awardTitle: string) => {
    setNominees(prev => prev.map(n => {
      if (n.id === laureateId) {
        return {
          ...n,
          status: 'Seated on Throne' as const,
          conferredAward: awardTitle,
          awardDate: new Date().toISOString().split('T')[0]
        };
      }
      // If someone else in this category was seated, transition them to Laureate Emeritus
      if (n.throneCategory === selectedThroneId && n.status === 'Seated on Throne' && n.id !== laureateId) {
        return {
          ...n,
          status: 'Laureate Emeritus' as const
        };
      }
      return n;
    }));

    showToast(`High Decree Conferred: Seated upon the Throne of Honor with full world recognition!`);
    setSelectedLaureateForDecree(null);
  };

  // Submit nomination
  const handleSubmitNomination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomineeName.trim() || !nomineeContribution.trim()) {
      showToast('Please provide candidate name and key contribution.');
      return;
    }

    const flagMap: Record<string, string> = {
      Ethiopia: '🇪🇹',
      Kenya: '🇰🇪',
      'United States': '🇺🇸',
      Switzerland: '🇨🇭',
      Japan: '🇯🇵',
      'United Arab Emirates': '🇦🇪',
      France: '🇫🇷',
      Germany: '🇩🇪',
      Rwanda: '🇷🇼',
      Ghana: '🇬🇭',
      Brazil: '🇧🇷',
      India: '🇮🇳'
    };

    const newNominee: LaureateNominee = {
      id: `LAUR-${Date.now().toString().slice(-4)}`,
      name: nomineeName.trim(),
      title: nomineeTitle.trim() || 'Global Candidate of Distinction',
      country: nomineeCountry,
      countryFlag: flagMap[nomineeCountry] || '🌐',
      throneCategory: nomineeCategory,
      avatarUrl: '/images/director_zebene.jpg',
      biography: `Nominated by verified member #${currentMember.fourDigitCode} (${currentMember.fullName}) with biometric seal.`,
      keyContribution: nomineeContribution.trim(),
      impactMetrics: [
        { metric: 'Verified Impact', value: 'Council Certified' },
        { metric: 'Initial Quorum', value: '1 Endorsement' }
      ],
      endorsementsCount: 1,
      status: 'Distinguished Nominee',
      conferredAward: 'Pending Sovereign Acclamation',
      grantAmountUSD: 15000,
      grantAmountETB: 2325000,
      awardDate: new Date().toISOString().split('T')[0],
      fourDigitCode: `${Math.floor(1000 + Math.random() * 9000)}`,
      biometricHash: `THUMB-RH-SHA256:${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      worldAddressSpeech: nomineeSpeech.trim() || 'We dedicate our collective intellect and moral labor to uplifting human consciousness and securing enduring peace across all continents.',
      nominatedBy: `${currentMember.fullName} (Passcode #${currentMember.fourDigitCode})`
    };

    setNominees(prev => [newNominee, ...prev]);
    setIsNominateModalOpen(false);
    setNomineeName('');
    setNomineeTitle('');
    setNomineeContribution('');
    setNomineeSpeech('');
    showToast(`Nomination submitted successfully for ${newNominee.name}!`);
  };

  // Filtered nominees for roster
  const filteredNominees = activeTabFilter === 'all' 
    ? nominees 
    : nominees.filter(n => n.throneCategory === activeTabFilter);

  return (
    <div className="space-y-10">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900 px-4 py-3 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header & Regal Scope */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Crown className="h-4 w-4 text-amber-400" />
            <span>High Sovereign Council of Global Recognition</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">World Peace & Mindset Elevation</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            The Three World Thrones of Distinction
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Separate sacred thrones where distinguished people who champion better ideas for world peace, lead in technological advancement, and excel in charitable deeds are chosen, honored, and bestowed world recognition and grants.
          </p>
        </div>

        {/* Action Button: Nominate a Candidate */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsNominateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg gold-glow hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            <span>Nominate Global Leader</span>
          </button>
        </div>
      </div>

      {/* Grand Sovereign Throne Hall Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl">
        <div className="relative h-80 sm:h-[420px] w-full overflow-hidden">
          <img
            src="/images/three_world_thrones.jpg"
            alt="The Three High Thrones of World Peace"
            className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Top Sovereign Chamber Watermark */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/85 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300 backdrop-blur-md shadow-lg">
            <Radio className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
            <span>SOVEREIGN CONCLAVE: THREE THRONES CONSTITUTED</span>
          </div>

          {/* Bottom Title & Stats Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Universal Covenant of Human Elevation & Harmony
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Where Wisdom, Science & Compassion Reign
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Humanity achieves lasting peace when its greatest thinkers, technological discoverers, and selfless caregivers are elevated above petty division and crowned with global honor.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-amber-500/30 bg-slate-950/85 p-3.5 backdrop-blur-md shrink-0">
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 font-mono block">THRONES:</span>
                <span className="text-sm font-bold text-amber-300 font-display">3 Sacred</span>
              </div>
              <div className="text-center px-2 border-x border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block">LAUREATES:</span>
                <span className="text-sm font-bold text-white font-mono">37 World</span>
              </div>
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 font-mono block">ENDOWMENT:</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">$380K+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 High Thrones Navigation Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white font-display">
              Select a Sovereign Throne of Honor
            </h3>
            <p className="text-xs text-slate-400">
              Explore the mandate, currently seated laureate, and worldly recognition conferred at each seat
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400">
            Current Seat: {currentThrone.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {WORLD_THRONES.map((throne) => {
            const isSelected = throne.id === selectedThroneId;
            const categoryLaureate = nominees.find(n => n.throneCategory === throne.id && n.status === 'Seated on Throne');
            
            return (
              <button
                key={throne.id}
                onClick={() => setSelectedThroneId(throne.id)}
                className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-amber-500 bg-slate-900/90 ring-2 ring-amber-500/40 shadow-2xl gold-glow'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${throne.accentColor} opacity-10 rounded-bl-full pointer-events-none`} />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${throne.badgeTheme} flex items-center justify-center`}>
                      {throne.id === 'ideas-peace' && <Lightbulb className="h-5 w-5 text-amber-400" />}
                      {throne.id === 'tech-knowledge' && <Cpu className="h-5 w-5 text-cyan-400" />}
                      {throne.id === 'charitable-deeds' && <Heart className="h-5 w-5 text-rose-400" />}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block">TOTAL GRANTS:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {formatCurrency(throne.totalEndowmentUSD, currency)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {throne.name}
                    </h4>
                    <span className="text-[11px] font-medium text-amber-400/90 block mt-0.5">
                      {throne.amharicTitle}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {throne.subtitle}
                    </p>
                  </div>

                  {/* Currently Seated Tag */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Currently Seated:</span>
                    <span className="font-semibold text-white truncate max-w-[140px]">
                      {categoryLaureate ? categoryLaureate.name : 'Awaiting Conclave'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE SEATED LAUREATE SPOTLIGHT CHAMBER */}
      {seatedLaureate && (
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Top Throne Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 gold-glow">
                <Crown className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Seated Sovereign Laureate
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs text-slate-300 font-mono">{currentThrone.name}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {seatedLaureate.name}
                </h3>
                <span className="text-xs text-slate-400 block mt-0.5">
                  {seatedLaureate.title} ({seatedLaureate.country} {seatedLaureate.countryFlag})
                </span>
              </div>
            </div>

            {/* Award Conferred Tag */}
            <div className="rounded-2xl border border-amber-500/40 bg-slate-950/80 p-3.5 text-right shrink-0">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">CONFERRED WORLD AWARD:</span>
              <span className="text-xs font-bold text-amber-300 flex items-center justify-end gap-1.5 mt-0.5">
                <Medal className="h-4 w-4 text-amber-400" />
                <span>{seatedLaureate.conferredAward}</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                Laureate Grant: {formatCurrency(seatedLaureate.grantAmountUSD, currency)} ({formatNumber(seatedLaureate.grantAmountETB)} ETB)
              </span>
            </div>
          </div>

          {/* Laureate Profile Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Portrait & Biometric Identity Stamp */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 h-72 w-full shadow-inner">
                <img
                  src={seatedLaureate.avatarUrl}
                  alt={seatedLaureate.name}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400 backdrop-blur-md">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>BIOMETRICALLY CONSECRATED</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold">{seatedLaureate.country}</span>
                  <span className="font-mono text-amber-400">Passcode #{seatedLaureate.fourDigitCode}</span>
                </div>
              </div>

              {/* Biometric Verification Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Cryptographic Seal:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Fingerprint className="h-3 w-3" /> VERIFIED
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  Hash: {seatedLaureate.biometricHash}
                </div>
              </div>
            </div>

            {/* Middle Col: Key Contribution & Global Impact Metrics */}
            <div className="lg:col-span-2 space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Mandate of the Throne */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    THRONE MANDATE & CITATION:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentThrone.mandate}
                  </p>
                </div>

                {/* Contribution narrative */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    Key Historical Contribution to World Peace & Humanity:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    "{seatedLaureate.keyContribution}"
                  </p>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {seatedLaureate.impactMetrics.map((m, i) => (
                    <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                      <span className="text-[10px] text-slate-400 block font-mono">{m.metric}:</span>
                      <span className="text-xs font-bold text-white font-mono mt-0.5 block truncate">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* World Laureate Address & Audio Player */}
              <div className="rounded-2xl border border-amber-500/30 bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                      <Radio className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">World Peace Laureate Address</span>
                      <span className="text-[10px] text-slate-400 font-mono block">Direct High Conclave Broadcast</span>
                    </div>
                  </div>

                  {/* Play Speech Button */}
                  <button
                    onClick={() => handlePlaySpeech(seatedLaureate)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPlayingSpeechId === seatedLaureate.id
                        ? 'bg-rose-600 text-white'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                    }`}
                  >
                    {isPlayingSpeechId === seatedLaureate.id ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5" />
                        <span>Stop Speech</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>Listen to World Address</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-amber-100/90 italic leading-relaxed pl-3 border-l-2 border-amber-500">
                  "{seatedLaureate.worldAddressSpeech}"
                </p>
              </div>

              {/* Endorse & Conclave Acclamation */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <ThumbsUp className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-white">{seatedLaureate.endorsementsCount.toLocaleString()}</span>
                  <span>Global Citizen Endorsements Recorded</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEndorseNominee(seatedLaureate.id, seatedLaureate.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <ThumbsUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Endorse Laureate</span>
                  </button>

                  <button
                    onClick={() => setSelectedLaureateForDecree(seatedLaureate)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>View Sovereign Decree</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* THE DISTINGUISHED CANDIDATES & NOMINEES CONCLAVE */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white font-display">
              Distinguished Nominees & Laureate Candidates
            </h3>
            <p className="text-xs text-slate-400">
              Visionary candidates across all nations undergoing sovereign vetting and world consensus
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTabFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveTabFilter('ideas-peace')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTabFilter === 'ideas-peace' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ideas & Peace
            </button>
            <button
              onClick={() => setActiveTabFilter('tech-knowledge')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTabFilter === 'tech-knowledge' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tech Knowledge
            </button>
            <button
              onClick={() => setActiveTabFilter('charitable-deeds')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTabFilter === 'charitable-deeds' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Charitable Deeds
            </button>
          </div>
        </div>

        {/* Nominee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNominees.map(nominee => {
            const throne = WORLD_THRONES.find(t => t.id === nominee.throneCategory);
            const isSeated = nominee.status === 'Seated on Throne';

            return (
              <div
                key={nominee.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all ${
                  isSeated 
                    ? 'border-amber-500/50 bg-slate-900/90 ring-1 ring-amber-500/30' 
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Candidate Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden border border-amber-500/30 bg-slate-800 shrink-0">
                        <img src={nominee.avatarUrl} alt={nominee.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">{nominee.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono block truncate">
                          {nominee.country} {nominee.countryFlag} · Code #{nominee.fourDigitCode}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {isSeated ? (
                        <span className="flex items-center gap-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                          <Crown className="h-3 w-3 text-amber-400" />
                          SEATED
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          NOMINEE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Key Contribution */}
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400/90 block">
                      {nominee.title}
                    </span>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                      {nominee.keyContribution}
                    </p>
                  </div>

                  {/* Category Pill and Nominated by */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-amber-300">{throne?.name.split('&')[0]}</span>
                    <span>{nominee.endorsementsCount.toLocaleString()} Votes</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePlaySpeech(nominee)}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Listen</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEndorseNominee(nominee.id, nominee.name)}
                      className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ThumbsUp className="h-3 w-3 text-emerald-400" />
                      <span>Vote</span>
                    </button>

                    <button
                      onClick={() => setSelectedLaureateForDecree(nominee)}
                      className="px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-300 transition-colors cursor-pointer"
                    >
                      Decree
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: NOMINATE A DISTINGUISHED LEADER */}
      {isNominateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl border border-amber-500/40 bg-slate-900 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Nominate a Person of Global Distinction
                </h3>
              </div>
              <button
                onClick={() => setIsNominateModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNomination} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name of Nominee *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Haile Selassie Worku"
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country of Origin *</label>
                  <select
                    value={nomineeCountry}
                    onChange={(e) => setNomineeCountry(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    {['Ethiopia', 'Kenya', 'United States', 'Switzerland', 'Japan', 'United Arab Emirates', 'France', 'Germany', 'Rwanda', 'Ghana', 'Brazil', 'India'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title & Institutional Role</label>
                <input
                  type="text"
                  placeholder="e.g. Director of Water Sanitation & Civic Peacebuilding"
                  value={nomineeTitle}
                  onChange={(e) => setNomineeTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Designated Throne of Honor *</label>
                <select
                  value={nomineeCategory}
                  onChange={(e) => setNomineeCategory(e.target.value as ThroneCategory)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="ideas-peace">The Throne of Visionary Ideas & World Peace</option>
                  <option value="tech-knowledge">The Throne of Technological Knowledge & Advancement</option>
                  <option value="charitable-deeds">The Throne of Charitable Deeds & Universal Aid</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Transformation / Scientific Discovery / Humanitarian Deed *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the verifiable impact this person has accomplished for peace, knowledge, or charity..."
                  value={nomineeContribution}
                  onChange={(e) => setNomineeContribution(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Message or World Peace Declaration (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Words of guidance to bring humanity to a higher mindset..."
                  value={nomineeSpeech}
                  onChange={(e) => setNomineeSpeech(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400 font-mono text-[11px]">
                <span>Nominator: {currentMember.fullName} (#{currentMember.fourDigitCode})</span>
                <span className="text-emerald-400">Biometric Seal Applied</span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNominateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider cursor-pointer shadow-md gold-glow"
                >
                  Submit Nomination to Conclave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SOVEREIGN WORLD AWARD DECREE */}
      {selectedLaureateForDecree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-amber-500/50 bg-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-200">
            
            {/* Diploma Top Header */}
            <div className="text-center space-y-1.5 border-b border-amber-500/30 pb-5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 gold-glow">
                <Crown className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block pt-1">
                HIGH SOVEREIGN DECREE OF WORLD RECOGNITION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Sovereign Conclave Diploma & Award Conformance
              </h3>
              <p className="text-xs text-slate-400">
                Registered under the Sovereign International Communication Peace Charter
              </p>
            </div>

            {/* Decree Body Text */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed font-serif text-slate-300 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <p>
                Be it known to all sovereign nations and peoples of the world that:
              </p>
              <div className="text-center py-2 space-y-0.5">
                <h4 className="text-lg font-bold font-display text-amber-300 tracking-wide">
                  {selectedLaureateForDecree.name}
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  of {selectedLaureateForDecree.country} ({selectedLaureateForDecree.countryFlag}) · Code #{selectedLaureateForDecree.fourDigitCode}
                </span>
              </div>
              <p>
                Has been thoroughly vetted and recognized for transcendent devotion to 
                <span className="text-amber-400 font-semibold"> {currentThrone.name}</span>.
              </p>
              <p className="italic text-slate-400">
                "{selectedLaureateForDecree.keyContribution}"
              </p>
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono">
                <span className="text-amber-400">Conferred Award: {selectedLaureateForDecree.conferredAward}</span>
                <span className="text-emerald-400">Grant Stipend: {formatCurrency(selectedLaureateForDecree.grantAmountUSD, currency)}</span>
              </div>
            </div>

            {/* Seals & Signatures */}
            <div className="grid grid-cols-2 gap-4 text-center font-mono text-[11px] border-t border-slate-800 pt-4">
              <div>
                <span className="text-slate-500 block">Sovereign Founder Seal:</span>
                <span className="font-bold text-amber-400">Director General Zebene Asfye</span>
                <span className="text-[10px] text-slate-500 block">Biometric Hash Cleared</span>
              </div>
              <div>
                <span className="text-slate-500 block">Date of Acclamation:</span>
                <span className="font-bold text-white">{selectedLaureateForDecree.awardDate}</span>
                <span className="text-[10px] text-emerald-400 block">Cryptographically Consecrated</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedLaureateForDecree(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer text-xs"
              >
                Close Diploma
              </button>

              {/* If not seated, allow council to seat them */}
              {selectedLaureateForDecree.status !== 'Seated on Throne' ? (
                <button
                  onClick={() => handleConferAward(selectedLaureateForDecree.id, 'Grand Sovereign Collar of Global Peace & Mindset')}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-lg gold-glow flex items-center gap-1.5"
                >
                  <Crown className="h-4 w-4" />
                  <span>Confer Award & Seat on Throne</span>
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Currently Crowned & Seated
                </span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
