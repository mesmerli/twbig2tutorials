/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Suit, Rank, ComboType } from '../types';
import { CardView } from './CardView';
import { analyzeCombo, SUIT_NAMES, SUIT_SYMBOLS } from '../utils/cardUtils';
import { Monitor, HelpCircle, Trophy, User, ArrowUpCircle, Info, RefreshCw, Star, SkipForward } from 'lucide-react';

// Define the static list of stages
interface TutorialStage {
  id: number;
  title: string;
  assistantBubble: string;
  tableCards: Card[];
  tableComboName: string;
  suggestedAction: string;
  playerHand: Card[];
  validSelectionIds: string[];
  successMessage: string;
}

const TUTORIAL_STAGES: TutorialStage[] = [
  {
    id: 1,
    title: '第一關：梅花 3 ♣ 起手規定',
    assistantBubble: '歡迎來到大老二實戰新手村！遊戲剛開局你拿到了 7 張牌。在大老二中，手牌中持有最弱點數「梅花 3 ♣3」的玩家必須最先出牌，且出的這手牌必須包含梅花 3！現在請把你的「梅花 3」點擊選取起來，並按下「出牌」吧。',
    tableCards: [],
    tableComboName: '無（空場）',
    suggestedAction: '請選擇「梅花 3 ♣」單張打出',
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
    successMessage: '做得太好了！你遵守了「梅花3優先開局」的名言。這時牌局宣告開始！',
  },
  {
    id: 2,
    title: '第二關：跟上家牌（單張大小對比）',
    assistantBubble: '你打出了梅花3後，輪到對手們。Player 2 出了一張「方塊 8 ♦8」，緊著 Player 3 出了一張更高點數的「紅心 J ♥J」，Player 4 則是宣布過牌 (PASS)。現在輪到你，目前場上最大的牌是「紅心 J ♥J」。你需要出單張壓過它，此時你手上有「方塊 Q ♦Q」、「梅花 A ♣A」及「黑桃 2 ♠2」大於 J。為了保留好牌在手中，最好的決策是出「方塊 Q ♦Q」，點選它然後按出牌！',
    tableCards: [{ id: 'HEART_JACK', suit: Suit.HEART, rank: Rank.JACK }],
    tableComboName: '單張 紅心 J',
    suggestedAction: '請選擇「方塊 Q ♦」單張打出進行壓制',
    playerHand: [
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'DIAMOND_QUEEN', suit: Suit.DIAMOND, rank: Rank.QUEEN },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
      { id: 'SPADE_2', suit: Suit.SPADE, rank: Rank.TWO },
    ],
    validSelectionIds: ['DIAMOND_QUEEN'],
    successMessage: '漂亮！Q 的數值比 J 大，成功跟牌！這能幫你保留 Ace 和王者2，這也是高手存牌的重要思路！',
  },
  {
    id: 3,
    title: '第三關：終極至尊「黑桃 2」大反擊',
    assistantBubble: '天啊！你出了方塊 Q 後，Player 2 出了一張「黑桃 K ♠K」壓死你，接著 Player 3 喊 PASS，沒想到手牌極強的 Player 4 突然扔出巨牌「梅花 2 ♣2」！（梅花2是僅次於黑桃/紅心/方塊2的頂級牌）。大家全過，眼看他就要拿到自由出牌權。別慌！你手中還握有全場最高、至高無上的皇者——「黑桃 2 ♠2」！讓我們給他終極制裁，選中「黑桃 2 ♠2」扔出去，壓翻他的梅花 2 奪回牌權！',
    tableCards: [{ id: 'CLUB_2', suit: Suit.CLUB, rank: Rank.TWO }],
    tableComboName: '單張 梅花 2',
    suggestedAction: '請選擇「黑桃 2 ♠」打出壓跨梅花2！',
    playerHand: [
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
      { id: 'SPADE_2', suit: Suit.SPADE, rank: Rank.TWO },
    ],
    validSelectionIds: ['SPADE_2'],
    successMessage: '太刺激了！因為點數同為「2」，但你的花色是黑桃(♠)，黑桃是大於梅花(♣)的！你的黑桃 2 毫無爭議壓平全盤！隨後所有人只能乖乖喊過 (PASS)！',
  },
  {
    id: 4,
    title: '第四關：斬獲主導牌權（出對子）',
    assistantBubble: '當你放出黑桃 2 後，所有對手連續喊了 PASS！本回合宣告結束，桌面被徹底清空，而你藉此奪下了最珍貴的「主導牌權」！在此狀態下你不再受任何上家牌型拘束，可以出單張、對子、甚至是五張組合。看看你的最後 4 張手牌，居然藏有一個漂亮的對子「方塊 5 ♦5」與「黑桃 5 ♠5」！點選那兩張 5 組成對子，將它們威風凛凛地打出去把！',
    tableCards: [],
    tableComboName: '無（你擁有自由出牌權！）',
    suggestedAction: '請同時點選「方塊 5 ♦」與「黑桃 5 ♠」組成「對子」並出牌',
    playerHand: [
      { id: 'DIAMOND_5', suit: Suit.DIAMOND, rank: Rank.FIVE },
      { id: 'SPADE_5', suit: Suit.SPADE, rank: Rank.FIVE },
      { id: 'HEART_9', suit: Suit.HEART, rank: Rank.NINE },
      { id: 'CLUB_ACE', suit: Suit.CLUB, rank: Rank.ACE },
    ],
    validSelectionIds: ['DIAMOND_5', 'SPADE_5'],
    successMessage: '極度完美！你打出了一對 5。對手們面面相覷，有人用更高等的對子壓了過去，但在你那強勁策略的壓迫下，你穩穩領先，最終將手牌輕鬆清空！你完成大老二實戰新手指南了！',
  },
];

export const PracticeGame: React.FC = () => {
  const [stageIdx, setStageIdx] = useState(0);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const stage = TUTORIAL_STAGES[stageIdx];

  const handleCardClick = (card: Card) => {
    errorMessage && setErrorMessage(null);
    const exists = selectedCards.some(c => c.id === card.id);
    if (exists) {
      setSelectedCards(prev => prev.filter(c => c.id !== card.id));
    } else {
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handlePlay = () => {
    const selectedIds = selectedCards.map(c => c.id).sort();
    const requiredIds = [...stage.validSelectionIds].sort();

    // Verify if selection matches perfectly
    const isCorrect = selectedIds.length === requiredIds.length && 
                      selectedIds.every((id, idx) => id === requiredIds[idx]);

    if (isCorrect) {
      setErrorMessage(null);
      setShowSuccessCard(true);
    } else {
      if (selectedCards.length === 0) {
        setErrorMessage('請點擊選取你想打出的王牌！');
      } else {
        // Detailed feedback
        const analysis = analyzeCombo(selectedCards);
        setErrorMessage(`不對喔！你目前選取了「${analysis.name}」，這不符合此關卡最優的教學指示。請按照左側導師的提示，選擇「${stage.suggestedAction}」再出牌唷。`);
      }
    }
  };

  const handleNextStage = () => {
    setShowSuccessCard(false);
    setSelectedCards([]);
    setErrorMessage(null);

    if (stageIdx < TUTORIAL_STAGES.length - 1) {
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
      {/* Grid Layout */}
      {!gameFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Stage Info & Wizard Assistant (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden text-cream">
            {/* Stage Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs font-serif font-black text-gold/80 uppercase tracking-widest">
                  實戰關卡 {stage.id} / {TUTORIAL_STAGES.length}
                </span>
                <span className="text-xs text-gold font-bold bg-forest px-2.5 py-0.5 rounded border border-gold/15">
                  {stage.title}
                </span>
              </div>

              {/* Wizard speech bubble representation */}
              <div className="bg-forest rounded-2xl p-4 border border-gold/15 relative mt-4">
                <div className="absolute top-4 -left-2 w-4 h-4 bg-forest border-b border-l border-gold/15 rotate-45"></div>
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gold text-[#0A2619] flex items-center justify-center font-black text-lg shrink-0 select-none shadow-md">
                    🧙‍♂️
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gold">大老二新手導師</span>
                    <p className="text-xs text-cream/90 leading-relaxed font-sans font-medium">
                      {stage.assistantBubble}
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
                  <strong>通關係引：</strong> {stage.suggestedAction}。
                </div>
              </div>

              {errorMessage && (
                <div className="text-xs bg-red-950/40 border border-[#ff0055]/30 text-rose-300 p-3 rounded-lg leading-relaxed font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Confirm Play Button */}
              {!showSuccessCard ? (
                <button
                  onClick={handlePlay}
                  className="w-full bg-gold hover:bg-amber-400 text-forest font-serif font-black p-3 rounded-xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm border border-yellow-200"
                >
                  <ArrowUpCircle className="w-5 h-5 font-bold" />
                  打出選中的牌 (Play Selected)
                </button>
              ) : (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="space-y-3"
                >
                  <div className="p-3.5 bg-gold/15 border border-gold/30 text-gold rounded-xl text-xs space-y-1.5">
                    <p className="font-extrabold text-sm flex items-center gap-1 font-serif">
                      <span>🎉</span> 通關成功！
                    </p>
                    <p className="font-medium text-cream/90 leading-relaxed">{stage.successMessage}</p>
                  </div>
                  <button
                    onClick={handleNextStage}
                    className="w-full bg-forest hover:bg-forest-light text-cream font-serif font-bold p-3 rounded-xl border border-gold/25 shadow hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer text-sm"
                  >
                    進入下個實戰步驟
                    <SkipForward className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Poker Table (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-950 min-h-[460px] rounded-3xl border-2 border-slate-800 shadow-2xl relative p-6 flex flex-col justify-between overflow-hidden">
            {/* Visual Casino Felt Background texture decoration */}
            <div className="absolute inset-0 opacity-15 pointer-events-none select-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Casino Oval Table Border Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-2/3 rounded-full border-4 border-dotted border-gold/10 pointer-events-none"></div>

            {/* AI Enemy Top Seating (Player 3) */}
            <div className="flex flex-col items-center z-10">
              <div className="bg-slate-900 text-cream py-1.5 px-4 rounded-full border border-slate-800 shadow-lg text-[11px] font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                <span>Player 3 (上家 / 順時針)</span>
                <span className="bg-forest text-gold font-extrabold px-1.5 py-0.2 rounded scale-90 border border-gold/10">
                  {stage.id === 1 ? '持有 13 張' : stage.id === 2 ? '持有 11 張' : stage.id === 3 ? 'PASS' : 'PASS'}
                </span>
              </div>
            </div>

            {/* AI Enemies Left and Right Seats (Player 2 and Player 4) */}
            <div className="flex justify-between items-center w-full my-1 px-1 z-10">
              {/* Left Seat (Player 2) */}
              <div className="bg-slate-900 text-cream py-1.5 px-3 rounded-full border border-slate-800 shadow flex items-center gap-1 text-[10px] font-bold">
                <User className="w-3 h-3 text-gold" />
                <span>Player 2:</span>
                <span className="bg-forest px-1 rounded text-gold border border-gold/5">
                  {stage.id === 1 ? '13 張' : stage.id === 2 ? '出過過牌' : stage.id === 3 ? 'PASS' : 'PASS'}
                </span>
              </div>

              {/* Right Seat (Player 4) */}
              <div className="bg-slate-900 text-cream py-1.5 px-3 rounded-full border border-slate-800 shadow flex items-center gap-1 text-[10px] font-bold">
                <User className="w-3 h-3 text-gold" />
                <span>Player 4:</span>
                <span className="bg-forest px-1 rounded text-gold border border-gold/5">
                  {stage.id === 1 ? '13 張' : stage.id === 2 ? 'PASS' : stage.id === 3 ? '出的 ♣2' : 'PASS'}
                </span>
              </div>
            </div>

            {/* Core Center Match Table Area (Last Played Hand) */}
            <div className="flex flex-col items-center justify-center my-6 z-10 min-h-[140px] relative">
              <span className="absolute -top-3.5 bg-slate-900 text-gold text-[10px] font-semibold tracking-widest uppercase border border-slate-800 rounded-full px-3 py-0.5">
                目前場上牌型 ({stage.tableComboName})
              </span>

              {stage.tableCards.length === 0 ? (
                <div className="py-6 px-10 border border-dashed border-slate-800 rounded-2xl bg-slate-900/60 text-center text-cream/50 max-w-[280px]">
                  <Monitor className="w-7 h-7 mx-auto text-gold mb-1.5" />
                  <p className="text-[11px] font-bold tracking-tight text-gold">桌面已清空</p>
                  <p className="text-[10px] text-cream/40 mt-1 leading-relaxed">沒有上家跟牌，您擁有自由的出牌權！</p>
                </div>
              ) : (
                <div className="flex gap-2 justify-center py-4 scale-95 md:scale-100">
                  {stage.tableCards.map(card => (
                    <CardView key={card.id} card={card} size="md" disabled={true} />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Active User hand (Bottom seat) */}
            <div className="flex flex-col items-center space-y-3 z-10 relative">
              <div className="bg-slate-900 border border-slate-800 text-gold text-[11px] font-bold tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                <span>我的王牌手卡（點擊進行選取）</span>
              </div>

              {/* Card slider display */}
              <div className="flex gap-1.5 md:gap-2.5 justify-center max-w-full overflow-x-auto py-3 px-3 rounded-2xl bg-slate-950 border border-slate-800">
                {stage.playerHand.map(card => {
                  const isSelected = selectedCards.some(c => c.id === card.id);
                  // Highlight the suggested cards so they know where to tap
                  const isCandidate = stage.validSelectionIds.includes(card.id);
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
        /* Tutorial Completion summary splash screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 shadow-2xl text-center space-y-6 text-cream"
        >
          <div className="max-w-lg mx-auto space-y-3">
            <Trophy className="w-16 h-16 mx-auto text-gold fill-gold/20 animate-pulse" />
            <h3 className="text-2xl font-serif font-black text-gold">🏆 恭喜畢業！大老二高手新手村完全通關</h3>
            <p className="text-cream/80 text-sm leading-relaxed font-light">
              你現在已經完全理解了開局、壓牌、過牌以及主控牌權（發牌權）的實戰規矩！
              不管是和親朋好友聚會，或是線上競技，都能自信滿滿、胸有成竹地下場玩樂了！
            </p>
          </div>

          <div className="flex gap-4 justify-center max-w-xs mx-auto">
            <button
              onClick={handleRestart}
              className="flex-1 bg-gold text-[#0A2619] font-serif font-black p-3 rounded-xl transition-all border border-yellow-250 shadow hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              重新挑戰本關卡
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
