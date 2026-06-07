/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, Suit, Rank } from '../types';
import { CardView } from './CardView';
import { useLanguage } from '../context/LanguageContext';
import { RANK_VALUES, SUIT_VALUES, SUIT_NAMES, SUIT_NAMES_EN, SUIT_SYMBOLS, compareCombos } from '../utils/cardUtils';
import { HelpCircle, ChevronRight, Play, Flame, ArrowRightLeft, Award } from 'lucide-react';

export const RulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'comparer' | 'combos' | 'flow'>('basic');
  const { language, t } = useLanguage();
  const isZh = language === 'zh';
  const suitsLabel = isZh ? SUIT_NAMES : SUIT_NAMES_EN;

  // Interactive Card Comparer State
  const [cardLeft, setCardLeft] = useState<Card>({ id: 'left', suit: Suit.SPADE, rank: Rank.TWO });
  const [cardRight, setCardRight] = useState<Card>({ id: 'right', suit: Suit.HEART, rank: Rank.ACE });

  const handleLeftSuitChange = (suit: Suit) => setCardLeft(prev => ({ ...prev, suit }));
  const handleLeftRankChange = (rank: Rank) => setCardLeft(prev => ({ ...prev, rank }));
  const handleRightSuitChange = (suit: Suit) => setCardRight(prev => ({ ...prev, suit }));
  const handleRightRankChange = (rank: Rank) => setCardRight(prev => ({ ...prev, rank }));

  // Run the compare logic
  const leftWins = compareCombos([cardLeft], [cardRight]);
  const rightWins = compareCombos([cardRight], [cardLeft]);
  const isTie = !leftWins && !rightWins;

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl" id="rules-tabs">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 min-w-[120px] py-1.5 md:py-2.5 px-4 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'basic'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          {t.basicTab}
        </button>
        <button
          onClick={() => setActiveTab('comparer')}
          className={`flex-1 min-w-[120px] py-1.5 md:py-2.5 px-4 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'comparer'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          {t.comparerTab}
        </button>
        <button
          onClick={() => setActiveTab('combos')}
          className={`flex-1 min-w-[120px] py-1.5 md:py-2.5 px-4 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'combos'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          {t.combosTab}
        </button>
        <button
          onClick={() => setActiveTab('flow')}
          className={`flex-1 min-w-[120px] py-1.5 md:py-2.5 px-4 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'flow'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          {t.flowTab}
        </button>
      </div>

      {/* Basic Tab */}
      {activeTab === 'basic' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Card Value Hierarchy */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-cream">
            <h3 className="text-lg font-serif font-bold text-gold flex items-center gap-2 border-b border-[#ffffff10] pb-2">
              <span className="p-1 px-2.5 bg-gold/15 text-gold border border-gold/30 rounded font-serif font-black">1</span>
              {t.pointsTitle}
            </h3>
            <p className="text-sm text-cream/90 leading-relaxed font-light">
              {t.pointsDesc}
            </p>
            <div className="flex flex-col space-y-3 bg-forest-dark p-4 rounded-xl border border-[#ffffff05]">
              <div className="flex justify-between items-center text-xs font-semibold text-cream/50 tracking-wider">
                <span>⚡ {isZh ? '最小 (3)' : 'Lowest (3)'}</span>
                <span>🔥 {isZh ? '最大 (2)' : 'Highest (2)'}</span>
              </div>
              {/* Sequential Indicator */}
              <div className="flex justify-between items-center gap-1 overflow-x-auto py-2">
                {[3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', '2'].map((rank, i) => (
                  <div key={rank} className="flex flex-col items-center flex-1 min-w-[20px]">
                    <span className={`text-xs font-mono font-black ${rank === '2' ? 'text-gold' : 'text-cream/80'}`}>
                      {rank}
                    </span>
                    {i < 12 && <ChevronRight className="w-3 h-3 text-gold/40 mt-1" />}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gold font-bold bg-gold/10 p-2.5 rounded border border-gold/20 text-center">
                {t.pointsNote}
              </div>
            </div>
          </div>

          {/* Suit Hierarchy */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-cream">
            <h3 className="text-lg font-serif font-bold text-gold flex items-center gap-2 border-b border-[#ffffff10] pb-2">
              <span className="p-1 px-2.5 bg-gold/15 text-gold border border-gold/30 rounded font-serif font-black">2</span>
              {t.suitTitle}
            </h3>
            <p className="text-sm text-cream/90 leading-relaxed font-light">
              {t.suitDesc}
              <br />
              <strong className="text-gold font-semibold">{isZh ? '黑桃 ♠' : 'Spades ♠'}</strong> {isZh ? '大於' : 'beats'} <strong className="text-rose-400 font-semibold">{isZh ? '紅心 ♥' : 'Hearts ♥'}</strong> {isZh ? '大於' : 'beats'} <strong className="text-amber-400 font-semibold">{isZh ? '方塊 ♦' : 'Diamonds ♦'}</strong> {isZh ? '大於' : 'beats'} <strong className="text-emerald-400 font-semibold">{isZh ? '梅花 ♣' : 'Clubs ♣'}</strong>.
            </p>

            <div className="grid grid-cols-4 gap-2 bg-forest-dark p-4 rounded-xl border border-[#ffffff05]">
              {[Suit.SPADE, Suit.HEART, Suit.DIAMOND, Suit.CLUB].map((suit, index) => {
                const colors = {
                  [Suit.SPADE]: { bg: 'bg-slate-800/20 border-slate-700/80', text: 'text-gold', badge: 'bg-gold/10 text-gold' },
                  [Suit.HEART]: { bg: 'bg-slate-800/20 border-[#ff0055]/30', text: 'text-rose-400', badge: 'bg-[#ff0055]/10 text-rose-455' },
                  [Suit.DIAMOND]: { bg: 'bg-slate-800/20 border-[#ffaa00]/30', text: 'text-amber-400', badge: 'bg-[#ffaa00]/10 text-amber-455' },
                  [Suit.CLUB]: { bg: 'bg-slate-800/20 border-[#00ff88]/20', text: 'text-emerald-400', badge: 'bg-[#00ff88]/10 text-emerald-455' },
                }[suit];

                return (
                  <div key={suit} className={`border rounded-lg p-2.5 flex flex-col items-center space-y-1 shadow-md ${colors.bg}`}>
                    <span className={`text-2xl ${colors.text}`}>{SUIT_SYMBOLS[suit]}</span>
                    <span className="text-xs font-bold text-cream/90">{suitsLabel[suit]}</span>
                    <span className={`text-[9px] md:text-[10px] px-1 py-0.5 rounded font-black text-center ${colors.badge}`}>
                      {t.suitList[index]}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="text-xs text-cream/70 leading-relaxed">
              {t.suitTip}
            </div>
          </div>

          {/* Core Objectives */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 col-span-1 md:col-span-2 text-cream">
            <h3 className="text-lg font-serif font-bold text-gold border-b border-[#ffffff10] pb-2 flex items-center gap-2">
              <span className="p-1 px-2 bg-gold/15 text-gold border border-gold/30 rounded font-serif font-black">🎯</span>
              {t.gameObjectiveTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-forest border border-gold/10 rounded-xl">
                <h4 className="font-serif font-bold text-gold mb-1 text-sm flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-gold" /> {t.objWhoPlays}
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  {t.objWhoPlaysDesc}
                </p>
              </div>

              <div className="p-4 bg-forest border border-gold/10 rounded-xl">
                <h4 className="font-serif font-bold text-gold mb-1 text-sm flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-gold" /> {t.objHowToBeat}
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  {t.objHowToBeatDesc}
                </p>
              </div>

              <div className="p-4 bg-forest border border-gold/10 rounded-xl">
                <h4 className="font-serif font-bold text-gold mb-1 text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" /> {t.objHowToWin}
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  {t.objHowToWinDesc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Comparer Tab */}
      {activeTab === 'comparer' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-6"
        >
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-xl font-serif font-bold text-gold">{t.pkTitle}</h3>
            <p className="text-sm text-cream/70 font-light">
              {t.pkDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            {/* Left Card Setup */}
            <div className="flex flex-col items-center space-y-4 p-4 bg-forest rounded-xl border border-gold/20">
              <span className="text-xs font-bold text-gold/80 tracking-wider">{t.pkLeft}</span>
              <CardView card={cardLeft} size="lg" />
              
              {/* Selectors */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">{isZh ? '點數' : 'Rank'}</label>
                  <select
                    value={cardLeft.rank}
                    onChange={(e) => handleLeftRankChange(e.target.value as Rank)}
                    className="w-full text-xs p-1.5 border border-slate-700/80 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Rank).map(r => (
                      <option key={r} value={r}>{isZh ? `點數 ${r}` : `Rank ${r}`}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">{isZh ? '花色' : 'Suit'}</label>
                  <select
                    value={cardLeft.suit}
                    onChange={(e) => handleLeftSuitChange(e.target.value as Suit)}
                    className="w-full text-xs p-1.5 border border-slate-700/80 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Suit).map(s => (
                      <option key={s} value={s}>{suitsLabel[s]} {SUIT_SYMBOLS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compared Status Badge */}
            <div className="flex flex-col items-center justify-center space-y-3 z-10">
              <div className="p-3 bg-gold/10 text-gold rounded-full border border-gold/25 animate-pulse">
                <ArrowRightLeft className="w-8 h-8" />
              </div>
              <div className="text-center font-serif font-black text-xs md:text-sm py-2 px-6 rounded-full shadow-lg bg-gold text-forest border border-yellow-200 min-w-[140px]">
                {leftWins && (isZh ? '◀ A 大於 B' : '◀ A beats B')}
                {rightWins && (isZh ? 'B 大於 A ▶' : 'B beats A ▶')}
                {isTie && t.pkDraw}
              </div>
            </div>

            {/* Right Card Setup */}
            <div className="flex flex-col items-center space-y-4 p-4 bg-forest rounded-xl border border-gold/20">
              <span className="text-xs font-bold text-gold/80 tracking-wider">{t.pkRight}</span>
              <CardView card={cardRight} size="lg" />

              {/* Selectors */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">{isZh ? '點數' : 'Rank'}</label>
                  <select
                    value={cardRight.rank}
                    onChange={(e) => handleRightRankChange(e.target.value as Rank)}
                    className="w-full text-xs p-1.5 border border-slate-700/80 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Rank).map(r => (
                      <option key={r} value={r}>{isZh ? `點數 ${r}` : `Rank ${r}`}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">{isZh ? '花色' : 'Suit'}</label>
                  <select
                    value={cardRight.suit}
                    onChange={(e) => handleRightSuitChange(e.target.value as Suit)}
                    className="w-full text-xs p-1.5 border border-slate-700/80 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Suit).map(s => (
                      <option key={s} value={s}>{suitsLabel[s]} {SUIT_SYMBOLS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation text */}
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/80 text-sm text-cream/90 space-y-1 max-w-xl mx-auto">
            <h4 className="font-bold text-gold flex items-center gap-1.5 font-serif">
              {t.pkReasonTitle}
            </h4>
            <ul className="list-disc leading-relaxed list-inside space-y-1 text-xs">
              <li>
                {isZh
                  ? <>比較點數：A為 <strong className="text-gold">{cardLeft.rank}</strong> (價值 {RANK_VALUES[cardLeft.rank]} 分)，B為 <strong className="text-gold">{cardRight.rank}</strong> (價值 {RANK_VALUES[cardRight.rank]} 分)。</>
                  : <>Compare point ranks: A is <strong className="text-gold">{cardLeft.rank}</strong> (Weight {RANK_VALUES[cardLeft.rank]}), B is <strong className="text-gold">{cardRight.rank}</strong> (Weight {RANK_VALUES[cardRight.rank]}).</>
                }
              </li>
              {cardLeft.rank === cardRight.rank ? (
                <li>
                  {isZh
                    ? <>因兩卡點數相同，所以進行<strong>比花色</strong>：A的花色是 <strong className="text-gold">{suitsLabel[cardLeft.suit]}</strong> (花色權重 {SUIT_VALUES[cardLeft.suit]})，B的花色是 <strong className="text-gold">{suitsLabel[cardRight.suit]}</strong> (花色權重 {SUIT_VALUES[cardRight.suit]})。</>
                    : <>Ranks are identical, so we compare <strong>suits</strong>: A's suit is <strong className="text-gold">{suitsLabel[cardLeft.suit]}</strong> (Suit weight {SUIT_VALUES[cardLeft.suit]}), B's suit is <strong className="text-gold">{suitsLabel[cardRight.suit]}</strong> (Suit weight {SUIT_VALUES[cardRight.suit]}).</>
                  }
                </li>
              ) : (
                <li>
                  {isZh ? '直接按點數大小決定勝負，不需比花色。' : 'Decision made directly by point rank. Comparing suits is not needed.'}
                </li>
              )}
              <li className="font-semibold text-gold mt-2 border-t border-[#ffffff08] pt-2">
                {isZh ? '勝算說明：' : 'Verdict: '}{leftWins
                  ? `${isZh ? '【卡牌 A】' : '[Card A]'} ${t.pkWin}! ${
                      RANK_VALUES[cardLeft.rank] > RANK_VALUES[cardRight.rank]
                        ? (isZh ? `點數 ${cardLeft.rank} 大於 ${cardRight.rank}。` : `Rank ${cardLeft.rank} exceeds ${cardRight.rank}.`)
                        : (isZh
                          ? `${cardLeft.rank} 與 ${cardRight.rank}點數相同，但【花色 ${suitsLabel[cardLeft.suit]}】大於【花色 ${suitsLabel[cardRight.suit]}】。`
                          : `Identical rank ${cardLeft.rank}, but [Suit ${suitsLabel[cardLeft.suit]}] defeats [Suit ${suitsLabel[cardRight.suit]}].`)
                    }`
                  : `${isZh ? '【卡牌 B】' : '[Card B]'} ${t.pkWin}! ${
                      RANK_VALUES[cardRight.rank] > RANK_VALUES[cardLeft.rank]
                        ? (isZh ? `點數 ${cardRight.rank} 大於 ${cardLeft.rank}。` : `Rank ${cardRight.rank} exceeds ${cardLeft.rank}.`)
                        : (isZh
                          ? `${cardRight.rank} 與 ${cardLeft.rank}點數相同，但【花色 ${suitsLabel[cardRight.suit]}】大於【花色 ${suitsLabel[cardLeft.suit]}】。`
                          : `Identical rank ${cardRight.rank}, but [Suit ${suitsLabel[cardRight.suit]}] defeats [Suit ${suitsLabel[cardLeft.suit]}].`)
                    }`
                }
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Combo Tab */}
      {activeTab === 'combos' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-cream">
            <h3 className="text-lg font-serif font-bold text-gold">{t.combosHeading}</h3>
            <p className="text-sm text-cream/80 leading-relaxed font-light">
              {t.combosIntro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Combo 1: Straight */}
              <div className="p-4 bg-forest rounded-xl border border-gold/15 shadow-md space-y-2 text-cream">
                <span className="text-xs font-bold text-forest bg-gold px-2 py-0.5 rounded">{t.comboItems[0].name}</span>
                <p className="text-xs text-cream/90 font-light">
                  {t.comboItems[0].description}
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>{isZh ? '比牌邏輯：' : 'Comparison Priority:'}</strong> {t.comboItems[0].strong}
                </div>
                <div className="flex gap-1 py-1 scale-90 origin-left">
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-extrabold rounded">♣3</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/30 text-xs font-extrabold rounded text-rose-400">♦4</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/30 text-xs font-extrabold rounded text-rose-400">♥5</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-extrabold rounded text-gold">♠6</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-extrabold rounded">♣7</span>
                </div>
              </div>

              {/* Combo 2: Flush */}
              <div className="p-4 bg-forest rounded-xl border border-gold/15 shadow-md space-y-2 text-cream">
                <span className="text-xs font-bold text-cream bg-indigo-700 px-2 py-0.5 rounded">{t.comboItems[1].name}</span>
                <p className="text-xs text-cream/90 font-light">
                  {t.comboItems[1].description}
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>{isZh ? '比牌邏輯：' : 'Comparison Priority:'}</strong> {t.comboItems[1].strong}
                </div>
                <div className="flex gap-1 py-1 scale-90 origin-left text-rose-400 font-extrabold">
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/35 text-xs rounded">♥3</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/35 text-xs rounded">♥5</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/35 text-xs rounded">♥8</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/35 text-xs rounded">♥J</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/35 text-xs rounded">♥K</span>
                </div>
              </div>

              {/* Combo 3: Full House */}
              <div className="p-4 bg-forest rounded-xl border border-gold/15 shadow-md space-y-2 text-cream">
                <span className="text-xs font-bold text-forest bg-amber-400 px-2 py-0.5 rounded">{t.comboItems[2].name}</span>
                <p className="text-xs text-cream/90 font-light">
                  {t.comboItems[2].description}
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>{isZh ? '比牌邏輯：' : 'Comparison Priority:'}</strong> {t.comboItems[2].strong}
                </div>
                <div className="flex gap-1 py-1 scale-90 origin-left">
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/30 text-xs font-bold text-rose-400 rounded">♥8</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-bold text-gold rounded">♠8</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-bold text-gold rounded">♣8</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/30 text-xs font-bold text-rose-400 rounded">♦4</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-bold text-gold rounded">♣4</span>
                </div>
              </div>

              {/* Combo 4: Four of a Kind */}
              <div className="p-4 bg-forest rounded-xl border border-gold/15 shadow-md space-y-2 text-cream">
                <span className="text-xs font-bold text-cream bg-rose-700 px-2 py-0.5 rounded">{t.comboItems[3].name}</span>
                <p className="text-xs text-cream/90 font-light">
                  {t.comboItems[3].description}
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>{isZh ? '比牌邏輯：' : 'Comparison Priority:'}</strong> {t.comboItems[3].strong}
                </div>
                <div className="flex gap-1 py-1 scale-90 origin-left">
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-bold rounded">♣Q</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/30 text-xs font-bold text-rose-400 rounded">♦Q</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ff0055]/30 text-xs font-bold text-rose-400 rounded">♥Q</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/20 text-xs font-bold text-gold rounded">♠Q</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-[#ffffff15] text-xs font-bold rounded text-cream/40">♥3</span>
                </div>
              </div>

              {/* Combo 5: Straight Flush */}
              <div className="p-4 bg-forest rounded-xl border border-gold/15 shadow-md space-y-2 text-cream">
                <span className="text-xs font-bold text-forest bg-emerald-400 px-2 py-0.5 rounded">{t.comboItems[4].name}</span>
                <p className="text-xs text-cream/90 font-light">
                  {t.comboItems[4].description}
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>{isZh ? '比牌邏輯：' : 'Comparison Priority:'}</strong> {t.comboItems[4].strong}
                </div>
                <div className="flex gap-1 py-1 scale-90 origin-left text-gold font-extrabold">
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/30 text-xs rounded">♠8</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/30 text-xs rounded">♠9</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/30 text-xs rounded">♠10</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/30 text-xs rounded">♠J</span>
                  <span className="p-1 px-1.5 bg-forest-dark border border-gold/30 text-xs rounded">♠Q</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Flow Tab */}
      {activeTab === 'flow' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-6 text-cream"
        >
          <div className="border-l-4 border-gold pl-4 py-1">
            <h3 className="text-lg font-serif font-bold text-gold">{t.flowTitle}</h3>
            <p className="text-sm text-cream/70 mt-1 font-light">
              {t.flowDesc}
            </p>
          </div>

          <div className="relative border-l-2 border-gold/15 ml-3 pl-6 space-y-8 py-2">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-250 select-none">
                1
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">{t.flowSteps[0].title}</h4>
              <p className="text-xs text-cream/85 mt-1 leading-relaxed font-light font-light">
                {t.flowSteps[0].desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-250 select-none">
                2
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">{t.flowSteps[1].title}</h4>
              <p className="text-xs text-cream/85 mt-1 leading-relaxed font-light font-light">
                {t.flowSteps[1].desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-250 select-none">
                3
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">{t.flowSteps[2].title}</h4>
              <p className="text-xs text-cream/85 mt-1 leading-relaxed font-light font-light">
                {t.flowSteps[2].desc}
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-250 select-none">
                4
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">{t.flowSteps[3].title}</h4>
              <p className="text-xs text-cream/85 mt-1 leading-relaxed font-light font-light">
                {t.flowSteps[3].desc}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
