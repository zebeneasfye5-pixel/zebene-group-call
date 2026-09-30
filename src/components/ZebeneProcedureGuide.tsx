import React, { useState } from 'react';
import { ZEBEN_PROCEDURES } from '../data/mockData';
import { 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Search, 
  ArrowRight, 
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const ZebeneProcedureGuide: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeProcedure = ZEBEN_PROCEDURES[activeStepIndex];

  const faqs = [
    {
      q: 'Why does the application generate income exclusively for the owner and not for members?',
      a: 'This legal and economic separation is established in accordance with international financial regulations. By ensuring members operate strictly as utility and transaction participants (trading goods, accessing information, paying statutory taxes, playing gift games) rather than receiving dividends, the application complies with central bank laws and avoids being classified as a speculative investment fund.'
    },
    {
      q: 'How does the Expense-to-Income mechanism work in practice?',
      a: 'Operating payments (freight, port handling, interbank transfer spreads) pass through our short-term interbank treasury float (linked to CBE and AfDB). During standard settlement windows, overnight repurchase agreements yield between 4.8% and 8.5% APY, which is credited back directly to the enterprise account as an operational fee rebate.'
    },
    {
      q: 'How are government business taxes and bank stamp duties guaranteed zero leakage?',
      a: 'Taxes such as the 15% VAT, customs tariffs, and 0.5% bank stamp duty are calculated algorithmically at trade execution and deducted instantaneously from the escrow settlement before final disbursement to the seller. The funds are remitted directly via ISO 20022 interbank message to the Federal Ministry of Finance with official digital filing certificates.'
    },
    {
      q: 'Who can participate in the Generational Idea & Gift Gaming Arena?',
      a: 'All citizens, students, farmers, cooperatives, and entrepreneurs worldwide can participate for free. By playing the educational quizzes and submitting solutions for clean water, energy, or agriculture, participants receive non-monetary gift tokens and civic certificates to fund generational impact.'
    }
  ];

  const filteredProcedures = ZEBEN_PROCEDURES.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.instructions.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleExportManual = () => {
    setToastMessage('Official Zeben Standard Operating Procedure Handbook (PDF) downloaded.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Official Operating Framework</span>
            <span aria-hidden="true">·</span>
            <span>Standard Operating Procedures (SOP)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Zeben Procedure Portal & User Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            The codified procedure website detailing institutional verification, information control, generational gaming, product trading, expense-to-income generation, and government tax compliance.
          </p>
        </div>

        <button
          onClick={handleExportManual}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
        >
          <FileText className="h-4 w-4" />
          <span>Download Zeben SOP Manual (PDF)</span>
        </button>
      </div>

      {/* Search Bar for Procedures */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search operating procedures, instructions, prerequisites, or compliance laws..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* Main Interactive Guide Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Step Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-medium text-slate-400 mb-2">
            7 Codified Procedures:
          </div>

          {filteredProcedures.map((proc, idx) => {
            const isSelected = activeStepIndex === (proc.stepNumber - 1);

            return (
              <button
                key={proc.stepNumber}
                onClick={() => setActiveStepIndex(proc.stepNumber - 1)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  0{proc.stepNumber}
                </div>
                <div className="flex-1 space-y-0.5">
                  <span className="font-semibold text-slate-200 block leading-tight">
                    {proc.title}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1">
                    {proc.objective}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Step Detailed Manual */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Procedure Document Ref: ZEB-SOP-0{activeProcedure.stepNumber}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Enforced Standard
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mt-1">
              Step {activeProcedure.stepNumber}: {activeProcedure.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
              <strong className="text-amber-400 font-mono">Objective: </strong>
              {activeProcedure.objective}
            </p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Mandatory Prerequisites & Credentials:
            </h3>
            <div className="space-y-1.5">
              {activeProcedure.prerequisites.map((prereq, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{prereq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sequential Step Instructions */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Step-by-Step Execution Protocol:
            </h3>
            <div className="space-y-2">
              {activeProcedure.instructions.map((inst, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-mono text-amber-400">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{inst}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Governing Law & Operational Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Governing International Statute:</span>
              <span className="text-cyan-400 font-medium block">{activeProcedure.complianceLaw}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Operational Governance Note:</span>
              <span className="text-slate-400 block">{activeProcedure.notes}</span>
            </div>
          </div>

          {/* Next Step Button */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeStepIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'
              }`}
            >
              ← Previous Procedure
            </button>

            <button
              onClick={() => setActiveStepIndex((prev) => Math.min(ZEBEN_PROCEDURES.length - 1, prev + 1))}
              disabled={activeStepIndex === ZEBEN_PROCEDURES.length - 1}
              className={`flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors ${
                activeStepIndex === ZEBEN_PROCEDURES.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-400 cursor-pointer'
              }`}
            >
              <span>Next Procedure</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-400 tracking-wider">
          <HelpCircle className="h-4 w-4" />
          <span>Operational Procedures FAQ</span>
        </div>

        <h3 className="text-lg font-bold text-white">
          Frequently Answered Operating Guidelines
        </h3>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 transition-colors"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {expandedFaq === idx && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
