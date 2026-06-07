/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Suit, Rank, ComboType } from '../types';
import { CardView } from './CardView';
import { useLanguage } from '../context/LanguageContext';
import { analyzeCombo, SUIT_NAMES, SUIT_SYMBOLS } from '../utils/cardUtils';
import { Monitor, HelpCircle, Trophy, User, ArrowUpCircle, Info, RefreshCw, Star, SkipForward } from 'lucide-react';

// Static template mapping for simulation states
interface StageConfig {
  id: number;
  tableCards: Card[];
  playerHand: Card[];
  validSelectionIds: string[];
}

const STAGE_CONFIGS: StageConfig[] = [
  {
    id: 1,
    tableCards: [],
    playerHand: [
      { id: 'CLUB_3', suit: Suit.CLUB, rank: Rank.THREE },
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'DIAMOND_QUEEN', suit: Suit.DIAMOND, rank: Rank.QUEEN },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
      { id: 'SPADE_2', suit: Suit.SPADE, rank: Rank.TWO },
    ],
    validSelectionIds: ['CLUB_3'],
  },
  {
    id: 2,
    tableCards: [{ id: 'HEART_JACK', suit: Suit.HEART, rank: Rank.JACK }],
    playerHand: [
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'DIAMOND_QUEEN', suit: Suit.DIAMOND, rank: Rank.QUEEN },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
      { id: 'SPADE_2', suit: Suit.SPADE, rank: Rank.TWO },
    ],
    validSelectionIds: ['DIAMOND_QUEEN'],
  },
  {
    id: 3,
    tableCards: [{ id: 'CLUB_2', suit: Suit.CLUB, rank: Rank.TWO }],
    playerHand: [
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
      { id: 'SPADE_2', suit: Suit.SPADE, rank: Rank.TWO },
    ],
    validSelectionIds: ['SPADE_2'],
  },
  {
    id: 4,
    tableCards: [],
    playerHand: [
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
    ],
    validSelectionIds: ['DIAMOND_5', 'SPADE_5'],
  },
];

export const PracticeGame: React.FC = () => {
  const [stageIdx, setStageIdx] = useState(0);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const { language, t } = useLanguage();
  const isZh = language === 'zh';

  const config = STAGE_CONFIGS[stageIdx];
  const translatedStage = t.practiceStages[stageIdx];

  const handleCardClick = (card: Card) => {
    if (errorMessage) setErrorMessage(null);
    const exists = selectedCards.some(c => c.id === card.id);
    if (exists) {
      setSelectedCards(prev => prev.filter(c => c.id !== card.id));
    } else {
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handlePlay = () => {
    const selectedIds = selectedCards.map(c => c.id).sort();
    const requiredIds = [...config.validSelectionIds].sort();

    // Verify if selection matches perfectly
    const isCorrect = selectedIds.length === requiredIds.length && 
                      selectedIds.every((id, idx) => id === requiredIds[idx]);

    if (isCorrect) {
      setErrorMessage(null);
      setShowSuccessCard(true);
    } else {
      if (selectedCards.length === 0) {
        setErrorMessage(t.practiceChooseCardError);
      } else {
        // Detailed feedback matching the selected template language structures
        const analysis = analyzeCombo(selectedCards, language);
        const errText = t.practiceWrongChoiceText
          .replace('{name}', analysis.name)
          .replace('{action}', translatedStage.suggestedAction);
        setErrorMessage(errText);
      }
    }
  };

  const handleNextStage = () => {
    setShowSuccessCard(false);
    setSelectedCards([]);
    setErrorMessage(null);

    if (stageIdx < STAGE_CONFIGS.length - 1) {
      setStageIdx(prev => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setStageIdx(0);
    setSelectedCards([]);
    setErrorMessage(null);
    setShowSuccessCard(false);
    setGameFinished(false);
  };

  return (
    <div className="space-y-6">
      {!gameFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Stage Info & Wizard Assistant (5 Columns) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden text-cream">
            {/* Stage Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs font-serif font-black text-gold/80 uppercase tracking-widest whitespace-nowrap">
                  {isZh ? '實戰關卡' : 'Stage'} {config.id} / {STAGE_CONFIGS.length}
                </span>
                <span className="text-xs text-gold font-bold bg-forest px-2.5 py-0.5 rounded border border-gold/15 ml-2">
                  {translatedStage.title}
                </span>
              </div>

              {/* Wizard speech bubble */}
              <div className="bg-forest rounded-2xl p-4 border border-gold/15 relative mt-4">
                <div className="absolute top-4 -left-2 w-4 h-4 bg-forest border-b border-l border-gold/15 rotate-45"></div>
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gold text-[#0A2619] flex items-center justify-center font-black text-lg shrink-0 select-none shadow-md">
                    🧙‍♂️
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gold">
                      {isZh ? '大老二新手導師' : 'Big Two Instructor'}
                    </span>
                    <p className="text-xs text-cream/90 leading-relaxed font-sans font-medium">
                      {translatedStage.assistantBubble}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt actions / Guidance */}
            <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
              <div className="flex items-start gap-1.5 p-2.5 bg-gold/10 text-gold rounded-lg text-xs border border-gold/25">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>{isZh ? '通關係引：' : 'Guideline: '}</strong> {translatedStage.suggestedAction}。
                </div>
              </div>

              {errorMessage && (
                <div className="text-xs bg-red-950/45 border border-[#ff0055]/30 text-rose-300 p-3 rounded-lg leading-relaxed font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Confirm Play Button */}
              {!showSuccessCard ? (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="w-full bg-gold hover:bg-amber-400 text-forest font-serif font-black p-3 rounded-xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm border border-yellow-250 font-extrabold"
                >
                  <ArrowUpCircle className="w-5 h-5 font-bold" />
                  {isZh ? '打出選中的牌' : 'Play Selected Hand'}
                </button>
              ) : (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="space-y-3"
                >
                  <div className="p-3.5 bg-gold/15 border border-gold/30 text-gold rounded-xl text-xs space-y-1.5">
                    <p className="font-extrabold text-sm flex items-center gap-1 font-serif">
                      <span>🎉</span> {isZh ? '通關成功！' : 'Success! Stage Clear!'}
                    </p>
                    <p className="font-medium text-cream/90 leading-relaxed">{translatedStage.successMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="w-full bg-forest hover:bg-forest-light text-cream font-serif font-bold p-3 rounded-xl border border-gold/25 shadow hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer text-sm font-extrabold"
                  >
                    {isZh ? '進入下個實戰步驟' : 'Continue into Next Step'}
                    <SkipForward className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Poker Table (7 Columns) */}
          <div className="lg:col-span-12 xl:col-span-7 bg-slate-950 min-h-[460px] rounded-3xl border border-slate-800 shadow-2xl relative p-6 flex flex-col justify-between overflow-hidden">
            {/* Casino Felt Background texture decorations */}
            <div className="absolute inset-0 opacity-15 pointer-events-none select-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-2/3 rounded-full border-4 border-dotted border-gold/10 pointer-events-none"></div>

            {/* AI Enemy Top Seating (Player 3) */}
            <div className="flex flex-col items-center z-10">
              <div className="bg-slate-900 text-cream py-1.5 px-4 rounded-full border border-slate-800 shadow-lg text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>{t.practiceEnemyTop}</span>
                <span className="bg-forest text-gold font-extrabold px-1.5 py-0.2 rounded scale-90 border border-gold/10 whitespace-nowrap">
                  {config.id === 1 ? (isZh ? '持有 13 張' : '13 Cards') : config.id === 2 ? (isZh ? '持有 11 張' : '11 Cards') : 'PASS'}
                </span>
              </div>
            </div>

            {/* AI Enemies Left and Right Seats */}
            <div className="flex justify-between items-center w-full my-1 px-1 z-10 gap-2">
              {/* Left Seat (Player 2) */}
              <div className="bg-slate-900 text-cream py-1.5 px-3 rounded-full border border-slate-800 shadow flex items-center gap-1 text-[10px] font-bold whitespace-nowrap">
                <User className="w-3 h-3 text-gold" />
                <span>{t.practiceEnemyLeft}</span>
                <span className="bg-forest px-1.5 py-0.5 rounded text-gold border border-gold/5 ml-1 select-none">
                  {config.id === 1 ? (isZh ? '13 張' : '13 Cards') : config.id === 2 ? (isZh ? '過牌' : 'PASS') : 'PASS'}
                </span>
              </div>

              {/* Right Seat (Player 4) */}
              <div className="bg-slate-900 text-cream py-1.5 px-3 rounded-full border border-slate-800 shadow flex items-center gap-1 text-[10px] font-bold whitespace-nowrap">
                <User className="w-3 h-3 text-gold" />
                <span>{t.practiceEnemyRight}</span>
                <span className="bg-forest px-1.5 py-0.5 rounded text-gold border border-gold/5 ml-1 select-none">
                  {config.id === 1 ? (isZh ? '13 張' : '13 Cards') : config.id === 2 ? 'PASS' : config.id === 3 ? (isZh ? '打出 ♣2' : 'Played Club 2') : 'PASS'}
                </span>
              </div>
            </div>

            {/* Center Match Area (Last hand played) */}
            <div className="flex flex-col items-center justify-center my-6 z-10 min-h-[140px] relative">
              <span className="absolute -top-3.5 bg-slate-900 text-gold text-[10px] font-semibold tracking-widest uppercase border border-slate-800 rounded-full px-3 py-0.5 select-none text-center">
                {t.practiceCurrentTableCombo} ({translatedStage.tableComboName})
              </span>

              {config.tableCards.length === 0 ? (
                <div className="py-6 px-10 border border-dashed border-slate-800 rounded-2xl bg-slate-900/60 text-center text-cream/50 max-w-[280px]">
                  <Monitor className="w-7 h-7 mx-auto text-gold mb-1.5" />
                  <p className="text-[11px] font-bold tracking-tight text-gold">{t.practiceEmptyTable}</p>
                  <p className="text-[10px] text-cream/40 mt-1 leading-relaxed">{t.practiceDiscardedDesc}</p>
                </div>
              ) : (
                <div className="flex gap-2 justify-center py-4 scale-95 md:scale-100">
                  {config.tableCards.map(card => (
                    <CardView key={card.id} card={card} size="md" disabled={true} />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom active player hand */}
            <div className="flex flex-col items-center space-y-3 z-10 relative">
              <div className="bg-slate-900 border border-slate-800 text-gold text-[11px] font-bold tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                <span>{t.practiceHeroHand}</span>
              </div>

              {/* Cards slider selection */}
              <div className="flex gap-1.5 md:gap-2.5 justify-center max-w-full overflow-x-auto py-3 px-3 rounded-2xl bg-slate-950 border border-slate-800 select-none">
                {config.playerHand.map(card => {
                  const isSelected = selectedCards.some(c => c.id === card.id);
                  const isCandidate = config.validSelectionIds.includes(card.id);
                  return (
                    <CardView
                      key={card.id}
                      card={card}
                      size="sm"
                      selected={isSelected}
                      highlighted={isCandidate && !isSelected}
                      onClick={() => handleCardClick(card)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Completion splash screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 shadow-2xl text-center space-y-6 text-cream"
        >
          <div className="max-w-lg mx-auto space-y-3">
            <Trophy className="w-16 h-16 mx-auto text-gold fill-gold/20 animate-pulse" />
            <h3 className="text-2xl font-serif font-black text-gold">{t.practiceVictoryTitle}</h3>
            <p className="text-cream/80 text-sm leading-relaxed font-light">
              {t.practiceVictoryDesc}
              <br />
              <span className="block mt-2 font-semibold text-gold/90">{t.practiceVictoryCongrats}</span>
            </p>
          </div>

          <div className="flex gap-4 justify-center max-w-xs mx-auto">
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 bg-gold text-[#0A2619] font-serif font-black p-3 rounded-xl transition-all border border-yellow-250 shadow hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 text-sm font-extrabold"
            >
              <RefreshCw className="w-4 h-4" />
              {t.practiceRestartGameBtn}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
