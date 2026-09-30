import React, { useState } from 'react';
import { 
  TabType, 
  Currency, 
  Language,
  ParticipantProfile,
  InformationItem, 
  IdeaItem, 
  TradeProduct, 
  TradeOrder, 
  BankConnector, 
  TaxRecord 
} from './types';
import { 
  INITIAL_INFORMATION, 
  INITIAL_IDEAS, 
  TRADE_PRODUCTS, 
  INITIAL_ORDERS, 
  CONNECTED_BANKS, 
  COMPLIANCE_LAWS, 
  INITIAL_TAX_RECORDS,
  INITIAL_PARTICIPANTS
} from './data/mockData';
import { Header } from './components/Header';
import { AudioTranslationBar } from './components/AudioTranslationBar';
import { HeroOverview } from './components/HeroOverview';
import { DirectVideoVoiceConnection } from './components/DirectVideoVoiceConnection';
import { BiometricRegistrationModal } from './components/BiometricRegistrationModal';
import { MasterKeyPromptModal } from './components/MasterKeyPromptModal';
import { MasterBuilderConsole } from './components/MasterBuilderConsole';
import { InformationExchange } from './components/InformationExchange';
import { IdeaGiftGame } from './components/IdeaGiftGame';
import { ProductTrading } from './components/ProductTrading';
import { ExpenseToIncome } from './components/ExpenseToIncome';
import { BankConnectivity } from './components/BankConnectivity';
import { EthicalLegalLaws } from './components/EthicalLegalLaws';
import { TaxGovernmentPortal } from './components/TaxGovernmentPortal';
import { OwnerRevenueAnalytics } from './components/OwnerRevenueAnalytics';
import { ZebeneProcedureGuide } from './components/ZebeneProcedureGuide';
import { Footer } from './components/Footer';
import { Radio, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Master Builder Sovereign Key Controls (Key: 1224)
  const [isMasterUnlocked, setIsMasterUnlocked] = useState(false);
  const [isMasterKeyModalOpen, setIsMasterKeyModalOpen] = useState(false);
  const [tradeCommissionRate, setTradeCommissionRate] = useState<number>(1.85); // 1.85% default
  const [isMarketHalted, setIsMarketHalted] = useState<number | boolean>(false);
  const [globalEmergencyBroadcast, setGlobalEmergencyBroadcast] = useState<string | null>(null);

  // Participants Matrix
  const [participants, setParticipants] = useState<ParticipantProfile[]>(INITIAL_PARTICIPANTS);

  // Active Logged-in Participant (Defaults to Builder / Founder)
  const [currentParticipant, setCurrentParticipant] = useState<ParticipantProfile>(INITIAL_PARTICIPANTS[0]);
  const [isBiometricsModalOpen, setIsBiometricsModalOpen] = useState(false);

  // Application State
  const [informationList, setInformationList] = useState<InformationItem[]>(INITIAL_INFORMATION);
  const [ideas, setIdeas] = useState<IdeaItem[]>(INITIAL_IDEAS);
  const [products] = useState<TradeProduct[]>(TRADE_PRODUCTS);
  const [orders, setOrders] = useState<TradeOrder[]>(INITIAL_ORDERS);
  const [banks, setBanks] = useState<BankConnector[]>(CONNECTED_BANKS);
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>(INITIAL_TAX_RECORDS);

  // Trade Modal Control
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  // Dynamic Financial Aggregations
  const totalTradingVolumeUSD = orders.reduce((sum, o) => sum + o.totalUSD, 0);
  const totalTaxRemittedUSD = taxRecords
    .filter(t => t.status === 'Remitted')
    .reduce((sum, t) => sum + t.taxDeductedUSD, 0);
  const totalOwnerRevenueUSD = orders.reduce((sum, o) => sum + o.ownerFeeUSD, 0);

  // Handlers
  const handleAddInformation = (item: InformationItem) => {
    setInformationList([item, ...informationList]);
  };

  const handleAddIdea = (idea: IdeaItem) => {
    setIdeas([idea, ...ideas]);
  };

  const handleGiftTokensToIdea = (ideaId: string, amount: number) => {
    setIdeas(prev => prev.map(i => {
      if (i.id === ideaId) {
        return {
          ...i,
          giftTokensReceived: i.giftTokensReceived + amount,
          impactScore: Math.min(100, i.impactScore + 1)
        };
      }
      return i;
    }));
  };

  const handleExecuteTrade = (newOrder: TradeOrder) => {
    setOrders([newOrder, ...orders]);

    // Automatically create the corresponding 15% VAT Tax Record for Government Remittance
    const newTaxRecord: TaxRecord = {
      id: `TAX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      taxType: 'Value Added Tax (VAT 15%)',
      sourceTransaction: `${newOrder.id} (${newOrder.productName})`,
      grossAmountUSD: newOrder.totalUSD,
      taxRatePercent: 15.0,
      taxDeductedUSD: newOrder.taxAmountUSD,
      recipientEntity: 'Federal Ministry of Finance',
      status: 'Remitted',
      filingNumber: `ET-REV-VAT-${Math.floor(100000 + Math.random() * 900000)}-C`,
      date: newOrder.date
    };

    setTaxRecords([newTaxRecord, ...taxRecords]);
  };

  const handleAddBank = (newBank: BankConnector) => {
    setBanks([...banks, newBank]);
  };

  const handleToggleBankStatus = (bankId: string) => {
    setBanks(prev => prev.map(b => {
      if (b.id === bankId) {
        return {
          ...b,
          connectionStatus: b.connectionStatus === 'Operational' ? 'Active Sync' : 'Operational'
        };
      }
      return b;
    }));
  };

  const handleRemitTax = (taxId: string) => {
    setTaxRecords(prev => prev.map(t => {
      if (t.id === taxId) {
        return { ...t, status: 'Remitted' };
      }
      return t;
    }));
  };

  const handleRemitAllTaxes = () => {
    setTaxRecords(prev => prev.map(t => ({ ...t, status: 'Remitted' })));
  };

  const handleCompleteBiometricRegistration = (newProfile: ParticipantProfile) => {
    setCurrentParticipant(newProfile);
    setParticipants(prev => {
      const exists = prev.some(p => p.codeNumber === newProfile.codeNumber);
      if (exists) {
        return prev.map(p => p.codeNumber === newProfile.codeNumber ? newProfile : p);
      }
      return [newProfile, ...prev];
    });
  };

  const handleUpdateParticipant = (updated: ParticipantProfile) => {
    setParticipants(prev => prev.map(p => p.codeNumber === updated.codeNumber ? updated : p));
    if (currentParticipant.codeNumber === updated.codeNumber) {
      setCurrentParticipant(updated);
    }
  };

  const handleAddParticipant = (newP: ParticipantProfile) => {
    setParticipants([newP, ...participants]);
  };

  const handleUnlockMaster = () => {
    setIsMasterUnlocked(true);
    setActiveTab('master-control');
  };

  const handleLockMaster = () => {
    setIsMasterUnlocked(false);
    if (activeTab === 'master-control') {
      setActiveTab('overview');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (3 Zones) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        onOpenTradeModal={() => {
          setActiveTab('trading');
          setIsTradeModalOpen(true);
        }}
        currentParticipant={currentParticipant}
        onOpenBiometricsModal={() => setIsBiometricsModalOpen(true)}
        isMasterUnlocked={isMasterUnlocked}
        onOpenMasterKeyPrompt={() => setIsMasterKeyModalOpen(true)}
      />

      {/* Universal Translation & Voice Hear Bar */}
      <AudioTranslationBar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Emergency Sovereign Broadcast Banner if Active */}
      {globalEmergencyBroadcast && (
        <div className="w-full bg-amber-500 text-slate-950 px-4 py-2 font-mono text-xs font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 animate-pulse shrink-0" />
            <span className="uppercase tracking-wider">SOVEREIGN BROADCAST:</span>
            <span className="font-sans font-semibold">{globalEmergencyBroadcast}</span>
          </div>
          <button
            onClick={() => setGlobalEmergencyBroadcast(null)}
            className="text-slate-950 hover:text-white px-2 py-0.5 rounded text-[11px] font-mono underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && (
          <HeroOverview
            setActiveTab={setActiveTab}
            currency={currency}
            onOpenTradeModal={() => {
              setActiveTab('trading');
              setIsTradeModalOpen(true);
            }}
            totalTradingVolumeUSD={totalTradingVolumeUSD}
            totalTaxRemittedUSD={totalTaxRemittedUSD}
            totalOwnerRevenueUSD={totalOwnerRevenueUSD}
            currentParticipant={currentParticipant}
            onOpenBiometricsModal={() => setIsBiometricsModalOpen(true)}
          />
        )}

        {/* Master Builder Console (Unlocked with Key 1224) */}
        {activeTab === 'master-control' && (
          <MasterBuilderConsole
            participants={participants}
            onUpdateParticipant={handleUpdateParticipant}
            onAddParticipant={handleAddParticipant}
            currency={currency}
            tradeCommissionRate={tradeCommissionRate}
            setTradeCommissionRate={setTradeCommissionRate}
            isMarketHalted={Boolean(isMarketHalted)}
            setIsMarketHalted={(h) => setIsMarketHalted(h)}
            banks={banks}
            onToggleBankStatus={handleToggleBankStatus}
            taxRecords={taxRecords}
            onRemitAllTaxes={handleRemitAllTaxes}
            globalEmergencyBroadcast={globalEmergencyBroadcast}
            setGlobalEmergencyBroadcast={setGlobalEmergencyBroadcast}
            onLockMaster={handleLockMaster}
          />
        )}

        {activeTab === 'video-voice' && (
          <DirectVideoVoiceConnection
            currentParticipant={currentParticipant}
            onOpenBiometricsModal={() => setIsBiometricsModalOpen(true)}
          />
        )}

        {activeTab === 'information' && (
          <InformationExchange
            informationList={informationList}
            onAddInformation={handleAddInformation}
          />
        )}

        {activeTab === 'ideas-game' && (
          <IdeaGiftGame
            ideas={ideas}
            onAddIdea={handleAddIdea}
            onGiftTokensToIdea={handleGiftTokensToIdea}
          />
        )}

        {activeTab === 'trading' && (
          <ProductTrading
            products={products}
            orders={orders}
            currency={currency}
            onExecuteTrade={handleExecuteTrade}
            isTradeModalOpen={isTradeModalOpen}
            setIsTradeModalOpen={setIsTradeModalOpen}
            isMarketHalted={Boolean(isMarketHalted)}
            ownerCommissionRatePercent={tradeCommissionRate}
          />
        )}

        {activeTab === 'expense-income' && (
          <ExpenseToIncome
            currency={currency}
          />
        )}

        {activeTab === 'banking' && (
          <BankConnectivity
            banks={banks}
            currency={currency}
            onAddBank={handleAddBank}
          />
        )}

        {activeTab === 'legal-compliance' && (
          <EthicalLegalLaws
            laws={COMPLIANCE_LAWS}
          />
        )}

        {activeTab === 'tax-clearance' && (
          <TaxGovernmentPortal
            taxRecords={taxRecords}
            currency={currency}
            onRemitTax={handleRemitTax}
          />
        )}

        {activeTab === 'owner-revenue' && (
          <OwnerRevenueAnalytics
            currency={currency}
            totalOwnerRevenueUSD={totalOwnerRevenueUSD}
          />
        )}

        {activeTab === 'procedure-guide' && (
          <ZebeneProcedureGuide />
        )}
      </main>

      {/* Biometric Thumb & Eye Registration Modal */}
      <BiometricRegistrationModal
        isOpen={isBiometricsModalOpen}
        onClose={() => setIsBiometricsModalOpen(false)}
        onCompleteRegistration={handleCompleteBiometricRegistration}
        currentParticipant={currentParticipant}
      />

      {/* Master Builder Key Prompt Modal (Key: 1224) */}
      <MasterKeyPromptModal
        isOpen={isMasterKeyModalOpen}
        onClose={() => setIsMasterKeyModalOpen(false)}
        onUnlockSuccess={handleUnlockMaster}
        isUnlocked={isMasterUnlocked}
        onLockMaster={handleLockMaster}
      />

      {/* Institutional Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
