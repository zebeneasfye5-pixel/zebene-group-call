import React, { useState } from 'react';
import { InformationItem, AccessLevel } from '../types';
import { 
  Lock, 
  Unlock, 
  Search, 
  Plus, 
  Download, 
  CheckCircle2, 
  FileText, 
  AlertCircle
} from 'lucide-react';

interface InformationExchangeProps {
  informationList: InformationItem[];
  onAddInformation: (item: InformationItem) => void;
}

export const InformationExchange: React.FC<InformationExchangeProps> = ({
  informationList,
  onAddInformation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAccess, setSelectedAccess] = useState<string>('All');
  const [userClearance, setUserClearance] = useState<AccessLevel>('Government & Sovereign');
  const [showModal, setShowModal] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // New info form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<InformationItem['category']>('Trade Advisory');
  const [newAccess, setNewAccess] = useState<AccessLevel>('Public Worldwide');
  const [newAuthor, setNewAuthor] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  const categories = ['All', 'Trade Advisory', 'Economic Bulletin', 'Financial Circular', 'Agricultural Intel', 'Diplomatic & Sovereign'];
  const accessTiers: ('All' | AccessLevel)[] = ['All', 'Public Worldwide', 'Verified Trade Partners', 'Commercial Banks Only', 'Government & Sovereign'];

  const getClearanceRank = (tier: AccessLevel): number => {
    switch (tier) {
      case 'Public Worldwide': return 1;
      case 'Verified Trade Partners': return 2;
      case 'Commercial Banks Only': return 3;
      case 'Government & Sovereign': return 4;
      default: return 1;
    }
  };

  const filteredItems = informationList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesAccess = selectedAccess === 'All' || item.accessLevel === selectedAccess;
    return matchesSearch && matchesCategory && matchesAccess;
  });

  const handleDownload = (item: InformationItem) => {
    setDownloadSuccessToast(`Exported "${item.title}" with verification certificate.`);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const pseudoHash = 'SHA256: ' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 18);
    const newItem: InformationItem = {
      id: `INF-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      category: newCategory,
      accessLevel: newAccess,
      date: new Date().toISOString().split('T')[0],
      author: newAuthor.trim() || 'Zebene Directorate Officer',
      organization: newOrg.trim() || 'Zebene Global Information Network',
      verificationHash: pseudoHash,
      content: newContent.trim(),
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      downloadsCount: 1
    };

    onAddInformation(newItem);
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewOrg('');
    setNewTags('');
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-slate-900 p-4 text-xs font-medium text-emerald-300 shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Sovereign Data Governance</span>
            <span aria-hidden="true">·</span>
            <span>Cryptographic Proof</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Information Exchange & Access Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Publish, transmit, and regulate sovereign advisories, trade circulars, and agricultural intelligence across tiered international access classifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* User Clearance Simulator */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
            <span className="text-slate-400">Your Clearance:</span>
            <select
              value={userClearance}
              onChange={(e) => setUserClearance(e.target.value as AccessLevel)}
              className="bg-transparent text-amber-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Government & Sovereign" className="bg-slate-900">Government & Sovereign (Tier 4)</option>
              <option value="Commercial Banks Only" className="bg-slate-900">Commercial Banks Only (Tier 3)</option>
              <option value="Verified Trade Partners" className="bg-slate-900">Verified Trade Partners (Tier 2)</option>
              <option value="Public Worldwide" className="bg-slate-900">Public Worldwide (Tier 1)</option>
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>Transmit Information</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars, hash, directives, tags, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-amber-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Access Tier Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          {accessTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedAccess(tier)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedAccess === tier
                  ? 'bg-amber-500/15 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tier === 'All' ? 'All Tiers' : tier.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Information Feed / Cards */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <FileText className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-300">No matching circulars found</h3>
            <p className="text-xs text-slate-500 mt-1">Try refining your search terms or clearing access filters.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isAuthorized = getClearanceRank(userClearance) >= getClearanceRank(item.accessLevel);

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-5 sm:p-6 transition-all ${
                  isAuthorized
                    ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    : 'border-rose-950/60 bg-slate-950/80 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono text-amber-400 font-medium">{item.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300 font-medium">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className={`font-medium ${
                        item.accessLevel === 'Government & Sovereign' ? 'text-rose-400' :
                        item.accessLevel === 'Commercial Banks Only' ? 'text-cyan-400' :
                        item.accessLevel === 'Verified Trade Partners' ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {item.accessLevel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Published {item.date}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h2>

                    <div className="text-xs text-slate-400">
                      <span>Source: {item.author}</span>
                      <span className="mx-2 text-slate-600">|</span>
                      <span>{item.organization}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isAuthorized ? (
                      <button
                        onClick={() => handleDownload(item)}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5 text-amber-400" />
                        <span>Export Directive</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Restricted Clearance</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content preview or redaction */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  {isAuthorized ? (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.content}
                    </p>
                  ) : (
                    <div className="rounded-lg bg-slate-950 p-4 border border-rose-950 text-xs text-slate-400 flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-rose-300 block">Classified Document Protected</span>
                        <span>This document requires {item.accessLevel} clearance. Upgrade your institutional profile or switch your test clearance above to view the decrypted text.</span>
                      </div>
                    </div>
                  )}

                  {/* Cryptographic hash and tags */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500">
                    <div className="font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-slate-400">Integrity:</span>
                      <span className="text-slate-300">{item.verificationHash}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.tags.map(t => (
                        <span key={t} className="text-slate-400">#{t}</span>
                      ))}
                      <span className="text-slate-600">·</span>
                      <span>{item.downloadsCount} Verifications</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Transmit Information */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Transmit & Control Secure Information</h3>
                <p className="text-xs text-slate-400 mt-0.5">Mint a cryptographically stamped circular into the Zebene ledger</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Document Title / Circular Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Strategic Coffee Trade Corridor Transit Clearance"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Information Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Trade Advisory">Trade Advisory</option>
                    <option value="Economic Bulletin">Economic Bulletin</option>
                    <option value="Financial Circular">Financial Circular</option>
                    <option value="Agricultural Intel">Agricultural Intel</option>
                    <option value="Diplomatic & Sovereign">Diplomatic & Sovereign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Security & Access Classification
                  </label>
                  <select
                    value={newAccess}
                    onChange={(e) => setNewAccess(e.target.value as AccessLevel)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Public Worldwide">Public Worldwide (Unrestricted)</option>
                    <option value="Verified Trade Partners">Verified Trade Partners</option>
                    <option value="Commercial Banks Only">Commercial Banks Only</option>
                    <option value="Government & Sovereign">Government & Sovereign (Restricted)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Authorized Signatory / Author
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Foreign Trade Commissioner"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Issuing Organization / Ministry
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. National Trade Regulatory Authority"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Verified Circular Body / Official Directives
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail the actionable intelligence, regulatory requirements, or trade updates..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Index Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Coffee, Logistics, Customs, AfCFTA"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  Sign & Publish Circular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
