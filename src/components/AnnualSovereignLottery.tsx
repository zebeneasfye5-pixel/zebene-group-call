import React, { useState, useEffect } from 'react';
import { 
  MemberProfile, 
  Currency, 
  LotteryPrize, 
  LotteryTicket, 
  PastLotteryWinner, 
  LotteryPrizeTier 
} from '../types';
import { 
  ANNUAL_LOTTERY_PRIZES, 
  INITIAL_USER_TICKETS, 
  PAST_LOTTERY_WINNERS 
} from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { 
  Home, 
  Car, 
  Smartphone, 
  Gift, 
  Sparkles, 
  Clock, 
  Ticket, 
  CheckCircle2, 
  ShieldCheck, 
  Coins, 
  RefreshCw, 
  Play, 
  FileText, 
  Check, 
  Share2, 
  Award,
  Crown,
  Radio,
  ExternalLink,
  Info
} from 'lucide-react';

interface AnnualSovereignLotteryProps {
  currentMember: MemberProfile;
  currency: Currency;
  onUpdateMemberBalance?: (newBalance: number) => void;
}

export const AnnualSovereignLottery: React.FC<AnnualSovereignLotteryProps> = ({
  currentMember,
  currency,
  onUpdateMemberBalance
}) => {
  // State
  const [prizes] = useState<LotteryPrize[]>(ANNUAL_LOTTERY_PRIZES);
  const [userTickets, setUserTickets] = useState<LotteryTicket[]>(INITIAL_USER_TICKETS);
  const [pastWinners] = useState<PastLotteryWinner[]>(PAST_LOTTERY_WINNERS);
  
  const [selectedPrizeModal, setSelectedPrizeModal] = useState<LotteryPrize | null>(null);
  const [activeTab, setActiveTab] = useState<'showcase' | 'mytickets' | 'simulator' | 'winners'>('showcase');
  
  // Ticket purchase state
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [paymentRail, setPaymentRail] = useState<'CBE_Birr' | 'Telebirr' | 'Chapa' | 'MemberBalance'>('CBE_Birr');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Live Draw Simulator State
  const [isSimulatingDraw, setIsSimulatingDraw] = useState(false);
  const [simulatedDrawnPrize, setSimulatedDrawnPrize] = useState<string | null>(null);
  const [simulatedWinningNumber, setSimulatedWinningNumber] = useState<string>('---- - ----');
  const [simulatedWinnerName, setSimulatedWinnerName] = useState<string | null>(null);
  const [drawStep, setDrawStep] = useState<number>(0);

  // Countdown timer to December 31, 2026 Annual Gala Draw
  const [countdown, setCountdown] = useState({
    days: 92,
    hours: 9,
    minutes: 15,
    seconds: 28
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Buy Tickets Handler
  const handleBuyTickets = () => {
    const totalCostUSD = ticketQuantity * 10;
    
    if (paymentRail === 'MemberBalance' && currentMember.balanceUSD < totalCostUSD) {
      showToast(`Insufficient balance ($${currentMember.balanceUSD.toFixed(2)}). Please choose CBE Birr or Telebirr.`);
      return;
    }

    setIsPurchasing(true);

    setTimeout(() => {
      const newTickets: LotteryTicket[] = [];
      const now = new Date().toISOString().split('T')[0];

      for (let i = 0; i < ticketQuantity; i++) {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        newTickets.push({
          id: `TCK-${Date.now()}-${i}`,
          ticketNumber: `ZAIC-LOTTO-2026-${randNum}`,
          memberId: currentMember.id,
          memberName: currentMember.fullName,
          memberCountry: currentMember.country,
          purchaseDate: now,
          priceUSD: 10,
          drawDate: '2026-12-31',
          status: 'Active',
          verificationHash: `LOTTO-SHA256:${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        });
      }

      setUserTickets(prev => [...newTickets, ...prev]);

      if (paymentRail === 'MemberBalance' && onUpdateMemberBalance) {
        onUpdateMemberBalance(currentMember.balanceUSD - totalCostUSD);
      }

      setIsPurchasing(false);
      showToast(`Congratulations! ${ticketQuantity} Sovereign Lottery ticket(s) issued and registered!`);
      setActiveTab('mytickets');
    }, 1200);
  };

  // Run Draw Simulation
  const handleStartDrawSimulation = (prizeTitle: string) => {
    setIsSimulatingDraw(true);
    setSimulatedDrawnPrize(prizeTitle);
    setSimulatedWinnerName(null);
    setDrawStep(1);

    // Rapid spinning number effect
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const randDigits = Math.floor(1000 + Math.random() * 9000);
      setSimulatedWinningNumber(`ZAIC-LOTTO-2026-${randDigits}`);

      if (count > 25) {
        clearInterval(interval);
        
        // Randomly pick a winner: either a user ticket or another verified delegate ticket
        const isUserLucky = Math.random() > 0.6 && userTickets.length > 0;
        const finalTicket = isUserLucky 
          ? userTickets[Math.floor(Math.random() * userTickets.length)].ticketNumber
          : `ZAIC-LOTTO-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        const finalWinner = isUserLucky 
          ? `${currentMember.fullName} (You!)` 
          : ['Abebe Tadesse (Ethiopia 🇪🇹)', 'Sarah Jenkins (USA 🇺🇸)', 'Grace Mwangi (Kenya 🇰🇪)', 'Li Wei (China 🇨🇳)'][Math.floor(Math.random() * 4)];

        setSimulatedWinningNumber(finalTicket);
        setSimulatedWinnerName(finalWinner);
        setIsSimulatingDraw(false);
        setDrawStep(2);

        if (isUserLucky) {
          showToast(`🌟 INCREDIBLE! Your ticket ${finalTicket} matched the Grand Prize!`);
        } else {
          showToast(`Draw concluded: Official ticket ${finalTicket} drawn for ${prizeTitle}!`);
        }
      }
    }, 80);
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Alert */}
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
            <Gift className="h-4 w-4 text-amber-400" />
            <span>Annual Sovereign Global Lottery</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">Guaranteed Handover & Bank Escrow</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Annual Grand Lottery: House, Car, Smartphones & Special Prizes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Every year, our international community holds a grand audited lottery draw where an architectural luxury modern villa house, an all-electric modern SUV car, 25 flagship smartphones, and 175 special community empowerment packages are awarded to verified members.
          </p>
        </div>

        {/* Quick Ticket Counter Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900 p-3.5 text-right">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">MY ACTIVE TICKETS:</span>
            <span className="text-base font-bold text-amber-300 font-mono flex items-center justify-end gap-1.5 mt-0.5">
              <Ticket className="h-4 w-4 text-amber-400" />
              <span>{userTickets.length} Registered</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grand Annual Prize Showcase Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl">
        <div className="relative h-80 sm:h-[420px] w-full overflow-hidden">
          <img
            src="/images/annual_lottery_prizes.jpg"
            alt="Annual Sovereign Grand Lottery Prizes"
            className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Top Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/85 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300 backdrop-blur-md shadow-lg">
            <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>ANNUAL GALA DRAW: AUDITED BY COMMERCIAL BANK OF ETHIOPIA (CBE)</span>
          </div>

          {/* Bottom Countdown & Scope */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Grand Gala Draw: December 31, 2026
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Turn $10 into a Luxury Home, New Car, or Flagship Phone
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tickets are non-exaggerated and affordable ($10 USD / ~1,550 ETB). All statutory 15% taxes, deed registrations, and road logistics are 100% pre-cleared by the platform escrow.
              </p>
            </div>

            {/* Live Countdown Box */}
            <div className="rounded-2xl border border-amber-500/40 bg-slate-950/90 p-4 backdrop-blur-md shrink-0 shadow-2xl">
              <span className="text-[10px] text-slate-400 font-mono block text-center uppercase tracking-wider mb-2">
                GRAND DRAW LIVE COUNTDOWN:
              </span>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-2">
                  <span className="text-lg font-bold text-amber-300 block">{countdown.days}</span>
                  <span className="text-[9px] text-slate-400 uppercase">Days</span>
                </div>
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-2">
                  <span className="text-lg font-bold text-white block">{countdown.hours}</span>
                  <span className="text-[9px] text-slate-400 uppercase">Hours</span>
                </div>
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-2">
                  <span className="text-lg font-bold text-white block">{countdown.minutes}</span>
                  <span className="text-[9px] text-slate-400 uppercase">Mins</span>
                </div>
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-2">
                  <span className="text-lg font-bold text-emerald-400 block">{countdown.seconds}</span>
                  <span className="text-[9px] text-slate-400 uppercase">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Lottery Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'showcase' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="h-3.5 w-3.5" />
            <span>Prizes Showcase</span>
          </button>
          <button
            onClick={() => setActiveTab('mytickets')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'mytickets' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ticket className="h-3.5 w-3.5" />
            <span>My Tickets ({userTickets.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'simulator' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>Live Draw Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('winners')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'winners' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Past Winners Gallery</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Statutory Audited & Bank Backed</span>
        </div>
      </div>

      {/* TAB 1: PRIZES SHOWCASE & TICKET PURCHASE DESK */}
      {activeTab === 'showcase' && (
        <div className="space-y-8">
          
          {/* Quick Ticket Purchase Desk */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  OFFICIAL TICKET COUNTER · PASSCODE #{currentMember.fourDigitCode}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Enter the 2026 Annual Sovereign Draw
                </h3>
                <p className="text-xs text-slate-400">
                  Fixed realistic entry price: $10 USD (1,550 ETB) per ticket. No inflated or fake odds.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Ticket Unit Price:</span>
                <span className="text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl">
                  {formatCurrency(10, currency)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Number of Tickets to Purchase:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 10].map(qty => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setTicketQuantity(qty)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        ticketQuantity === qty
                          ? 'bg-amber-500 text-slate-950 shadow-md gold-glow'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {qty} {qty === 1 ? 'Ticket' : 'Tickets'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Rail Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Settlement Payment Rail:
                </label>
                <select
                  value={paymentRail}
                  onChange={(e) => setPaymentRail(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="CBE_Birr">Commercial Bank of Ethiopia (CBE Birr)</option>
                  <option value="Telebirr">Telebirr Instant SuperApp</option>
                  <option value="Chapa">Chapa Card / International Wire</option>
                  <option value="MemberBalance">Member Platform Balance (${currentMember.balanceUSD.toFixed(2)})</option>
                </select>
              </div>

              {/* Confirm Purchase Button */}
              <div>
                <button
                  onClick={handleBuyTickets}
                  disabled={isPurchasing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all cursor-pointer shadow-lg gold-glow hover:brightness-110 flex items-center justify-center gap-2"
                >
                  {isPurchasing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Minting Cryptographic Tickets...</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="h-4 w-4" />
                      <span>Pay {formatCurrency(ticketQuantity * 10, currency)} & Enter Draw</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 4 GRAND PRIZE TIERS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prizes.map((prize) => {
              const isHouse = prize.tier === 'house';
              const isCar = prize.tier === 'car';
              const isPhones = prize.tier === 'phones';

              return (
                <div
                  key={prize.id}
                  className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xl transition-all relative overflow-hidden ${
                    isHouse 
                      ? 'border-amber-500/50 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 gold-glow' 
                      : isCar 
                      ? 'border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950'
                      : isPhones
                      ? 'border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950'
                      : 'border-slate-800 bg-slate-900/80'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header of Prize */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl border ${
                          isHouse ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' :
                          isCar ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400' :
                          isPhones ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
                          'border-slate-700 bg-slate-800 text-slate-300'
                        }`}>
                          {isHouse && <Home className="h-6 w-6" />}
                          {isCar && <Car className="h-6 w-6" />}
                          {isPhones && <Smartphone className="h-6 w-6" />}
                          {prize.tier === 'special' && <Gift className="h-6 w-6" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            {prize.quantity === 1 ? '1 WINNER WORLDWIDE' : `${prize.quantity} WINNERS WORLDWIDE`}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white font-display">
                            {prize.title}
                          </h4>
                          <span className="text-xs text-amber-400/90 font-medium block mt-0.5">
                            {prize.amharicTitle}
                          </span>
                        </div>
                      </div>

                      {/* Prize Valuation Badge */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 font-mono block">VALUATION:</span>
                        <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                          {formatCurrency(prize.estimatedValueUSD, currency)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {formatNumber(prize.estimatedValueETB)} ETB
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {prize.description}
                    </p>

                    {/* Bullet Specs */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        PRIZE SPECIFICATIONS & INCLUSIONS:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {prize.specifications.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Tax Status & Modal Trigger */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      <span>{prize.taxStatus}</span>
                    </span>

                    <button
                      onClick={() => handleStartDrawSimulation(prize.title)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="h-3 w-3 text-amber-400" />
                      <span>Test Draw Simulator</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MY REGISTERED TICKETS VAULT */}
      {activeTab === 'mytickets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-white font-display">
                My Cryptographic Lottery Vault
              </h3>
              <p className="text-xs text-slate-400">
                All tickets registered under your verified biometric identity and 4-digit code #{currentMember.fourDigitCode}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('showcase')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow gold-glow"
            >
              + Get More Tickets ($10 Each)
            </button>
          </div>

          {userTickets.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center space-y-3">
              <Ticket className="h-10 w-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Active Lottery Tickets Found</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Secure your chance to win the luxury smart villa house, modern electric car, or flagship smartphones in the 2026 annual draw.
              </p>
              <button
                onClick={() => setActiveTab('showcase')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer shadow gold-glow mt-2"
              >
                Purchase First Ticket ($10)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {userTickets.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-5 space-y-4 shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {t.ticketNumber}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      ● Active Entry
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Owner:</span>
                      <span className="text-white font-medium">{t.memberName}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Grand Draw Date:</span>
                      <span className="text-white font-mono">{t.drawDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Ticket Price:</span>
                      <span className="text-emerald-400 font-mono font-bold">{formatCurrency(t.priceUSD, currency)}</span>
                    </div>
                  </div>

                  {/* Hash seal */}
                  <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 truncate">
                    Hash: {t.verificationHash}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LIVE ANNUAL DRAW SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="rounded-3xl border border-amber-500/40 bg-slate-900/95 p-6 sm:p-10 space-y-8 shadow-2xl text-center max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 gold-glow">
              <Crown className="h-7 w-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Transparent Sovereign Random Draw Drum
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Simulate the certified annual drawing sequence for the luxury villa house, modern electric SUV car, or flagship smartphones.
            </p>
          </div>

          {/* Digital Lottery Spinning Screen */}
          <div className="rounded-3xl border-2 border-amber-500/50 bg-slate-950 p-8 space-y-4 shadow-inner relative overflow-hidden">
            <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
              {simulatedDrawnPrize ? `DRAWING FOR: ${simulatedDrawnPrize.toUpperCase()}` : 'AWAITING DRAW TRIGGER'}
            </span>

            <div className="text-3xl sm:text-5xl font-mono font-black text-amber-300 tracking-wider py-4 animate-pulse drop-shadow-md">
              {simulatedWinningNumber}
            </div>

            {simulatedWinnerName && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 space-y-1 animate-fade-in">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
                  OFFICIAL WINNER CONFIRMED & CONGRATULATED:
                </span>
                <span className="text-base sm:text-lg font-bold text-white font-display">
                  {simulatedWinnerName}
                </span>
              </div>
            )}
          </div>

          {/* Trigger Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleStartDrawSimulation('Smart Sovereign Villa Residence')}
              disabled={isSimulatingDraw}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md gold-glow hover:brightness-110 disabled:opacity-50"
            >
              Draw House Winner
            </button>
            <button
              onClick={() => handleStartDrawSimulation('2026 All-Electric Executive SUV')}
              disabled={isSimulatingDraw}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:brightness-110 disabled:opacity-50"
            >
              Draw Car Winner
            </button>
            <button
              onClick={() => handleStartDrawSimulation('Flagship 5G Ultra Smartphone')}
              disabled={isSimulatingDraw}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:brightness-110 disabled:opacity-50"
            >
              Draw Phone Winner
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PAST ANNUAL WINNERS GALLERY & HANDOVER PROOFS */}
      {activeTab === 'winners' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-white font-display">
                Certified Past Annual Winners & Handover Proofs
              </h3>
              <p className="text-xs text-slate-400">
                Complete transparency: Every house key, vehicle title, and smartphone handed over is publicly documented
              </p>
            </div>

            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Verified Escrow Disbursals</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastWinners.map(win => (
              <div
                key={win.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-800 shrink-0">
                        <img src={win.photoUrl} alt={win.winnerName} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{win.winnerName}</h4>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {win.winnerCountry} {win.winnerCountryFlag} · Year {win.year}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                      {win.ticketNumber}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">PRIZE AWARDED:</span>
                    <span className="text-xs font-bold text-amber-300 block">
                      {win.prizeWon}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 block mt-0.5">
                      Value: {formatCurrency(win.valueUSD, currency)} ({formatNumber(win.valueETB)} ETB)
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                    "{win.testimonial}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Audit Ref: {win.bankAuditRef}</span>
                  <span className="text-emerald-400">Handed Over</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
