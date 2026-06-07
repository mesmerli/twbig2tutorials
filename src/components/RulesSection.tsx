/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, Suit, Rank } from '../types';
import { CardView } from './CardView';
import { RANK_VALUES, SUIT_VALUES, SUIT_NAMES, SUIT_SYMBOLS, compareCombos } from '../utils/cardUtils';
import { HelpCircle, ChevronRight, Play, Flame, ArrowRightLeft, Award } from 'lucide-react';

export const RulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'comparer' | 'combos' | 'flow'>('basic');

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
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'basic'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          🃏 核心基本規則
        </button>
        <button
          onClick={() => setActiveTab('comparer')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'comparer'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          ⚔️ 互動卡牌比大小
        </button>
        <button
          onClick={() => setActiveTab('combos')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'combos'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          🧩 五張牌型解析
        </button>
        <button
          onClick={() => setActiveTab('flow')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'flow'
              ? 'bg-gold text-forest shadow-md font-black'
              : 'text-cream/70 hover:text-gold hover:bg-white/5'
          }`}
        >
          ⏱️ 出牌與獲勝機制
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
              點數大小次序
            </h3>
            <p className="text-sm text-cream/90 leading-relaxed font-light">
              大老二最特殊也是最核心的規則，就是<strong className="text-gold font-bold">「 2 」</strong>是點數最大的卡牌（俗稱「大老二」），而 <strong className="text-gold font-bold">「 3 」</strong> 是最小的！
            </p>
            <div className="flex flex-col space-y-3 bg-forest-dark p-4 rounded-xl border border-[#ffffff05]">
              <div className="flex justify-between items-center text-xs font-semibold text-cream/50 tracking-wider">
                <span>⚡ 最小 (3)</span>
                <span>🔥 最大 (2)</span>
              </div>
              {/* Sequential Indicator */}
              <div className="flex justify-between items-center gap-1 overflow-x-auto py-2">
                {[3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', '2'].map((rank, i) => (
                  <div key={rank} className="flex flex-col items-center flex-1 min-w-[20px]">
                    <span className={`w-7 h-9 rounded border flex items-center justify-center font-bold text-xs shadow-md ${
                      rank === '2' ? 'bg-gold text-forest border-gold font-black' :
                      rank === 'A' ? 'bg-cream text-forest border-cream font-bold' : 'bg-forest-dark text-cream/90 border-gold/20'
                    }`}>
                      {rank}
                    </span>
                    {i < 12 && <ChevronRight className="w-3 h-3 text-gold/40 mt-1" />}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gold font-bold bg-gold/10 p-2.5 rounded border border-gold/20 text-center">
                ⚠️ 注意：不要跟傳統撲克牌搞混！A 只排第二大，2 才是王者！
              </div>
            </div>
          </div>

          {/* Suit Hierarchy */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-cream">
            <h3 className="text-lg font-serif font-bold text-gold flex items-center gap-2 border-b border-[#ffffff10] pb-2">
              <span className="p-1 px-2.5 bg-gold/15 text-gold border border-gold/30 rounded font-serif font-black">2</span>
              花色大小次序
            </h3>
            <p className="text-sm text-cream/90 leading-relaxed font-light">
              當卡牌點數相同時，會對比花色來決定勝負！台灣最常用的標準花色規則為：
              <br />
              <strong className="text-gold font-semibold">黑桃 ♠</strong> 大於 <strong className="text-rose-400 font-semibold">紅心 ♥</strong> 大於 <strong className="text-amber-400 font-semibold">方塊 ♦</strong> 大於 <strong className="text-emerald-400 font-semibold">梅花 ♣</strong>。
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
                    <span className="text-xs font-bold text-cream/90">{SUIT_NAMES[suit]}</span>
                    <span className={`text-[10px] px-1 py-0.5 rounded font-black text-center ${colors.badge}`}>
                      {['最大 (1st)', '第二 (2nd)', '第三 (3rd)', '最小 (4th)'][index]}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="text-xs text-cream/70 leading-relaxed">
              💡 記憶口訣：<strong>黑紅方梅</strong>。所以單張中最小的牌是「梅花 3」，而防禦或進攻實戰最強的單張牌是「黑桃 2」！
            </div>
          </div>

          {/* Core Objectives */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 col-span-1 md:col-span-2 text-cream">
            <h3 className="text-lg font-serif font-bold text-gold border-b border-[#ffffff10] pb-2 flex items-center gap-2">
              <span className="p-1 px-2 bg-gold/15 text-gold border border-gold/30 rounded font-serif font-black">🎯</span>
              遊戲致勝目標
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-forest border border-gold/10 rounded-xl">
                <h4 className="font-serif font-bold text-gold mb-1 text-sm flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-gold" /> 誰先出？
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  拿到<strong>梅花 3 (♣3)</strong> 的玩家必須最先出牌，而且打出的第一手牌必須包含梅花 3（可以是單張、對子、或包含梅花 3 的五張牌型）。
                </p>
              </div>

              <div className="p-4 bg-forest border border-gold/10 rounded-xl">
                <h4 className="font-serif font-bold text-gold mb-1 text-sm flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-gold" /> 如何壓牌？
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  後出牌的玩家必須跟上一家打出<strong>相同數量與牌型</strong>的組合，而且數值或花色必須更大！如果沒有大過上家的牌，就必須喊<strong>「過 (PASS)」</strong>。
                </p>
              </div>

              <div className="p-4 bg-forest border border-gold/10 rounded-xl">
                <h4 className="font-serif font-bold text-gold mb-1 text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" /> 如何獲勝？
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  最快把自己手上的 13 張牌<strong>全部出完</strong>的人就是贏家！其他玩家手中剩下的牌張數將用來計算扣分，剩下越多牌的人輸得越慘！
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
          className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 text-cream"
        >
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-xl font-serif font-bold text-gold">⚔️ 大老二「一對一」PK 模擬器</h3>
            <p className="text-sm text-cream/70 font-light">
              新手常常分不清哪種牌比較大？在下方自選兩張撲克牌，我們為您實時分析誰贏誰輸！
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
            {/* Left Card Setup */}
            <div className="flex flex-col items-center space-y-4 p-4 bg-forest rounded-xl border border-gold/20">
              <span className="text-xs font-bold text-gold/80 tracking-wider">A 卡牌選擇</span>
              <CardView card={cardLeft} size="lg" />
              
              {/* Selectors */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">點數</label>
                  <select
                    value={cardLeft.rank}
                    onChange={(e) => handleLeftRankChange(e.target.value as Rank)}
                    className="w-full text-xs p-1.5 border border-slate-800 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Rank).map(r => (
                      <option key={r} value={r}>點數 {r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">花色</label>
                  <select
                    value={cardLeft.suit}
                    onChange={(e) => handleLeftSuitChange(e.target.value as Suit)}
                    className="w-full text-xs p-1.5 border border-slate-800 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Suit).map(s => (
                      <option key={s} value={s}>{SUIT_NAMES[s]} {SUIT_SYMBOLS[s]}</option>
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
              <div className="text-center font-serif font-black text-lg py-2 px-6 rounded-full shadow-lg bg-gold text-forest border border-yellow-250 min-w-[140px]">
                {leftWins && '◀ A 大於 B'}
                {rightWins && 'B 大於 A ▶'}
                {isTie && '等值（不應該發生）'}
              </div>
            </div>

            {/* Right Card Setup */}
            <div className="flex flex-col items-center space-y-4 p-4 bg-forest rounded-xl border border-gold/20">
              <span className="text-xs font-bold text-gold/80 tracking-wider">B 卡牌選擇</span>
              <CardView card={cardRight} size="lg" />

              {/* Selectors */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">點數</label>
                  <select
                    value={cardRight.rank}
                    onChange={(e) => handleRightRankChange(e.target.value as Rank)}
                    className="w-full text-xs p-1.5 border border-slate-800 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Rank).map(r => (
                      <option key={r} value={r}>點數 {r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-cream/65 mb-1 text-center">花色</label>
                  <select
                    value={cardRight.suit}
                    onChange={(e) => handleRightSuitChange(e.target.value as Suit)}
                    className="w-full text-xs p-1.5 border border-slate-800 rounded bg-slate-950 text-cream font-bold focus:ring-1 focus:ring-gold"
                  >
                    {Object.values(Suit).map(s => (
                      <option key={s} value={s}>{SUIT_NAMES[s]} {SUIT_SYMBOLS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation text */}
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/80 text-sm text-cream/90 space-y-1 max-w-xl mx-auto">
            <h4 className="font-bold text-gold flex items-center gap-1.5 font-serif">
              💡 核心比牌邏輯分析：
            </h4>
            <ul className="list-disc leading-relaxed list-inside space-y-1 text-xs">
              <li>
                比較點數：A為 <strong className="text-gold">{cardLeft.rank}</strong> (價值 {RANK_VALUES[cardLeft.rank]} 分)，B為 <strong className="text-gold">{cardRight.rank}</strong> (價值 {RANK_VALUES[cardRight.rank]} 分)。
              </li>
              {cardLeft.rank === cardRight.rank ? (
                <li>
                  因兩卡點數相同，所以進行<strong>比花色</strong>：A的花色是 <strong className="text-gold">{SUIT_NAMES[cardLeft.suit]}</strong> (花色權重 {SUIT_VALUES[cardLeft.suit]})，B的花色是 <strong className="text-gold">{SUIT_NAMES[cardRight.suit]}</strong> (花色權重 {SUIT_VALUES[cardRight.suit]})。
                </li>
              ) : (
                <li>直接按點數大小決定勝負，不需比花色。</li>
              )}
              <li className="font-semibold text-gold mt-2 border-t border-[#ffffff08] pt-2">
                勝算說明：{leftWins
                  ? `【卡牌 A】 勝出！因為 ${RANK_VALUES[cardLeft.rank] > RANK_VALUES[cardRight.rank]
                      ? `點數 ${cardLeft.rank} 大於 ${cardRight.rank}。`
                      : `${cardLeft.rank} 與 ${cardRight.rank}點數相同，但【花色 ${SUIT_NAMES[cardLeft.suit]}】大於【花色 ${SUIT_NAMES[cardRight.suit]}】。`}`
                  : `【卡牌 B】 勝出！因為 ${RANK_VALUES[cardRight.rank] > RANK_VALUES[cardLeft.rank]
                      ? `點數 ${cardRight.rank} 大於 ${cardLeft.rank}。`
                      : `${cardRight.rank} 與 ${cardLeft.rank}點數相同，但【花色 ${SUIT_NAMES[cardRight.suit]}】大於【花色 ${SUIT_NAMES[cardLeft.suit]}】。`}`}
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
            <h3 className="text-lg font-serif font-bold text-gold">🧩 高級五張牌型（在台灣最通用的主流出牌）</h3>
            <p className="text-sm text-cream/80 leading-relaxed font-light">
              大老二中除了「單張」和「對子」之外，如果你拿到 5 張牌，你可以出特別的組合。
              <strong>注意：五張牌的牌型不能壓單張或對子，只能壓同是五張牌的組合！</strong>
              其大小順序如下（從小到大）：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Combo 1: Straight */}
              <div className="p-4 bg-forest rounded-xl border border-gold/15 shadow-md space-y-2 text-cream">
                <span className="text-xs font-bold text-forest bg-gold px-2 py-0.5 rounded">1. 順子 (Straight)</span>
                <p className="text-xs text-cream/90 font-light">
                  五張數值連續、但花色不完全相同的牌。
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>比牌邏輯：</strong> 比五張中最大的那張牌。最大順子為帶有 2 的 A-2-3-4-5 或 J-Q-K-A-2（看規則）。
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
                <span className="text-xs font-bold text-cream bg-indigo-700 px-2 py-0.5 rounded">2. 同花 (Flush)</span>
                <p className="text-xs text-cream/90 font-light">
                  五張花色完全一樣、但數字沒有連續的牌。
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>比牌邏輯：</strong> 重點先比花色！花色大的同花壓花色小的同花。若同花色才比最大張點數。
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
                <span className="text-xs font-bold text-forest bg-amber-400 px-2 py-0.5 rounded">3. 葫蘆 (Full House)</span>
                <p className="text-xs text-cream/90 font-light">
                  三張點數一樣的牌配上一對（即「3帶2」）。
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>比牌邏輯：</strong> 比「三條」部分的大小。例如 8-8-8-4-4 大於 7-7-7-A-A。
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
                <span className="text-xs font-bold text-cream bg-rose-700 px-2 py-0.5 rounded">4. 鐵支 (Four of a Kind)</span>
                <p className="text-xs text-cream/90 font-light">
                  四張點數完全相同的牌加上任何一張單牌。
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>比牌邏輯：</strong> 比四張相同的牌點數。
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
                <span className="text-xs font-bold text-forest bg-emerald-400 px-2 py-0.5 rounded">5. 同花順 (Straight Flush)</span>
                <p className="text-xs text-cream/90 font-light">
                  超級強悍！花色相同，且數字連續的五張牌。
                </p>
                <div className="text-cream/50 text-[10px]">
                  <strong>比牌邏輯：</strong> 大老二裡的王牌！能壓過上面所有的牌型。比牌是以最大點數與花色作區分。
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
            <h3 className="text-lg font-serif font-bold text-gold">⏱️ 大老二的回合輪轉機制</h3>
            <p className="text-sm text-cream/70 mt-1 font-light">
              大老二是一場典型的牌權控制遊戲，瞭解回合流向是取勝的靈魂。
            </p>
          </div>

          <div className="relative border-l-2 border-gold/15 ml-3 pl-6 space-y-8 py-2">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-200">
                1
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">第一圈：梅花3發起</h4>
              <p className="text-xs text-cream/85 mt-1 font-light leading-relaxed font-light">
                遊戲開始時發完牌，每人13張。手裡有<strong>「梅花3」</strong>的人最先出牌（牌面必須包含梅花3），並決定開頭打出的牌型大小（例如：如果是出單張，就出梅花3單張；也可以搭配其他牌出對子如梅花3和紅心3；或組成五張牌順子等）。
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-200">
                2
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">依序跟牌與壓牌</h4>
              <p className="text-xs text-cream/85 mt-1 font-light leading-relaxed font-light">
                按照<strong>順時針方向</strong>每位玩家輪流出牌。你必須出與上家「完全相同數量」的段別！如果是單張，你就必須出大於它的單張；如果是對子，你也必須出大於上家點數的對子。
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-200">
                3
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">無牌可壓：喊 PASS</h4>
              <p className="text-xs text-cream/85 mt-1 font-light leading-relaxed font-light">
                若你不想出牌或手裡的牌沒上家大，可以選擇 <strong>PASS (過牌)</strong>。過牌並不意味著你退賽，僅代表本輪放棄壓牌。
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-10 top-0.5 bg-gold text-forest font-serif font-black w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md border border-yellow-200">
                4
              </span>
              <h4 className="font-serif font-bold text-gold text-sm">獲得「新牌權」自由出牌</h4>
              <p className="text-xs text-cream/85 mt-1 font-light leading-relaxed font-light">
                當某玩家推出一個牌型後，<strong>其他所有玩家連續喊了 PASS</strong>（也就是轉了一圈沒有人能打過他），此時桌面清空，由最後出牌的人獲得「新牌權」。
                <strong className="text-gold block mt-2 bg-gold/10 p-2.5 rounded border border-gold/20">
                  牌權在手時，可以不受任何限制，自行打出任何你想要的其他新牌型（單張、對子、三條或五張牌型）！
                </strong>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
