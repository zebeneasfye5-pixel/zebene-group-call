import React, { useState } from 'react';
import { Language, LanguageOption } from '../types';
import { LANGUAGE_OPTIONS, TRANSLATION_DICTIONARY, playSpeech, stopSpeech } from '../utils/translation';
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

interface AudioTranslationBarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeContextText?: string;
}

export const AudioTranslationBar: React.FC<AudioTranslationBarProps> = ({
  currentLanguage,
  onLanguageChange,
  activeContextText
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const t = TRANSLATION_DICTIONARY[currentLanguage] || TRANSLATION_DICTIONARY.en;
  const currentLangObj = LANGUAGE_OPTIONS.find(l => l.code === currentLanguage) || LANGUAGE_OPTIONS[0];

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const defaultSpeechText = activeContextText || 
      `${t.appName}. ${t.tagline}. ${t.biometricStatus}. ${t.overview}. ${t.videoVoice}. ${t.information}. ${t.trading}.`;

    setIsPlayingAudio(true);
    setStatusMessage(`Broadcasting in ${currentLangObj.name} (${currentLangObj.nativeName})...`);

    const success = playSpeech(
      defaultSpeechText,
      currentLanguage,
      () => setIsPlayingAudio(true),
      () => {
        setIsPlayingAudio(false);
        setStatusMessage(null);
      }
    );

    if (!success) {
      // Fallback for sandboxes without native speech synthesis
      setTimeout(() => {
        setIsPlayingAudio(false);
        setStatusMessage(null);
      }, 4000);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Language Selection Button & Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
            <Languages className="h-4 w-4" />
            <span>Universal Translation:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
            <select
              value={currentLanguage}
              onChange={(e) => {
                const newLang = e.target.value as Language;
                onLanguageChange(newLang);
                if (isPlayingAudio) {
                  stopSpeech();
                  setIsPlayingAudio(false);
                }
              }}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                  {lang.name} — {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center / Right: "Hear in a language that everyone understands" audio button */}
        <div className="flex items-center gap-3">
          {statusMessage && (
            <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400 animate-pulse">
              {statusMessage}
            </span>
          )}

          <button
            onClick={handlePlayAudio}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer shadow-sm ${
              isPlayingAudio
                ? 'bg-rose-600 text-white hover:bg-rose-500 animate-pulse'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-white" />
                <span>{t.stopAudio}</span>
                {/* Audio Wave Bars */}
                <div className="flex items-end gap-0.5 h-3 ml-1">
                  <span className="w-1 bg-white rounded h-2 animate-bounce" />
                  <span className="w-1 bg-white rounded h-3 animate-pulse" />
                  <span className="w-1 bg-white rounded h-1 animate-bounce" />
                </div>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-amber-400" />
                <span>Hear in {currentLangObj.name} ({currentLangObj.nativeName})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
