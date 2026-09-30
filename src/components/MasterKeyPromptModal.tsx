import React, { useState } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2, Lock, Sparkles, Crown } from 'lucide-react';

interface MasterKeyPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  isUnlocked: boolean;
  onLockMaster: () => void;
}

export const MasterKeyPromptModal: React.FC<MasterKeyPromptModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  isUnlocked,
  onLockMaster
}) => {
  const [enteredKey, setEnteredKey] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredKey.trim() === '1224') {
      setErrorMessage(null);
      setEnteredKey('');
      onUnlockSuccess();
      onClose();
    } else {
      setErrorMessage('Access Denied. Invalid Master Key. Enter the secret number 1224.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-amber-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400">
              <KeyRound className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-3 w-3" />
                <span>Builder Authority</span>
              </div>
              <h2 className="text-lg font-bold font-display text-white">
                Master Secret Key Authentication
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {isUnlocked ? (
          <div className="space-y-4 text-center py-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Master Builder Key Active</h3>
              <p className="text-xs text-slate-400">
                You have sovereign administrator authority over all system controls and country demographics.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Open Master Console
              </button>
              <button
                onClick={() => { onLockMaster(); onClose(); }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Lock Master Authority
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleKeySubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter the secret number <strong className="text-amber-300 font-mono">1224</strong> assigned to the builder of the website to control all systems and view registered members worldwide.
              </p>
            </div>

            <div className="flex justify-center">
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="• • • •"
                value={enteredKey}
                onChange={(e) => {
                  setEnteredKey(e.target.value.replace(/[^0-9]/g, ''));
                  setErrorMessage(null);
                }}
                className="w-48 text-center tracking-[0.8em] text-3xl font-mono font-bold py-3 rounded-2xl border-2 border-amber-500/60 bg-slate-950 text-amber-400 focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400 text-center font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Unlock Builder Console (1224)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
