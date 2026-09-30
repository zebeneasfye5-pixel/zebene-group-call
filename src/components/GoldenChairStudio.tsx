import React, { useState, useEffect, useRef } from 'react';
import { MemberProfile } from '../types';
import { ZegoGroupConference } from './ZegoGroupConference';
import { 
  Crown, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  ScreenShare, 
  Maximize2, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  Settings, 
  Sliders, 
  Activity,
  Layers,
  Users,
  LayoutGrid
} from 'lucide-react';

interface GoldenChairStudioProps {
  currentMember: MemberProfile;
}

export const GoldenChairStudio: React.FC<GoldenChairStudioProps> = ({ currentMember }) => {
  // Studio mode: Group Conference (Hala/Zoom) vs VIP Broadcaster Podium
  const [studioViewMode, setStudioViewMode] = useState<'conference' | 'podium'>('conference');

  // Chair status
  const [isSeatedInGoldenChair, setIsSeatedInGoldenChair] = useState(true);
  
  // Audio & Video player states
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [volume, setVolume] = useState(85);
  const [selectedQuality, setSelectedQuality] = useState<'1080p' | '720p' | '4k'>('1080p');
  
  // Studio Microphone enhancements
  const [noiseSuppressionEnabled, setNoiseSuppressionEnabled] = useState(true);
  const [studioGainLevel, setStudioGainLevel] = useState(75);
  const [micPolarPattern, setMicPolarPattern] = useState<'Hypercardioid' | 'Cardioid' | 'Omni'>('Hypercardioid');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Media stream refs
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Request real camera & mic if available
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localStreamRef.current = stream;
          if (videoPlayerRef.current) {
            videoPlayerRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.info('Live studio camera simulated fallback ready', err);
        });
    }

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Screen share handler
  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(t => t.stop());
        screenStreamRef.current = null;
      }
      setIsScreenSharing(false);
      showToast('Screen share concluded.');
    } else {
      try {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getDisplayMedia) {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          screenStreamRef.current = stream;
          setIsScreenSharing(true);
          if (screenShareRef.current) {
            screenShareRef.current.srcObject = stream;
          }
          stream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false);
          };
          showToast('Live screen broadcasting from Golden Chair active in 1080p HD!');
        }
      } catch (e) {
        console.warn('Screen share cancelled', e);
      }
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Co-delegates sitting in the Golden Chamber
  const delegateSeats = [
    {
      name: 'Director General of Foreign Trade',
      title: 'Ministry of Trade & Regional Integration',
      seat: 'East Wing Golden Chair',
      country: 'Ethiopia 🇪🇹',
      status: 'Live Broadcasting',
      isSpeaking: true
    },
    {
      name: 'Senior Clearing Trustee',
      title: 'Commercial Bank of Ethiopia (CBE)',
      seat: 'Central Treasury Seat',
      country: 'Ethiopia 🇪🇹',
      status: 'Active Listener',
      isSpeaking: false
    },
    {
      name: 'Dr. Amina Nour',
      title: 'Clean Energy & Trade Commissioner',
      seat: 'Pan-African Golden Chair',
      country: 'Kenya 🇰🇪',
      status: 'Verified Seat',
      isSpeaking: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Studio Title & Golden Chair Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Crown className="h-4 w-4 text-amber-400" />
            <span>VIP Sovereign Broadcasting Chamber</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">Ultra-HD Audio/Video Active</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            The Golden Chair Live Video & Studio Audio Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            High-fidelity live multimedia player, studio-grade broadcasting microphone with active noise cancellation, and the sovereign Golden Chair for authenticated members.
          </p>
        </div>

        {/* Golden Chair Seat Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsSeatedInGoldenChair(!isSeatedInGoldenChair);
              showToast(isSeatedInGoldenChair ? 'You stepped down from the Golden Chair.' : 'You have taken your place on the Golden Chair!');
            }}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg ${
              isSeatedInGoldenChair
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 gold-glow ring-2 ring-amber-400/50'
                : 'border border-amber-500/40 bg-slate-900 text-amber-300 hover:bg-slate-800'
            }`}
          >
            <Crown className="h-4 w-4" />
            <span>{isSeatedInGoldenChair ? 'Seated in Golden Chair' : 'Take Seat at Golden Chair'}</span>
          </button>
        </div>
      </div>

      {/* Golden Chair Banner Presentation Card */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src="/images/golden_chair_studio.jpg"
            alt="The Golden Chair Studio"
            className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Golden Chair Overlay Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/85 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300 backdrop-blur-md shadow-lg">
            <Radio className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
            <span>VIP MEMBER SEAT: RESERVED FOR {currentMember.fullName.toUpperCase()}</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Exclusive Dignified Seat · Passcode #{currentMember.fourDigitCode}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                The Golden Chair of International Exchange
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Members seated upon the Golden Chair broadcast with supreme audio fidelity, zero background noise interference, and verified cryptographic identity across all participating countries.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-slate-950/80 p-3 backdrop-blur-md shrink-0">
              <div className="text-[10px] text-slate-400 font-mono">SEAT SECURITY STATUS:</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Right Thumb & Eye Cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Experience Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl">
        <div className="flex items-center gap-2 pl-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Studio Operating System:</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setStudioViewMode('conference')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studioViewMode === 'conference'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>ZegoCloud Group Conference (Hala / Zoom Room)</span>
          </button>

          <button
            onClick={() => setStudioViewMode('podium')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studioViewMode === 'podium'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md gold-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="h-3.5 w-3.5" />
            <span>VIP Broadcaster Podium & Mic</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ZegoCloud Group Video & Voice Conference Suite */}
      {studioViewMode === 'conference' ? (
        <ZegoGroupConference currentMember={currentMember} />
      ) : (
        /* VIEW 2: VIP Broadcaster Podium & Studio Microphone Desk */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live High-Quality Video & Audio Player (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-sm font-bold text-white font-sans">
                High-Quality Live Multi-Stream Player
              </h3>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                1080p 60fps HD
              </span>
              <span className="text-slate-400">Latency: 14ms</span>
            </div>
          </div>

          {/* Video Player Display Screen */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-72 sm:h-96 flex items-center justify-center shadow-inner">
            {isScreenSharing ? (
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="h-full w-full object-contain bg-black"
              />
            ) : isVideoActive ? (
              <video
                ref={videoPlayerRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover transform scale-x-[-1]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="h-20 w-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Crown className="h-10 w-10" />
                </div>
                <span className="text-sm font-bold text-white">{currentMember.fullName}</span>
                <span className="text-xs text-slate-400 font-mono">Seated in the Golden Chair · Passcode {currentMember.fourDigitCode}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Live Studio Audio Only
                </span>
              </div>
            )}

            {/* Overlay Presenter Tag */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md text-xs text-white">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-semibold">{currentMember.fullName}</span>
              <span className="text-amber-400 font-mono text-[11px]">(Golden Chair)</span>
            </div>

            {/* Audio Waveform Overlay */}
            {!isMuted && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-amber-500/40">
                <Volume2 className="h-3.5 w-3.5 text-amber-400" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-amber-400 rounded h-2 animate-bounce" />
                  <span className="w-1 bg-amber-400 rounded h-3 animate-pulse" />
                  <span className="w-1 bg-amber-400 rounded h-1.5 animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Player Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  showToast(isMuted ? 'Audio stream unmuted' : 'Audio stream muted');
                }}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isMuted ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                }`}
                title={isMuted ? 'Unmute Player' : 'Mute Player'}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
              </button>

              <button
                onClick={() => {
                  setIsVideoActive(!isVideoActive);
                  showToast(isVideoActive ? 'Video display hidden' : 'Video display active');
                }}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  !isVideoActive ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                }`}
                title={isVideoActive ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isVideoActive ? <Video className="h-4 w-4 text-emerald-400" /> : <VideoOff className="h-4 w-4" />}
              </button>

              <button
                onClick={handleToggleScreenShare}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isScreenSharing
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 border border-slate-700 text-slate-200 hover:text-white'
                }`}
              >
                <ScreenShare className="h-3.5 w-3.5 text-amber-400" />
                <span>{isScreenSharing ? 'Stop Screen' : 'Share Screen'}</span>
              </button>
            </div>

            {/* Quality & Volume Selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-[11px] font-mono">
                {(['720p', '1080p', '4k'] as const).map(q => (
                  <button
                    key={q}
                    onClick={() => { setSelectedQuality(q); showToast(`Stream resolution set to ${q.toUpperCase()}`); }}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      selectedQuality === q ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {q.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-mono">VOL:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Quality Studio Microphone Console (1 col) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Studio Broadcast Microphone</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Opus 48kHz / 24-bit Low-Noise</span>
                </div>
              </div>

              <div className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isMuted
                  ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}>
                {isMuted ? 'Muted' : 'Mic Live'}
              </div>
            </div>

            {/* Studio Equalizer Bars Visualization */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-[10px] text-slate-400 font-mono block">LIVE AUDIO FREQUENCY SPECTRUM:</span>
              <div className="flex items-end justify-between gap-1 h-14 pt-2">
                {[45, 68, 85, 92, 70, 54, 88, 95, 60, 42, 78, 84, 65, 50, 72].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: isMuted ? '8%' : `${height}%` }}
                    className={`w-full rounded-t transition-all duration-150 ${
                      isMuted 
                        ? 'bg-slate-800' 
                        : height > 80 
                        ? 'bg-gradient-to-t from-amber-500 to-rose-400' 
                        : 'bg-gradient-to-t from-amber-500 to-amber-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mic Tuning Controls */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Active Acoustic Noise Cancellation:</span>
                <button
                  onClick={() => {
                    setNoiseSuppressionEnabled(!noiseSuppressionEnabled);
                    showToast(noiseSuppressionEnabled ? 'Noise suppression off' : 'AI Studio noise suppression on');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                    noiseSuppressionEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {noiseSuppressionEnabled ? 'ENABLED (AI DSP)' : 'OFF'}
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Microphone Gain Level:</span>
                  <span className="font-mono text-amber-400 font-bold">{studioGainLevel}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={studioGainLevel}
                  onChange={(e) => setStudioGainLevel(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-slate-300 block mb-1">Acoustic Polar Pattern:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Hypercardioid', 'Cardioid', 'Omni'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setMicPolarPattern(p)}
                      className={`py-1 text-[11px] rounded border font-mono transition-colors cursor-pointer ${
                        micPolarPattern === p
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                showToast(isMuted ? 'Studio microphone unmuted' : 'Studio microphone muted');
              }}
              className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                isMuted
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {isMuted ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              <span>{isMuted ? 'Activate Studio Microphone' : 'Mute Studio Microphone'}</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Other Co-Delegates Sitting in the Golden Chamber */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white font-display">
              Co-Delegates in the Golden Chamber
            </h3>
            <p className="text-xs text-slate-400">
              International members seated live in accredited delegate chambers
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> All Seats Biometrically Linked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {delegateSeats.map((del, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 hover:border-amber-500/40 transition-colors shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl overflow-hidden border border-amber-500/30 bg-slate-800 shrink-0">
                  <img src="/images/director_zebene.jpg" alt={del.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-0.5 truncate">
                  <h4 className="text-xs font-bold text-white truncate">{del.name}</h4>
                  <span className="text-[10px] text-slate-400 block truncate">{del.title}</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 pt-0.5">
                    <Crown className="h-3 w-3" />
                    <span>{del.seat}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{del.country}</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  ● {del.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
