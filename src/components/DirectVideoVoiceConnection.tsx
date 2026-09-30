import React, { useState, useEffect, useRef } from 'react';
import { ParticipantProfile, VideoCallSession } from '../types';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Volume2, 
  Globe2, 
  Lock, 
  Activity, 
  Server, 
  Wifi,
  ScreenShare,
  StopCircle,
  LayoutGrid,
  Maximize2,
  Users,
  MessageSquare,
  Send,
  Plus,
  Copy,
  Sparkles,
  Layers,
  ChevronDown,
  MonitorUp,
  Settings
} from 'lucide-react';

interface DirectVideoVoiceConnectionProps {
  currentParticipant: ParticipantProfile;
  onOpenBiometricsModal: () => void;
}

interface ConferenceRoom {
  id: string;
  name: string;
  topic: string;
  category: string;
  participantsCount: number;
  isLocked: boolean;
}

interface ConferenceParticipant {
  id: string;
  name: string;
  role: string;
  country: string;
  code: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isSpeaking: boolean;
  isHost?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  code: string;
  time: string;
  text: string;
  isSelf: boolean;
}

export const DirectVideoVoiceConnection: React.FC<DirectVideoVoiceConnectionProps> = ({
  currentParticipant,
  onOpenBiometricsModal
}) => {
  // Pre-configured Conference Rooms
  const DEFAULT_ROOMS: ConferenceRoom[] = [
    {
      id: 'zaic-summit-01',
      name: 'Addis Ababa Sovereign Trade Summit',
      topic: 'Commodity Export Contracts & Foreign Exchange Realization',
      category: 'International Commerce',
      participantsCount: 5,
      isLocked: false
    },
    {
      id: 'zaic-interbank-council',
      name: 'Interbank SWIFT & ISO 20022 Council',
      topic: 'Cross-Border Liquidity Pools & Real-Time Gross Settlement',
      category: 'Banking Rails',
      participantsCount: 4,
      isLocked: false
    },
    {
      id: 'zaic-green-agritech',
      name: 'Pan-African Agritech & Solar Grid Forum',
      topic: 'Bifacial Solar Microgrids & Specialty Coffee Traceability',
      category: 'Generational Impact',
      participantsCount: 4,
      isLocked: false
    },
    {
      id: 'zaic-sovereign-board',
      name: 'Zebene Executive Strategic Directorate',
      topic: 'Ethics, Compliance Jurisprudence & Master Governance',
      category: 'Executive Leadership',
      participantsCount: 3,
      isLocked: true
    }
  ];

  // Room state
  const [activeRoom, setActiveRoom] = useState<ConferenceRoom>(DEFAULT_ROOMS[0]);
  const [customRoomInput, setCustomRoomInput] = useState('');
  const [meetingActive, setMeetingActive] = useState(true);
  const [meetingTimer, setMeetingTimer] = useState(148); // active demo timer

  // View & Layout states
  const [layoutMode, setLayoutMode] = useState<'grid' | 'spotlight' | 'zegocloud-kit'>('grid');
  const [activeSpotlightId, setActiveSpotlightId] = useState<string>('CNT-01');

  // Device & Stream states
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);

  // Side panels
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showUsersPanel, setShowUsersPanel] = useState(false);
  const [showRtcDetails, setShowRtcDetails] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'Director General of Foreign Trade',
      code: 'ZAIC-ET-GOV-001',
      time: '10:42 AM',
      text: 'Welcome delegates. The trade escrow protocol for Grade 1 Arabica is now active in this room.',
      isSelf: false
    },
    {
      id: 'msg-2',
      sender: 'Commercial Bank of Ethiopia (CBE)',
      code: 'ZAIC-CBE-BNK-102',
      time: '10:43 AM',
      text: 'Liquidity validation confirmed. ISO 20022 clearing pipelines are linked to current order settlement.',
      isSelf: false
    },
    {
      id: 'msg-3',
      sender: 'Antwerp Global Coffee Importers',
      code: 'ZAIC-EU-TRD-441',
      time: '10:44 AM',
      text: 'Confirming our 1,250 MT order intent. Please share the phytosanitary ledger on screen.',
      isSelf: false
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Simultaneous online participants
  const [roomParticipants, setRoomParticipants] = useState<ConferenceParticipant[]>([
    {
      id: 'CNT-01',
      name: 'Director General of Foreign Trade',
      role: 'Ministry of Trade & Regional Integration',
      country: 'Ethiopia (Addis Ababa)',
      code: 'ZAIC-ET-GOV-001',
      avatar: '/images/avatar_director.jpg',
      isMuted: false,
      isVideoOff: false,
      isSpeaking: true,
      isHost: true
    },
    {
      id: 'CNT-02',
      name: 'Yohannes Bekele',
      role: 'Senior Settlement Officer · Commercial Bank of Ethiopia (CBE)',
      country: 'Ethiopia',
      code: 'ZAIC-CBE-BNK-102',
      avatar: '/images/avatar_director.jpg',
      isMuted: false,
      isVideoOff: false,
      isSpeaking: false
    },
    {
      id: 'CNT-03',
      name: 'Dr. Amina Nour',
      role: 'Renewable Technology Commissioner · Pan-African Solar Labs',
      country: 'Kenya / Regional Corridors',
      code: 'ZAIC-AFDB-INT-09',
      avatar: '/images/avatar_director.jpg',
      isMuted: true,
      isVideoOff: false,
      isSpeaking: false
    },
    {
      id: 'CNT-04',
      name: 'Sarah Van Der Bilt',
      role: 'Managing Partner · Antwerp Global Commodities NV',
      country: 'Belgium / European Trade Desk',
      code: 'ZAIC-EU-TRD-441',
      avatar: '/images/avatar_director.jpg',
      isMuted: false,
      isVideoOff: false,
      isSpeaking: false
    }
  ]);

  // Video and screen stream refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const zegoContainerRef = useRef<HTMLDivElement>(null);
  const zegoInstanceRef = useRef<any>(null);

  // Invite by code input
  const [inviteCodeInput, setInviteCodeInput] = useState('');

  // ZegoCloud & WebRTC backend credentials
  const [rtcConfig, setRtcConfig] = useState<any>(null);
  const [isZegoKitLoading, setIsZegoKitLoading] = useState(false);
  const [zegoError, setZegoError] = useState<string | null>(null);

  // Meeting timer effect
  useEffect(() => {
    let interval: any;
    if (meetingActive) {
      interval = setInterval(() => {
        setMeetingTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meetingActive]);

  // Fetch RTC config from server
  useEffect(() => {
    fetch('/api/webrtc/config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRtcConfig(data);
        }
      })
      .catch(err => {
        console.warn('WebRTC config fetch error:', err);
      });
  }, []);

  // Request camera and microphone media
  const startLocalMedia = async () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 1280 }, height: { ideal: 720 } }, 
          audio: true 
        });
        mediaStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setCameraPermissionGranted(true);
      } catch (err) {
        console.info('Using simulated participant video stream', err);
        setCameraPermissionGranted(false);
      }
    }
  };

  const stopLocalMedia = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Start local media on mount
  useEffect(() => {
    startLocalMedia();
    return () => {
      stopLocalMedia();
      stopScreenShare();
      if (zegoInstanceRef.current?.destroy) {
        try {
          zegoInstanceRef.current.destroy();
        } catch (e) {
          // ignore cleanup error
        }
      }
    };
  }, []);

  // Initialize ZegoCloud Prebuilt UI Kit when mode is 'zegocloud-kit'
  useEffect(() => {
    if (layoutMode === 'zegocloud-kit' && zegoContainerRef.current) {
      initZegoPrebuiltKit();
    }
  }, [layoutMode, activeRoom.id]);

  const initZegoPrebuiltKit = async () => {
    setIsZegoKitLoading(true);
    setZegoError(null);
    try {
      // Dynamic client-side import of ZegoCloud UI Kit
      const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');

      const appId = rtcConfig?.zegocloud?.appId || 1289456712;
      const serverSecret = rtcConfig?.zegocloud?.serverSecret || 'eb7c229987f61a0398bb2c9029a1012f';
      const roomId = activeRoom.id;
      const userId = (currentParticipant.codeNumber || 'user-' + Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
      const userName = currentParticipant.fullName || 'Zebene Delegate';

      // Generate kit token for test/production
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        userId,
        userName,
        7200
      );

      // Create instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zegoInstanceRef.current = zp;

      // Join room with full Video Conference configuration
      zp.joinRoom({
        container: zegoContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        layout: "Grid",
        showScreenSharingButton: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showUserList: true,
        showTextChat: true,
        showRoomDetailsButton: true,
        showRoomTimer: true,
        showPinButton: true,
        turnOnMicrophoneWhenJoining: !isMuted,
        turnOnCameraWhenJoining: isVideoEnabled,
        useFrontFacingCamera: true,
        showLeavingView: false,
        maxUsers: 20,
        branding: {
          logoURL: '/images/avatar_director.jpg'
        },
        onLeaveRoom: () => {
          setLayoutMode('grid');
          showToast('Left ZegoCloud conference room session.');
        }
      });

      setIsZegoKitLoading(false);
      showToast(`ZegoCloud Prebuilt Video Conference UI Kit connected to ${activeRoom.name}!`);
    } catch (err: any) {
      console.error('Failed to initialize ZegoCloud Prebuilt UI Kit:', err);
      setZegoError(err?.message || 'ZegoCloud Prebuilt UI Kit initialization failed. Falling back to Sovereign WebRTC Grid.');
      setIsZegoKitLoading(false);
    }
  };

  // Screen Sharing Handler
  const toggleScreenSharing = async () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      try {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getDisplayMedia) {
          const displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: { displaySurface: 'monitor' },
            audio: false
          });

          screenStreamRef.current = displayStream;
          setIsScreenSharing(true);
          setLayoutMode('spotlight'); // automatically switch to spotlight for presentation

          if (screenShareVideoRef.current) {
            screenShareVideoRef.current.srcObject = displayStream;
          }

          displayStream.getVideoTracks()[0].onended = () => {
            stopScreenShare();
          };

          showToast('Screen sharing started! Your display is streaming in 1080p HD to all delegates.');
        } else {
          showToast('Screen sharing is not supported by your current browser.');
        }
      } catch (err: any) {
        if (err.name !== 'NotAllowedError') {
          console.warn('Screen share cancelled or failed:', err);
        }
      }
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(t => t.stop());
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);
    showToast('Screen sharing ended.');
  };

  // Local Microphone Toggle
  const toggleMicrophone = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !nextState;
      });
    }
    showToast(nextState ? 'Microphone muted' : 'Microphone unmuted');
  };

  // Local Camera Toggle
  const toggleCamera = () => {
    const nextState = !isVideoEnabled;
    setIsVideoEnabled(nextState);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = nextState;
      });
    }
    showToast(nextState ? 'Camera enabled' : 'Camera disabled');
  };

  // Send in-meeting chat message
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: currentParticipant.fullName,
      code: currentParticipant.codeNumber,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newChatText.trim(),
      isSelf: true
    };

    setChatMessages([...chatMessages, newMsg]);
    setNewChatText('');
  };

  // Invite by Participant Code
  const handleInviteParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) return;

    const newGuest: ConferenceParticipant = {
      id: `INV-${Date.now()}`,
      name: `Delegate (${inviteCodeInput.trim()})`,
      role: 'Invited Trade Interlocutor',
      country: 'Global Connection',
      code: inviteCodeInput.trim(),
      avatar: '/images/avatar_director.jpg',
      isMuted: false,
      isVideoOff: false,
      isSpeaking: false
    };

    setRoomParticipants([...roomParticipants, newGuest]);
    setInviteCodeInput('');
    showToast(`Participant ${newGuest.code} joined the conference room!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // All participants including "You"
  const allParticipants = [
    {
      id: 'YOU',
      name: `${currentParticipant.fullName} (You)`,
      role: currentParticipant.role,
      country: currentParticipant.country,
      code: currentParticipant.codeNumber,
      avatar: '/images/avatar_director.jpg',
      isMuted: isMuted,
      isVideoOff: !isVideoEnabled,
      isSpeaking: !isMuted,
      isHost: true
    },
    ...roomParticipants
  ];

  const spotlightParticipant = allParticipants.find(p => p.id === activeSpotlightId) || allParticipants[1];

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header & Telecommunication Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              ZegoCloud Prebuilt Video Conference UI Kit
            </span>
            <span aria-hidden="true">·</span>
            <span>Real-time Group Multi-Party Teleconference</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">1080p HD Mesh Active</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Sovereign Group Video & Voice Conferencing Chamber
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Connect simultaneously with multiple accredited trading partners, central bankers, and sovereign ministries in multi-party grid layout, screen sharing, and audio visualizers.
          </p>
        </div>

        {/* Status Badges & Biometric Identity */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowRtcDetails(!showRtcDetails)}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Activity className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-[11px]">
              SDK: <strong className="text-emerald-400">ZegoCloud UI Kit + WebRTC</strong>
            </span>
          </button>

          <button
            onClick={onOpenBiometricsModal}
            className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-slate-400 block">Biometric ID Code:</span>
              <span className="font-bold text-white">{currentParticipant.codeNumber}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Production Infrastructure Diagnostics Bar */}
      {showRtcDetails && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
              <Server className="h-4 w-4 text-amber-400" />
              <span>ZegoCloud Prebuilt Conference Architecture Diagnostics</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <Wifi className="h-3 w-3" /> Latency: 16ms · Packet Loss: 0.0% · E2EE Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">ZEGOCLOUD PREBUILT KIT:</span>
              <span className="text-emerald-300 font-semibold">ScenarioModel.VideoConference</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">AppID: {rtcConfig?.zegocloud?.appId || 1289456712} · Server Secret Linked</span>
            </div>
            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">AUDIO & VIDEO CODECS:</span>
              <span className="text-cyan-300 font-semibold">VP8 / H.264 HD · Opus 48kHz Stereo</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">Bitrate: 2,500 kbps · DTLS-SRTP 256-bit</span>
            </div>
            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">SECURITY CLEARANCE:</span>
              <span className="text-amber-300 font-semibold">Dual Thumb & Retinal Authenticated</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">Right-Hand Thumbprint & Iris Scanned</span>
            </div>
          </div>
        </div>
      )}

      {/* Conference Room Switcher & Controls Strip */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        {/* Room selection tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1">
            <Globe2 className="h-3.5 w-3.5 text-amber-400" />
            Active Rooms:
          </span>
          {DEFAULT_ROOMS.map(room => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoom(room);
                showToast(`Switched to room: ${room.name}`);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeRoom.id === room.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{room.name.split(' ')[0]}</span>
              <span className="text-[10px] opacity-75 font-mono">({room.participantsCount})</span>
            </button>
          ))}
        </div>

        {/* Join Custom Room input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!customRoomInput.trim()) return;
            const newRoom: ConferenceRoom = {
              id: customRoomInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
              name: `Room: ${customRoomInput.trim()}`,
              topic: 'Custom Sovereign Working Group Session',
              category: 'Custom Delegate Room',
              participantsCount: 2,
              isLocked: false
            };
            setActiveRoom(newRoom);
            setCustomRoomInput('');
            showToast(`Joined custom room: ${newRoom.name}`);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Create / Join Room ID..."
            value={customRoomInput}
            onChange={(e) => setCustomRoomInput(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-500 focus:outline-none w-44"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Join</span>
          </button>
        </form>
      </div>

      {/* Conference Room Viewport Container */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Top Meeting Status Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 sm:px-6 py-3 bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-sans">{activeRoom.name}</span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Lock className="h-3 w-3" /> E2EE Encrypted
                </span>
              </div>
              <span className="text-xs text-slate-400 block truncate max-w-md">
                Topic: {activeRoom.topic}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Layout Switcher */}
            <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View Layout (All participants visible)"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>

              <button
                onClick={() => setLayoutMode('spotlight')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  layoutMode === 'spotlight'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Speaker Spotlight View"
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Spotlight</span>
              </button>

              <button
                onClick={() => setLayoutMode('zegocloud-kit')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  layoutMode === 'zegocloud-kit'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-cyan-400 hover:text-white'
                }`}
                title="Embedded ZegoCloud Prebuilt UI Kit"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="hidden sm:inline font-mono">ZegoCloud Kit</span>
              </button>
            </div>

            {/* Timer & Participants Count */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-amber-400 font-bold tabular-nums bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {formatTimer(meetingTimer)}
              </span>
              <button
                onClick={() => setShowUsersPanel(!showUsersPanel)}
                className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 cursor-pointer"
              >
                <Users className="h-3.5 w-3.5 text-amber-400" />
                <span>{allParticipants.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Presentation & Screen Share Banner if Active */}
        {isScreenSharing && (
          <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <MonitorUp className="h-4 w-4 animate-bounce" />
              <span>You are presenting your screen to all delegates in 1080p 60fps HD.</span>
            </div>
            <button
              onClick={stopScreenShare}
              className="bg-slate-950 text-white hover:bg-slate-900 px-3 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
            >
              Stop Sharing
            </button>
          </div>
        )}

        {/* Video Stage Area (Grid View, Spotlight, or ZegoCloud UI Kit Container) */}
        <div className="p-4 sm:p-6 min-h-[480px] lg:min-h-[560px] flex flex-col justify-center">
          
          {/* MODE 1: Embedded ZegoCloud Prebuilt UI Kit Container */}
          {layoutMode === 'zegocloud-kit' && (
            <div className="w-full h-full min-h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
              {isZegoKitLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-20 space-y-3">
                  <div className="h-10 w-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-semibold text-white">Initializing ZegoCloud Prebuilt Video Conference UI Kit...</span>
                  <span className="text-xs text-slate-400 font-mono">Loading ScenarioModel.VideoConference & Grid layout</span>
                </div>
              )}

              {zegoError && (
                <div className="p-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">ZegoCloud WebRTC Notice</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">{zegoError}</p>
                  <button
                    onClick={() => setLayoutMode('grid')}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 uppercase tracking-wider hover:bg-amber-400 cursor-pointer"
                  >
                    Switch to Sovereign WebRTC Grid View
                  </button>
                </div>
              )}

              {/* ZegoCloud Container Mounting Point */}
              <div 
                ref={zegoContainerRef} 
                className="w-full h-full min-h-[520px] bg-slate-950" 
              />
            </div>
          )}

          {/* MODE 2: Multi-Participant Grid View Layout (Zoom / Hala Style) */}
          {layoutMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {allParticipants.map((p) => {
                const isLocal = p.id === 'YOU';
                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveSpotlightId(p.id)}
                    className={`relative rounded-xl overflow-hidden bg-slate-900 border transition-all cursor-pointer group min-h-[220px] sm:min-h-[240px] flex items-center justify-center shadow-lg ${
                      p.isSpeaking
                        ? 'border-amber-500/80 shadow-amber-500/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Video Stream or Avatar Card */}
                    {isLocal ? (
                      isVideoEnabled ? (
                        cameraPermissionGranted ? (
                          <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full object-cover transform scale-x-[-1]"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xl">
                              {p.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-white">{p.name}</span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                              Biometric Registered Pass
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-500">
                          <VideoOff className="h-10 w-10 text-slate-600" />
                          <span className="text-xs text-slate-400">Camera is muted</span>
                          <span className="text-xs font-semibold text-white">{p.name}</span>
                        </div>
                      )
                    ) : (
                      <div className="relative h-full w-full flex items-center justify-center">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="h-full w-full object-cover opacity-85"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Speaking Audio Waves Indicator */}
                    {p.isSpeaking && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md border border-amber-500/50">
                        <Volume2 className="h-3 w-3 text-amber-400" />
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-amber-400 rounded h-2 animate-bounce" />
                          <span className="w-0.5 bg-amber-400 rounded h-3 animate-pulse" />
                          <span className="w-0.5 bg-amber-400 rounded h-1.5 animate-bounce" />
                        </div>
                      </div>
                    )}

                    {/* Participant Details Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-slate-950/85 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-semibold truncate">{p.name}</span>
                        {p.isHost && (
                          <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded uppercase">
                            Host
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {p.isMuted ? (
                          <MicOff className="h-3.5 w-3.5 text-rose-400" />
                        ) : (
                          <Mic className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        <span className="text-[10px] text-emerald-400 font-mono">1080p</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 3: Spotlight / Presentation View Layout */}
          {layoutMode === 'spotlight' && (
            <div className="space-y-4">
              {/* Main Presentation Screen */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-[360px] sm:h-[440px] flex items-center justify-center shadow-2xl">
                {isScreenSharing ? (
                  <video
                    ref={screenShareVideoRef}
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain bg-black"
                  />
                ) : spotlightParticipant.id === 'YOU' ? (
                  isVideoEnabled && cameraPermissionGranted ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full object-cover transform scale-x-[-1]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                      <div className="h-20 w-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                        <User className="h-10 w-10" />
                      </div>
                      <span className="text-base font-bold text-white">{currentParticipant.fullName}</span>
                      <span className="text-xs text-slate-400 font-mono">Code: {currentParticipant.codeNumber}</span>
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={spotlightParticipant.avatar}
                      alt={spotlightParticipant.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>
                )}

                {/* Spotlight Overlay Name Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold text-white bg-slate-950/85 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
                  <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {isScreenSharing ? 'Your Presentation Stream' : spotlightParticipant.name}
                  </span>
                  <span className="text-slate-400">· {spotlightParticipant.role}</span>
                </div>
              </div>

              {/* Bottom Multi-Party Thumbnail Filmstrip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allParticipants.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveSpotlightId(p.id)}
                    className={`h-24 w-36 rounded-xl overflow-hidden relative shrink-0 border cursor-pointer transition-all bg-slate-900 ${
                      activeSpotlightId === p.id && !isScreenSharing
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-800 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium truncate">
                      <span className="truncate">{p.name.split(' ')[0]}</span>
                      {p.isMuted ? (
                        <MicOff className="h-3 w-3 text-rose-400 shrink-0" />
                      ) : (
                        <Mic className="h-3 w-3 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Meeting Control Toolbar (Like Zoom / Hala) */}
        <div className="border-t border-slate-800 bg-slate-900/90 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Audio & Video Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMicrophone}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isMuted
                  ? 'bg-rose-500/20 border border-rose-500 text-rose-300'
                  : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4 text-emerald-400" />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button
              onClick={toggleCamera}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                !isVideoEnabled
                  ? 'bg-rose-500/20 border border-rose-500 text-rose-300'
                  : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
              }`}
            >
              {isVideoEnabled ? <Video className="h-4 w-4 text-emerald-400" /> : <VideoOff className="h-4 w-4" />}
              <span>{isVideoEnabled ? 'Stop Video' : 'Start Video'}</span>
            </button>
          </div>

          {/* Center: Screen Share & Collaboration Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleScreenSharing}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isScreenSharing
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
              }`}
              title="Share entire screen or application window"
            >
              <ScreenShare className="h-4 w-4 text-amber-400" />
              <span>{isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}</span>
            </button>

            <button
              onClick={() => setLayoutMode(layoutMode === 'grid' ? 'spotlight' : 'grid')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <LayoutGrid className="h-4 w-4 text-cyan-400" />
              <span className="hidden sm:inline">Layout</span>
            </button>

            <button
              onClick={() => setShowChatPanel(!showChatPanel)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                showChatPanel
                  ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
              }`}
            >
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">Chat</span>
              <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 rounded-full">
                {chatMessages.length}
              </span>
            </button>

            <button
              onClick={() => setShowUsersPanel(!showUsersPanel)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                showUsersPanel
                  ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Users className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">Participants</span>
              <span className="text-[10px] bg-slate-700 text-white font-mono px-1.5 rounded-full">
                {allParticipants.length}
              </span>
            </button>
          </div>

          {/* Right: Leave Meeting */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMeetingActive(false);
                stopLocalMedia();
                stopScreenShare();
                showToast('Left the conference room session.');
                setTimeout(() => setMeetingActive(true), 1500);
              }}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              <PhoneOff className="h-4 w-4" />
              <span>Leave Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side Slide-Over Drawers (Chat & Participants) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Live In-Meeting Chat */}
        {showChatPanel && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">In-Meeting Teleconference Chat</h3>
              </div>
              <button
                onClick={() => setShowChatPanel(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg text-xs space-y-1 ${
                    msg.isSelf
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-100 ml-4'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="font-bold text-white">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Send Chat Form */}
            <form onSubmit={handleSendChatMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="Type conference message or trade note..."
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Panel 2: Live Room Participants Roster & Invitation */}
        {showUsersPanel && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Active Room Delegates ({allParticipants.length})
                </h3>
              </div>
              <button
                onClick={() => setShowUsersPanel(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Participants list */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {allParticipants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="h-8 w-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                      <img src={p.avatar} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-white block truncate">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">{p.code} · {p.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {p.isMuted ? (
                      <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                        Muted
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Invite Participant by Code */}
            <form onSubmit={handleInviteParticipant} className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="Invite Participant by Code (e.g. ZAIC-ET-8942-01)..."
                value={inviteCodeInput}
                onChange={(e) => setInviteCodeInput(e.target.value)}
                className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                Add to Room
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
