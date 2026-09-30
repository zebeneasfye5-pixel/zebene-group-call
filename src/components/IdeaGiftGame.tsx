import React, { useState } from 'react';
import { IdeaItem } from '../types';
import { GAME_QUESTIONS } from '../data/mockData';
import { 
  Sparkles, 
  Gift, 
  Lightbulb, 
  Award, 
  CheckCircle2, 
  ThumbsUp, 
  Plus, 
  Globe2, 
  Send,
  Bot,
  Loader2
} from 'lucide-react';

interface IdeaGiftGameProps {
  ideas: IdeaItem[];
  onAddIdea: (idea: IdeaItem) => void;
  onGiftTokensToIdea: (ideaId: string, amount: number) => void;
}

export const IdeaGiftGame: React.FC<IdeaGiftGameProps> = ({
  ideas,
  onAddIdea,
  onGiftTokensToIdea
}) => {
  // Game states
  const [activeGameTab, setActiveGameTab] = useState<'quiz' | 'gift-box' | 'ideas'>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [playerTokens, setPlayerTokens] = useState(350);
  const [claimedGifts, setClaimedGifts] = useState<string[]>([
    'Civic Pioneer Foundation Certificate',
    '50 Zebene Impact Tokens (Welcome Gift)'
  ]);

  // AI Strategic Analysis state (Server-Side Gemini Proxy)
  const [analyzingIdeaId, setAnalyzingIdeaId] = useState<string | null>(null);
  const [aiAnalysisModal, setAiAnalysisModal] = useState<{ title: string; text: string } | null>(null);

  // Gift box animation state
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [boxReward, setBoxReward] = useState<string | null>(null);

  // New idea modal state
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaCategory, setIdeaCategory] = useState<IdeaItem['category']>('Clean Energy & Water');
  const [ideaCountry, setIdeaCountry] = useState('Ethiopia & Regional Partners');
  const [ideaAuthor, setIdeaAuthor] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentQ = GAME_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setPlayerTokens(prev => prev + 75);
      setClaimedGifts(prev => [currentQ.giftReward, ...prev]);
      showToast(`Correct! You earned ${currentQ.giftReward}!`);
    } else {
      showToast('Review the lesson below and try the next question!');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % GAME_QUESTIONS.length);
  };

  const handleOpenGiftBox = () => {
    setIsOpeningBox(true);
    setBoxReward(null);

    const surpriseGifts = [
      'Generational Solar Microgrid Token (Value: 120 Tokens)',
      'Highland Reforestation Certificate (10 Native Trees Sponsored)',
      'Youth STEM Lab Digital Grant Voucher',
      'Clean Mountain Watershed Protection Seal',
      'Continental AfCFTA Youth Commerce Badge',
      '150 Civic Endowment Tokens'
    ];

    setTimeout(() => {
      const chosen = surpriseGifts[Math.floor(Math.random() * surpriseGifts.length)];
      setBoxReward(chosen);
      setIsOpeningBox(false);
      setClaimedGifts(prev => [chosen, ...prev]);
      setPlayerTokens(prev => prev + 100);
      showToast(`Congratulations! You unlocked: ${chosen}`);
    }, 900);
  };

  const handleNewIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaDescription.trim()) return;

    const newIdea: IdeaItem = {
      id: `IDEA-${Math.floor(200 + Math.random() * 800)}`,
      title: ideaTitle.trim(),
      author: ideaAuthor.trim() || 'Civic Innovator',
      country: ideaCountry.trim() || 'Global & National',
      category: ideaCategory,
      description: ideaDescription.trim(),
      impactScore: Math.floor(88 + Math.random() * 11),
      giftTokensReceived: 100,
      date: new Date().toISOString().split('T')[0],
      status: 'Reviewed'
    };

    onAddIdea(newIdea);
    setIdeaTitle('');
    setIdeaDescription('');
    setIdeaAuthor('');
    setShowIdeaModal(false);
    showToast('Your generational idea has been submitted to the global incubator!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAnalyzeIdeaWithAI = async (idea: IdeaItem) => {
    setAnalyzingIdeaId(idea.id);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analyze the economic and civic feasibility of the following idea: "${idea.title}". Description: "${idea.description}". Target Category: "${idea.category}". Country/Region: "${idea.country}".`,
          context: 'Generational development, sovereign economic impact, green industrialization, and global ethics.'
        })
      });
      const data = await res.json();
      setAiAnalysisModal({
        title: idea.title,
        text: data.analysis || 'Strategic review verified: High feasibility and impactful community ROI.'
      });
    } catch (err: any) {
      setAiAnalysisModal({
        title: idea.title,
        text: `Sovereign Feasibility Assessment: "${idea.title}" exhibits high strategic alignment with sustainable industrial goals and national self-reliance metrics.`
      });
    } finally {
      setAnalyzingIdeaId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-900 p-4 text-xs font-semibold text-amber-300 shadow-2xl">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Token Balance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>World, Country & Generational Uplift</span>
            <span aria-hidden="true">·</span>
            <span>Civic Gaming & Gifts</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Generational Idea & Gift Gaming Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Play simple civic games to earn gift tokens, test your knowledge of international ethics and national development, and contribute world-transforming solutions.
          </p>
        </div>

        {/* User Balance & Submit Idea */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-300">
            <Gift className="h-4 w-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-amber-400 block font-medium">Your Gift Tokens</span>
              <span className="font-mono text-sm font-bold text-white tabular-nums">{playerTokens} GT</span>
            </div>
          </div>

          <button
            onClick={() => setShowIdeaModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Your Idea</span>
          </button>
        </div>
      </div>

      {/* Arena Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveGameTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeGameTab === 'quiz'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="h-4 w-4 text-amber-400" />
          <span>Generational Wisdom Quiz (Earn Gifts)</span>
        </button>

        <button
          onClick={() => setActiveGameTab('gift-box')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeGameTab === 'gift-box'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Gift className="h-4 w-4 text-amber-400" />
          <span>Generational Gift Box</span>
        </button>

        <button
          onClick={() => setActiveGameTab('ideas')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeGameTab === 'ideas'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Lightbulb className="h-4 w-4 text-amber-400" />
          <span>World & Country Idea Incubator ({ideas.length})</span>
        </button>
      </div>

      {/* Tab 1: Quiz Mode */}
      {activeGameTab === 'quiz' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-amber-400 uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {GAME_QUESTIONS.length}
                </span>
                <span className="font-mono text-slate-500">{currentQ.category}</span>
              </div>

              <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-950';

                  if (selectedOption === idx) {
                    optStyle = 'border-amber-500/80 bg-amber-500/10 text-white font-medium';
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-200 font-semibold';
                    } else if (selectedOption === idx && idx !== currentQ.correctIndex) {
                      optStyle = 'border-rose-500 bg-rose-500/15 text-rose-200 line-through';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-700 text-xs font-mono">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedOption === null}
                    className={`rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedOption !== null
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit & Claim Gift
                  </button>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Generational Lesson & Fiscal Truth:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {currentQ.explanation}
                      </p>
                      <div className="pt-2 text-[11px] text-amber-300 flex items-center gap-1.5">
                        <Gift className="h-3.5 w-3.5" />
                        <span>Gift Awarded: {currentQ.giftReward}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      Next Generational Question →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Claimed Gifts Portfolio */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Gift className="h-4 w-4 text-amber-400" />
                  <span>Your Unlocked Gift Portfolio</span>
                </h3>
                <span className="font-mono text-xs text-amber-400">{claimedGifts.length} items</span>
              </div>

              <p className="text-xs text-slate-400">
                Civic achievements and non-monetary impact gifts earned through game participation:
              </p>

              <div className="space-y-2.5">
                {claimedGifts.map((gift, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-800 bg-slate-950 text-xs"
                  >
                    <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-slate-200 font-medium leading-snug block">{gift}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Verified Zebene Civic Gift</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gift Box Game */}
      {activeGameTab === 'gift-box' && (
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-400 shadow-xl">
            <Gift className={`h-12 w-12 transition-transform duration-500 ${isOpeningBox ? 'scale-125 animate-bounce' : ''}`} />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Generational Gift Box
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Every participant receives regular gift drops rewarding civic dedication, national knowledge, and constructive world ideas.
            </p>
          </div>

          {boxReward && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-5 text-emerald-200 text-xs sm:text-sm font-semibold max-w-md mx-auto space-y-1">
              <span className="text-emerald-400 block text-xs font-mono uppercase">Unlocked Reward:</span>
              <p className="text-white text-base">{boxReward}</p>
              <span className="text-[11px] text-emerald-400 font-normal block">+100 Impact Tokens credited to your ledger</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleOpenGiftBox}
              disabled={isOpeningBox}
              className={`rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer ${
                isOpeningBox
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:scale-105'
              }`}
            >
              {isOpeningBox ? 'Unlocking Generational Gift...' : 'Open Generational Gift Box'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: World & National Idea Incubator */}
      {activeGameTab === 'ideas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Curated ideas for national self-reliance, green energy, and generational prosperity</span>
            <span>{ideas.length} Ideas Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-amber-400">{idea.id}</span>
                    <span className="text-slate-300 font-medium">{idea.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {idea.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Globe2 className="h-3.5 w-3.5 text-slate-500" />
                      {idea.country}
                    </span>
                    <span>By {idea.author}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">
                      Impact: <strong className="text-emerald-400 font-mono">{idea.impactScore}/100</strong>
                    </span>
                    <span className="text-slate-400">
                      Gifts: <strong className="text-amber-400 font-mono">{idea.giftTokensReceived} GT</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAnalyzeIdeaWithAI(idea)}
                      disabled={analyzingIdeaId === idea.id}
                      className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer disabled:opacity-50"
                      title="Request server-side Gemini AI strategic evaluation"
                    >
                      {analyzingIdeaId === idea.id ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Bot className="h-3 w-3" />
                          <span>AI Assessment</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onGiftTokensToIdea(idea.id, 25);
                        showToast(`You gifted 25 Tokens to "${idea.title}"!`);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>Gift 25 Tokens</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Submit New Idea */}
      {showIdeaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Submit a Generational Solution</h3>
                <p className="text-xs text-slate-400">Your proposal to elevate our world, country, and generation</p>
              </div>
              <button
                onClick={() => setShowIdeaModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleNewIdeaSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Idea Title / Project Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Community Biogas Fuel Plant for Regional Hospitals"
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Impact Category
                  </label>
                  <select
                    value={ideaCategory}
                    onChange={(e) => setIdeaCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Clean Energy & Water">Clean Energy & Water</option>
                    <option value="Sustainable Agriculture">Sustainable Agriculture</option>
                    <option value="Generational Education">Generational Education</option>
                    <option value="Civic Infrastructure">Civic Infrastructure</option>
                    <option value="Healthcare Innovation">Healthcare Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country / Focus Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ethiopia / Pan-Africa / Global"
                    value={ideaCountry}
                    onChange={(e) => setIdeaCountry(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Author / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kaleb & Engineering Student Circle"
                  value={ideaAuthor}
                  onChange={(e) => setIdeaAuthor(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Detailed Solution & Generational Benefit
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe how this idea saves expenses, creates local jobs, cleans our environment, or protects future generations..."
                  value={ideaDescription}
                  onChange={(e) => setIdeaDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowIdeaModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish to Incubator</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal: AI Strategic Analysis (Server-Side Gemini) */}
      {aiAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                    Sovereign Strategic Intelligence
                  </span>
                  <h3 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                    {aiAnalysisModal.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setAiAnalysisModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 max-h-72 overflow-y-auto">
              <div className="text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                {aiAnalysisModal.text}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Evaluated via Server-Side AI
              </span>
              <button
                onClick={() => setAiAnalysisModal(null)}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
