import React, { useState } from 'react';
import { LiveChatMessage, MemberProfile, Language } from '../types';
import { playSpeech } from '../utils/translation';
import { 
  MessageSquare, 
  Send, 
  Crown, 
  Globe2, 
  Volume2, 
  Gift, 
  Sparkles, 
  CheckCircle2,
  Smile,
  ShieldCheck 
} from 'lucide-react';

interface LiveInformationChatProps {
  messages: LiveChatMessage[];
  currentMember: MemberProfile;
  currentLanguage: Language;
  onSendMessage: (msg: LiveChatMessage) => void;
  onSendGift: (recipientName: string, amountUSD: number) => void;
}

export const LiveInformationChat: React.FC<LiveInformationChatProps> = ({
  messages,
  currentMember,
  currentLanguage,
  onSendMessage,
  onSendGift
}) => {
  const [inputText, setInputText] = useState('');
  const [giftModalTarget, setGiftModalTarget] = useState<string | null>(null);
  const [giftAmount, setGiftAmount] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: LiveChatMessage = {
      id: `chat-${Date.now()}`,
      senderName: currentMember.fullName,
      senderCountry: currentMember.country,
      senderFourDigit: currentMember.fourDigitCode,
      isGoldenChair: currentMember.isGoldenChairMember,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      originalLanguage: currentLanguage
    };

    onSendMessage(newMsg);
    setInputText('');
  };

  const handleSpeakMessage = (msg: LiveChatMessage) => {
    playSpeech(msg.text, currentLanguage);
    showToast(`Reading message aloud in your native voice...`);
  };

  const handleConfirmGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftModalTarget) return;

    onSendGift(giftModalTarget, giftAmount);
    showToast(`You gifted $${giftAmount.toFixed(2)} to ${giftModalTarget}!`);
    setGiftModalTarget(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <MessageSquare className="h-4 w-4" />
            <span>Worldwide Multi-Language Communication</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Dialogue</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Live Global Information & Trade Chat
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Exchange ideas, negotiate commodity orders, share humanitarian news, and send generous gifts to fellow members across all nations with instant speech playback.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Globe2 className="h-3.5 w-3.5" />
          <span>Automatic Translation Active</span>
        </div>
      </div>

      {/* Chat Room Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xl">
        {/* Messages List */}
        <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-2">
          {messages.map((msg) => {
            const isSelf = msg.senderName === currentMember.fullName;

            return (
              <div
                key={msg.id}
                className={`p-4 rounded-2xl transition-all border text-xs space-y-2 ${
                  isSelf
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-100 ml-6 sm:ml-12'
                    : 'bg-slate-950 border-slate-800 text-slate-200 mr-6 sm:mr-12'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-sans text-sm">{msg.senderName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({msg.senderCountry})</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      #{msg.senderFourDigit}
                    </span>
                    {msg.isGoldenChair && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-2 py-0.5 rounded-full uppercase">
                        <Crown className="h-3 w-3" />
                        Golden Chair
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <span>{msg.time}</span>
                    <button
                      onClick={() => handleSpeakMessage(msg)}
                      className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Listen to this message spoken aloud"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                    {!isSelf && (
                      <button
                        onClick={() => setGiftModalTarget(msg.senderName)}
                        className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-sans font-semibold cursor-pointer ml-1"
                        title="Send gift tokens to this member"
                      >
                        <Gift className="h-3 w-3" />
                        <span>Send Gift</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {msg.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Send Message Input */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 border-t border-slate-800">
          <input
            type="text"
            placeholder="Type your message, trade inquiry, or idea to all nations..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 transition-all shadow-md cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Broadcast</span>
          </button>
        </form>
      </div>

      {/* Gift Sending Modal */}
      {giftModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Gift className="h-5 w-5" />
                <h3 className="text-base font-bold text-white">Send Generous Gift</h3>
              </div>
              <button
                onClick={() => setGiftModalTarget(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmGift} className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">RECIPIENT:</span>
                <span className="text-base font-bold text-white">{giftModalTarget}</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Gift Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 5, 10, 25].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setGiftAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        giftAmount === amt
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setGiftModalTarget(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
                >
                  Send Gift (${giftAmount.toFixed(2)})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
