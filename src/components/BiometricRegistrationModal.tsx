import React, { useState } from 'react';
import { ParticipantProfile, AccessLevel } from '../types';
import { 
  Fingerprint, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Globe, 
  QrCode, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BiometricRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteRegistration: (participant: ParticipantProfile) => void;
  currentParticipant?: ParticipantProfile;
}

export const BiometricRegistrationModal: React.FC<BiometricRegistrationModalProps> = ({
  isOpen,
  onClose,
  onCompleteRegistration,
  currentParticipant
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [fullName, setFullName] = useState(currentParticipant?.fullName || 'Zebene Asfye');
  const [organization, setOrganization] = useState(currentParticipant?.organization || 'Zebene International Directorate');
  const [role, setRole] = useState(currentParticipant?.role || 'Chief Executive Officer & Director');
  const [country, setCountry] = useState(currentParticipant?.country || 'Ethiopia');
  const [accessTier, setAccessTier] = useState<AccessLevel>(currentParticipant?.accessTier || 'Government & Sovereign');

  // Biometric states
  const [isThumbScanning, setIsThumbScanning] = useState(false);
  const [thumbVerified, setThumbVerified] = useState(currentParticipant?.thumbprintVerified ?? false);
  const [thumbHash, setThumbHash] = useState(currentParticipant?.thumbprintHash || '');

  const [isEyeScanning, setIsEyeScanning] = useState(false);
  const [eyeVerified, setEyeVerified] = useState(currentParticipant?.eyeIrisVerified ?? false);
  const [eyeHash, setEyeHash] = useState(currentParticipant?.eyeIrisHash || '');

  // Minted Code Number
  const [mintedCode, setMintedCode] = useState(currentParticipant?.codeNumber || '');

  if (!isOpen) return null;

  const handleScanThumb = () => {
    setIsThumbScanning(true);
    setTimeout(() => {
      const generatedHash = 'THUMB-RH-SHA256:' + Math.random().toString(16).substring(2, 10).toUpperCase() + Math.random().toString(16).substring(2, 8).toUpperCase();
      setThumbHash(generatedHash);
      setThumbVerified(true);
      setIsThumbScanning(false);
    }, 1800);
  };

  const handleScanEye = () => {
    setIsEyeScanning(true);
    setTimeout(() => {
      const generatedEyeHash = 'IRIS-RE-SHA256:' + Math.random().toString(16).substring(2, 10).toUpperCase() + Math.random().toString(16).substring(2, 8).toUpperCase();
      setEyeHash(generatedEyeHash);
      setEyeVerified(true);
      setIsEyeScanning(false);
    }, 1800);
  };

  const handleFinishRegistration = () => {
    // Generate unique participant code if not already present
    const countryCode = country.substring(0, 2).toUpperCase() || 'ET';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const suffix = Math.floor(100 + Math.random() * 900);
    const finalCode = mintedCode || `ZAIC-${countryCode}-${randomDigits}-${suffix}`;

    setMintedCode(finalCode);

    const profile: ParticipantProfile = {
      codeNumber: finalCode,
      fullName: fullName.trim(),
      organization: organization.trim(),
      role: role.trim(),
      country: country.trim(),
      thumbprintVerified: true,
      thumbprintHash: thumbHash || 'THUMB-RH-DEFAULT-VERIFIED',
      eyeIrisVerified: true,
      eyeIrisHash: eyeHash || 'IRIS-RE-DEFAULT-VERIFIED',
      registeredDate: new Date().toISOString().split('T')[0],
      accessTier: accessTier
    };

    onCompleteRegistration(profile);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Biometric Security Registration</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Participant Code & Biometrics Verification
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Requires Right Hand Thumbprint & Right Eye Retinal Print to issue unique participant code.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Steps Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
          <div className={`p-2 rounded-lg border text-center transition-colors ${
            step === 1 ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' :
            step > 1 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-500'
          }`}>
            1. Details
          </div>

          <div className={`p-2 rounded-lg border text-center transition-colors ${
            step === 2 ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' :
            thumbVerified ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-500'
          }`}>
            2. Thumbprint
          </div>

          <div className={`p-2 rounded-lg border text-center transition-colors ${
            step === 3 ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' :
            eyeVerified ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-500'
          }`}>
            3. Eye Print
          </div>

          <div className={`p-2 rounded-lg border text-center transition-colors ${
            step === 4 ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold' :
            mintedCode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 text-slate-500'
          }`}>
            4. Code Issued
          </div>
        </div>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Participant Full Legal Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Zebene Asfye"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Organization / Ministry
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. National Trade Consortium"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Designated Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Trade Director / Citizen Innovator"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Country of Citizenship / Jurisdiction
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Ethiopia"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Requested Security Clearance
                </label>
                <select
                  value={accessTier}
                  onChange={(e) => setAccessTier(e.target.value as AccessLevel)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Government & Sovereign">Government & Sovereign (Tier 4)</option>
                  <option value="Commercial Banks Only">Commercial Banks Only (Tier 3)</option>
                  <option value="Verified Trade Partners">Verified Trade Partners (Tier 2)</option>
                  <option value="Public Worldwide">Public Worldwide (Tier 1)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors"
              >
                <span>Proceed to Right Thumbprint</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Right Hand Thumbprint Scan */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Right Hand Thumbprint Verification
              </h3>
              <p className="text-xs text-slate-400">
                Please place the thumb of your right hand against the biometric sensor scanner.
              </p>
            </div>

            {/* Visual Biometric Scanner Frame */}
            <div className="relative mx-auto flex h-48 w-44 items-center justify-center rounded-2xl border-2 border-dashed border-amber-500/40 bg-slate-950 p-4 overflow-hidden shadow-inner">
              {/* Laser Sweep Line */}
              {isThumbScanning && (
                <div className="absolute inset-x-0 h-1 bg-amber-400 shadow-[0_0_15px_#f59e0b] animate-bounce z-10" />
              )}

              <Fingerprint className={`h-28 w-28 transition-colors duration-500 ${
                thumbVerified ? 'text-emerald-400' : isThumbScanning ? 'text-amber-400 animate-pulse' : 'text-slate-600'
              }`} />

              {thumbVerified && (
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1 text-emerald-300">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  <span className="text-[11px] font-mono font-bold">Right Thumb Stamped</span>
                </div>
              )}
            </div>

            {thumbVerified && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
                <span>Cryptographic Minutiae Hash: </span>
                <span className="text-slate-200">{thumbHash}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back
              </button>

              {!thumbVerified ? (
                <button
                  type="button"
                  onClick={handleScanThumb}
                  disabled={isThumbScanning}
                  className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all ${
                    isThumbScanning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400'
                  }`}
                >
                  <Fingerprint className="h-4 w-4" />
                  <span>{isThumbScanning ? 'Scanning Right Thumb...' : 'Scan Right Thumbprint'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors"
                >
                  <span>Proceed to Right Eye Print</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Right Eye Print (Retina / Iris) Scan */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Right Eye Retinal Print (Iris) Verification
              </h3>
              <p className="text-xs text-slate-400">
                Align your right eye with the biometric optical scanner reticle.
              </p>
            </div>

            {/* Visual Retinal Scanner Frame */}
            <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-amber-500/40 bg-slate-950 p-4 overflow-hidden shadow-inner">
              {/* Reticle Target Animation */}
              {isEyeScanning && (
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/80 animate-ping" />
              )}

              <Eye className={`h-28 w-28 transition-colors duration-500 ${
                eyeVerified ? 'text-emerald-400' : isEyeScanning ? 'text-amber-400 animate-pulse' : 'text-slate-600'
              }`} />

              {eyeVerified && (
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1 text-emerald-300">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  <span className="text-[11px] font-mono font-bold">Right Eye Iris Stamped</span>
                </div>
              )}
            </div>

            {eyeVerified && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
                <span>Cryptographic Iris Hash: </span>
                <span className="text-slate-200">{eyeHash}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back
              </button>

              {!eyeVerified ? (
                <button
                  type="button"
                  onClick={handleScanEye}
                  disabled={isEyeScanning}
                  className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all ${
                    isEyeScanning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>{isEyeScanning ? 'Scanning Right Eye Iris...' : 'Scan Right Eye Print'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishRegistration}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  <span>Issue My Participant Code Number</span>
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Participant Code Minted & Official Card */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Biometrics Verified & Stamped</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-2">
                Official Participant Identification Card
              </h3>
              <p className="text-xs text-slate-400">
                Your permanent biometric code has been registered on the Zebene Asfye International Communication network.
              </p>
            </div>

            {/* Official Biometric Identity Card */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                    Zebene Asfye International Communication
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">Sovereign Participant Passport</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                    {accessTier}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Status: Active</span>
                </div>
              </div>

              {/* Unique Participant Code Number Box */}
              <div className="p-3.5 rounded-xl border border-amber-500/50 bg-amber-500/10 text-center space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-amber-300 tracking-wider">
                  Your Unique Participant Code Number:
                </span>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-widest tabular-nums">
                  {mintedCode}
                </div>
              </div>

              {/* Participant Details & Biometrics Status */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Participant:</span>
                  <span className="text-white font-sans font-semibold block">{fullName}</span>
                  <span className="text-slate-400 text-[11px] block">{organization}</span>
                  <span className="text-slate-500 text-[10px]">{country}</span>
                </div>

                <div className="space-y-1.5 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-emerald-400 text-[11px]">
                    <Fingerprint className="h-3.5 w-3.5" />
                    <span>Right Thumb: Verified</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-emerald-400 text-[11px]">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Right Eye: Verified</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Reg Date: {new Date().toISOString().split('T')[0]}
                  </div>
                </div>
              </div>

              {/* Bottom Card Strip */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-8 w-8 text-amber-400" />
                  <span className="text-[9px] text-slate-500 font-mono leading-tight block">
                    Biometric Hash Encrypted<br />Direct Video & Voice Authorized
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 font-bold">
                  OFFICIAL STAMP
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-lg bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
              >
                Access Application with My Participant Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
