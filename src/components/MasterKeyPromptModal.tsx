import React, { useState } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2, Lock, ArrowRight, Sparkles } from 'lucide-react';

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
  const [successAnimation, setSuccessAnimation] = useState(false);

  if (!isOpen) return null;

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredKey.trim() === '1224') {
      setErrorMessage(null);
      setSuccessAnimation(true);
      setTimeout(() => {
        setSuccessAnimation(false);
        setEnteredKey('');
        onUnlockSuccess();
        onClose();
      }, 700);
    } else {
      setErrorMessage('Access Denied. Invalid Master Builder Key. Please enter the valid key: 1224.');
    }
  };

  const handlePadClick = (num: string) => {
    if (enteredKey.length < 8) {
      setEnteredKey(prev => prev + num);
      setErrorMessage(null);
    }
  };

  const handleBackspace = () => {
    setEnteredKey(prev => prev.slice(0, -1));
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400">
              <KeyRound className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-3 w-3" />
                <span>Founder Authority</span>
              </div>
              <h2 className="text-lg font-bold text-white leading-tight">
                Master Builder Key Authentication
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
                You have full sovereign administrator control over all website systems and participants.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full rounded-lg bg-amber-500 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Open Master Control Console
              </button>
              <button
                onClick={() => {
                  onLockMaster();
                  onClose();
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Lock Master Access
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleKeySubmit} className="space-y-5">
            <div className="space-y-1 text-center">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter the secret master key to easily command all website systems, participant accounts, banking rails, and trade controls.
              </p>
            </div>

            {/* Key Input Box */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  maxLength={10}
                  placeholder="Enter Key (1224)"
                  value={enteredKey}
                  onChange={(e) => {
                    setEnteredKey(e.target.value);
                    setErrorMessage(null);
                  }}
                  className={`w-full rounded-xl border bg-slate-950 py-3.5 px-4 text-center font-mono text-2xl font-bold tracking-widest text-amber-400 focus:outline-none transition-colors ${
                    errorMessage ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-amber-500'
                  }`}
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium justify-center">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successAnimation && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold justify-center animate-pulse">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Master Key Verified! Initializing Sovereign Control...</span>
                </div>
              )}
            </div>

            {/* Quick PIN Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    if (k === 'C') setEnteredKey('');
                    else if (k === '⌫') handleBackspace();
                    else handlePadClick(k);
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5 font-mono text-sm font-semibold text-slate-200 hover:border-amber-500/50 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Unlock Master Control (Key: 1224)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
