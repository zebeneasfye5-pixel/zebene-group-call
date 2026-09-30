import React, { useState } from 'react';
import { TaxRecord, Currency } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Receipt, 
  Landmark, 
  CheckCircle2, 
  FileText, 
  ArrowUpRight, 
  QrCode, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

interface TaxGovernmentPortalProps {
  taxRecords: TaxRecord[];
  currency: Currency;
  onRemitTax: (taxId: string) => void;
}

export const TaxGovernmentPortal: React.FC<TaxGovernmentPortalProps> = ({
  taxRecords,
  currency,
  onRemitTax
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<TaxRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalTaxAccruedUSD = taxRecords.reduce((sum, r) => sum + r.taxDeductedUSD, 0);
  const totalRemittedUSD = taxRecords
    .filter(r => r.status === 'Remitted')
    .reduce((sum, r) => sum + r.taxDeductedUSD, 0);
  const pendingRemittanceUSD = totalTaxAccruedUSD - totalRemittedUSD;

  const handleRemit = (id: string) => {
    onRemitTax(id);
    showNotice(`Tax record #${id} successfully remitted to Federal Ministry of Finance!`);
  };

  const showNotice = (msg: string) => {
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
            <span>Fiscal Governance & State Revenue</span>
            <span aria-hidden="true">·</span>
            <span>Zero Fiscal Evasion</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Government & Banking Tax Clearance Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Automated calculation, deduction, and direct RTGS interbank remittance of business VAT (15%), customs duties, withholding tax, and bank stamp levies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
          <ShieldCheck className="h-4 w-4" />
          <span>Direct Ministry of Finance Digital Link</span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Total Fiscal Taxes Assessed</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
            {formatCurrency(totalTaxAccruedUSD, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">Across all trade & banking movements</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Remitted to State Treasury</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tabular-nums">
            {formatCurrency(totalRemittedUSD, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">Cleared with electronic filing vouchers</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Queued for Settlement</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400 tabular-nums">
            {formatCurrency(pendingRemittanceUSD, currency)}
          </span>
          <span className="text-[11px] text-slate-500 block">Scheduled for next RTGS batch</span>
        </div>
      </div>

      {/* Tax Records Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-white">Government & Bank Business Tax Ledger</span>
          <span className="font-mono text-slate-500">{taxRecords.length} Audited Filings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Filing ID & Date</th>
                <th className="py-3 px-4">Tax Classification</th>
                <th className="py-3 px-4">Source Transaction</th>
                <th className="py-3 px-4">Gross Base</th>
                <th className="py-3 px-4">Rate</th>
                <th className="py-3 px-4">Tax Deducted</th>
                <th className="py-3 px-4">Recipient Authority</th>
                <th className="py-3 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {taxRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-amber-400">
                    <div>{rec.id}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{rec.filingNumber}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans font-medium text-white">
                    {rec.taxType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {rec.sourceTransaction}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-200">
                    {formatCurrency(rec.grossAmountUSD, currency)}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums text-amber-400 font-bold">
                    {rec.taxRatePercent}%
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 tabular-nums">
                    {formatCurrency(rec.taxDeductedUSD, currency)}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-300">
                    {rec.recipientEntity}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {rec.status === 'Remitted' ? (
                        <button
                          onClick={() => setSelectedVoucher(rec)}
                          className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded text-[11px] font-sans font-semibold border border-emerald-500/20 cursor-pointer transition-colors"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>View Voucher</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemit(rec.id)}
                          className="flex items-center gap-1 text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1 rounded text-[11px] font-sans font-semibold border border-amber-500/30 cursor-pointer transition-colors"
                        >
                          <Clock className="h-3 w-3" />
                          <span>Remit Now</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Tax Clearance Voucher Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Official Tax Remittance Voucher</h3>
              </div>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">State Filing Voucher</span>
                  <span className="text-amber-400 font-bold">{selectedVoucher.filingNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 block">Clearance Date</span>
                  <span className="text-slate-300">{selectedVoucher.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax Type:</span>
                  <span className="text-white font-sans font-semibold">{selectedVoucher.taxType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Source Event:</span>
                  <span className="text-slate-300">{selectedVoucher.sourceTransaction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assessed Base:</span>
                  <span className="text-slate-200">{formatCurrency(selectedVoucher.grossAmountUSD, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Statutory Rate:</span>
                  <span className="text-amber-400 font-bold">{selectedVoucher.taxRatePercent}%</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 text-sm">
                  <span className="text-slate-300 font-sans font-semibold">Total Remitted:</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(selectedVoucher.taxDeductedUSD, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Beneficiary:</span>
                  <span className="text-cyan-400 font-sans">{selectedVoucher.recipientEntity}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-10 w-10 text-slate-300" />
                  <span className="text-[10px] text-slate-500 font-sans leading-tight block">
                    Scan for Ministry Digital Verification Hash
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  Certified Paid
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setSelectedVoucher(null);
                  showNotice(`Downloaded clearance voucher PDF for ${selectedVoucher.filingNumber}`);
                }}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
              >
                <FileText className="h-4 w-4" />
                <span>Export PDF Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
