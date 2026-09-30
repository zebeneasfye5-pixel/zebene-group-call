import React, { useState } from 'react';
import { 
  ParticipantProfile, 
  AccessLevel, 
  Currency, 
  TradeProduct, 
  BankConnector, 
  TaxRecord 
} from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { 
  KeyRound, 
  ShieldCheck, 
  Users, 
  Settings, 
  Activity, 
  Sliders, 
  UserPlus, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  DollarSign, 
  Landmark, 
  Radio, 
  Power,
  Fingerprint,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface MasterBuilderConsoleProps {
  participants: ParticipantProfile[];
  onUpdateParticipant: (updated: ParticipantProfile) => void;
  onAddParticipant: (newP: ParticipantProfile) => void;
  currency: Currency;
  tradeCommissionRate: number;
  setTradeCommissionRate: (rate: number) => void;
  isMarketHalted: boolean;
  setIsMarketHalted: (halted: boolean) => void;
  banks: BankConnector[];
  onToggleBankStatus: (bankId: string) => void;
  taxRecords: TaxRecord[];
  onRemitAllTaxes: () => void;
  globalEmergencyBroadcast: string | null;
  setGlobalEmergencyBroadcast: (msg: string | null) => void;
  onLockMaster: () => void;
}

export const MasterBuilderConsole: React.FC<MasterBuilderConsoleProps> = ({
  participants,
  onUpdateParticipant,
  onAddParticipant,
  currency,
  tradeCommissionRate,
  setTradeCommissionRate,
  isMarketHalted,
  setIsMarketHalted,
  banks,
  onToggleBankStatus,
  taxRecords,
  onRemitAllTaxes,
  globalEmergencyBroadcast,
  setGlobalEmergencyBroadcast,
  onLockMaster
}) => {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'participants' | 'systems' | 'broadcast' | 'audit'>('participants');
  const [selectedSearchQuery, setSelectedSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Participant Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newRole, setNewRole] = useState('Trade Participant');
  const [newCountry, setNewCountry] = useState('Ethiopia');
  const [newTier, setNewTier] = useState<AccessLevel>('Verified Trade Partners');

  // Emergency Broadcast Form
  const [broadcastDraft, setBroadcastDraft] = useState('');

  // Master Audit Log
  const [auditLogs, setAuditLogs] = useState<string[]>([
    'Master Builder Key 1224 authenticated successfully',
    'Sovereign full-system administrator privileges initialized',
    'Global telemetry synchronization: 6 participants, 4 interbank rails verified'
  ]);

  const addAuditLog = (action: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAuditLogs(prev => [`[${timestamp}] ${action}`, ...prev]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    addAuditLog(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Participant Actions
  const handleTierChange = (participant: ParticipantProfile, newTier: AccessLevel) => {
    const updated = { ...participant, accessTier: newTier };
    onUpdateParticipant(updated);
    showToast(`Updated clearance for ${participant.fullName} to: ${newTier}`);
  };

  const handleToggleFreeze = (participant: ParticipantProfile) => {
    const currentStatus = participant.status || 'Active';
    const nextStatus = currentStatus === 'Active' ? 'Frozen' : 'Active';
    const updated: ParticipantProfile = { ...participant, status: nextStatus };
    onUpdateParticipant(updated);
    showToast(`Participant ${participant.codeNumber} status set to: ${nextStatus}`);
  };

  const handleRegenerateCode = (participant: ParticipantProfile) => {
    const countryCode = participant.country.substring(0, 2).toUpperCase() || 'ET';
    const newDigits = Math.floor(1000 + Math.random() * 9000);
    const newSuffix = Math.floor(100 + Math.random() * 900);
    const newCode = `ZAIC-${countryCode}-${newDigits}-${newSuffix}`;
    const updated = { ...participant, codeNumber: newCode };
    onUpdateParticipant(updated);
    showToast(`Regenerated participant code for ${participant.fullName}: ${newCode}`);
  };

  const handleCreateParticipantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const countryCode = newCountry.substring(0, 2).toUpperCase() || 'ET';
    const digits = Math.floor(1000 + Math.random() * 9000);
    const suffix = Math.floor(100 + Math.random() * 900);
    const codeNumber = `ZAIC-${countryCode}-${digits}-${suffix}`;

    const newP: ParticipantProfile = {
      codeNumber,
      fullName: newName.trim(),
      organization: newOrg.trim() || 'Zebene Global Enterprise',
      role: newRole.trim() || 'Verified Participant',
      country: newCountry.trim(),
      thumbprintVerified: true,
      thumbprintHash: 'THUMB-RH-SHA256:' + Math.random().toString(16).substring(2, 10).toUpperCase(),
      eyeIrisVerified: true,
      eyeIrisHash: 'IRIS-RE-SHA256:' + Math.random().toString(16).substring(2, 10).toUpperCase(),
      registeredDate: new Date().toISOString().split('T')[0],
      accessTier: newTier,
      status: 'Active'
    };

    onAddParticipant(newP);
    setShowAddModal(false);
    setNewName('');
    setNewOrg('');
    showToast(`Minted new participant ${newP.fullName} with Code: ${newP.codeNumber}`);
  };

  const filteredParticipants = participants.filter(p => 
    p.fullName.toLowerCase().includes(selectedSearchQuery.toLowerCase()) ||
    p.codeNumber.toLowerCase().includes(selectedSearchQuery.toLowerCase()) ||
    p.organization.toLowerCase().includes(selectedSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sovereign Header Banner */}
      <div className="rounded-2xl border border-amber-500/50 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <span className="flex items-center gap-1.5 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/40">
                <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                Master Builder Key 1224 Active
              </span>
              <span>·</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Full System Authority
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
              Website Builder Sovereign Command Console
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              This master key unlocks instant oversight and control over all participants, biometric records, international trade contracts, banking clearing rails, tax remittances, and global communications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const next = !isMarketHalted;
                setIsMarketHalted(next);
                showToast(next ? 'EMERGENCY: Commodity Trading Exchange Halted!' : 'Commodity Trading Exchange Resumed.');
              }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                isMarketHalted 
                  ? 'bg-rose-600 text-white hover:bg-rose-500' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              <span>{isMarketHalted ? 'Resume Market Trading' : 'Halt Trading Exchange'}</span>
            </button>

            <button
              onClick={onLockMaster}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5 text-amber-400" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Console Tab Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveConsoleTab('participants')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeConsoleTab === 'participants'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4 text-amber-400" />
          <span>Participants Control ({participants.length})</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('systems')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeConsoleTab === 'systems'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="h-4 w-4 text-amber-400" />
          <span>Website Systems Governance</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('broadcast')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeConsoleTab === 'broadcast'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="h-4 w-4 text-amber-400" />
          <span>Emergency Broadcast Center</span>
        </button>

        <button
          onClick={() => setActiveConsoleTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeConsoleTab === 'audit'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="h-4 w-4 text-amber-400" />
          <span>Master Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Participants Control Matrix */}
      {activeConsoleTab === 'participants' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <input
                type="text"
                placeholder="Search participants by name, code, org..."
                value={selectedSearchQuery}
                onChange={(e) => setSelectedSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <UserPlus className="h-4 w-4" />
              <span>Mint / Onboard Participant</span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Participant Code</th>
                    <th className="py-3 px-4">Full Name & Org</th>
                    <th className="py-3 px-4">Biometrics Status</th>
                    <th className="py-3 px-4">Clearance Tier</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4 text-right">Master Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredParticipants.map((p) => {
                    const isFrozen = p.status === 'Frozen' || p.status === 'Suspended';

                    return (
                      <tr key={p.codeNumber} className={`hover:bg-slate-800/40 transition-colors ${isFrozen ? 'opacity-60 bg-rose-950/10' : ''}`}>
                        <td className="py-3.5 px-4 font-bold text-amber-400">
                          {p.codeNumber}
                        </td>

                        <td className="py-3.5 px-4 font-sans">
                          <div className="font-semibold text-white">{p.fullName}</div>
                          <div className="text-[11px] text-slate-400">{p.organization} · {p.country}</div>
                        </td>

                        <td className="py-3.5 px-4 text-[11px]">
                          <div className="flex items-center gap-1 text-emerald-400">
                            <Fingerprint className="h-3 w-3" />
                            <span>Thumb: Verified</span>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400 mt-0.5">
                            <Eye className="h-3 w-3" />
                            <span>Eye: Verified</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={p.accessTier}
                            onChange={(e) => handleTierChange(p, e.target.value as AccessLevel)}
                            className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] text-white focus:border-amber-500 focus:outline-none cursor-pointer"
                          >
                            <option value="Public Worldwide">Public Worldwide (Tier 1)</option>
                            <option value="Verified Trade Partners">Verified Trade Partner (Tier 2)</option>
                            <option value="Commercial Banks Only">Commercial Bank (Tier 3)</option>
                            <option value="Government & Sovereign">Government & Sovereign (Tier 4)</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isFrozen ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {isFrozen ? 'Frozen' : 'Active'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleFreeze(p)}
                              className={`px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-colors cursor-pointer ${
                                isFrozen 
                                  ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' 
                                  : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                              }`}
                            >
                              {isFrozen ? 'Unfreeze' : 'Freeze'}
                            </button>

                            <button
                              onClick={() => handleRegenerateCode(p)}
                              title="Regenerate Participant Code"
                              className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                              <RefreshCw className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Website Systems Governance */}
      {activeConsoleTab === 'systems' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trade & Commission System Control */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-400" />
                <span>Trade & Platform Owner Fee Control</span>
              </h3>
              <span className="font-mono text-xs text-amber-400">{tradeCommissionRate.toFixed(2)}% Active</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span>Platform Owner Transaction Commission:</span>
                  <span className="font-mono font-bold text-white">{tradeCommissionRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.05"
                  value={tradeCommissionRate}
                  onChange={(e) => {
                    const r = Number(e.target.value);
                    setTradeCommissionRate(r);
                    addAuditLog(`Owner platform commission rate adjusted to ${r.toFixed(2)}%`);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <span>Calculated on every commodity purchase order and escrow release. Directly flows into Founder Treasury.</span>
              </div>
            </div>
          </div>

          {/* Banking Rails Management */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Landmark className="h-4 w-4 text-emerald-400" />
                <span>Banking Gateway Network Control</span>
              </h3>
              <span className="font-mono text-xs text-emerald-400">{banks.length} Nodes</span>
            </div>

            <div className="space-y-2 text-xs">
              {banks.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                  <div>
                    <span className="text-white font-medium block">{b.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{b.swiftBic}</span>
                  </div>
                  <button
                    onClick={() => {
                      onToggleBankStatus(b.id);
                      showToast(`Toggled operational gateway for ${b.name}`);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                      b.connectionStatus === 'Operational' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {b.connectionStatus}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Engine Direct Remittance */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>Government Tax Clearance Controller</span>
              </h3>
              <span className="font-mono text-xs text-slate-400">{taxRecords.length} Filings</span>
            </div>

            <p className="text-xs text-slate-300">
              Trigger instant automated batch remittance for all pending VAT (15%), customs, and stamp duties directly to the Federal Ministry of Finance.
            </p>

            <button
              onClick={() => {
                onRemitAllTaxes();
                showToast('Master Command: All pending government tax records remitted!');
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
            >
              <span>Execute Bulk State Tax Remittance</span>
            </button>
          </div>

          {/* Emergency Market Switch */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Sovereign Market Trading Intercept</span>
              </h3>
              <span className={`font-mono text-xs font-bold ${isMarketHalted ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isMarketHalted ? 'HALTED' : 'OPEN'}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              In event of currency volatility or international sanctions updates, the master builder can freeze all new commodity purchases across the application.
            </p>

            <button
              onClick={() => {
                const next = !isMarketHalted;
                setIsMarketHalted(next);
                showToast(next ? 'Emergency Market Halt Activated!' : 'Market Trading Resumed.');
              }}
              className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                isMarketHalted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {isMarketHalted ? 'Resume Global Commodity Trading' : 'Halt Global Commodity Trading'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Emergency Broadcast Center */}
      {activeConsoleTab === 'broadcast' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="h-5 w-5 text-amber-400" />
              <span>Sovereign Global Broadcast Engine</span>
            </h3>
            <p className="text-xs text-slate-400">
              Transmit high-priority notices, regulatory alerts, or emergency messages across every participant screen.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Broadcast Announcement Message
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Official Sovereign Circular: Interbank clearing settlement window extended by order of Directorate General..."
                value={broadcastDraft}
                onChange={(e) => setBroadcastDraft(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (broadcastDraft.trim()) {
                    setGlobalEmergencyBroadcast(broadcastDraft.trim());
                    showToast('Emergency sovereign broadcast pushed across platform!');
                    setBroadcastDraft('');
                  }
                }}
                className="flex-1 rounded-lg bg-amber-500 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
              >
                Transmit Broadcast
              </button>

              {globalEmergencyBroadcast && (
                <button
                  type="button"
                  onClick={() => {
                    setGlobalEmergencyBroadcast(null);
                    showToast('Global broadcast cleared.');
                  }}
                  className="px-4 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Clear Active Broadcast
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Master Audit Log */}
      {activeConsoleTab === 'audit' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <span>Key 1224 Immutable Audit Trail</span>
            </h3>
            <span className="font-mono text-xs text-slate-500">SHA-256 Ledger Stamped</span>
          </div>

          <div className="space-y-2 font-mono text-xs text-slate-300 max-h-80 overflow-y-auto">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="text-amber-400 font-bold">›</span>
                <span className="leading-relaxed">{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Mint / Onboard New Participant */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Master Mint: New Participant</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateParticipantSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Participant Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Haile Gebrselassie"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Oromia Regional Cooperative"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Designated Role
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Clearance Tier
                  </label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as AccessLevel)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Verified Trade Partners">Verified Trade Partner (Tier 2)</option>
                    <option value="Commercial Banks Only">Commercial Bank (Tier 3)</option>
                    <option value="Government & Sovereign">Government & Sovereign (Tier 4)</option>
                    <option value="Public Worldwide">Public Worldwide (Tier 1)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono">
                <span>Auto-stamping Right Thumbprint and Right Eye Retinal Keys upon creation.</span>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  Issue Code & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
