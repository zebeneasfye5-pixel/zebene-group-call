import React, { useState } from 'react';
import { BankConnector, Currency } from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRightLeft, 
  CheckCircle2, 
  Plus, 
  FileText,
  Landmark
} from 'lucide-react';

interface BankConnectivityProps {
  banks: BankConnector[];
  currency: Currency;
  onAddBank: (bank: BankConnector) => void;
}

export const BankConnectivity: React.FC<BankConnectivityProps> = ({
  banks,
  currency,
  onAddBank
}) => {
  const [showPairModal, setShowPairModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Transfer simulation state
  const [sourceBank, setSourceBank] = useState(banks[0].id);
  const [destBank, setDestBank] = useState(banks[1].id);
  const [transferAmountUSD, setTransferAmountUSD] = useState<number>(250000);
  const [transferPurpose, setTransferPurpose] = useState('Commodity Trade Escrow Pre-funding');
  const [recentTransfers, setRecentTransfers] = useState([
    {
      uetr: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      from: 'Commercial Bank of Ethiopia (CBE)',
      to: 'African Development Bank (AfDB)',
      amountUSD: 850000,
      protocol: 'ISO 20022 pacs.008',
      timestamp: '2026-09-29 07:42:15 UTC',
      status: 'Settled & Reconciled'
    },
    {
      uetr: 'c42b109e-31ea-42f0-9281-30d88001fa12',
      from: 'Standard Chartered Global',
      to: 'Commercial Bank of Ethiopia (CBE)',
      amountUSD: 420000,
      protocol: 'SWIFT gpi MT103',
      timestamp: '2026-09-28 14:19:02 UTC',
      status: 'Settled & Reconciled'
    }
  ]);

  // Bank pairing form state
  const [pairBankName, setPairBankName] = useState('');
  const [pairBic, setPairBic] = useState('');
  const [pairType, setPairType] = useState<BankConnector['type']>('Commercial Bank');
  const [pairCountry, setPairCountry] = useState('Ethiopia');

  const totalLiquidityUSD = banks.reduce((sum, b) => sum + b.liquidityPoolUSD, 0);

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceBank === destBank) {
      alert('Source and destination banks must be different for interbank settlement.');
      return;
    }

    const s = banks.find(b => b.id === sourceBank)?.name || 'Source Bank';
    const d = banks.find(b => b.id === destBank)?.name || 'Destination Bank';
    const uetr = 'uet-' + Math.random().toString(16).substring(2, 10) + '-' + Math.random().toString(16).substring(2, 10);

    const newTransfer = {
      uetr,
      from: s,
      to: d,
      amountUSD: transferAmountUSD,
      protocol: 'ISO 20022 pacs.008 RTGS',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      status: 'Settled & Reconciled'
    };

    setRecentTransfers([newTransfer, ...recentTransfers]);
    setShowTransferModal(false);
    showNotification(`Interbank Settlement UETR #${uetr.substring(0, 12)} confirmed via ${s}!`);
  };

  const handlePairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pairBankName.trim() || !pairBic.trim()) return;

    const newBank: BankConnector = {
      id: `BNK-${Math.floor(10 + Math.random() * 90)}`,
      name: pairBankName.trim(),
      shortCode: pairBankName.split(' ')[0].toUpperCase(),
      type: pairType,
      country: pairCountry.trim(),
      swiftBic: pairBic.trim().toUpperCase(),
      connectionStatus: 'Operational',
      liquidityPoolUSD: 50000000,
      protocols: ['ISO 20022', 'SWIFT Direct', 'RTGS'],
      latencyMs: 22
    };

    onAddBank(newBank);
    setShowPairModal(false);
    setPairBankName('');
    setPairBic('');
    showNotification(`Successfully paired ${newBank.name} (${newBank.swiftBic}) to Zebene clearinghouse.`);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-slate-900 p-4 text-xs font-semibold text-emerald-300 shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Direct Financial Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>Real-time Interbank Clearing</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Global Banking & Liquidity Clearinghouse
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Connected via direct API and SWIFT ISO 20022 message gateways with Commercial Bank of Ethiopia (CBE), African Development Bank, and international central clearing nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPairModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>Pair Bank Account</span>
          </button>

          <button
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Simulate Interbank Wire</span>
          </button>
        </div>
      </div>

      {/* Aggregate Liquidity Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 text-slate-300">
        <div>
          <span className="text-xs text-slate-400 block mb-1">Total Connected Bank Liquidity</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tabular-nums">
            {formatCurrency(totalLiquidityUSD, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">High-quality liquid assets (HQLA)</span>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">Active Interbank Gateways</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
            {banks.length} Connected Banks
          </span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">100% Operational Up-time</span>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">Average Settlement Latency</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tabular-nums">
            28.5 ms
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">ISO 20022 real-time RTGS pipeline</span>
        </div>
      </div>

      {/* Connected Bank Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {bank.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                    <span className="text-amber-400 font-semibold">{bank.swiftBic}</span>
                    <span aria-hidden="true">·</span>
                    <span>{bank.country}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{bank.connectionStatus}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Tier Liquidity Pool:</span>
                <span className="text-white font-bold tabular-nums">
                  {formatCurrency(bank.liquidityPoolUSD, currency)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Network Ping / Response:</span>
                <span className="text-cyan-400 font-bold tabular-nums">
                  {bank.latencyMs} ms
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
              <span className="text-slate-500">Supported Rails:</span>
              {bank.protocols.map((proto, idx) => (
                <span key={idx} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-slate-300">
                  {proto}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interbank Transfer Simulation Ledger */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden space-y-2">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-white">Recent Interbank Liquidity Settlements (Live Rails)</span>
          <span className="font-mono text-slate-500">ISO 20022 Reconciled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Transaction UETR</th>
                <th className="py-3 px-4">Originating Bank</th>
                <th className="py-3 px-4">Receiving Bank</th>
                <th className="py-3 px-4">Settled Amount</th>
                <th className="py-3 px-4">Protocol Rail</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentTransfers.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-amber-400">
                    <div>{tx.uetr}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{tx.timestamp}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-white">
                    {tx.from}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-white">
                    {tx.to}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 tabular-nums">
                    {formatCurrency(tx.amountUSD, currency)}
                  </td>
                  <td className="py-3.5 px-4 text-cyan-400">
                    {tx.protocol}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Simulate Interbank Transfer */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Simulate Interbank Wire Transfer</h3>
                <p className="text-xs text-slate-400">ISO 20022 real-time settlement between connected banks</p>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Originating Bank (Sender)
                  </label>
                  <select
                    value={sourceBank}
                    onChange={(e) => setSourceBank(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    {banks.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Beneficiary Bank (Receiver)
                  </label>
                  <select
                    value={destBank}
                    onChange={(e) => setDestBank(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    {banks.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Settlement Amount (USD)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="5000"
                  value={transferAmountUSD}
                  onChange={(e) => setTransferAmountUSD(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-amber-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Converted equivalent: {formatCurrency(transferAmountUSD, currency)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Remittance Information / Purpose Code
                </label>
                <input
                  type="text"
                  required
                  value={transferPurpose}
                  onChange={(e) => setTransferPurpose(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Routing Protocol:</span>
                  <span className="text-white">ISO 20022 pacs.008.001.08</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Stamp Duty (0.5%):</span>
                  <span className="text-cyan-400">+{formatCurrency(transferAmountUSD * 0.005, currency)}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Transmit RTGS Settlement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Pair Bank Account */}
      {showPairModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Pair Verified Enterprise Bank</h3>
                <p className="text-xs text-slate-400">Link institutional account for automated trade clearing</p>
              </div>
              <button
                onClick={() => setShowPairModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePairSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Bank Official Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dashen Bank / Awash Bank / Barclays"
                  value={pairBankName}
                  onChange={(e) => setPairBankName(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  SWIFT BIC Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DASHETAA or AWASCAA"
                  value={pairBic}
                  onChange={(e) => setPairBic(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono uppercase text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Institution Type
                  </label>
                  <select
                    value={pairType}
                    onChange={(e) => setPairType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Commercial Bank">Commercial Bank</option>
                    <option value="Central / Development Bank">Development Bank</option>
                    <option value="International Clearing">International Clearing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={pairCountry}
                    onChange={(e) => setPairCountry(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPairModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  Verify & Pair Gateway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
