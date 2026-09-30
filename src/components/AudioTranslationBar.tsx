import React, { useState } from 'react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS, TRANSLATION_DICTIONARY, playSpeech, stopSpeech } from '../utils/translation';
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  Headphones,
  Globe2 
} from 'lucide-react';

interface AudioTranslationBarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const AudioTranslationBar: React.FC<AudioTranslationBarProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const activeLangConfig = LANGUAGE_OPTIONS.find(l => l.code === currentLanguage) || LANGUAGE_OPTIONS[0];
  const dict = TRANSLATION_DICTIONARY[currentLanguage] || TRANSLATION_DICTIONARY.en;

  const handleListenClick = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const speechText = `${dict.welcome} ${dict.goldenChair} ${dict.fourDigitKey}`;
      const started = playSpeech(speechText, currentLanguage);
      if (started) {
        setIsPlayingAudio(true);
        // Automatically reset playing state after a reasonable duration
        setTimeout(() => setIsPlayingAudio(false), 9000);
      }
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border-b border-amber-500/20 px-4 sm:px-6 py-2.5 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Language Selection & Universal Flag Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px] font-mono mr-1">
            <Languages className="h-4 w-4" />
            <span>Universal Translation:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0">
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  stopSpeech();
                  setIsPlayingAudio(false);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                  currentLanguage === lang.code
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={`Switch to ${lang.nativeName}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.nativeName.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: The Easy-to-Use Audio Key to Listen in Member's Native Language */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleListenClick}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer shadow-md ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 animate-pulse'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500'
            }`}
            title="Click to hear the platform guidance spoken aloud in your selected language"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="h-4 w-4 text-slate-950" />
                <span>Stop Listening</span>
              </>
            ) : (
              <>
                <Headphones className="h-4 w-4 text-slate-950" />
                <span>Listen In {activeLangConfig.name}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
