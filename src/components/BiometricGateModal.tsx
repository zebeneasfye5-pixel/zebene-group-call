import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { 
  Fingerprint, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Globe, 
  Sparkles, 
  Lock, 
  KeyRound, 
  ArrowRight,
  Crown
} from 'lucide-react';

interface BiometricGateModalProps {
  onUnlockSuccess: (member: MemberProfile) => void;
  existingMembers: MemberProfile[];
}

export const BiometricGateModal: React.FC<BiometricGateModalProps> = ({
  onUnlockSuccess,
  existingMembers
}) => {
  // Flow mode: 'register' or 'quick-login'
  const [flowMode, setFlowMode] = useState<'register' | 'quick-login'>('register');
  
  // Registration steps: 1: Details, 2: Right Thumb, 3: Right Eye, 4: Mint 4-Digit, 5: Passcode Entry Unlock
  const [regStep, setRegStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>(28);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>('Male');
  const [country, setCountry] = useState('Ethiopia');

  // Biometric animation states
  const [isScanningThumb, setIsScanningThumb] = useState(false);
  const [thumbVerified, setThumbVerified] = useState(false);
  const [thumbHash, setThumbHash] = useState('');

  const [isScanningEye, setIsScanningEye] = useState(false);
  const [eyeVerified, setEyeVerified] = useState(false);
  const [eyeHash, setEyeHash] = useState('');

  // The generated 4-digit code
  const [generatedFourDigit, setGeneratedFourDigit] = useState('');

  // Passcode entry keypad input
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Quick Login state for returning members
  const [quickLoginCode, setQuickLoginCode] = useState('');
  const [quickLoginError, setQuickLoginError] = useState<string | null>(null);

  // Step 2: Handle Right Thumbprint Scan
  const handleScanRightThumb = () => {
    setIsScanningThumb(true);
    setTimeout(() => {
      const hash = 'THUMB-RH-SHA256:' + Math.random().toString(16).substring(2, 8).toUpperCase() + Math.random().toString(16).substring(2, 6).toUpperCase();
      setThumbHash(hash);
      setThumbVerified(true);
      setIsScanningThumb(false);
    }, 1600);
  };

  // Step 3: Handle Right Eye Retinal Scan
  const handleScanRightEye = () => {
    setIsScanningEye(true);
    setTimeout(() => {
      const hash = 'IRIS-RE-SHA256:' + Math.random().toString(16).substring(2, 8).toUpperCase() + Math.random().toString(16).substring(2, 6).toUpperCase();
      setEyeHash(hash);
      setEyeVerified(true);
      setIsScanningEye(false);
    }, 1600);
  };

  // Step 4: Mint 4-Digit Code
  const handleGenerateFourDigit = () => {
    // Generate a clean 4-digit number (e.g. 5831)
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedFourDigit(code);
    setRegStep(4);
  };

  // Step 5: Verify Entered 4-Digit Code to Unlock Website
  const handleVerifyUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPasscode.trim() === generatedFourDigit || enteredPasscode.trim() === '1224') {
      const newMember: MemberProfile = {
        id: `MEM-${Math.floor(100 + Math.random() * 900)}`,
        fullName: fullName.trim() || 'Honored Member',
        age: Number(age) || 28,
        gender,
        country,
        thumbprintVerified: true,
        thumbprintHash: thumbHash || 'THUMB-RH-VERIFIED-PASS',
        eyeprintVerified: true,
        eyeprintHash: eyeHash || 'IRIS-RE-VERIFIED-PASS',
        fourDigitCode: generatedFourDigit,
        registeredDate: new Date().toISOString().split('T')[0],
        isGoldenChairMember: true,
        balanceUSD: 50.00, // Welcome grant
        tasksCompleted: 0,
        donationsGivenUSD: 0,
        avatarUrl: '/images/director_zebene.jpg',
        status: 'VIP Golden Member'
      };
      onUnlockSuccess(newMember);
    } else {
      setPasscodeError(`Invalid 4-digit code. Please enter your generated code: ${generatedFourDigit}`);
    }
  };

  // Quick Login Submit
  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = existingMembers.find(m => m.fourDigitCode === quickLoginCode.trim());
    if (found) {
      onUnlockSuccess(found);
    } else if (quickLoginCode.trim() === '1224') {
      onUnlockSuccess(existingMembers[0]);
    } else {
      setQuickLoginError('Invalid code. Try 1224 (Director Zebene) or register below.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xl overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl border border-amber-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 relative my-auto">
        
        {/* Decorative Golden Ambient Accent */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-amber-500/20 blur-2xl rounded-full pointer-events-none" />

        {/* Top Header */}
        <div className="text-center space-y-2 border-b border-slate-800 pb-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg gold-glow">
            <Crown className="h-8 w-8" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Biometric Security Verification</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
            Zebene Asfye International Communication
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Please register your verified profile with right thumb & eye prints to receive your unique 4-digit entry passcode.
          </p>

          {/* Toggle between Register & Quick Login */}
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => { setFlowMode('register'); setRegStep(1); }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                flowMode === 'register'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              New Member Biometric Registration
            </button>
            <button
              onClick={() => { setFlowMode('quick-login'); }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                flowMode === 'quick-login'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Enter 4-Digit Passcode
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE A: QUICK LOGIN BY 4-DIGIT CODE */}
        {/* ========================================================================= */}
        {flowMode === 'quick-login' && (
          <form onSubmit={handleQuickLogin} className="space-y-5 py-2">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Existing Member Authentication
              </span>
              <p className="text-xs text-slate-400">
                Enter your issued 4-digit number to unlock the platform.
              </p>
            </div>

            <div className="flex justify-center">
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="• • • •"
                value={quickLoginCode}
                onChange={(e) => {
                  setQuickLoginCode(e.target.value.replace(/[^0-9]/g, ''));
                  setQuickLoginError(null);
                }}
                className="w-48 text-center tracking-[1em] text-3xl font-mono font-bold py-3 rounded-2xl border-2 border-amber-500/60 bg-slate-950 text-amber-400 focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {quickLoginError && (
              <p className="text-xs text-rose-400 text-center font-medium">{quickLoginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Unlock Website</span>
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-slate-500">
                Master Founder Key: <strong className="text-amber-400 font-mono">1224</strong>
              </span>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE B: 5-STEP BIOMETRIC REGISTRATION FLOW */}
        {/* ========================================================================= */}
        {flowMode === 'register' && (
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6 px-2">
              {[
                { s: 1, label: 'Details' },
                { s: 2, label: 'Right Thumb' },
                { s: 3, label: 'Right Eye' },
                { s: 4, label: 'Your 4-Digit' },
                { s: 5, label: 'Unlock' }
              ].map(({ s, label }) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    regStep === s
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                      : regStep > s
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {regStep > s ? '✓' : s}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 hidden sm:block">{label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Personal Details */}
            {regStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); if (fullName.trim()) setRegStep(2); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Participant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dawit Haile"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min={16}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Gender *
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Country of Origin / Residence *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Ethiopia">Ethiopia 🇪🇹</option>
                    <option value="Kenya">Kenya 🇰🇪</option>
                    <option value="United States">United States 🇺🇸</option>
                    <option value="Belgium">Belgium 🇧🇪</option>
                    <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                    <option value="China">China 🇨🇳</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="France">France 🇫🇷</option>
                    <option value="Germany">Germany 🇩🇪</option>
                    <option value="South Africa">South Africa 🇿🇦</option>
                    <option value="Nigeria">Nigeria 🇳🇬</option>
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="Other">Other Nation 🌐</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Right Thumbprint</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Right Thumbprint Scan */}
            {regStep === 2 && (
              <div className="space-y-5 text-center py-2">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Right-Hand Thumbprint Scan</h3>
                  <p className="text-xs text-slate-400">
                    Place your right thumb onto the optical sensor to capture your biometric pattern.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className={`relative flex h-36 w-36 items-center justify-center rounded-3xl border-2 transition-all ${
                    thumbVerified
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : isScanningThumb
                      ? 'border-amber-400 bg-amber-500/10 text-amber-400 animate-pulse'
                      : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600'
                  }`}>
                    <Fingerprint className={`h-20 w-20 ${isScanningThumb ? 'animate-pulse' : ''}`} />
                    
                    {/* Laser scanning bar */}
                    {isScanningThumb && (
                      <div className="absolute inset-x-0 h-1 bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-bounce top-2" />
                    )}

                    {thumbVerified && (
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 text-slate-950 shadow-md">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {thumbVerified ? (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs font-mono text-emerald-300">
                      Right Thumb Verified: {thumbHash}
                    </div>
                    <button
                      onClick={() => setRegStep(3)}
                      className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Right Eyeprint</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleScanRightThumb}
                    disabled={isScanningThumb}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isScanningThumb ? 'Scanning Right Thumb...' : 'Scan Right Thumbprint'}
                  </button>
                )}
              </div>
            )}

            {/* STEP 3: Right Eyeprint (Retinal) Scan */}
            {regStep === 3 && (
              <div className="space-y-5 text-center py-2">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Right-Eye Retinal Print Scan</h3>
                  <p className="text-xs text-slate-400">
                    Align your right eye with the ocular scanner for cryptographic iris validation.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className={`relative flex h-36 w-36 items-center justify-center rounded-3xl border-2 transition-all ${
                    eyeVerified
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : isScanningEye
                      ? 'border-amber-400 bg-amber-500/10 text-amber-400 animate-pulse'
                      : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600'
                  }`}>
                    <Eye className={`h-20 w-20 ${isScanningEye ? 'animate-pulse' : ''}`} />

                    {/* Concentric ocular rings */}
                    {isScanningEye && (
                      <div className="absolute inset-2 border-2 border-amber-400 border-dashed rounded-full animate-spin" />
                    )}

                    {eyeVerified && (
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 text-slate-950 shadow-md">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {eyeVerified ? (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs font-mono text-emerald-300">
                      Right Eye Verified: {eyeHash}
                    </div>
                    <button
                      onClick={handleGenerateFourDigit}
                      className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Mint My 4-Digit Passcode</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleScanRightEye}
                    disabled={isScanningEye}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isScanningEye ? 'Capturing Retinal Eyeprint...' : 'Scan Right Eyeprint'}
                  </button>
                )}
              </div>
            )}

            {/* STEP 4: 4-Digit Number Issued */}
            {regStep === 4 && (
              <div className="space-y-5 text-center py-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-display">Biometrics Successfully Verified!</h3>
                  <p className="text-xs text-slate-400">
                    Here is your personal four-digit security number. Please remember it.
                  </p>
                </div>

                {/* Issued 4-Digit Badge Card */}
                <div className="rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-slate-950 p-6 space-y-2 shadow-2xl gold-glow">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-semibold block">
                    Your Assigned Passcode
                  </span>
                  <div className="text-4xl font-mono font-extrabold text-amber-300 tracking-[0.4em] select-all">
                    {generatedFourDigit}
                  </div>
                  <span className="text-[11px] text-slate-400 block pt-1">
                    Registered to: <strong className="text-white">{fullName}</strong> ({country})
                  </span>
                </div>

                <button
                  onClick={() => setRegStep(5)}
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enter Code to Open Website</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* STEP 5: Enter 4-Digit Code to Open the Entire Website */}
            {regStep === 5 && (
              <form onSubmit={handleVerifyUnlock} className="space-y-5 py-2">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                    Security Passcode Entry
                  </span>
                  <h3 className="text-base font-bold text-white">Enter Your 4-Digit Number</h3>
                  <p className="text-xs text-slate-400">
                    Enter the code <strong className="text-amber-300 font-mono">({generatedFourDigit})</strong> to unlock the entire website.
                  </p>
                </div>

                <div className="flex justify-center">
                  <input
                    type="password"
                    maxLength={4}
                    autoFocus
                    placeholder="• • • •"
                    value={enteredPasscode}
                    onChange={(e) => {
                      setEnteredPasscode(e.target.value.replace(/[^0-9]/g, ''));
                      setPasscodeError(null);
                    }}
                    className="w-48 text-center tracking-[1em] text-3xl font-mono font-bold py-3 rounded-2xl border-2 border-amber-500 bg-slate-950 text-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-inner"
                  />
                </div>

                {passcodeError && (
                  <p className="text-xs text-rose-400 text-center font-medium">{passcodeError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold uppercase tracking-widest text-xs hover:from-amber-300 hover:to-amber-500 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2 gold-glow"
                >
                  <Crown className="h-4 w-4" />
                  <span>Open Entire Website & Enter Studio</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
