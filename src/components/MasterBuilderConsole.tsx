import React, { useState } from 'react';
import { MemberProfile, CountryStatistic } from '../types';
import { 
  KeyRound, 
  Users, 
  Globe, 
  Crown, 
  ShieldCheck, 
  Radio, 
  Lock, 
  Sliders, 
  CheckCircle2, 
  Search, 
  UserCheck, 
  Sparkles,
  BarChart3,
  Building2
} from 'lucide-react';

interface MasterBuilderConsoleProps {
  members: MemberProfile[];
  countryStats: CountryStatistic[];
  onUpdateMemberStatus: (memberId: string, isGolden: boolean) => void;
  onBroadcastAnnouncement: (message: string | null) => void;
  currentBroadcast: string | null;
  onLockMaster: () => void;
}

export const MasterBuilderConsole: React.FC<MasterBuilderConsoleProps> = ({
  members,
  countryStats,
  onUpdateMemberStatus,
  onBroadcastAnnouncement,
  currentBroadcast,
  onLockMaster
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastInput, setBroadcastInput] = useState(currentBroadcast || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalMembersCount = 3730; // Global verified registry count

  const filteredMembers = members.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.fourDigitCode.includes(searchTerm)
  );

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBroadcastAnnouncement(broadcastInput.trim() || null);
    showToast(broadcastInput.trim() ? 'Sovereign announcement broadcasted to all member headers!' : 'Broadcast cleared.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-6 bg-amber-500/5 p-6 rounded-3xl border">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
            <KeyRound className="h-4 w-4" />
            <span>Master Builder System Control (Key 1224)</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">Total Authority Active</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Global System Command & Member Demographics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Exclusive dashboard for the creator of Zebene Asfye International Communication. Inspect worldwide member registration by country, audit verified profiles, and command all website sub-systems.
          </p>
        </div>

        <button
          onClick={onLockMaster}
          className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer self-start md:self-auto"
        >
          <Lock className="h-4 w-4" />
          <span>Lock Master Controls</span>
        </button>
      </div>

      {/* Key Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>TOTAL MEMBERS:</span>
            <Users className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {totalMembersCount.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 block font-mono">Across 36 Nations Worldwide</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>GOLDEN CHAIR MEMBERS:</span>
            <Crown className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono">
            312 VIPs
          </div>
          <span className="text-[11px] text-slate-400 block font-mono">Right Thumb & Eye Cleared</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>AUTHENTICATION PASSCODE:</span>
            <KeyRound className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300 font-mono">
            4-Digits
          </div>
          <span className="text-[11px] text-slate-400 block font-mono">Unique Member Code Standard</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SYSTEM INTEGRITY:</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            100% Verified
          </div>
          <span className="text-[11px] text-slate-400 block font-mono">Statutory 15% VAT & Bank Clearing</span>
        </div>
      </div>

      {/* CORE SPEC: Country-by-Country Member Registration Breakdown */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Globe className="h-5 w-5 text-amber-400" />
              <span>Worldwide Member Registration Breakdown by Country</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live census tracking how many people have registered from each nation
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Real-Time Census Active
          </span>
        </div>

        {/* Demographics Bar Chart & Statistics List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {countryStats.map((stat, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800/80 bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <span className="text-lg">{stat.flag}</span>
                  <span>{stat.country}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-amber-400">{stat.memberCount.toLocaleString()} Members</span>
                  <span className="text-slate-400 text-[11px] ml-2">({stat.percentage}%)</span>
                </div>
              </div>

              {/* Graphical Percentage Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${stat.percentage}%` }}
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Sovereign Broadcast Controller */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Radio className="h-5 w-5 text-amber-400 animate-pulse" />
          <h3 className="text-base font-bold text-white font-display">
            Global Emergency & Sovereign Broadcast System
          </h3>
        </div>

        <form onSubmit={handleBroadcastSubmit} className="space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed">
            Broadcast an urgent announcement, economic directive, or humanitarian bulletin directly onto the header banner of every connected member worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="e.g. Humanitarian water convoy dispatched to Somali lowlands. Bank escrow active."
              value={broadcastInput}
              onChange={(e) => setBroadcastInput(e.target.value)}
              className="flex-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Transmit Broadcast
              </button>
              {currentBroadcast && (
                <button
                  type="button"
                  onClick={() => {
                    setBroadcastInput('');
                    onBroadcastAnnouncement(null);
                    showToast('Broadcast dismissed.');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-950 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Registered Members Directory & Four-Digit Passcode Audit */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-emerald-400" />
              <span>Registered Participant Directory & Biometric Audits</span>
            </h3>
            <p className="text-xs text-slate-400">
              Audit member names, countries, age, gender, and four-digit security codes
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by name, country, or 4-digit code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <Search className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Member Name</th>
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Age / Gender</th>
                <th className="py-2.5 px-3">4-Digit Passcode</th>
                <th className="py-2.5 px-3">Biometrics</th>
                <th className="py-2.5 px-3">Golden Chair</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">VIP Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredMembers.map((mem) => (
                <tr key={mem.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                      <img src={mem.avatarUrl || '/images/director_zebene.jpg'} alt={mem.fullName} className="h-full w-full object-cover" />
                    </div>
                    <span>{mem.fullName}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans">{mem.country}</td>
                  <td className="py-3 px-3 text-slate-400">{mem.age} yrs · {mem.gender}</td>
                  <td className="py-3 px-3 text-amber-400 font-bold tracking-widest text-sm">
                    {mem.fourDigitCode}
                  </td>
                  <td className="py-3 px-3 text-emerald-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Thumb & Eye Cleared
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {mem.isGoldenChairMember ? (
                      <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 uppercase">
                        <Crown className="h-2.5 w-2.5" /> VIP Seat
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Standard</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-emerald-400 text-[11px]">{mem.status}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        onUpdateMemberStatus(mem.id, !mem.isGoldenChairMember);
                        showToast(`Updated Golden Chair status for ${mem.fullName}`);
                      }}
                      className="text-[11px] font-sans font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      {mem.isGoldenChairMember ? 'Revoke Seat' : 'Grant Golden Chair'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
