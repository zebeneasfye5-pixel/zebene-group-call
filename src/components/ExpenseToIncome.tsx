import React, { useState } from 'react';
import { Currency } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText, 
  Info,
  Clock
} from 'lucide-react';

interface ExpenseToIncomeProps {
  currency: Currency;
}

export const ExpenseToIncome: React.FC<ExpenseToIncomeProps> = ({ currency }) => {
  // Simulator state (in USD)
  const [logisticsExpense, setLogisticsExpense] = useState<number>(45000);
  const [bankWireExpense, setBankWireExpense] = useState<number>(12000);
  const [storageExpense, setStorageExpense] = useState<number>(18500);
  const [customsInspectionExpense, setCustomsInspectionExpense] = useState<number>(8500);
  const [yieldRatePercent, setYieldRatePercent] = useState<number>(6.8);

  const [activeTab, setActiveTab] = useState<'calculator' | 'ledger' | 'whitepaper'>('calculator');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Calculations
  const monthlyTotalExpenseUSD = logisticsExpense + bankWireExpense + storageExpense + customsInspectionExpense;
  const annualTotalExpenseUSD = monthlyTotalExpenseUSD * 12;
  const annualIncomeGeneratedUSD = (annualTotalExpenseUSD * yieldRatePercent) / 100;
  const monthlyIncomeGeneratedUSD = annualIncomeGeneratedUSD / 12;
  const fiveYearCumulativeIncomeUSD = annualIncomeGeneratedUSD * 5 * 1.15; // with compound treasury multiplier

  // Mock historical expense-to-income records
  const expenseRecords = [
    {
      id: 'EXP-INC-091',
      category: 'Multimodal Rail & Port Freight',
      originalExpenseUSD: 38400,
      yieldRate: '7.2%',
      incomeGeneratedUSD: 2764.8,
      settlementRail: 'CBE Sovereign Logistics Float',
      date: '2026-09-18',
      status: 'Income Credited'
    },
    {
      id: 'EXP-INC-092',
      category: 'Interbank SWIFT MT103 Fees',
      originalExpenseUSD: 14200,
      yieldRate: '6.5%',
      incomeGeneratedUSD: 923.0,
      settlementRail: 'AfDB Trade Liquidity Vault',
      date: '2026-09-21',
      status: 'Income Credited'
    },
    {
      id: 'EXP-INC-093',
      category: 'Cold-Chain Warehouse Refrigeration',
      originalExpenseUSD: 22800,
      yieldRate: '7.0%',
      incomeGeneratedUSD: 1596.0,
      settlementRail: 'Standard Chartered Overnight Pool',
      date: '2026-09-24',
      status: 'Income Credited'
    },
    {
      id: 'EXP-INC-094',
      category: 'Phytosanitary & Lab Assays',
      originalExpenseUSD: 9600,
      yieldRate: '6.8%',
      incomeGeneratedUSD: 652.8,
      settlementRail: 'Zebene Treasury Clearing Reserve',
      date: '2026-09-28',
      status: 'Processing Accrual'
    }
  ];

  const handleExportStatement = () => {
    setExportNotice('Expense-to-Income Certified Statement downloaded to your ledger.');
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-amber-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Proprietary Financial Technology</span>
            <span aria-hidden="true">·</span>
            <span>Algorithmic Yield Mechanism</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Expense-to-Income Cashflow Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Transform unavoidable corporate operating expenditures into recurring institutional income offsets through automated interbank treasury vault liquidity routing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Yield Simulator
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'ledger'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Conversion Ledger
          </button>
          <button
            onClick={() => setActiveTab('whitepaper')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'whitepaper'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mechanism Architecture
          </button>
        </div>
      </div>

      {/* Tab 1: Yield Simulator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white">
                Monthly Commercial Expense Inputs
              </h2>
              <p className="text-xs text-slate-400">
                Enter your standard trade, freight, and administrative expense amounts
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Cross-Border Freight & Logistics</span>
                  <span className="font-mono text-white">{formatCurrency(logisticsExpense, currency)}/mo</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="2500"
                  value={logisticsExpense}
                  onChange={(e) => setLogisticsExpense(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Interbank FX & Wire Transfer Fees</span>
                  <span className="font-mono text-white">{formatCurrency(bankWireExpense, currency)}/mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="80000"
                  step="1000"
                  value={bankWireExpense}
                  onChange={(e) => setBankWireExpense(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Port Storage & Cold-Chain Warehousing</span>
                  <span className="font-mono text-white">{formatCurrency(storageExpense, currency)}/mo</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1500"
                  value={storageExpense}
                  onChange={(e) => setStorageExpense(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Customs, Laboratory & Assay Fees</span>
                  <span className="font-mono text-white">{formatCurrency(customsInspectionExpense, currency)}/mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={customsInspectionExpense}
                  onChange={(e) => setCustomsInspectionExpense(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Yield Rate Slider */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex justify-between text-xs font-medium text-amber-300 mb-1.5">
                  <span>Algorithmic Treasury Vault Yield Rate:</span>
                  <span className="font-mono font-bold">{yieldRatePercent.toFixed(1)}% APY</span>
                </div>
                <input
                  type="range"
                  min="4.5"
                  max="9.0"
                  step="0.1"
                  value={yieldRatePercent}
                  onChange={(e) => setYieldRatePercent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Derived from overnight sovereign liquidity swaps and treasury bills.
                </span>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Projected Income Generated From Expenses
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active Vault
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Annual Income Returned to Cashflow</span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 tabular-nums">
                    {formatCurrency(annualIncomeGeneratedUSD, currency)}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Equivalent to <strong className="text-white font-mono">{formatCurrency(monthlyIncomeGeneratedUSD, currency)}</strong> monthly residual income generated strictly from your business expenses.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Total Outgoing Expenses</span>
                    <span className="text-slate-200 font-bold tabular-nums">
                      {formatCurrency(annualTotalExpenseUSD, currency)}/yr
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">5-Year Cumulative Income</span>
                    <span className="text-amber-400 font-bold tabular-nums">
                      {formatCurrency(fiveYearCumulativeIncomeUSD, currency)}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-950/90 p-4 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                    <Info className="h-3.5 w-3.5" />
                    <span>How This Income Is Created:</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    While expenses normally disappear, the Zebene engine holds operational payment floats in sovereign short-term liquidity pools across connected partner banks (e.g. CBE & AfDB). The accrued interest is credited back to your account as net cashflow income.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleExportStatement}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Expense-to-Income Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ledger */}
      {activeTab === 'ledger' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Verified Historical Expense-to-Income Conversions</span>
            <span className="font-mono text-emerald-400">Total Yield Realized: $5,936.60</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Ledger ID & Date</th>
                  <th className="py-3 px-4">Expense Category</th>
                  <th className="py-3 px-4">Expense Paid</th>
                  <th className="py-3 px-4">Yield Rate</th>
                  <th className="py-3 px-4">Income Generated</th>
                  <th className="py-3 px-4">Liquidity Rail</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {expenseRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-amber-400">
                      <div>{rec.id}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{rec.date}</div>
                    </td>
                    <td className="py-3.5 px-4 text-white font-sans font-medium">
                      {rec.category}
                    </td>
                    <td className="py-3.5 px-4 text-rose-300 tabular-nums">
                      -{formatCurrency(rec.originalExpenseUSD, currency)}
                    </td>
                    <td className="py-3.5 px-4 text-amber-400 tabular-nums">
                      {rec.yieldRate}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400 tabular-nums">
                      +{formatCurrency(rec.incomeGeneratedUSD, currency)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans">
                      {rec.settlementRail}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-sans font-medium ${
                        rec.status === 'Income Credited'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {rec.status === 'Income Credited' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Whitepaper Architecture */}
      {activeTab === 'whitepaper' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">Technical Whitepaper Abstract</span>
            <h2 className="text-xl font-bold text-white mt-1">
              The Zebene Expense-to-Income Protocol Specification
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Document Ref: ZEB-EXP-INCOME-V26 · Standard Sovereign Financial Engineering
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="text-sm font-bold text-amber-300">1. Problem Formulation</h3>
            <p>
              In global trade, corporations and agricultural cooperatives incur substantial operating expenses that represent deadweight cash loss: cross-border shipping tariffs, letter of credit issuance fees, quarantine assays, and multi-currency foreign exchange spreads.
            </p>

            <h3 className="text-sm font-bold text-amber-300">2. The Algorithmic Liquidity Settlement Vault</h3>
            <p>
              Under the Zebene International Multi-purpose Application, all expense flows pass through automated escrow settlement rails linked directly with partner banks (Commercial Bank of Ethiopia, African Development Bank, Standard Chartered). During the mandatory trade fulfillment and clearance settlement periods (typically 3 to 14 days), the underlying funds are placed into sovereign repurchase agreements (Repo) and AAA-rated central bank short-term paper.
            </p>

            <h3 className="text-sm font-bold text-amber-300">3. Income Distribution & Cashflow Offsets</h3>
            <p>
              Rather than retaining 100% of interbank float gains, the Zebene platform converts this yield into a direct Cashflow Offset Rebate Income credited to the enterprise profile. The result is that higher operating activity yields measurable recurring income, reversing the traditional burden of commercial expenses.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Compliant with Basel III Liquidity Coverage Ratios (LCR)</span>
            <button
              onClick={handleExportStatement}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>Export Full PDF Whitepaper</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
