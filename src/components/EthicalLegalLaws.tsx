import React, { useState } from 'react';
import { ComplianceLaw } from '../types';
import { 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Globe, 
  BookOpen
} from 'lucide-react';

interface EthicalLegalLawsProps {
  laws: ComplianceLaw[];
}

export const EthicalLegalLaws: React.FC<EthicalLegalLawsProps> = ({ laws }) => {
  const [selectedLaw, setSelectedLaw] = useState<ComplianceLaw>(laws[0]);
  const [activeChecklist, setActiveChecklist] = useState<Record<string, boolean>>({
    cdd: true,
    pep: true,
    sanctions: true,
    origin: true,
    environmental: true,
    taxReport: true
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleCheck = (key: string) => {
    setActiveChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadAudit = () => {
    setToastMessage('Official Zebene International Legal & Ethical Compliance Audit Certificate exported.');
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
            <span>Sovereign Jurisprudence</span>
            <span aria-hidden="true">·</span>
            <span>Multilateral Regulatory Harmony</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            International Ethical & Financial Laws Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Every transaction, data dispatch, and bank settlement conforms to FATF anti-money laundering codes, Basel III capital liquidity, AfCFTA trade treaties, and UN ethical declarations.
          </p>
        </div>

        <button
          onClick={handleDownloadAudit}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
        >
          <FileText className="h-4 w-4" />
          <span>Download Compliance Audit</span>
        </button>
      </div>

      {/* Live Compliance Health Checklist */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Real-Time International Compliance Health Auditor</span>
          </div>
          <span className="font-mono text-xs text-emerald-400">Status: 100% Multilateral Harmony</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'cdd', label: 'FATF Customer Due Diligence (CDD)', law: 'Recommendation 10' },
            { id: 'pep', label: 'Politically Exposed Persons (PEP) Screening', law: 'Recommendation 12' },
            { id: 'sanctions', label: 'UN Security Council Sanctions Intercept', law: 'UNSCR 1267/1373' },
            { id: 'origin', label: 'AfCFTA Rules of Origin Verification', law: 'Protocol on Trade' },
            { id: 'environmental', label: 'UN SDG Sustainable Labor & Ecology', law: 'SDG 8 & 9 Charter' },
            { id: 'taxReport', label: 'Automatic Cross-Border Tax Exchange', law: 'OECD CRS & State Codes' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-colors cursor-pointer text-xs"
            >
              <div className="space-y-0.5">
                <span className="text-slate-200 font-medium block">{item.label}</span>
                <span className="text-[10px] text-slate-500 font-mono">{item.law}</span>
              </div>
              <div className={`h-5 w-5 rounded-md flex items-center justify-center ${
                activeChecklist[item.id] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-600'
              }`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Law Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs text-slate-400 font-medium mb-1">
            Enforced Treaty Frameworks:
          </div>
          {laws.map((law) => (
            <div
              key={law.id}
              onClick={() => setSelectedLaw(law)}
              className={`p-4 rounded-xl border text-xs transition-all cursor-pointer space-y-1.5 ${
                selectedLaw.id === law.id
                  ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-md'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-amber-400 font-bold">{law.id}</span>
                <span className="text-slate-400">{law.scope}</span>
              </div>

              <h3 className="font-bold text-sm text-white leading-snug">
                {law.title}
              </h3>

              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                <span>{law.organization}</span>
                <span className="text-emerald-400 font-semibold">{law.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Detail Inspection */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                {selectedLaw.scope} · Treaty Articles
              </span>
              <h2 className="text-lg font-bold text-white">
                {selectedLaw.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Body: {selectedLaw.organization}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">{selectedLaw.enforcementDate}</span>
              </div>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Scale className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Articles & Statutes Enforced:</span>
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-amber-300 text-xs">
                {selectedLaw.articles}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Operational Mandate & Execution in Zebene:</span>
              <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                {selectedLaw.details}
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Globe className="h-3.5 w-3.5 text-amber-400" />
                <span>Zero-Tolerance Sovereign Enforcement</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Failure to comply with these codified frameworks results in instant automated freezing of interbank escrow clearing and referral to the respective regulatory authorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
