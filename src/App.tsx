import React, { useState } from 'react';
import { 
  TabType, 
  Currency, 
  Language, 
  MemberProfile, 
  HumanitarianAidDrive, 
  WorkforceTask, 
  TradeCommodity, 
  TradeTransaction, 
  LiveChatMessage 
} from './types';
import { 
  INITIAL_MEMBERS, 
  AID_DRIVES, 
  WORKFORCE_TASKS, 
  TRADE_COMMODITIES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_CHAT_MESSAGES, 
  COUNTRY_DEMOGRAPHICS 
} from './data/mockData';
import { BiometricGateModal } from './components/BiometricGateModal';
import { Header } from './components/Header';
import { AudioTranslationBar } from './components/AudioTranslationBar';
import { GoldenChairStudio } from './components/GoldenChairStudio';
import { ZegoGroupConference } from './components/ZegoGroupConference';
import { WorldPeaceThrones } from './components/WorldPeaceThrones';
import { AnnualSovereignLottery } from './components/AnnualSovereignLottery';
import { BankAidDonationHub } from './components/BankAidDonationHub';
import { TaskWorkforceHub } from './components/TaskWorkforceHub';
import { ProductTrading } from './components/ProductTrading';
import { LiveInformationChat } from './components/LiveInformationChat';
import { ReasonableTaxClearance } from './components/ReasonableTaxClearance';
import { MasterBuilderConsole } from './components/MasterBuilderConsole';
import { MasterKeyPromptModal } from './components/MasterKeyPromptModal';
import { Footer } from './components/Footer';
import { Radio } from 'lucide-react';

export default function App() {
  // Website Gate: Before the website is opened, user must verify biometrics and enter 4-digit code
  const [isWebsiteUnlocked, setIsWebsiteUnlocked] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberProfile>(INITIAL_MEMBERS[0]);
  const [registeredMembers, setRegisteredMembers] = useState<MemberProfile[]>(INITIAL_MEMBERS);

  // App Navigation and Localization
  const [activeTab, setActiveTab] = useState<TabType>('studio');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Master Builder Secret Key 1224 Controls
  const [isMasterUnlocked, setIsMasterUnlocked] = useState(false);
  const [isMasterKeyModalOpen, setIsMasterKeyModalOpen] = useState(false);
  const [globalAnnouncement, setGlobalAnnouncement] = useState<string | null>(null);

  // Dynamic application state
  const [aidDrives, setAidDrives] = useState<HumanitarianAidDrive[]>(AID_DRIVES);
  const [tasks, setTasks] = useState<WorkforceTask[]>(WORKFORCE_TASKS);
  const [commodities] = useState<TradeCommodity[]>(TRADE_COMMODITIES);
  const [transactions, setTransactions] = useState<TradeTransaction[]>(INITIAL_TRANSACTIONS);
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(INITIAL_CHAT_MESSAGES);

  // Handler: When user completes biometric registration & enters their 4-digit number
  const handleUnlockWebsite = (member: MemberProfile) => {
    setCurrentMember(member);
    setRegisteredMembers(prev => {
      const exists = prev.some(m => m.fourDigitCode === member.fourDigitCode);
      if (exists) {
        return prev.map(m => m.fourDigitCode === member.fourDigitCode ? member : m);
      }
      return [member, ...prev];
    });
    setIsWebsiteUnlocked(true);
  };

  // Handler: Donation completed
  const handleDonationComplete = (driveId: string, amountUSD: number, donorName: string, bankRail: string) => {
    setAidDrives(prev => prev.map(d => {
      if (d.id === driveId) {
        return {
          ...d,
          collectedUSD: d.collectedUSD + amountUSD,
          donorCount: d.donorCount + 1,
          recentDonations: [
            {
              donorName,
              donorCountry: currentMember.country,
              amountUSD,
              amountETB: Math.round(amountUSD * 155),
              date: new Date().toISOString().split('T')[0],
              bankReference: `${bankRail.substring(0, 3).toUpperCase()}-AID-${Math.floor(1000 + Math.random() * 9000)}`
            },
            ...d.recentDonations
          ]
        };
      }
      return d;
    }));

    // Update current member's donation record
    setCurrentMember(prev => ({
      ...prev,
      donationsGivenUSD: prev.donationsGivenUSD + amountUSD
    }));
  };

  // Handler: Task completed by member
  const handleTaskCompleted = (taskId: string, rewardUSD: number) => {
    setCurrentMember(prev => ({
      ...prev,
      balanceUSD: prev.balanceUSD + rewardUSD,
      tasksCompleted: prev.tasksCompleted + 1
    }));
  };

  // Handler: Trade executed
  const handleExecuteTrade = (newTrade: TradeTransaction) => {
    setTransactions([newTrade, ...transactions]);
  };

  // Handler: Send chat message
  const handleSendMessage = (msg: LiveChatMessage) => {
    setChatMessages([msg, ...chatMessages]);
  };

  // Handler: Send gift to member
  const handleSendGift = (recipientName: string, amountUSD: number) => {
    const giftMessage: LiveChatMessage = {
      id: `chat-${Date.now()}`,
      senderName: currentMember.fullName,
      senderCountry: currentMember.country,
      senderFourDigit: currentMember.fourDigitCode,
      isGoldenChair: currentMember.isGoldenChairMember,
      text: `🎁 Gift Notice: ${currentMember.fullName} gifted $${amountUSD.toFixed(2)} (${Math.round(amountUSD * 155).toLocaleString()} ETB) to ${recipientName} in sovereign solidarity!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      originalLanguage: currentLanguage
    };
    setChatMessages([giftMessage, ...chatMessages]);
  };

  // Handler: Master Builder Status Change
  const handleUpdateMemberStatus = (memberId: string, isGolden: boolean) => {
    setRegisteredMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          isGoldenChairMember: isGolden,
          status: isGolden ? 'VIP Golden Member' : 'Active'
        };
      }
      return m;
    }));

    if (currentMember.id === memberId) {
      setCurrentMember(prev => ({
        ...prev,
        isGoldenChairMember: isGolden,
        status: isGolden ? 'VIP Golden Member' : 'Active'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* BEFORE WEBSITE IS OPENED: Biometric Gate (Full Name, Age, Gender, Country, Right Thumbprint & Eyeprint -> 4-Digit Passcode) */}
      {!isWebsiteUnlocked && (
        <BiometricGateModal
          onUnlockSuccess={handleUnlockWebsite}
          existingMembers={registeredMembers}
        />
      )}

      {/* ONCE 4-DIGIT CODE IS ENTERED: The Entire Website is Opened & Displayed */}
      {isWebsiteUnlocked && (
        <>
          {/* Header with Wordmark, Navigation, Member 4-Digit Code, Master Key 1224 & Currency Switcher */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currency={currency}
            setCurrency={setCurrency}
            currentMember={currentMember}
            isMasterUnlocked={isMasterUnlocked}
            onOpenMasterKeyPrompt={() => setIsMasterKeyModalOpen(true)}
            onLockMember={() => setIsWebsiteUnlocked(false)}
          />

          {/* Universal Translation & Native Voice Listener Bar */}
          <AudioTranslationBar
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />

          {/* Global Sovereign Broadcast Banner if Active */}
          {globalAnnouncement && (
            <div className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2 mx-auto">
                <Radio className="h-4 w-4 animate-pulse shrink-0" />
                <span className="font-mono uppercase tracking-wider">SOVEREIGN BROADCAST:</span>
                <span className="font-sans font-semibold">{globalAnnouncement}</span>
              </div>
              <button
                onClick={() => setGlobalAnnouncement(null)}
                className="text-slate-950 hover:text-black px-2 py-0.5 rounded text-[11px] font-mono underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Main Content Workspace Viewport */}
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {/* TAB 1: The Golden Chair Studio (Live Video & Audio Player, Studio Mic, Member Seat) */}
            {activeTab === 'studio' && (
              <GoldenChairStudio
                currentMember={currentMember}
              />
            )}

            {/* TAB: Real-Time Group Video & Voice Conference (ZegoCloud Prebuilt Kit - Hala / Zoom) */}
            {activeTab === 'conference' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                      <span>Sovereign Group Video Conferencing</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 font-mono">ZegoCloud Prebuilt Video Conference UI Kit</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                      International Real-Time Group Video & Voice Conference
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                      Multi-party interactive conferencing chamber (like Hala or Zoom) powered by ZegoCloud. Multiple online participants join the same room simultaneously with automatic Grid View layout, instant mic & camera toggles, and screen sharing capabilities.
                    </p>
                  </div>
                </div>

                <ZegoGroupConference currentMember={currentMember} />
              </div>
            )}

            {/* TAB: The Three World Thrones of Distinction (Peace, Tech Knowledge, Charitable Deeds) */}
            {activeTab === 'thrones' && (
              <WorldPeaceThrones
                currentMember={currentMember}
                currency={currency}
                isMasterUnlocked={isMasterUnlocked}
              />
            )}

            {/* TAB: Annual Sovereign Global Lottery (House, Car, Smartphones & Special Prizes) */}
            {activeTab === 'lottery' && (
              <AnnualSovereignLottery
                currentMember={currentMember}
                currency={currency}
                onUpdateMemberBalance={(newBal) => {
                  setCurrentMember(prev => ({ ...prev, balanceUSD: newBal }));
                }}
              />
            )}

            {/* TAB 2: Bank-Connected Aid & Donation Hub */}
            {activeTab === 'aid-donations' && (
              <BankAidDonationHub
                aidDrives={aidDrives}
                currency={currency}
                currentMember={currentMember}
                onDonationComplete={handleDonationComplete}
              />
            )}

            {/* TAB 3: Global Workforce & Tasks (Earn Income) */}
            {activeTab === 'tasks' && (
              <TaskWorkforceHub
                tasks={tasks}
                currency={currency}
                currentMember={currentMember}
                onTaskCompleted={handleTaskCompleted}
              />
            )}

            {/* TAB 4: Fair-Value Commodity Trade Exchange */}
            {activeTab === 'trade' && (
              <ProductTrading
                commodities={commodities}
                transactions={transactions}
                currency={currency}
                currentMember={currentMember}
                onExecuteTrade={handleExecuteTrade}
              />
            )}

            {/* TAB 5: Live Global Chat & Information Exchange */}
            {activeTab === 'chat-exchange' && (
              <LiveInformationChat
                messages={chatMessages}
                currentMember={currentMember}
                currentLanguage={currentLanguage}
                onSendMessage={handleSendMessage}
                onSendGift={handleSendGift}
              />
            )}

            {/* TAB 6: Government & Bank Taxes (Reasonable 15% VAT) */}
            {activeTab === 'taxes' && (
              <ReasonableTaxClearance
                currency={currency}
              />
            )}

            {/* TAB 7: Master Builder Console (Secret Key 1224) */}
            {activeTab === 'master-control' && (
              <MasterBuilderConsole
                members={registeredMembers}
                countryStats={COUNTRY_DEMOGRAPHICS}
                onUpdateMemberStatus={handleUpdateMemberStatus}
                onBroadcastAnnouncement={setGlobalAnnouncement}
                currentBroadcast={globalAnnouncement}
                onLockMaster={() => {
                  setIsMasterUnlocked(false);
                  setActiveTab('studio');
                }}
              />
            )}
          </main>

          {/* Master Builder Key Prompt Modal (Secret Number: 1224) */}
          <MasterKeyPromptModal
            isOpen={isMasterKeyModalOpen}
            onClose={() => setIsMasterKeyModalOpen(false)}
            onUnlockSuccess={() => {
              setIsMasterUnlocked(true);
              setActiveTab('master-control');
            }}
            isUnlocked={isMasterUnlocked}
            onLockMaster={() => setIsMasterUnlocked(false)}
          />

          {/* Dignified Footer */}
          <Footer
            setActiveTab={setActiveTab}
            onOpenMasterKeyPrompt={() => setIsMasterKeyModalOpen(true)}
          />
        </>
      )}
    </div>
  );
}
